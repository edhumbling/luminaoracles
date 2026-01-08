import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/data";

export default function ServiceGrid() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Ethereal Section Header */}
            <div className="container mx-auto px-4 mb-16 flex flex-col items-center justify-center text-center">
                <span className="text-lumina-lavender font-mono text-xs tracking-widest uppercase mb-4">Discover Your Path</span>
                <h2 className="text-4xl md:text-6xl font-thin uppercase text-foreground">
                    Divine <span className="text-lumina-gold font-normal">Services</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-lumina-cyan to-transparent mt-6 opacity-30" />
            </div>

            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES.map((service) => (
                    <Link
                        href={`/services/${service.id}`}
                        key={service.id}
                        className="group relative p-8 bg-white border border-white shadow-sm hover:shadow-[0_10px_40px_rgba(6,182,212,0.1)] hover:border-lumina-cyan/30 rounded-2xl transition-all duration-500 overflow-hidden"
                    >
                        {/* Hover Aura Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                            <Image
                                src="/aura-glow.png"
                                alt="Aura"
                                fill
                                className="object-cover opacity-60 mix-blend-multiply"
                            />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                            <div className="flex justify-between items-start">
                                <span className="font-serif italic text-lumina-lavender/70 text-lg">#{service.id}</span>
                                <div className="w-2 h-2 bg-lumina-gold/30 group-hover:bg-lumina-gold group-hover:shadow-[0_0_15px_#fbbf24] transition-all duration-500 rounded-full" />
                            </div>

                            <div>
                                <h3 className="text-xl font-medium tracking-wide mb-3 text-foreground group-hover:text-lumina-cyan transition-colors">
                                    {service.title}
                                </h3>
                                <p className="font-sans text-sm text-foreground/60 group-hover:text-foreground/80 leading-relaxed">
                                    {service.desc}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
