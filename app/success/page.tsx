"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type VerifyResult = { productName: string; downloadUrl: string };

export default function SuccessPage() {
  return (
    <Suspense fallback={<p>جاري تأكيد عملية الدفع...</p>}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("لا يوجد session_id في الرابط");
      return;
    }
    fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "تعذر تأكيد الدفع");
        setResult(data);
      })
      .catch((err) => setError(err.message));
  }, [sessionId]);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!result) {
    return <p>جاري تأكيد عملية الدفع...</p>;
  }

  return (
    <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
      <h1 className="mb-3 text-2xl font-bold text-green-600">تم الدفع بنجاح 🎉</h1>
      <p className="mb-6 text-gray-600">يمكنك الآن تحميل: {result.productName}</p>
      <a
        href={result.downloadUrl}
        className="inline-block rounded-md bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark"
      >
        تحميل المنتج
      </a>
      <p className="mt-4 text-xs text-gray-400">رابط التحميل صالح لمدة 24 ساعة فقط</p>
    </div>
  );
}
