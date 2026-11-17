#property strict
#property version   "1.00"
#property description "M1 EMA crossover EA with RSI confirmation and ATR-based risk management."

#include <Trade/Trade.mqh>

// Strategy:
// - Evaluate signals only once per completed M1 candle.
// - Buy when the fast EMA crosses above the slow EMA and RSI confirms bullish
//   momentum without being overbought; sell on the inverse conditions.
// - Set ATR-based stop-loss and take-profit levels. Risk-based sizing uses the
//   actual entry-to-stop loss for one lot, so the chosen volume targets the
//   configured percentage of account equity.
// This is an example strategy, not a promise of profitability. Test it on a
// demo account and verify broker-specific execution rules before live use.

input int      InpFastEMAPeriod       = 9;       // Fast EMA period
input int      InpSlowEMAPeriod       = 21;      // Slow EMA period
input int      InpRSIPeriod           = 14;      // RSI period
input double   InpBuyRSIMin           = 50.0;    // Minimum RSI for a buy
input double   InpSellRSIMax          = 50.0;    // Maximum RSI for a sell
input double   InpRSIOverbought       = 70.0;    // Do not buy at/above this RSI
input double   InpRSIOversold         = 30.0;    // Do not sell at/below this RSI
input int      InpATRPeriod           = 14;      // ATR period
input double   InpATRStopMultiplier   = 1.5;     // Stop distance in ATRs
input double   InpATRTakeMultiplier   = 2.0;     // Target distance in ATRs
input double   InpRiskPercent         = 0.5;     // Equity risk per trade (%)
input double   InpMaxLots             = 5.0;     // Absolute EA volume cap
input int      InpMaxSpreadPoints     = 25;      // Skip entries above this spread
input int      InpDeviationPoints     = 10;      // Maximum execution deviation
input ulong    InpMagicNumber         = 17112026;// Identifier for this EA's trades

CTrade g_trade;
int g_fastEmaHandle = INVALID_HANDLE;
int g_slowEmaHandle = INVALID_HANDLE;
int g_rsiHandle = INVALID_HANDLE;
int g_atrHandle = INVALID_HANDLE;
datetime g_lastBarTime = 0;

// Return the number of decimal places needed to represent a volume step.
int VolumeDigits(const double step)
{
   for(int digits = 0; digits <= 8; ++digits)
   {
      if(MathAbs(step - NormalizeDouble(step, digits)) < 1e-10)
         return digits;
   }
   return 8;
}

// Round a price to the symbol's tradable tick grid in the requested direction.
double RoundToTick(const double price, const bool roundUp)
{
   double tickSize = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_SIZE);
   if(tickSize <= 0.0)
      tickSize = SymbolInfoDouble(_Symbol, SYMBOL_POINT);

   double ticks = price / tickSize;
   double rounded = roundUp ? MathCeil(ticks - 1e-10) : MathFloor(ticks + 1e-10);
   return NormalizeDouble(rounded * tickSize, (int)SymbolInfoInteger(_Symbol, SYMBOL_DIGITS));
}

// Fetch the last two completed candles and decide whether a confirmed
// crossover exists. CopyBuffer stores the older requested bar first:
// index 0 is shift 2, and index 1 is the most recently closed bar (shift 1).
bool ReadSignal(int &signal, double &closedBarATR)
{
   signal = 0;
   closedBarATR = 0.0;

   if(Bars(_Symbol, PERIOD_M1) < InpSlowEMAPeriod + 3)
      return false;

   double fast[2];
   double slow[2];
   double rsi[1];
   double atr[1];

   if(CopyBuffer(g_fastEmaHandle, 0, 1, 2, fast) != 2 ||
      CopyBuffer(g_slowEmaHandle, 0, 1, 2, slow) != 2 ||
      CopyBuffer(g_rsiHandle, 0, 1, 1, rsi) != 1 ||
      CopyBuffer(g_atrHandle, 0, 1, 1, atr) != 1)
   {
      PrintFormat("Indicator data unavailable; error=%d", GetLastError());
      return false;
   }

   if(fast[0] == EMPTY_VALUE || fast[1] == EMPTY_VALUE ||
      slow[0] == EMPTY_VALUE || slow[1] == EMPTY_VALUE ||
      rsi[0] == EMPTY_VALUE || atr[0] == EMPTY_VALUE || atr[0] <= 0.0)
   {
      Print("Indicator returned an invalid value; signal evaluation skipped.");
      return false;
   }

   closedBarATR = atr[0];
   bool crossedUp = (fast[0] <= slow[0] && fast[1] > slow[1]);
   bool crossedDown = (fast[0] >= slow[0] && fast[1] < slow[1]);

   if(crossedUp && rsi[0] >= InpBuyRSIMin && rsi[0] < InpRSIOverbought)
      signal = 1;
   else if(crossedDown && rsi[0] <= InpSellRSIMax && rsi[0] > InpRSIOversold)
      signal = -1;

   return true;
}

