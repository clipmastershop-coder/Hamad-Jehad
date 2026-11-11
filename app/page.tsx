import Link from "next/link";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <div>
      <section className="mb-14 overflow-hidden rounded-2xl bg-gradient-to-l from-brand to-brand-dark px-8 py-14 text-white sm:px-14">
        <h1 className="mb-4 max-w-xl text-3xl font-extrabold leading-tight sm:text-4xl">
          منتجات رقمية جاهزة تتسلّمها فورًا بعد الدفع
        </h1>
        <p className="mb-8 max-w-lg text-white/90">
          قوالب، كتب، وملفات رقمية أصلية — بدون شحن، بدون انتظار. ادفع، وحمّل منتجك على طول.
        </p>
        <a
          href="#products"
          className="inline-block rounded-md bg-white px-6 py-3 font-bold text-brand transition hover:bg-gray-100"
        >
          تصفح المنتجات
        </a>
      </section>

      <section id="products">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-2xl font-extrabold">المنتجات المتاحة</h2>
          <span className="text-sm text-gray-500">{products.length} منتج</span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group block overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="mb-1 font-bold">{product.name}</h3>
                <p className="mb-4 line-clamp-2 text-sm text-gray-600">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-extrabold text-brand">
                    {(product.priceCents / 100).toFixed(2)} {product.currency.toUpperCase()}
                  </span>
                  <span className="text-sm font-semibold text-gray-500 transition group-hover:text-brand">
                    عرض التفاصيل ←
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { title: "تحميل فوري", desc: "تستلم منتجك مباشرة بعد تأكيد الدفع." },
          { title: "دفع آمن 100%", desc: "عبر Stripe، بياناتك المالية مشفّرة بالكامل." },
          { title: "دعم سريع", desc: "تواصل معنا في أي وقت لو واجهت أي مشكلة." },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border bg-white p-6">
            <h3 className="mb-2 font-bold text-brand">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
