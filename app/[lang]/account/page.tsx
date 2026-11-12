import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import AccountLogoutButton from "./AccountLogoutButton";

type OrderRow = {
  id: string;
  created_at: string;
  total_cents: number;
  currency: string;
  status: string;
};

type OrderItemRow = {
  id: string;
  order_id: string;
  title_snapshot: string;
  quantity: number;
};

export default function AccountPage({ params }: { params: { lang: string } }) {
  const locale = params.lang;
  const isAr = locale === "ar";
  const user = getCurrentUser();
  if (!user) redirect(`/${locale}/account/login`);

  const db = getDb();
  const orders = db
    .prepare("select id, created_at, total_cents, currency, status from orders where customer_id = ? order by created_at desc")
    .all(user.id) as OrderRow[];

  const itemsByOrder = new Map<string, OrderItemRow[]>();
  if (orders.length > 0) {
    const placeholders = orders.map(() => "?").join(",");
    const items = db
      .prepare(`select id, order_id, title_snapshot, quantity from order_items where order_id in (${placeholders})`)
      .all(...orders.map((o) => o.id)) as OrderItemRow[];
    for (const item of items) {
      const list = itemsByOrder.get(item.order_id) ?? [];
      list.push(item);
      itemsByOrder.set(item.order_id, list);
    }
  }

  return (
    <main className="mx-auto max-w-site px-5 py-16 sm:px-8">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
          {isAr ? "طلباتي" : "My Orders"}
        </h1>
        <AccountLogoutButton locale={locale} />
      </div>

      <div className="divide-y divide-ink/10 border-y border-ink/10">
        {orders.map((order) => (
          <div key={order.id} className="py-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm text-ink/50">{new Date(order.created_at).toLocaleDateString(isAr ? "ar" : "en")}</p>
              <p className="font-display text-lg font-extrabold text-navy">
                {(order.total_cents / 100).toFixed(2)} {order.currency.toUpperCase()}
              </p>
            </div>
            <ul className="space-y-1 text-sm text-ink/70">
              {(itemsByOrder.get(order.id) ?? []).map((item) => {
                const title = JSON.parse(item.title_snapshot) as { ar: string; en: string };
                return (
                  <li key={item.id}>
                    {title[locale as "ar" | "en"]} × {item.quantity}
                  </li>
                );
              })}
            </ul>
            <p className="mt-1 text-xs font-bold uppercase text-ink/40">{order.status}</p>
          </div>
        ))}
        {orders.length === 0 && <p className="py-8 text-sm text-ink/50">{isAr ? "لا توجد طلبات بعد." : "No orders yet."}</p>}
      </div>
    </main>
  );
}
