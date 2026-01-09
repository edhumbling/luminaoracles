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

                    <h1 className="text-6xl md:text-8xl font-thin tracking-tighter text-foreground py-2 drop-shadow-sm mix-blend-overlay">
                        <span className="font-[family-name:var(--font-calligraffitti)] capitalize text-white drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]">Lumina</span> <span className="font-normal bg-gradient-to-r from-[#ffe259] via-[#ffa751] to-[#ffe259] bg-[length:200%_auto] bg-clip-text text-transparent animate-flow drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">Oracles</span>
                    </h1>


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
