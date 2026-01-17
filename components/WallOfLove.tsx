"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "@/lib/testimonials";

export default function WallOfLove() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance carousel every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative py-20 bg-black overflow-hidden">
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

            {/* Auto-scrolling Carousel */}
            <div className="w-full overflow-hidden pb-12">
                <motion.div
                    className="flex gap-6 px-6 md:px-12"
                    animate={{ x: `calc(-${currentIndex * 300}px + 50% - 150px)` }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                    {TESTIMONIALS.map((testimonial, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "flex-none w-[280px] md:w-[320px]",
                                "relative p-6 bg-black border border-white/10 rounded-xl transition-all duration-500",
                                "group flex flex-col justify-between",
                                idx === currentIndex
                                    ? "border-lumina-gold/50 scale-105 shadow-[0_0_30px_rgba(250,204,21,0.15)]"
                                    : "opacity-50 scale-95"
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
                </motion.div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {TESTIMONIALS.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all duration-300",
                                idx === currentIndex
                                    ? "bg-lumina-gold w-6"
                                    : "bg-white/20 hover:bg-white/40"
                            )}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
