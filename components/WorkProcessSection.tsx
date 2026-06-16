"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useSound } from "./useSound";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We start with a deep-dive into your brand, goals, target audience, and current digital presence. No templates — just honest analysis.",
    color: "#b4ff4c",
  },
  {
    number: "02",
    title: "Strategy Blueprint",
    description:
      "We craft a custom 90-day growth roadmap covering content pillars, ad budgets, platform priorities, and KPIs tailored to your business.",
    color: "#f2c14e",
  },
  {
    number: "03",
    title: "Creative Production",
    description:
      "Our design and video team produces scroll-stopping content — reels, graphics, ad creatives — all aligned to your brand identity.",
    color: "#ff6b6b",
  },
  {
    number: "04",
    title: "Launch & Distribute",
    description:
      "We deploy your campaigns across the right channels at the right times, managing every post, ad set, and audience segment hands-on.",
    color: "#a29bfe",
  },
  {
    number: "05",
    title: "Analyse & Scale",
    description:
      "We track every metric that matters, kill what doesn't work, double down on what does, and report back with full transparency monthly.",
    color: "#55efc4",
  },
];

export default function WorkProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const playHover = useSound("/sounds/hover.mp3", { volume: 0.3, cooldownMs: 80 });
  const playLevelUp = useSound("/sounds/click.mp3", { volume: 0.5 });
  const hasPlayedRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.99 && !hasPlayedRef.current) {
      playLevelUp();
      hasPlayedRef.current = true;
    } else if (latest < 0.9) {
      hasPlayedRef.current = false;
    }
  });

  return (
    <section ref={containerRef} className="bg-brand-green py-28 px-6 md:px-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#b4ff4c] font-pixel text-[10px] uppercase tracking-[0.4em] retro-glow"
          >
            ► Mission Checklist ◄
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-bebas text-white text-6xl md:text-8xl lg:text-[8vw] leading-[0.85] uppercase tracking-tighter mt-3 max-w-4xl"
          >
            Quest Sequence
          </motion.h2>
        </div>

        {/* Curved Timeline */}
        <div className="relative">
          {/* SVG Curved Path — drawn on scroll */}
          <svg
            className="absolute left-[28px] md:left-[32px] top-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 800"
            preserveAspectRatio="none"
          >
            <motion.path
              ref={pathRef}
              d="M 30 0 C 30 200, 70 400, 30 600 C 10 700, 50 750, 30 800"
              fill="none"
              stroke="#b4ff4c"
              strokeWidth="3"
              strokeOpacity="0.3"
              strokeDasharray="0 1"
              style={{ pathLength }}
            />
          </svg>

          {/* Steps */}
          <div className="flex flex-col gap-16 md:gap-24 relative">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseEnter={() => playHover()}
                  className={`flex items-start gap-6 md:gap-10 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Node dot */}
                  <div className="relative flex-shrink-0 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: i * 0.1 + 0.2,
                      }}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: step.color }}
                    >
                      <span className="font-pixel text-xs text-brand-green">
                        {step.number}
                      </span>
                    </motion.div>
                    {/* Ring pulse */}
                    <motion.div
                      initial={{ scale: 1, opacity: 0.5 }}
                      whileInView={{ scale: 2, opacity: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.5, delay: i * 0.1 + 0.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-full"
                      style={{ border: `2px solid ${step.color}` }}
                    />
                  </div>

                  {/* Content card */}
                  <div
                    className={`flex-1 max-w-lg ${
                      isLeft ? "md:text-left" : "md:text-right"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                      className="group relative bg-black/40 backdrop-blur-md border border-white/10 p-6 md:p-8 overflow-hidden transition-all duration-300 hover:border-[#b4ff4c]/40"
                      style={{ borderRadius: "4px", boxShadow: "6px 6px 0 rgba(0,0,0,0.4)" }}
                    >
                      <div className="absolute inset-0 crt-scanlines opacity-20 pointer-events-none" />
                      
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-pixel text-[8px] text-[#b4ff4c] uppercase tracking-widest opacity-60">LVL {step.number}</span>
                        <div className="h-px flex-1 bg-white/10" />
                      </div>

                      <h3 className="font-bebas text-3xl md:text-4xl text-white uppercase tracking-tight leading-[0.9] mb-3 group-hover:text-[#b4ff4c] transition-colors">
                        <span className="mr-2 text-[#b4ff4c] animate-pixel-blink">►</span>
                        {step.title}
                      </h3>
                      <p className="text-white/60 text-base md:text-lg leading-relaxed font-medium">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}