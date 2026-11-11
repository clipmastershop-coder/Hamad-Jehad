"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveConsultingServiceAction, deleteConsultingServiceAction } from "@/lib/actions/consulting";
import type { ConsultingService } from "@/lib/types";

type Row = {
  id?: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  sort_order: number;
  published: boolean;
};

function toRow(service: ConsultingService): Row {
  return {
    id: service.id,
    title_ar: service.title.ar,
    title_en: service.title.en,
    description_ar: service.description.ar,
    description_en: service.description.en,
    sort_order: service.sort_order,
    published: service.published,
  };
}

const emptyRow: Row = {
  title_ar: "",
  title_en: "",
  description_ar: "",
  description_en: "",
  sort_order: 0,
  published: true,
};

export default function ConsultingEditor({ locale, services }: { locale: string; services: ConsultingService[] }) {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>(services.map(toRow));
  const [newRow, setNewRow] = useState<Row>(emptyRow);
  const [savingIndex, setSavingIndex] = useState<number | null>(null);

  async function saveRow(row: Row, index: number | "new") {
    setSavingIndex(index === "new" ? -1 : index);
    await saveConsultingServiceAction(locale, {
      id: row.id,
      title: { ar: row.title_ar, en: row.title_en },
      description: { ar: row.description_ar, en: row.description_en },
      sort_order: row.sort_order,
      published: row.published,
    });
    router.refresh();
    if (index === "new") setNewRow(emptyRow);
    setSavingIndex(null);
  }

  async function deleteRow(id: string) {
    if (!confirm("حذف هذه الخدمة؟")) return;
    await deleteConsultingServiceAction(locale, id);
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
            <input className="input" placeholder="العنوان (عربي)" value={row.title_ar} onChange={(e) => updateRow(i, { title_ar: e.target.value })} />
            <input className="input" placeholder="Title (English)" value={row.title_en} onChange={(e) => updateRow(i, { title_en: e.target.value })} />
            <textarea className="input" placeholder="الوصف (عربي)" value={row.description_ar} onChange={(e) => updateRow(i, { description_ar: e.target.value })} />
            <textarea className="input" placeholder="Description (English)" value={row.description_en} onChange={(e) => updateRow(i, { description_en: e.target.value })} />
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
        <p className="mb-3 text-sm font-bold text-ink">خدمة جديدة</p>
        <div className="grid grid-cols-2 gap-4">
          <input className="input" placeholder="العنوان (عربي)" value={newRow.title_ar} onChange={(e) => setNewRow((r) => ({ ...r, title_ar: e.target.value }))} />
          <input className="input" placeholder="Title (English)" value={newRow.title_en} onChange={(e) => setNewRow((r) => ({ ...r, title_en: e.target.value }))} />
          <textarea className="input" placeholder="الوصف (عربي)" value={newRow.description_ar} onChange={(e) => setNewRow((r) => ({ ...r, description_ar: e.target.value }))} />
          <textarea className="input" placeholder="Description (English)" value={newRow.description_en} onChange={(e) => setNewRow((r) => ({ ...r, description_en: e.target.value }))} />
        </div>
        <button
          onClick={() => saveRow(newRow, "new")}
          disabled={savingIndex === -1 || !newRow.title_ar}
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
