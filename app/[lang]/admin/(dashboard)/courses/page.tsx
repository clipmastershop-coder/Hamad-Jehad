import Link from "next/link";
import { getAllCoursesForAdmin } from "@/lib/data/courses";

export default async function AdminCoursesPage({ params }: { params: { lang: string } }) {
  const courses = await getAllCoursesForAdmin();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink">
          الدورات
        </h1>
        <Link
          href={`/${params.lang}/admin/courses/new`}
          className="rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white hover:bg-navy-900"
        >
          + دورة جديدة
        </Link>
      </div>

      <div className="divide-y divide-ink/10 border-t border-ink/10">
        {courses.map((course) => (
          <div key={course.id} className="flex items-center justify-between py-4">
            <div>
              <p className="font-bold text-ink">{course.title.ar}</p>
              <p className="text-sm text-ink/50">
                {course.published ? "منشور" : "مخفي"} · {course.featured ? "مميز" : "عادي"}
                {course.price_cents ? ` · ${(course.price_cents / 100).toFixed(2)} ${course.currency.toUpperCase()}` : ""}
              </p>
            </div>
            <Link
              href={`/${params.lang}/admin/courses/${course.id}`}
              className="text-sm font-bold text-cyan-600 hover:text-navy"
            >
              تعديل ←
            </Link>
          </div>
        ))}
        {courses.length === 0 && <p className="py-8 text-sm text-ink/50">لا توجد دورات بعد.</p>}
      </div>
    </div>
  );
}
