"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { TESTIMONIALS } from "@/lib/testimonials";

interface Testimonial {
    name: string;
    text: string;
}

export default function TestimonialGrid() {
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

    return (
        <>
            <section className="py-20 px-4 md:px-6 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                    {TESTIMONIALS.map((testimonial, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedTestimonial(testimonial)}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-8 rounded-xl md:rounded-2xl hover:border-lumina-gold/40 transition-all duration-300 hover:-translate-y-1 group aspect-square flex flex-col justify-between overflow-hidden cursor-pointer md:cursor-default"
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

                            {/* Tap indicator for mobile */}
                            <div className="absolute bottom-2 right-2 text-white/20 text-[8px] uppercase tracking-widest md:hidden">
                                Tap to read
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mobile Modal - Only visible on mobile */}
            {selectedTestimonial && (
                <div
                    className="fixed inset-0 z-50 md:hidden flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
                    onClick={() => setSelectedTestimonial(null)}
                >
                    <div
                        className="relative bg-black border border-lumina-gold/30 rounded-2xl p-8 max-w-md w-full max-h-[80vh] overflow-y-auto animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedTestimonial(null)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                            aria-label="Close modal"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Quote mark */}
                        <div className="text-lumina-gold text-6xl font-serif leading-none mb-4 opacity-50">"</div>

                        {/* Full testimonial text */}
                        <p className="text-white/90 font-light leading-relaxed text-base mb-8">
                            {selectedTestimonial.text}
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lumina-gold to-purple-900 flex items-center justify-center text-black font-bold text-lg">
                                {selectedTestimonial.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-lumina-gold text-sm font-bold tracking-wide uppercase">
                                    {selectedTestimonial.name}
                                </p>
                                <p className="text-white/40 text-xs uppercase tracking-widest">
                                    Community Member
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
