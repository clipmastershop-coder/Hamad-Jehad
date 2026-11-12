import { getDb, newId } from "@/lib/db";
import type { Product } from "@/lib/types";

type ProductRow = {
  id: string;
  slug: string;
  tag: string;
  title: string;
  description: string;
  price_cents: number | null;
  currency: string;
  cover_image: string | null;
  file_path: string | null;
  external_url: string | null;
  featured: number;
  published: number;
  sort_order: number;
};

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    tag: JSON.parse(row.tag),
    title: JSON.parse(row.title),
    description: JSON.parse(row.description),
    price_cents: row.price_cents,
    currency: row.currency,
    cover_image: row.cover_image,
    file_path: row.file_path,
    external_url: row.external_url,
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    sort_order: row.sort_order,
  };
}

export async function getFeaturedProducts(limit = 3): Promise<Product[]> {
  const db = getDb();
  const rows = db
    .prepare("select * from products where published = 1 and featured = 1 order by sort_order asc limit ?")
    .all(limit) as ProductRow[];
  return rows.map(mapRow);
}

export async function getAllPublishedProducts(): Promise<Product[]> {
  const db = getDb();
  const rows = db.prepare("select * from products where published = 1 order by sort_order asc").all() as ProductRow[];
  return rows.map(mapRow);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = getDb();
  const row = db.prepare("select * from products where slug = ?").get(slug) as ProductRow | undefined;
  return row ? mapRow(row) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const db = getDb();
  const row = db.prepare("select * from products where id = ?").get(id) as ProductRow | undefined;
  return row ? mapRow(row) : null;
}

export async function getAllProductsForAdmin(): Promise<Product[]> {
  const db = getDb();
  const rows = db.prepare("select * from products order by sort_order asc").all() as ProductRow[];
  return rows.map(mapRow);
}

type ProductInput = Partial<Product> & { id?: string };

export async function upsertProduct(product: ProductInput) {
  const db = getDb();
  const id = product.id ?? newId();
  db.prepare(
    `insert into products (id, slug, tag, title, description, price_cents, currency, cover_image, file_path, external_url, featured, published, sort_order)
     values (@id, @slug, @tag, @title, @description, @price_cents, @currency, @cover_image, @file_path, @external_url, @featured, @published, @sort_order)
     on conflict(id) do update set
       slug=excluded.slug, tag=excluded.tag, title=excluded.title, description=excluded.description,
       price_cents=excluded.price_cents, currency=excluded.currency, cover_image=excluded.cover_image,
       file_path=excluded.file_path, external_url=excluded.external_url, featured=excluded.featured,
       published=excluded.published, sort_order=excluded.sort_order`
  ).run({
    id,
    slug: product.slug ?? "",
    tag: JSON.stringify(product.tag ?? { ar: "", en: "" }),
    title: JSON.stringify(product.title ?? { ar: "", en: "" }),
    description: JSON.stringify(product.description ?? { ar: "", en: "" }),
    price_cents: product.price_cents ?? null,
    currency: product.currency ?? "usd",
    cover_image: product.cover_image ?? null,
    file_path: product.file_path ?? null,
    external_url: product.external_url ?? null,
    featured: product.featured ? 1 : 0,
    published: product.published === false ? 0 : 1,
    sort_order: product.sort_order ?? 0,
  });
}

export async function deleteProduct(id: string) {
  const db = getDb();
  db.prepare("delete from products where id = ?").run(id);
}
