"use client";

import { motion } from "framer-motion";

/**
 * Template
 * --------
 * Re-runs on every navigation in the App Router. Plays a brief CRT
 * "signal acquired" settle-in animation (very short) so the new page
 * appears to "boot up" right after the PageTransition exit flash.
 */
export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scaleY: 2,
                filter: "brightness(0) blur(0px)",
            }}
            animate={{
                opacity: [0, 1, 0.3, 1, 0.6, 1],
                scaleY: [2, 0.95, 1.02, 0.99, 1.005, 1],
                filter: [
                    "brightness(0) blur(0px)",
                    "brightness(1.5) blur(0px)",
                    "brightness(0.5) blur(0.5px)",
                    "brightness(1.2) blur(0px)",
                    "brightness(0.8) blur(0px)",
                    "brightness(1) blur(0px)",
                ],
            }}
            transition={{
                duration: 0.55,
                ease: "easeOut",
                times: [0, 0.15, 0.3, 0.5, 0.7, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
