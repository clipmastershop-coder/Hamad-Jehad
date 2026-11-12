import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { verifyDownloadToken } from "@/lib/downloadToken";
import { getDb } from "@/lib/db";

const STORAGE_DIR = path.join(process.cwd(), "private", "digital-products");

type OrderItemRow = { item_type: "product" | "course"; item_id: string };

export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  const verified = verifyDownloadToken(params.token);
  if (!verified) {
    return NextResponse.json({ error: "رابط التحميل غير صالح أو منتهي" }, { status: 403 });
  }

  const db = getDb();

  const orderItem = db
    .prepare(
      `select oi.item_type, oi.item_id, o.status
       from order_items oi join orders o on o.id = oi.order_id
       where oi.id = ?`
    )
    .get(verified.orderItemId) as (OrderItemRow & { status: string }) | undefined;

  if (!orderItem || orderItem.status !== "paid") {
    return NextResponse.json({ error: "الطلب غير مؤكد الدفع" }, { status: 403 });
  }

  const table = orderItem.item_type === "product" ? "products" : "courses";
  const record = db.prepare(`select file_path from ${table} where id = ?`).get(orderItem.item_id) as
    | { file_path: string | null }
    | undefined;

  if (!record?.file_path) {
    return NextResponse.json({ error: "لا يوجد ملف قابل للتحميل لهذا العنصر" }, { status: 404 });
  }

  // منع الخروج من مجلد التخزين عبر مسارات زي ../../
  const safePath = path.normalize(record.file_path).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(STORAGE_DIR, safePath);
  if (!filePath.startsWith(STORAGE_DIR)) {
    return NextResponse.json({ error: "مسار ملف غير صالح" }, { status: 400 });
  }

  let fileBuffer: Buffer;
  try {
    fileBuffer = await readFile(filePath);
  } catch {
    return NextResponse.json({ error: "تعذر الوصول للملف" }, { status: 500 });
  }

  const fileName = safePath.split("/").pop() ?? "download";

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
