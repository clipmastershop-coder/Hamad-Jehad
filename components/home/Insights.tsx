import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";

export default function Insights({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="border-b border-ink/10 bg-surface">
      <div className="mx-auto max-w-site px-5 py-20 sm:px-8">
        <div className="mb-12 max-w-xl">
          <h2 className="mb-3 text-4xl font-extrabold leading-[1.1] text-ink sm:text-5xl">
            {dict.sectionTitles.insights}
          </h2>
          <p className="text-ink/60">{dict.sectionTitles.insightsSub}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {dict.articles.map((article) => (
            <Link
              key={article.title}
              href={`/${locale}/blog`}
              className="group block border-t-2 border-navy pt-5"
            >
              <div className="mb-3 flex items-center gap-3 text-xs font-bold text-cyan-600">
                <span>{article.category}</span>
                <span className="h-1 w-1 rounded-full bg-ink/30" />
                <span className="text-ink/40">{article.readTime}</span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-ink transition group-hover:text-navy">
                {article.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink/60">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
