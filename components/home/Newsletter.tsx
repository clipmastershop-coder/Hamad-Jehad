"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function Newsletter({ dict }: { dict: Dictionary }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-navy-900 text-white">
      <div className="mx-auto max-w-site px-5 py-16 sm:px-8">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <h2 className="font-display mb-2 text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">{dict.newsletter.title}</h2>
            <p className="text-sm text-white/60">{dict.newsletter.description}</p>
          </div>

          {submitted ? (
            <p className="font-bold text-cyan">{dict.newsletter.success}</p>
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
                className="flex-1 rounded-full border border-white/20 bg-white/5 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan"
              />
              <button
                type="submit"
                className="rounded-full bg-cyan px-7 py-3.5 text-sm font-bold text-navy-900 transition hover:bg-cyan-600"
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
