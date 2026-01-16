import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/blog-data";

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
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                    {BLOG_POSTS.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blogs/${post.slug}`}
                            className="group relative flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-sm overflow-hidden hover:border-lumina-gold/50 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(250,204,21,0.1)]"
                        >
                            {/* Card Image Area with Actual Thumbnail */}
                            <div className="relative h-32 md:h-40 w-full overflow-hidden bg-black">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] uppercase tracking-widest text-lumina-gold border border-lumina-gold/20">
                                    {post.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-4 md:p-5 flex flex-col">
                                <span className="text-[10px] text-white/40 font-mono tracking-wider mb-2 uppercase">
                                    {post.date}
                                </span>
                                <h2 className="text-sm md:text-base font-serif font-medium text-white group-hover:text-lumina-gold transition-colors duration-300 leading-snug mb-3 line-clamp-3">
                                    {post.title}
                                </h2>
                                <p className="text-xs text-white/60 line-clamp-3 mb-4 flex-1 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                    <span className="text-[10px] text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                                        Read Article
                                    </span>
                                    <span className="text-lumina-gold transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 text-xs">
                                        →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
