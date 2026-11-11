"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import type { Testimonial } from "@/lib/types";

export async function saveTestimonialAction(locale: string, testimonial: Partial<Testimonial> & { id?: string }) {
  await requireAdmin(locale);
  const supabase = createClient();
  const { error } = await supabase.from("testimonials").upsert(testimonial);
  if (error) throw new Error(error.message);
  revalidatePath(`/${locale}/admin/testimonials`);
  revalidatePath(`/${locale}`);
}

export async function deleteTestimonialAction(locale: string, id: string) {
  await requireAdmin(locale);
  const supabase = createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/${locale}/admin/testimonials`);
  revalidatePath(`/${locale}`);
}
