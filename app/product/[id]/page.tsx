import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, products } from "@/lib/products";
import BuyButton from "@/components/BuyButton";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) notFound();

  return (
    <div>
      <Link href="/" className="mb-6 inline-block text-sm font-semibold text-gray-500 hover:text-brand">
        ← رجوع للمنتجات
      </Link>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl object-cover shadow-sm"
        />
        <div>
          <h1 className="mb-3 text-3xl font-extrabold">{product.name}</h1>
          <p className="mb-6 leading-relaxed text-gray-600">{product.description}</p>

          <div className="mb-6 rounded-xl border bg-white p-6">
            <p className="mb-4 text-3xl font-extrabold text-brand">
              {(product.priceCents / 100).toFixed(2)} {product.currency.toUpperCase()}
            </p>
            <BuyButton productId={product.id} />
          </div>

          <ul className="space-y-2 text-sm text-gray-600">
            <li>✓ تحميل فوري بعد تأكيد الدفع</li>
            <li>✓ دفع آمن مشفّر بالكامل عبر Stripe</li>
            <li>✓ رابط التحميل صالح لمدة 24 ساعة</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
