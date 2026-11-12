import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getDb } from "@/lib/db";
import { createDownloadToken } from "@/lib/downloadToken";

type OrderItemRow = {
  id: string;
  item_type: "product" | "course";
  item_id: string;
  title_snapshot: string;
};

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "session_id مطلوب" }, { status: 400 });
  }

  const session = await getStripe().checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "عملية الدفع لم تكتمل" }, { status: 402 });
  }

  const orderId = session.metadata?.order_id;
  if (!orderId) {
    return NextResponse.json({ error: "الطلب غير موجود" }, { status: 400 });
  }

  const db = getDb();

  // مصدر الحقيقة في تأكيد الدفع هو الـ webhook، لكن لو وصل العميل هنا الأول نأكد الحالة بنفسنا كاحتياط
  db.prepare(
    "update orders set status = 'paid', paid_at = datetime('now') where id = ? and stripe_session_id = ? and status = 'pending'"
  ).run(orderId, sessionId);

  const orderItems = db
    .prepare("select id, item_type, item_id, title_snapshot from order_items where order_id = ?")
    .all(orderId) as OrderItemRow[];

  const items = orderItems.map((item) => {
    const table = item.item_type === "product" ? "products" : "courses";
    const record = db.prepare(`select file_path, external_url from ${table} where id = ?`).get(item.item_id) as
      | { file_path: string | null; external_url: string | null }
      | undefined;

    return {
      title: JSON.parse(item.title_snapshot),
      downloadUrl: record?.file_path ? `/api/download/${createDownloadToken(item.id)}` : null,
      externalUrl: record?.external_url ?? null,
    };
  });

  return NextResponse.json({ items });
}
