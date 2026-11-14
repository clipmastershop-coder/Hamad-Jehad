// لا حاجة لأي تثبيت أو خطوة بناء — جافاسكريبت عادي يعمل مباشرة في المتصفح.

document.addEventListener('DOMContentLoaded', () => {
  // السنة في الفوتر
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -------- قائمة الموبايل --------
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = menuBtn.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    });
    // إغلاق القائمة عند الضغط على أي رابط فيها
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // -------- ظل شريط التنقّل + زر العودة للأعلى عند التمرير --------
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 30;
    navbar?.classList.toggle('scrolled', scrolled);
    if (backToTop) {
      backToTop.classList.toggle('hidden', window.scrollY < 400);
      backToTop.classList.toggle('flex', window.scrollY >= 400);
    }
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // -------- تمييز رابط القسم الحالي في شريط التنقّل --------
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

  // -------- ظهور تدريجي للعناصر عند التمرير --------
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

  // -------- نموذج التواصل --------
  // لإرسال الرسائل فعليًا إلى بريدك: أنشئ فورم على formspree.io (مجاني)
  // وضع رابطه في ACTION_URL بالأسفل. التفاصيل كاملة في README.md.
  const ACTION_URL = ''; // مثال: 'https://formspree.io/f/xxxxxxxx'
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!ACTION_URL) {
      status.textContent = 'ضع رابط Formspree في assets/js/script.js (متغيّر ACTION_URL) لتفعيل إرسال الرسائل.';
      status.className = 'text-sm text-center text-amber-600';
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
        status.textContent = 'تم إرسال رسالتك بنجاح، سنتواصل معك قريبًا!';
        status.className = 'text-sm text-center text-green-600';
        form.reset();
      } else {
        throw new Error('فشل الإرسال');
      }
    } catch (err) {
      status.textContent = 'حدث خطأ أثناء الإرسال، حاول مرة أخرى أو تواصل عبر الهاتف.';
      status.className = 'text-sm text-center text-red-600';
    }
    status.classList.remove('hidden');
  });
});
