import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  await requireAdmin(params.lang);
  const locale = params.lang;

  const navItems = [
    { href: `/${locale}/admin`, label: "نظرة عامة" },
    { href: `/${locale}/admin/products`, label: "المنتجات" },
    { href: `/${locale}/admin/courses`, label: "الدورات" },
    { href: `/${locale}/admin/consulting`, label: "الاستشارات" },
    { href: `/${locale}/admin/testimonials`, label: "آراء العملاء" },
    { href: `/${locale}/admin/orders`, label: "الطلبات" },
  ];

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-site grid-cols-1 gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[220px_1fr]">
      <aside className="border-l-0 lg:border-l lg:border-ink/10 lg:pl-8">
        <p className="font-display mb-6 text-xl font-extrabold uppercase tracking-tight text-navy">
          لوحة التحكم
        </p>
        <nav className="flex flex-row flex-wrap gap-3 text-sm font-semibold text-ink/70 lg:flex-col">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-navy">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8">
          <LogoutButton locale={locale} />
        </div>
      </aside>
      <div>{children}</div>
    </div>
  );
}
