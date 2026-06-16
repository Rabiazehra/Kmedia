"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSound } from "./useSound";

function TiltImage({ src, alt }: { src: string, alt: string }) {
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
            className="rounded-[40px] bg-gray-300 aspect-[5/6] relative shadow-lg border border-brand-green/5 w-full h-full"
        >
            <div style={{ transform: "translateZ(40px)", width: "100%", height: "100%", position: "absolute", inset: 0, borderRadius: "40px", overflow: "hidden" }}>
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                />
            </div>
        </motion.div>
    );
}

export default function AboutSection() {
    const playHover = useSound("/sounds/hover.mp3", { volume: 0.3, cooldownMs: 80 });
    const playClick = useSound("/sounds/click.mp3", { volume: 0.5 });

    return (
        <section className="bg-[#f5f4ee] py-36 md:py-44 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">

                {/* Section Heading */}
                <div className="text-center mb-28">
                    <h2 className="font-bebas text-brand-green text-7xl md:text-8xl leading-[0.85] uppercase tracking-tighter">
                        Where Strategy Meets <br /> Creative Execution
                    </h2>
                    <p className="mt-6 text-brand-green/80 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
                        We are a full-service digital marketing agency that builds brands, drives traffic, and delivers measurable growth through data-backed creativity.
                    </p>
                </div>

                {/* Mission Block */}
                <div className="flex flex-col md:grid md:grid-cols-12 items-center gap-12 md:gap-20 mb-40">
                    <div className="w-full md:col-span-5" style={{ perspective: "1200px" }}>
                        <TiltImage src="/mission.png" alt="Krelimedia Marketing Mission" />
                    </div>

                    <div className="w-full md:col-span-7 text-brand-green">
                        <h3 className="font-bebas text-6xl md:text-7xl mb-6 uppercase leading-[0.9] tracking-tighter">
                            Our Mission: Growth Without the Fluff
                        </h3>
                        <p className="mb-10 text-brand-green/80 text-lg font-medium leading-relaxed max-w-xl">
                            We exist to help businesses cut through the noise. Every strategy we build, every piece of content we create, and every campaign we run is engineered to deliver one thing: real, measurable results for your brand.
                        </p>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-10">
                            <div>
                                <span className="block font-bebas text-7xl text-brand-green leading-none">200+</span>
                                <span className="block font-bold text-sm uppercase mt-2 tracking-wide">Campaigns Delivered</span>
                                <p className="mt-3 text-brand-green/70 text-sm leading-relaxed">
                                    From social media rollouts to full-scale ad campaigns across Meta, Google & TikTok.
                                </p>
                            </div>
                            <div>
                                <span className="block font-bebas text-7xl text-brand-green leading-none">98%</span>
                                <span className="block font-bold text-sm uppercase mt-2 tracking-wide">Client Retention</span>
                                <p className="mt-3 text-brand-green/70 text-sm leading-relaxed">
                                    Our clients stay because we deliver — transparent reporting, honest communication, and consistent results.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vision Block */}
                <div className="flex flex-col-reverse md:grid md:grid-cols-12 items-center gap-12 md:gap-20">
                    <div className="w-full md:col-span-7 text-brand-green">
                        <h3 className="font-bebas text-6xl md:text-7xl mb-6 uppercase leading-[0.9] tracking-tighter">
                            Vision: Every Brand, Unforgettable
                        </h3>
                        <p className="text-brand-green/80 text-lg font-medium leading-relaxed max-w-xl mb-10">
                            We believe every brand deserves to be seen, heard, and remembered. Our vision is a digital landscape where creativity, data, and strategy collide to build legacies that outlast trends.
                        </p>

                        <a
                            href="https://wa.me/92332444816?text=Hi!%20I%20want%20to%20know%20more%20about%20Krelimedia%27s%20services."
                            target="_blank"
                            onMouseEnter={() => playHover()}
                            onClick={() => playClick()}
                            rel="noopener noreferrer"
                            className="inline-flex bg-brand-mustard text-brand-green px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-wider items-center gap-2 hover:bg-brand-green hover:text-white transition-all group shadow-md cursor-pointer"
                        >
                            Work With Us
                            <span className="group-hover:translate-x-1 transition-transform text-lg">→</span>
                        </a>
                    </div>

                    <div className="w-full md:col-span-5" style={{ perspective: "1200px" }}>
                        <TiltImage src="/vision.png" alt="Our Vision for Digital Growth" />
                    </div>
                </div>

            </div>
        </section>
    );
}