// Find this EA's position for the chart symbol. If another EA/manual trade
// already occupies the symbol, report it so this EA will not interfere.
bool FindPosition(ulong &ticket, ENUM_POSITION_TYPE &positionType, bool &foreignPosition)
{
   ticket = 0;
   foreignPosition = false;

   for(int index = PositionsTotal() - 1; index >= 0; --index)
   {
      ulong candidateTicket = PositionGetTicket(index);
      if(candidateTicket == 0)
         continue;

      if(PositionGetString(POSITION_SYMBOL) != _Symbol)
         continue;

      ulong positionMagic = (ulong)PositionGetInteger(POSITION_MAGIC);
      if(positionMagic == InpMagicNumber)
      {
         ticket = candidateTicket;
         positionType = (ENUM_POSITION_TYPE)PositionGetInteger(POSITION_TYPE);
         return true;
      }

      foreignPosition = true;
   }

   return false;
}

// Compute broker-valid ATR stops and a volume whose modeled stop loss does not
// exceed the configured equity risk (subject to the symbol's minimum lot).
bool BuildOrderParameters(const int direction,
                          const double atr,
                          double &entry,
                          double &stopLoss,
                          double &takeProfit,
                          double &volume)
{
   MqlTick tick;
   if(!SymbolInfoTick(_Symbol, tick) || tick.ask <= 0.0 || tick.bid <= 0.0)
   {
      PrintFormat("Could not read a valid quote for %s; error=%d", _Symbol, GetLastError());
      return false;
   }

   double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);
   double tickSize = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_SIZE);
   if(point <= 0.0 || tickSize <= 0.0)
   {
      PrintFormat("Invalid point/tick size for %s.", _Symbol);
      return false;
   }

   long stopsLevelPoints = SymbolInfoInteger(_Symbol, SYMBOL_TRADE_STOPS_LEVEL);
   // A one-tick buffer also avoids stops being rejected at the exact boundary.
   double minimumDistance = MathMax((stopsLevelPoints + 1) * point, tickSize);
   double stopDistance = MathMax(atr * InpATRStopMultiplier, minimumDistance);
   double targetDistance = MathMax(atr * InpATRTakeMultiplier, minimumDistance);

   if(direction > 0)
   {
      entry = tick.ask;
      stopLoss = RoundToTick(tick.bid - stopDistance, false);
      takeProfit = RoundToTick(tick.bid + targetDistance, true);
   }
   else
   {
      entry = tick.bid;
      stopLoss = RoundToTick(tick.ask + stopDistance, true);
      takeProfit = RoundToTick(tick.ask - targetDistance, false);
   }

   ENUM_ORDER_TYPE orderType = (direction > 0) ? ORDER_TYPE_BUY : ORDER_TYPE_SELL;
   double profitAtStop = 0.0;
   if(!OrderCalcProfit(orderType, _Symbol, 1.0, entry, stopLoss, profitAtStop))
   {
      PrintFormat("OrderCalcProfit failed while sizing %s; error=%d", _Symbol, GetLastError());
      return false;
   }

   double lossPerLot = MathAbs(profitAtStop);
   double equity = AccountInfoDouble(ACCOUNT_EQUITY);
   double riskMoney = equity * InpRiskPercent / 100.0;
   if(lossPerLot <= 0.0 || equity <= 0.0 || riskMoney <= 0.0)
   {
      PrintFormat("Invalid risk calculation: loss/lot=%.2f, equity=%.2f, risk=%.2f",
                  lossPerLot, equity, riskMoney);
      return false;
   }

   double volumeStep = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_STEP);
   double minimumVolume = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MIN);
   double maximumVolume = MathMin(SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MAX), InpMaxLots);
   if(volumeStep <= 0.0 || minimumVolume <= 0.0 || maximumVolume < minimumVolume)
   {
      PrintFormat("Invalid volume limits for %s.", _Symbol);
      return false;
   }

   double requestedVolume = MathMin(riskMoney / lossPerLot, maximumVolume);
   volume = MathFloor(requestedVolume / volumeStep + 1e-10) * volumeStep;
   volume = NormalizeDouble(volume, VolumeDigits(volumeStep));

   // Never round up to the broker minimum: that could exceed the user's risk.
   if(volume < minimumVolume)
   {
      PrintFormat("Trade skipped: risk-based volume %.8f is below minimum %.8f.",
                  volume, minimumVolume);
      return false;
   }

   return true;
}

