"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { upsertTestimonial, deleteTestimonial } from "@/lib/data/testimonials";
import type { Testimonial } from "@/lib/types";

export async function saveTestimonialAction(locale: string, testimonial: Partial<Testimonial> & { id?: string }) {
  requireAdmin(locale);
  await upsertTestimonial(testimonial);
  revalidatePath(`/${locale}/admin/testimonials`);
  revalidatePath(`/${locale}`);
}

export async function deleteTestimonialAction(locale: string, id: string) {
  requireAdmin(locale);
  await deleteTestimonial(id);
  revalidatePath(`/${locale}/admin/testimonials`);
  revalidatePath(`/${locale}`);
}
