"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "./useSound";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface Props {
  defaultRole?: string;
}

/**
 * CareersForm
 * -----------
 * Application form for open roles. Posts to /api/contact with
 * `kind: "careers"`. Uses the shared /api/contact endpoint so that
 * submissions are forwarded to info@krelimedia.com.
 */
export default function CareersForm({ defaultRole = "" }: Props) {
  const playHover = useSound("/sounds/hover.mp3", { volume: 0.3, cooldownMs: 80 });
  const playClick = useSound("/sounds/click.mp3", { volume: 0.5 });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(defaultRole);
  const [portfolio, setPortfolio] = useState("");
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "careers",
          name,
          email,
          role,
          portfolio,
          message,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Unknown error");
      setStatus("ok");
      setFeedback(data.message);
      setName("");
      setEmail("");
      setRole(defaultRole);
      setPortfolio("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setFeedback(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email info@krelimedia.com directly.",
      );
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 max-w-3xl mx-auto text-left"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field
          label="Your name"
          name="name"
          value={name}
          onChange={setName}
          onHover={playHover}
          placeholder="Ayesha Khan"
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={setEmail}
          onHover={playHover}
          placeholder="you@brand.com"
          required
        />
        <Field
          label="Role you're applying for"
          name="role"
          value={role}
          onChange={setRole}
          onHover={playHover}
          placeholder="Senior Business Developer"
          required
        />
        <Field
          label="Portfolio / LinkedIn (optional)"
          name="portfolio"
          value={portfolio}
          onChange={setPortfolio}
          onHover={playHover}
          placeholder="https://linkedin.com/in/you"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="careers-message"
          className="block text-[#b4ff4c] text-[10px] font-bold uppercase tracking-[0.25em] mb-2"
        >
          Why you, why us? *
        </label>
        <textarea
          id="careers-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onMouseEnter={() => playHover()}
          placeholder="A short pitch — what you've done, what excites you about this role, and a link to work you're proud of."
          className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#b4ff4c]/50 focus:bg-black/40 transition-colors resize-y"
        />
      </div>

      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-white/40 text-xs">
          By submitting, you agree we may contact you about this role. We never
          share your details with third parties.
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
              Send Application
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

function Field({
  label,
  name,
  value,
  onChange,
  onHover,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  onHover: () => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[#b4ff4c] text-[10px] font-bold uppercase tracking-[0.25em] mb-2"
      >
        {label} {required && <span className="text-[#b4ff4c]/60">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onMouseEnter={() => onHover()}
        placeholder={placeholder}
        className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#b4ff4c]/50 focus:bg-black/40 transition-colors"
      />
    </div>
  );
}
