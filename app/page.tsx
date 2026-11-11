import Link from "next/link";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">المنتجات الرقمية</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="block rounded-lg border bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="mb-4 h-40 w-full rounded-md object-cover"
            />
            <h2 className="mb-1 text-lg font-semibold">{product.name}</h2>
            <p className="mb-3 text-sm text-gray-600">{product.description}</p>
            <span className="font-bold text-brand">
              {(product.priceCents / 100).toFixed(2)} {product.currency.toUpperCase()}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
