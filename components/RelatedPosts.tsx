"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog-data";

interface RelatedPostsProps {
    posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
    if (posts.length === 0) return null;

    return (
        <div className="mt-24 border-t border-white/10 pt-16">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <span className="text-lumina-gold text-xs uppercase tracking-[0.2em] mb-2 block">Keep Reading</span>
                    <h3 className="text-3xl text-white font-serif font-light">Related Wisdom</h3>
                </div>
                <Link
                    href="/blogs"
                    className="hidden md:flex text-xs uppercase tracking-widest text-white/50 hover:text-lumina-gold transition-colors items-center gap-2"
                >
                    View All <span className="text-lg">→</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/blogs/${post.slug}`}
                        className="group relative flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-sm overflow-hidden hover:border-lumina-gold/50 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(250,204,21,0.1)]"
                    >
                        {/* Card Image Area */}
                        <div className="relative h-48 w-full overflow-hidden bg-black">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] uppercase tracking-widest text-lumina-gold border border-lumina-gold/20">
                                {post.category}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-5 flex flex-col">
                            <span className="text-[10px] text-white/40 font-mono tracking-wider mb-3 uppercase">
                                {post.date}
                            </span>
                            <h4 className="text-lg font-serif font-medium text-white group-hover:text-lumina-gold transition-colors duration-300 leading-snug mb-3 line-clamp-2">
                                {post.title}
                            </h4>
                            <p className="text-xs text-white/60 line-clamp-3 mb-4 flex-1 leading-relaxed font-light">
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

            <div className="mt-8 md:hidden text-center">
                <Link
                    href="/blogs"
                    className="inline-flex text-xs uppercase tracking-widest text-white/50 hover:text-lumina-gold transition-colors items-center gap-2"
                >
                    View All Articles <span className="text-lg">→</span>
                </Link>
            </div>
        </div>
    );
}
