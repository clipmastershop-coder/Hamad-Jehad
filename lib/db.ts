import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { hashPassword } from "@/lib/passwords";

const DB_PATH = path.join(process.cwd(), "data", "clipmaster.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  db.exec(`
    create table if not exists users (
      id text primary key,
      email text unique not null,
      password_hash text not null,
      is_admin integer not null default 0,
      created_at text not null default (datetime('now'))
    );

    create table if not exists products (
      id text primary key,
      slug text unique not null,
      tag text not null default '{}',
      title text not null default '{}',
      description text not null default '{}',
      price_cents integer,
      currency text not null default 'usd',
      cover_image text,
      file_path text,
      external_url text,
      featured integer not null default 0,
      published integer not null default 1,
      sort_order integer not null default 0,
      created_at text not null default (datetime('now'))
    );

    create table if not exists courses (
      id text primary key,
      slug text unique not null,
      title text not null default '{}',
      description text not null default '{}',
      lessons_count integer,
      duration text not null default '{}',
      price_cents integer,
      currency text not null default 'usd',
      cover_image text,
      external_url text,
      featured integer not null default 0,
      published integer not null default 1,
      sort_order integer not null default 0,
      created_at text not null default (datetime('now'))
    );

    create table if not exists consulting_services (
      id text primary key,
      title text not null default '{}',
      description text not null default '{}',
      published integer not null default 1,
      sort_order integer not null default 0,
      created_at text not null default (datetime('now'))
    );

    create table if not exists testimonials (
      id text primary key,
      quote text not null default '{}',
      result text not null default '{}',
      name text not null,
      role text not null default '{}',
      published integer not null default 1,
      sort_order integer not null default 0,
      created_at text not null default (datetime('now'))
    );

    create table if not exists articles (
      id text primary key,
      slug text unique not null,
      category text not null default '{}',
      title text not null default '{}',
      excerpt text not null default '{}',
      body text not null default '{}',
      read_time text not null default '{}',
      published integer not null default 1,
      published_at text not null default (datetime('now'))
    );

    create table if not exists coupons (
      id text primary key,
      code text unique not null,
      percent_off real,
      amount_off_cents integer,
      active integer not null default 1,
      expires_at text,
      created_at text not null default (datetime('now'))
    );

    create table if not exists orders (
      id text primary key,
      customer_id text references users (id) on delete set null,
      email text not null,
      stripe_session_id text unique,
      status text not null default 'pending',
      subtotal_cents integer not null default 0,
      discount_cents integer not null default 0,
      total_cents integer not null default 0,
      currency text not null default 'usd',
      coupon_code text,
      created_at text not null default (datetime('now')),
      paid_at text
    );

    create table if not exists order_items (
      id text primary key,
      order_id text not null references orders (id) on delete cascade,
      item_type text not null,
      item_id text not null,
      title_snapshot text not null default '{}',
      unit_price_cents integer not null default 0,
      quantity integer not null default 1
    );
  `);

  seedIfEmpty(db);
  seedDefaultAdmin(db);

  return db;
}

function seedDefaultAdmin(database: Database.Database) {
  const { count } = database.prepare("select count(*) as count from users where is_admin = 1").get() as {
    count: number;
  };
  if (count > 0) return;

  const email = process.env.ADMIN_EMAIL || "admin@clipmaster.se";
  const password = process.env.ADMIN_PASSWORD || "ClipMaster2026!";

  database
    .prepare("insert or ignore into users (id, email, password_hash, is_admin) values (?, ?, ?, 1)")
    .run(newId(), email, hashPassword(password));
}

export function newId(): string {
  return crypto.randomUUID();
}

function seedIfEmpty(database: Database.Database) {
  const { count } = database.prepare("select count(*) as count from products").get() as { count: number };
  if (count > 0) return;

  const insertProduct = database.prepare(`
    insert into products (id, slug, tag, title, description, price_cents, currency, external_url, featured, sort_order)
    values (@id, @slug, @tag, @title, @description, @price_cents, @currency, @external_url, @featured, @sort_order)
  `);
  insertProduct.run({
    id: newId(),
    slug: "tasis-wa-edarat-salon",
    tag: JSON.stringify({ ar: "كتاب", en: "Book" }),
    title: JSON.stringify({
      ar: "تأسيس وإدارة صالون حلاقة ناجح في السعودية",
      en: "Building & Managing a Successful Barbershop in Saudi Arabia",
    }),
    description: JSON.stringify({
      ar: "من حلاق إلى صاحب مشروع ناجح — خطط لنمو مشروعك، إدارة احترافية لصالونك، وابنِ فريقاً ناجحاً.",
      en: "From barber to successful business owner — plans to grow your business, professional salon management, and how to build a winning team.",
    }),
    price_cents: 2450,
    currency: "usd",
    external_url: "https://clipmaster.se/b/VzXgm",
    featured: 1,
    sort_order: 1,
  });
  insertProduct.run({
    id: newId(),
    slug: "fan-edarat-salon-al-halaka",
    tag: JSON.stringify({ ar: "كتاب", en: "Book" }),
    title: JSON.stringify({ ar: "فن إدارة صالون الحلاقة", en: "The Art of Barbershop Management" }),
    description: JSON.stringify({
      ar: "دليلك العملي لتتحول من الحرفة إلى التجارة المربحة.",
      en: "Your practical guide to turn the craft into a profitable business.",
    }),
    price_cents: 4900,
    currency: "usd",
    external_url: "https://clipmaster.se/b/barbershopmanagement",
    featured: 1,
    sort_order: 2,
  });

  database
    .prepare(
      `insert into courses (id, slug, title, description, price_cents, currency, external_url, featured, sort_order)
       values (@id, @slug, @title, @description, @price_cents, @currency, @external_url, @featured, @sort_order)`
    )
    .run({
      id: newId(),
      slug: "majestir-edarat-salonat",
      title: JSON.stringify({ ar: "ماجستير إدارة الصالونات", en: "Salon Management Masterclass" }),
      description: JSON.stringify({
        ar: "صالونك لا يحتاج وجودك الدائم، يحتاج نظامك الصحيح. دورة شاملة تساعدك على الانتقال من حلاق يدير يومه بالجهد، إلى صاحب مشروع يدير نظاماً متكاملاً قابلاً للنمو.",
        en: "Your salon doesn't need you there all the time — it needs the right system. A complete course that takes you from a barber running his day through effort, to a business owner running an integrated system built to grow.",
      }),
      price_cents: 9700,
      currency: "usd",
      external_url: "https://clipmaster.se/b/v01SB",
      featured: 1,
      sort_order: 1,
    });

  const insertService = database.prepare(`
    insert into consulting_services (id, title, description, sort_order) values (@id, @title, @description, @sort_order)
  `);
  [
    {
      title: { ar: "تقييم أداء الصالون", en: "Salon Performance Evaluation" },
      description: {
        ar: "مراجعة شاملة للعمليات والإيرادات وتحديد نقاط التحسين.",
        en: "A full review of operations and revenue to identify what to improve.",
      },
    },
    {
      title: { ar: "استراتيجية التسويق", en: "Marketing Strategy" },
      description: {
        ar: "خطة مخصصة لجذب عملاء جدد وزيادة الحجوزات.",
        en: "A tailored plan to attract new clients and increase bookings.",
      },
    },
    {
      title: { ar: "استشارة تأسيس صالون جديد", en: "New Salon Launch Consulting" },
      description: {
        ar: "مرافقة كاملة من اختيار الموقع حتى يوم الافتتاح.",
        en: "Full guidance from choosing a location to opening day.",
      },
    },
    {
      title: { ar: "تقييم الحضور الرقمي", en: "Digital Presence Audit" },
      description: {
        ar: "تحليل حضورك على السوشيال ميديا وخطة لتحسينه.",
        en: "An analysis of your social media presence with a plan to improve it.",
      },
    },
  ].forEach((service, i) => {
    insertService.run({
      id: newId(),
      title: JSON.stringify(service.title),
      description: JSON.stringify(service.description),
      sort_order: i + 1,
    });
  });

  const insertTestimonial = database.prepare(`
    insert into testimonials (id, quote, result, name, role, sort_order)
    values (@id, @quote, @result, @name, @role, @sort_order)
  `);
  insertTestimonial.run({
    id: newId(),
    quote: JSON.stringify({
      ar: "القوالب والدورات غيّرت طريقة إدارتي لصالوني تمامًا. أرقامي واضحة الآن واتخذ قرارات بثقة.",
      en: "The templates and courses completely changed how I manage my salon. My numbers are clear now and I decide with confidence.",
    }),
    result: JSON.stringify({ ar: "+45% حجوزات", en: "+45% bookings" }),
    name: "عبدالله الشهري",
    role: JSON.stringify({ ar: "مالك صالون، الرياض", en: "Salon Owner, Riyadh" }),
    sort_order: 1,
  });
  insertTestimonial.run({
    id: newId(),
    quote: JSON.stringify({
      ar: "الاستشارة ساعدتني أفتتح صالوني الجديد بخطة واضحة من أول يوم بدل التجربة والخطأ.",
      en: "The consultation helped me open my new salon with a clear plan from day one instead of trial and error.",
    }),
    result: JSON.stringify({ ar: "افتتاح خلال 60 يوم", en: "Opened in 60 days" }),
    name: "فهد العتيبي",
    role: JSON.stringify({ ar: "مستثمر صالونات، جدة", en: "Salon Investor, Jeddah" }),
    sort_order: 2,
  });
}
