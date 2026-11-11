import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n/dictionaries";
import { getAllPublishedProducts } from "@/lib/data/products";

export const dynamic = "force-dynamic";

export default async function ProductsPage({ params }: { params: { lang: string } }) {
  const locale = params.lang as Locale;
  const dict = getDictionary(locale);
  const products = await getAllPublishedProducts();

  return (
    <main className="mx-auto max-w-site px-5 py-16 sm:px-8">
      <h1 className="font-display mb-3 text-4xl font-extrabold uppercase leading-[1.1] tracking-tight text-ink sm:text-5xl">
        {dict.sectionTitles.products}
      </h1>
      <p className="mb-12 text-ink/60">{dict.sectionTitles.productsSub}</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/${locale}/products/${product.slug}`}
            className="flex flex-col border border-ink/10 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="mb-4 inline-block w-fit rounded-full bg-navy-50 px-3 py-1 text-xs font-bold text-navy">
              {product.tag[locale]}
            </span>
            <h3 className="mb-2 text-lg font-bold text-ink">{product.title[locale]}</h3>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-ink/60">{product.description[locale]}</p>
            {product.price_cents != null && (
              <span className="text-lg font-extrabold text-navy">
                {(product.price_cents / 100).toFixed(2)} {product.currency.toUpperCase()}
              </span>
            )}
          </Link>
        ))}
        {products.length === 0 && <p className="text-sm text-ink/50">لا توجد منتجات منشورة حاليًا.</p>}
      </div>
    </main>
  );
}
