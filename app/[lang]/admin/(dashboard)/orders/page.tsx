import { createClient } from "@/lib/supabase/server";

export default async function AdminOrdersPage() {
  const supabase = createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-extrabold uppercase tracking-tight text-ink">
        الطلبات
      </h1>

      <div className="divide-y divide-ink/10 border-t border-ink/10">
        {(orders ?? []).map((order) => (
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
              {(order.order_items ?? []).map((item: { id: string; title_snapshot: { ar: string }; quantity: number }) => (
                <li key={item.id}>
                  {item.title_snapshot.ar} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {(orders ?? []).length === 0 && <p className="py-8 text-sm text-ink/50">لا توجد طلبات بعد.</p>}
      </div>
    </div>
  );
}
