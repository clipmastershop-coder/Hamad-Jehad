import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/data/courses";
import CourseForm from "../CourseForm";

export default async function EditCoursePage({ params }: { params: { lang: string; id: string } }) {
  const course = await getCourseById(params.id);
  if (!course) notFound();

  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-extrabold uppercase tracking-tight text-ink">
        تعديل الدورة
      </h1>
      <CourseForm locale={params.lang} course={course} />
    </div>
  );
}
