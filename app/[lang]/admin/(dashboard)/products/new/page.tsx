import ProductForm from "../ProductForm";

export default function NewProductPage({ params }: { params: { lang: string } }) {
  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-extrabold uppercase tracking-tight text-ink">
        منتج جديد
      </h1>
      <ProductForm locale={params.lang} />
    </div>
  );
}
