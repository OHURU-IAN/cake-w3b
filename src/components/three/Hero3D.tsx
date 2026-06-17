"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// WebGL only runs in the browser, so load the scene client-side only.
const CakeScene = dynamic(() => import("./CakeScene"), { ssr: false });

export function Hero3D() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <div className="relative h-[340px] w-full sm:h-[440px] lg:h-[520px]">
      {/* soft glow behind the cake */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-rose/40 blur-3xl sm:h-80 sm:w-80" />
      </div>

      {ready ? (
        <CakeScene />
      ) : (
        <div className="flex h-full items-center justify-center text-6xl">🎂</div>
      )}

      <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-medium text-cocoa/50">
        ✦ drag to spin the cake
      </p>
    </div>
  );
}
