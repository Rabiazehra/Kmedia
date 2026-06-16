"use client";

import { useState, useRef } from "react";
import { useSound } from "./useSound";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  TrendingUp,
  Video,
  Palette,
  BarChart2,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    icon: <Camera className="w-8 h-8" />,
    title: "Social Media Management",
    description:
      "Full-spectrum management of your Instagram, Facebook, TikTok & LinkedIn — from strategy and content to scheduling and community engagement.",
    gradient: "from-[#b4ff4c] to-[#9ce069]",
    accent: "#b4ff4c",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Paid Advertising",
    description:
      "ROI-driven Meta Ads and Google Ads campaigns engineered to convert cold audiences into paying customers at the lowest possible cost.",
    gradient: "from-[#f2c14e] to-[#f5c542]",
    accent: "#f2c14e",
  },
  {
    icon: <Video className="w-8 h-8" />,
    title: "Video Production",
    description:
      "Cinematic brand videos, reels, and short-form content that stop the scroll and make people remember your brand for days.",
    gradient: "from-[#ff6b6b] to-[#ee5a24]",
    accent: "#ff6b6b",
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Graphic Design",
    description:
      "Premium visual identity systems, ad creatives, and post designs that are unmistakably on-brand and built to perform.",
    gradient: "from-[#a29bfe] to-[#6c5ce7]",
    accent: "#a29bfe",
  },
  {
    icon: <BarChart2 className="w-8 h-8" />,
    title: "Growth Strategy",
    description:
      "Data-led growth planning. We audit your current presence, identify gaps, and build a roadmap that consistently moves the needle.",
    gradient: "from-[#55efc4] to-[#00b894]",
    accent: "#55efc4",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Web & Landing Pages",
    description:
      "High-converting websites and landing pages built for speed, SEO, and user experience — designed to turn clicks into clients.",
    gradient: "from-[#74b9ff] to-[#0984e3]",
    accent: "#74b9ff",
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(0);

  const playHover = useSound("/sounds/hover.mp3", { volume: 0.3, cooldownMs: 80 });

  const next = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const prev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const current = services[activeIndex];

  // Get previous and next indices
  const prevIndex = (activeIndex - 1 + services.length) % services.length;
  const nextIndex = (activeIndex + 1) % services.length;

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      rotateY: dir > 0 ? 45 : -45,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      rotateY: dir > 0 ? -45 : 45,
      scale: 0.8,
    }),
  };

  return (
    <section id="services" className="bg-brand-green py-36 md:py-44 px-6 md:px-10 relative overflow-hidden" ref={containerRef}>
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: current.accent }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 md:mb-24 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#b4ff4c] text-xs font-bold uppercase tracking-[0.3em]"
            >
              What We Do
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-bebas text-white text-6xl md:text-8xl lg:text-[8vw] leading-[0.85] uppercase tracking-tighter mt-3"
            >
              We Offer
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-sm text-base font-medium leading-relaxed md:text-right"
          >
            360° digital marketing services engineered to drive growth,
            engagement, and real business results.
          </motion.p>
        </div>

        {/* 3D Carousel */}
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          {/* Left side: Navigation + card */}
          <div className="w-full lg:w-2/3">
            <div className="relative perspective-[1200px] min-h-[400px] flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  }}
                  className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 flex flex-col gap-6"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Icon with gradient background */}
                  <motion.div
                    key={`icon-${activeIndex}`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${current.gradient} text-brand-green`}
                  >
                    {current.icon}
                  </motion.div>

                  <motion.h3
                    key={`title-${activeIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="font-bebas text-white text-4xl md:text-5xl uppercase leading-[0.9] tracking-tight"
                  >
                    {current.title}
                  </motion.h3>

                  <motion.p
                    key={`desc-${activeIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="text-white/60 text-base leading-relaxed"
                  >
                    {current.description}
                  </motion.p>

                  {/* Progress dots */}
                  <div className="flex gap-2 mt-4">
                    {services.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDirection(i > activeIndex ? 1 : -1);
                          setActiveIndex(i);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === activeIndex
                            ? "w-8 bg-white"
                            : "w-1.5 bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onMouseEnter={() => playHover()}
                onClick={prev}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-all group"
                aria-label="Previous service"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onMouseEnter={() => playHover()}
                onClick={next}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-all group"
                aria-label="Next service"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right side: Quick stats / peek at other services */}
          <div className="w-full lg:w-1/3 space-y-5">
            <p className="text-white/40 text-xs uppercase tracking-[0.25em] font-mono mb-6">
              Explore Our Services
            </p>
            {[prevIndex, activeIndex, nextIndex].map((idx, i) => (
              <motion.button
                key={idx}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                onMouseEnter={() => playHover()}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                  idx === activeIndex
                    ? "border-[#b4ff4c] bg-[#b4ff4c]/10"
                    : "border-white/10 hover:border-white/30 bg-white/5"
                }`}
              >
                <span className={`font-bebas text-xl uppercase tracking-tight ${
                  idx === activeIndex ? "text-[#b4ff4c]" : "text-white/50"
                }`}>
                  {services[idx].title}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}