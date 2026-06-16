"use client";

import React from 'react';

const LogoTicker = () => {
  const brandNodes = [
    "Meta Ads", "Google Ads", "Instagram", "TikTok",
    "LinkedIn", "YouTube", "Snapchat", "Twitter/X"
  ];

  return (
    <div
      className="relative w-full py-8 overflow-hidden border-y border-[#b4ff4c]/15 select-none"
      style={{
        background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(4,38,36,0.9) 100%)",
      }}
    >
      {/* CRT scanlines overlay */}
      <div className="absolute inset-0 crt-scanlines pointer-events-none" aria-hidden />
      <div className="absolute inset-0 crt-noise pointer-events-none" aria-hidden />

      {/* Infinite Horizontal Scrolling Track */}
      <div className="relative flex whitespace-nowrap animate-infinite-scroll ticker-track gap-16 items-center z-10">
        {[...brandNodes, ...brandNodes, ...brandNodes].map((node, index) => (
          <div
            key={index}
            className="flex items-center gap-4 font-mono uppercase text-lg tracking-[0.15em]"
          >
            {/* Pixel diamond marker */}
            <div
              className="w-3 h-3 rotate-45 flex-shrink-0"
              style={{
                background: "#b4ff4c",
                boxShadow: "0 0 6px rgba(180,255,76,0.5)",
              }}
            />
            <span
              className="font-black text-[#b4ff4c]/90"
              style={{
                textShadow: "0 0 8px rgba(180,255,76,0.3), 1px 0 0 rgba(0,0,0,0.5), -1px 0 0 rgba(0,0,0,0.5)",
              }}
            >
              {node}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoTicker;
