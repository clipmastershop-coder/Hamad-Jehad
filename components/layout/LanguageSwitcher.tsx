"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/dictionaries";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const rest = pathname.replace(/^\/(ar|en)/, "") || "/";
  const target: Locale = locale === "ar" ? "en" : "ar";
  const href = `/${target}${rest === "/" ? "" : rest}`;

  return (
    <a
      href={href}
      className="rounded-full border border-ink/15 px-3.5 py-1.5 text-sm font-semibold text-ink/70 transition hover:border-navy hover:text-navy"
    >
      {target === "ar" ? "العربية" : "English"}
    </a>
  );
}
