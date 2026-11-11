import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";

export default function PersonalStory({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="border-b border-ink/10 bg-white">
      <div className="mx-auto grid max-w-site grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2">
        <PhotoPlaceholder label={dict.story.photoPlaceholder} className="aspect-[4/5] w-full lg:order-2" />

        <div className="lg:order-1">
          <p className="mb-5 text-sm font-bold uppercase tracking-wide text-cyan-600">{dict.story.eyebrow}</p>
          <h2 className="mb-7 text-4xl font-extrabold leading-[1.1] text-ink sm:text-5xl">
            <span className="block">{dict.story.headlineLine1}</span>
            <span className="block text-navy">{dict.story.headlineAccent}</span>
          </h2>
          {dict.story.paragraphs.map((paragraph, i) => (
            <p key={i} className="mb-4 leading-relaxed text-ink/70">
              {paragraph}
            </p>
          ))}
          <Link
            href={`/${locale}/about`}
            className="mt-4 inline-block rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white transition hover:bg-navy-900"
          >
            {dict.story.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
