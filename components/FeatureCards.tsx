"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "./useSound";
import Image from "next/image";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Real portfolio gallery. Each card displays one of the JPEG assets
 * saved in /public/portfolioA..F.jpeg, plus a short blurb and brand
 * category. Clicking a card opens a fullscreen lightbox with the
 * larger image and project notes.
 */
const portfolio = [
  {
    id: "a",
    name: "Brand Identity — Reon Studio",
    category: "Branding",
    img: "/portfolioA.jpeg",
    tag: "Brand Identity",
    blurb:
      "Full visual identity system, logo design, and brand rollout for a contemporary creative studio.",
  },
  {
    id: "b",
    name: "Social Campaign — Lifestyle Brand",
    category: "Social",
    img: "/portfolioB.jpeg",
    tag: "Social Campaign",
    blurb:
      "Social media content and influencer campaign for a lifestyle brand targeting Gen Z audiences.",
  },
  {
    id: "c",
    name: "Brand Identity — Arabic Label",
    category: "Branding",
    img: "/portfolioC.jpeg",
    tag: "Brand Identity",
    blurb:
      "Bilingual brand identity and digital presence for an Arabic-market consumer brand.",
  },
  {
    id: "d",
    name: "Brand Identity — Afzal Clothing",
    category: "Branding",
    img: "/portfolioD.jpeg",
    tag: "Brand Identity",
    blurb:
      "Premium clothing brand identity with monogram logo and visual system for fashion retail.",
  },
  {
    id: "e",
    name: "Product Photography — Natero Inn",
    category: "Photography",
    img: "/portfolioE.jpeg",
    tag: "Product Shoot",
    blurb:
      "Product photography and packaging design for a food brand launching in the FMCG market.",
  },
  {
    id: "f",
    name: "Brand Identity — Zarin Naturals",
    category: "Branding",
    img: "/portfolioF.jpeg",
    tag: "Brand Identity",
    blurb:
      "Natural cosmetics brand identity with earthy visual system for the wellness and skincare market.",
  },
];

export default function FeatureCards() {
  const playHover = useSound("/sounds/hover.mp3", { volume: 0.3, cooldownMs: 80 });
  const playClick = useSound("/sounds/click.mp3", { volume: 0.5 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = openIndex !== null ? portfolio[openIndex] : null;

  return (
    <>
      <div className="relative w-full py-12 overflow-hidden bg-brand-green">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0f4c42_0%,_transparent_70%)] pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {portfolio.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              onMouseEnter={() => playHover()}
              onClick={() => {
                playClick();
                setOpenIndex(i);
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group text-left bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-[#b4ff4c]/40 hover:bg-white/10 transition-all flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-3xl">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-brand-green/10 to-transparent" />
                <span className="absolute top-3 left-3 inline-block bg-[#b4ff4c] text-brand-green text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.25em]">
                  {item.category}
                </span>
                <h3 className="font-bebas text-white text-2xl md:text-3xl uppercase tracking-tight mt-1 leading-tight">
                  {item.name}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mt-2 flex-1 line-clamp-2">
                  {item.blurb}
                </p>
                <div className="flex items-center gap-1 text-[#b4ff4c] text-xs font-bold uppercase tracking-wider mt-4 group-hover:gap-2 transition-all mt-auto">
                  View Project <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[11000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setOpenIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={open.name}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-brand-green border border-white/10 rounded-3xl overflow-hidden"
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpenIndex(null)}
                onMouseEnter={() => playHover()}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#b4ff4c] hover:text-brand-green transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full aspect-[16/10] bg-black">
                <Image
                  src={open.img}
                  alt={open.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                />
              </div>

              <div className="p-6 md:p-8">
                <span className="text-[#b4ff4c] text-xs font-bold uppercase tracking-[0.3em]">
                  {open.category}
                </span>
                <h3 className="font-bebas text-white text-3xl md:text-5xl uppercase tracking-tight mt-2">
                  {open.name}
                </h3>
                <p className="text-white/70 text-base md:text-lg leading-relaxed mt-4 max-w-3xl">
                  {open.blurb}
                </p>

                <div className="flex items-center justify-between mt-8">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onMouseEnter={() => playHover()}
                      onClick={() => {
                        playClick();
                        setOpenIndex((openIndex - 1 + portfolio.length) % portfolio.length);
                      }}
                      className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10"
                      aria-label="Previous project"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onMouseEnter={() => playHover()}
                      onClick={() => {
                        playClick();
                        setOpenIndex((openIndex + 1) % portfolio.length);
                      }}
                      className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10"
                      aria-label="Next project"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                    {openIndex + 1} / {portfolio.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
