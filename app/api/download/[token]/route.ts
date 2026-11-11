import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { verifyDownloadToken } from "@/lib/downloadToken";
import { getProductById } from "@/lib/products";

export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  const verified = verifyDownloadToken(params.token);
  if (!verified) {
    return NextResponse.json({ error: "رابط التحميل غير صالح أو منتهي" }, { status: 403 });
  }

  const product = getProductById(verified.productId);
  if (!product) {
    return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "digital-products", product.fileName);
  const fileBuffer = await readFile(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${product.fileName}"`,
    },
  });
}
