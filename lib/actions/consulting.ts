"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { upsertConsultingService, deleteConsultingService } from "@/lib/data/consulting";
import type { ConsultingService } from "@/lib/types";

export async function saveConsultingServiceAction(
  locale: string,
  service: Partial<ConsultingService> & { id?: string }
) {
  requireAdmin(locale);
  await upsertConsultingService(service);
  revalidatePath(`/${locale}/admin/consulting`);
  revalidatePath(`/${locale}`);
}

export async function deleteConsultingServiceAction(locale: string, id: string) {
  requireAdmin(locale);
  await deleteConsultingService(id);
  revalidatePath(`/${locale}/admin/consulting`);
  revalidatePath(`/${locale}`);
}
