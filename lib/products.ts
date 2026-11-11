export type Product = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  currency: string;
  image: string;
  /** اسم الملف داخل مجلد digital-products (غير متاح للعامة، يُسلَّم فقط بعد الدفع) */
  fileName: string;
};

export const products: Product[] = [
  {
    id: "starter-template-pack",
    name: "حزمة قوالب تصميم جاهزة",
    description: "مجموعة قوالب Figma جاهزة للمواقع الشخصية والمتاجر الصغيرة.",
    priceCents: 1900,
    currency: "usd",
    image: "/images/product-1.svg",
    fileName: "starter-template-pack.zip",
  },
  {
    id: "ebook-growth",
    name: "كتاب: أساسيات التسويق الرقمي",
    description: "كتاب إلكتروني PDF يشرح خطوات بناء جمهور وبيع منتجاتك أونلاين.",
    priceCents: 1200,
    currency: "usd",
    image: "/images/product-2.svg",
    fileName: "ebook-growth.pdf",
  },
  {
    id: "icon-pack",
    name: "حزمة أيقونات عصرية",
    description: "+200 أيقونة SVG بأسلوب موحّد، جاهزة للاستخدام في أي مشروع تصميم.",
    priceCents: 900,
    currency: "usd",
    image: "/images/product-3.svg",
    fileName: "icon-pack.zip",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
