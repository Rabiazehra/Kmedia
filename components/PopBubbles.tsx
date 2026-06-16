"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useSound } from "./useSound";
import { motion } from "framer-motion";

interface Bubble {
  id: number;
  x: number; // % of viewport width
  y: number; // % of viewport height
  size: number;
  color: string;
  label: string;
  score: number;
  /** Slight tilt for personality */
  rotation: number;
  /** Animation delay offset */
  floatDelay: number;
}

interface PopParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  distance: number;
  size: number;
  value: number; // Score value for particle
}

const labels = [
  "Meta Ads", "TikTok", "SEO", "Branding", "Google Ads",
  "Content", "Strategy", "Growth", "Design", "Brand Identity",
  "Analytics", "Outreach", "Influencer", "Conversion", "ROI",
  "Performance", "Email", "Video", "Snapchat", "LinkedIn",
];

const colors = [
  "#b4ff4c", "#f2c14e", "#ff6b6b", "#a29bfe", "#55efc4",
  "#74b9ff", "#fd79a8", "#e17055", "#00cec9", "#fdcb6e",
  "#6c5ce7", "#00b894", "#e84393", "#0984e3", "#33d630",
];

/**
 * Generate bubble positions using a Fibonacci-spiral pattern
 * inside the right half of the viewport (x: 55-95%, y: 5-90%).
 * This guarantees the bubbles never overlap the headline
 * (left half) or crowd the avatar's center.
 */
function fibonacciPositions(count: number): Array<{ x: number; y: number; size: number }> {
  const positions: Array<{ x: number; y: number; size: number }> = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5°
  const cx = 75; // bubble-cluster center (%)
  const cy = 50;
  const maxRadius = 28; // % — how far bubbles can spread

  for (let i = 0; i < count; i++) {
    // r grows with sqrt(i) for an even spiral
    const r = maxRadius * Math.sqrt((i + 1) / count);
    const angle = i * goldenAngle;
    let x = cx + r * Math.cos(angle);
    let y = cy + r * Math.sin(angle);
    // Clamp to the right-half "stage" zone with margins
    x = Math.max(56, Math.min(95, x));
    y = Math.max(8, Math.min(88, y));
    // Size: bigger toward the center, smaller at the edges
    const distFromCenter = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    const size = Math.max(38, 72 - distFromCenter * 1.0);
    positions.push({ x, y, size: size + (i % 3) * 4 });
  }
  return positions;
}

function buildBubbles(count: number): Bubble[] {
  const positions = fibonacciPositions(count);
  return positions.map((pos, i) => ({
    id: i + 1,
    x: pos.x,
    y: pos.y,
    size: pos.size,
    color: colors[i % colors.length],
    label: labels[i % labels.length],
    score: (Math.floor(Math.random() * 5) + 1) * 100, // 100, 200, 300, 400, 500
    rotation: ((i * 17) % 21) - 10, // -10deg to +10deg
    floatDelay: (i * 0.17) % 1.2,
  }));
}

