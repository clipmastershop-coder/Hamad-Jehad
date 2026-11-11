import { notFound } from "next/navigation";
import { getProductById } from "@/lib/data/products";
import ProductForm from "../ProductForm";

export default async function EditProductPage({ params }: { params: { lang: string; id: string } }) {
  const product = await getProductById(params.id);
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-extrabold uppercase tracking-tight text-ink">
        تعديل المنتج
      </h1>
      <ProductForm locale={params.lang} product={product} />
    </div>
  );
}
