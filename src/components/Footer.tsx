import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-blush bg-blush/40">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-berry">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-cocoa/70">{siteConfig.tagline}</p>
          <p className="mt-1 text-sm text-cocoa/70">{siteConfig.location}</p>
        </div>
        <div className="text-sm text-cocoa/80">
          <p className="font-semibold text-cocoa">Get in touch</p>
          <p className="mt-1">
            <a className="hover:text-berry" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
              {siteConfig.phone}
            </a>
          </p>
          <p>
            <a className="hover:text-berry" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </p>
          {siteConfig.instagram && (
            <p>
              <a
                className="hover:text-berry"
                href={`https://instagram.com/${siteConfig.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{siteConfig.instagram}
              </a>
            </p>
          )}
        </div>
        <div className="text-sm text-cocoa/60 sm:text-right">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p className="mt-1">
            <Link href="/admin" className="hover:text-berry">
              Owner login
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
