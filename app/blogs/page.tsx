import Image from "next/image";
import { BLOG_POSTS } from "@/lib/blog-data";
import BlogGrid from "@/components/BlogGrid";

export const metadata = {
    title: "Mystical Wisdom Blog | Lumina Oracles",
    description: "Explore secrets of the universe, ancient wisdom, and spiritual guidance.",
};

export default function BlogsPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-lumina-gold selection:text-black">
            {/* Sharper Design Header with Parallax Feel */}
            <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <Image
                    src="/blog-header.png"
                    alt="Mystical Ancient Library"
                    fill
                    className="object-cover object-center scale-105 animate-pulse-slow"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />

                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4">
                    <span className="text-lumina-gold font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        The Sacred Archives
                    </span>
                    <h1 className="text-5xl md:text-8xl font-[family-name:var(--font-calligraffitti)] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mb-6">
                        Mystical Wisdom
                    </h1>
                    <p className="max-w-xl mx-auto text-white/80 text-lg md:text-xl font-light tracking-wide leading-relaxed drop-shadow-md">
                        Unlock the secrets of the universe through ancient knowledge and divine insights.
                    </p>
                </div>
            </div>

            {/* Blog Grid Section */}
            <section className="container mx-auto px-4 py-16 md:py-24 relative z-40 -mt-20">
                <BlogGrid posts={BLOG_POSTS} />
            </section>
        </main>
    );
}
