"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveTestimonialAction, deleteTestimonialAction } from "@/lib/actions/testimonials";
import type { Testimonial } from "@/lib/types";

type Row = {
  id?: string;
  name: string;
  role_ar: string;
  role_en: string;
  quote_ar: string;
  quote_en: string;
  result_ar: string;
  result_en: string;
  published: boolean;
};

function toRow(t: Testimonial): Row {
  return {
    id: t.id,
    name: t.name,
    role_ar: t.role.ar,
    role_en: t.role.en,
    quote_ar: t.quote.ar,
    quote_en: t.quote.en,
    result_ar: t.result.ar,
    result_en: t.result.en,
    published: t.published,
  };
}

const emptyRow: Row = {
  name: "",
  role_ar: "",
  role_en: "",
  quote_ar: "",
  quote_en: "",
  result_ar: "",
  result_en: "",
  published: true,
};

export default function TestimonialEditor({ locale, testimonials }: { locale: string; testimonials: Testimonial[] }) {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>(testimonials.map(toRow));
  const [newRow, setNewRow] = useState<Row>(emptyRow);
  const [savingIndex, setSavingIndex] = useState<number | null>(null);

  async function saveRow(row: Row, index: number | "new") {
    setSavingIndex(index === "new" ? -1 : index);
    await saveTestimonialAction(locale, {
      id: row.id,
      name: row.name,
      role: { ar: row.role_ar, en: row.role_en },
      quote: { ar: row.quote_ar, en: row.quote_en },
      result: { ar: row.result_ar, en: row.result_en },
      published: row.published,
    });
    router.refresh();
    if (index === "new") setNewRow(emptyRow);
    setSavingIndex(null);
  }

  async function deleteRow(id: string) {
    if (!confirm("حذف هذا التقييم؟")) return;
    await deleteTestimonialAction(locale, id);
    router.refresh();
  }

  function updateRow(index: number, patch: Partial<Row>) {
    setRows((r) => r.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  }

  return (
    <div className="space-y-6">
      {rows.map((row, i) => (
        <div key={row.id} className="border border-ink/10 p-5">
          <div className="grid grid-cols-2 gap-4">
            <input className="input" placeholder="اسم العميل" value={row.name} onChange={(e) => updateRow(i, { name: e.target.value })} />
            <input className="input" placeholder="النتيجة (مثال: +45% حجوزات)" value={row.result_ar} onChange={(e) => updateRow(i, { result_ar: e.target.value })} />
            <input className="input" placeholder="الصفة (عربي)" value={row.role_ar} onChange={(e) => updateRow(i, { role_ar: e.target.value })} />
            <input className="input" placeholder="Role (English)" value={row.role_en} onChange={(e) => updateRow(i, { role_en: e.target.value })} />
            <input className="input" placeholder="Result (English)" value={row.result_en} onChange={(e) => updateRow(i, { result_en: e.target.value })} />
            <span />
            <textarea className="input" placeholder="الرأي (عربي)" value={row.quote_ar} onChange={(e) => updateRow(i, { quote_ar: e.target.value })} />
            <textarea className="input" placeholder="Quote (English)" value={row.quote_en} onChange={(e) => updateRow(i, { quote_en: e.target.value })} />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-semibold text-ink/70">
              <input type="checkbox" checked={row.published} onChange={(e) => updateRow(i, { published: e.target.checked })} />
              منشور
            </label>
            <div className="flex gap-3">
              <button onClick={() => saveRow(row, i)} disabled={savingIndex === i} className="rounded-full bg-navy px-5 py-2 text-sm font-bold text-white disabled:opacity-60">
                {savingIndex === i ? "جاري الحفظ..." : "حفظ"}
              </button>
              <button onClick={() => row.id && deleteRow(row.id)} className="text-sm font-bold text-red-600 hover:underline">
                حذف
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="border border-dashed border-ink/20 p-5">
        <p className="mb-3 text-sm font-bold text-ink">رأي جديد</p>
        <div className="grid grid-cols-2 gap-4">
          <input className="input" placeholder="اسم العميل" value={newRow.name} onChange={(e) => setNewRow((r) => ({ ...r, name: e.target.value }))} />
          <input className="input" placeholder="النتيجة" value={newRow.result_ar} onChange={(e) => setNewRow((r) => ({ ...r, result_ar: e.target.value }))} />
          <input className="input" placeholder="الصفة (عربي)" value={newRow.role_ar} onChange={(e) => setNewRow((r) => ({ ...r, role_ar: e.target.value }))} />
          <input className="input" placeholder="Role (English)" value={newRow.role_en} onChange={(e) => setNewRow((r) => ({ ...r, role_en: e.target.value }))} />
          <textarea className="input" placeholder="الرأي (عربي)" value={newRow.quote_ar} onChange={(e) => setNewRow((r) => ({ ...r, quote_ar: e.target.value }))} />
          <textarea className="input" placeholder="Quote (English)" value={newRow.quote_en} onChange={(e) => setNewRow((r) => ({ ...r, quote_en: e.target.value }))} />
        </div>
        <button
          onClick={() => saveRow(newRow, "new")}
          disabled={savingIndex === -1 || !newRow.name}
          className="mt-3 rounded-full bg-navy px-5 py-2 text-sm font-bold text-white disabled:opacity-60"
        >
          {savingIndex === -1 ? "جاري الإضافة..." : "+ إضافة"}
        </button>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid rgba(23, 27, 45, 0.15);
          padding: 0.6rem 0.9rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          border-color: #17296c;
        }
      `}</style>
    </div>
  );
}
