import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";

export default function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="border-b border-ink/10 bg-white">
      <div className="mx-auto grid max-w-site grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-wide text-cyan-600">
            {dict.hero.eyebrow}
          </p>
          <h1 className="mb-6 text-4xl font-extrabold leading-[1.15] text-navy sm:text-5xl">
            {dict.hero.headline}
          </h1>
          <p className="mb-9 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
            {dict.hero.sub}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}#products`}
              className="rounded bg-navy px-7 py-3.5 text-sm font-bold text-white transition hover:bg-navy-900"
            >
              {dict.hero.ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="rounded border border-ink/20 px-7 py-3.5 text-sm font-bold text-ink transition hover:border-navy hover:text-navy"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded bg-navy-900 sm:aspect-[5/4]">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 40px)",
            }}
          />
          <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full border border-cyan/40" />
          <div className="absolute inset-0 flex items-end p-6 sm:p-10">
            <div className="w-full rounded border border-white/15 bg-navy-900 p-5">
              <p className="font-latin text-3xl font-extrabold text-white">+500</p>
              <p className="mt-1 text-sm text-white/70">
                {locale === "ar" ? "صالون استخدم منتجاتنا" : "salons using our products"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
