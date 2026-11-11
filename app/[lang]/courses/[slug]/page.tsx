import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseBySlug } from "@/lib/data/courses";
import type { Locale } from "@/lib/i18n/dictionaries";
import AddToCartButton from "@/components/cart/AddToCartButton";

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({ params }: { params: { lang: string; slug: string } }) {
  const locale = params.lang as Locale;
  const course = await getCourseBySlug(params.slug);
  if (!course || !course.published) notFound();

  const backLabel = locale === "ar" ? "← رجوع للدورات" : "← Back to courses";
  const enrollExternalLabel = locale === "ar" ? "اشترِ الدورة الآن" : "Enroll Now";
  const addToCartLabel = locale === "ar" ? "أضف للسلة" : "Add to Cart";

  return (
    <main className="mx-auto max-w-site px-5 py-16 sm:px-8">
      <Link href={`/${locale}/courses`} className="mb-6 inline-block text-sm font-semibold text-ink/50 hover:text-navy">
        {backLabel}
      </Link>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center gap-3 text-xs font-bold text-ink/50">
            {course.lessons_count != null && (
              <>
                <span>{course.lessons_count} {locale === "ar" ? "درس" : "lessons"}</span>
                <span className="h-1 w-1 rounded-full bg-ink/30" />
              </>
            )}
            <span>{course.duration[locale]}</span>
          </div>
          <h1 className="font-display mb-4 text-3xl font-extrabold uppercase leading-[1.1] tracking-tight text-ink sm:text-4xl">
            {course.title[locale]}
          </h1>
          <p className="leading-relaxed text-ink/70">{course.description[locale]}</p>
        </div>

        <div className="border border-ink/10 p-6">
          {course.price_cents != null && (
            <p className="font-display mb-5 text-3xl font-extrabold text-navy">
              {(course.price_cents / 100).toFixed(2)} {course.currency.toUpperCase()}
            </p>
          )}

          {course.external_url ? (
            <a
              href={course.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-navy px-7 py-3.5 text-center text-sm font-bold text-white transition hover:bg-navy-900"
            >
              {enrollExternalLabel}
            </a>
          ) : (
            <AddToCartButton
              locale={locale}
              label={addToCartLabel}
              item={{
                itemType: "course",
                itemId: course.id,
                slug: course.slug,
                title: course.title[locale],
                priceCents: course.price_cents ?? 0,
                currency: course.currency,
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
