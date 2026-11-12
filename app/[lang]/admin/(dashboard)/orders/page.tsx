import { getDb } from "@/lib/db";

type OrderRow = {
  id: string;
  email: string;
  status: string;
  total_cents: number;
  currency: string;
  created_at: string;
};

type OrderItemRow = {
  id: string;
  order_id: string;
  title_snapshot: string;
  quantity: number;
};

export default function AdminOrdersPage() {
  const db = getDb();
  const orders = db
    .prepare("select id, email, status, total_cents, currency, created_at from orders order by created_at desc limit 100")
    .all() as OrderRow[];

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
    <div>
      <h1 className="font-display mb-8 text-3xl font-extrabold uppercase tracking-tight text-ink">
        الطلبات
      </h1>

      <div className="divide-y divide-ink/10 border-t border-ink/10">
        {orders.map((order) => (
          <div key={order.id} className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-ink">{order.email}</p>
                <p className="text-sm text-ink/50">
                  {new Date(order.created_at).toLocaleString("ar")} ·{" "}
                  <span
                    className={
                      order.status === "paid"
                        ? "font-bold text-green-600"
                        : order.status === "failed"
                          ? "font-bold text-red-600"
                          : "font-bold text-amber-600"
                    }
                  >
                    {order.status}
                  </span>
                </p>
              </div>
              <p className="font-display text-lg font-extrabold text-navy">
                {(order.total_cents / 100).toFixed(2)} {order.currency.toUpperCase()}
              </p>
            </div>
            <ul className="mt-2 text-sm text-ink/60">
              {(itemsByOrder.get(order.id) ?? []).map((item) => {
                const title = JSON.parse(item.title_snapshot) as { ar: string };
                return (
                  <li key={item.id}>
                    {title.ar} × {item.quantity}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {orders.length === 0 && <p className="py-8 text-sm text-ink/50">لا توجد طلبات بعد.</p>}
      </div>
    </div>
  );
}
