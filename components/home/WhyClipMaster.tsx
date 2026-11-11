import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function WhyClipMaster({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-ink/10 bg-white">
      <div className="mx-auto max-w-site px-5 py-20 sm:px-8">
        <h2 className="mb-12 text-3xl font-extrabold text-navy sm:text-4xl">{dict.sectionTitles.why}</h2>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {dict.whyPoints.map((point) => (
            <div key={point.number}>
              <p className="font-latin mb-4 text-4xl font-extrabold text-cyan">{point.number}</p>
              <h3 className="mb-2 text-lg font-bold text-ink">{point.title}</h3>
              <p className="text-sm leading-relaxed text-ink/60">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
