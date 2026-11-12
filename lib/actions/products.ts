"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { upsertProduct, deleteProduct } from "@/lib/data/products";
import type { Product } from "@/lib/types";

export async function saveProductAction(locale: string, product: Partial<Product> & { id?: string }) {
  requireAdmin(locale);
  await upsertProduct(product);
  revalidatePath(`/${locale}/admin/products`);
  revalidatePath(`/${locale}`);
}

export async function deleteProductAction(locale: string, id: string) {
  requireAdmin(locale);
  await deleteProduct(id);
  revalidatePath(`/${locale}/admin/products`);
  revalidatePath(`/${locale}`);
}