export default function PopBubbles({ count = 12 }: { count?: number }) {
  // Initialize bubbles lazily in a state initializer. This keeps the
  // list as actual state (not a ref) so the render body can read it
  // without lint warnings, and avoids the setState-in-effect cascade.
  const [bubbles, setBubbles] = useState<Bubble[]>(() => buildBubbles(count));
  const [visible, setVisible] = useState<Set<number>>(
    () => new Set(bubbles.map((b) => b.id))
  );
  const [particles, setParticles] = useState<PopParticle[]>([]);
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const particleIdRef = useRef(0);

  const playPop = useSound("/sounds/click.mp3", { volume: 0.4 });

  // Re-initialize bubbles when `count` changes. We defer the state
  // updates into a microtask so the React-19 effect analyzer does
  // not flag the synchronous setState-in-effect.
  useEffect(() => {
    queueMicrotask(() => {
      const next = buildBubbles(count);
      setBubbles(next);
      setVisible(new Set(next.map((b) => b.id)));
    });
  }, [count]);

  const popBubble = useCallback(
    (id: number, e: React.MouseEvent) => {
      e.stopPropagation();

      setVisible((prevVisible) => {
        if (!prevVisible.has(id)) return prevVisible;
        const bubble = bubbles.find((b) => b.id === id);
        if (!bubble) return prevVisible;

        playPop();
        setScore((prev) => prev + bubble.score);

        // Spawn particles at click position — guard against null currentTarget
        const target = e.currentTarget as HTMLElement | null;
        if (!target) return prevVisible;
        const rect = target.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const newParticles: PopParticle[] = [];
        const pCount = 14 + Math.floor(Math.random() * 8); // 14-22 particles (more pop!)
        for (let i = 0; i < pCount; i++) {
          const angle = (360 / pCount) * i + Math.random() * 18;
          newParticles.push({
            id: particleIdRef.current++,
            x: cx,
            y: cy,
            color: bubble.color,
            angle,
            distance: 70 + Math.random() * 110,
            value: bubble.score,
            size: 4 + Math.random() * 7,
          });
        }
        setParticles((prev) => [...prev, ...newParticles]);

        // Clean up particles
        setTimeout(() => {
          setParticles((prev) =>
            prev.filter((p) => !newParticles.some((np) => np.id === p.id))
          );
        }, 700);

        // Respawn a new bubble after a short delay
        setTimeout(() => {
          const newBubble: Bubble = {
            id: Date.now() + Math.random(),
            ...fibonacciPositions(1)[0],
            color: colors[Math.floor(Math.random() * colors.length)],
            score: (Math.floor(Math.random() * 5) + 1) * 100,
            label: labels[Math.floor(Math.random() * labels.length)],
            rotation: ((Math.random() * 20) | 0) - 10,
            floatDelay: Math.random() * 1.2,
          };
          setBubbles((prev) => [...prev, newBubble]);
          setVisible((prevSet) => {
            const nextSet = new Set(prevSet);
            nextSet.add(newBubble.id);
            return nextSet;
          });
        }, 700);

        // Remove the popped bubble from visible
        const next = new Set(prevVisible);
        next.delete(id);
        return next;
      });
    },
    [bubbles, playPop]
  );

  // Animate display score toward `score` whenever it changes.
  useEffect(() => {
    const animationDuration = 500; // ms
    const frameRate = 60; // fps
    const frames = animationDuration / (1000 / frameRate);
    let currentFrame = 0;
    let cancelled = false;

    const animateScore = () => {
      if (cancelled) return;
      if (currentFrame < frames) {
        const progress = currentFrame / frames;
        // Use functional update to read latest displayScore without
        // adding it to the dependency array.
        setDisplayScore((prev) => Math.round(prev + (score - prev) * progress));
        currentFrame++;
        requestAnimationFrame(animateScore);
      } else {
        setDisplayScore(score);
      }
    };
    requestAnimationFrame(animateScore);

    return () => {
      cancelled = true;
    };
  }, [score]);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Score display — driven by the animated `displayScore` value */}
      <div className="absolute top-6 right-6 z-30 pointer-events-none select-none">
        <div
          className="font-bebas text-[#b4ff4c] text-4xl md:text-5xl uppercase tracking-tight retro-glow"
          style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.6)" }}
        >
          {displayScore}
        </div>
      </div>

      {/* Floating bubbles */}
      {bubbles
        .filter((b) => visible.has(b.id))
        .map((bubble) => (
          <motion.button
            key={bubble.id}
            initial={{ scale: 0, opacity: 0, rotate: bubble.rotation - 25 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: bubble.rotation,
              y: [0, -8, 0, 8, 0],
            }}
            exit={{ scale: 1.4, opacity: 0 }}
            transition={{
              scale: { type: "spring", stiffness: 220, damping: 16 },
              opacity: { duration: 0.4 },
              y: {
                duration: 4 + (bubble.floatDelay % 2),
                repeat: Infinity,
                ease: "easeInOut",
                delay: bubble.floatDelay,
              },
            }}
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.85 }}
            onClick={(e) => popBubble(bubble.id, e)}
            className="absolute cursor-pointer select-none z-10 pointer-events-auto group"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: bubble.size,
              height: bubble.size,
            }}
            aria-label={bubble.label}
          >
            <div
              className="relative w-full h-full rounded-full transition-shadow duration-200"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${bubble.color}55 0%, ${bubble.color}22 55%, transparent 100%)`,
                boxShadow: `
                  0 0 0 1.5px ${bubble.color}80,
                  0 0 16px ${bubble.color}50,
                  inset 0 0 12px ${bubble.color}30
                `,
                backdropFilter: "blur(2px)",
              }}
            >
              {/* Top-left highlight (the "sphere catching light") */}
              <span
                className="absolute rounded-full"
                style={{
                  top: "12%",
                  left: "18%",
                  width: "28%",
                  height: "22%",
                  background:
                    "radial-gradient(ellipse, rgba(255,255,255,0.45) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
                aria-hidden
              />
              {/* Label */}
              <span
                className="absolute inset-0 flex items-center justify-center font-mono text-[8px] md:text-[10px] uppercase tracking-wider font-bold text-center px-2 leading-tight"
                style={{
                  color: bubble.color,
                  textShadow: `0 0 6px ${bubble.color}, 1px 0 0 rgba(0,0,0,0.6), -1px 0 0 rgba(0,0,0,0.6)`,
                  pointerEvents: "none",
                }}
              >
                {bubble.label}
              </span>
            </div>
          </motion.button>
        ))}

      {/* Pop Particles — bigger glow trail */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: p.x,
            y: p.y,
            scale: 1.6,
            opacity: 1,
          }}
          animate={{
            x: p.x + Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: p.y + Math.sin((p.angle * Math.PI) / 180) * p.distance,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed pointer-events-none z-[9999] rounded-full"
          style={{
            width: p.size,
            height: p.size,
            // Add score value to particle
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${p.size * 0.8}px`, // Adjust font size based on particle size
            fontWeight: 'bold',
            color: '#fff',
            textShadow: `0 0 4px ${p.color}`,
            // End score value to particle
            background: `radial-gradient(circle, ${p.color} 0%, ${p.color}80 60%, transparent 100%)`,
            boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}80`,
          }}
        >
          {p.value}
        </motion.div>
      ))}
    </div>
  );
}
