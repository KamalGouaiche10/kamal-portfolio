/* ============================================
   KAMAL GOUAICHE — Portfolio Scripts
   Vanilla JS, no dependencies.
   ============================================ */

/* ============================================
   THEME (light / dark, dark = default) & LANGUAGE (it / en)
   ============================================ */

const TRANSLATIONS = {
  it: {
    'meta.title': 'Kamal Gouaiche | Full-Stack & Mobile Developer',
    'meta.description': 'Portfolio di Kamal Gouaiche - Full-Stack & Mobile Developer',
    'loader.text': 'Caricamento...',
    'nav.home': 'Home',
    'nav.experience': 'Esperienza',
    'nav.projects': 'Progetti',
    'nav.skills': 'Competenze',
    'nav.education': 'Istruzione',
    'nav.contact': 'Contatti',
    'nav.cta': 'Scarica CV',
    'hero.eyebrow': 'Disponibile per nuove opportunità',
    'hero.role': 'Full-Stack & Mobile Developer',
    'hero.roleWords': 'Full-Stack Developer|Mobile Developer|AI Enthusiast',
    'hero.desc': "Laureando in Informatica con esperienza concreta nello sviluppo software full-stack, mobile e sistemi distribuiti. Trasformo idee in prodotti reali, dal backend all'interfaccia.",
    'hero.cta1': 'Guarda i progetti',
    'hero.cta2': 'Contattami',
    'hero.stat1': 'Progetti realizzati',
    'hero.stat2': 'Linguaggi & framework',
    'hero.stat3': 'Mesi in azienda',
    'hero.scrollCue': 'Scorri',
    'hero.card.location': 'Sede',
    'hero.card.education': 'Formazione',
    'hero.card.educationValue': 'Informatica, UPO',
    'hero.card.status': 'Stato',
    'hero.card.statusValue': 'Aperto a proposte',
    'experience.eyebrow': 'Percorso',
    'experience.title': 'Esperienza',
    'experience.entry1.date': '2026 · 3 mesi (Tirocinio Curriculare)',
    'experience.entry1.b1': "Rinnovamento completo e autonomo del sistema principale dell'azienda.",
    'experience.entry1.b2': "Migrazione dell'architettura applicativa da Laravel/PHP e React a Python/FastAPI e Next.js.",
    'experience.entry1.b3': 'Gestione end-to-end del progetto di migrazione: analisi del sistema esistente, riprogettazione backend e frontend, testing e messa in produzione.',
    'projects.eyebrow': 'Lavori',
    'projects.title': 'Progetti',
    'projects.subtitle': 'Una selezione di applicazioni sviluppate tra studio, tirocinio e side project.',
    'projects.filterAll': 'Tutti',
    'projects.p1.date': 'Apr 2026 – Lug 2026',
    'projects.p1.tagline': 'Piattaforma di apprendimento adattivo con AI',
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
    'projects.p4.tagline': 'Delivery Food',
    'projects.p4.desc': 'Web app di delivery food con pannelli dedicati per admin, ristoratori e clienti.',
    'projects.p5.tagline': 'Compilatore Java',
    'projects.p5.desc': "Compilatore Java che traduce il linguaggio AC in codice DC, dall'analisi lessicale alla generazione del codice.",
    'projects.p6.tagline': 'Teoria e SQL',
    'projects.p6.desc': 'Database relazionale completo: dalla modellazione ER a procedure e query avanzate in PLpgSQL su PostgreSQL.',
    'projects.p7.tagline': 'Esercitazioni e Progetti del Corso',
    'projects.p7.desc': 'Esercitazioni del corso di Algoritmi e Strutture Dati, tra analisi della complessità e problem solving.',
    'projects.githubLink': 'Vedi su GitHub',
    'skills.eyebrow': 'Stack',
    'skills.title': 'Competenze',
    'skills.subtitle': 'Tecnologie e strumenti che uso per costruire prodotti software.',
    'skills.group.languages': 'Linguaggi',
    'skills.group.web': 'Web & Backend',
    'skills.group.cloud': 'Cloud & Database',
    'skills.group.mobile': 'Mobile',
    'skills.group.ai': 'AI & Automazione',
    'skills.group.tools': 'Strumenti & Metodi',
    'skills.langTitle': 'Lingue parlate',
    'skills.lang.it': 'Italiano', 'skills.lang.ar': 'Arabo', 'skills.lang.en': 'Inglese', 'skills.lang.fr': 'Francese',
    'skills.level.fluent': 'Fluente', 'skills.level.native': 'Madrelingua',
    'education.eyebrow': 'Formazione',
    'education.title': 'Istruzione',
    'education.e1.role': 'Laurea Triennale in Informatica',
    'education.e1.date': '2023 – in corso',
    'education.e2.name': 'Liceo Scientifico',
    'education.e2.role': 'Diploma di Maturità Scientifica',
    'cv.desc': 'Scarica o consulta il mio Curriculum Vitae completo in formato PDF.',
    'cv.view': 'Visualizza CV',
    'cv.download': 'Scarica CV',
    'contact.eyebrow': 'Contatti',
    'contact.title': 'Parliamone',
    'contact.subtitle': 'Sono disponibile per nuove opportunità: scrivimi o contattami sui canali qui sotto.',
    'contact.location': 'Vercelli, Italia',
    'footer.line1': 'Progettato e sviluppato da Kamal Gouaiche',
    'footer.line2': 'Realizzato con HTML, Tailwind CSS e JavaScript.',
    'backToTop.aria': 'Torna su',
    'themeToggle.aria': 'Cambia tema chiaro/scuro',
    'langToggle.aria': 'Cambia lingua / Switch language'
  },
  en: {
    'meta.title': 'Kamal Gouaiche | Full-Stack & Mobile Developer',
    'meta.description': "Kamal Gouaiche's portfolio - Full-Stack & Mobile Developer",
    'loader.text': 'Loading...',
    'nav.home': 'Home',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    'nav.cta': 'Download CV',
    'hero.eyebrow': 'Open to new opportunities',
    'hero.role': 'Full-Stack & Mobile Developer',
    'hero.roleWords': 'Full-Stack Developer|Mobile Developer|AI Enthusiast',
    'hero.desc': "Computer Science student with hands-on experience in full-stack, mobile and distributed systems development. I turn ideas into real products, from backend to interface.",
    'hero.cta1': 'View my work',
    'hero.cta2': 'Get in touch',
    'hero.stat1': 'Projects shipped',
    'hero.stat2': 'Languages & frameworks',
    'hero.stat3': 'Months on the job',
    'hero.scrollCue': 'Scroll',
    'hero.card.location': 'Based in',
    'hero.card.education': 'Education',
    'hero.card.educationValue': 'Computer Science, UPO',
    'hero.card.status': 'Status',
    'hero.card.statusValue': 'Open to opportunities',
    'experience.eyebrow': 'Track record',
    'experience.title': 'Experience',
    'experience.entry1.date': '2026 · 3 months (Internship)',
    'experience.entry1.b1': "Complete, self-driven overhaul of the company's core system.",
    'experience.entry1.b2': 'Migration of the application architecture from Laravel/PHP and React to Python/FastAPI and Next.js.',
    'experience.entry1.b3': 'End-to-end ownership of the migration project: analysis of the existing system, backend and frontend redesign, testing and production rollout.',
    'projects.eyebrow': 'Work',
    'projects.title': 'Projects',
    'projects.subtitle': 'A selection of applications built across coursework, internship and side projects.',
    'projects.filterAll': 'All',
    'projects.p1.date': 'Apr 2026 – Jul 2026',
    'projects.p1.tagline': 'AI-Powered Adaptive Learning Platform',
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
    'projects.p4.tagline': 'Food Delivery',
    'projects.p4.desc': 'Food delivery web app with dedicated panels for admins, restaurants and customers.',
    'projects.p5.tagline': 'Java Compiler',
    'projects.p5.desc': 'Java compiler that translates the AC language into DC code, from lexical analysis to code generation.',
    'projects.p6.tagline': 'Theory & SQL',
    'projects.p6.desc': 'Complete relational database: from ER modeling to advanced procedures and queries in PLpgSQL on PostgreSQL.',
    'projects.p7.tagline': 'Course Exercises & Projects',
    'projects.p7.desc': 'Exercises from the Algorithms and Data Structures course, covering complexity analysis and problem solving.',
    'projects.githubLink': 'View on GitHub',
    'skills.eyebrow': 'Stack',
    'skills.title': 'Skills',
    'skills.subtitle': 'Technologies and tools I use to build software products.',
    'skills.group.languages': 'Languages',
    'skills.group.web': 'Web & Backend',
    'skills.group.cloud': 'Cloud & Database',
    'skills.group.mobile': 'Mobile',
    'skills.group.ai': 'AI & Automation',
    'skills.group.tools': 'Tools & Methods',
    'skills.langTitle': 'Languages spoken',
    'skills.lang.it': 'Italian', 'skills.lang.ar': 'Arabic', 'skills.lang.en': 'English', 'skills.lang.fr': 'French',
    'skills.level.fluent': 'Fluent', 'skills.level.native': 'Native',
    'education.eyebrow': 'Background',
    'education.title': 'Education',
    'education.e1.role': "Bachelor's Degree in Computer Science",
    'education.e1.date': '2023 – ongoing',
    'education.e2.name': 'Scientific High School',
    'education.e2.role': 'Scientific Baccalaureate Diploma',
    'cv.desc': 'Download or view my full Curriculum Vitae in PDF format.',
    'cv.view': 'View CV',
    'cv.download': 'Download CV',
    'contact.eyebrow': 'Contact',
    'contact.title': "Let's talk",
    'contact.subtitle': "I'm open to new opportunities: reach out through any of the channels below.",
    'contact.location': 'Vercelli, Italy',
    'footer.line1': 'Designed and built by Kamal Gouaiche',
    'footer.line2': 'Built with HTML, Tailwind CSS and JavaScript.',
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

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn && dict['backToTop.aria']) backToTopBtn.setAttribute('aria-label', dict['backToTop.aria']);
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn && dict['themeToggle.aria']) themeToggleBtn.setAttribute('aria-label', dict['themeToggle.aria']);
  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn && dict['langToggle.aria']) langToggleBtn.setAttribute('aria-label', dict['langToggle.aria']);

  const langLabel = document.getElementById('lang-toggle-label');
  if (langLabel) langLabel.textContent = lang === 'it' ? 'EN' : 'IT';

  document.documentElement.setAttribute('lang', lang);

  // restart the typing animation with the new language's words
  kgStartTypingRole(dict['hero.roleWords']);

  try { localStorage.setItem('kg-lang', lang); } catch (e) {}
}

