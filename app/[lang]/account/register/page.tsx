"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AccountRegisterPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.lang as string;
  const isAr = locale === "ar";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }
    setDone(true);
    setLoading(false);
  }

  if (done) {
    return (
      <main className="mx-auto max-w-sm px-5 py-24 text-center">
        <p className="text-ink/70">
          {isAr
            ? "تم إنشاء حسابك. تحقق من بريدك الإلكتروني لتأكيد الحساب ثم سجّل الدخول."
            : "Your account was created. Check your email to confirm it, then log in."}
        </p>
        <Link href={`/${locale}/account/login`} className="mt-4 inline-block font-bold text-navy hover:underline">
          {isAr ? "تسجيل الدخول" : "Log in"}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-5 py-20">
      <h1 className="font-display mb-6 text-3xl font-extrabold uppercase tracking-tight text-ink">
        {isAr ? "إنشاء حساب" : "Create Account"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          required
          placeholder={isAr ? "البريد الإلكتروني" : "Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-ink/15 px-4 py-3 text-sm outline-none focus:border-navy"
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder={isAr ? "كلمة المرور" : "Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-ink/15 px-4 py-3 text-sm outline-none focus:border-navy"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-900 disabled:opacity-60"
        >
          {loading ? "..." : isAr ? "إنشاء الحساب" : "Create Account"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-ink/60">
        {isAr ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
        <Link href={`/${locale}/account/login`} className="font-bold text-navy hover:underline">
          {isAr ? "سجّل الدخول" : "Log in"}
        </Link>
      </p>
    </main>
  );
}
