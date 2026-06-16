"use client";

/**
 * Route-level loading fallback.
 * Plays a "TUNING..." CRT screen with static + scanlines while
 * Next.js streams the new page in.
 */
export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9990] flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(2,42,40,1) 0%, rgba(0,0,0,1) 100%)",
      }}
      aria-live="polite"
      role="status"
    >
      {/* Static overlay */}
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          opacity: 0.4,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "300px 300px",
          animation: "retroNoise 0.25s steps(3) infinite",
        }}
        aria-hidden
      />
      {/* Scanlines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)",
        }}
        aria-hidden
      />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div
          className="font-pixel text-[10px] md:text-xs text-[#b4ff4c] retro-glow tracking-[0.4em] uppercase"
          style={{
            textShadow:
              "2px 0 0 rgba(255,0,80,0.8), -2px 0 0 rgba(0,200,255,0.8)",
          }}
        >
          ▌ TUNING SIGNAL ▐
        </div>
        <div className="flex items-center gap-2 font-pixel text-[8px] text-white/70 tracking-widest">
          <span className="animate-pixel-blink">►</span>
          <span>LOADING</span>
          <span className="animate-pixel-blink">.</span>
          <span className="animate-pixel-blink" style={{ animationDelay: "0.2s" }}>
            .
          </span>
          <span className="animate-pixel-blink" style={{ animationDelay: "0.4s" }}>
            .
          </span>
        </div>
      </div>
    </div>
  );
}
