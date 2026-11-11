import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createServiceClient, createClient } from "@/lib/supabase/server";
import type { Product, Course } from "@/lib/types";

type CartLine = { itemType: "product" | "course"; itemId: string; quantity: number };

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email: string | undefined = body?.email;
  const locale: string = body?.locale === "en" ? "en" : "ar";
  const lines: CartLine[] = Array.isArray(body?.items) ? body.items : [];

  if (!email || lines.length === 0) {
    return NextResponse.json({ error: "بيانات الطلب غير مكتملة" }, { status: 400 });
  }

  const supabase = createServiceClient();

  // لو المستخدم مسجّل دخوله، نربط الطلب بحسابه عشان يظهر في سجل طلباته
  const sessionClient = createClient();
  const {
    data: { user },
  } = await sessionClient.auth.getUser();

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
    const { data } = await supabase.from(table).select("*").eq("id", line.itemId).maybeSingle();
    const record = data as Product | Course | null;
    if (!record || !record.published || record.price_cents == null) {
      return NextResponse.json({ error: "أحد العناصر في السلة غير متاح للبيع" }, { status: 400 });
    }
    resolvedItems.push({
      itemType: line.itemType,
      itemId: line.itemId,
      quantity: Math.max(1, Math.min(line.quantity, 10)),
      title: record.title,
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

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      email,
      customer_id: user?.id ?? null,
      status: "pending",
      subtotal_cents: subtotalCents,
      discount_cents: 0,
      total_cents: subtotalCents,
      currency,
    })
    .select()
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: "تعذر إنشاء الطلب" }, { status: 500 });
  }

  const orderItemsPayload = resolvedItems.map((i) => ({
    order_id: order.id,
    item_type: i.itemType,
    item_id: i.itemId,
    title_snapshot: i.title,
    unit_price_cents: i.unitPriceCents,
    quantity: i.quantity,
  }));
  await supabase.from("order_items").insert(orderItemsPayload);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: resolvedItems.map((i) => ({
      price_data: {
        currency: i.currency,
        unit_amount: i.unitPriceCents,
        product_data: { name: i.title[locale as "ar" | "en"] },
      },
      quantity: i.quantity,
    })),
    metadata: { order_id: order.id },
    success_url: `${appUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/${locale}/cart`,
  });

  await supabase.from("orders").update({ stripe_session_id: session.id }).eq("id", order.id);

  return NextResponse.json({ url: session.url });
}
