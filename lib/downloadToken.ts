import { createHmac, timingSafeEqual } from "crypto";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // صلاحية رابط التحميل: 24 ساعة

function getSecret(): string {
  return process.env.DOWNLOAD_SECRET || process.env.SESSION_SECRET || "clipmaster-dev-secret-change-me";
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

/** يولّد رابط تحميل موقّع لعنصر طلب (order_item) معيّن، صالح لمدة محدودة */
export function createDownloadToken(orderItemId: string): string {
  const expiresAt = Date.now() + TOKEN_TTL_MS;
  const payload = `${orderItemId}.${expiresAt}`;
  const signature = sign(payload);
  return Buffer.from(`${payload}.${signature}`).toString("base64url");
}

export function verifyDownloadToken(token: string): { orderItemId: string } | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [orderItemId, expiresAtStr, signature] = decoded.split(".");
    if (!orderItemId || !expiresAtStr || !signature) return null;

    const payload = `${orderItemId}.${expiresAtStr}`;
    const expectedSignature = sign(payload);
    const provided = Buffer.from(signature);
    const expected = Buffer.from(expectedSignature);
    if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
      return null;
    }

    const expiresAt = Number(expiresAtStr);
    if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return null;

    return { orderItemId };
  } catch {
    return null;
  }
}
