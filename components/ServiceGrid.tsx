"use client";

import Link from "next/link";
import { SERVICES } from "@/lib/data";
import dynamic from 'next/dynamic';

const ATCShader = dynamic(() => import("@/components/atc-shader").then(mod => mod.ATCShader), { ssr: false });
const AnimatedShader = dynamic(() => import("@/components/animated-shader-hero").then(mod => mod.AnimatedShader), { ssr: false });
const PulsingGeometricDream = dynamic(() => import("@/components/pulsing-geometric-dream"), { ssr: false });
const PatternShader = dynamic(() => import("@/components/pattern-shader"), { ssr: false });
const PsychedelicVortexHero = dynamic(() => import("@/components/psychedelic-vortex-hero").then(mod => mod.PsychedelicVortexHero), { ssr: false });

const Shaders = [ATCShader, AnimatedShader, PulsingGeometricDream, PatternShader, PsychedelicVortexHero];

export default function ServiceGrid() {
    return (
        <section className="pt-24 pb-0 bg-black relative overflow-hidden">
            {/* Ethereal Section Header */}
            <div className="container mx-auto px-4 mb-16 flex flex-col items-center justify-center text-center">
                <span className="text-lumina-gold font-mono text-xs tracking-widest uppercase mb-4">Discover Your Path</span>
                <h2 className="text-4xl md:text-6xl font-thin uppercase text-white">
                    Divine <span className="text-lumina-gold font-normal">Services</span>
                </h2>
                <div className="w-24 h-px bg-lumina-gold mt-6 opacity-30" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10">
                {SERVICES.map((service, index) => {
                    const ShaderComponent = Shaders[index % Shaders.length];

                    return (
                        <Link
                            key={index}
                            href={`/services/${service.slug}`}
                            className="group relative min-h-[18rem] p-8 border-b border-r border-white/10 bg-black hover:bg-black/80 transition-colors duration-300 overflow-hidden"
                        >
                            {/* Persistent Shader Background */}
                            <div className="absolute inset-0 z-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100">
                                <ShaderComponent className="w-full h-full" />
                            </div>

                            {/* Hover Overlay - Gold Tint */}
                            <div className="absolute inset-0 bg-lumina-gold/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

                            <div className="relative z-20 flex flex-col justify-between h-full">
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <span className="font-mono text-xs tracking-widest text-white/70 group-hover:text-lumina-gold font-bold transition-colors">
                                        {"//"} {service.slug}
                                    </span>
                                    <div className="w-2 h-2 bg-white/20 group-hover:bg-lumina-gold transition-colors duration-300" />
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-2xl font-bold uppercase tracking-tighter text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="font-mono text-sm text-white/60 group-hover:text-white line-clamp-2 transition-colors">
                                        {service.desc}
                                    </p>
                                </div>

                                {/* Action Icon */}
                                <div className="self-end">
                                    <span className="font-mono text-xl text-white/20 group-hover:text-lumina-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                                        ↗
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
