import FeatureCardsWrapper from "@/components/FeatureCardsWrapper";

export const metadata = {
  title: "Portfolio",
  description:
    "Explore our creative work — Instagram-worthy campaigns, brand visuals, and digital content that drives results.",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-x-hidden pt-24 bg-brand-green">
      <section className="w-full py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#b4ff4c] text-xs font-bold uppercase tracking-[0.3em]">
              SOME OF OUR
            </span>
            <h1 className="font-bebas text-white text-6xl md:text-8xl lg:text-[9vw] leading-[0.85] uppercase tracking-tighter mt-2">
              Creative Work
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mt-6 leading-relaxed font-medium">
              A curated showcase of campaigns, visuals, and digital experiences we&apos;ve crafted for brands that mean business.
            </p>
          </div>
          <FeatureCardsWrapper />
        </div>
      </section>
    </main>
  );
}