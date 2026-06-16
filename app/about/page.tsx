import type { Metadata } from "next";
import BlogSection, { BlogPost } from "@/components/BlogSection";
import ReviewSection from "@/components/ReviewSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind KRELIMEDIA — a full-service digital marketing agency built on strategy, creative, and a refusal to settle for average.",
};

const posts: BlogPost[] = [
  {
    id: "origin",
    category: "Our Story",
    title: "BUILT IN A BASEMENT, BACKED BY DATA",
    excerpt:
      "KRELIMEDIA started in 2022 with one promise: every campaign we run has to move a real number — revenue, leads, or sales. Three years later, that promise is still the only brief we accept. We grew from a two-person studio into a 12-person team because our clients stopped needing anyone else.",
    author: "The KRELIMEDIA Team",
    date: "2026",
    readTime: "4 min read",
    variant: "feature",
    accent: "#b4ff4c",
  },
  {
    id: "mission",
    category: "Mission",
    title: "WHERE STRATEGY MEETS CREATIVITY",
    excerpt:
      "Most agencies pick a side. We never did. Strategy without creative is a spreadsheet. Creative without strategy is a mood board. We bring both to every brief — and we make them argue productively until the work is sharper than the brief itself.",
    author: "Founder Note",
    date: "2026",
    readTime: "3 min read",
    accent: "#f2c14e",
  },
  {
    id: "values",
    category: "Values",
    title: "OWN THE OUTCOME, NOT THE OUTPUT",
    excerpt:
      "We don't measure success in deliverables. We measure it in the metric the client actually cares about. Every retainer starts with one question — what does winning look like for you? — and ends only when that number moves. No fluff. No vanity dashboards.",
    readTime: "3 min read",
    accent: "#ff6b6b",
  },
  {
    id: "process",
    category: "Process",
    title: "TRANSPARENCY BY DEFAULT",
    excerpt:
      "Our dashboards, our briefs, our numbers — all yours, all the time. We send weekly Loom recaps, monthly performance reviews, and quarterly strategy resets. You should never have to ask what we're working on. If we slipped, you'll know before the next standup.",
    readTime: "2 min read",
    accent: "#74b9ff",
  },
  {
    id: "team",
    category: "Culture",
    title: "SMALL TEAM, BIG SENIORITY",
    excerpt:
      "Every strategist on your account has 5+ years in the trenches. We don't pad teams with juniors. The person in your kickoff call is the person shipping the work. No bait-and-switch, no learning on your dime.",
    readTime: "2 min read",
    accent: "#a29bfe",
  },
  {
    id: "future",
    category: "What's Next",
    title: "AI IS A TOOL, NOT A STRATEGY",
    excerpt:
      "We use AI every day — for research, for draft copy, for creative iterations. But we don't sell AI as a differentiator. Your customers don't care how we worked, only that the work landed. We use the best tools, and we never hide behind them.",
    readTime: "3 min read",
    accent: "#55efc4",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden pt-32">
      <BlogSection
        eyebrow="The Studio"
        title="WE'RE A MARKETING AGENCY THAT THINKS LIKE FOUNDERS"
        description="KRELIMEDIA is a Pakistan-born, globally-minded digital marketing studio. We work with founders, marketing leads, and growth-stage teams who want real numbers — not just deliverables."
        posts={posts}
      />
      <ReviewSection />
    </main>
  );
}
