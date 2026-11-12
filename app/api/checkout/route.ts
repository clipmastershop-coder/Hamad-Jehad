import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getDb, newId } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

type CartLine = { itemType: "product" | "course"; itemId: string; quantity: number };
type CatalogRow = {
  title: string;
  price_cents: number | null;
  currency: string;
  published: number;
};

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email: string | undefined = body?.email;
  const locale: "ar" | "en" = body?.locale === "en" ? "en" : "ar";
  const lines: CartLine[] = Array.isArray(body?.items) ? body.items : [];

  if (!email || lines.length === 0) {
    return NextResponse.json({ error: "بيانات الطلب غير مكتملة" }, { status: 400 });
  }

  const db = getDb();
  const user = getCurrentUser();

  // نجيب السعر الحقيقي من قاعدة البيانات دايمًا، لا نثق بأي سعر جاي من المتصفح
  const resolvedItems: {
    itemType: "product" | "course";
    itemId: string;
    quantity: number;
    title: { ar: string; en: string };
    unitPriceCents: number;
    currency: string;
  }[] = [];

  for (const line of lines) {
    const table = line.itemType === "product" ? "products" : "courses";
    const record = db.prepare(`select title, price_cents, currency, published from ${table} where id = ?`).get(
      line.itemId
    ) as CatalogRow | undefined;

    if (!record || !record.published || record.price_cents == null) {
      return NextResponse.json({ error: "أحد العناصر في السلة غير متاح للبيع" }, { status: 400 });
    }
    resolvedItems.push({
      itemType: line.itemType,
      itemId: line.itemId,
      quantity: Math.max(1, Math.min(line.quantity, 10)),
      title: JSON.parse(record.title),
      unitPriceCents: record.price_cents,
      currency: record.currency,
    });
  }

  const currencies = new Set(resolvedItems.map((i) => i.currency));
  if (currencies.size > 1) {
    return NextResponse.json({ error: "لا يمكن الدفع بأكثر من عملة في نفس الطلب" }, { status: 400 });
  }
  const currency = resolvedItems[0].currency;
  const subtotalCents = resolvedItems.reduce((sum, i) => sum + i.unitPriceCents * i.quantity, 0);

  const orderId = newId();
  db.prepare(
    `insert into orders (id, customer_id, email, status, subtotal_cents, discount_cents, total_cents, currency)
     values (?, ?, ?, 'pending', ?, 0, ?, ?)`
  ).run(orderId, user?.id ?? null, email, subtotalCents, subtotalCents, currency);

  const insertItem = db.prepare(
    `insert into order_items (id, order_id, item_type, item_id, title_snapshot, unit_price_cents, quantity)
     values (?, ?, ?, ?, ?, ?, ?)`
  );
  for (const item of resolvedItems) {
    insertItem.run(newId(), orderId, item.itemType, item.itemId, JSON.stringify(item.title), item.unitPriceCents, item.quantity);
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: resolvedItems.map((i) => ({
        price_data: {
          currency: i.currency,
          unit_amount: i.unitPriceCents,
          product_data: { name: i.title[locale] },
        },
        quantity: i.quantity,
      })),
      metadata: { order_id: orderId },
      success_url: `${appUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/${locale}/cart`,
    });

    db.prepare("update orders set stripe_session_id = ? where id = ?").run(session.id, orderId);

    return NextResponse.json({ url: session.url });
  } catch {
    db.prepare("update orders set status = 'failed' where id = ?").run(orderId);
    return NextResponse.json({ error: "الدفع غير مفعّل على الموقع بعد" }, { status: 503 });
  }
}
