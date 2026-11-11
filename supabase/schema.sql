-- ============================================================================
-- ClipMaster — Supabase schema
-- شغّل هذا الملف كامل مرة واحدة في: Supabase Dashboard → SQL Editor → New query
-- ============================================================================

-- ---------------------------------------------------------------------------
-- profiles: صف واحد لكل مستخدم مسجّل، لمعرفة هل هو أدمن أم لا
-- ---------------------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- ينشئ صف profile تلقائيًا عند تسجيل أي مستخدم جديد
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email) values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- دالة مساعدة تُستخدم داخل سياسات RLS للتحقق هل المستخدم الحالي أدمن
create or replace function is_admin()
returns boolean as $$
  select coalesce((select is_admin from profiles where id = auth.uid()), false);
$$ language sql security definer stable;

-- ---------------------------------------------------------------------------
-- products: المنتجات الرقمية (كتب، قوالب...)
-- title/description/tag: {"ar": "...", "en": "..."}
-- external_url: لو المنتج بيتباع فعليًا على منصة خارجية (Payhip) بدل التحميل المباشر
-- file_path: مسار الملف داخل bucket التخزين "digital-products" (لو التسليم من عندنا)
-- ---------------------------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  tag jsonb not null default '{}',
  title jsonb not null default '{}',
  description jsonb not null default '{}',
  price_cents integer,
  currency text not null default 'usd',
  cover_image text,
  file_path text,
  external_url text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- courses: الدورات التدريبية
-- ---------------------------------------------------------------------------
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title jsonb not null default '{}',
  description jsonb not null default '{}',
  lessons_count integer,
  duration jsonb not null default '{}',
  price_cents integer,
  currency text not null default 'usd',
  cover_image text,
  external_url text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- consulting_services: قائمة خدمات الاستشارات المعروضة في الصفحة
