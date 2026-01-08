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
    // Await params because in Next.js 15+ params is a Promise
    const { id } = await params;
    const service = SERVICES.find((s) => s.id === id);

    if (!service) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-transparent relative overflow-hidden">
            <ServiceHero title={service.title} subtitle={service.desc} />

            <div className="container mx-auto px-4 py-24 relative">
                {/* Spiritual Aura "Splashes" - Absolute Positioned */}
                <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] opacity-40 pointer-events-none animate-float">
                    <Image src="/aura-1.png" alt="Aura" fill className="object-contain mix-blend-multiply" />
                </div>
                <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] opacity-30 pointer-events-none animate-float animation-delay-4000">
                    <Image src="/aura-2.png" alt="Aura" fill className="object-contain mix-blend-multiply" />
                </div>
                <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] opacity-50 pointer-events-none animate-pulse-slow">
                    <Image src="/spirit-orb.png" alt="Spirit Orb" fill className="object-contain mix-blend-screen" />
                </div>

                {/* Content Container */}
                <div className="max-w-4xl mx-auto relative z-10 bg-white/60 backdrop-blur-md p-12 rounded-3xl border border-white shadow-xl">
                    <div className="flex flex-col items-center text-center gap-8">
                        <span className="text-6xl text-lumina-gold opacity-50 font-serif italic">
                            #{service.id}
                        </span>

                        <div className="w-24 h-1 bg-gradient-to-r from-lumina-cyan via-lumina-gold to-lumina-lavender" />

                        <p className="text-xl md:text-2xl font-sans leading-relaxed text-foreground/80">
                            {service.longDesc}
                        </p>

                        <div className="mt-8 p-6 bg-lumina-lavender/5 border border-lumina-lavender/20 rounded-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-lumina-lavender" />
                            <p className="font-mono text-xs tracking-widest uppercase text-lumina-lavender/80 mb-2">
                                [ ESSENCE DETECTED ]
                            </p>
                            <p className="text-foreground/70 italic">
                                &quot;Align your spirit with the frequency of {service.title.toLowerCase()} and witness the transformation.&quot;
                            </p>
                        </div>

                        <button className="mt-8 px-12 py-4 bg-gradient-to-r from-lumina-cyan to-lumina-lavender text-white font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            Book Session
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
