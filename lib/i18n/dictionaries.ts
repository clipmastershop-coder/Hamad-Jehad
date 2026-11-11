export type Locale = "ar" | "en";
export const locales: Locale[] = ["ar", "en"];
export const defaultLocale: Locale = "ar";

type NavDict = { products: string; courses: string; consulting: string; about: string; blog: string; contact: string };
type HeroDict = {
  eyebrow: string;
  headlineLine1: string;
  headlineAccent: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  founderName: string;
  founderTitle: string;
};
type StatDict = { value: string; label: string };
type StoryDict = {
  eyebrow: string;
  headlineLine1: string;
  headlineAccent: string;
  paragraphs: string[];
  cta: string;
};
type FlagshipOfferDict = {
  badge: string;
  headlineLine1: string;
  headlineAccent: string;
  description: string;
  price: string;
  ctaPrimary: string;
  ctaSecondary: string;
};
type SectionTitlesDict = {
  products: string;
  productsSub: string;
  courses: string;
  coursesSub: string;
  consultingKicker: string;
  consulting: string;
  consultingAccent: string;
  consultingSub: string;
  why: string;
  insights: string;
  insightsSub: string;
  testimonials: string;
  newsletter: string;
};
type WhyPointDict = { number: string; title: string; description: string };
type ArticleDict = { category: string; title: string; excerpt: string; readTime: string };
type NewsletterDict = { title: string; description: string; placeholder: string; button: string; success: string };
type FooterDict = {
  pitch: string;
  quickLinksTitle: string;
  resourcesTitle: string;
  contactTitle: string;
  whatsapp: string;
  email: string;
  rights: string;
};
type ComingSoonDict = { title: string; description: string; back: string };

export type Dictionary = {
  nav: NavDict;
  header: { bookConsultation: string };
  hero: HeroDict;
  stats: StatDict[];
  story: StoryDict;
  flagshipOffer: FlagshipOfferDict;
  sectionTitles: SectionTitlesDict;
  consultingCta: string;
  consultingCtaSecondary: string;
  whyPoints: WhyPointDict[];
  articles: ArticleDict[];
  newsletter: NewsletterDict;
  footer: FooterDict;
  comingSoon: ComingSoonDict;
};

