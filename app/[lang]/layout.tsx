import type { Metadata } from "next";
import { Cairo, Manrope, Anton, Changa } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, locales, type Locale } from "@/lib/i18n/dictionaries";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartContext";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-ar",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-en",
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display-en",
});

const changa = Changa({
  subsets: ["arabic", "latin"],
  weight: ["700", "800"],
  variable: "--font-display-ar",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const isAr = params.lang === "ar";
  return {
    title: "ClipMaster | " + (isAr ? "منصة تطوير صالونات الحلاقة" : "Salon Growth Platform"),
    description: isAr
      ? "المعرفة والأدوات والاستشارات التي تحتاجها لإدارة صالونك باحترافية وتحقيق نمو أفضل."
      : "The knowledge, tools, and consulting you need to run your salon professionally and grow with confidence.",
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!locales.includes(params.lang as Locale)) notFound();
  const locale = params.lang as Locale;
  const dict = getDictionary(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cairo.variable} ${manrope.variable} ${anton.variable} ${changa.variable}`}
    >
      <body
        className={`${locale === "ar" ? "font-arabic" : "font-latin"} bg-surface text-ink antialiased`}
      >
        <CartProvider>
          <Header locale={locale} dict={dict} />
          {children}
          <Footer locale={locale} dict={dict} />
        </CartProvider>
      </body>
    </html>
  );
}
