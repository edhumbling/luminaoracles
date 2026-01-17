"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "@/lib/testimonials";

export default function WallOfLove() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <section className="relative py-20 bg-black overflow-hidden" ref={containerRef}>
            {/* Subtle Theme Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-lumina-gold/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[80%] bg-lumina-cyan/5 blur-[150px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10 mb-12 text-center">
                <span className="text-lumina-gold font-mono text-xs tracking-[0.3em] uppercase mb-4 animate-pulse-slow">
                    Voices of Light
                </span>
                <h2 className="text-3xl md:text-5xl font-thin uppercase text-white tracking-widest">
                    Wall of <span className="font-[family-name:var(--font-calligraffitti)] text-lumina-gold">Love</span>
                </h2>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="w-full overflow-x-auto pb-12 hide-scrollbar snap-x snap-mandatory">
                <div className="flex gap-6 px-6 md:px-12 w-max mx-auto">
                    {TESTIMONIALS.map((testimonial, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "flex-none w-[280px] md:w-[320px] snap-center",
                                "relative p-6 bg-black border border-white/10 rounded-xl hover:border-lumina-gold/30 transition-all duration-300",
                                "group flex flex-col justify-between"
                            )}
                        >
                            <div className="absolute top-4 right-4 text-lumina-gold/20 text-4xl font-serif leading-none group-hover:text-lumina-gold/40 transition-colors">
                                "
                            </div>

                            <p className="text-white/70 font-light text-sm leading-relaxed mb-6 relative z-10 line-clamp-6">
                                {testimonial.text}
                            </p>

                            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-lumina-gold to-lumina-gold/50 flex items-center justify-center text-[10px] font-bold text-black uppercase">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <span className="text-lumina-gold font-mono text-[10px] tracking-widest uppercase truncate">
                                    {testimonial.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
