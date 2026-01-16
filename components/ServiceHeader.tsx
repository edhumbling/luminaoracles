"use client";

import { useRouter } from "next/navigation";
import { ATCShader } from "@/components/atc-shader";
import { AnimatedShader } from "@/components/animated-shader-hero";
import PulsingGeometricDream from "@/components/pulsing-geometric-dream";
import PatternShader from "@/components/pattern-shader";
import { PsychedelicVortexHero } from "@/components/psychedelic-vortex-hero";
import { ArrowLeft } from "lucide-react";

const SHADERS = [ATCShader, AnimatedShader, PulsingGeometricDream, PatternShader, PsychedelicVortexHero];

interface ServiceHeaderProps {
    title: string;
    divineEssence: string;
    shaderIndex: number;
}

export default function ServiceHeader({ title, divineEssence, shaderIndex }: ServiceHeaderProps) {
    const router = useRouter();
    const ShaderComponent = SHADERS[shaderIndex % SHADERS.length];

    return (
        <header className="relative w-full h-[60vh] min-h-[500px] border-b border-black/20 overflow-hidden flex flex-col justify-end">
            {/* Back Button - Positioned for visibility */}
            <button
                onClick={() => router.back()}
                className="fixed top-6 md:top-8 left-6 md:left-8 z-30 bg-black/80 backdrop-blur-sm text-white hover:text-lumina-gold hover:bg-black transition-all duration-300 flex items-center gap-2 group px-4 py-2 rounded-full border border-white/20 shadow-lg"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-sm uppercase tracking-widest">Back</span>
            </button>

            {/* Background Shader */}
            <div className="absolute inset-0 z-0">
                <ShaderComponent className="w-full h-full" />
                {/* Stronger overlay for better text readability */}
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 pb-12 md:pb-20">
                <div className="max-w-4xl border-l-4 border-lumina-gold pl-6 md:pl-8 py-2">
                    <span className="block text-lumina-gold font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-2 drop-shadow-md">
                        Divine Service Protocol
                    </span>
                    <h1 className="text-4xl md:text-7xl font-light text-black uppercase tracking-tight mb-4 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                        {title}
                    </h1>
                    <p className="text-lg md:text-2xl text-black/80 font-serif italic tracking-wide drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]">
                        {divineEssence}
                    </p>
                </div>
            </div>
        </header>
    );
}
