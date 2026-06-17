import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySessionToken } from "./auth";

/** Read the session cookie and report whether the visitor is logged in. */
export async function isLoggedIn(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE_NAME)?.value);
}
