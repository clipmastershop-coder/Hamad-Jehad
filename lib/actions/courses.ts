"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import type { Course } from "@/lib/types";

export async function saveCourseAction(locale: string, course: Partial<Course> & { id?: string }) {
  await requireAdmin(locale);
  const supabase = createClient();
  const { error } = await supabase.from("courses").upsert(course);
  if (error) throw new Error(error.message);
  revalidatePath(`/${locale}/admin/courses`);
  revalidatePath(`/${locale}`);
}

export async function deleteCourseAction(locale: string, id: string) {
  await requireAdmin(locale);
  const supabase = createClient();
  const { error } = await supabase.from("courses").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/${locale}/admin/courses`);
  revalidatePath(`/${locale}`);
}
