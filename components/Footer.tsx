"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { useSound } from "./useSound";

export default function Footer() {
    // WhatsApp configuration
    const whatsappNumber = "923324448164";
    const playHover = useSound("/sounds/hover.mp3", { volume: 0.3, cooldownMs: 80 });

    return (
        <footer className="bg-[#003d2b] text-white">
            {/* Marquee Banner */}
            <div className="border-y border-white/10 py-10 overflow-hidden whitespace-nowrap bg-[#003d2b]">
                <div className="inline-block animate-marquee">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="font-bebas text-7xl md:text-8xl text-[#b4ff4c] uppercase mx-8 inline-flex items-center gap-8">
                            Let's Talk
                            <svg width="60" height="60" viewBox="0 0 100 100" className="fill-current">
                                <path d="M50 0 L62 38 L100 50 L62 62 L50 100 L38 62 L0 50 L38 38 Z" />
                            </svg>
                        </span>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    <div className="flex flex-col items-start">
                        {/* Logo text instead of broken image */}
                        <span className="font-bebas text-4xl text-white tracking-widest uppercase mb-6">
                            KRELIMEDIA
                        </span>
                        <p className="text-white/70 mb-8 leading-relaxed max-w-xs font-medium">
                            &ldquo;Where Strategy Meets Creativity to Drive Growth, Engagement, and Real Business Results.&rdquo;
                        </p>

                        {/* SOCIAL MEDIA SECTION: Active links */}
                        <div className="flex gap-4 mb-10 text-white/80">
                            {/* Instagram */}
                            <a href="https://www.instagram.com/krelimedia/" target="_blank" rel="noopener noreferrer" onMouseEnter={() => playHover()} className="hover:text-[#b4ff4c] transition-colors" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a href="https://www.facebook.com/krelimedia/" target="_blank" rel="noopener noreferrer" onMouseEnter={() => playHover()} className="hover:text-[#b4ff4c] transition-colors" aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>

                            {/* Twitter/X */}
                            <a href="https://twitter.com/krelimedia" target="_blank" rel="noopener noreferrer" onMouseEnter={() => playHover()} className="hover:text-[#b4ff4c] transition-colors" aria-label="Twitter / X">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a href="https://linkedin.com/company/krelimedia" target="_blank" rel="noopener noreferrer" onMouseEnter={() => playHover()} className="hover:text-[#b4ff4c] transition-colors" aria-label="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                        </div>

                        {/* WHATSAPP LINK */}
                        <a
                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I'd like to know more about Krelimedia's services.")}`}
                            target="_blank"
                            onMouseEnter={() => playHover()}
                            rel="noopener noreferrer"
                            className="bg-[#f2c14e] text-[#003d2b] px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
                        >
                            Work With Us <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    <div>
                        <h4 className="font-bebas text-2xl mb-8 uppercase tracking-wider text-white">Company</h4>
                        <ul className="space-y-4 text-white/60 font-medium">
                            <li><Link href="/" onMouseEnter={() => playHover()} className="hover:text-[#b4ff4c] transition-colors">Home</Link></li>
                            <li><Link href="/about" onMouseEnter={() => playHover()} className="hover:text-[#b4ff4c] transition-colors">About Us</Link></li>
                            <li><Link href="/services" onMouseEnter={() => playHover()} className="hover:text-[#b4ff4c] transition-colors">Services</Link></li>
                            <li><Link href="/contact" onMouseEnter={() => playHover()} className="hover:text-[#b4ff4c] transition-colors">Contact</Link></li>
                            <li><Link href="/services" onMouseEnter={() => playHover()} className="hover:text-[#b4ff4c] transition-colors">What We Offer</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bebas text-2xl mb-8 uppercase tracking-wider text-white">Contact</h4>
                        <ul className="space-y-6 text-white/60 font-medium">
                            <li className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Phone</span>
                                <a href="tel:+920512751107" className="text-white hover:text-[#b4ff4c] transition-colors">
                                    051-2751107
                                </a>
                            </li>
                            <li className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Email</span>
                                <a href="mailto:info@krelimedia.com" className="text-white hover:text-[#b4ff4c] transition-colors">
                                    info@krelimedia.com
                                </a>
                            </li>
                            <li className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Office</span>
                                <span className="text-white">Office No.2, Naseem Arcade IDC, I-9, Islamabad</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 tracking-widest uppercase">
                    <p>&copy; {new Date().getFullYear()} KRELIMEDIA. All rights reserved.</p>
                    <p className="mt-4 md:mt-0">Powered by KSR Group</p>
                </div>
            </div>
        </footer>
    );
}