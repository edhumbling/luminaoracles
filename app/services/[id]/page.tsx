import { SERVICES } from "@/lib/data";
import ServiceHeader from "@/components/ServiceHeader";
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

    // Default fallbacks if data is missing during transition
    const divineEssence = service.divineEssence || "Divine Essence";
    const uniqueness = service.uniqueness || service.longDesc;
    const healingStart = service.healingStart || "Restores balance.";
    const shaderIndex = service.shaderIndex ?? 0;

    return (
        <main className="min-h-screen bg-white text-black">
            {/* Dynamic Shader Header */}
            <ServiceHeader
                title={service.title}
                divineEssence={divineEssence}
                shaderIndex={shaderIndex}
            />

            {/* Sharp Body Layout */}
            <div className="container mx-auto px-4 md:px-0 py-16 md:py-24 max-w-7xl">

                {/* Intro Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-black/20 border-b">

                    {/* Metadata Column */}
                    <div className="md:col-span-4 border-r border-black/20 p-8 md:p-12 flex flex-col gap-8 bg-zinc-50">
                        <div>
                            <span className="block font-mono text-xs text-black/50 uppercase tracking-widest mb-2">ID_REF</span>
                            <span className="text-3xl font-mono text-lumina-gold">#{service.id}</span>
                        </div>

                        <div>
                            <span className="block font-mono text-xs text-black/50 uppercase tracking-widest mb-2">Category</span>
                            <span className="text-lg text-black font-medium">Spiritual Technology</span>
                        </div>

                        <div className="mt-auto">
                            <button className="w-full py-4 bg-lumina-gold text-white font-bold uppercase tracking-widest hover:bg-black transition-colors duration-300 sharp-corners">
                                Initiate
                            </button>
                        </div>
                    </div>

                    {/* Uniqueness & Content Column */}
                    <div className="md:col-span-8 p-8 md:p-16 flex flex-col gap-12">

                        {/* Uniqueness Section */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-mono uppercase text-lumina-gold tracking-widest">
                                [ The Uniqueness ]
                            </h3>
                            <p className="text-xl md:text-3xl font-light leading-relaxed text-black/90">
                                {uniqueness}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-black/10" />

                        {/* Healing Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <h3 className="text-sm font-mono uppercase text-black/50 tracking-widest">
                                    [ The Healing ]
                                </h3>
                                <p className="text-lg text-black/80 leading-relaxed">
                                    {healingStart}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-mono uppercase text-black/50 tracking-widest">
                                    [ The Core Method ]
                                </h3>
                                <p className="text-lg text-black/80 leading-relaxed">
                                    {service.longDesc}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer Quote / Sharp Box */}
                <div className="mt-0 border-x border-b border-black/20 p-8 md:p-12 text-center bg-zinc-50">
                    <p className="font-serif italic text-black/60 text-lg md:text-xl">
                        &quot;Precise alignment with the divine frequency of {service.title}.&quot;
                    </p>
                </div>

            </div>
        </main>
    );
}
