import crypto from "node:crypto";

export const SESSION_COOKIE_NAME = "cake_admin_session";
// The signed value we store; if the secret changes, old sessions are invalidated.
const SESSION_PAYLOAD = "admin";

function getSecret(): string {
  return process.env.SESSION_SECRET || "insecure-default-secret-change-me";
}

/** Create the signed token stored in the session cookie. */
export function createSessionToken(): string {
  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(SESSION_PAYLOAD)
    .digest("hex");
  return `${SESSION_PAYLOAD}.${sig}`;
}

/** Verify a token using a constant-time comparison. */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const expected = createSessionToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** Compare a submitted password against the configured admin password. */
export function checkPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  const a = Buffer.from(submitted);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
