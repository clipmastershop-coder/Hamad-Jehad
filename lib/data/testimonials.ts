import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/types";

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getAllTestimonialsForAdmin(): Promise<Testimonial[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function upsertTestimonial(testimonial: Partial<Testimonial> & { id?: string }) {
  const supabase = createClient();
  const { error } = await supabase.from("testimonials").upsert(testimonial);
  if (error) throw error;
}

export async function deleteTestimonial(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw error;
}
