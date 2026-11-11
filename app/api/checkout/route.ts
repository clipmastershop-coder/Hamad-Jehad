import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProductById } from "@/lib/products";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const productId = body?.productId;

  const product = productId ? getProductById(productId) : undefined;
  if (!product) {
    return NextResponse.json({ error: "المنتج غير موجود" }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: product.currency,
          unit_amount: product.priceCents,
          product_data: {
            name: product.name,
            description: product.description,
          },
        },
        quantity: 1,
      },
    ],
    metadata: { productId: product.id },
    success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/product/${product.id}`,
  });

  return NextResponse.json({ url: session.url });
}
