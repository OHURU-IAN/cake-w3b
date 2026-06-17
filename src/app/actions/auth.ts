"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE_NAME,
  checkPassword,
  createSessionToken,
} from "@/lib/auth";

export async function login(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");

  if (!checkPassword(password)) {
    return { error: "Incorrect password. Please try again." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
  redirect("/admin/login");
}
