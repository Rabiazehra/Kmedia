"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "./useSound";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

/**
 * ContactForm
 * -----------
 * Sends form submissions to info@krelimedia.com using a mailto: link
 * as the primary method. Also posts to /api/contact for SMTP delivery
 * when configured.
 */
export default function ContactForm() {
  const playHover = useSound("/sounds/hover.mp3", { volume: 0.3, cooldownMs: 80 });
  const playClick = useSound("/sounds/click.mp3", { volume: 0.5 });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "ok" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setFeedback("");

    try {
      // Try SMTP API first
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          name,
          email,
          message,
        }),
      });
      const data = await res.json();

      if (data.ok && data.delivered) {
        // SMTP worked
        setStatus("ok");
        setFeedback(data.message);
        setName("");
        setEmail("");
        setMessage("");
        return;
      }

      // SMTP not configured — fall back to mailto:
      const subject = encodeURIComponent(`New message from ${name} via KRELIMEDIA website`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );
      window.open(
        `mailto:info@krelimedia.com?subject=${subject}&body=${body}`,
        "_blank"
      );

      setStatus("ok");
      setFeedback("Opening your email app to send the message to info@krelimedia.com...");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      // API failed — fall back to mailto:
      const subject = encodeURIComponent(`New message from ${name} via KRELIMEDIA website`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );
      window.open(
        `mailto:info@krelimedia.com?subject=${subject}&body=${body}`,
        "_blank"
      );

      setStatus("ok");
      setFeedback("Opening your email app to send the message to info@krelimedia.com...");
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 max-w-2xl mx-auto text-left"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="cf-name"
            className="block text-[#b4ff4c] text-[10px] font-bold uppercase tracking-[0.25em] mb-2"
          >
            Your name *
          </label>
          <input
            id="cf-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onMouseEnter={() => playHover()}
            placeholder="Ayesha Khan"
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#b4ff4c]/50 focus:bg-black/40 transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="cf-email"
            className="block text-[#b4ff4c] text-[10px] font-bold uppercase tracking-[0.25em] mb-2"
          >
            Email *
          </label>
          <input
            id="cf-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onMouseEnter={() => playHover()}
            placeholder="you@brand.com"
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#b4ff4c]/50 focus:bg-black/40 transition-colors"
          />
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="cf-message"
          className="block text-[#b4ff4c] text-[10px] font-bold uppercase tracking-[0.25em] mb-2"
        >
          Message *
        </label>
        <textarea
          id="cf-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onMouseEnter={() => playHover()}
          placeholder="Tell us about your brand, your goals, and what you&apos;re looking for help with."
          className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#b4ff4c]/50 focus:bg-black/40 transition-colors resize-y"
        />
      </div>

      <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-white/40 text-xs">
          We&apos;ll never share your details. By submitting, you agree we may
          contact you about your project.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          onMouseEnter={() => playHover()}
          onClick={() => playClick()}
          className="group inline-flex items-center gap-3 bg-[#b4ff4c] text-brand-green px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {status === "ok" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 flex items-start gap-3 bg-[#b4ff4c]/10 border border-[#b4ff4c]/40 rounded-2xl px-4 py-3 text-sm text-[#b4ff4c]"
          >
            <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
            <span>{feedback}</span>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 flex items-start gap-3 bg-red-500/10 border border-red-500/40 rounded-2xl px-4 py-3 text-sm text-red-300"
          >
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <span>{feedback}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
