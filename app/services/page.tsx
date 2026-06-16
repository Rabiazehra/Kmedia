import type { Metadata } from "next";
import BlogSection, { BlogPost } from "@/components/BlogSection";

export const metadata: Metadata = {
  title: "We Offer",
  description:
    "360° digital marketing services engineered to drive growth, engagement, and real business results — from social media management to paid advertising.",
};

const posts: BlogPost[] = [
  {
    id: "meta-ads",
    category: "Paid Social",
    title: "META ADS THAT PRINT REVENUE, NOT JUST REACH",
    excerpt:
      "We build Meta campaigns that target purchase intent, not vanity audiences. Every dollar is wired to a conversion event you actually care about. We've scaled DTC brands from $20K/mo to $400K/mo on Meta alone — without burning the brand.",
    author: "Performance Team",
    date: "2026",
    readTime: "5 min read",
    variant: "feature",
    accent: "#b4ff4c",
  },
  {
    id: "google-ads",
    category: "Search",
    title: "GOOGLE ADS BUILT FOR DEMAND, NOT JUST CLICKS",
    excerpt:
      "Search, Shopping, Performance Max — we run all of it, but never all at once. We start with the highest-intent surface, prove out economics, then expand. Most accounts we inherit are over-spending and under-tracking. We fix both in the first 30 days.",
    readTime: "4 min read",
    accent: "#74b9ff",
  },
  {
    id: "social-media",
    category: "Content",
    title: "SOCIAL MEDIA THAT BUILDS A BRAND PEOPLE FOLLOW",
    excerpt:
      "We're not a posting service. We run content systems — pillars, hooks, formats, and a publishing rhythm — that turn a feed into a funnel. 6 platforms, 1 voice, zero fluff. We write, design, edit, schedule, and report. You show up to approve.",
    readTime: "4 min read",
    accent: "#ff6b6b",
  },
  {
    id: "seo",
    category: "SEO",
    title: "SEO FOR FOUNDERS WHO WANT COMPOUNDING TRAFFIC",
    excerpt:
      "Technical fixes first, then topical authority, then link earning. We don't sell '10 keywords in 30 days.' We build the architecture that ranks for thousands of keywords over the next 12 months. The work is slow, the payoff is permanent.",
    readTime: "5 min read",
    accent: "#f2c14e",
  },
  {
    id: "video",
    category: "Production",
    title: "VIDEO CONTENT WITHOUT THE AGENCY MARKUP",
    excerpt:
      "In-house editors, not freelancers. You brief, we shoot, we cut, you approve. Reels, YouTube long-form, UGC, ad creative — same team, same pricing, no creative agency tax. Most videos ship in 5-7 business days.",
    readTime: "3 min read",
    accent: "#a29bfe",
  },
  {
    id: "branding",
    category: "Brand",
    title: "BRAND SYSTEMS, NOT JUST LOGOS",
    excerpt:
      "We build the kit your team can actually run with: logo, color, type, voice, and a one-page brand bible. Then we hand it off with templates so your next designer doesn't reinvent it. The output isn't a PDF that lives in a folder — it's a system that lives in your day-to-day.",
    readTime: "4 min read",
    accent: "#55efc4",
  },
  {
    id: "analytics",
    category: "Data",
    title: "ANALYTICS THAT TELL YOU WHAT TO DO NEXT",
    excerpt:
      "GA4, Mixpanel, attribution models, server-side tracking, looker dashboards — we set it up and we read it. Every Monday you get a 1-page brief: what worked, what didn't, what we're changing. No 30-page reports no one reads.",
    readTime: "3 min read",
    accent: "#fd79a8",
  },
  {
    id: "email",
    category: "Lifecycle",
    title: "EMAIL & SMS THAT PRINT REPEAT PURCHASES",
    excerpt:
      "Klaviyo, Customer.io, Attentive — we plug in, clean your list, and start sending. Welcome flows, abandoned cart, win-back, post-purchase, VIP. Most brands leave 30-40% of revenue on the table from lifecycle. We recover it.",
    readTime: "4 min read",
    accent: "#fdcb6e",
  },
  {
    id: "strategy",
    category: "Strategy",
    title: "FRACTIONAL CMO WHEN YOU DON'T NEED A FULL-TIME ONE",
    excerpt:
      "Quarterly strategy, monthly reviews, weekly office hours. We sit in your leadership meetings, challenge your assumptions, and make sure the marketing team — internal or external — is pointed in the same direction. Most engagements pay for themselves in the first quarter.",
    readTime: "3 min read",
    accent: "#00cec9",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden pt-32">
      <BlogSection
        eyebrow="What We Do"
        title="EVERY CHANNEL. ONE STRATEGY. ZERO HAND-OFFS."
        description="We run paid social, paid search, SEO, content, video, email, and brand — under one roof, one P&L, one weekly standup. No silos. No 'that's not our department.' Just growth."
        posts={posts}
      />
    </main>
  );
}
