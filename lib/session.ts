import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 يوم

function getSecret(): string {
  return process.env.SESSION_SECRET || process.env.DOWNLOAD_SECRET || "clipmaster-dev-secret-change-me";
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

function createToken(userId: string): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${userId}.${expiresAt}`;
  return Buffer.from(`${payload}.${sign(payload)}`).toString("base64url");
}

function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [userId, expiresAtStr, signature] = decoded.split(".");
    if (!userId || !expiresAtStr || !signature) return null;

    const expected = sign(`${userId}.${expiresAtStr}`);
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    if (Date.now() > Number(expiresAtStr)) return null;

    return { userId };
  } catch {
    return null;
  }
}

const COOKIE_NAME = "clipmaster_session";

/** يُستخدم داخل Server Action أو Route Handler فقط (يكتب كوكي) */
export function setSessionCookie(userId: string) {
  cookies().set(COOKIE_NAME, createToken(userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export function clearSessionCookie() {
  cookies().delete(COOKIE_NAME);
}

/** يُستخدم في أي مكان (Server Component أو Action أو Route Handler) لقراءة الجلسة */
export function getSessionUserId(): string | null {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token)?.userId ?? null;
}
