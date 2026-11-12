import { getDb } from "@/lib/db";

export default function AdminOverviewPage() {
  const db = getDb();

  const { count: productsCount } = db.prepare("select count(*) as count from products").get() as { count: number };
  const { count: coursesCount } = db.prepare("select count(*) as count from courses").get() as { count: number };
  const { count: ordersCount } = db.prepare("select count(*) as count from orders").get() as { count: number };
  const paidOrders = db
    .prepare("select total_cents, currency from orders where status = 'paid'")
    .all() as { total_cents: number; currency: string }[];

  const revenueByCurrency = new Map<string, number>();
  for (const order of paidOrders) {
    revenueByCurrency.set(order.currency, (revenueByCurrency.get(order.currency) ?? 0) + order.total_cents);
  }

  const stats = [
    { label: "إجمالي الطلبات", value: ordersCount ?? 0 },
    { label: "المنتجات", value: productsCount ?? 0 },
    { label: "الدورات", value: coursesCount ?? 0 },
  ];

  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-extrabold uppercase tracking-tight text-ink">
        نظرة عامة
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-ink/10 p-6">
            <p className="font-display text-3xl font-extrabold text-navy">{stat.value}</p>
            <p className="mt-1 text-sm text-ink/60">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-ink/10 p-6">
        <p className="mb-3 text-sm font-bold text-ink">الإيرادات (طلبات مدفوعة)</p>
        {revenueByCurrency.size === 0 ? (
          <p className="text-sm text-ink/50">لا توجد طلبات مدفوعة بعد.</p>
        ) : (
          <ul className="space-y-1 text-sm text-ink/70">
            {Array.from(revenueByCurrency.entries()).map(([currency, cents]) => (
              <li key={currency}>
                {(cents / 100).toFixed(2)} {currency.toUpperCase()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
