document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -------- Mobile menu --------
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = menuBtn.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // -------- Navbar shadow + back-to-top on scroll --------
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 30);
    if (backToTop) {
      backToTop.classList.toggle('hidden', window.scrollY < 400);
      backToTop.classList.toggle('flex', window.scrollY >= 400);
    }
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // -------- Active section highlight --------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  // -------- Scroll reveal --------
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // -------- Contact form --------
  // Create a free form at formspree.io and put its endpoint below to make
  // this form actually deliver booking requests by email.
  const ACTION_URL = ''; // e.g. 'https://formspree.io/f/xxxxxxxx'
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!ACTION_URL) {
      status.textContent = 'Set ACTION_URL in assets/js/script.js (Formspree endpoint) to enable this form.';
      status.className = 'text-sm text-center text-amber-400';
      status.classList.remove('hidden');
      return;
    }
    try {
      const response = await fetch(ACTION_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (response.ok) {
        status.textContent = 'Thanks! Your request was sent — we will get back to you shortly.';
        status.className = 'text-sm text-center text-green-400';
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      status.textContent = 'Something went wrong sending your request — please call us instead.';
      status.className = 'text-sm text-center text-red-400';
    }
    status.classList.remove('hidden');
  });
});
