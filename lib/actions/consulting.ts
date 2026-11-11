"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import type { ConsultingService } from "@/lib/types";

export async function saveConsultingServiceAction(
  locale: string,
  service: Partial<ConsultingService> & { id?: string }
) {
  await requireAdmin(locale);
  const supabase = createClient();
  const { error } = await supabase.from("consulting_services").upsert(service);
  if (error) throw new Error(error.message);
  revalidatePath(`/${locale}/admin/consulting`);
  revalidatePath(`/${locale}`);
}

export async function deleteConsultingServiceAction(locale: string, id: string) {
  await requireAdmin(locale);
  const supabase = createClient();
  const { error } = await supabase.from("consulting_services").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/${locale}/admin/consulting`);
  revalidatePath(`/${locale}`);
}
