import Link from "next/link";
import type { Cake } from "@prisma/client";

export function CakeImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-blush to-rose/40 text-4xl ${className}`}
        aria-hidden
      >
        🎂
      </div>
    );
  }
  // Plain <img> is used (rather than next/image) because photos are
  // uploaded by the owner and have unknown dimensions.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={`object-cover ${className}`} />;
}

export function CakeCard({ cake }: { cake: Cake }) {
  return (
    <Link
      href={`/cakes/${cake.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-blush bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <CakeImage
          src={cake.imageUrl}
          alt={cake.name}
          className="h-full w-full transition group-hover:scale-105"
        />
        {cake.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-berry px-3 py-1 text-xs font-semibold text-cream">
            ⭐ Favourite
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-rose">
          {cake.category}
        </span>
        <h3 className="mt-1 text-lg font-semibold text-cocoa">{cake.name}</h3>
        {cake.description && (
          <p className="mt-1 line-clamp-2 text-sm text-cocoa/70">
            {cake.description}
          </p>
        )}
        {cake.price && (
          <p className="mt-3 text-base font-bold text-berry">{cake.price}</p>
        )}
      </div>
    </Link>
  );
}
