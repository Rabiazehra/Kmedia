import { Metadata } from "next";
import CareersForm from "@/components/CareersForm";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Krelimedia team — work on exciting digital marketing projects, grow your skills, and make an impact.",
};

type Role = {
  title: string;
  type: string;
  location: string;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  isFeatured?: boolean;
};

const openRoles: Role[] = [
  {
    title: "Senior Business Developer",
    type: "Full-time",
    location: "On-site · Islamabad",
    isFeatured: true,
    description:
      "We&apos;re hiring a senior closer to lead new-business acquisition at KRELIMEDIA. You&apos;ll own the full sales cycle — prospecting, pitching, negotiating, and closing — for retainers and project work across our digital marketing, paid ads, video, and brand services. You&apos;ll work directly with the founders and have real influence on our growth roadmap.",
    responsibilities: [
      "Build and manage a qualified pipeline of mid-market and enterprise prospects across Pakistan, the Middle East, and global English-speaking markets.",
      "Lead discovery calls, write tailored proposals, and run pricing & contract negotiations end-to-end.",
      "Partner with the strategy and creative leads to scope work and assemble the right team for each pitch.",
      "Hit and exceed quarterly revenue targets while keeping client-fit quality high.",
      "Represent KRELIMEDIA at industry events, podcasts, and conferences as a senior face of the brand.",
    ],
    requirements: [
      "5+ years of B2B sales experience in a digital agency, SaaS, or marketing services environment, with a proven track record of closing $50k+ deals.",
      "Deep understanding of digital marketing services (paid ads, social, video, web) so you can speak credibly with founders and marketing leaders.",
      "Strong written communication — proposals, cold outreach, and follow-ups should feel polished, not templated.",
      "Comfortable with CRM tools, pipeline reporting, and forecasting.",
      "Self-directed, competitive, and genuinely excited about helping brands grow.",
    ],
  },
  {
    title: "Social Media Manager",
    type: "Full-time",
    location: "Remote / Islamabad",
    description:
      "Own our clients&apos; Instagram, Facebook, TikTok, and LinkedIn presence. You&apos;ll craft strategies, create content calendars, and engage communities.",
  },
  {
    title: "Paid Ads Specialist",
    type: "Full-time",
    location: "Remote / Islamabad",
    description:
      "Manage and optimize Meta Ads & Google Ads campaigns. You&apos;ll analyze data, A/B test creatives, and drive ROAS for our clients.",
  },
  {
    title: "Video Editor / Motion Designer",
    type: "Contract",
    location: "Remote",
    description:
      "Create scroll-stopping reels, brand videos, and motion graphics. Proficiency in Premiere Pro, After Effects, or DaVinci Resolve is a must.",
  },
  {
    title: "Graphic Designer",
    type: "Full-time",
    location: "Remote / Islamabad",
    description:
      "Design ad creatives, brand identities, and social posts. You have a keen eye for typography, color theory, and performance-driven design.",
  },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen overflow-x-hidden pt-32 bg-brand-green">
      <section className="px-6 md:px-10 pb-40">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-28">
            <span className="text-[#b4ff4c] text-xs font-bold uppercase tracking-[0.3em]">
              Join the Team
            </span>
            <h1 className="font-bebas text-white text-6xl md:text-8xl lg:text-[9vw] leading-[0.85] uppercase tracking-tighter mt-3">
              Careers
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mt-6 leading-relaxed font-medium">
              We&apos;re always looking for talented people who are passionate about digital marketing, creativity, and delivering real results.
            </p>
          </div>

          {/* Open Roles */}
          <div className="space-y-8">
            {openRoles.map((role, index) => {
              const featured = role.isFeatured === true;
              return (
                <div
                  key={index}
                  className={`group rounded-[24px] p-8 transition-all duration-300 ${
                    featured
                      ? "bg-gradient-to-br from-[#b4ff4c]/10 via-white/5 to-white/5 border border-[#b4ff4c]/40 hover:border-[#b4ff4c]/70 hover:from-[#b4ff4c]/15"
                      : "bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-[#b4ff4c]/30"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {featured && (
                          <span className="inline-block bg-[#b4ff4c] text-brand-green text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                            Hiring Now
                          </span>
                        )}
                        <h3 className="font-bebas text-white text-3xl md:text-4xl uppercase tracking-tight">
                          {role.title}
                        </h3>
                      </div>
                      <div className="flex gap-3 mt-3">
                        <span className="inline-block text-[#b4ff4c] text-xs font-bold uppercase tracking-wider bg-[#b4ff4c]/10 px-3 py-1 rounded-full">
                          {role.type}
                        </span>
                        <span className="inline-block text-white/40 text-xs font-bold uppercase tracking-wider bg-white/5 px-3 py-1 rounded-full">
                          {role.location}
                        </span>
                      </div>
                    </div>
                    <a
                      href="#apply"
                      className="group/btn inline-flex items-center gap-2 bg-[#b4ff4c] text-brand-green px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shrink-0"
                    >
                      Apply Now
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                  <p className="text-white/60 text-base leading-relaxed mt-5 max-w-3xl">
                    {role.description}
                  </p>

                  {featured && role.responsibilities && role.requirements && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      <div>
                        <h4 className="text-[#b4ff4c] text-xs font-bold uppercase tracking-[0.25em] mb-3">
                          What You&apos;ll Do
                        </h4>
                        <ul className="space-y-2.5 text-white/70 text-sm leading-relaxed">
                          {role.responsibilities.map((r, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="text-[#b4ff4c] mt-1.5 shrink-0">▸</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[#b4ff4c] text-xs font-bold uppercase tracking-[0.25em] mb-3">
                          What We&apos;re Looking For
                        </h4>
                        <ul className="space-y-2.5 text-white/70 text-sm leading-relaxed">
                          {role.requirements.map((r, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="text-[#b4ff4c] mt-1.5 shrink-0">▸</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Apply form */}
          <div id="apply" className="mt-32 scroll-mt-32">
            <div className="text-center mb-16">
              <span className="text-[#b4ff4c] text-xs font-bold uppercase tracking-[0.3em]">
                Apply
              </span>
              <h2 className="font-bebas text-white text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] mt-3">
                Send Us Your Resume
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto mt-6 leading-relaxed font-medium">
                Tell us about yourself, what role(s) you&apos;re interested in, and
                paste a link to your portfolio or LinkedIn. We&apos;ll get back to
                you within five business days.
              </p>
            </div>
            <CareersForm />
          </div>

          {/* Spontaneous Apply CTA */}
          <div className="mt-20 text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-12">
            <h2 className="font-bebas text-white text-4xl md:text-5xl uppercase tracking-tight">
              Don&apos;t See Your Role?
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mt-4 leading-relaxed">
              We&apos;re always open to meeting talented people. The form above works
              for any role — just mention it in the message.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
