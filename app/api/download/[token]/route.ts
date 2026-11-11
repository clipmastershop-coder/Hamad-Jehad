import { NextRequest, NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/downloadToken";
import { createServiceClient } from "@/lib/supabase/server";

const BUCKET = "digital-products";

export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  const verified = verifyDownloadToken(params.token);
  if (!verified) {
    return NextResponse.json({ error: "رابط التحميل غير صالح أو منتهي" }, { status: 403 });
  }

  const supabase = createServiceClient();

  const { data: orderItem } = await supabase
    .from("order_items")
    .select("*, orders!inner(status)")
    .eq("id", verified.orderItemId)
    .maybeSingle();

  if (!orderItem || orderItem.orders?.status !== "paid") {
    return NextResponse.json({ error: "الطلب غير مؤكد الدفع" }, { status: 403 });
  }

  const table = orderItem.item_type === "product" ? "products" : "courses";
  const { data: record } = await supabase.from(table).select("file_path").eq("id", orderItem.item_id).maybeSingle();

  if (!record?.file_path) {
    return NextResponse.json({ error: "لا يوجد ملف قابل للتحميل لهذا العنصر" }, { status: 404 });
  }

  const { data: file, error } = await supabase.storage.from(BUCKET).download(record.file_path);
  if (error || !file) {
    return NextResponse.json({ error: "تعذر الوصول للملف" }, { status: 500 });
  }

  const fileName = record.file_path.split("/").pop() ?? "download";
  const buffer = Buffer.from(await file.arrayBuffer());

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
