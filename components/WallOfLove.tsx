"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "@/lib/testimonials";
import { X } from "lucide-react";

export default function WallOfLove() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState<typeof TESTIMONIALS[0] | null>(null);

    // Auto-advance carousel every 4 seconds (paused when held or modal open)
    useEffect(() => {
        if (isPaused || selectedTestimonial) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isPaused, selectedTestimonial]);

    // Handle card interaction - pause and show modal
    const handleCardInteraction = useCallback((testimonial: typeof TESTIMONIALS[0], idx: number) => {
        setCurrentIndex(idx);
        setSelectedTestimonial(testimonial);
    }, []);

    // Handle touch/mouse hold to pause
    const handleHoldStart = useCallback(() => {
        setIsPaused(true);
    }, []);

    const handleHoldEnd = useCallback(() => {
        setIsPaused(false);
    }, []);

    // Close modal
    const closeModal = useCallback(() => {
        setSelectedTestimonial(null);
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
            <div
                className="w-full overflow-hidden pb-12"
                onMouseDown={handleHoldStart}
                onMouseUp={handleHoldEnd}
                onMouseLeave={handleHoldEnd}
                onTouchStart={handleHoldStart}
                onTouchEnd={handleHoldEnd}
            >
                <motion.div
                    className="flex gap-6 px-6 md:px-12"
                    animate={{ x: `calc(-${currentIndex * 300}px + 50% - 150px)` }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                    {TESTIMONIALS.map((testimonial, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleCardInteraction(testimonial, idx)}
                            className={cn(
                                "flex-none w-[280px] md:w-[320px] cursor-pointer",
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

                            {/* Tap hint on active card */}
                            {idx === currentIndex && (
                                <div className="absolute bottom-2 right-2 text-[8px] text-white/30 uppercase tracking-widest">
                                    Tap to read
                                </div>
                            )}
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

                {/* Pause indicator */}
                {isPaused && !selectedTestimonial && (
                    <div className="flex justify-center mt-4">
                        <span className="text-[10px] text-lumina-gold/50 uppercase tracking-widest animate-pulse">
                            Paused
                        </span>
                    </div>
                )}
            </div>

            {/* Modal for full testimonial view (both mobile and desktop) */}
            <AnimatePresence>
                {selectedTestimonial && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="relative w-full max-w-lg max-h-[80vh] bg-[#0a0a0a] border border-lumina-gold/30 rounded-2xl shadow-[0_0_60px_rgba(250,204,21,0.2)] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                                aria-label="Close testimonial"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Modal content with subtle/hidden scrollbar on mobile */}
                            <div className="p-8 pt-14 overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent md:scrollbar-thumb-white/20 [&::-webkit-scrollbar]:w-1 md:[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 md:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent">
                                {/* Quote mark */}
                                <div className="text-lumina-gold/30 text-6xl md:text-8xl font-serif leading-none mb-4">
                                    "
                                </div>

                                {/* Full testimonial text */}
                                <p className="text-white/80 font-light text-base md:text-lg leading-relaxed mb-8">
                                    {selectedTestimonial.text}
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lumina-gold to-lumina-gold/50 flex items-center justify-center text-sm font-bold text-black uppercase">
                                        {selectedTestimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <span className="text-lumina-gold font-mono text-xs tracking-widest uppercase block">
                                            {selectedTestimonial.name}
                                        </span>
                                        <span className="text-white/30 text-[10px] uppercase tracking-widest">
                                            Sacred Community Member
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-lumina-gold/10 blur-[80px] rounded-full pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-lumina-cyan/10 blur-[80px] rounded-full pointer-events-none" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
