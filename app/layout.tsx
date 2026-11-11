import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "متجري الرقمي",
  description: "منتجات رقمية جاهزة للتحميل الفوري بعد الدفع",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} bg-gray-50 text-gray-900`}>
        <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <a href="/" className="flex items-center gap-2 text-xl font-extrabold text-brand">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
                م
              </span>
              متجري الرقمي
            </a>
            <nav className="hidden items-center gap-6 text-sm font-semibold text-gray-600 sm:flex">
              <a href="/" className="transition hover:text-brand">
                المنتجات
              </a>
              <a href="#" className="transition hover:text-brand">
                من نحن
              </a>
              <a href="#" className="transition hover:text-brand">
                تواصل معنا
              </a>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        <footer className="mt-16 border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-gray-500">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <p className="mb-2 text-base font-bold text-gray-800">متجري الرقمي</p>
                <p>منتجات رقمية أصلية تتسلّمها فورًا بعد الدفع، بدون انتظار.</p>
              </div>
              <div>
                <p className="mb-2 font-semibold text-gray-800">روابط سريعة</p>
                <ul className="space-y-1">
                  <li><a href="/" className="hover:text-brand">المنتجات</a></li>
                  <li><a href="#" className="hover:text-brand">الأسئلة الشائعة</a></li>
                  <li><a href="#" className="hover:text-brand">سياسة الاسترجاع</a></li>
                </ul>
              </div>
              <div>
                <p className="mb-2 font-semibold text-gray-800">الدفع الآمن</p>
                <p>عبر Stripe — تشفير كامل لبياناتك المالية.</p>
              </div>
            </div>
            <p className="mt-8 border-t pt-6 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} متجري الرقمي. جميع الحقوق محفوظة.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
