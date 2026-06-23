import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "aura_admin";
const SESSION_PAYLOAD = "studio-aura-admin-v1";
const FALLBACK_ADMIN_PASSWORD = "StudioAura2026";

function secret() {
  return process.env.ADMIN_SESSION_SECRET ?? "dev-insecure-secret-change-me";
}

/** Signed token stored in the session cookie. */
export function makeSessionToken(): string {
  return createHmac("sha256", secret()).update(SESSION_PAYLOAD).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function hasAdminPasswordConfig(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD ?? FALLBACK_ADMIN_PASSWORD);
}

/** Check a submitted password against ADMIN_PASSWORD (constant-time). */
export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? FALLBACK_ADMIN_PASSWORD;
  return expected.length > 0 && safeEqual(password, expected);
}

export const SESSION_COOKIE = COOKIE_NAME;

/** True if the current request has a valid admin session cookie. */
export async function isAuthed(): Promise<boolean> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;
  return safeEqual(token, makeSessionToken());
}
