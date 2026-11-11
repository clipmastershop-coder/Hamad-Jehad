"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartLink({ locale }: { locale: string }) {
  const { count } = useCart();

  return (
    <Link href={`/${locale}/cart`} className="relative flex h-10 w-10 items-center justify-center" aria-label="cart">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan text-[10px] font-bold text-navy-900">
          {count}
        </span>
      )}
    </Link>
  );
}
