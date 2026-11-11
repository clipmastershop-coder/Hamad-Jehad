"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";

export default function CartPage() {
  const params = useParams();
  const locale = params.lang as string;
  const isAr = locale === "ar";
  const { items, removeItem, updateQuantity, totalCents } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          locale,
          items: items.map((i) => ({ itemType: i.itemType, itemId: i.itemId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? (isAr ? "حدث خطأ غير متوقع" : "Unexpected error"));
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : (isAr ? "حدث خطأ غير متوقع" : "Unexpected error"));
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-site px-5 py-24 text-center sm:px-8">
        <h1 className="font-display mb-4 text-3xl font-extrabold uppercase tracking-tight text-ink">
          {isAr ? "سلتك فارغة" : "Your cart is empty"}
        </h1>
        <Link href={`/${locale}/products`} className="inline-block rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white hover:bg-navy-900">
          {isAr ? "تصفح المنتجات" : "Browse products"}
        </Link>
      </main>
    );
  }

  const currency = items[0]?.currency.toUpperCase() ?? "";

  return (
    <main className="mx-auto max-w-site px-5 py-16 sm:px-8">
      <h1 className="font-display mb-10 text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
        {isAr ? "سلة الشراء" : "Your Cart"}
      </h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {items.map((item) => (
            <div key={item.itemId} className="flex items-center justify-between gap-4 py-5">
              <div>
                <p className="font-bold text-ink">{item.title}</p>
                <p className="text-sm text-ink/50">
                  {(item.priceCents / 100).toFixed(2)} {item.currency.toUpperCase()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.itemId, parseInt(e.target.value, 10) || 1)}
                  className="w-16 border border-ink/15 px-2 py-1 text-center text-sm"
                />
                <button onClick={() => removeItem(item.itemId)} className="text-sm font-bold text-red-600 hover:underline">
                  {isAr ? "حذف" : "Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit border border-ink/10 p-6">
          <div className="mb-5 flex items-center justify-between text-lg font-extrabold text-navy">
            <span>{isAr ? "الإجمالي" : "Total"}</span>
            <span>
              {(totalCents / 100).toFixed(2)} {currency}
            </span>
          </div>

          <label className="mb-4 block">
            <span className="mb-1 block text-sm font-semibold text-ink/70">
              {isAr ? "بريدك الإلكتروني" : "Your email"}
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-ink/15 px-4 py-3 text-sm outline-none focus:border-navy"
            />
          </label>

          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

          <button
            onClick={handleCheckout}
            disabled={loading || !email}
            className="w-full rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white transition hover:bg-navy-900 disabled:opacity-60"
          >
            {loading ? (isAr ? "جاري التحويل..." : "Redirecting...") : isAr ? "إتمام الشراء" : "Checkout"}
          </button>
        </div>
      </div>
    </main>
  );
}
