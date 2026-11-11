import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";
import type { Testimonial } from "@/lib/types";

export default function Testimonials({
  locale,
  dict,
  testimonials,
}: {
  locale: Locale;
  dict: Dictionary;
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-b border-ink/10 bg-white">
      <div className="mx-auto max-w-site px-5 py-20 sm:px-8">
        <h2 className="font-display mb-12 text-4xl font-extrabold uppercase leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {dict.sectionTitles.testimonials}
        </h2>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.id} className="border border-ink/10 p-8">
              <p className="font-display mb-5 text-3xl font-extrabold text-navy">{testimonial.result[locale]}</p>
              <blockquote className="mb-6 text-base leading-relaxed text-ink/80">
                “{testimonial.quote[locale]}”
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-ink/10 pt-4">
                <span className="flex h-10 w-10 items-center justify-center bg-navy-50 text-sm font-bold text-navy">
                  {testimonial.name.charAt(0)}
                </span>
                <span>
                  <p className="text-sm font-bold text-ink">{testimonial.name}</p>
                  <p className="text-sm text-ink/50">{testimonial.role[locale]}</p>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