/* ---------- TYPING ROLE ANIMATION ---------- */
let kgTypingTimer = null;
function kgStartTypingRole(wordsStr) {
  const el = document.getElementById('hero-role-text');
  if (!el) return;
  if (kgTypingTimer) { clearTimeout(kgTypingTimer); kgTypingTimer = null; }

  const words = (wordsStr || '').split('|').filter(Boolean);
  if (!words.length) { el.textContent = ''; return; }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    el.textContent = words[0];
    return;
  }

  let wordIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const current = words[wordIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        kgTypingTimer = setTimeout(tick, 1600);
        return;
      }
      kgTypingTimer = setTimeout(tick, 55);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        kgTypingTimer = setTimeout(tick, 300);
        return;
      }
      kgTypingTimer = setTimeout(tick, 30);
    }
  }
  tick();
}

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- CONFIG: social links ---------- */
  const SOCIAL_LINKS = {
    github: 'https://github.com/KamalGouaiche10',
    linkedin: 'https://www.linkedin.com/in/kamal-gouaiche-2584b8268'
  };
  const githubLink = document.getElementById('github-link');
  const linkedinLink = document.getElementById('linkedin-link');
  if (githubLink) githubLink.href = SOCIAL_LINKS.github;
  if (linkedinLink) linkedinLink.href = SOCIAL_LINKS.linkedin;

  /* ---------- THEME TOGGLE (dark = default) ---------- */
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = themeToggle ? themeToggle.querySelector('.icon-sun') : null;
  const moonIcon = themeToggle ? themeToggle.querySelector('.icon-moon') : null;

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      if (sunIcon) sunIcon.classList.add('hidden');
      if (moonIcon) moonIcon.classList.remove('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      if (sunIcon) sunIcon.classList.remove('hidden');
      if (moonIcon) moonIcon.classList.add('hidden');
    }
    if (themeToggle) themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    try { localStorage.setItem('kg-theme', theme); } catch (e) {}
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'light' : 'dark');
    });
  }
  // sync icons/aria with whatever the pre-paint inline script already applied
  setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');

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
    setTimeout(() => loader && loader.classList.add('hide'), 400);
  });
  if (document.readyState === 'complete') {
    setTimeout(() => loader && loader.classList.add('hide'), 400);
  }

  /* ---------- FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- NAVBAR: hide on scroll down, show on scroll up ---------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 120) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }
    lastScrollY = currentY;

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
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

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
  const revealTargets = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- LANGUAGE PROFICIENCY BARS ANIMATION ---------- */
  const langBlock = document.getElementById('lang-block');
  if (langBlock) {
    const langObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.skill-fill').forEach(fill => fill.classList.add('animate'));
          langObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    langObserver.observe(langBlock);
  }

  /* ---------- BACK TO TOP ---------- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- PROJECT FILTER (by tag / stack) ---------- */
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('#project-grid .card');

  const ACTIVE_CLASSES = ['bg-neutral-900', 'dark:bg-white', 'text-white', 'dark:text-neutral-900', 'border-neutral-900', 'dark:border-white'];
  const INACTIVE_CLASSES = ['border-neutral-200', 'dark:border-white/15', 'text-neutral-500', 'dark:text-neutral-400'];

  function setPillActive(pill, active) {
    pill.classList.toggle('active', active);
    if (active) {
      pill.classList.remove(...INACTIVE_CLASSES);
      pill.classList.add(...ACTIVE_CLASSES);
    } else {
      pill.classList.remove(...ACTIVE_CLASSES);
      pill.classList.add(...INACTIVE_CLASSES);
    }
  }

  function applyFilter(tag) {
    projectCards.forEach(card => {
      const tags = (card.dataset.tags || '').split(',').map(t => t.trim());
      const show = tag === 'all' || tags.includes(tag);
      card.classList.toggle('hidden', !show);
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => setPillActive(p, false));
      setPillActive(pill, true);
      applyFilter(pill.dataset.filter);
    });
  });

  document.querySelectorAll('.card-stack span').forEach(tagEl => {
    tagEl.addEventListener('click', () => {
      const tag = tagEl.textContent.trim();
      const matchingPill = Array.from(filterPills).find(p => p.dataset.filter === tag);
      if (matchingPill) {
        matchingPill.click();
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if (!prefersReducedMotion) {

    /* ---------- CURSOR SPOTLIGHT ---------- */
    const spotlight = document.getElementById('spotlight');
    if (spotlight) {
      window.addEventListener('pointermove', (e) => {
        spotlight.style.setProperty('--x', e.clientX + 'px');
        spotlight.style.setProperty('--y', e.clientY + 'px');
      }, { passive: true });
    }

    /* ---------- TILT CARDS ---------- */
    document.querySelectorAll('.tilt-card').forEach(card => {
      let rect = null;
      card.addEventListener('mouseenter', () => { rect = card.getBoundingClientRect(); });
      card.addEventListener('mousemove', (e) => {
        if (!rect) rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateX = (0.5 - py) * 8;
        const rotateY = (px - 0.5) * 10;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        rect = null;
      });
    });

    /* ---------- MAGNETIC BUTTONS ---------- */
    document.querySelectorAll('.magnetic').forEach(btn => {
      const strength = 18;
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${(relX / rect.width) * strength}px, ${(relY / rect.height) * strength}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

});
