"use client"

import Image from "next/image";
import { AnimatedShader } from "./animated-shader-hero";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black border-b border-white/10">
            {/* Shader Background - Ethereal Movement */}
            <div className="absolute inset-0 z-0">
                <AnimatedShader className="opacity-70 mix-blend-screen" />
            </div>

            {/* Background Grid - Subtle Light */}
            <div className="absolute inset-0 bg-util-grid opacity-[0.05] pointer-events-none z-0" />

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/80 pointer-events-none z-0" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="flex flex-col items-center gap-8">
                    {/* Floating Logo Container */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 animate-float">
                        <div className="absolute inset-0 bg-lumina-gold/20 blur-[40px] rounded-full animate-pulse-slow" />
                        <Image
                            src="/logo.png"
                            alt="Lumina Oracles Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]"
                        />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-8xl font-thin tracking-tighter text-foreground py-2 drop-shadow-2xl whitespace-nowrap">
                            <span className="font-[family-name:var(--font-calligraffitti)] text-transparent bg-clip-text bg-gradient-to-br from-[#ffd700] via-[#fdb931] to-[#d4af37] drop-shadow-[0_0_25px_rgba(250,204,21,0.5)]">Lumina</span>
                            {" "}
                            <span className="font-[family-name:var(--font-calligraffitti)] bg-gradient-to-r from-[#e0c3fc] via-[#8ec5fc] to-[#e0c3fc] bg-[length:200%_auto] bg-clip-text text-transparent animate-flow drop-shadow-[0_0_35px_rgba(142,197,252,0.6)]">Oracles</span>
                        </h1>

                        <p className="text-sm md:text-lg text-white/60 font-mono tracking-[0.3em] uppercase opacity-0 animate-fade-in-up-delayed">
                            Gateway to Divine Wisdom
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Decoration */}
            <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between text-[10px] md:text-xs font-mono text-white/30 uppercase tracking-[0.2em] z-10">
                <span className="animate-pulse-slow">Divine Love</span>
                <span className="hidden md:inline">Reverberation: 963Hz</span>
                <span className="animate-pulse-slow animation-delay-2000">Peace</span>
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up-delayed {
                    animation: fade-in-up 1s ease-out 0.5s forwards;
                }
            `}</style>
        </section>
    );
}
