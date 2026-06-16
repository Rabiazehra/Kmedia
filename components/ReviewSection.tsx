"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const reviews = [
    {
        name: "Ayesha Khan",
        role: "Business Owner",
        title: "INCREDIBLY PROFESSIONAL!",
        text: '"Krelimedia helped us redefine our social media presence. Their content strategy and ad campaigns brought in real engagement, turning followers into loyal customers!"',
        initials: "AK",
        bgColor: "bg-[#b4ff4c]",
    },
    {
        name: "Usman Riaz",
        role: "Marketing Director",
        title: "A GAME CHANGER!",
        text: '"Their innovative ideas and attention to detail have significantly boosted our brand visibility in a crowded market. Highly recommended!"',
        initials: "UR",
        bgColor: "bg-[#f2c14e]",
    },
    {
        name: "Fatima Zafar",
        role: "E-Commerce Founder",
        title: "UNMATCHED EXPERTISE!",
        text: '"Working with Krelimedia was the best decision for our brand. Our sales doubled within weeks of their ad campaigns running at full scale."',
        initials: "FZ",
        bgColor: "bg-[#a29bfe]",
    },
];

export default function ReviewSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const next = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

    const visibleIndices = [0, 1]; // Show first 2, but cycle through all

    return (
        <section className="bg-[#003d2b] py-24 px-6 md:px-12 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Top Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
                    <div>
                        <h2 className="font-bebas text-7xl md:text-8xl uppercase leading-[0.9] tracking-tighter">
                            What Clients Say <br /> About Us
                        </h2>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-4 mt-8 md:mt-0">
                        <button
                            onClick={prev}
                            className="border border-white/20 p-4 rounded-full hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                            aria-label="Previous review"
                        >
                            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={next}
                            className="border border-[#b4ff4c] p-4 rounded-full hover:bg-[#b4ff4c] transition-all duration-300 group cursor-pointer"
                            aria-label="Next review"
                        >
                            <ArrowRight className="w-6 h-6 text-[#b4ff4c] group-hover:text-[#003d2b] group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Testimonial Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {visibleIndices.map((position, i) => {
                        const reviewIndex = (activeIndex + position) % reviews.length;
                        const review = reviews[reviewIndex];
                        return (
                            <motion.div
                                key={reviewIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="bg-[#f5f4ee] p-8 md:p-12 rounded-[48px] text-[#003d2b] flex flex-col items-start transition-transform hover:scale-[1.02] duration-500"
                            >
                                {/* Reviewer Profile with initials avatar */}
                                <div className="flex items-center gap-4 mb-10">
                                    <div className={`w-16 h-16 rounded-full ${review.bgColor} flex items-center justify-center text-brand-green font-bebas text-2xl`}>
                                        {review.initials}
                                    </div>
                                    <div>
                                        <h4 className="font-bebas text-3xl leading-none uppercase tracking-tight">
                                            {review.name}
                                        </h4>
                                        <p className="text-sm font-medium opacity-70">
                                            {review.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Review Content */}
                                <h3 className="font-bebas text-3xl md:text-4xl uppercase mb-4 leading-none tracking-tight">
                                    {review.title}
                                </h3>
                                <p className="text-lg md:text-xl leading-relaxed font-medium opacity-90 italic">
                                    {review.text}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-3 mt-10">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                                i === activeIndex || i === (activeIndex + 1) % reviews.length
                                    ? "w-8 bg-[#b4ff4c]"
                                    : "w-2 bg-white/30"
                            }`}
                            aria-label={`Go to review ${i + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
