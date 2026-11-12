import { getDb, newId } from "@/lib/db";
import type { ConsultingService } from "@/lib/types";

type ServiceRow = {
  id: string;
  title: string;
  description: string;
  published: number;
  sort_order: number;
};

function mapRow(row: ServiceRow): ConsultingService {
  return {
    id: row.id,
    title: JSON.parse(row.title),
    description: JSON.parse(row.description),
    published: Boolean(row.published),
    sort_order: row.sort_order,
  };
}

export async function getPublishedConsultingServices(): Promise<ConsultingService[]> {
  const db = getDb();
  const rows = db
    .prepare("select * from consulting_services where published = 1 order by sort_order asc")
    .all() as ServiceRow[];
  return rows.map(mapRow);
}

export async function getAllConsultingServicesForAdmin(): Promise<ConsultingService[]> {
  const db = getDb();
  const rows = db.prepare("select * from consulting_services order by sort_order asc").all() as ServiceRow[];
  return rows.map(mapRow);
}

type ServiceInput = Partial<ConsultingService> & { id?: string };

export async function upsertConsultingService(service: ServiceInput) {
  const db = getDb();
  const id = service.id ?? newId();
  db.prepare(
    `insert into consulting_services (id, title, description, published, sort_order)
     values (@id, @title, @description, @published, @sort_order)
     on conflict(id) do update set
       title=excluded.title, description=excluded.description, published=excluded.published, sort_order=excluded.sort_order`
  ).run({
    id,
    title: JSON.stringify(service.title ?? { ar: "", en: "" }),
    description: JSON.stringify(service.description ?? { ar: "", en: "" }),
    published: service.published === false ? 0 : 1,
    sort_order: service.sort_order ?? 0,
  });
}

export async function deleteConsultingService(id: string) {
  const db = getDb();
  db.prepare("delete from consulting_services where id = ?").run(id);
}