// Validate the inputs before creating indicator handles or enabling trading.
bool InputsAreValid()
{
   if(InpFastEMAPeriod < 1 || InpSlowEMAPeriod <= InpFastEMAPeriod ||
      InpRSIPeriod < 1 || InpATRPeriod < 1)
   {
      Print("Invalid periods: slow EMA must exceed fast EMA; all periods must be positive.");
      return false;
   }

   if(InpBuyRSIMin < 0.0 || InpBuyRSIMin >= InpRSIOverbought ||
      InpSellRSIMax > 100.0 || InpSellRSIMax <= InpRSIOversold ||
      InpRSIOverbought > 100.0 || InpRSIOversold < 0.0 ||
      InpBuyRSIMin > 100.0 || InpSellRSIMax < 0.0)
   {
      Print("Invalid RSI thresholds.");
      return false;
   }

   if(InpATRStopMultiplier <= 0.0 || InpATRTakeMultiplier <= 0.0 ||
      InpRiskPercent <= 0.0 || InpRiskPercent > 10.0 ||
      InpMaxLots <= 0.0 || InpMaxSpreadPoints < 0 || InpDeviationPoints < 0)
   {
      Print("Invalid risk, ATR, spread, volume, or deviation input.");
      return false;
   }

   return true;
}

int OnInit()
{
   if(!InputsAreValid())
      return INIT_PARAMETERS_INCORRECT;

   g_fastEmaHandle = iMA(_Symbol, PERIOD_M1, InpFastEMAPeriod, 0, MODE_EMA, PRICE_CLOSE);
   g_slowEmaHandle = iMA(_Symbol, PERIOD_M1, InpSlowEMAPeriod, 0, MODE_EMA, PRICE_CLOSE);
   g_rsiHandle = iRSI(_Symbol, PERIOD_M1, InpRSIPeriod, PRICE_CLOSE);
   g_atrHandle = iATR(_Symbol, PERIOD_M1, InpATRPeriod);

   if(g_fastEmaHandle == INVALID_HANDLE || g_slowEmaHandle == INVALID_HANDLE ||
      g_rsiHandle == INVALID_HANDLE || g_atrHandle == INVALID_HANDLE)
   {
      PrintFormat("Failed to create indicator handles; error=%d", GetLastError());
      return INIT_FAILED;
   }

   g_trade.SetExpertMagicNumber(InpMagicNumber);
   g_trade.SetDeviationInPoints((ulong)InpDeviationPoints);
   g_trade.SetTypeFillingBySymbol(_Symbol);
   g_trade.SetAsyncMode(false);

   // Wait for the next new M1 candle; evaluate the first signal from fully
   // completed bars rather than acting immediately on attachment.
   g_lastBarTime = iTime(_Symbol, PERIOD_M1, 0);
   PrintFormat("M1 EMA/RSI/ATR EA initialized on %s.", _Symbol);
   return INIT_SUCCEEDED;
}

void OnDeinit(const int reason)
{
   if(g_fastEmaHandle != INVALID_HANDLE)
      IndicatorRelease(g_fastEmaHandle);
   if(g_slowEmaHandle != INVALID_HANDLE)
      IndicatorRelease(g_slowEmaHandle);
   if(g_rsiHandle != INVALID_HANDLE)
      IndicatorRelease(g_rsiHandle);
   if(g_atrHandle != INVALID_HANDLE)
      IndicatorRelease(g_atrHandle);

   PrintFormat("EA stopped; reason=%d", reason);
}

