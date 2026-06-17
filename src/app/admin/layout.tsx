import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { siteConfig } from "@/lib/site-config";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full">
      <div className="border-b border-blush bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/admin" className="font-bold text-berry">
            {siteConfig.name} · Admin
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/"
              target="_blank"
              className="text-cocoa hover:text-berry"
            >
              View site ↗
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full border border-rose/40 px-4 py-1.5 font-medium text-cocoa hover:bg-blush"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
    </div>
  );
}
