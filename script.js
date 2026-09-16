/* ============================================
   KAMAL GOUAICHE — One Piece Portfolio Scripts
   Vanilla JS, no dependencies.
   ============================================ */

/* ============================================
   THEME (light / dark) & LANGUAGE (it / en)
   Defined outside DOMContentLoaded so the data is
   available as soon as the script runs.
   ============================================ */

const TRANSLATIONS = {
  it: {
    'meta.title': 'Kamal Gouaiche | Full-Stack & Mobile Developer',
    'meta.description': 'Portfolio di Kamal Gouaiche - Full-Stack & Mobile Developer',
    'loader.text': "Issando la Jolly Roger...",
    'nav.home.label': 'Home', 'nav.home.sub': 'Ciurma',
    'nav.experience.label': 'Esperienza', 'nav.experience.sub': 'Diario di Bordo',
    'nav.projects.label': 'Progetti', 'nav.projects.sub': 'Tesori',
    'nav.skills.label': 'Competenze', 'nav.skills.sub': 'Frutti del Diavolo',
    'nav.education.label': 'Istruzione', 'nav.education.sub': 'Addestramento',
    'nav.cv.label': 'CV', 'nav.cv.sub': 'Pergamena',
    'nav.contact.label': 'Contatti', 'nav.contact.sub': 'Den Den Mushi',
    'hero.eyebrow': '☠ Benvenuto a bordo, sono',
    'hero.role': 'Full-Stack & Mobile Developer',
    'hero.desc': "Laureando in Informatica con esperienza concreta nello sviluppo software full-stack, mobile e sistemi distribuiti. Trasformo idee in applicazioni reali, un'isola alla volta.",
    'hero.cta1': 'Scopri i miei progetti',
    'hero.cta2': 'Contattami',
    'hero.haki': "Rilascia l'Haki dei Re",
    'hero.scrollCue': 'Salpa con me',
    'hero.scrollAria': 'Scorri',
    'poster.footnote': 'Pirati Informatica — Università del Piemonte Orientale',
    'poster.plaqueLabel': "Base d'operazioni",
    'poster.plaqueLocation': 'Vercelli, Italia',
    'poster.plaqueStatus': '☠ Pronto a salpare',
    'experience.mark': 'Cap. 01',
    'experience.title': 'Diario di Bordo',
    'experience.entry1.date': '2026 · 3 mesi (Tirocinio Curriculare)',
    'experience.entry1.b1': "Rinnovamento completo e autonomo del sistema principale dell'azienda.",
    'experience.entry1.b2': "Migrazione dell'architettura applicativa da Laravel/PHP e React a Python/FastAPI e Next.js.",
    'experience.entry1.b3': 'Gestione end-to-end del progetto di migrazione: analisi del sistema esistente, riprogettazione backend e frontend, testing e messa in produzione.',
    'projects.mark': 'Cap. 02',
    'projects.title': 'Isole del Tesoro',
    'projects.subtitle': "Ogni progetto è un'isola conquistata nel Grand Line del codice.",
    'projects.p1.date': 'Apr 2026 – Lug 2026',
    'projects.p1.desc': 'Piattaforma AI che trasforma i materiali di studio in sessioni di ripasso interattive e personalizzate.',
    'projects.p1.b1': 'Pipeline RAG con ChromaDB per generare domande su misura dai contenuti caricati.',
    'projects.p1.b2': 'Architettura multi-agent con Agno: Guide, Eval e Contest Agent.',
    'projects.p1.b3': 'Adaptive Engine che regola la difficoltà in base alle performance.',
    'projects.p2.tagline': 'App Mobile Android',
    'projects.p2.desc': "App Android per affitti brevi: ricerca, prenotazione, recensioni e chat in un'unica piattaforma.",
    'projects.p2.b1': 'Ricerca avanzata, prenotazioni, recensioni e chat in tempo reale con notifiche push.',
    'projects.p2.b2': 'Architettura MVVM con Kotlin Coroutines e StateFlow.',
    'projects.p2.b3': 'Backend serverless su Firebase/Firestore.',
    'projects.p3.tagline': 'Piattaforma per Eventi',
    'projects.p3.desc': 'Sistema distribuito per la gestione di eventi, sviluppato in Java con architettura RMI e metodologia Agile.',
    'projects.p4.desc': 'Web app di delivery food con pannelli dedicati per admin, ristoratori e clienti.',
    'projects.p5.tagline': 'Compilatore Java',
    'projects.p5.desc': "Compilatore Java che traduce il linguaggio AC in codice DC, dall'analisi lessicale alla generazione del codice.",
    'projects.p6.tagline': 'Teoria e SQL',
    'projects.p6.desc': 'Database relazionale completo: dalla modellazione ER a procedure e query avanzate in PLpgSQL su PostgreSQL.',
    'projects.p7.tagline': 'Esercitazioni e Progetti del Corso',
    'projects.p7.desc': 'Esercitazioni del corso di Algoritmi e Strutture Dati, tra analisi della complessità e problem solving.',
    'projects.githubLink': 'Vedi su GitHub',
    'skills.mark': 'Cap. 03',
    'skills.title': 'I Frutti del Diavolo',
    'skills.subtitle': 'Ogni potere sbloccato lungo la rotta.',
    'skills.group.languages': 'Linguaggi',
    'skills.group.ai': 'AI & Automazione',
    'skills.group.tools': 'Strumenti & Metodi',
    'skills.langTitle': '☠ Lingue Parlate',
    'skills.langSubtitle': '(Haki della Conversazione)',
    'skills.lang.it': 'Italiano', 'skills.lang.ar': 'Arabo', 'skills.lang.en': 'Inglese', 'skills.lang.fr': 'Francese',
    'skills.level.fluent': 'Fluente', 'skills.level.native': 'Madrelingua',
    'education.mark': 'Cap. 04',
    'education.title': 'Addestramento',
    'education.e1.role': 'Laurea Triennale in Informatica',
    'education.e1.date': '2023 – in corso',
    'education.e2.name': 'Liceo Scientifico',
    'education.e2.role': 'Diploma di Maturità Scientifica',
    'cv.mark': 'Cap. 05',
    'cv.title': 'La Pergamena del Navigatore',
    'cv.subtitle': 'Il registro completo delle mie rotte, imprese e competenze.',
    'cv.desc': 'Scarica o consulta il mio Curriculum Vitae completo in formato PDF.',
    'cv.view': 'Visualizza CV',
    'cv.download': 'Scarica CV',
    'contact.mark': 'Cap. 06',
    'contact.title': 'Chiamata al Den Den Mushi',
    'contact.subtitle': 'Pronto a salpare insieme? Contattami!',
    'contact.location': 'Vercelli, Italia',
    'footer.line1': "☠ Fatto con codice, caffè e Haki dell'Osservazione",
    'footer.line2': '"L\'unica cosa che non posso rubare è il cuore delle persone." — ma il tuo prossimo progetto, sì.',
    'backToTop.aria': 'Torna su',
    'themeToggle.aria': 'Cambia tema chiaro/scuro',
    'langToggle.aria': 'Cambia lingua / Switch language'
  },
  en: {
    'meta.title': 'Kamal Gouaiche | Full-Stack & Mobile Developer',
    'meta.description': "Kamal Gouaiche's portfolio - Full-Stack & Mobile Developer",
    'loader.text': 'Hoisting the Jolly Roger...',
    'nav.home.label': 'Home', 'nav.home.sub': 'Crew',
    'nav.experience.label': 'Experience', 'nav.experience.sub': 'Ship Log',
    'nav.projects.label': 'Projects', 'nav.projects.sub': 'Treasures',
    'nav.skills.label': 'Skills', 'nav.skills.sub': 'Devil Fruits',
    'nav.education.label': 'Education', 'nav.education.sub': 'Training',
    'nav.cv.label': 'CV', 'nav.cv.sub': 'Scroll',
    'nav.contact.label': 'Contact', 'nav.contact.sub': 'Den Den Mushi',
    'hero.eyebrow': '☠ Welcome aboard, I am',
    'hero.role': 'Full-Stack & Mobile Developer',
    'hero.desc': "Computer Science student with hands-on experience in full-stack, mobile and distributed systems development. I turn ideas into real applications, one island at a time.",
    'hero.cta1': 'Discover my projects',
    'hero.cta2': 'Contact me',
    'hero.haki': "Unleash the Conqueror's Haki",
    'hero.scrollCue': 'Set sail with me',
    'hero.scrollAria': 'Scroll',
    'poster.footnote': 'Computer Science Pirates — University of Eastern Piedmont',
    'poster.plaqueLabel': 'Base of operations',
    'poster.plaqueLocation': 'Vercelli, Italy',
    'poster.plaqueStatus': '☠ Ready to set sail',
    'experience.mark': 'Ch. 01',
    'experience.title': 'Ship Log',
    'experience.entry1.date': '2026 · 3 months (Curricular Internship)',
    'experience.entry1.b1': "Complete, self-driven overhaul of the company's core system.",
    'experience.entry1.b2': 'Migration of the application architecture from Laravel/PHP and React to Python/FastAPI and Next.js.',
    'experience.entry1.b3': 'End-to-end ownership of the migration project: analysis of the existing system, backend and frontend redesign, testing and production rollout.',
    'projects.mark': 'Ch. 02',
    'projects.title': 'Treasure Islands',
    'projects.subtitle': 'Every project is an island conquered on the Grand Line of code.',
    'projects.p1.date': 'Apr 2026 – Jul 2026',
    'projects.p1.desc': 'AI platform that turns study material into interactive, personalized review sessions.',
    'projects.p1.b1': 'RAG pipeline with ChromaDB to generate tailor-made questions from uploaded content.',
    'projects.p1.b2': 'Multi-agent architecture with Agno: Guide, Eval and Contest Agent.',
    'projects.p1.b3': 'Adaptive Engine that tunes difficulty based on performance.',
    'projects.p2.tagline': 'Android Mobile App',
    'projects.p2.desc': 'Android app for short-term rentals: search, booking, reviews and chat in one platform.',
    'projects.p2.b1': 'Advanced search, bookings, reviews and real-time chat with push notifications.',
    'projects.p2.b2': 'MVVM architecture with Kotlin Coroutines and StateFlow.',
    'projects.p2.b3': 'Serverless backend on Firebase/Firestore.',
    'projects.p3.tagline': 'Event Platform',
    'projects.p3.desc': 'Distributed system for event management, built in Java with RMI architecture and Agile methodology.',
    'projects.p4.desc': 'Food delivery web app with dedicated panels for admins, restaurants and customers.',
    'projects.p5.tagline': 'Java Compiler',
    'projects.p5.desc': 'Java compiler that translates the AC language into DC code, from lexical analysis to code generation.',
    'projects.p6.tagline': 'Theory & SQL',
    'projects.p6.desc': 'Complete relational database: from ER modeling to advanced procedures and queries in PLpgSQL on PostgreSQL.',
    'projects.p7.tagline': 'Course Exercises & Projects',
    'projects.p7.desc': 'Exercises from the Algorithms and Data Structures course, covering complexity analysis and problem solving.',
    'projects.githubLink': 'View on GitHub',
    'skills.mark': 'Ch. 03',
    'skills.title': 'The Devil Fruits',
    'skills.subtitle': 'Every power unlocked along the way.',
    'skills.group.languages': 'Languages',
    'skills.group.ai': 'AI & Automation',
    'skills.group.tools': 'Tools & Methods',
    'skills.langTitle': '☠ Languages Spoken',
    'skills.langSubtitle': '(Conversation Haki)',
    'skills.lang.it': 'Italian', 'skills.lang.ar': 'Arabic', 'skills.lang.en': 'English', 'skills.lang.fr': 'French',
    'skills.level.fluent': 'Fluent', 'skills.level.native': 'Native',
    'education.mark': 'Ch. 04',
    'education.title': 'Training',
    'education.e1.role': "Bachelor's Degree in Computer Science",
    'education.e1.date': '2023 – ongoing',
    'education.e2.name': 'Scientific High School',
    'education.e2.role': 'Scientific Baccalaureate Diploma',
    'cv.mark': 'Ch. 05',
    'cv.title': "The Navigator's Scroll",
    'cv.subtitle': 'The complete record of my routes, endeavors and skills.',
    'cv.desc': 'Download or view my full Curriculum Vitae in PDF format.',
    'cv.view': 'View CV',
    'cv.download': 'Download CV',
    'contact.mark': 'Ch. 06',
    'contact.title': 'Den Den Mushi Call',
    'contact.subtitle': 'Ready to set sail together? Get in touch!',
    'contact.location': 'Vercelli, Italy',
    'footer.line1': '☠ Made with code, coffee and Observation Haki',
    'footer.line2': '"The one thing I can\'t steal is people\'s hearts." — but your next project, I can.',
    'backToTop.aria': 'Back to top',
    'themeToggle.aria': 'Toggle light/dark theme',
    'langToggle.aria': 'Switch language / Cambia lingua'
  }
};

