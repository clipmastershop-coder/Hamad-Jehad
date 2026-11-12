"use client";

import { useRouter } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth";

export default function LogoutButton({ locale }: { locale: string }) {
  const router = useRouter();

  async function handleLogout() {
    await logoutAction();
    router.push(`/${locale}/admin/login`);
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink/70 transition hover:border-navy hover:text-navy"
    >
      تسجيل الخروج
    </button>
  );
}
