import Link from "next/link";
import { getAllProductsForAdmin } from "@/lib/data/products";

export default async function AdminProductsPage({ params }: { params: { lang: string } }) {
  const products = await getAllProductsForAdmin();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink">
          المنتجات
        </h1>
        <Link
          href={`/${params.lang}/admin/products/new`}
          className="rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white hover:bg-navy-900"
        >
          + منتج جديد
        </Link>
      </div>

      <div className="divide-y divide-ink/10 border-t border-ink/10">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between py-4">
            <div>
              <p className="font-bold text-ink">{product.title.ar}</p>
              <p className="text-sm text-ink/50">
                {product.published ? "منشور" : "مخفي"} · {product.featured ? "مميز" : "عادي"}
                {product.price_cents ? ` · ${(product.price_cents / 100).toFixed(2)} ${product.currency.toUpperCase()}` : ""}
              </p>
            </div>
            <Link
              href={`/${params.lang}/admin/products/${product.id}`}
              className="text-sm font-bold text-cyan-600 hover:text-navy"
            >
              تعديل ←
            </Link>
          </div>
        ))}
        {products.length === 0 && <p className="py-8 text-sm text-ink/50">لا توجد منتجات بعد.</p>}
      </div>
    </div>
  );
}
