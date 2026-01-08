import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-transparent border-b border-white/20">
            {/* Background Grid - Subtle Light */}
            <div className="absolute inset-0 bg-util-grid opacity-[0.03] pointer-events-none" />

            {/* Heavenly Light Portal - Full Screen Zoom */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="relative w-full h-full animate-breath">
                    <Image
                        src="/heavenly-hero.png"
                        alt="Heavenly Light Portal"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4 text-lumina-lavender font-mono text-sm tracking-[0.2em] border border-lumina-lavender/30 bg-white/50 px-6 py-2 rounded-full uppercase backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                        <span>✨</span>
                        <span>Soul Alignment: Harmonized</span>
                        <span>✨</span>
                    </div>

                    <div className="relative w-24 h-24 md:w-32 md:h-32 mb-[-20px] animate-float">
                        <Image
                            src="/logo.png"
                            alt="Lumina Oracles Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        />
                    </div>

                    <h1 className="text-6xl md:text-8xl font-thin tracking-tighter text-foreground uppercase py-4 drop-shadow-sm">
                        Lumina <span className="text-transparent bg-clip-text bg-gradient-to-r from-lumina-cyan via-lumina-gold to-lumina-lavender font-normal">Oracles</span>
                    </h1>

                    <p className="max-w-xl text-foreground/70 font-sans text-lg md:text-xl leading-relaxed">
                        Welcome to the sanctuary of light. Connect your spirit to higher dimensional wisdom
                        through gentle, illuminating guidance.
                    </p>

                    <div className="mt-10 flex flex-col md:flex-row gap-6 w-full md:w-auto">
                        <button className="px-10 py-4 bg-gradient-to-r from-lumina-cyan to-lumina-lavender text-white font-medium tracking-wide uppercase rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            Begin Your Journey
                        </button>
                        <button className="px-10 py-4 border border-lumina-gold/50 text-lumina-gold font-medium uppercase rounded-full hover:bg-lumina-gold/10 hover:border-lumina-gold transition-colors duration-300">
                            Sacred Pathways
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Decoration */}
            <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between text-xs font-mono text-foreground/40 uppercase tracking-widest">
                <span>Divine Love</span>
                <span>Reverberation: 963Hz</span>
                <span>Peace</span>
            </div>
        </section>
    );
}
