import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProductById } from "@/lib/products";
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

  const productId = session.metadata?.productId;
  const product = productId ? getProductById(productId) : undefined;
  if (!product) {
    return NextResponse.json({ error: "المنتج غير موجود" }, { status: 400 });
  }

  const token = createDownloadToken(product.id);

  return NextResponse.json({
    productName: product.name,
    downloadUrl: `/api/download/${token}`,
  });
}