void OnTick()
{
   // The strategy is explicitly M1-based, regardless of the chart timeframe.
   datetime currentBarTime = iTime(_Symbol, PERIOD_M1, 0);
   if(currentBarTime == 0 || currentBarTime == g_lastBarTime)
      return;
   g_lastBarTime = currentBarTime;

   if(!TerminalInfoInteger(TERMINAL_TRADE_ALLOWED) ||
      !MQLInfoInteger(MQL_TRADE_ALLOWED))
   {
      Print("Trading is disabled in the terminal or EA settings.");
      return;
   }

   int signal = 0;
   double atr = 0.0;
   if(!ReadSignal(signal, atr) || signal == 0)
      return;

   ulong positionTicket = 0;
   ENUM_POSITION_TYPE positionType = POSITION_TYPE_BUY;
   bool foreignPosition = false;
   bool hasOwnPosition = FindPosition(positionTicket, positionType, foreignPosition);

   if(hasOwnPosition)
   {
      bool oppositeSignal =
         (positionType == POSITION_TYPE_BUY && signal < 0) ||
         (positionType == POSITION_TYPE_SELL && signal > 0);

      if(oppositeSignal)
      {
         bool closeSent = g_trade.PositionClose(positionTicket);
         uint retcode = g_trade.ResultRetcode();
         if(!closeSent || (retcode != TRADE_RETCODE_DONE &&
                           retcode != TRADE_RETCODE_DONE_PARTIAL))
         {
            PrintFormat("Failed to close position %I64u: retcode=%u (%s)",
                        positionTicket, retcode, g_trade.ResultRetcodeDescription());
         }
         else
         {
            PrintFormat("Closed position %I64u on opposite M1 signal.", positionTicket);
         }
      }
      // Do not reverse on the same candle. A fresh crossover is required.
      return;
   }

   if(foreignPosition)
   {
      PrintFormat("Entry skipped: another position already exists on %s.", _Symbol);
      return;
   }

   MqlTick tick;
   if(!SymbolInfoTick(_Symbol, tick) || tick.ask <= 0.0 || tick.bid <= 0.0)
   {
      PrintFormat("Could not read a valid quote for spread check; error=%d", GetLastError());
      return;
   }

   double spreadPoints = (tick.ask - tick.bid) / SymbolInfoDouble(_Symbol, SYMBOL_POINT);
   if(spreadPoints > InpMaxSpreadPoints)
   {
      PrintFormat("Entry skipped: spread %.1f points exceeds limit %d.",
                  spreadPoints, InpMaxSpreadPoints);
      return;
   }

   double entry = 0.0;
   double stopLoss = 0.0;
   double takeProfit = 0.0;
   double volume = 0.0;
   if(!BuildOrderParameters(signal, atr, entry, stopLoss, takeProfit, volume))
      return;

   string comment = (signal > 0) ? "M1 EMA RSI buy" : "M1 EMA RSI sell";
   bool orderSent = (signal > 0)
      ? g_trade.Buy(volume, _Symbol, 0.0, stopLoss, takeProfit, comment)
      : g_trade.Sell(volume, _Symbol, 0.0, stopLoss, takeProfit, comment);

   uint retcode = g_trade.ResultRetcode();
   if(!orderSent || (retcode != TRADE_RETCODE_DONE &&
                     retcode != TRADE_RETCODE_DONE_PARTIAL &&
                     retcode != TRADE_RETCODE_PLACED))
   {
      PrintFormat("Order failed: side=%s volume=%.8f retcode=%u (%s)",
                  signal > 0 ? "BUY" : "SELL", volume, retcode,
                  g_trade.ResultRetcodeDescription());
      return;
   }

   PrintFormat("Opened %s: volume=%.8f entry~%.*f SL=%.*f TP=%.*f spread=%.1f points",
               signal > 0 ? "BUY" : "SELL", volume,
               (int)SymbolInfoInteger(_Symbol, SYMBOL_DIGITS), entry,
               (int)SymbolInfoInteger(_Symbol, SYMBOL_DIGITS), stopLoss,
               (int)SymbolInfoInteger(_Symbol, SYMBOL_DIGITS), takeProfit,
               spreadPoints);
}
