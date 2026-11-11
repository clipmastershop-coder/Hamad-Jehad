"use client";

import { useState } from "react";
import Link from "next/link";

type NavItem = { href: string; label: string };

export default function MobileNav({
  navItems,
  bookLabel,
  bookHref,
}: {
  navItems: NavItem[];
  bookLabel: string;
  bookHref: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded border border-ink/15"
      >
        <span className="h-px w-5 bg-ink" />
        <span className="h-px w-5 bg-ink" />
        <span className="h-px w-5 bg-ink" />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-ink/10 bg-white px-5 py-4 shadow-sm">
          <nav className="flex flex-col gap-4 text-sm font-semibold text-ink/80">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link
              href={bookHref}
              onClick={() => setOpen(false)}
              className="mt-2 rounded bg-navy px-4 py-2 text-center text-white"
            >
              {bookLabel}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
