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
            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 mb-[-10px] animate-float">
                        <Image
                            src="/logo.png"
                            alt="Lumina Oracles Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                        />
                    </div>

                    <h1 className="text-6xl md:text-8xl font-thin tracking-tighter text-foreground uppercase py-2 drop-shadow-sm mix-blend-overlay">
                        <span className="font-[family-name:var(--font-calligraffitti)] capitalize">Lumina</span> <span className="font-normal bg-gradient-to-r from-[#ffe259] via-[#ffa751] to-[#ffe259] bg-[length:200%_auto] bg-clip-text text-transparent animate-flow drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">Oracles</span>
                    </h1>

                    <p className="max-w-md text-foreground/80 font-sans text-lg md:text-xl leading-relaxed text-center backdrop-blur-sm bg-white/10 p-4 rounded-2xl border border-white/20 shadow-xl">
                        Connect to higher wisdom.
                    </p>

                    <div className="mt-8 flex flex-col md:flex-row gap-6 w-full md:w-auto">
                        <button className="px-10 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white font-medium tracking-widest uppercase rounded-full shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] hover:scale-105 transition-all duration-300">
                            Begin
                        </button>
                        <button className="px-10 py-4 border border-white/30 text-lumina-gold font-medium tracking-widest uppercase rounded-full hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm">
                            Explore
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
