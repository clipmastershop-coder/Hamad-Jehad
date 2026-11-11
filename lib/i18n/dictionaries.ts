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
  eyebrow: string;
  headlineLine1: string;
  headlineAccent: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
};
type SectionTitlesDict = {
  products: string;
  productsSub: string;
  courses: string;
  coursesSub: string;
  consulting: string;
  consultingSub: string;
  why: string;
  insights: string;
  insightsSub: string;
  testimonials: string;
  newsletter: string;
};
type ProductDict = { tag: string; title: string; description: string; price: string; currency: string };
type CourseDict = { title: string; description: string; lessons: string; duration: string; price: string; currency: string };
type ServiceDict = { title: string; description: string };
type WhyPointDict = { number: string; title: string; description: string };
type ArticleDict = { category: string; title: string; excerpt: string; readTime: string };
type TestimonialDict = { quote: string; name: string; role: string; result: string };
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
  products: ProductDict[];
  courses: CourseDict[];
  consultingServices: ServiceDict[];
  consultingCta: string;
  whyPoints: WhyPointDict[];
  articles: ArticleDict[];
  testimonials: TestimonialDict[];
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
      eyebrow: "المنتج الرئيسي",
      headlineLine1: "دليل ClipMaster الشامل",
      headlineAccent: "لإدارة صالون مربح.",
      description: "كل اللي اتعلمته من سنين خبرة في خطوات عملية واضحة — من التأسيس للتسويق للإدارة المالية.",
      ctaPrimary: "احصل على الدليل الآن",
      ctaSecondary: "كل المنتجات",
    },
    sectionTitles: {
      products: "منتجات رقمية مختارة",
      productsSub: "أدوات وقوالب جاهزة لتطبيقها في صالونك مباشرة",
      courses: "الدورات التدريبية",
      coursesSub: "تعلّم خطوة بخطوة من خبراء القطاع",
      consulting: "خدمات الاستشارات",
      consultingSub: "دعم مباشر ومخصص لاحتياجات مشروعك",
      why: "لماذا ClipMaster؟",
      insights: "مقالات ومعرفة",
      insightsSub: "أفكار عملية لإدارة صالون أكثر احترافية",
      testimonials: "ماذا يقول عملاؤنا",
      newsletter: "اشترك في نشرتنا",
    },
    products: [
      {
        tag: "قالب أعمال",
        title: "خطة عمل تأسيس صالون حلاقة",
        description: "نموذج جاهز لتخطيط وتقييم مشروعك قبل الافتتاح أو التوسع.",
        price: "149",
        currency: "ر.س",
      },
      {
        tag: "ملف مالي",
        title: "نموذج مالي لإدارة الصالون",
        description: "جدول احترافي لتتبع المصروفات والإيرادات وهامش الربح شهريًا.",
        price: "99",
        currency: "ر.س",
      },
      {
        tag: "دليل تسويق",
        title: "دليل التسويق للصالونات",
        description: "استراتيجيات عملية لجذب عملاء جدد والحفاظ على الحاليين.",
        price: "129",
        currency: "ر.س",
      },
    ],
    courses: [
      {
        title: "إدارة صالونات الحلاقة الاحترافية",
        description: "من التشغيل اليومي إلى بناء فريق عمل منظّم ومربح.",
        lessons: "14 درس",
        duration: "5 ساعات",
        price: "399",
        currency: "ر.س",
      },
      {
        title: "التسويق الرقمي للصالونات",
        description: "خطة تسويق عملية عبر السوشيال ميديا وجوجل لصالونك.",
        lessons: "10 دروس",
        duration: "3.5 ساعة",
        price: "299",
        currency: "ر.س",
      },
      {
        title: "تأسيس مشروع صالون من الصفر",
        description: "دليل متكامل من الفكرة حتى الافتتاح الرسمي.",
        lessons: "18 درس",
        duration: "6 ساعات",
        price: "499",
        currency: "ر.س",
      },
    ],
    consultingServices: [
      { title: "تقييم أداء الصالون", description: "مراجعة شاملة للعمليات والإيرادات وتحديد نقاط التحسين." },
      { title: "استراتيجية التسويق", description: "خطة مخصصة لجذب عملاء جدد وزيادة الحجوزات." },
      { title: "استشارة تأسيس صالون جديد", description: "مرافقة كاملة من اختيار الموقع حتى يوم الافتتاح." },
      { title: "تقييم الحضور الرقمي", description: "تحليل حضورك على السوشيال ميديا وخطة لتحسينه." },
    ],
    consultingCta: "احجز استشارتك الآن",
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
    testimonials: [
      {
        result: "+45% حجوزات",
        quote: "القوالب والدورات غيّرت طريقة إدارتي لصالوني تمامًا. أرقامي واضحة الآن واتخذ قرارات بثقة.",
        name: "عبدالله الشهري",
        role: "مالك صالون، الرياض",
      },
      {
        result: "افتتاح خلال 60 يوم",
        quote: "الاستشارة ساعدتني أفتتح صالوني الجديد بخطة واضحة من أول يوم بدل التجربة والخطأ.",
        name: "فهد العتيبي",
        role: "مستثمر صالونات، جدة",
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
      eyebrow: "Flagship Product",
      headlineLine1: "The Complete ClipMaster Guide",
      headlineAccent: "to running a profitable salon.",
      description: "Everything I've learned from years of experience, in clear practical steps — from launch to marketing to financial management.",
      ctaPrimary: "Get The Guide Now",
      ctaSecondary: "All Products",
    },
    sectionTitles: {
      products: "Featured Digital Products",
      productsSub: "Ready-to-use tools and templates for your salon",
      courses: "Training Courses",
      coursesSub: "Learn step by step from industry experts",
      consulting: "Consulting Services",
      consultingSub: "Direct, tailored support for your business",
      why: "Why ClipMaster?",
      insights: "Insights & Articles",
      insightsSub: "Practical ideas for running a more professional salon",
      testimonials: "What Our Clients Say",
      newsletter: "Join Our Newsletter",
    },
    products: [
      {
        tag: "Business Template",
        title: "Barbershop Business Plan Template",
        description: "A ready-made framework to plan and evaluate your business before launch or expansion.",
        price: "39",
        currency: "USD",
      },
      {
        tag: "Financial Sheet",
        title: "Salon Financial Management Sheet",
        description: "A professional spreadsheet to track expenses, revenue, and profit margins monthly.",
        price: "25",
        currency: "USD",
      },
      {
        tag: "Marketing Guide",
        title: "Salon Marketing Playbook",
        description: "Practical strategies to attract new clients and retain existing ones.",
        price: "34",
        currency: "USD",
      },
    ],
    courses: [
      {
        title: "Professional Barbershop Management",
        description: "From daily operations to building an organized, profitable team.",
        lessons: "14 lessons",
        duration: "5 hours",
        price: "105",
        currency: "USD",
      },
      {
        title: "Digital Marketing for Salons",
        description: "A practical marketing plan across social media and Google for your salon.",
        lessons: "10 lessons",
        duration: "3.5 hours",
        price: "79",
        currency: "USD",
      },
      {
        title: "Launching a Salon From Scratch",
        description: "A complete guide from the idea to opening day.",
        lessons: "18 lessons",
        duration: "6 hours",
        price: "129",
        currency: "USD",
      },
    ],
    consultingServices: [
      { title: "Salon Performance Evaluation", description: "A full review of operations and revenue to identify what to improve." },
      { title: "Marketing Strategy", description: "A tailored plan to attract new clients and increase bookings." },
      { title: "New Salon Launch Consulting", description: "Full guidance from choosing a location to opening day." },
      { title: "Digital Presence Audit", description: "An analysis of your social media presence with a plan to improve it." },
    ],
    consultingCta: "Book Your Consultation",
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
    testimonials: [
      {
        result: "+45% bookings",
        quote: "The templates and courses completely changed how I manage my salon. My numbers are clear now and I decide with confidence.",
        name: "Abdullah Al-Shehri",
        role: "Salon Owner, Riyadh",
      },
      {
        result: "Opened in 60 days",
        quote: "The consultation helped me open my new salon with a clear plan from day one instead of trial and error.",
        name: "Fahad Al-Otaibi",
        role: "Salon Investor, Jeddah",
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
