import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import AccountLogoutButton from "./AccountLogoutButton";

export default async function AccountPage({ params }: { params: { lang: string } }) {
  const locale = params.lang;
  const isAr = locale === "ar";
  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/account/login`);

  const supabase = createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("customer_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-site px-5 py-16 sm:px-8">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
          {isAr ? "طلباتي" : "My Orders"}
        </h1>
        <AccountLogoutButton locale={locale} />
      </div>

      <div className="divide-y divide-ink/10 border-y border-ink/10">
        {(orders ?? []).map((order) => (
          <div key={order.id} className="py-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm text-ink/50">{new Date(order.created_at).toLocaleDateString(isAr ? "ar" : "en")}</p>
              <p className="font-display text-lg font-extrabold text-navy">
                {(order.total_cents / 100).toFixed(2)} {order.currency.toUpperCase()}
              </p>
            </div>
            <ul className="space-y-1 text-sm text-ink/70">
              {(order.order_items ?? []).map((item: { id: string; title_snapshot: { ar: string; en: string }; quantity: number }) => (
                <li key={item.id}>
                  {item.title_snapshot[locale as "ar" | "en"]} × {item.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-1 text-xs font-bold uppercase text-ink/40">{order.status}</p>
          </div>
        ))}
        {(orders ?? []).length === 0 && (
          <p className="py-8 text-sm text-ink/50">{isAr ? "لا توجد طلبات بعد." : "No orders yet."}</p>
        )}
      </div>
    </main>
  );
}
