import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function Testimonials({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-ink/10 bg-white">
      <div className="mx-auto max-w-site px-5 py-20 sm:px-8">
        <h2 className="mb-12 text-3xl font-extrabold text-navy sm:text-4xl">
          {dict.sectionTitles.testimonials}
        </h2>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {dict.testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="border border-ink/10 p-7">
              <blockquote className="mb-5 text-base leading-relaxed text-ink/80">
                “{testimonial.quote}”
              </blockquote>
              <figcaption>
                <p className="text-sm font-bold text-ink">{testimonial.name}</p>
                <p className="text-sm text-ink/50">{testimonial.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
