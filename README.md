# ☠️ Kamal Gouaiche — Portfolio (One Piece Style)

Sito portfolio/CV online in stile anime **One Piece**, realizzato in **HTML + CSS + JavaScript vanilla** (nessuna dipendenza, nessun build step). Pronto per **GitHub Pages**.

## Struttura del progetto

```
kamal-portfolio/
├── index.html      # struttura della pagina (unica pagina, one-page)
├── style.css       # tema pirata: manifesti wanted, Log Pose, forzieri, Den Den Mushi
├── script.js       # animazioni, menu mobile, reveal on scroll, particelle
└── README.md       # questo file
```

## Come personalizzare

1. **Link social** — apri `script.js` e modifica in cima al file:
   ```js
   const SOCIAL_LINKS = {
     github: 'https://github.com/TUO-USERNAME',
     linkedin: 'https://www.linkedin.com/in/TUO-USERNAME'
   };
   ```
2. **Foto profilo** — nel riquadro "manifesto wanted" (`.poster-photo` in `index.html`) c'è un placeholder con le iniziali "KG". Per usare una foto vera, sostituisci il contenuto di `.poster-photo` con un tag `<img>` che punti a un file dentro una cartella `assets/` (es. `assets/foto.jpg`), e nel CSS rimuovi lo sfondo a righe.
3. **Testi/contenuti** — tutte le sezioni (esperienza, progetti, competenze, istruzione) sono già compilate con i dati del tuo CV. Aggiorna direttamente il testo dentro `index.html` quando avrai nuove esperienze o progetti: basta copiare il blocco `<article class="chest">...</article>` per aggiungere un nuovo progetto.
4. **Colori** — la palette (blu navy, oro, rosso pirata) è definita come variabili CSS in cima a `style.css`, dentro `:root { ... }`. Cambiando quei valori cambi tutto il tema.

## Pubblicare su GitHub Pages

### Opzione A — Nuovo repository dedicato
1. Crea un nuovo repository su GitHub, ad esempio `kamal-gouaiche.github.io` (usando il tuo username GitHub) oppure un nome qualsiasi tipo `portfolio`.
2. Carica dentro il repo i tre file (`index.html`, `style.css`, `script.js`) — puoi trascinarli dall'interfaccia web di GitHub ("Add file → Upload files") oppure via terminale:
   ```bash
   cd kamal-portfolio
   git init
   git add .
   git commit -m "Primo commit: portfolio One Piece"
   git branch -M main
   git remote add origin https://github.com/TUO-USERNAME/NOME-REPO.git
   git push -u origin main
   ```
3. Vai su **Settings → Pages** del repository.
4. In "Build and deployment", scegli come sorgente **Deploy from a branch**, branch `main`, cartella `/ (root)`.
5. Salva. Dopo circa un minuto il sito sarà online su:
   - `https://TUO-USERNAME.github.io/NOME-REPO/` (repo normale)
   - oppure `https://TUO-USERNAME.github.io/` (se il repo si chiama esattamente `TUO-USERNAME.github.io`)

### Opzione B — Aggiungere ad un repo esistente
Se vuoi tenerlo in una sottocartella di un repo esistente, copia i file dentro una cartella (es. `/docs`) e in **Settings → Pages** seleziona quella cartella come sorgente.

## Note tecniche

- Nessuna libreria esterna: solo i font Google (`Pirata One`, `Cinzel`, `Kalam`) caricati via `<link>`.
- Completamente responsive (funziona da smartphone a desktop).
- Rispetta `prefers-reduced-motion` per disattivare le animazioni di sfondo a chi le disabilita nel sistema.
- Menu di navigazione con indicatore di sezione attiva e comportamento "nascondi su scroll giù, mostra su scroll su".