-- ---------------------------------------------------------------------------
create table if not exists consulting_services (
  id uuid primary key default gen_random_uuid(),
  title jsonb not null default '{}',
  description jsonb not null default '{}',
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- testimonials: آراء العملاء
-- ---------------------------------------------------------------------------
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote jsonb not null default '{}',
  result jsonb not null default '{}',
  name text not null,
  role jsonb not null default '{}',
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- articles: مقالات المدونة
-- ---------------------------------------------------------------------------
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category jsonb not null default '{}',
  title jsonb not null default '{}',
  excerpt jsonb not null default '{}',
  body jsonb not null default '{}',
  read_time jsonb not null default '{}',
  published boolean not null default true,
  published_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- coupons: أكواد الخصم
-- ---------------------------------------------------------------------------
create table if not exists coupons (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  percent_off numeric,
  amount_off_cents integer,
  active boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- orders + order_items: الطلبات (تُكتب فقط من كود السيرفر بصلاحية service role)
-- ---------------------------------------------------------------------------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references auth.users (id) on delete set null,
  email text not null,
  stripe_session_id text unique,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  subtotal_cents integer not null default 0,
  discount_cents integer not null default 0,
  total_cents integer not null default 0,
  currency text not null default 'usd',
  coupon_code text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders (id) on delete cascade,
  item_type text not null check (item_type in ('product', 'course')),
  item_id uuid not null,
  title_snapshot jsonb not null default '{}',
  unit_price_cents integer not null default 0,
  quantity integer not null default 1
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table profiles enable row level security;
alter table products enable row level security;
alter table courses enable row level security;
alter table consulting_services enable row level security;
alter table testimonials enable row level security;
alter table articles enable row level security;
alter table coupons enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- profiles: المستخدم يشوف ملفه بس، الأدمن يشوف الكل
drop policy if exists "profiles_select_own_or_admin" on profiles;
create policy "profiles_select_own_or_admin" on profiles
  for select using (id = auth.uid() or is_admin());

-- محتوى عام (منتجات/دورات/استشارات/تقييمات/مقالات): الكل يشوف المنشور، الأدمن يتحكم بالكامل
drop policy if exists "products_public_read" on products;
create policy "products_public_read" on products for select using (published = true or is_admin());
drop policy if exists "products_admin_write" on products;
create policy "products_admin_write" on products for all using (is_admin()) with check (is_admin());

drop policy if exists "courses_public_read" on courses;
create policy "courses_public_read" on courses for select using (published = true or is_admin());
drop policy if exists "courses_admin_write" on courses;
create policy "courses_admin_write" on courses for all using (is_admin()) with check (is_admin());

drop policy if exists "consulting_public_read" on consulting_services;
create policy "consulting_public_read" on consulting_services for select using (published = true or is_admin());
drop policy if exists "consulting_admin_write" on consulting_services;
create policy "consulting_admin_write" on consulting_services for all using (is_admin()) with check (is_admin());

drop policy if exists "testimonials_public_read" on testimonials;
create policy "testimonials_public_read" on testimonials for select using (published = true or is_admin());
drop policy if exists "testimonials_admin_write" on testimonials;
create policy "testimonials_admin_write" on testimonials for all using (is_admin()) with check (is_admin());

drop policy if exists "articles_public_read" on articles;
create policy "articles_public_read" on articles for select using (published = true or is_admin());
drop policy if exists "articles_admin_write" on articles;
create policy "articles_admin_write" on articles for all using (is_admin()) with check (is_admin());

drop policy if exists "coupons_admin_only" on coupons;
create policy "coupons_admin_only" on coupons for all using (is_admin()) with check (is_admin());

-- الطلبات: العميل يشوف طلباته هو بس، الأدمن يشوف الكل. الكتابة من السيرفر فقط (service role يتجاوز RLS)
drop policy if exists "orders_select_own_or_admin" on orders;
create policy "orders_select_own_or_admin" on orders
  for select using (customer_id = auth.uid() or is_admin());

drop policy if exists "order_items_select_own_or_admin" on order_items;
create policy "order_items_select_own_or_admin" on order_items
  for select using (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
        and (orders.customer_id = auth.uid() or is_admin())
    )
  );

-- ============================================================================
-- بيانات حقيقية مبدئية (من clipmaster.se) — احذف السطر ده لو مش عايز البيانات دي
-- ============================================================================
insert into products (slug, tag, title, description, price_cents, currency, external_url, featured, sort_order)
values
  (
    'tasis-wa-edarat-salon',
    '{"ar":"كتاب","en":"Book"}',
    '{"ar":"تأسيس وإدارة صالون حلاقة ناجح في السعودية","en":"Building & Managing a Successful Barbershop in Saudi Arabia"}',
    '{"ar":"من حلاق إلى صاحب مشروع ناجح — خطط لنمو مشروعك، إدارة احترافية لصالونك، وابنِ فريقاً ناجحاً.","en":"From barber to successful business owner — plans to grow your business, professional salon management, and how to build a winning team."}',
    2450, 'usd', 'https://clipmaster.se/b/VzXgm', true, 1
  ),
  (
    'fan-edarat-salon-al-halaka',
    '{"ar":"كتاب","en":"Book"}',
    '{"ar":"فن إدارة صالون الحلاقة","en":"The Art of Barbershop Management"}',
    '{"ar":"دليلك العملي لتتحول من الحرفة إلى التجارة المربحة.","en":"Your practical guide to turn the craft into a profitable business."}',
    4900, 'usd', 'https://clipmaster.se/b/barbershopmanagement', true, 2
  )
on conflict (slug) do nothing;

insert into courses (slug, title, description, price_cents, currency, external_url, featured, sort_order)
values
  (
    'majestir-edarat-salonat',
    '{"ar":"ماجستير إدارة الصالونات","en":"Salon Management Masterclass"}',
    '{"ar":"صالونك لا يحتاج وجودك الدائم، يحتاج نظامك الصحيح. دورة شاملة تساعدك على الانتقال من حلاق يدير يومه بالجهد، إلى صاحب مشروع يدير نظاماً متكاملاً قابلاً للنمو.","en":"Your salon doesn''t need you there all the time — it needs the right system. A complete course that takes you from a barber running his day through effort, to a business owner running an integrated system built to grow."}',
    9700, 'usd', 'https://clipmaster.se/b/v01SB', true, 1
  )
on conflict (slug) do nothing;

insert into consulting_services (title, description, sort_order)
values
  ('{"ar":"تقييم أداء الصالون","en":"Salon Performance Evaluation"}', '{"ar":"مراجعة شاملة للعمليات والإيرادات وتحديد نقاط التحسين.","en":"A full review of operations and revenue to identify what to improve."}', 1),
  ('{"ar":"استراتيجية التسويق","en":"Marketing Strategy"}', '{"ar":"خطة مخصصة لجذب عملاء جدد وزيادة الحجوزات.","en":"A tailored plan to attract new clients and increase bookings."}', 2),
  ('{"ar":"استشارة تأسيس صالون جديد","en":"New Salon Launch Consulting"}', '{"ar":"مرافقة كاملة من اختيار الموقع حتى يوم الافتتاح.","en":"Full guidance from choosing a location to opening day."}', 3),
  ('{"ar":"تقييم الحضور الرقمي","en":"Digital Presence Audit"}', '{"ar":"تحليل حضورك على السوشيال ميديا وخطة لتحسينه.","en":"An analysis of your social media presence with a plan to improve it."}', 4);

insert into testimonials (quote, result, name, role, sort_order)
values
  (
    '{"ar":"القوالب والدورات غيّرت طريقة إدارتي لصالوني تمامًا. أرقامي واضحة الآن واتخذ قرارات بثقة.","en":"The templates and courses completely changed how I manage my salon. My numbers are clear now and I decide with confidence."}',
    '{"ar":"+45% حجوزات","en":"+45% bookings"}',
    'عبدالله الشهري',
    '{"ar":"مالك صالون، الرياض","en":"Salon Owner, Riyadh"}',
    1
  ),
  (
    '{"ar":"الاستشارة ساعدتني أفتتح صالوني الجديد بخطة واضحة من أول يوم بدل التجربة والخطأ.","en":"The consultation helped me open my new salon with a clear plan from day one instead of trial and error."}',
    '{"ar":"افتتاح خلال 60 يوم","en":"Opened in 60 days"}',
    'فهد العتيبي',
    '{"ar":"مستثمر صالونات، جدة","en":"Salon Investor, Jeddah"}',
    2
  );
