document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -------- قائمة الموبايل --------
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });

  // -------- سكرول ناعم (Lenis) --------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lenis = null;
  if (!prefersReducedMotion && window.Lenis) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  if (!window.gsap || !window.ScrollTrigger) return; // لو المكتبات ما تحمّلت (لا إنترنت)، الموقع يضل يشتغل بدون حركات
  gsap.registerPlugin(ScrollTrigger);
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // -------- دخول عناصر الهيرو --------
  gsap.timeline({ delay: 0.2 }).to('[data-hero]', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
  });
  gsap.set('[data-hero]', { y: 24 });

  // -------- قسم "الفكرة": تثبيت + تكبير الصورة + ظهور البطاقة --------
  const featureSection = document.querySelector('.feature-pin');
  if (featureSection) {
    gsap.timeline({
      scrollTrigger: {
        trigger: featureSection,
        start: 'top top',
        end: '+=90%',
        scrub: 0.6,
        pin: true,
      },
    })
      .fromTo('.feature-img', { scale: 1 }, { scale: 1.12, ease: 'none' }, 0)
      .fromTo('.feature-copy', { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none' }, 0.1);
    gsap.set('.feature-copy', { opacity: 0 });
  }

  // -------- قسم "قصتنا": خلفية تتحرك ببطء (parallax بسيط) --------
  const storyBg = document.querySelector('.story-bg');
  if (storyBg) {
    gsap.to(storyBg, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: { trigger: storyBg.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  // -------- عدّادات الأرقام --------
  document.querySelectorAll('.counter').forEach((el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
        });
      },
    });
  });

  // -------- ظهور تدريجي عادي لبقية الأقسام --------
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });

  // -------- سلايدر آراء العملاء (تبديل كل 5 ثواني) --------
  const quotes = document.querySelectorAll('#quoteSlider .quote');
  const dotsWrap = document.getElementById('quoteDots');
  let activeQuote = 0;
  if (quotes.length && dotsWrap) {
    quotes.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `رأي ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => showQuote(i));
      dotsWrap.appendChild(dot);
    });
    function showQuote(index) {
      quotes[activeQuote].classList.add('hidden');
      dotsWrap.children[activeQuote].classList.remove('active');
      activeQuote = index;
      quotes[activeQuote].classList.remove('hidden');
      dotsWrap.children[activeQuote].classList.add('active');
    }
    setInterval(() => showQuote((activeQuote + 1) % quotes.length), 5000);
  }

  // -------- نموذج التواصل --------
  // ضع رابط Formspree هنا لتفعيل استقبال الرسائل فعليًا (راجع agency-starter/README.md)
  const ACTION_URL = '';
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!ACTION_URL) {
      status.textContent = 'ضع رابط Formspree في assets/js/script.js (متغيّر ACTION_URL) لتفعيل إرسال الرسائل.';
      status.className = 'text-sm text-amber-600';
      status.classList.remove('hidden');
      return;
    }
    try {
      const response = await fetch(ACTION_URL, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      if (!response.ok) throw new Error('failed');
      status.textContent = 'تم إرسال رسالتك بنجاح!';
      status.className = 'text-sm text-green-600';
      form.reset();
    } catch {
      status.textContent = 'حدث خطأ، حاول مرة أخرى أو تواصل عبر الهاتف.';
      status.className = 'text-sm text-red-600';
    }
    status.classList.remove('hidden');
  });
});
