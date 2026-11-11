"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";

type Item = { title: { ar: string; en: string }; downloadUrl: string | null; externalUrl: string | null };

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<p className="px-5 py-24 text-center">...</p>}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = (params.lang as string) === "en" ? "en" : "ar";
  const isAr = locale === "ar";
  const sessionId = searchParams.get("session_id");
  const { clear } = useCart();

  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError(isAr ? "لا يوجد session_id في الرابط" : "Missing session_id");
      return;
    }
    fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? (isAr ? "تعذر تأكيد الدفع" : "Could not confirm payment"));
        setItems(data.items);
        clear();
      })
      .catch((err) => setError(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (error) {
    return <main className="mx-auto max-w-site px-5 py-24 text-center text-red-600 sm:px-8">{error}</main>;
  }

  if (!items) {
    return <main className="mx-auto max-w-site px-5 py-24 text-center sm:px-8">{isAr ? "جاري تأكيد عملية الدفع..." : "Confirming your payment..."}</main>;
  }

  return (
    <main className="mx-auto max-w-site px-5 py-24 text-center sm:px-8">
      <h1 className="font-display mb-4 text-3xl font-extrabold uppercase tracking-tight text-navy sm:text-4xl">
        {isAr ? "تم الدفع بنجاح 🎉" : "Payment Successful 🎉"}
      </h1>
      <p className="mb-10 text-ink/60">
        {isAr ? "يمكنك الآن تحميل منتجاتك:" : "You can now download your items:"}
      </p>

      <div className="mx-auto max-w-md space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between border border-ink/10 p-4">
            <span className="font-semibold text-ink">{item.title[locale]}</span>
            {item.downloadUrl ? (
              <a href={item.downloadUrl} className="rounded-full bg-navy px-5 py-2 text-sm font-bold text-white hover:bg-navy-900">
                {isAr ? "تحميل" : "Download"}
              </a>
            ) : item.externalUrl ? (
              <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-navy px-5 py-2 text-sm font-bold text-white hover:bg-navy-900">
                {isAr ? "فتح" : "Open"}
              </a>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-ink/40">
        {isAr ? "روابط التحميل صالحة لمدة 24 ساعة فقط" : "Download links are valid for 24 hours"}
      </p>
    </main>
  );
}
