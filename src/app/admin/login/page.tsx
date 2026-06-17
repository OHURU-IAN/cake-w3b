import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Owner login",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <h1 className="text-3xl font-bold text-cocoa">Owner login</h1>
      <p className="mt-2 text-sm text-cocoa/70">
        Enter your password to manage your cakes.
      </p>
      <LoginForm />
    </div>
  );
}