export const dictionaries: Record<Locale, Dictionary> = {
  ar: {
    nav: {
      products: "المنتجات",
      courses: "الدورات",
      consulting: "الاستشارات",
      about: "من نحن",
      blog: "المقالات",
      contact: "تواصل معنا",
    },
    header: { bookConsultation: "احجز استشارة" },
    hero: {
      eyebrow: "استشاري وخبير نمو الصالونات",
      headlineLine1: "طوّر صالونك. ارفع أداءك.",
      headlineAccent: "وابنِ مشروعاً أقوى.",
      sub: "إدارة · تسويق · إعلانات · زيادة الحجوزات — خبرة في تطوير 500+ صالون حول العالم.",
      ctaPrimary: "اكتشف المنتجات",
      ctaSecondary: "احجز استشارة",
      founderName: "حمد",
      founderTitle: "استشاري وخبير نمو الصالونات",
    },
    stats: [
      { value: "+500", label: "صالون حول العالم" },
      { value: "+1200", label: "متدرب أكمل الدورات" },
      { value: "12", label: "سنة خبرة في القطاع" },
      { value: "98%", label: "نسبة رضا العملاء" },
    ],
    story: {
      eyebrow: "قصة حمد",
      headlineLine1: "بدأت من صالون واحد.",
      headlineAccent: "واتعلمت الطريقة الصعبة.",
      paragraphs: [
        "زي أي صاحب صالون، بدأت بشغف بس من غير نظام واضح — حجوزات متفرقة، مصاريف مش متابَعة، وتسويق عشوائي.",
        "غيّرت الموضوع لما بنيت نظام واضح لإدارة الصالون، وده اللي خلاني أقدر أساعد أصحاب صالونات تانية يوصلوا لنفس النتيجة من غير ما ياخدوا وقت التجربة والخطأ اللي أخدته أنا.",
      ],
      cta: "اقرأ قصتي كاملة",
    },
    flagshipOffer: {
      badge: "دورة تدريبية شاملة من ClipMaster",
      headlineLine1: "ماجستير",
      headlineAccent: "إدارة الصالونات.",
      description: "صالونك لا يحتاج وجودك الدائم، يحتاج نظامك الصحيح. دورة شاملة تساعدك على الانتقال من حلاق يدير يومه بالجهد، إلى صاحب مشروع يدير نظاماً متكاملاً قابلاً للنمو.",
      price: "$97",
      ctaPrimary: "اشترِ الدورة الآن",
      ctaSecondary: "كل المنتجات",
    },
    sectionTitles: {
      products: "منتجات رقمية مختارة",
      productsSub: "أدوات وقوالب جاهزة لتطبيقها في صالونك مباشرة",
      courses: "الدورات التدريبية",
      coursesSub: "تعلّم خطوة بخطوة من خبراء القطاع",
      consultingKicker: "أكثر من مجرد حلاقة...",
      consulting: "إنها",
      consultingAccent: "إدارة ذكية",
      consultingSub: "حوّل صالونك إلى مشروع يحقق أرباحًا مستدامة. أساعد أصحاب صالونات الحلاقة على تطوير أعمالهم عبر استشارة فردية مباشرة — بعيدًا عن النصائح العامة، وقريبًا من خطوات عملية فعلية.",
      why: "لماذا ClipMaster؟",
      insights: "مقالات ومعرفة",
      insightsSub: "أفكار عملية لإدارة صالون أكثر احترافية",
      testimonials: "ماذا يقول عملاؤنا",
      newsletter: "اشترك في نشرتنا",
    },
    consultingCta: "احجز الآن",
    consultingCtaSecondary: "ابدأ الفحص المجاني",
    whyPoints: [
      { number: "01", title: "خبرة متخصصة", description: "محتوى مبني على تجارب حقيقية في قطاع الصالونات." },
      { number: "02", title: "أدوات جاهزة للتطبيق", description: "قوالب وخطط تستخدمها في عملك من اليوم الأول." },
      { number: "03", title: "دعم مباشر", description: "استشارات فردية مصممة لاحتياجات مشروعك بالتحديد." },
    ],
    articles: [
      {
        category: "إدارة",
        title: "5 أخطاء شائعة في إدارة الصالونات وكيف تتجنبها",
        excerpt: "نظرة عملية على أكثر الأخطاء التي تكلّف أصحاب الصالونات أرباحهم.",
        readTime: "6 دقائق",
      },
      {
        category: "تسويق",
        title: "كيف تبني حضورًا قويًا لصالونك على السوشيال ميديا",
        excerpt: "خطوات عملية لزيادة الحجوزات من خلال المحتوى والتفاعل.",
        readTime: "5 دقائق",
      },
      {
        category: "مالية",
        title: "كيف تحسب هامش الربح الحقيقي لصالونك",
        excerpt: "دليل مبسّط لفهم أرقامك المالية واتخاذ قرارات أفضل.",
        readTime: "7 دقائق",
      },
    ],
    newsletter: {
      title: "نصائح أسبوعية لإدارة صالون أفضل",
      description: "انضم لقائمة أصحاب الصالونات اللي بيستقبلوا أفكار عملية كل أسبوع.",
      placeholder: "بريدك الإلكتروني",
      button: "اشترك",
      success: "تم الاشتراك بنجاح، أهلاً بك معنا!",
    },
    footer: {
      pitch: "منصة متخصصة في تطوير صالونات الحلاقة عبر المعرفة والأدوات والاستشارات.",
      quickLinksTitle: "روابط سريعة",
      resourcesTitle: "موارد",
      contactTitle: "تواصل معنا",
      whatsapp: "تواصل عبر واتساب",
      email: "hello@clipmaster.se",
      rights: "جميع الحقوق محفوظة.",
    },
    comingSoon: {
      title: "هذا القسم قيد الإنشاء",
      description: "نعمل حاليًا على بناء هذه الصفحة بكامل تفاصيلها. تابعنا قريبًا.",
      back: "رجوع للرئيسية",
    },
  },
  en: {
    nav: {
      products: "Products",
      courses: "Courses",
      consulting: "Consulting",
      about: "About",
      blog: "Blog",
      contact: "Contact",
    },
    header: { bookConsultation: "Book a Consultation" },
    hero: {
      eyebrow: "Salon Growth Consultant & Expert",
      headlineLine1: "Elevate your salon. Sharpen your edge.",
      headlineAccent: "Build a stronger business.",
      sub: "Management · Marketing · Ads · Increasing bookings — experience growing 500+ salons worldwide.",
      ctaPrimary: "Explore Products",
      ctaSecondary: "Book a Consultation",
      founderName: "Hamad",
      founderTitle: "Salon Growth Consultant & Expert",
    },
    stats: [
      { value: "500+", label: "salons worldwide" },
      { value: "1,200+", label: "students who completed a course" },
      { value: "12", label: "years of industry experience" },
      { value: "98%", label: "client satisfaction rate" },
    ],
    story: {
      eyebrow: "Hamad's Story",
      headlineLine1: "I started with one salon.",
      headlineAccent: "And learned the hard way.",
      paragraphs: [
        "Like any salon owner, I started with passion but no real system — scattered bookings, untracked expenses, and random marketing.",
        "Everything changed once I built a clear system to run the salon — and that's what lets me help other salon owners reach the same result without the years of trial and error it took me.",
      ],
      cta: "Read My Full Story",
    },
    flagshipOffer: {
      badge: "A Complete Training Course by ClipMaster",
      headlineLine1: "Salon Management",
      headlineAccent: "Masterclass.",
      description: "Your salon doesn't need you there all the time — it needs the right system. A complete course that takes you from a barber running his day through effort, to a business owner running an integrated system built to grow.",
      price: "$97",
      ctaPrimary: "Get The Course Now",
      ctaSecondary: "All Products",
    },
    sectionTitles: {
      products: "Featured Digital Products",
      productsSub: "Ready-to-use tools and templates for your salon",
      courses: "Training Courses",
      coursesSub: "Learn step by step from industry experts",
      consultingKicker: "More than just a barbershop...",
      consulting: "It's",
      consultingAccent: "Smart Management.",
      consultingSub: "Turn your salon into a business that generates sustainable profit. I help barbershop owners grow their business through direct, one-on-one consulting — far from generic advice, and close to real, practical steps.",
      why: "Why ClipMaster?",
      insights: "Insights & Articles",
      insightsSub: "Practical ideas for running a more professional salon",
      testimonials: "What Our Clients Say",
      newsletter: "Join Our Newsletter",
    },
    consultingCta: "Book Now",
    consultingCtaSecondary: "Start The Free Assessment",
    whyPoints: [
      { number: "01", title: "Specialized Expertise", description: "Content built on real experience in the salon industry." },
      { number: "02", title: "Ready-to-Apply Tools", description: "Templates and plans you can use in your business from day one." },
      { number: "03", title: "Direct Support", description: "One-on-one consulting tailored to your specific business." },
    ],
    articles: [
      {
        category: "Management",
        title: "5 Common Salon Management Mistakes and How to Avoid Them",
        excerpt: "A practical look at the mistakes that cost salon owners their profits.",
        readTime: "6 min",
      },
      {
        category: "Marketing",
        title: "How to Build a Strong Social Media Presence for Your Salon",
        excerpt: "Practical steps to increase bookings through content and engagement.",
        readTime: "5 min",
      },
      {
        category: "Finance",
        title: "How to Calculate Your Salon's Real Profit Margin",
        excerpt: "A simplified guide to understanding your numbers and making better decisions.",
        readTime: "7 min",
      },
    ],
    newsletter: {
      title: "Weekly tips for running a better salon",
      description: "Join salon owners who get practical ideas delivered every week.",
      placeholder: "Your email address",
      button: "Subscribe",
      success: "You're subscribed — welcome aboard!",
    },
    footer: {
      pitch: "A specialized platform for growing barbershop businesses through knowledge, tools, and consulting.",
      quickLinksTitle: "Quick Links",
      resourcesTitle: "Resources",
      contactTitle: "Contact",
      whatsapp: "Chat on WhatsApp",
      email: "hello@clipmaster.se",
      rights: "All rights reserved.",
    },
    comingSoon: {
      title: "This section is under construction",
      description: "We're currently building this page in full detail. Check back soon.",
      back: "Back to home",
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
