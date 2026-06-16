import type { Metadata } from "next";
import Link from "next/link";
import {
  Camera,
  TrendingUp,
  Video,
  Palette,
  BarChart2,
  Globe,
  ArrowRight,
  Sparkles,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Start Your Journey",
  description:
    "Welcome to KRELIMEDIA. Learn what we do, browse our services, and get in touch — we&apos;ll respond within one business day.",
};

const services = [
  {
    icon: Camera,
    title: "Social Media Management",
    body: "Full-spectrum management of your Instagram, Facebook, TikTok & LinkedIn — strategy, content, scheduling, and community.",
  },
  {
    icon: TrendingUp,
    title: "Paid Advertising",
    body: "ROI-driven Meta Ads and Google Ads campaigns engineered to convert cold audiences into paying customers.",
  },
  {
    icon: Video,
    title: "Video Production",
    body: "Cinematic brand videos, reels, and short-form content that stop the scroll and make people remember your brand.",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    body: "Premium visual identity systems, ad creatives, and post designs that are unmistakably on-brand.",
  },
  {
    icon: BarChart2,
    title: "Growth Strategy",
    body: "Data-led growth planning. We audit your current presence and build a roadmap that consistently moves the needle.",
  },
  {
    icon: Globe,
    title: "Web & Landing Pages",
    body: "High-converting websites and landing pages built for speed, SEO, and a frictionless user experience.",
  },
];

export default function StartPage() {
  return (
    <main className="min-h-screen overflow-x-hidden pt-28 pb-28 bg-brand-green text-white">
      {/* ============= WELCOME ============= */}
      <section className="px-6 md:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-[#b4ff4c] text-xs font-bold uppercase tracking-[0.35em] mb-6">
            <Sparkles className="w-3 h-3" />
            Welcome to KRELIMEDIA
          </span>
          <h1 className="font-bebas text-white text-6xl md:text-8xl lg:text-[9vw] leading-[0.85] uppercase tracking-tighter">
            Glad You&apos;re <span className="text-[#b4ff4c]">Here.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mt-8 leading-relaxed font-medium">
            You just took the first step toward marketing that actually moves
            a number. Below is the short version of who we are, what we do, and
            how to reach us. We respond to every message within one business
            day — promise.
          </p>
        </div>
      </section>

      {/* ============= WHAT WE DO ============= */}
      <section className="px-6 md:px-10 mt-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[#b4ff4c] text-xs font-bold uppercase tracking-[0.3em]">
                What We Do
              </span>
              <h2 className="font-bebas text-white text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] mt-3">
                We Build Brands <br />
                That <span className="text-[#b4ff4c]">Actually Grow.</span>
              </h2>
            </div>
            <div className="space-y-5 text-white/70 text-base md:text-lg leading-relaxed font-medium">
              <p>
                KRELIMEDIA is a Pakistan-born, globally-minded digital marketing
                studio. We work with founders, marketing leads, and
                growth-stage teams who care about real numbers — not just
                deliverables.
              </p>
              <p>
                We bring <span className="text-white font-semibold">strategy</span>{" "}
                and <span className="text-white font-semibold">creative</span> to
                every brief. We make them argue productively until the work is
                sharper than the brief itself. Then we ship it, measure it, and
                iterate.
              </p>
              <p>
                $12M+ in ad spend managed. 200+ brands served. 12 years of
                combined senior experience. One promise — every campaign we run
                has to move a real number.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============= SERVICES ============= */}
      <section className="px-6 md:px-10 mt-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#b4ff4c] text-xs font-bold uppercase tracking-[0.3em]">
              Our Services
            </span>
            <h2 className="font-bebas text-white text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] mt-3">
              What We Can Do For You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 hover:border-[#b4ff4c]/40 hover:bg-white/10 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#b4ff4c]/10 border border-[#b4ff4c]/30 flex items-center justify-center text-[#b4ff4c] group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bebas text-white text-2xl md:text-3xl uppercase tracking-tight mt-5">
                    {s.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mt-3 font-medium">
                    {s.body}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#b4ff4c] text-sm font-bold uppercase tracking-wider hover:gap-3 transition-all"
            >
              See all services in detail <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============= GET IN TOUCH ============= */}
      <section className="px-6 md:px-10 mt-28">
        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-14 text-center">
          <span className="text-[#b4ff4c] text-xs font-bold uppercase tracking-[0.35em]">
            Get In Touch
          </span>
          <h2 className="font-bebas text-white text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] mt-3">
            Let&apos;s Start a <span className="text-[#b4ff4c]">Conversation</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mt-6 leading-relaxed font-medium">
            Tell us about your brand and your goals. We&apos;ll get back to you
            within one business day with next steps — no fluff, no spam, no
            hard sell.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <a
              href="https://wa.me/92332444816?text=Hi!%20I%20just%20visited%20the%20Start%20page%20and%20want%20to%20learn%20more%20about%20Krelimedia."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#b4ff4c] text-brand-green px-10 py-5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_40px_rgba(180,255,76,0.35)]"
            >
              Message Us on WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-white/20 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/40 transition-all"
            >
              Send a Detailed Brief
            </Link>
          </div>

          <div className="mt-12 pt-10 border-t border-white/10 flex flex-col md:flex-row gap-6 justify-center items-center text-white/50 text-sm font-medium tracking-wide">
            <a
              href="mailto:info@krelimedia.com"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-[#b4ff4c]" />
              info@krelimedia.com
            </a>
            <span className="hidden md:block h-4 w-px bg-white/20" />
            <a
              href="tel:+920512751107"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-[#b4ff4c]" />
              051-2751107
            </a>
            <span className="hidden md:block h-4 w-px bg-white/20" />
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#b4ff4c]" />
              Office No.2, Naseem Arcade IDC, I-9, Islamabad
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
