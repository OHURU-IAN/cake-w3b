"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Cake } from "@prisma/client";
import { CakeImage } from "./CakeImage";

const RESET = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";

export function CakeCard({ cake }: { cake: Cake }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [transform, setTransform] = useState(RESET);
  const [glare, setGlare] = useState({ opacity: 0, x: 50, y: 50 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rotY = (px - 0.5) * 14;
    const rotX = (0.5 - py) * 14;
    setTransform(
      `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`,
    );
    setGlare({ opacity: 0.4, x: px * 100, y: py * 100 });
  }

  function handleLeave() {
    setTransform(RESET);
    setGlare((g) => ({ ...g, opacity: 0 }));
  }

  return (
    <Link
      ref={ref}
      href={`/cakes/${cake.id}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-[0_10px_40px_-15px_rgba(140,55,74,0.45)] backdrop-blur-sm transition-transform duration-200 ease-out will-change-transform"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <CakeImage
          src={cake.imageUrl}
          alt={cake.name}
          className="h-full w-full transition duration-500 group-hover:scale-110"
        />
        {cake.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-berry/90 px-3 py-1 text-xs font-semibold text-cream shadow-lg">
            ⭐ Favourite
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-rose">
          {cake.category}
        </span>
        <h3 className="mt-1 text-xl font-semibold text-cocoa">{cake.name}</h3>
        {cake.description && (
          <p className="mt-1 line-clamp-2 text-sm text-cocoa/70">
            {cake.description}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between">
          {cake.price ? (
            <p className="text-lg font-bold text-berry">{cake.price}</p>
          ) : (
            <span />
          )}
          <span className="text-sm font-medium text-berry opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
            View →
          </span>
        </div>
      </div>

      {/* moving glare */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-200"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.7), transparent 55%)`,
        }}
      />
    </Link>
  );
}
