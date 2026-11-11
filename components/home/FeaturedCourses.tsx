import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";
import type { Course } from "@/lib/types";

export default function FeaturedCourses({
  locale,
  dict,
  courses,
}: {
  locale: Locale;
  dict: Dictionary;
  courses: Course[];
}) {
  if (courses.length === 0) return null;

  return (
    <section id="courses" className="border-b border-ink/10 bg-white">
      <div className="mx-auto max-w-site px-5 py-20 sm:px-8">
        <div className="mb-12 max-w-xl">
          <h2 className="font-display mb-3 text-4xl font-extrabold uppercase leading-[1.1] tracking-tight text-ink sm:text-5xl">
            {dict.sectionTitles.courses}
          </h2>
          <p className="text-ink/60">{dict.sectionTitles.coursesSub}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const startLabel = locale === "ar" ? "ابدأ الدورة ←" : "Start course →";
            const href = course.external_url ?? `/${locale}/courses/${course.slug}`;
            const isExternal = Boolean(course.external_url);
            return (
              <article key={course.id} className="flex flex-col border border-ink/10 p-6">
                <div className="mb-4 flex items-center gap-3 text-xs font-bold text-ink/50">
                  {course.lessons_count != null && (
                    <>
                      <span>{course.lessons_count} {locale === "ar" ? "درس" : "lessons"}</span>
                      <span className="h-1 w-1 rounded-full bg-ink/30" />
                    </>
                  )}
                  <span>{course.duration[locale]}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-ink">{course.title[locale]}</h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-ink/60">{course.description[locale]}</p>
                <div className="flex items-center justify-between border-t border-ink/10 pt-4">
                  {course.price_cents != null ? (
                    <span className="text-lg font-extrabold text-navy">
                      {(course.price_cents / 100).toFixed(2)} {course.currency.toUpperCase()}
                    </span>
                  ) : (
                    <span />
                  )}
                  {isExternal ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-cyan-600 transition hover:text-navy">
                      {startLabel}
                    </a>
                  ) : (
                    <Link href={href} className="text-sm font-bold text-cyan-600 transition hover:text-navy">
                      {startLabel}
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
