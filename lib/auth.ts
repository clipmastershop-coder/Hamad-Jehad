import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentProfile() {
  const supabase = createClient();
  const user = await getCurrentUser();
  if (!user) return null;
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  return data;
}

/** يستخدم في صفحات لوحة التحكم: يرجّع المستخدم لو أدمن، وإلا يحوّله لصفحة الدخول */
export async function requireAdmin(locale: string) {
  const profile = await getCurrentProfile();
  if (!profile?.is_admin) {
    redirect(`/${locale}/admin/login`);
  }
  return profile;
}
