import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "aura_admin";
const SESSION_PAYLOAD = "studio-aura-admin-v1";

function safeEqual(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  return aBuffer.length === bBuffer.length && timingSafeEqual(aBuffer, bBuffer);
}

export function isAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  return expected.length > 0 && safeEqual(password, expected);
}

export function makeSessionToken(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is required for admin authentication.");
  return createHmac("sha256", secret).update(SESSION_PAYLOAD).digest("hex");
}

export const SESSION_COOKIE = COOKIE_NAME;

export async function isAuthed(): Promise<boolean> {
  if (!isAuthConfigured()) return false;
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  return Boolean(token && safeEqual(token, makeSessionToken()));
}
