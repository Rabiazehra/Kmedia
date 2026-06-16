"use client";

import { useState } from "react";
import { useSound } from "./useSound";
import { motion } from "framer-motion";
import Image from "next/image";

const teamMembers = [
  {
    name: "Atta Ul Mustafa",
    role: "CEO",
    image: "/atta.jpeg",
    heading: "ATTA — THE GUY WHO SIGNS THE WORK",
    bio: "Founder and head of strategy. Ali spent 6 years inside two of Pakistan's fastest-growing consumer brands before starting KRELIMEDIA. He runs every kickoff, signs off on every campaign, and is the person you'll be in Slack with at 11pm. He believes the best strategy is the one the team actually executes.",
    linkedin: "#",
  },
  {
    name: "Rabia Zehra",
    role: "Managing Director",
    image: "/rabia.jpeg",
    heading: "RABIA — WHERE BRAND MEANS SOMETHING",
    bio: "Rabia leads brand and creative. She came up through fashion and lifestyle — she knows what makes a feed feel like a world, not a billboard. She runs the design team, signs off on every campaign visual, and is the reason our work looks the way it does. She also shoots most of our hero photography herself.",
    linkedin: "#",
  },
  {
    name: "Muntazir Ali Shan",
    role: "Creative Head",
    image: "/ali.png",
    heading: "ALI — THE WORDS, THE RANKINGS, THE STRATEGY",
    bio: "Atta leads content and SEO. He's been writing for the web since before content marketing was a job title. He runs the editorial calendar, owns the keyword strategy, and writes the long-form pieces that earn real links. He reads every brief, edits every draft, and never misses a deadline. Most importantly: he ships.",
    linkedin: "https://linkedin.com/in/muntazir-ali-shan-519772252",
  },
  {
    name: "Abdul Moiz",
    role: "Growth & Ecosystem Lead",
    image: "/moiz.jpeg",
    heading: "MOIZ — THE PERFORMANCE MIND",
    bio: "Moiz runs paid acquisition. He's managed over $12M in ad spend across Meta, Google, TikTok, and YouTube. He's the person who will tell you the campaign isn't ready, the creative needs one more iteration, and the budget should pause this week. He thinks in ROAS, writes SQL for fun, and is allergic to vanity metrics.",
    linkedin: "#",
  },
];

export default function TeamSection() {
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const [risingId, setRisingId] = useState<number | null>(null);

  const playClick = useSound("/sounds/click.mp3", { volume: 0.5 });

  const handleFlip = (index: number) => {
    playClick();
    if (flippedId === index) {
      setFlippedId(null);
      setRisingId(null);
    } else {
      setRisingId(index);
      // Trigger flip after the rise animation starts
      setTimeout(() => setFlippedId(index), 200);
    }
  };

  return (
    <section className="bg-[#f5f4ee] py-36 md:py-44 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bebas text-6xl md:text-8xl text-brand-green uppercase leading-none tracking-tighter mb-6"
          >
            The Power Behind <br /> Our Success
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-brand-green/70 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Meet the creative minds and growth strategists driving real results for brands like yours.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="perspective-[1200px]"
              style={{ perspective: "1200px" }}
            >
              <motion.div
                className="relative w-full aspect-[3/4] cursor-pointer"
                animate={{
                  rotateY: flippedId === index ? 180 : 0,
                  y: risingId === index ? -16 : 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  y: { duration: 0.4, ease: "easeOut" },
                }}
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => handleFlip(index)}
              >
                {/* Front — Photo + Heading + Read More */}
                <div
                  className="absolute inset-0 bg-white p-5 rounded-[32px] shadow-sm flex flex-col backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="w-full aspect-[4/5] overflow-hidden rounded-[20px] mb-4 bg-gray-100 relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale-[0.15] hover:grayscale-0 transition-all duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between gap-2">
                    <div className="text-brand-green">
                      <h3 className="font-bebas text-2xl md:text-3xl uppercase tracking-tighter leading-none mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm md:text-base font-medium opacity-80">{member.role}</p>
                    </div>

                    {/* Read More trigger */}
                    <div
                      className="flex items-center gap-2 text-brand-green/60 hover:text-brand-green transition-colors duration-300 group cursor-pointer mt-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFlip(index);
                      }}
                    >
                      <span className="text-xs font-bold uppercase tracking-wider">Read More</span>
                      <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>

                {/* Back — Full Bio */}
                <div
                  className="absolute inset-0 bg-white p-6 rounded-[32px] shadow-sm flex flex-col backface-hidden overflow-y-auto"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="flex-1 flex flex-col text-brand-green">
                    {/* Mini avatar + name at top */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-brand-green/10">
                      <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 bg-gray-100">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <h4 className="font-bebas text-xl uppercase tracking-tighter leading-none">
                          {member.name}
                        </h4>
                        <p className="text-xs font-medium opacity-60">{member.role}</p>
                      </div>
                    </div>

                    {/* Heading */}
                    <h3 className="font-bebas text-2xl md:text-3xl uppercase tracking-tighter leading-none mb-3 text-brand-green">
                      {member.heading}
                    </h3>

                    {/* Full bio */}
                    <p className="text-sm md:text-sm leading-relaxed opacity-75 flex-1">
                      {member.bio}
                    </p>

                    {/* LinkedIn + Flip Back */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-green/10">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          playClick();
                        }}
                        className="bg-brand-green text-white p-2 rounded-full hover:scale-110 transition-transform shadow-md"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlippedId(null);
                          setRisingId(null);
                        }}
                        className="text-xs uppercase tracking-widest text-brand-green/50 hover:text-brand-green transition-colors font-bold"
                      >
                        ← Back
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}