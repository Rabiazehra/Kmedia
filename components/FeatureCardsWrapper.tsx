"use client";

import dynamic from "next/dynamic";

// This is where we safely apply SSR: FALSE to force client-only execution.
// A Client Component is allowed to do this.
const FeatureCardsDynamic = dynamic(() => import("./FeatureCards"), {
    ssr: false,
    loading: () => <div className="h-[750px] w-full flex items-center justify-center text-white/50 bg-brand-green">Initializing Security Matrix...</div>,
});

export default function FeatureCardsWrapper() {
    return <FeatureCardsDynamic />;
}