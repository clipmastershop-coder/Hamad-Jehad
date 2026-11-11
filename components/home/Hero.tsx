import Link from "next/link";
import Image from "next/image";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";

export default function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-navy-900 text-white">
      <div className="mx-auto grid max-w-site grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-6 text-sm font-bold uppercase tracking-wide text-cyan">
            {dict.hero.eyebrow}
          </p>
          <h1 className="font-display mb-7 text-5xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-6xl">
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

        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/4]">
          <Image
            src="/images/founder.jpg"
            alt={dict.hero.founderName}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#1a0f08]/35 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-5 py-5">
            <p className="font-bold text-white">{dict.hero.founderName}</p>
            <p className="text-sm text-white/70">{dict.hero.founderTitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
