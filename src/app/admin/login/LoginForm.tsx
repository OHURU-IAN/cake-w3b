"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, {});

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-cocoa"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1 w-full rounded-lg border border-rose/40 bg-white px-3 py-2 text-cocoa outline-none focus:border-berry focus:ring-2 focus:ring-berry/30"
        />
      </div>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-berry px-6 py-3 font-semibold text-cream hover:bg-berry-dark disabled:opacity-60"
      >
        {pending ? "Checking…" : "Log in"}
      </button>
    </form>
  );
}
