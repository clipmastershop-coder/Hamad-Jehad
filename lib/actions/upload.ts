"use server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { requireAdmin } from "@/lib/auth";

const STORAGE_DIR = path.join(process.cwd(), "private", "digital-products");
const MAX_SIZE_BYTES = 100 * 1024 * 1024; // 100MB

/** يرفع الملف الرقمي الحقيقي ويرجّع اسم الملف المخزّن (ليُحفظ في عمود file_path) */
export async function uploadDigitalFileAction(locale: string, formData: FormData): Promise<string> {
  requireAdmin(locale);

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) {
    throw new Error("لم يتم اختيار ملف");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("حجم الملف كبير جدًا (الحد الأقصى 100 ميجا)");
  }

  await mkdir(STORAGE_DIR, { recursive: true });

  const ext = path.extname(file.name).slice(0, 10);
  const safeName = `${crypto.randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(STORAGE_DIR, safeName), buffer);

  return safeName;
}
