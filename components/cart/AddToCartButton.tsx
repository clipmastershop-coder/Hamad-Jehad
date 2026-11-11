"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, type CartItem } from "./CartContext";

export default function AddToCartButton({
  item,
  locale,
  label,
}: {
  item: Omit<CartItem, "quantity">;
  locale: string;
  label: string;
}) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={() => {
        addItem(item);
        setAdded(true);
        setTimeout(() => router.push(`/${locale}/cart`), 400);
      }}
      className="w-full rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white transition hover:bg-navy-900"
    >
      {added ? (locale === "ar" ? "تمت الإضافة ✓" : "Added ✓") : label}
    </button>
  );
}
