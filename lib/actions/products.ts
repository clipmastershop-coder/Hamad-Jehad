"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import type { Product } from "@/lib/types";

export async function saveProductAction(locale: string, product: Partial<Product> & { id?: string }) {
  await requireAdmin(locale);
  const supabase = createClient();
  const { error } = await supabase.from("products").upsert(product);
  if (error) throw new Error(error.message);
  revalidatePath(`/${locale}/admin/products`);
  revalidatePath(`/${locale}`);
}

export async function deleteProductAction(locale: string, id: string) {
  await requireAdmin(locale);
  const supabase = createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/${locale}/admin/products`);
  revalidatePath(`/${locale}`);
}
