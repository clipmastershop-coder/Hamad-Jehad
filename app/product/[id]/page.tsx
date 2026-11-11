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
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full rounded-lg object-cover"
      />
      <div>
        <h1 className="mb-3 text-2xl font-bold">{product.name}</h1>
        <p className="mb-5 text-gray-600">{product.description}</p>
        <p className="mb-6 text-2xl font-bold text-brand">
          {(product.priceCents / 100).toFixed(2)} {product.currency.toUpperCase()}
        </p>
        <BuyButton productId={product.id} />
      </div>
    </div>
  );
}
