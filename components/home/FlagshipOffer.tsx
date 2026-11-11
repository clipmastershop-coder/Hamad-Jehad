import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";

export default function FlagshipOffer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="border-b border-white/10 bg-navy-900 text-white">
      <div className="mx-auto max-w-site px-5 py-20 text-center sm:px-8">
        <p className="mb-5 text-sm font-bold uppercase tracking-wide text-cyan">
          {dict.flagshipOffer.eyebrow}
        </p>
        <h2 className="font-display mx-auto mb-6 max-w-2xl text-4xl font-extrabold uppercase leading-[1.1] tracking-tight sm:text-5xl">
          <span className="block text-white">{dict.flagshipOffer.headlineLine1}</span>
          <span className="block text-cyan">{dict.flagshipOffer.headlineAccent}</span>
        </h2>
        <p className="mx-auto mb-9 max-w-xl text-white/70">{dict.flagshipOffer.description}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${locale}/products`}
            className="rounded-full bg-cyan px-8 py-4 text-sm font-bold text-navy-900 transition hover:bg-cyan-600"
          >
            {dict.flagshipOffer.ctaPrimary}
          </Link>
          <Link
            href={`/${locale}/products`}
            className="rounded-full border border-white/30 px-8 py-4 text-sm font-bold text-white transition hover:border-white"
          >
            {dict.flagshipOffer.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
