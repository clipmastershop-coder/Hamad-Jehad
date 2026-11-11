import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";

export default function ComingSoon({
  locale,
  dict,
  title,
}: {
  locale: Locale;
  dict: Dictionary;
  title: string;
}) {
  return (
    <main className="mx-auto max-w-site px-5 py-24 text-center sm:px-8">
      <h1 className="font-display mb-4 text-4xl font-extrabold uppercase tracking-tight text-ink">{title}</h1>
      <p className="mb-8 text-ink/60">{dict.comingSoon.description}</p>
      <Link
        href={`/${locale}`}
        className="inline-block rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white transition hover:bg-navy-900"
      >
        {dict.comingSoon.back}
      </Link>
    </main>
  );
}
