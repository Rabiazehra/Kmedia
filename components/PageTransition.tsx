"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useAccessibility } from "./AccessibilityContext";
import { useSound } from "./useSound";

/**
 * PageTransition
 * --------------
 * Plays a CRT TV-channel-switch + static burst before/after every
 * client-side route change. Combines:
 *   1. Full-screen static flash (SVG turbulence)
 *   2. Horizontal "rolling bars" channel switch
 *   3. Subtle chromatic-aberration + scanline shift
 *
 * Works by intercepting clicks on internal <a> tags (next/link) and
 * calling router.push() after the exit animation completes.
 */
export default function PageTransition() {
  const { disableVisualEffects } = useAccessibility();
  const pathname = usePathname();
  const playClick = useSound("/sounds/click.mp3", { volume: 0.5 });
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
  const isNavigatingRef = useRef(false);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstMountRef = useRef(true);

  // Duration the static takes (kept short for snappy feel)
  const EXIT_MS = 450;
  const ENTER_MS = 350;

  const isModifiedClick = (e: MouseEvent) =>
    e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;

  const isInternalLink = (a: HTMLAnchorElement) => {
    if (!a.href) return false;
    if (a.target && a.target !== "" && a.target !== "_self") return false;
    if (a.hasAttribute("download")) return false;
    if (a.getAttribute("rel")?.includes("external")) return false;

    const url = new URL(a.href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    // Same page (hash / query) — let it through, no full transition
    if (url.pathname === window.location.pathname) return false;
    return true;
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isNavigatingRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (isModifiedClick(e)) return;

      // Find the closest <a>
      const path = e.composedPath();
      const anchor = path.find(
        (el): el is HTMLAnchorElement =>
          el instanceof HTMLAnchorElement,
      );
      if (!anchor || !isInternalLink(anchor)) return;

      // Intercept: prevent default and run the transition
      e.preventDefault();
      e.stopPropagation();
      isNavigatingRef.current = true;
      playClick();
      setPhase("exit");

      // After the exit animation, actually navigate
      // We use location.href instead of router.push so the page
      // re-runs the template animation on the new route.
      window.setTimeout(() => {
        // Use history.pushState + dispatch popstate-like behavior by
        // simply assigning href — next/link will not have been
        // called, so we trigger a hard navigation to ensure
        // app/template.tsx runs.
        window.location.assign(anchor.href);
      }, EXIT_MS);
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true } as unknown as EventListenerOptions);
    };
  }, []);

  // On every pathname change, play a brief "enter" settle flash.
  // (The hard-navigate in handleClick causes a remount, so this runs
  // again on the new route.)
  useEffect(() => {
    if (firstMountRef.current) {
      firstMountRef.current = false;
      return;
    }
    setPhase("enter");
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    enterTimeoutRef.current = setTimeout(() => setPhase("idle"), ENTER_MS);
    isNavigatingRef.current = false;
    return () => {
      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current);
        enterTimeoutRef.current = null;
      }
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {phase !== "idle" && (
        <motion.div
          key={`pt-${phase}-${pathname}`}
          className="fixed inset-0 z-[10000] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: phase === "exit" ? 0.18 : 0.25 }}
          aria-hidden
        >
          {/* Base black flash (always present for a quick transition) */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: phase === "exit" ? 0 : 0 }}
            animate={{ opacity: phase === "exit" ? 1 : [1, 0.4, 0.85, 0] }}
            transition={{
              duration: phase === "exit" ? 0.18 : 0.35,
              times: phase === "exit" ? undefined : [0, 0.4, 0.7, 1],
            }}
          />

          {!disableVisualEffects && (
            <>
              {/* Static noise — SVG turbulence */}
              <motion.div
                className="absolute inset-0 mix-blend-screen"
                style={{
                  opacity: 0.55,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: "300px 300px",
                }}
                initial={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  opacity: phase === "exit" ? [0, 0.9, 0.6, 0] : [0.9, 0.4, 0],
                  x: phase === "exit" ? [0, -8, 6, -2, 0] : [0, 4, -2, 0],
                  y: phase === "exit" ? [0, 4, -6, 2, 0] : [0, -3, 2, 0],
                }}
                transition={{
                  duration: phase === "exit" ? 0.42 : 0.35,
                  times: [0, 0.3, 0.6, 1],
                }}
              />

              {/* Horizontal "channel roll" bars */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 2px, transparent 2px, transparent 6px)",
                }}
                initial={{ y: phase === "exit" ? "-100%" : "100%" }}
                animate={{ y: phase === "exit" ? "0%" : "0%" }}
                exit={{ y: phase === "exit" ? "100%" : "-100%" }}
                transition={{
                  duration: phase === "exit" ? 0.32 : 0.28,
                  ease: "easeInOut",
                }}
              />

              {/* A second roll bar, slightly delayed, opposite direction */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, rgba(180,255,76,0.22) 0px, rgba(180,255,76,0.22) 3px, transparent 3px, transparent 11px)",
                  mixBlendMode: "screen",
                }}
                initial={{ y: phase === "exit" ? "100%" : "-100%" }}
                animate={{ y: "0%" }}
                exit={{ y: phase === "exit" ? "-100%" : "100%" }}
                transition={{
                  duration: phase === "exit" ? 0.38 : 0.32,
                  ease: "easeInOut",
                  delay: 0.05,
                }}
              />

              {/* Chromatic aberration edge glow */}
              <motion.div
                className="absolute inset-0"
                style={{
                  boxShadow:
                    "inset 0 0 120px rgba(255,0,80,0.35), inset 0 0 120px rgba(0,200,255,0.25)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "exit" ? [0, 1, 0] : [1, 0] }}
                transition={{ duration: phase === "exit" ? 0.42 : 0.3 }}
              />

              {/* "SIGNAL LOST" / "TUNING" text */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "exit" ? [0, 1, 1, 0] : [1, 0] }}
                transition={{ duration: phase === "exit" ? 0.42 : 0.25 }}
              >
                <span
                  className="font-mono text-white text-xs md:text-sm tracking-[0.4em] uppercase"
                  style={{
                    textShadow:
                      "2px 0 0 rgba(255,0,80,0.8), -2px 0 0 rgba(0,200,255,0.7)",
                  }}
                >
                  {phase === "exit" ? "▌ SIGNAL LOST ▐" : "▌ TUNING ▐"}
                </span>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
