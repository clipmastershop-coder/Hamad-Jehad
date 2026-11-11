import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./MobileNav";

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const navItems = [
    { href: `/${locale}#products`, label: dict.nav.products },
    { href: `/${locale}#courses`, label: dict.nav.courses },
    { href: `/${locale}/consulting`, label: dict.nav.consulting },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-white">
      <div className="relative mx-auto flex max-w-site items-center justify-between px-5 py-4 sm:px-8">
        <Link href={`/${locale}`} className="font-latin text-xl font-extrabold tracking-tight2 text-navy">
          ClipMaster
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-ink/70 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-navy">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <Link
            href={`/${locale}/contact`}
            className="hidden rounded bg-navy px-4 py-2 text-sm font-bold text-white transition hover:bg-navy-900 sm:inline-block"
          >
            {dict.header.bookConsultation}
          </Link>
          <MobileNav navItems={navItems} bookLabel={dict.header.bookConsultation} bookHref={`/${locale}/contact`} />
        </div>
      </div>
    </header>
  );
}
