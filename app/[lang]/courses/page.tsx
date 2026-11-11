import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n/dictionaries";
import { getAllPublishedCourses } from "@/lib/data/courses";

export const dynamic = "force-dynamic";

export default async function CoursesPage({ params }: { params: { lang: string } }) {
  const locale = params.lang as Locale;
  const dict = getDictionary(locale);
  const courses = await getAllPublishedCourses();

  return (
    <main className="mx-auto max-w-site px-5 py-16 sm:px-8">
      <h1 className="font-display mb-3 text-4xl font-extrabold uppercase leading-[1.1] tracking-tight text-ink sm:text-5xl">
        {dict.sectionTitles.courses}
      </h1>
      <p className="mb-12 text-ink/60">{dict.sectionTitles.coursesSub}</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/${locale}/courses/${course.slug}`}
            className="flex flex-col border border-ink/10 p-6 transition hover:-translate-y-0.5 hover:shadow-md"
          >
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
            {course.price_cents != null && (
              <span className="text-lg font-extrabold text-navy">
                {(course.price_cents / 100).toFixed(2)} {course.currency.toUpperCase()}
              </span>
            )}
          </Link>
        ))}
        {courses.length === 0 && <p className="text-sm text-ink/50">لا توجد دورات منشورة حاليًا.</p>}
      </div>
    </main>
  );
}
