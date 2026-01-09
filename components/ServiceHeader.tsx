"use client";

import { ATCShader } from "@/components/atc-shader";
import { AnimatedShader } from "@/components/animated-shader-hero";
import PulsingGeometricDream from "@/components/pulsing-geometric-dream";
import PatternShader from "@/components/pattern-shader";
import { PsychedelicVortexHero } from "@/components/psychedelic-vortex-hero";

const SHADERS = [ATCShader, AnimatedShader, PulsingGeometricDream, PatternShader, PsychedelicVortexHero];

interface ServiceHeaderProps {
    title: string;
    divineEssence: string;
    shaderIndex: number;
}

export default function ServiceHeader({ title, divineEssence, shaderIndex }: ServiceHeaderProps) {
    const ShaderComponent = SHADERS[shaderIndex % SHADERS.length];

    return (
        <header className="relative w-full h-[60vh] min-h-[500px] border-b border-white/20 overflow-hidden flex flex-col justify-end">
            {/* Background Shader */}
            <div className="absolute inset-0 z-0">
                <ShaderComponent className="w-full h-full" />
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            {/* Content Content */}
            <div className="relative z-10 container mx-auto px-6 pb-12 md:pb-20">
                <div className="max-w-4xl border-l-2 border-lumina-gold pl-6 md:pl-8 py-2">
                    <span className="block text-lumina-gold font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-2">
                        Divine Service Protocol
                    </span>
                    <h1 className="text-4xl md:text-7xl font-light text-white uppercase tracking-tight mb-4 drop-shadow-lg">
                        {title}
                    </h1>
                    <p className="text-lg md:text-2xl text-white/80 font-serif italic tracking-wide">
                        {divineEssence}
                    </p>
                </div>
            </div>
        </header>
    );
}
