/* ============================================
   KAMAL GOUAICHE — One Piece Portfolio Scripts
   Vanilla JS, no dependencies.
   ============================================ */

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
    '.about-grid, .timeline-entry, .chest, .fruit-group, .haki-block, .edu-entry, .mushi-wrap'
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

});
