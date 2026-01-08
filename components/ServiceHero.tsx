import Image from "next/image";

interface ServiceHeroProps {
    title: string;
    subtitle: string;
}

export default function ServiceHero({ title, subtitle }: ServiceHeroProps) {
    return (
        <section className="relative h-[60vh] w-full overflow-hidden flex flex-col items-center justify-center bg-black/5 border-b border-white/20">
            {/* Background Image - Full Screen Zoom Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="relative w-full h-full animate-breath">
                    <Image
                        src="/heavenly-hero.png"
                        alt="Heavenly Background"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4 text-lumina-lavender font-mono text-xs tracking-[0.2em] border border-lumina-lavender/30 bg-white/50 px-4 py-1 rounded-full uppercase backdrop-blur-sm">
                        <span>✦</span>
                        <span>Divine Service</span>
                        <span>✦</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-thin tracking-tighter text-foreground uppercase drop-shadow-sm">
                        {title}
                    </h1>

                    <p className="max-w-xl text-foreground/70 font-sans text-lg md:text-xl leading-relaxed italic">
                        {subtitle}
                    </p>
                </div>
            </div>
        </section>
    );
}
