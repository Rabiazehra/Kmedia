import HeroSection from "@/components/HeroSection";
import LogoTicker from "@/components/LogoTicker";
import PagePreviewsGrid from "@/components/PagePreviewsGrid";
import FeatureCardsWrapper from "@/components/FeatureCardsWrapper";
import WorkProcessSection from "@/components/WorkProcessSection";
import ReviewSection from "@/components/ReviewSection";

export const metadata = {
  title: "Home",
  description:
    "Krelimedia is a full-service digital marketing agency. We deliver ROI-driven Meta Ads, Google Ads, social media management, video production, and growth strategies that get results.",
};

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-brand-green selection:bg-[#b4ff4c] selection:text-brand-green">

      {/* 1 — HERO */}
      <HeroSection />

      {/* 2 — LOGO TICKER */}
      <LogoTicker />

      {/* 3 — PAGE PREVIEWS GRID */}
      <PagePreviewsGrid />

      {/* 4 — PORTFOLIO: Creative Work */}
      <section className="w-full bg-brand-green py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#b4ff4c] text-xs font-bold uppercase tracking-[0.3em]">
              SOME OF OUR
            </span>
            <h2 className="font-bebas text-white text-6xl md:text-8xl lg:text-[9vw] leading-[0.85] uppercase tracking-tighter mt-2">
              Creative Work
            </h2>
          </div>
          <FeatureCardsWrapper />
        </div>
      </section>

      {/* 5 — WORK PROCESS */}
      <WorkProcessSection />

      {/* 6 — REVIEWS */}
      <ReviewSection />

    </main>
  );
}
