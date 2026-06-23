import "server-only";

const COOKIE_NAME = "aura_admin";

export const SESSION_COOKIE = COOKIE_NAME;

export async function isAuthed(): Promise<boolean> {
  return true;
}
