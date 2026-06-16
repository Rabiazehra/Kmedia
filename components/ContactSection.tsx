"use client";

import { motion } from "framer-motion";
import { useSound } from "./useSound";
import { ArrowRight } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  const playHover = useSound("/sounds/hover.mp3", { volume: 0.3, cooldownMs: 80 });

  return (
    <section id="contact" className="bg-brand-green py-28 px-6 md:px-10 relative overflow-hidden">

      {/* Giant background text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      >
        <span className="font-bebas text-[22vw] text-white/[0.03] uppercase tracking-tighter whitespace-nowrap leading-none">
          LET&apos;S TALK
        </span>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">

        {/* Tag */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block text-[#b4ff4c] text-xs font-bold uppercase tracking-[0.35em] mb-6"
        >
          Get In Touch!
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-bebas text-white text-6xl md:text-8xl lg:text-[9vw] leading-[0.85] uppercase tracking-tighter mb-8"
        >
          Ready to Grow <br />
          <span className="text-[#b4ff4c]">Your Brand?</span>
        </motion.h2>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed font-medium"
        >
          Drop us a message on WhatsApp, send a quick brief below, or email us directly. We respond fast, no fluff.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <a
            href="https://wa.me/92332444816?text=Hi!%20I%20want%20to%20know%20more%20about%20Krelimedia%27s%20services."
            target="_blank"
            onMouseEnter={() => playHover()}
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-[#b4ff4c] text-brand-green px-10 py-5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_40px_rgba(180,255,76,0.35)] hover:shadow-[0_0_60px_rgba(180,255,76,0.5)]"
          >
            Message Us on WhatsApp
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="mailto:info@krelimedia.com"
            onMouseEnter={() => playHover()}
            className="inline-flex items-center gap-3 border border-white/20 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/40 transition-all"
          >
            Send an Email
          </a>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="inline-block text-[#b4ff4c] text-xs font-bold uppercase tracking-[0.35em] mb-5">
            Or Send a Quick Brief
          </span>
          <ContactForm />
        </motion.div>

        {/* Contact Details Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 pt-10 border-t border-white/10 flex flex-col md:flex-row gap-8 justify-center items-center text-white/40 text-sm font-medium tracking-wide"
        >
          <span className="flex items-center gap-2">
            <span className="text-[#b4ff4c]">📞</span>
            <a href="tel:+920512751107" className="hover:text-white transition-colors">
              051-2751107
            </a>
          </span>
          <span className="hidden md:block h-4 w-px bg-white/20" />
          <span className="flex items-center gap-2">
            <span className="text-[#b4ff4c]">✉️</span>
            <a href="mailto:info@krelimedia.com" className="hover:text-white transition-colors">
              info@krelimedia.com
            </a>
          </span>
          <span className="hidden md:block h-4 w-px bg-white/20" />
          <span className="flex items-center gap-2">
            <span className="text-[#b4ff4c]">📍</span>
            Office No.2, Naseem Arcade IDC, I-9, Islamabad
          </span>
        </motion.div>
      </div>
    </section>
  );
}
