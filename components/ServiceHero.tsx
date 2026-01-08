import Image from "next/image";

interface ServiceHeroProps {
    title: string;
    subtitle: string;
}

export default function ServiceHero({ title, subtitle }: ServiceHeroProps) {
    return (
        <section className="relative h-[60vh] w-full overflow-hidden flex flex-col items-center justify-center bg-black border-b border-white/10">
            {/* Background Image - Full Screen Zoom Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="relative w-full h-full animate-breath">
                    <Image
                        src="/heavenly-hero.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-50 contrast-125 saturate-50"
                        priority
                    />
                </div>
            </div>

            {/* Dark Overlay for focus */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4 text-lumina-gold font-mono text-xs tracking-[0.2em] border border-lumina-gold/30 bg-black/80 px-4 py-1 uppercase backdrop-blur-sm">
                        <span>[ SERVICE ]</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-thin tracking-tighter text-white uppercase drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                        {title}
                    </h1>

                    <p className="max-w-xl text-white/70 font-sans text-lg md:text-xl leading-relaxed italic">
                        &quot;{subtitle}&quot;
                    </p>
                </div>
            </div>

            {/* Sharp Bottom Border Decorative Element */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-lumina-gold" />
        </section>
    );
}
