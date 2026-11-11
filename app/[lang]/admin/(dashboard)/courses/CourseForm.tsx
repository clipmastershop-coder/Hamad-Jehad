"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveCourseAction, deleteCourseAction } from "@/lib/actions/courses";
import type { Course } from "@/lib/types";

export default function CourseForm({ locale, course }: { locale: string; course?: Course }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    slug: course?.slug ?? "",
    title_ar: course?.title.ar ?? "",
    title_en: course?.title.en ?? "",
    description_ar: course?.description.ar ?? "",
    description_en: course?.description.en ?? "",
    lessons_count: course?.lessons_count?.toString() ?? "",
    duration_ar: course?.duration.ar ?? "",
    duration_en: course?.duration.en ?? "",
    price: course?.price_cents != null ? (course.price_cents / 100).toString() : "",
    currency: course?.currency ?? "usd",
    external_url: course?.external_url ?? "",
    cover_image: course?.cover_image ?? "",
    featured: course?.featured ?? false,
    published: course?.published ?? true,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await saveCourseAction(locale, {
        id: course?.id,
        slug: form.slug.trim(),
        title: { ar: form.title_ar, en: form.title_en },
        description: { ar: form.description_ar, en: form.description_en },
        lessons_count: form.lessons_count ? parseInt(form.lessons_count, 10) : null,
        duration: { ar: form.duration_ar, en: form.duration_en },
        price_cents: form.price ? Math.round(parseFloat(form.price) * 100) : null,
        currency: form.currency,
        external_url: form.external_url || null,
        cover_image: form.cover_image || null,
        featured: form.featured,
        published: form.published,
      });
      router.push(`/${locale}/admin/courses`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!course || !confirm("هل أنت متأكد من حذف هذه الدورة؟")) return;
    await deleteCourseAction(locale, course.id);
    router.push(`/${locale}/admin/courses`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <Field label="المعرّف (slug)">
        <input required value={form.slug} onChange={(e) => update("slug", e.target.value)} className="input" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="العنوان (عربي)">
          <input required value={form.title_ar} onChange={(e) => update("title_ar", e.target.value)} className="input" />
        </Field>
        <Field label="Title (English)">
          <input required value={form.title_en} onChange={(e) => update("title_en", e.target.value)} className="input" />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="الوصف (عربي)">
          <textarea value={form.description_ar} onChange={(e) => update("description_ar", e.target.value)} className="input" rows={3} />
        </Field>
        <Field label="Description (English)">
          <textarea value={form.description_en} onChange={(e) => update("description_en", e.target.value)} className="input" rows={3} />
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field label="عدد الدروس">
          <input type="number" value={form.lessons_count} onChange={(e) => update("lessons_count", e.target.value)} className="input" />
        </Field>
        <Field label="المدة (عربي)">
          <input value={form.duration_ar} onChange={(e) => update("duration_ar", e.target.value)} className="input" />
        </Field>
        <Field label="Duration (English)">
          <input value={form.duration_en} onChange={(e) => update("duration_en", e.target.value)} className="input" />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="السعر">
          <input type="number" step="0.01" value={form.price} onChange={(e) => update("price", e.target.value)} className="input" />
        </Field>
        <Field label="العملة">
          <input value={form.currency} onChange={(e) => update("currency", e.target.value)} className="input" />
        </Field>
      </div>

      <Field label="رابط خارجي للشراء (اتركه فاضي لو عايز يتباع من عندنا)">
        <input value={form.external_url} onChange={(e) => update("external_url", e.target.value)} className="input" />
      </Field>

      <Field label="رابط صورة الغلاف">
        <input value={form.cover_image} onChange={(e) => update("cover_image", e.target.value)} className="input" />
      </Field>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm font-semibold text-ink/70">
          <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} />
          مميز في الصفحة الرئيسية
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-ink/70">
          <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} />
          منشور
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-navy px-7 py-3 text-sm font-bold text-white hover:bg-navy-900 disabled:opacity-60"
        >
          {saving ? "جاري الحفظ..." : "حفظ"}
        </button>
        {course && (
          <button type="button" onClick={handleDelete} className="text-sm font-bold text-red-600 hover:underline">
            حذف الدورة
          </button>
        )}
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid rgba(23, 27, 45, 0.15);
          padding: 0.65rem 1rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          border-color: #17296c;
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-ink/70">{label}</span>
      {children}
    </label>
  );
}
