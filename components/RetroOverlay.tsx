"use client";
import { useAccessibility } from "./AccessibilityContext";

export default function RetroOverlay() {
  const { disableVisualEffects } = useAccessibility();

  return (
    <>
      {/* Scanlines — horizontal CRT lines */}
      <div // Always show scanlines, they are subtle enough
        aria-hidden
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)",
          backgroundSize: "100% 3px",
        }}
      />

      {/* Noise grain — animated static texture */}
      {!disableVisualEffects && (
        <div
          aria-hidden
          className="fixed inset-0 z-[9998] pointer-events-none mix-blend-overlay"
          style={{
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "150px 150px",
            animation: "retroNoise 0.3s steps(4) infinite",
          }}
        />
      )}

      {/* CRT vignette — dark edges */}
      {!disableVisualEffects && (
        <div
          aria-hidden
          className="fixed inset-0 z-[9998] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      )}

      {/* Chromatic aberration — subtle RGB border glow on the whole page */}
      <style>{`
        @keyframes retroNoise {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-2%, 2%); }
          50% { transform: translate(2%, -1%); }
          75% { transform: translate(-1%, -2%); }
          100% { transform: translate(1%, 1%); }
        }
        @keyframes retroFlicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.992; }
        }
        body {
          animation: retroFlicker 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}