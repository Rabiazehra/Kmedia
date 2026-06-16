"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useSound } from "./useSound";
import { useRef } from "react";
import { ArrowRight, Target, BarChart3, Users, Zap } from "lucide-react";

const services = [
    {
        title: "Social Media Mastery",
        description: "Full-spectrum Instagram, Facebook, TikTok & LinkedIn management — from strategy and content calendars to community engagement that builds real followings.",
        color: "bg-[#f5f4ee]",
        textColor: "text-brand-green",
        icon: <Users className="w-9 h-9 text-[#a3e635]" strokeWidth={1.5} />,
    },
    {
        title: "Paid Advertising",
        description: "ROI-engineered Meta Ads and Google Ads campaigns that convert cold audiences into loyal customers at the lowest possible cost per acquisition.",
        color: "bg-brand-mustard",
        textColor: "text-brand-green",
        icon: <Target className="w-9 h-9 text-brand-green" strokeWidth={1.5} />,
    },
    {
        title: "Content Production",
        description: "Cinematic brand videos, scroll-stopping reels, and short-form content that captures attention and makes your brand unforgettable.",
        color: "bg-[#f5f4ee]",
        textColor: "text-brand-green",
        icon: <Zap className="w-9 h-9 text-[#a3e635]" strokeWidth={1.5} />,
    },
    {
        title: "Analytics & Optimization",
        description: "Data-driven reporting and continuous A/B testing — we track every metric, kill what doesn't work, and scale what drives results.",
        color: "bg-[#f5f4ee]",
        textColor: "text-brand-green",
        icon: <BarChart3 className="w-9 h-9 text-[#a3e635]" strokeWidth={1.5} />,
    },
];

function TiltFeatureCard({ service }: { service: typeof services[0] }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`${service.color} ${service.textColor} aspect-square p-8 md:p-10 rounded-[32px] shadow-lg flex flex-col justify-between transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/20`}
        >
            <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="flex flex-col h-full justify-between pointer-events-none">
                <div>
                    <div className="mb-6 bg-brand-green/5 w-14 h-14 rounded-2xl flex items-center justify-center">
                        {service.icon}
                    </div>
                    <h3 className="font-bebas text-4xl md:text-5xl uppercase leading-[0.9] mb-4 tracking-tight">
                        {service.title}
                    </h3>
                    <p className="text-sm md:text-base opacity-90 leading-relaxed font-medium">
                        {service.description}
                    </p>
                </div>

                <button className={`w-fit border ${service.color === "bg-brand-mustard" ? "border-brand-green/30" : "border-brand-green/20"} px-6 py-2.5 rounded-xl font-bold text-[11px] uppercase hover:bg-brand-green hover:text-white transition-all cursor-pointer pointer-events-auto`}>
                    Learn More
                </button>
            </div>
        </motion.div>
    );
}

export default function FeaturesSection() {
    const playHover = useSound("/sounds/hover.mp3", { volume: 0.3, cooldownMs: 80 });

    return (
        <section className="bg-brand-green py-36 md:py-44 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

                {/* Left Side: Sticky Title */}
                <div className="lg:col-span-4 lg:sticky lg:top-24 text-white">
                    <h2 className="font-bebas text-7xl md:text-8xl leading-[0.85] uppercase tracking-tighter mb-8">
                        Full-Service <br /> Digital <br /> Marketing
                    </h2>
                    <p className="text-white/80 text-base md:text-lg max-w-sm mb-10 font-medium leading-relaxed">
                        From creative content to paid media — we handle every layer of your digital presence so you can focus on running your business.
                    </p>
                    <a
                        href="https://wa.me/92332444816?text=Hi!%20I%20want%20to%20know%20more%20about%20Krelimedia%27s%20services."
                        target="_blank"
            onMouseEnter={() => playHover()}
                        rel="noopener noreferrer"
                        className="inline-flex bg-brand-mustard text-brand-green px-8 py-4 rounded-xl font-bold uppercase tracking-wide items-center gap-3 hover:bg-white transition-all group shadow-md cursor-pointer"
                    >
                        Start Growing
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Right Side: Square Grid Cards */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: "1200px" }}>
                    {services.map((service, index) => (
                        <TiltFeatureCard key={index} service={service} />
                    ))}
                </div>

            </div>
        </section>
    );
}