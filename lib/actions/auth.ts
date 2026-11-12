"use server";

import { getDb, newId } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/passwords";
import { setSessionCookie, clearSessionCookie } from "@/lib/session";

type UserRow = { id: string; email: string; password_hash: string; is_admin: number };

export async function adminLoginAction(email: string, password: string) {
  const db = getDb();
  const user = db.prepare("select * from users where email = ? and is_admin = 1").get(email) as
    | UserRow
    | undefined;
  if (!user || !verifyPassword(password, user.password_hash)) {
    throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
  }
  setSessionCookie(user.id);
}

export async function customerRegisterAction(email: string, password: string) {
  const db = getDb();
  const existing = db.prepare("select id from users where email = ?").get(email);
  if (existing) {
    throw new Error("البريد الإلكتروني مستخدم بالفعل");
  }
  const id = newId();
  db.prepare("insert into users (id, email, password_hash, is_admin) values (?, ?, ?, 0)").run(
    id,
    email,
    hashPassword(password)
  );
  setSessionCookie(id);
}

export async function customerLoginAction(email: string, password: string) {
  const db = getDb();
  const user = db.prepare("select * from users where email = ?").get(email) as UserRow | undefined;
  if (!user || !verifyPassword(password, user.password_hash)) {
    throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
  }
  setSessionCookie(user.id);
}

export async function logoutAction() {
  clearSessionCookie();
}
