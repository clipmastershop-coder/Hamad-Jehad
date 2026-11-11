import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto max-w-site px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="font-latin mb-3 text-xl font-extrabold text-white">ClipMaster</p>
            <p className="max-w-sm text-sm leading-relaxed text-white/70">{dict.footer.pitch}</p>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold text-white">{dict.footer.quickLinksTitle}</p>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href={`/${locale}#products`} className="transition hover:text-white">{dict.nav.products}</Link></li>
              <li><Link href={`/${locale}#courses`} className="transition hover:text-white">{dict.nav.courses}</Link></li>
              <li><Link href={`/${locale}/consulting`} className="transition hover:text-white">{dict.nav.consulting}</Link></li>
              <li><Link href={`/${locale}/about`} className="transition hover:text-white">{dict.nav.about}</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold text-white">{dict.footer.contactTitle}</p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>{dict.footer.email}</li>
              <li>
                <a href="https://wa.me/966000000000" className="transition hover:text-white">
                  {dict.footer.whatsapp}
                </a>
              </li>
              <li className="flex gap-3 pt-1">
                <a href="https://instagram.com/clipmaster.se" aria-label="Instagram" className="transition hover:text-white">Instagram</a>
                <a href="https://tiktok.com/@clipmaster.se" aria-label="TikTok" className="transition hover:text-white">TikTok</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} ClipMaster. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
