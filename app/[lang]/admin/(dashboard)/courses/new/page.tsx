import CourseForm from "../CourseForm";

export default function NewCoursePage({ params }: { params: { lang: string } }) {
  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-extrabold uppercase tracking-tight text-ink">
        دورة جديدة
      </h1>
      <CourseForm locale={params.lang} />
    </div>
  );
}
