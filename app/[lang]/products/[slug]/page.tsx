import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug } from "@/lib/data/products";
import type { Locale } from "@/lib/i18n/dictionaries";
import AddToCartButton from "@/components/cart/AddToCartButton";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: { lang: string; slug: string } }) {
  const locale = params.lang as Locale;
  const product = await getProductBySlug(params.slug);
  if (!product || !product.published) notFound();

  const backLabel = locale === "ar" ? "← رجوع للمنتجات" : "← Back to products";
  const buyExternalLabel = locale === "ar" ? "اشترِ الآن" : "Buy Now";
  const addToCartLabel = locale === "ar" ? "أضف للسلة" : "Add to Cart";

  return (
    <main className="mx-auto max-w-site px-5 py-16 sm:px-8">
      <Link href={`/${locale}/products`} className="mb-6 inline-block text-sm font-semibold text-ink/50 hover:text-navy">
        {backLabel}
      </Link>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div>
          <span className="mb-4 inline-block w-fit rounded-full bg-navy-50 px-3 py-1 text-xs font-bold text-navy">
            {product.tag[locale]}
          </span>
          <h1 className="font-display mb-4 text-3xl font-extrabold uppercase leading-[1.1] tracking-tight text-ink sm:text-4xl">
            {product.title[locale]}
          </h1>
          <p className="leading-relaxed text-ink/70">{product.description[locale]}</p>
        </div>

        <div className="border border-ink/10 p-6">
          {product.price_cents != null && (
            <p className="font-display mb-5 text-3xl font-extrabold text-navy">
              {(product.price_cents / 100).toFixed(2)} {product.currency.toUpperCase()}
            </p>
          )}

          {product.external_url ? (
            <a
              href={product.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-navy px-7 py-3.5 text-center text-sm font-bold text-white transition hover:bg-navy-900"
            >
              {buyExternalLabel}
            </a>
          ) : (
            <AddToCartButton
              locale={locale}
              label={addToCartLabel}
              item={{
                itemType: "product",
                itemId: product.id,
                slug: product.slug,
                title: product.title[locale],
                priceCents: product.price_cents ?? 0,
                currency: product.currency,
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
