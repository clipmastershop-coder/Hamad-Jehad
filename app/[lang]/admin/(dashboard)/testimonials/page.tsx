import { getAllTestimonialsForAdmin } from "@/lib/data/testimonials";
import TestimonialEditor from "./TestimonialEditor";

export default async function AdminTestimonialsPage({ params }: { params: { lang: string } }) {
  const testimonials = await getAllTestimonialsForAdmin();

  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-extrabold uppercase tracking-tight text-ink">
        آراء العملاء
      </h1>
      <TestimonialEditor locale={params.lang} testimonials={testimonials} />
    </div>
  );
}
