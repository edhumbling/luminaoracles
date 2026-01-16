import { SERVICES } from "@/lib/data";
import ServiceHeader from "@/components/ServiceHeader";
import { notFound } from "next/navigation";
import Link from "next/link";

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

    // Get related services (different from current, limit to 3)
    const relatedServices = SERVICES.filter(s => s.id !== service.id).slice(0, 3);

    return (
        <main className="min-h-screen bg-white text-black">
            {/* Dynamic Shader Header */}
            <ServiceHeader
                title={service.title}
                divineEssence={divineEssence}
                shaderIndex={shaderIndex}
            />

            {/* Main Content Area */}
            <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 max-w-7xl">

                {/* Hero Summary Section */}
                <section className="mb-16 md:mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                        <div className="md:col-span-8">
                            <h2 className="text-3xl md:text-5xl font-light text-black leading-tight mb-6">
                                {uniqueness}
                            </h2>
                            <p className="text-lg md:text-xl text-black/70 leading-relaxed">
                                {service.longDesc} This sacred practice is designed to bring you into alignment with your highest self, guiding you through the veils of illusion to find clarity, purpose, and profound inner peace.
                            </p>
                        </div>
                        <div className="md:col-span-4 flex flex-col gap-4">
                            <div className="bg-zinc-50 border border-black/10 p-6 rounded-lg">
                                <span className="block font-mono text-xs text-black/50 uppercase tracking-widest mb-2">Service ID</span>
                                <span className="text-4xl font-mono text-lumina-gold">#{service.id}</span>
                            </div>
                            <div className="bg-zinc-50 border border-black/10 p-6 rounded-lg">
                                <span className="block font-mono text-xs text-black/50 uppercase tracking-widest mb-2">Category</span>
                                <span className="text-lg text-black font-medium">Spiritual Technology</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mb-16 md:mb-24" />

                {/* Detailed Content Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-24">

                    {/* The Healing */}
                    <div className="bg-gradient-to-br from-lumina-gold/5 to-transparent border border-lumina-gold/20 p-8 rounded-lg">
                        <div className="w-12 h-12 bg-lumina-gold/10 rounded-full flex items-center justify-center mb-6">
                            <span className="text-2xl">✨</span>
                        </div>
                        <h3 className="text-xl font-mono uppercase text-lumina-gold tracking-widest mb-4">
                            The Healing
                        </h3>
                        <p className="text-black/80 leading-relaxed">
                            {healingStart}
                        </p>
                    </div>

                    {/* The Core Method */}
                    <div className="bg-gradient-to-br from-zinc-100 to-transparent border border-black/10 p-8 rounded-lg">
                        <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mb-6">
                            <span className="text-2xl">🌀</span>
                        </div>
                        <h3 className="text-xl font-mono uppercase text-black/70 tracking-widest mb-4">
                            The Core Method
                        </h3>
                        <p className="text-black/80 leading-relaxed">
                            {service.longDesc} Through ancient techniques passed down through generations, this method bridges the gap between the seen and unseen worlds.
                        </p>
                    </div>

                    {/* The Transformation */}
                    <div className="bg-gradient-to-br from-lumina-lavender/10 to-transparent border border-lumina-lavender/20 p-8 rounded-lg">
                        <div className="w-12 h-12 bg-lumina-lavender/10 rounded-full flex items-center justify-center mb-6">
                            <span className="text-2xl">🦋</span>
                        </div>
                        <h3 className="text-xl font-mono uppercase text-lumina-lavender tracking-widest mb-4">
                            The Transformation
                        </h3>
                        <p className="text-black/80 leading-relaxed">
                            Experience profound shifts in consciousness as old patterns dissolve and new pathways of light open within your being. This is a journey of becoming.
                        </p>
                    </div>
                </section>

                {/* What to Expect Section */}
                <section className="mb-16 md:mb-24">
                    <div className="border border-black/10 rounded-lg overflow-hidden">
                        <div className="bg-black text-white p-6 md:p-8">
                            <h3 className="text-2xl md:text-3xl font-light">What to Expect</h3>
                        </div>
                        <div className="p-6 md:p-8 bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-mono text-sm uppercase tracking-widest text-lumina-gold mb-4">Before Your Session</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 bg-lumina-gold rounded-full mt-2 flex-shrink-0"></span>
                                            <span className="text-black/80">Set a clear intention for what you wish to receive</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 bg-lumina-gold rounded-full mt-2 flex-shrink-0"></span>
                                            <span className="text-black/80">Create a quiet, sacred space free from distractions</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 bg-lumina-gold rounded-full mt-2 flex-shrink-0"></span>
                                            <span className="text-black/80">Prepare any questions or concerns you wish to address</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 bg-lumina-gold rounded-full mt-2 flex-shrink-0"></span>
                                            <span className="text-black/80">Open your heart and mind to receive divine guidance</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-mono text-sm uppercase tracking-widest text-lumina-gold mb-4">During Your Session</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 bg-lumina-gold rounded-full mt-2 flex-shrink-0"></span>
                                            <span className="text-black/80">Deep energetic connection and attunement</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 bg-lumina-gold rounded-full mt-2 flex-shrink-0"></span>
                                            <span className="text-black/80">Channeled messages from higher dimensions</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 bg-lumina-gold rounded-full mt-2 flex-shrink-0"></span>
                                            <span className="text-black/80">Practical guidance you can apply immediately</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 bg-lumina-gold rounded-full mt-2 flex-shrink-0"></span>
                                            <span className="text-black/80">Energy clearing and healing transmissions</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quote Section */}
                <section className="mb-16 md:mb-24">
                    <div className="bg-gradient-to-r from-lumina-gold/5 via-lumina-gold/10 to-lumina-gold/5 border-l-4 border-lumina-gold p-8 md:p-12">
                        <blockquote className="text-2xl md:text-3xl font-serif italic text-black/80 leading-relaxed">
                            &quot;Precise alignment with the divine frequency of {service.title} opens doorways to realms of infinite possibility and profound healing.&quot;
                        </blockquote>
                        <cite className="block mt-6 text-sm font-mono uppercase tracking-widest text-lumina-gold">
                            — The Oracle of Lumina
                        </cite>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="mb-16 md:mb-24">
                    <div className="bg-black text-white p-8 md:p-12 rounded-lg text-center">
                        <h3 className="text-2xl md:text-4xl font-light mb-4">Ready to Begin Your Journey?</h3>
                        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                            Take the first step towards spiritual transformation. Book your {service.title.toLowerCase()} session and awaken to your divine potential.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-lumina-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300"
                            >
                                Book Now
                            </Link>
                            <a
                                href="https://wa.me/233241343329"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors duration-300"
                            >
                                WhatsApp Us
                            </a>
                        </div>
                    </div>
                </section>

                {/* Related Services */}
                <section>
                    <h3 className="text-xl font-mono uppercase tracking-widest text-black/50 mb-8">
                        Explore Other Services
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedServices.map((related) => (
                            <Link
                                key={related.id}
                                href={`/services/${related.id}`}
                                className="group border border-black/10 p-6 rounded-lg hover:border-lumina-gold/50 hover:bg-lumina-gold/5 transition-all duration-300"
                            >
                                <span className="block font-mono text-xs text-lumina-gold mb-2">#{related.id}</span>
                                <h4 className="text-xl font-medium text-black group-hover:text-lumina-gold transition-colors mb-2">
                                    {related.title}
                                </h4>
                                <p className="text-black/60 text-sm">{related.desc}</p>
                            </Link>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}