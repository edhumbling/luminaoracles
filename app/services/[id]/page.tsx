import { SERVICES } from "@/lib/data";
import ServiceHero from "@/components/ServiceHero";
import Image from "next/image";
import { notFound } from "next/navigation";

// Generate static params for all services
export async function generateStaticParams() {
    return SERVICES.map((service) => ({
        id: service.id,
    }));
}

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const service = SERVICES.find((s) => s.id === id);

    if (!service) {
        notFound();
    }

    // Default to center if not specified (though data.ts should have it)
    // We treat "images" as mandatory now based on data update
    const layout = service.layout || "center";
    const images = service.images || ["/aura-1.png", "/aura-2.png", "/spirit-orb.png"];

    return (
        <main className="min-h-screen bg-transparent relative overflow-hidden">
            <ServiceHero title={service.title} subtitle={service.desc} />

            <div className="container mx-auto px-4 py-24 relative min-h-[800px]">

                {/* Dynamic Floating Assets - Position based on Layout */}
                {/* We render them absolutely but their positions might shift slightly or we keep them generally floating */}

                {/* Asset 1: Top Left-ish */}
                <div className="absolute top-0 left-[-5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-40 pointer-events-none animate-float">
                    <Image src={images[0]} alt="Atmosphere" fill className="object-contain mix-blend-multiply" />
                </div>

                {/* Asset 2: Bottom Right-ish */}
                <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-30 pointer-events-none animate-float animation-delay-4000">
                    <Image src={images[1]} alt="Atmosphere" fill className="object-contain mix-blend-multiply" />
                </div>

                {/* Asset 3: Floating Middle/Random */}
                <div className={`absolute top-[20%] ${layout === 'split-left' ? 'right-[5%]' : 'right-[10%]'} w-[300px] h-[300px] opacity-50 pointer-events-none animate-pulse-slow`}>
                    <Image src={images[2]} alt="Spirit" fill className="object-contain mix-blend-screen" />
                </div>


                {/* Content Container - Layout Variants */}
                <div className={`
                    relative z-10 max-w-6xl mx-auto 
                    ${layout === 'center' ? 'flex flex-col items-center text-center' : ''}
                    ${layout === 'split-left' ? 'flex flex-col md:flex-row items-center gap-12 text-left' : ''}
                    ${layout === 'split-right' ? 'flex flex-col md:flex-row-reverse items-center gap-12 text-left md:text-right' : ''}
                `}>

                    {/* Text Block */}
                    <div className={`
                        bg-white p-10 md:p-12 border border-black/10 shadow-none
                        ${layout === 'center' ? 'max-w-4xl' : 'flex-1'}
                    `}>
                        <div className={`flex flex-col gap-8 ${layout === 'center' ? 'items-center' : ''}`}>
                            <div className="flex items-center gap-4 opacity-50">
                                <span className="text-6xl text-lumina-gold font-serif italic">
                                    #{service.id}
                                </span>
                                {layout !== 'center' && <div className="h-px flex-1 bg-lumina-gold/30" />}
                            </div>

                            {layout === 'center' && <div className="w-24 h-px bg-lumina-gold opacity-50" />}

                            <p className="text-xl md:text-2xl font-sans leading-relaxed text-foreground/80">
                                {service.longDesc}
                            </p>

                            <div className="mt-4 p-6 bg-black/[0.02] border border-black/5 rounded-none relative overflow-hidden">
                                <div className={`absolute top-0 ${layout === 'split-right' ? 'right-0' : 'left-0'} w-1 h-full bg-lumina-gold`} />
                                <p className="font-mono text-xs tracking-widest uppercase text-black/40 mb-2">
                                    [ ESSENCE DETECTED ]
                                </p>
                                <p className="text-foreground/70 italic">
                                    &quot;Align your spirit with the frequency of {service.title.toLowerCase()} and witness the transformation.&quot;
                                </p>
                            </div>

                            <button className={`
                                mt-4 px-10 py-5 bg-black text-white font-bold uppercase tracking-widest hover:bg-lumina-gold hover:text-black transition-all duration-100 border border-black w-fit
                                ${layout === 'split-right' ? 'self-end' : ''}
                            `}>
                                Book Session
                            </button>
                        </div>
                    </div>

                    {/* Visual Block for Split Layouts (Optional extra imagery) */}
                    {(layout === 'split-left' || layout === 'split-right') && (
                        <div className="flex-1 hidden md:flex items-center justify-center relative h-[400px] w-full">
                            <div className="relative w-full h-full animate-float">
                                <Image
                                    src={images[0]}
                                    alt="Focus Asset"
                                    fill
                                    className="object-contain drop-shadow-2xl opacity-90"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
