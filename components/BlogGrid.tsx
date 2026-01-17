"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Filter } from "lucide-react";
import { BlogPost } from "@/lib/blog-data";

interface BlogGridProps {
    posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    // Derive unique categories from posts
    const categories = useMemo(() => {
        const cats = new Set(posts.map((p) => p.category));
        return Array.from(cats).sort();
    }, [posts]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter Algorithm
    const filteredPosts = useMemo(() => {
        let results = [...posts];

        // 1. Category Filter
        if (selectedCategory) {
            results = results.filter((p) => p.category === selectedCategory);
        }

        // 2. Search Filter (Weighted Algorithm)
        if (searchQuery.trim()) {
            const terms = searchQuery
                .toLowerCase()
                .split(/\s+/)
                .filter((t) => t.length > 0);

            results = results
                .map((post) => {
                    let score = 0;
                    const title = post.title.toLowerCase();
                    const excerpt = post.excerpt.toLowerCase();
                    const content = post.content.toLowerCase(); // Heavy Search
                    const tags = post.tags.map((t) => t.toLowerCase());

                    terms.forEach((term) => {
                        // Title Match (Highest Priority)
                        if (title.includes(term)) score += 10;
                        // Tag Match (High Priority)
                        if (tags.some((tag) => tag.includes(term))) score += 5;
                        // Excerpt Match (Medium Priority)
                        if (excerpt.includes(term)) score += 3;
                        // Content Match (Low Priority - ensure deep search matches)
                        if (content.includes(term)) score += 1;
                    });

                    return { post, score };
                })
                .filter((item) => item.score > 0)
                .sort((a, b) => b.score - a.score) // Sort by relevance
                .map((item) => item.post);
        }

        // Default Sort: Newest First
        if (!searchQuery.trim()) {
            results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }

        return results;
    }, [posts, searchQuery, selectedCategory]);

    return (
        <div className="w-full">
            {/* Search & Filter Bar */}
            <div className="mb-16 flex flex-col items-center gap-6">
                {/* Search Input - Centered and Long */}
                <div className="relative w-full max-w-2xl group z-50">
                    <div className="absolute inset-0 bg-lumina-gold/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-lumina-gold transition-colors" />
                    <input
                        type="text"
                        placeholder="Search for wisdom..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-32 text-white placeholder:text-white/30 focus:outline-none focus:border-lumina-gold/50 focus:bg-black/40 transition-all backdrop-blur-md font-light tracking-wide text-base shadow-lg"
                    />

                    {/* Right Side Actions */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        {/* Clear Search */}
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="p-2 hover:text-white text-white/50 transition-colors"
                                aria-label="Clear search"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}

                        {/* Divider */}
                        <div className="w-px h-6 bg-white/10" />

                        {/* Filter Button */}
                        <div className="relative" ref={filterRef}>
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`p-2 rounded-full transition-all duration-300 flex items-center gap-2 pr-4 ${isFilterOpen || selectedCategory
                                    ? "text-lumina-gold bg-lumina-gold/10"
                                    : "text-white/50 hover:text-white"
                                    }`}
                            >
                                <Filter className="w-5 h-5" />
                                <span className="text-xs uppercase tracking-widest font-medium hidden sm:block">
                                    {selectedCategory ? "Filtered" : "Filter"}
                                </span>
                            </button>

                            {/* Dropdown Menu */}
                            {isFilterOpen && (
                                <div className="absolute right-0 top-full mt-4 w-64 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="p-2">
                                        <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-white/30 font-semibold">
                                            Select Category
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedCategory(null);
                                                setIsFilterOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between ${!selectedCategory
                                                ? "bg-lumina-gold/10 text-lumina-gold"
                                                : "text-white/70 hover:bg-white/5 hover:text-white"
                                                }`}
                                        >
                                            <span>All Categories</span>
                                            {!selectedCategory && <span className="w-1.5 h-1.5 rounded-full bg-lumina-gold" />}
                                        </button>
                                        <div className="my-1 border-t border-white/5" />
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => {
                                                    setSelectedCategory(selectedCategory === cat ? null : cat);
                                                    setIsFilterOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between ${selectedCategory === cat
                                                    ? "bg-lumina-gold/10 text-lumina-gold"
                                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                                                    }`}
                                            >
                                                <span>{cat}</span>
                                                {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-lumina-gold" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Active Filter Indicator */}
                {selectedCategory && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-lumina-gold/10 border border-lumina-gold/20 text-lumina-gold text-xs uppercase tracking-widest hover:bg-lumina-gold/20 transition-colors group"
                        >
                            <span>{selectedCategory}</span>
                            <X className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                        </button>
                    </div>
                )}
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
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
                    ))
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <Search className="w-6 h-6 text-white/30" />
                        </div>
                        <h3 className="text-xl text-white font-light mb-2">No wisdom found</h3>
                        <p className="text-white/50 text-sm max-w-xs mx-auto mb-6">
                            We couldn't find any articles matching "{searchQuery}". Try a different term or category.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory(null) }}
                            className="px-6 py-2 bg-lumina-gold text-black uppercase tracking-widest text-xs font-medium rounded hover:bg-white transition-colors shadow-lg"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
