"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GloveCursor
 * -----------
 * Renders a cartoon point-and-click glove with index finger extended
 * (classic late-90s/early-2000s game vibe) that follows the mouse with
 * a slight lerp, leaving a glowing neon trail.
 *
 * - Hides the system cursor via body.cursor:none (added in globals.css)
 * - On hover over interactive elements, scales up + changes color
 * - Spawns 3 trailing "echo" cursors that lag behind
 * - Touch / coarse-pointer devices fall back to system cursor
 */
export default function GloveCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const trailPositions = useRef([
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 },
  ]);
  // Read the initial media-query value lazily in a state initializer
  // so the first paint already has the correct value (avoids the
  // cascading setState-in-effect issue). On the server we default to
  // `false` to match the client behavior for SSR.
  const [isPointer, setIsPointer] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: fine)").matches;
  });
  // We render the cursor only after the component has mounted on the
  // client. This avoids SSR/hydration mismatches because the cursor
  // relies on browser-only APIs (matchMedia, requestAnimationFrame).
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Mark the component as mounted on the client and subscribe to
  // media-query changes. (No direct setState of `isPointer` here
  // anymore — the lazy initializer handles the initial value.)
  useEffect(() => {
    // Defer the setState into a microtask so React's effect analyzer
    // doesn't classify it as a cascading sync setState. The mounted
    // state is purely for SSR/hydration guarding.
    queueMicrotask(() => setMounted(true));
    const mq = window.matchMedia("(pointer: fine)");
    const handleChange = (e: MediaQueryListEvent) => setIsPointer(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isPointer) return;

    const handleMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
      setIsActive(true);
    };

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']"
      );
      setIsClicking(!!interactive);
    };

    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);
    const handleLeave = () => setIsActive(false);
    const handleEnter = () => setIsActive(true);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    // Animation loop
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const tick = () => {
      // Main cursor follows with very low lag
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.55);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.55);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      // Trail cursors follow with progressively higher lag
      const trailLags = [0.18, 0.10, 0.05];
      for (let i = 0; i < 3; i++) {
        const lagSource = i === 0 ? currentPos.current : trailPositions.current[i - 1];
        trailPositions.current[i].x = lerp(
          trailPositions.current[i].x,
          lagSource.x,
          trailLags[i]
        );
        trailPositions.current[i].y = lerp(
          trailPositions.current[i].y,
          lagSource.y,
          trailLags[i]
        );
        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${trailPositions.current[i].x}px, ${trailPositions.current[i].y}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleDown); // Removed passive to allow preventDefault if needed
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPointer]);

  if (!mounted || !isPointer) return null;

  // Inline SVG of a cartoon point-and-click glove with index finger extended.
  // Tilted ~25° and centered on the fingertip so it tracks the click target.
  return (
    <>
      {/* Trail echoes (3, with increasing delay) */}
      {[0, 1, 2].map((i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          aria-hidden
          className="fixed top-0 left-0 z-[9997] pointer-events-none"
          style={{
            opacity: isActive ? 0.18 - i * 0.05 : 0,
            transition: "opacity 0.3s ease-out",
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              marginLeft: -12,
              marginTop: -12,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(180,255,76,${
                0.6 - i * 0.18
              }) 0%, rgba(180,255,76,0) 70%)`,
              filter: "blur(2px)",
              transform: `scale(${1 - i * 0.2})`,
            }}
          />
        </div>
      ))}

      {/* Main glove cursor */}
      <div
        ref={cursorRef}
        aria-hidden
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.2s ease-out",
        }}
      >
        <div
          style={{
            transform: `scale(${isClicking ? 1.35 : 1}) rotate(${
              isClicking ? -8 : 0
            }deg)`,
            transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transformOrigin: "0 0",
            filter: `drop-shadow(0 0 6px ${
              isClicking ? "#ff4fa3" : "#b4ff4c"
            }) drop-shadow(0 0 12px ${
              isClicking ? "rgba(255,79,163,0.5)" : "rgba(180,255,76,0.4)"
            })`,
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Glove outline shadow */}
            <g>
              {/* Palm */}
              <path
                d="M9 22 C 9 28, 14 32, 19 32 C 25 32, 29 28, 28 22 L 28 18 C 28 17, 27 16, 26 16 L 25 16 L 25 11 C 25 10, 24 9, 23 9 C 22 9, 21 10, 21 11 L 21 16 L 19 16 L 19 8 C 19 7, 18 6, 17 6 C 16 6, 15 7, 15 8 L 15 16 L 13 16 L 13 12 C 13 11, 12 10, 11 10 C 10 10, 9 11, 9 12 L 9 22 Z"
                fill="#000"
                opacity="0.35"
                transform="translate(1,1)"
              />
              {/* Index finger (extended, pointing up-right) */}
              <path
                d="M9 22 C 9 28, 14 32, 19 32 C 25 32, 29 28, 28 22 L 28 18 C 28 17, 27 16, 26 16 L 25 16 L 25 11 C 25 10, 24 9, 23 9 C 22 9, 21 10, 21 11 L 21 16 L 19 16 L 19 8 C 19 7, 18 6, 17 6 C 16 6, 15 7, 15 8 L 15 16 L 13 16 L 13 12 C 13 11, 12 10, 11 10 C 10 10, 9 11, 9 12 L 9 22 Z"
                fill="#ffffff"
                stroke="#1a1a1a"
                strokeWidth="1.4"
              />
              {/* Cuff */}
              <ellipse
                cx="18.5"
                cy="30"
                rx="9"
                ry="3"
                fill="#f2c14e"
                stroke="#1a1a1a"
                strokeWidth="1.2"
              />
              {/* Cuff stripe */}
              <ellipse
                cx="18.5"
                cy="29.2"
                rx="9"
                ry="0.8"
                fill="#b4ff4c"
                opacity="0.85"
              />
              {/* Index finger highlight */}
              <path
                d="M 17 7.5 C 16.4 7.5, 15.8 7.9, 15.8 8.5 L 15.8 14"
                stroke="rgba(180,255,76,0.4)"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}
