import Link from "next/link";
import { SERVICES } from "@/lib/data";
import { AnimatedShader } from "@/components/animated-shader-hero";

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black/10">
                {SERVICES.map((service, index) => (
                    <Link
                        key={index}
                        href={`/services/${service.id}`}
                        className="group relative h-72 p-8 border-b border-r border-black/10 bg-white hover:bg-black transition-colors duration-0 overflow-hidden"
                    >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0 mix-blend-screen">
                            <AnimatedShader className="w-full h-full" />
                        </div>

                        {/* Hover Overlay - Sharp/Knife Edge */}
                        <div className="absolute inset-0 bg-lumina-gold/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-0 pointer-events-none z-10" />

                        <div className="relative z-20 flex flex-col justify-between h-full">
                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <span className="font-mono text-xs tracking-widest text-black/40 group-hover:text-lumina-gold font-bold transition-colors">
                                    {"//"} {service.id}
                                </span>
                                <div className="w-2 h-2 bg-black opacity-0 group-hover:opacity-100 group-hover:bg-lumina-gold transition-all duration-0" />
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-2xl font-bold uppercase tracking-tighter text-black mb-2 group-hover:text-white group-hover:translate-x-2 transition-all duration-100">
                                    {service.title}
                                </h3>
                                <p className="font-mono text-sm text-black/60 group-hover:text-white/80 line-clamp-2 transition-colors">
                                    {service.desc}
                                </p>
                            </div>

                            {/* Action Icon */}
                            <div className="self-end">
                                <span className="font-mono text-xl text-black/20 group-hover:text-lumina-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-100">
                                    ↗
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
