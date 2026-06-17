import type { Metadata } from "next";
import BlogSection, { BlogPost } from "@/components/BlogSection";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the strategists, creatives, and operators behind KRELIMEDIA — the team that ships your work, not the team that pitches it.",
};

const posts: BlogPost[] = [
  {
    id: "atta",
    category: "Founder · Strategy",
    title: "ATTA — THE GUY WHO SIGNS THE WORK",
    excerpt:
      "Founder and head of strategy. Atta spent 6 years inside two of Pakistan's fastest-growing consumer brands before starting KRELIMEDIA. He runs every kickoff, signs off on every campaign, and is the person you'll be in Slack with at 11pm. He believes the best strategy is the one the team actually executes.",
    author: "Founder",
    date: "Since 2022",
    readTime: "Lead",
    variant: "feature",
    accent: "#b4ff4c",
  },
  {
    id: "rabia",
    category: "Head of Brand",
    title: "RABIA — WHERE BRAND MEANS SOMETHING",
    excerpt:
      "Rabia leads brand and creative. She came up through fashion and lifestyle — she knows what makes a feed feel like a world, not a billboard. She runs the design team, signs off on every campaign visual, and is the reason our work looks the way it does. She also shoots most of our hero photography herself.",
    author: "Brand Lead",
    date: "Since 2023",
    readTime: "Brand",
    accent: "#ff6b6b",
  },
  {
    id: "moiz",
    category: "Performance Lead",
    title: "MOIZ — THE PERFORMANCE MIND",
    excerpt:
      "Moiz runs paid acquisition. He's managed over $2M in ad spend across Meta, Google, TikTok, and YouTube. He's the person who will tell you the campaign isn't ready, the creative needs one more iteration, and the budget should pause this week. He thinks in ROAS, writes SQL for fun, and is allergic to vanity metrics.",
    author: "Performance Lead",
    date: "Since 2023",
    readTime: "Ads",
    accent: "#74b9ff",
  },
  {
    id: "muntazir",
    category: "Content & SEO",
    title: "ALI — THE WORDS, THE RANKINGS, THE STRATEGY",
    excerpt:
      "Muntazir leads content and SEO. He's been writing for the web since before content marketing was a job title. He runs the editorial calendar, owns the keyword strategy, and writes the long-form pieces that earn real links. He reads every brief, edits every draft, and never misses a deadline. Most importantly: he ships.",
    author: "Content Lead",
    date: "Since 2024",
    readTime: "Content",
    accent: "#f2c14e",
  },
  {
    id: "video",
    category: "Video Production",
    title: "THE VIDEO TEAM — 5-DAY TURNAROUND, NO EXCEPTIONS",
    excerpt:
      "Three editors, one cinematographer, one motion designer. They live in Premiere, After Effects, and DaVinci. Reels, YouTube, UGC, ad creative — same team, same weekly cadence. They shoot on Tuesdays, edit Wednesdays-Thursdays, and ship Fridays. We've never missed a video deadline in 18 months.",
    date: "Since 2023",
    readTime: "Video",
    accent: "#a29bfe",
  },
  {
    id: "ops",
    category: "Operations",
    title: "OPS — THE PEOPLE WHO MAKE SURE IT SHIPS",
    excerpt:
      "Project managers, account leads, and a finance team. They're the reason your dashboard is updated on Mondays, your invoices arrive on time, and your weekly recap lands in your inbox by 9am. They don't get the bylines, but they make the work possible. Every agency says 'we're client-first.' Ours is. Because of these four people.",
    date: "Always",
    readTime: "Ops",
    accent: "#55efc4",
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen overflow-x-hidden pt-32">
      <BlogSection
        eyebrow="The People"
        title="MEET THE TEAM THAT ACTUALLY DOES THE WORK"
        description="No bait-and-switch. No account managers between you and the work. These are the strategists, creatives, and operators who will be in your Slack, in your dashboard, and in your standups. Every. Single. Week."
        posts={posts}
      />
    </main>
  );
}
