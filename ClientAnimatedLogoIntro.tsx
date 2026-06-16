"use client";

import dynamic from "next/dynamic";

const AnimatedLogoIntro = dynamic(() => import("@/components/AnimatedLogoIntro"), {
  ssr: false,
});

export default function ClientAnimatedLogoIntro() {
  return <AnimatedLogoIntro />;
}