import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getSessionUserId } from "@/lib/session";

export type SessionUser = {
  id: string;
  email: string;
  is_admin: number;
};

export function getCurrentUser(): SessionUser | null {
  const userId = getSessionUserId();
  if (!userId) return null;
  const db = getDb();
  const user = db.prepare("select id, email, is_admin from users where id = ?").get(userId) as
    | SessionUser
    | undefined;
  return user ?? null;
}

/** يستخدم في صفحات لوحة التحكم: يرجّع المستخدم لو أدمن، وإلا يحوّله لصفحة الدخول */
export function requireAdmin(locale: string): SessionUser {
  const user = getCurrentUser();
  if (!user?.is_admin) {
    redirect(`/${locale}/admin/login`);
  }
  return user;
}
