import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";

export default function FeaturedCourses({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="courses" className="border-b border-ink/10 bg-white">
      <div className="mx-auto max-w-site px-5 py-20 sm:px-8">
        <div className="mb-12 max-w-xl">
          <h2 className="mb-3 text-3xl font-extrabold text-navy sm:text-4xl">
            {dict.sectionTitles.courses}
          </h2>
          <p className="text-ink/60">{dict.sectionTitles.coursesSub}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.courses.map((course) => (
            <article key={course.title} className="flex flex-col border border-ink/10 p-6">
              <div className="mb-4 flex items-center gap-3 text-xs font-bold text-ink/50">
                <span>{course.lessons}</span>
                <span className="h-1 w-1 rounded-full bg-ink/30" />
                <span>{course.duration}</span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-ink">{course.title}</h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-ink/60">{course.description}</p>
              <div className="flex items-center justify-between border-t border-ink/10 pt-4">
                <span className="text-lg font-extrabold text-navy">
                  {course.price} {course.currency}
                </span>
                <Link
                  href={`/${locale}/courses`}
                  className="text-sm font-bold text-cyan-600 transition hover:text-navy"
                >
                  {locale === "ar" ? "ابدأ الدورة ←" : "Start course →"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
