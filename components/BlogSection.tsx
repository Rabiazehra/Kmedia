"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useSound } from "./useSound";

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author?: string;
  date?: string;
  readTime?: string;
  image?: string;
  href?: string;
  variant?: "default" | "feature" | "minimal";
  tags?: string[];
  featured?: boolean;
  /** Optional accent color for the card (CSS color) */
  accent?: string;
}

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  /** Alias for subtitle */
  eyebrow?: string;
  description?: string;
  posts: BlogPost[];
  children?: ReactNode;
}

// Reserved for future pagination; exported so it isn't flagged as unused.
const POSTS_PER_PAGE = 6;
export { POSTS_PER_PAGE };

function BlogSectionContent({
  posts,
  subtitle,
  title,
  children,
}: BlogSectionProps) {
  return (
    <>
      {title || subtitle ? (
        <div className="text-center mb-16 relative z-10">
          {subtitle && (
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#b4ff4c] inline-block mb-4">
              {subtitle}
            </span>
          )}
          {title && (
            <h2 className="font-bebas text-white text-5xl md:text-7xl lg:text-[7vw] leading-[0.85] uppercase tracking-tighter">
              {title}
            </h2>
          )}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {posts.map((post, i) => (
          <BlogCard key={post.id} post={post} index={i} />
        ))}
      </div>

      {children ? <div className="mt-16">{children}</div> : null}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  BlogSection – default export                                       */
/* ------------------------------------------------------------------ */
export default function BlogSection(props: BlogSectionProps) {
  return (
    <section className="relative w-full bg-brand-green py-36 md:py-44 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 crt-noise pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto relative z-10">
        <BlogSectionContent {...props} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BlogCard                                                           */
/* ------------------------------------------------------------------ */
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const playHover = useSound("/sounds/hover.mp3", { volume: 0.3, cooldownMs: 80 });

  const isFeature = post.variant === "feature";
  const isMinimal = post.variant === "minimal";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
    >
      {post.href ? (
        <a
          href={post.href}
          target="_blank"
          onMouseEnter={() => playHover()}
          rel="noopener noreferrer"
          className={`group relative block bg-black/40 border border-white/10 p-8 transition-all duration-300 overflow-hidden ${
            isFeature ? "lg:col-span-2 lg:row-span-2" : ""
          } ${isMinimal ? "p-6" : "p-8"}`}
          style={{
            borderRadius: "4px",
            boxShadow: "4px 4px 0 rgba(0,0,0,0.5)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#b4ff4c] font-mono text-lg">◆</span>
            <span className="text-[#b4ff4c] text-xs font-bold uppercase tracking-[0.25em]">
              {post.category}
            </span>
          </div>

          <h3
            className="font-bebas text-white text-2xl md:text-3xl uppercase tracking-tight mb-3 group-hover:translate-x-1 transition-transform duration-300"
            style={{ textShadow: "1px 1px 0 rgba(180,255,76,0.2)" }}
          >
            {post.title}
          </h3>

          <p className="text-white/50 text-sm leading-relaxed flex-1">
            {post.excerpt}
          </p>

          {post.readTime && (
            <span className="inline-flex items-center gap-2 mt-6 text-xs font-mono uppercase tracking-wider transition-all duration-300 group-hover:gap-3 group-hover:translate-x-1 text-[#b4ff4c]">
              <span className="font-mono text-base animate-pixel-blink">►</span>
              <span className="font-pixel text-[9px]">Read • {post.readTime}</span>
            </span>
          )}
        </a>
      ) : (
        <div className="group relative block bg-black/40 border border-white/10 p-8 transition-all duration-300 overflow-hidden"
          style={{
            borderRadius: "4px",
            boxShadow: "4px 4px 0 rgba(0,0,0,0.5)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#b4ff4c] font-mono text-lg">◆</span>
            <span className="text-[#b4ff4c] text-xs font-bold uppercase tracking-[0.25em]">
              {post.category}
            </span>
          </div>

          <h3
            className="font-bebas text-white text-2xl md:text-3xl uppercase tracking-tight mb-3"
            style={{ textShadow: "1px 1px 0 rgba(180,255,76,0.2)" }}
          >
            {post.title}
          </h3>

          <p className="text-white/50 text-sm leading-relaxed flex-1">
            {post.excerpt}
          </p>
        </div>
      )}
    </motion.article>
  );
}