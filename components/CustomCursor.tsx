"use client";

import GloveCursor from "./GloveCursor";

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
