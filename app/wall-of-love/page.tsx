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
            <section className="py-20 px-4 md:px-6 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                    {TESTIMONIALS.map((testimonial, idx) => (
                        <div
                            key={idx}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-8 rounded-xl md:rounded-2xl hover:border-lumina-gold/40 transition-all duration-300 hover:-translate-y-1 group aspect-square flex flex-col justify-between overflow-hidden"
                        >
                            <div className="flex-1 overflow-hidden">
                                <div className="mb-2 md:mb-6 opacity-30 group-hover:opacity-100 transition-opacity">
                                    <span className="text-lumina-gold text-2xl md:text-4xl font-serif">"</span>
                                </div>

                                <p className="text-white/80 font-light leading-relaxed text-[10px] md:text-base line-clamp-4 md:line-clamp-6">
                                    {testimonial.text}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 md:gap-4 border-t border-white/5 pt-3 md:pt-6 mt-2 md:mt-4">
                                <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-lumina-gold to-purple-900 flex items-center justify-center text-black font-bold text-[8px] md:text-sm flex-shrink-0">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-lumina-gold text-[9px] md:text-sm font-bold tracking-wide uppercase truncate">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-white/30 text-[8px] md:text-xs uppercase tracking-widest hidden md:block">
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
