import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function StatsBar({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-white/10 bg-ink">
      <div className="mx-auto grid max-w-site grid-cols-2 gap-8 px-5 py-12 sm:px-8 lg:grid-cols-4">
        {dict.stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-latin mb-1 text-4xl font-extrabold text-cyan sm:text-5xl">{stat.value}</p>
            <p className="text-sm text-white/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
