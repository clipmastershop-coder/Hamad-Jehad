import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import { createDownloadToken } from "@/lib/downloadToken";

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

  const supabase = createServiceClient();

  // مصدر الحقيقة في تأكيد الدفع هو الـ webhook، لكن لو وصل العميل هنا الأول نأكد الحالة بنفسنا كاحتياط
  await supabase
    .from("orders")
    .update({ status: "paid", paid_at: new Date().toISOString() })
    .eq("id", orderId)
    .eq("stripe_session_id", sessionId)
    .eq("status", "pending");

  const { data: orderItems } = await supabase
    .from("order_items")
    .select("id, item_type, item_id, title_snapshot, quantity")
    .eq("order_id", orderId);

  const items = await Promise.all(
    (orderItems ?? []).map(async (item) => {
      const table = item.item_type === "product" ? "products" : "courses";
      const { data: record } = await supabase
        .from(table)
        .select("file_path, external_url")
        .eq("id", item.item_id)
        .maybeSingle();

      return {
        title: item.title_snapshot,
        downloadUrl: record?.file_path ? `/api/download/${createDownloadToken(item.id)}` : null,
        externalUrl: record?.external_url ?? null,
      };
    })
  );

  return NextResponse.json({ items });
}
