import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "متجر المنتجات الرقمية",
  description: "منتجات رقمية جاهزة للتحميل الفوري بعد الدفع",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <a href="/" className="text-xl font-bold text-brand">
              متجري الرقمي
            </a>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
        <footer className="mt-10 border-t py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} متجري الرقمي
        </footer>
      </body>
    </html>
  );
}