function kgApplyTranslations(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.it;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  const titleEl = document.querySelector('title');
  if (titleEl && dict['meta.title']) titleEl.textContent = dict['meta.title'];
  const metaDesc = document.getElementById('meta-description');
  if (metaDesc && dict['meta.description']) metaDesc.setAttribute('content', dict['meta.description']);

  const scrollCueLink = document.querySelector('.scroll-cue');
  if (scrollCueLink && dict['hero.scrollAria']) scrollCueLink.setAttribute('aria-label', dict['hero.scrollAria']);
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn && dict['backToTop.aria']) backToTopBtn.setAttribute('aria-label', dict['backToTop.aria']);
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn && dict['themeToggle.aria']) themeToggleBtn.setAttribute('aria-label', dict['themeToggle.aria']);
  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn && dict['langToggle.aria']) langToggleBtn.setAttribute('aria-label', dict['langToggle.aria']);

  const langLabel = document.getElementById('lang-toggle-label');
  if (langLabel) langLabel.textContent = lang === 'it' ? 'EN' : 'IT';

  document.documentElement.setAttribute('lang', lang);

  try { localStorage.setItem('kg-lang', lang); } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- CONFIG: update your real links here ---------- */
  const SOCIAL_LINKS = {
    github: 'https://github.com/KamalGouaiche10',
    linkedin: 'https://www.linkedin.com/in/kamal-gouaiche-2584b8268'
  };
  const githubLink = document.getElementById('github-link');
  const linkedinLink = document.getElementById('linkedin-link');
  if (githubLink) githubLink.href = SOCIAL_LINKS.github;
  if (linkedinLink) linkedinLink.href = SOCIAL_LINKS.linkedin;

  /* ---------- THEME TOGGLE (light / dark) ---------- */
  const themeToggle = document.getElementById('theme-toggle');
  function setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    if (themeToggle) themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    try { localStorage.setItem('kg-theme', theme); } catch (e) {}
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      setTheme(isLight ? 'dark' : 'light');
    });
  }
  // sync aria-pressed with whatever the pre-paint inline script already applied
  setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  /* ---------- LANGUAGE TOGGLE (it / en) ---------- */
  const langToggle = document.getElementById('lang-toggle');
  let currentLang = 'it';
  try { currentLang = localStorage.getItem('kg-lang') || 'it'; } catch (e) {}
  kgApplyTranslations(currentLang);
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'it' ? 'en' : 'it';
      kgApplyTranslations(currentLang);
    });
  }

  /* ---------- LOADER ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hide'), 500);
  });
  // fallback in case 'load' already fired
  if (document.readyState === 'complete') {
    setTimeout(() => loader && loader.classList.add('hide'), 500);
  }

  /* ---------- FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- NAVBAR: hide on scroll down, show on scroll up ---------- */
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 120) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }
    lastScrollY = currentY;

    // back to top button
    if (currentY > 600) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  }, { passive: true });

  /* ---------- MOBILE MENU TOGGLE ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('.section');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(sec => navObserver.observe(sec));

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealTargets = document.querySelectorAll(
    '.timeline-entry, .chest, .fruit-group, .haki-block, .edu-entry, .mushi-wrap'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- HAKI SKILL BARS ANIMATION ---------- */
  const hakiBlock = document.querySelector('.haki-block');
  if (hakiBlock) {
    const hakiObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.haki-fill').forEach(fill => {
            fill.classList.add('animate');
          });
          hakiObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    hakiObserver.observe(hakiBlock);
  }

  /* ---------- BACK TO TOP ---------- */
  const backToTop = document.getElementById('back-to-top');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- FLOATING PARTICLES (paper ash / sea sparkle) ---------- */
  const canvas = document.getElementById('ocean-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width, height;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.min(70, Math.floor((width * height) / 22000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      speedY: Math.random() * 0.25 + 0.05,
      speedX: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.5 + 0.15
    }));
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(224,166,58,';
    particles.forEach(p => {
      ctx.beginPath();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = `rgba(224,166,58,${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.y -= p.speedY;
      p.x += p.speedX;
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animateParticles);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  resizeCanvas();
  createParticles();
  if (!prefersReducedMotion) {
    animateParticles();
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });

  /* ---------- PROJECT FILTER (optional, by stack tag) ---------- */
  // Click a stack pill inside a chest to highlight matching projects.
  document.querySelectorAll('.chest-stack span').forEach(tagEl => {
    tagEl.style.cursor = 'pointer';
    tagEl.addEventListener('click', () => {
      const tag = tagEl.textContent.trim();
      const chests = document.querySelectorAll('.chest');
      chests.forEach(chest => {
        const tags = (chest.dataset.tags || '').split(',').map(t => t.trim());
        if (tags.includes(tag)) {
          chest.style.borderColor = 'var(--gold-bright)';
          chest.style.boxShadow = '0 0 30px rgba(255,207,92,.4)';
          setTimeout(() => {
            chest.style.borderColor = '';
            chest.style.boxShadow = '';
          }, 1200);
        }
      });
    });
  });

  /* ---------- HAKI DEL RE / CONQUEROR'S HAKI ---------- */
  const hakiBtn = document.getElementById('haki-btn');
  const hakiOverlay = document.getElementById('haki-overlay');
  if (hakiBtn && hakiOverlay) {
    hakiBtn.addEventListener('click', () => {
      if (hakiBtn.classList.contains('discharging')) return;
      hakiBtn.classList.add('discharging');

      hakiOverlay.classList.remove('active');
      // force reflow so the animation can restart on repeated clicks
      void hakiOverlay.offsetWidth;
      hakiOverlay.classList.add('active');

      if (!prefersReducedMotion) {
        document.body.classList.remove('haki-shaking');
        void document.body.offsetWidth;
        document.body.classList.add('haki-shaking');
      }

      setTimeout(() => {
        hakiOverlay.classList.remove('active');
        document.body.classList.remove('haki-shaking');
        hakiBtn.classList.remove('discharging');
      }, 950);
    });
  }

});
