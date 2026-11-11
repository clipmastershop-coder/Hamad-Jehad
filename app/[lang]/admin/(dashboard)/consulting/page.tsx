import { getAllConsultingServicesForAdmin } from "@/lib/data/consulting";
import ConsultingEditor from "./ConsultingEditor";

export default async function AdminConsultingPage({ params }: { params: { lang: string } }) {
  const services = await getAllConsultingServicesForAdmin();

  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-extrabold uppercase tracking-tight text-ink">
        خدمات الاستشارات
      </h1>
      <ConsultingEditor locale={params.lang} services={services} />
    </div>
  );
}
