import Image from "next/image";
import { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import TestimonialGrid from "@/components/TestimonialGrid";

export const metadata: Metadata = {
    title: "Wall of Love | Lumina Oracles",
    description: "Echoes of gratitude from our sacred community. Read testimonials from those who have been touched by the divine guidance of Mamaga Judith Etornam.",
    openGraph: {
        title: "Wall of Love | Lumina Oracles",
        description: "Echoes of gratitude from our sacred community. Read testimonials from those who have been touched by the divine guidance of Mamaga Judith Etornam.",
        images: ["/og-wall-of-love.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Wall of Love | Lumina Oracles",
        description: "Echoes of gratitude from our sacred community.",
        images: ["/og-wall-of-love.png"],
    },
};

export default function WallOfLovePage() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/wall_of_love_hero.png"
                    alt="Cosmic Love Energy"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-thin tracking-tighter text-white drop-shadow-[0_0_30px_rgba(250,204,21,0.6)] mb-4">
                        Wall of <span className="font-normal text-lumina-gold font-[family-name:var(--font-calligraffitti)]">Love</span>
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
                        Echoes of gratitude from our sacred community.
                    </p>
                </div>
            </section>

            {/* Client-side Interactive Grid */}
            <TestimonialGrid />

            {/* reuse contact section for consistent CTA */}
            <ContactSection />
        </main>
    );
}
