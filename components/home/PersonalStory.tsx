import Link from "next/link";
import Image from "next/image";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";

export default function PersonalStory({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="border-b border-ink/10 bg-white">
      <div className="mx-auto grid max-w-site grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden lg:order-2">
          <Image
            src="/images/founder.jpg"
            alt={dict.hero.founderName}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </div>

        <div className="lg:order-1">
          <p className="mb-5 text-sm font-bold uppercase tracking-wide text-cyan-600">{dict.story.eyebrow}</p>
          <h2 className="font-display mb-7 text-4xl font-extrabold uppercase leading-[1.1] tracking-tight text-ink sm:text-5xl">
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
