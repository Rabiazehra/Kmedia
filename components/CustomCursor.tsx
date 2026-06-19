"use client";

import dynamic from "next/dynamic";

/**
 * Dynamically import GloveCursor with SSR disabled to prevent
 * hydration mismatches. GloveCursor relies on browser-only APIs
 * (matchMedia, requestAnimationFrame) and returns null on the server,
 * which would cause React to discard the entire server-rendered tree.
 */
const GloveCursor = dynamic(() => import("./GloveCursor"), { ssr: false });

/**
 * CustomCursor
 * ------------
 * Mounts the pointing-glove cursor with glow trail.
 * GloveCursor internally detects (pointer: fine) and falls back to the
 * system cursor on touch devices, so this wrapper is intentionally minimal.
 */
export default function CustomCursor() {
  return <GloveCursor />;
}
