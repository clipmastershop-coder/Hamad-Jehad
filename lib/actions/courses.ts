"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { upsertCourse, deleteCourse } from "@/lib/data/courses";
import type { Course } from "@/lib/types";

export async function saveCourseAction(locale: string, course: Partial<Course> & { id?: string }) {
  requireAdmin(locale);
  await upsertCourse(course);
  revalidatePath(`/${locale}/admin/courses`);
  revalidatePath(`/${locale}`);
}

export async function deleteCourseAction(locale: string, id: string) {
  requireAdmin(locale);
  await deleteCourse(id);
  revalidatePath(`/${locale}/admin/courses`);
  revalidatePath(`/${locale}`);
}
