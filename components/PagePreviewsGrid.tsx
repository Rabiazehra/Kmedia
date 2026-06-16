"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSound } from "./useSound";

const pagePreviews = [
  {
    title: "We Offer",
    tag: "Our Services",
    description:
      "360° digital marketing — social media, paid ads, video production, design, growth strategy, and web development.",
    href: "/services",
    accent: "#b4ff4c",
    icon: "▶",
  },
  {
    title: "Portfolio",
    tag: "Creative Work",
    description:
      "Campaigns, visuals, and digital experiences we've crafted for brands that mean business.",
    href: "/portfolio",
    accent: "#f2c14e",
    icon: "◆",
  },
  {
    title: "About",
    tag: "Who We Are",
    description:
      "Our mission, vision, and the story behind Krelimedia — where strategy meets creativity.",
    href: "/about",
    accent: "#a29bfe",
    icon: "●",
  },
  {
    title: "Careers",
    tag: "Join the Team",
    description:
      "Join our talented team passionate about digital marketing and explore open roles.",
    href: "/careers",
    accent: "#ff6b6b",
    icon: "▲",
  },
  {
    title: "Team",
    tag: "Meet the Wizards",
    description:
      "The creative minds and growth strategists driving real results for brands.",
    href: "/team",
    accent: "#55efc4",
    icon: "★",
  },
  {
    title: "Contact",
    tag: "Get in Touch",
    description:
      "Let's talk about your goals and build something that works for you.",
    href: "/contact",
    accent: "#74b9ff",
    icon: "▼",
  },
];

export default function PagePreviewsGrid() {
  const playHover = useSound("/sounds/hover.mp3", { volume: 0.3, cooldownMs: 80 });

  return (
    <section className="relative w-full bg-brand-green py-28 px-6 md:px-10 overflow-hidden">
      {/* Background noise */}
      <div className="absolute inset-0 crt-noise pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header — retro treatment */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-block font-pixel text-[10px] text-[#b4ff4c] retro-glow uppercase tracking-[0.4em] mb-4"
          >
            ► Explore ◄
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-bebas text-white text-5xl md:text-7xl lg:text-[7vw] leading-[0.85] uppercase tracking-tighter"
          >
            What We Do
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {pagePreviews.map((page, index) => (
            <motion.div
              key={page.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <Link
                href={page.href}
                className="group relative block bg-black/40 border border-white/10 p-8 transition-all duration-300 overflow-hidden h-full min-h-[280px] flex flex-col"
                style={{
                  borderRadius: "4px",
                  boxShadow: "4px 4px 0 rgba(0,0,0,0.5)",
                }}
                suppressHydrationWarning
                onMouseEnter={(e) => {
                  playHover();
                  e.currentTarget.style.boxShadow = `4px 4px 0 rgba(0,0,0,0.5), 0 0 24px ${page.accent}25`;
                  e.currentTarget.style.borderColor = `${page.accent}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "4px 4px 0 rgba(0,0,0,0.5)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: page.accent }}
                  aria-hidden
                />

                {/* CRT scanlines inside card */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 3px)",
                    pointerEvents: "none",
                  }}
                  aria-hidden
                />

                {/* Tag row */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="font-mono text-lg"
                    style={{
                      color: page.accent,
                      textShadow: `0 0 6px ${page.accent}`,
                    }}
                  >
                    {page.icon}
                  </span>
                  <span
                    className="text-xs font-bold uppercase tracking-[0.25em]"
                    style={{ color: page.accent }}
                  >
                    {page.tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-bebas text-white text-3xl md:text-4xl uppercase tracking-tight mb-3 group-hover:translate-x-1 transition-transform duration-300"
                  style={{
                    textShadow: `1px 1px 0 ${page.accent}30`,
                  }}
                >
                  {page.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed flex-1 mb-4">
                  {page.description}
                </p>

                {/* Explore link — retro pixel style */}
                <span
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 group-hover:gap-3 group-hover:translate-x-1 mt-auto"
                  style={{ color: page.accent }}
                >
                  <span className="font-mono text-base animate-pixel-blink">►</span>
                  <span className="font-pixel text-[9px]">Explore</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}