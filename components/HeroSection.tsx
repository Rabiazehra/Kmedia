"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "./useSound";
import Image from "next/image";
import PopBubbles from "./PopBubbles";

const headline = "CRAFTING UNIQUE".split("");
const subline = ["W", "E", "B", " ", "L", "E", "G", "A", "C", "I", "E", "S", "."];

function MagneticButton({ children, href, onClick, onMouseEnter, external = true }: { children: React.ReactNode; href: string; onClick?: () => void; onMouseEnter?: () => void; external?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative inline-flex items-center gap-3 bg-[#b4ff4c] text-brand-green px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors shadow-[0_0_40px_rgba(180,255,76,0.35)] cursor-pointer z-30 pointer-events-auto"
    >
      {children}
    </motion.a>
  );
}

const stats = [
  { label: "Ad Spend Managed", value: "$12M+", accent: "#b4ff4c" },
  { label: "Brands Served", value: "200+", accent: "#74b9ff" },
  { label: "Combined Experience", value: "12 Yrs", accent: "#ff6b6b" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const playClick = useSound("/sounds/click.mp3", { volume: 0.5 });
  const playHover = useSound("/sounds/hover.mp3", { volume: 0.3, cooldownMs: 80 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-screen bg-brand-green overflow-hidden"
      onMouseMove={handleMouseMove}
      suppressHydrationWarning
    >
      {/* Ambient background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/50 via-brand-green to-brand-green z-0 pointer-events-none" suppressHydrationWarning />

      {/* Soft radial glow behind the avatar on the right */}
      <div
        className="absolute z-0 pointer-events-none"
        style={{
          width: "60%",
          height: "90%",
          top: "5%",
          right: "5%",
          background:
            "radial-gradient(ellipse at center, rgba(180,255,76,0.10) 0%, rgba(180,255,76,0.04) 50%, transparent 80%)",
        }}
        aria-hidden
      />

      {/* ===== LEFT HALF: Headline + CTA + Stats ===== */}
      <div className="absolute left-0 top-0 bottom-0 w-1/2 z-30 pointer-events-none flex flex-col justify-center px-8 md:px-14 lg:px-20" suppressHydrationWarning>
        <div className="max-w-xl" suppressHydrationWarning>
          <h1 className="font-bebas text-white text-[11vw] md:text-[6vw] lg:text-[5.2vw] font-normal leading-[0.92] uppercase tracking-tight text-left whitespace-normal">
            <motion.span className="block">
              {headline.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 80, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: 3.4 + i * 0.03,
                  }}
                  className="inline-block"
                  style={char === " " ? { width: "0.3em" } : {}}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 3.8 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#b4ff4c] to-[#f2c14e] block mt-1"
            >
              {subline.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 80, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: 3.4 + (headline.length + i) * 0.03,
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          {/* CTA + Secondary link */}
          <motion.div
            className="flex items-center gap-5 mt-8 md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.2, duration: 0.5 }}
          >
            <MagneticButton href="/start" external={false} onClick={playClick} onMouseEnter={playHover}>
              Start Your Journey
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </MagneticButton>
            <a
              href="/portfolio"
              onMouseEnter={() => playHover()}
              className="font-pixel text-[10px] md:text-[11px] text-white/60 hover:text-[#b4ff4c] transition-colors uppercase tracking-widest flex items-center gap-2 pointer-events-auto"
            >
              <span className="animate-pixel-blink">▶</span>
              <span>See Our Work</span>
            </a>
          </motion.div>

          {/* Trust Stats */}
          <motion.div
            className="flex gap-6 md:gap-10 mt-10 md:mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.6, duration: 0.5 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="font-pixel text-lg md:text-xl lg:text-2xl tracking-tight"
                  style={{ color: stat.accent, textShadow: `0 0 8px ${stat.accent}60` }}
                >
                  {stat.value}
                </span>
                <span className="font-mono text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest mt-1 whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ===== RIGHT HALF: Avatar + Bubbles ===== */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 z-20 pointer-events-none flex items-center justify-center" suppressHydrationWarning>
        <PopBubbles count={12} />

        <motion.div
          className="relative z-10"
          style={{
            transform: `translate(${(mousePos.x - 0.5) * 10}px, ${(mousePos.y - 0.5) * 10}px)`,
          }}
        >
          <div className="relative w-[35vw] md:w-[28vw] lg:w-[22vw] h-[60vh]" suppressHydrationWarning>
            {/* Floor shadow */}
            <div
              className="absolute bottom-[6%] left-1/2 -translate-x-1/2 z-0"
              style={{
                width: "50%",
                height: "4%",
                background: "radial-gradient(ellipse, rgba(180,255,76,0.2) 0%, transparent 70%)",
                filter: "blur(6px)",
              }}
              aria-hidden
            />
            <Image
              src="/avatar.png"
              alt="3D Astronaut Avatar"
              fill
              className="object-contain object-bottom drop-shadow-[0_0_30px_rgba(180,255,76,0.3)] z-10"
              priority
              sizes="(max-width: 768px) 35vw, (max-width: 1024px) 28vw, 22vw"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
      >
        <span className="text-[8px] font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ height: [8, 20, 8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}