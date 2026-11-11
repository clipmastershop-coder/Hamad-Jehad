import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";

export default function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-navy-900 text-white">
      <div className="mx-auto grid max-w-site grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-6 text-sm font-bold uppercase tracking-wide text-cyan">
            {dict.hero.eyebrow}
          </p>
          <h1 className="mb-7 text-5xl font-extrabold leading-[1.05] sm:text-6xl">
            <span className="block text-white">{dict.hero.headlineLine1}</span>
            <span className="block text-cyan">{dict.hero.headlineAccent}</span>
          </h1>
          <p className="mb-9 max-w-md text-lg leading-relaxed text-white/70">{dict.hero.sub}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}#products`}
              className="rounded-full bg-cyan px-8 py-4 text-sm font-bold text-navy-900 transition hover:bg-cyan-600"
            >
              {dict.hero.ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="rounded-full border border-white/30 px-8 py-4 text-sm font-bold text-white transition hover:border-white"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <PhotoPlaceholder
          label={dict.hero.photoPlaceholder}
          className="aspect-[4/5] w-full sm:aspect-[5/4]"
        />
      </div>
    </section>
  );
}
