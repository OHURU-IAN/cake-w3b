import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-blush bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-berry">
            {siteConfig.name}
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-cocoa">
          <Link href="/" className="hover:text-berry">
            Menu
          </Link>
          <Link href="/#order" className="hover:text-berry">
            How to order
          </Link>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="rounded-full bg-berry px-4 py-2 text-cream hover:bg-berry-dark"
          >
            Order now
          </a>
        </nav>
      </div>
    </header>
  );
}
