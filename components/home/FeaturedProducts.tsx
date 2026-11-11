import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";

export default function FeaturedProducts({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="products" className="border-b border-ink/10 bg-surface">
      <div className="mx-auto max-w-site px-5 py-20 sm:px-8">
        <div className="mb-12 max-w-xl">
          <h2 className="mb-3 text-4xl font-extrabold leading-[1.1] text-ink sm:text-5xl">
            {dict.sectionTitles.products}
          </h2>
          <p className="text-ink/60">{dict.sectionTitles.productsSub}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.products.map((product) => (
            <article key={product.title} className="flex flex-col border border-ink/10 bg-white p-6">
              <span className="mb-4 inline-block w-fit rounded-full bg-navy-50 px-3 py-1 text-xs font-bold text-navy">
                {product.tag}
              </span>
              <h3 className="mb-2 text-lg font-bold text-ink">{product.title}</h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-ink/60">{product.description}</p>
              <div className="flex items-center justify-between border-t border-ink/10 pt-4">
                <span className="text-lg font-extrabold text-navy">
                  {product.price} {product.currency}
                </span>
                <Link
                  href={`/${locale}/products`}
                  className="text-sm font-bold text-cyan-600 transition hover:text-navy"
                >
                  {locale === "ar" ? "عرض التفاصيل ←" : "View details →"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
