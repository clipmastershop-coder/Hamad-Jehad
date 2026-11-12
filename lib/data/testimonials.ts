import { getDb, newId } from "@/lib/db";
import type { Testimonial } from "@/lib/types";

type TestimonialRow = {
  id: string;
  quote: string;
  result: string;
  name: string;
  role: string;
  published: number;
  sort_order: number;
};

function mapRow(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    quote: JSON.parse(row.quote),
    result: JSON.parse(row.result),
    name: row.name,
    role: JSON.parse(row.role),
    published: Boolean(row.published),
    sort_order: row.sort_order,
  };
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const db = getDb();
  const rows = db
    .prepare("select * from testimonials where published = 1 order by sort_order asc")
    .all() as TestimonialRow[];
  return rows.map(mapRow);
}

export async function getAllTestimonialsForAdmin(): Promise<Testimonial[]> {
  const db = getDb();
  const rows = db.prepare("select * from testimonials order by sort_order asc").all() as TestimonialRow[];
  return rows.map(mapRow);
}

type TestimonialInput = Partial<Testimonial> & { id?: string };

export async function upsertTestimonial(testimonial: TestimonialInput) {
  const db = getDb();
  const id = testimonial.id ?? newId();
  db.prepare(
    `insert into testimonials (id, quote, result, name, role, published, sort_order)
     values (@id, @quote, @result, @name, @role, @published, @sort_order)
     on conflict(id) do update set
       quote=excluded.quote, result=excluded.result, name=excluded.name, role=excluded.role,
       published=excluded.published, sort_order=excluded.sort_order`
  ).run({
    id,
    quote: JSON.stringify(testimonial.quote ?? { ar: "", en: "" }),
    result: JSON.stringify(testimonial.result ?? { ar: "", en: "" }),
    name: testimonial.name ?? "",
    role: JSON.stringify(testimonial.role ?? { ar: "", en: "" }),
    published: testimonial.published === false ? 0 : 1,
    sort_order: testimonial.sort_order ?? 0,
  });
}

export async function deleteTestimonial(id: string) {
  const db = getDb();
  db.prepare("delete from testimonials where id = ?").run(id);
}
