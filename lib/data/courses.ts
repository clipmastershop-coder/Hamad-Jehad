import { getDb, newId } from "@/lib/db";
import type { Course } from "@/lib/types";

type CourseRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  lessons_count: number | null;
  duration: string;
  price_cents: number | null;
  currency: string;
  cover_image: string | null;
  external_url: string | null;
  featured: number;
  published: number;
  sort_order: number;
};

function mapRow(row: CourseRow): Course {
  return {
    id: row.id,
    slug: row.slug,
    title: JSON.parse(row.title),
    description: JSON.parse(row.description),
    lessons_count: row.lessons_count,
    duration: JSON.parse(row.duration),
    price_cents: row.price_cents,
    currency: row.currency,
    cover_image: row.cover_image,
    external_url: row.external_url,
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    sort_order: row.sort_order,
  };
}

export async function getFeaturedCourses(limit = 3): Promise<Course[]> {
  const db = getDb();
  const rows = db
    .prepare("select * from courses where published = 1 and featured = 1 order by sort_order asc limit ?")
    .all(limit) as CourseRow[];
  return rows.map(mapRow);
}

export async function getAllPublishedCourses(): Promise<Course[]> {
  const db = getDb();
  const rows = db.prepare("select * from courses where published = 1 order by sort_order asc").all() as CourseRow[];
  return rows.map(mapRow);
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const db = getDb();
  const row = db.prepare("select * from courses where slug = ?").get(slug) as CourseRow | undefined;
  return row ? mapRow(row) : null;
}

export async function getCourseById(id: string): Promise<Course | null> {
  const db = getDb();
  const row = db.prepare("select * from courses where id = ?").get(id) as CourseRow | undefined;
  return row ? mapRow(row) : null;
}

export async function getAllCoursesForAdmin(): Promise<Course[]> {
  const db = getDb();
  const rows = db.prepare("select * from courses order by sort_order asc").all() as CourseRow[];
  return rows.map(mapRow);
}

type CourseInput = Partial<Course> & { id?: string };

export async function upsertCourse(course: CourseInput) {
  const db = getDb();
  const id = course.id ?? newId();
  db.prepare(
    `insert into courses (id, slug, title, description, lessons_count, duration, price_cents, currency, cover_image, external_url, featured, published, sort_order)
     values (@id, @slug, @title, @description, @lessons_count, @duration, @price_cents, @currency, @cover_image, @external_url, @featured, @published, @sort_order)
     on conflict(id) do update set
       slug=excluded.slug, title=excluded.title, description=excluded.description, lessons_count=excluded.lessons_count,
       duration=excluded.duration, price_cents=excluded.price_cents, currency=excluded.currency,
       cover_image=excluded.cover_image, external_url=excluded.external_url, featured=excluded.featured,
       published=excluded.published, sort_order=excluded.sort_order`
  ).run({
    id,
    slug: course.slug ?? "",
    title: JSON.stringify(course.title ?? { ar: "", en: "" }),
    description: JSON.stringify(course.description ?? { ar: "", en: "" }),
    lessons_count: course.lessons_count ?? null,
    duration: JSON.stringify(course.duration ?? { ar: "", en: "" }),
    price_cents: course.price_cents ?? null,
    currency: course.currency ?? "usd",
    cover_image: course.cover_image ?? null,
    external_url: course.external_url ?? null,
    featured: course.featured ? 1 : 0,
    published: course.published === false ? 0 : 1,
    sort_order: course.sort_order ?? 0,
  });
}

export async function deleteCourse(id: string) {
  const db = getDb();
  db.prepare("delete from courses where id = ?").run(id);
}
