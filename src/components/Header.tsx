import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/40 glass">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-2xl transition group-hover:rotate-12">🍰</span>
          <span className="bg-gradient-to-r from-berry to-rose bg-clip-text text-2xl font-bold text-transparent">
            {siteConfig.name}
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-cocoa">
          <Link href="/#menu" className="hidden hover:text-berry sm:inline">
            Menu
          </Link>
          <Link href="/#order" className="hidden hover:text-berry sm:inline">
            How to order
          </Link>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="shine rounded-full bg-gradient-to-r from-berry to-berry-dark px-5 py-2 text-cream shadow-lg shadow-berry/30 transition hover:shadow-berry/50"
          >
            Order now
          </a>
        </nav>
      </div>
    </header>
  );
}
