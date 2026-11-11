import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";

export default function ConsultingTeaser({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="consulting" className="border-b border-white/10 bg-navy-900 text-white">
      <div className="mx-auto max-w-site px-5 py-20 sm:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <h2 className="mb-3 text-4xl font-extrabold leading-[1.1] sm:text-5xl">{dict.sectionTitles.consulting}</h2>
            <p className="text-white/60">{dict.sectionTitles.consultingSub}</p>
          </div>
          <Link
            href={`/${locale}/consulting`}
            className="shrink-0 rounded-full bg-cyan px-7 py-3.5 text-sm font-bold text-navy-900 transition hover:bg-cyan-600"
          >
            {dict.consultingCta}
          </Link>
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
