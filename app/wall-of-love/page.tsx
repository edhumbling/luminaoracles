"use client";

import Image from "next/image";
import { TESTIMONIALS } from "@/lib/testimonials";
import ContactSection from "@/components/ContactSection";

export default function WallOfLovePage() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/wall_of_love_hero.png"
                    alt="Cosmic Love Energy"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-thin tracking-tighter text-white drop-shadow-[0_0_30px_rgba(250,204,21,0.6)] mb-4">
                        Wall of <span className="font-normal text-lumina-gold font-[family-name:var(--font-calligraffitti)]">Love</span>
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
                        Echoes of gratitude from our sacred community.
                    </p>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-20 px-6 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((testimonial, idx) => (
                        <div
                            key={idx}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-lumina-gold/40 transition-all duration-300 hover:-translate-y-1 group"
                        >
                            <div className="mb-6 opacity-30 group-hover:opacity-100 transition-opacity">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 11L8 17H11V21L14 15H11V11H10Z" fill="currentColor" className="text-lumina-gold" />
                                    <path d="M14.45 6C15.55 6 16.59 5.09 16.5 4C16.5 3.45 16.95 3 17.5 3C18.05 3 18.5 3.45 18.5 4C18.43 5.34 17.27 6.47 15.93 6.95C15.65 6.45 15.11 6.08 14.45 6Z" fill="currentColor" className="text-lumina-gold" />
                                </svg>
                            </div>

                            <p className="text-white/80 font-light leading-relaxed mb-8">
                                "{testimonial.text}"
                            </p>

                            <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lumina-gold to-purple-900 flex items-center justify-center text-black font-bold text-sm">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-lumina-gold text-sm font-bold tracking-wide uppercase">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-white/30 text-xs uppercase tracking-widest">
                                        Community Member
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* reuse contact section for consistent CTA */}
            <ContactSection />
        </main>
    );
}
