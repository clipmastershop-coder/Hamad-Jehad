import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "webhook غير مُعدّ" }, { status: 400 });
  }

  const rawBody = await req.text();
  let event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "توقيع غير صالح" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { id: string; metadata?: { order_id?: string } };
    const orderId = session.metadata?.order_id;
    if (orderId) {
      const db = getDb();
      db.prepare("update orders set status = 'paid', paid_at = datetime('now') where id = ? and stripe_session_id = ?").run(
        orderId,
        session.id
      );
    }
  }

  return NextResponse.json({ received: true });
}
