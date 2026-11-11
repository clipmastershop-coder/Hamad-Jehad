export type LocalizedText = { ar: string; en: string };

export type Product = {
  id: string;
  slug: string;
  tag: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  price_cents: number | null;
  currency: string;
  cover_image: string | null;
  file_path: string | null;
  external_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
};

export type Course = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  lessons_count: number | null;
  duration: LocalizedText;
  price_cents: number | null;
  currency: string;
  cover_image: string | null;
  external_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
};

export type ConsultingService = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  published: boolean;
  sort_order: number;
};

export type Testimonial = {
  id: string;
  quote: LocalizedText;
  result: LocalizedText;
  name: string;
  role: LocalizedText;
  published: boolean;
  sort_order: number;
};

export type Article = {
  id: string;
  slug: string;
  category: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: LocalizedText;
  read_time: LocalizedText;
  published: boolean;
  published_at: string;
};

export type OrderItemType = "product" | "course";

export type Order = {
  id: string;
  customer_id: string | null;
  email: string;
  stripe_session_id: string | null;
  status: "pending" | "paid" | "failed" | "refunded";
  subtotal_cents: number;
  discount_cents: number;
  total_cents: number;
  currency: string;
  coupon_code: string | null;
  created_at: string;
  paid_at: string | null;
};

export type OrderItem = {
  id: string;
  order_id: string;
  item_type: OrderItemType;
  item_id: string;
  title_snapshot: LocalizedText;
  unit_price_cents: number;
  quantity: number;
};
