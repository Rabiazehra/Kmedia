"use client";

import { useCallback, useEffect, useRef } from "react";

interface SoundOptions {
  volume?: number;
  loop?: boolean;
  /**
   * Minimum time (in milliseconds) that must pass between two
   * successful plays of this sound. Calls that arrive inside the
   * cooldown window are dropped silently.
   *
   * This is essential for hover sounds: sweeping the mouse across a
   * row of nav links would otherwise fire `playHover()` on every
   * `onMouseEnter` (potentially 20+ times a second) and turn a
   * pleasant UI tick into an obnoxious buzz. A short cooldown
   * (e.g. 60 ms) keeps the sound snappy while preventing
   * retrigger storms.
   *
   * Default: 20 ms (enough to debounce accidental double-fires for
   *           click sounds, but short enough to feel instant).
   */
  cooldownMs?: number;
}

/**
 * useSound
 * --------
 * A resilient hook for playing audio assets.
 * 1. Gracefully handles browser Autoplay policies (NotAllowedError).
 * 2. Provides meaningful errors for missing assets (NotSupportedError).
 * 3. Prevents memory leaks by reusing the Audio object.
 * 4. Enforces a per-hook cooldown to debounce rapid retriggers
 *    (critical for hover sounds fired on onMouseEnter).
 */
export function useSound(src: string, options: SoundOptions = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastPlayRef = useRef<number>(0);
  const cooldownMs = options.cooldownMs ?? 20;

  useEffect(() => {
    if (typeof window !== "undefined" && src) {
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.loop = options.loop ?? false;
 
      const handleError = () => {
        console.warn(`[useSound] Failed to load source: ${src}. Ensure it exists in /public/sounds/`);
      };

      audio.addEventListener('error', handleError);
      audioRef.current = audio;

      return () => {
        audio.removeEventListener('error', handleError);
        audio.pause();
        audioRef.current = null;
      };
    }
  }, [src, options.loop]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    // Cooldown gate. We compare in "now - lastPlay" terms so a paused
    // tab that resumes doesn't immediately fire a burst of pending
    // hovers — only the FIRST call after resumption can play, then
    // the gate closes again.
    const now =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    if (now - lastPlayRef.current < cooldownMs) {
      return;
    }
    lastPlayRef.current = now;

    audio.volume = options.volume ?? 1;

    if (!options.loop) {
      audio.currentTime = 0;
    }

    // Catch promise to prevent NotAllowedError/NotSupportedError console crashes
    audio.play().catch((err) => {
      if (err.name === "NotAllowedError") {
        console.debug(`[Audio] Playback of ${src} blocked: Interaction required.`);
      }
    });
  }, [src, options.volume, options.loop, cooldownMs]);

  return play;
}
