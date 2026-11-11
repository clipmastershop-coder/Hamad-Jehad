"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function Newsletter({ dict }: { dict: Dictionary }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-site px-5 py-20 sm:px-8">
        <div className="flex flex-col items-start gap-8 border border-ink/10 bg-white p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-md">
            <h2 className="mb-2 text-2xl font-extrabold text-navy">{dict.newsletter.title}</h2>
            <p className="text-sm text-ink/60">{dict.newsletter.description}</p>
          </div>

          {submitted ? (
            <p className="font-bold text-cyan-600">{dict.newsletter.success}</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder={dict.newsletter.placeholder}
                className="flex-1 border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-navy"
              />
              <button
                type="submit"
                className="rounded bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-900"
              >
                {dict.newsletter.button}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
