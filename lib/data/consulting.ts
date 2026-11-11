import { createClient } from "@/lib/supabase/server";
import type { ConsultingService } from "@/lib/types";

export async function getPublishedConsultingServices(): Promise<ConsultingService[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("consulting_services")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getAllConsultingServicesForAdmin(): Promise<ConsultingService[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("consulting_services")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function upsertConsultingService(service: Partial<ConsultingService> & { id?: string }) {
  const supabase = createClient();
  const { error } = await supabase.from("consulting_services").upsert(service);
  if (error) throw error;
}

export async function deleteConsultingService(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("consulting_services").delete().eq("id", id);
  if (error) throw error;
}
