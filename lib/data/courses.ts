import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/lib/types";

export async function getFeaturedCourses(limit = 3): Promise<Course[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function getAllPublishedCourses(): Promise<Course[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from("courses").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getCourseById(id: string): Promise<Course | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from("courses").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getAllCoursesForAdmin(): Promise<Course[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function upsertCourse(course: Partial<Course> & { id?: string }) {
  const supabase = createClient();
  const { error } = await supabase.from("courses").upsert(course);
  if (error) throw error;
}

export async function deleteCourse(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("courses").delete().eq("id", id);
  if (error) throw error;
}
