import { createHmac, timingSafeEqual } from "crypto";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // صلاحية رابط التحميل: 24 ساعة

function getSecret(): string {
  const secret = process.env.DOWNLOAD_SECRET;
  if (!secret) {
    throw new Error("DOWNLOAD_SECRET غير موجود في متغيرات البيئة");
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

/** يولّد رابط تحميل موقّع لمنتج معيّن، صالح لمدة محدودة، بدون الحاجة لقاعدة بيانات */
export function createDownloadToken(productId: string): string {
  const expiresAt = Date.now() + TOKEN_TTL_MS;
  const payload = `${productId}.${expiresAt}`;
  const signature = sign(payload);
  return Buffer.from(`${payload}.${signature}`).toString("base64url");
}

export function verifyDownloadToken(token: string): { productId: string } | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [productId, expiresAtStr, signature] = decoded.split(".");
    if (!productId || !expiresAtStr || !signature) return null;

    const payload = `${productId}.${expiresAtStr}`;
    const expectedSignature = sign(payload);
    const provided = Buffer.from(signature);
    const expected = Buffer.from(expectedSignature);
    if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
      return null;
    }

    const expiresAt = Number(expiresAtStr);
    if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return null;

    return { productId };
  } catch {
    return null;
  }
}
