"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LetterTransform {
  x: number;
  y: number;
  rotate: number;
}

function generateTransforms(count: number): LetterTransform[] {
  return Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 600,
    y: (Math.random() - 0.5) * 400,
    rotate: (Math.random() - 0.5) * 180,
  }));
}

function generateScatterDirs(count: number): LetterTransform[] {
  return Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 800,
    y: (Math.random() - 0.5) * 600,
    rotate: (Math.random() - 0.5) * 360,
  }));
}

const LETTERS = "KRELIMEDIA".split("");

const INTRO_KEY = "krelimedia-intro-seen";

export default function AnimatedLogoIntro() {
  const [entryAngles] = useState<LetterTransform[]>(() => generateTransforms(LETTERS.length));
  const [scatterDirs] = useState<LetterTransform[]>(() => generateScatterDirs(LETTERS.length));
  // Always start with intro playing — sessionStorage check happens in useEffect
  // to avoid hydration mismatch between server and client.
  const [phase, setPhase] = useState<"enter" | "hold" | "exit" | "done">("enter");
  const [showContent, setShowContent] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check if intro already played this session — skip if so
    try {
      if (sessionStorage.getItem(INTRO_KEY) === "1") {
        setPhase("done");
        setShowContent(true);
        return;
      }
    } catch {}

    // Phase 1: Letters fly in (0–1.2s)
    const t1 = setTimeout(() => setPhase("hold"), 1200);
    // Phase 2: Glow pulse (1.2–2.4s)
    const t2 = setTimeout(() => setPhase("exit"), 2400);
    // Phase 3: Scatter (2.4–3.2s)
    const t3 = setTimeout(() => {
      setPhase("done");
      setShowContent(true);
      try { sessionStorage.setItem(INTRO_KEY, "1"); } catch {}
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const getInitialAnimationProps = (i: number) => ({
    opacity: 0,
    x: isClient ? (entryAngles[i]?.x ?? 0) : 0,
    y: isClient ? (entryAngles[i]?.y ?? 0) : 0,
    rotate: isClient ? (entryAngles[i]?.rotate ?? 0) : 0,
    scale: 0.3,
  });

  return (
    <>
      <AnimatePresence>
        {!showContent && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-green"
            suppressHydrationWarning
          >
            <div className="relative flex items-center gap-1 md:gap-2" suppressHydrationWarning>
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-bebas text-white text-[12vw] md:text-[8vw] lg:text-[6vw] leading-none tracking-tighter inline-block"
                  initial={getInitialAnimationProps(i)} // Use the conditional initial props
                  animate={
                    phase === "enter"
                      ? {
                          opacity: 1,
                          x: 0,
                          y: 0,
                          rotate: 0,
                          scale: 1,
                        }
                      : phase === "hold"
                      ? {
                          opacity: 1,
                          x: 0,
                          y: 0,
                          rotate: 0,
                          scale: [1, 1.08, 1],
                          filter: [
                            "drop-shadow(0 0 0px #b4ff4c)",
                            "drop-shadow(0 0 30px #b4ff4c)",
                            "drop-shadow(0 0 0px #b4ff4c)",
                          ],
                        }
                      : phase === "exit"
                      ? {
                          opacity: 0,
                          x: scatterDirs[i]?.x ?? 0,
                          y: scatterDirs[i]?.y ?? 0,
                          rotate: scatterDirs[i]?.rotate ?? 0,
                          scale: 0.2,
                        }
                      : {}
                  }
                  transition={
                    phase === "enter"
                      ? {
                          type: "spring",
                          stiffness: 120,
                          damping: 12,
                          delay: i * 0.08,
                        }
                      : phase === "hold"
                      ? {
                          duration: 1.2,
                          ease: "easeInOut",
                        }
                      : {
                          duration: 0.6,
                          ease: [0.55, 0.085, 0.68, 0.53],
                          delay: i * 0.04,
                        }
                  }
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Tagline fade-in */}
            {phase === "hold" && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute bottom-[18%] left-1/2 -translate-x-1/2 text-[#b4ff4c] text-xs md:text-sm font-mono uppercase tracking-[0.3em]"
              >
                Where Strategy Meets Creativity
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
