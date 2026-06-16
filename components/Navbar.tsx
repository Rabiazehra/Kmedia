"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "./useSound";

const navLinks = [
  { label: "Home", href: "/", code: "01" },
  { label: "Services", href: "/services", code: "02" },
  { label: "Portfolio", href: "/portfolio", code: "03" },
  { label: "About", href: "/about", code: "04" },
  { label: "Careers", href: "/careers", code: "05" },
  { label: "Team", href: "/team", code: "06" },
  { label: "Contact", href: "/contact", code: "07" },
];

/**
 * Navbar
 * ------
 * Retro TV / arcade machine aesthetic:
 *  - CRT bezel with scanlines + noise inside the header
 *  - Pixel font (Press Start 2P) for nav labels
 *  - "CH XX ► LABEL" format with a blinking caret
 *  - Top marquee line: "► INSERT COIN — SIGNAL: STABLE — STAGE 01..."
 *  - Mobile drawer styled like a vertical sub-menu panel
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState<string>("");
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);
  const playHover = useSound("/sounds/hover.mp3", { volume: 0.3, cooldownMs: 80 });
  const playClick = useSound("/sounds/click.mp3", { volume: 0.5 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Live "system clock" in retro HUD style
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Sync `isOpen` to false when the route changes.
  const lastPathRef = useRef(pathname);
  useEffect(() => {
    if (lastPathRef.current !== pathname) {
      lastPathRef.current = pathname;
      setIsOpen(false);
    }
  }, [pathname]);
  const effectiveOpen = isOpen;

  const marqueeText =
    "► INSERT COIN   ◆   SIGNAL: STABLE   ◆   KRELIMEDIA ARCADE v1.0   ◆   PRESS START TO BEGIN   ◆   ";

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "translate-y-0"
          : "translate-y-0"
      }`}
    >
      {/* Outer CRT bezel — looks like a chunky TV frame */}
      <div
        className="relative w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(2,42,40,0.95) 100%)",
          borderBottom: "3px solid #0a0a0a",
          boxShadow:
            "0 8px 24px rgba(0,0,0,0.6), inset 0 -1px 0 rgba(180,255,76,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Top marquee strip */}
        <div
          className="relative overflow-hidden border-b border-[#b4ff4c]/20"
          style={{
            background:
              "linear-gradient(90deg, rgba(180,255,76,0.12), rgba(116,185,255,0.08), rgba(180,255,76,0.12))",
            height: 22,
          }}
        >
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, dup) => (
              <span
                key={dup}
                className="font-pixel text-[9px] md:text-[10px] text-[#b4ff4c] retro-glow tracking-widest pr-8"
                aria-hidden={dup === 1}
              >
                {marqueeText.repeat(2)}
              </span>
            ))}
          </div>
        </div>

        {/* Main bar */}
        <div className="relative max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3 md:py-4">
          {/* CRT scanlines + noise overlays inside the bar */}
          <div className="absolute inset-0 crt-scanlines opacity-60" aria-hidden />
          <div className="absolute inset-0 crt-noise" aria-hidden />

          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 inline-flex items-center gap-2 group"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            aria-label="KRELIMEDIA home"
          >
            <span
              className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-sm"
              style={{
                background: "#b4ff4c",
                boxShadow:
                  "0 0 0 2px #04423f, 0 0 12px rgba(180,255,76,0.6), inset 0 0 0 2px rgba(255,255,255,0.4)",
              }}
            >
              <span className="font-pixel text-[10px] md:text-xs text-[#04423f]">
                K
              </span>
            </span>
            <span className="font-pixel text-base md:text-lg text-white retro-glow tracking-widest uppercase">
              KRELIMEDIA
            </span>
            <span className="hidden md:inline-block ml-1 px-1.5 py-0.5 font-pixel text-[8px] text-[#b4ff4c] border border-[#b4ff4c]/50 retro-glow">
              v1.0
            </span>
          </Link>

          {/* Desktop Links — game menu */}
          <nav className="hidden md:flex items-center gap-1 relative z-10">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="group relative px-4 py-2 font-pixel text-[9px] tracking-widest uppercase"
                >
                  {/* Hover/active background plate */}
                  <span
                    className={`absolute inset-0 transition-opacity duration-200 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, rgba(180,255,76,0.18) 0px, rgba(180,255,76,0.18) 2px, transparent 2px, transparent 4px)",
                      border: "1px solid rgba(180,255,76,0.4)",
                      boxShadow:
                        "0 0 8px rgba(180,255,76,0.4), inset 0 0 6px rgba(180,255,76,0.2)",
                    }}
                    aria-hidden
                  />
                  <span
                    className={`relative ${
                      isActive
                        ? "text-[#b4ff4c] retro-glow"
                        : "text-white/85 group-hover:text-[#b4ff4c] group-hover:retro-glow"
                    }`}
                    style={{
                      textShadow: isActive
                        ? "2px 0 0 rgba(255,0,80,0.7), -2px 0 0 rgba(0,200,255,0.7)"
                        : undefined,
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right HUD: clock + CTA */}
          <div className="relative z-10 hidden md:flex items-center gap-3">
            <div
              className="font-pixel text-[9px] text-[#b4ff4c] retro-glow px-2 py-1 border border-[#b4ff4c]/40"
              style={{
                background: "rgba(0,0,0,0.45)",
                boxShadow: "inset 0 0 6px rgba(180,255,76,0.2)",
              }}
              aria-label="system clock"
            >
              <span className="opacity-60">SYS: </span>
              {time || "--:--:--"}
            </div>
            <Link
              href="/start"
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="game-button"
            >
              <span className="animate-pixel-blink">►</span>
              <span>Start</span>
            </Link>
          </div>

          {/* Mobile toggle — chunky "POWER" button */}
          <button
          onClick={() => {
            setIsOpen(!isOpen);
            playClick();
          }}
          onMouseEnter={() => playHover()}
            className="md:hidden relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-sm font-pixel text-[10px] text-[#b4ff4c] retro-glow"
            style={{
              background: "rgba(0,0,0,0.6)",
              border: "2px solid #b4ff4c",
              boxShadow:
                "0 0 8px rgba(180,255,76,0.4), inset 0 0 4px rgba(180,255,76,0.3)",
            }}
            aria-label="Toggle menu"
            aria-expanded={effectiveOpen}
          >
            {effectiveOpen ? "X" : "MENU"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer — game sub-menu panel */}
      <AnimatePresence>
        {effectiveOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden relative w-full overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(2,42,40,0.98) 0%, rgba(0,0,0,0.95) 100%)",
              borderBottom: "3px solid #0a0a0a",
              boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            }}
          >
            <div className="absolute inset-0 crt-scanlines opacity-50" aria-hidden />
            <div className="absolute inset-0 crt-noise" aria-hidden />

            <div className="relative z-10 px-6 py-6 flex flex-col gap-1">
              <div className="font-pixel text-[9px] text-[#b4ff4c] retro-glow mb-3 flex items-center justify-between">
                <span>MENU</span>
                <span className="opacity-60">{time || "--:--:--"}</span>
              </div>

              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                onMouseEnter={() => playHover()}
                onClick={() => {
                  setIsOpen(false);
                  playClick();
                }}
                    className="group py-3 border-b border-white/10"
                  >
                    <span
                      className={`font-pixel text-sm tracking-widest uppercase transition-all ${
                        isActive
                          ? "text-[#b4ff4c] retro-glow"
                          : "text-white group-hover:text-[#b4ff4c] group-hover:retro-glow"
                      }`}
                      style={{
                        textShadow: isActive
                          ? "2px 0 0 rgba(255,0,80,0.7), -2px 0 0 rgba(0,200,255,0.7)"
                          : undefined,
                      }}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}

              <Link
                href="/start"
                onMouseEnter={() => playHover()}
                onClick={() => {
                  setIsOpen(false);
                  playClick();
                }}
                className="game-button mt-5 justify-center"
              >
                <span className="animate-pixel-blink">►</span>
                <span>Start</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
