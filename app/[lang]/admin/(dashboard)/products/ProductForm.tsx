"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveProductAction, deleteProductAction } from "@/lib/actions/products";
import { uploadDigitalFileAction } from "@/lib/actions/upload";
import type { Product } from "@/lib/types";

export default function ProductForm({ locale, product }: { locale: string; product?: Product }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(product?.file_path ?? null);

  const [form, setForm] = useState({
    slug: product?.slug ?? "",
    tag_ar: product?.tag.ar ?? "",
    tag_en: product?.tag.en ?? "",
    title_ar: product?.title.ar ?? "",
    title_en: product?.title.en ?? "",
    description_ar: product?.description.ar ?? "",
    description_en: product?.description.en ?? "",
    price: product?.price_cents != null ? (product.price_cents / 100).toString() : "",
    currency: product?.currency ?? "usd",
    external_url: product?.external_url ?? "",
    cover_image: product?.cover_image ?? "",
    featured: product?.featured ?? false,
    published: product?.published ?? true,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const data = new FormData();
      data.set("file", file);
      const savedName = await uploadDigitalFileAction(locale, data);
      setFilePath(savedName);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر رفع الملف");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await saveProductAction(locale, {
        id: product?.id,
        slug: form.slug.trim(),
        tag: { ar: form.tag_ar, en: form.tag_en },
        title: { ar: form.title_ar, en: form.title_en },
        description: { ar: form.description_ar, en: form.description_en },
        price_cents: form.price ? Math.round(parseFloat(form.price) * 100) : null,
        currency: form.currency,
        external_url: form.external_url || null,
        cover_image: form.cover_image || null,
        file_path: filePath,
        featured: form.featured,
        published: form.published,
      });
      router.push(`/${locale}/admin/products`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!product || !confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    await deleteProductAction(locale, product.id);
    router.push(`/${locale}/admin/products`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <Field label="المعرّف (slug) — إنجليزي فريد بدون مسافات">
        <input
          required
          value={form.slug}
          onChange={(e) => update("slug", e.target.value)}
          className="input"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="التصنيف (عربي)">
          <input value={form.tag_ar} onChange={(e) => update("tag_ar", e.target.value)} className="input" />
        </Field>
        <Field label="Tag (English)">
          <input value={form.tag_en} onChange={(e) => update("tag_en", e.target.value)} className="input" />
        </Field>
      </div>

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

      <div className="grid grid-cols-2 gap-4">
        <Field label="السعر (اتركه فاضي لو بيتباع خارجيًا)">
          <input type="number" step="0.01" value={form.price} onChange={(e) => update("price", e.target.value)} className="input" />
        </Field>
        <Field label="العملة">
          <input value={form.currency} onChange={(e) => update("currency", e.target.value)} className="input" />
        </Field>
      </div>

      <Field label="رابط خارجي للشراء (مثلاً صفحة Payhip) — اتركه فاضي لو التسليم من عندنا">
        <input value={form.external_url} onChange={(e) => update("external_url", e.target.value)} className="input" />
      </Field>

      <Field label="الملف الرقمي (PDF / ZIP) — يُستخدم فقط لو مفيش رابط خارجي">
        <input type="file" accept=".pdf,.zip,.rar,.epub" onChange={handleFileChange} className="input" disabled={uploading} />
        {uploading && <p className="mt-1 text-xs text-ink/50">جاري رفع الملف...</p>}
        {filePath && !uploading && <p className="mt-1 text-xs text-green-600">تم رفع الملف: {filePath}</p>}
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
          disabled={saving || uploading}
          className="rounded-full bg-navy px-7 py-3 text-sm font-bold text-white hover:bg-navy-900 disabled:opacity-60"
        >
          {saving ? "جاري الحفظ..." : "حفظ"}
        </button>
        {product && (
          <button
            type="button"
            onClick={handleDelete}
            className="text-sm font-bold text-red-600 hover:underline"
          >
            حذف المنتج
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
