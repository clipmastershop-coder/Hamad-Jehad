import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";

const BOOKING_URL = "https://clipmaster.se/b/iub52";

export default function ConsultingTeaser({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="consulting" className="border-b border-white/10 bg-navy-900 text-white">
      <div className="mx-auto max-w-site px-5 py-20 sm:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-white/60">
            {dict.sectionTitles.consultingKicker}
          </p>
          <h2 className="font-display mb-6 text-4xl font-extrabold uppercase leading-[1.1] tracking-tight sm:text-5xl">
            <span className="text-white">{dict.sectionTitles.consulting} </span>
            <span className="text-cyan">{dict.sectionTitles.consultingAccent}</span>
          </h2>
          <p className="mb-8 leading-relaxed text-white/70">{dict.sectionTitles.consultingSub}</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-cyan px-7 py-3.5 text-sm font-bold text-navy-900 transition hover:bg-cyan-600"
            >
              {dict.consultingCta}
            </a>
            <Link
              href={`/${locale}/consulting`}
              className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white"
            >
              {dict.consultingCtaSecondary}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          {dict.consultingServices.map((service) => (
            <div key={service.title} className="border-t border-white/15 pt-5">
              <h3 className="mb-2 text-lg font-bold">{service.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
