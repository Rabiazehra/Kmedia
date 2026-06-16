"use client";

import { Plus } from "lucide-react";
import { useSound } from "./useSound";

const faqs = [
    {
        question: "WHAT SERVICES DO YOU OFFER?",
        answer: "We offer a full suite of digital services including web design, SEO, social media management, and custom software development tailored to your brand's growth."
    },
    {
        question: "WHO DO YOU WORK WITH?",
        answer: "We partner with ambitious startups, established medical clinics, and creative professionals looking to scale their digital footprint."
    },
    {
        question: "HOW DO I KNOW IF LOOPED IS RIGHT FOR MY BUSINESS?",
        answer: "If you're looking for a partner that combines technical expertise with a deep understanding of modern design aesthetics, we're likely a great fit."
    },
    {
        question: "HOW LONG DOES IT TAKES TO GET RESULTS?",
        answer: "While some technical fixes show immediate impact, most brand transformations and SEO strategies yield significant results within 3 to 6 months."
    },
    {
        question: "HOW MUCH DO YOUR SERVICES COST?",
        answer: "Our packages are customized based on project scope. We offer everything from fixed-price aesthetic pitches to long-term retainer partnerships."
    }
];

export default function FAQSection() {
    const playClick = useSound("/sounds/click.mp3", { volume: 0.5 });

    return (
        <section className="bg-[#f5f4ee] py-24 px-6">
            <div className="max-w-4xl mx-auto text-center">

                {/* Header */}
                <h2 className="font-bebas text-7xl md:text-8xl text-[#003d2b] uppercase leading-[0.9] tracking-tighter mb-20">
                    Frequently Asked <br /> Questions
                </h2>

                {/* Accordion List */}
                <div className="space-y-4 text-left">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="group bg-white rounded-[24px] border border-transparent hover:border-[#003d2b]/10 transition-all duration-300 overflow-hidden"
                        >
                            <button onClick={() => playClick()} className="w-full p-6 md:p-8 flex justify-between items-center text-left">
                                <span className="font-bebas text-2xl md:text-4xl text-[#003d2b] uppercase tracking-tight">
                                    {faq.question}
                                </span>
                                <div className="bg-[#f5f4ee] group-hover:bg-[#003d2b] group-hover:text-white p-2 rounded-full transition-colors duration-300">
                                    <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                                </div>
                            </button>

                            {/* Optional: Add hidden answer logic here if you want it to toggle */}
                            {/* <div className="px-8 pb-8 text-[#003d2b]/70 font-medium max-w-2xl">
                {faq.answer}
              </div> */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}