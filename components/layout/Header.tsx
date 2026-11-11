import Link from "next/link";
import Image from "next/image";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./MobileNav";
import CartLink from "@/components/cart/CartLink";
import { getCurrentUser } from "@/lib/auth";

export default async function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const user = await getCurrentUser();
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
        <Link href={`/${locale}`} className="shrink-0">
          <Image src="/images/logo.jpg" alt="ClipMaster" width={1170} height={558} className="h-8 w-auto sm:h-9" priority />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-ink/70 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-navy">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/account${user ? "" : "/login"}`}
            className="hidden text-sm font-semibold text-ink/70 transition hover:text-navy sm:inline-block"
          >
            {locale === "ar" ? (user ? "حسابي" : "دخول") : user ? "My Account" : "Log In"}
          </Link>
          <CartLink locale={locale} />
          <LanguageSwitcher locale={locale} />
          <Link
            href={`/${locale}/contact`}
            className="hidden rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-900 sm:inline-block"
          >
            {dict.header.bookConsultation}
          </Link>
          <MobileNav navItems={navItems} bookLabel={dict.header.bookConsultation} bookHref={`/${locale}/contact`} />
        </div>
      </div>
    </header>
  );
}
