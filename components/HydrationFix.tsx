"use client";

import { useEffect } from "react";

/**
 * Removes `bis_skin_checked` attributes injected by browser extensions
 * (e.g., "Browser in Sidebar") before React hydrates, preventing
 * hydration mismatch errors.
 */
export default function HydrationFix() {
  useEffect(() => {
    const removeBisAttr = () => {
      try {
        document.querySelectorAll("[bis_skin_checked]").forEach((el) => {
          el.removeAttribute("bis_skin_checked");
        });
      } catch {}
    };

    // Run immediately
    removeBisAttr();

    // Watch for any new ones added by extensions after initial load
    const observer = new MutationObserver(removeBisAttr);
    observer.observe(document.documentElement, {
      attributes: true,
      subtree: true,
      attributeFilter: ["bis_skin_checked"],
    });

    return () => observer.disconnect();
  }, []);
  return null;
}
