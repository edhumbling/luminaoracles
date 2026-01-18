"use client";

import { useEffect, useState, useRef } from "react";

export default function TikTokEmbed() {
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const [hasIntersected, setHasIntersected] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setHasIntersected(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" } // Start loading a bit before it comes into view
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!hasIntersected) return;

        // Dynamically load TikTok embed script
        const script = document.createElement("script");
        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;

        document.body.appendChild(script);

        // Use MutationObserver to detect when TikTok actually renders the embed
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    // Check if TikTok iframe or embed container has been added
                    const container = containerRef.current;
                    if (container) {
                        const iframe = container.querySelector('iframe');
                        const tiktokContainer = container.querySelector('[class*="tiktok"]');
                        if (iframe || (tiktokContainer && tiktokContainer.children.length > 1)) {
                            // Add a small delay to ensure full render
                            setTimeout(() => setIsLoading(false), 500);
                            observer.disconnect();
                            return;
                        }
                    }
                }
            }
        });

        // Start observing
        if (containerRef.current) {
            observer.observe(containerRef.current, {
                childList: true,
                subtree: true,
                attributes: true
            });
        }

        // Fallback timeout in case observer doesn't trigger (max 8 seconds)
        const fallbackTimeout = setTimeout(() => {
            setIsLoading(false);
            observer.disconnect();
        }, 8000);

        return () => {
            observer.disconnect();
            clearTimeout(fallbackTimeout);
            const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, [hasIntersected]);

    return (
        <>
            <main className="min-h-screen bg-black text-foreground pt-24 md:pt-32 pb-0 px-4">
                {/* Full Width TikTok Embed Container */}
                <div
                    ref={containerRef}
                    className="w-full flex flex-col items-center gap-12 relative pb-20"
                >

                    {/* Colorful Loading Animation - Fixed centered overlay */}
                    <div className={`fixed inset-0 flex flex-col items-center justify-center z-50 bg-black transition-all duration-700 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        {/* Animated Gradient Orb */}
                        <div className="relative w-32 h-32 mb-8">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-spin blur-lg opacity-60" />
                            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 animate-pulse" />
                            <div className="absolute inset-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]">
                                <svg className="w-12 h-12 text-white fill-current drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] ml-1" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>

                        {/* Loading Text */}
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 font-semibold text-lg animate-pulse tracking-wide">
                            Loading Media...
                        </p>

                        {/* Animated Dots */}
                        <div className="flex gap-2 mt-4">
                            <span className="w-3 h-3 rounded-full bg-pink-500 animate-bounce" />
                            <span className="w-3 h-3 rounded-full bg-purple-500 animate-bounce [animation-delay:150ms]" />
                            <span className="w-3 h-3 rounded-full bg-cyan-500 animate-bounce [animation-delay:300ms]" />
                        </div>
                    </div>

                    {/* TikTok Channels Row */}
                    <div className="flex flex-col md:flex-row items-start justify-center gap-8">
                        {/* Main Channel */}
                        <div className={`transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'} flex flex-col items-center`}>
                            <h2 className="text-lumina-gold font-serif text-xl mb-4 uppercase tracking-widest">Main Channel</h2>
                            <blockquote
                                className="tiktok-embed max-w-[780px] min-w-[288px]"
                                cite="https://www.tiktok.com/@greatgoddessdemystic"
                                data-unique-id="greatgoddessdemystic"
                                data-embed-type="creator"
                            >
                                <section>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://www.tiktok.com/@greatgoddessdemystic?refer=creator_embed"
                                    >
                                        @greatgoddessdemystic
                                    </a>
                                </section>
                            </blockquote>
                        </div>

                        {/* Backup Channel */}
                        <div className={`transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'} flex flex-col items-center`}>
                            <h2 className="text-white/60 font-serif text-xl mb-4 uppercase tracking-widest">Backup Channel</h2>
                            <blockquote
                                className="tiktok-embed max-w-[780px] min-w-[288px]"
                                cite="https://www.tiktok.com/@great.goddesses.r"
                                data-unique-id="great.goddesses.r"
                                data-embed-type="creator"
                            >
                                <section>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://www.tiktok.com/@great.goddesses.r?refer=creator_embed"
                                    >
                                        @great.goddesses.r
                                    </a>
                                </section>
                            </blockquote>
                        </div>
                    </div>

                    {/* YouTube Channel - Horizontal Card Below TikTok */}
                    <div className={`transition-opacity duration-1000 ease-in-out ${isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'} w-full max-w-3xl px-4`}>
                        <h2 className="text-[#FF0000] font-serif text-xl mb-4 uppercase tracking-widest flex items-center justify-center gap-2">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                            </svg>
                            YouTube
                        </h2>

                        <a
                            href="https://www.youtube.com/@priestess-c5l?sub_confirmation=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#0f0f0f] rounded-xl overflow-hidden shadow-2xl border border-white/5 hover:border-[#FF0000]/30 transition-all duration-300 flex flex-col md:flex-row group"
                        >
                            {/* Left: Avatar & Channel Info */}
                            <div className="flex items-center gap-4 p-6 md:w-1/2 border-b md:border-b-0 md:border-r border-white/10">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF0000] to-[#990000] flex items-center justify-center text-white text-3xl font-bold flex-shrink-0 group-hover:scale-105 transition-transform">
                                    G
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-medium text-xl flex items-center gap-2">
                                        Great Goddess
                                        <span className="text-[#aaa] bg-white/10 rounded-full p-0.5" title="Verified">
                                            <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                                        </span>
                                    </h3>
                                    <p className="text-[#aaa] text-sm">@priestess-c5l • Spiritual Insights & Guidance</p>
                                    <button className="mt-3 bg-white text-black font-medium text-sm px-6 py-2 rounded-full hover:bg-[#d9d9d9] transition-colors">
                                        Subscribe
                                    </button>
                                </div>
                            </div>

                            {/* Right: Description & CTA */}
                            <div className="flex flex-col justify-center p-6 md:w-1/2 bg-[#1a1a1a]">
                                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                                    Join the Great Goddess on YouTube for exclusive spiritual teachings, guided meditations, and transformative content to elevate your journey.
                                </p>
                                <span className="text-[#FF0000] text-sm font-medium group-hover:underline">
                                    Visit Channel &rarr;
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
            </main>

            {/* Hide footer on this page only */}
            <style jsx global>{`
        footer {
          display: none !important;
        }
      `}</style>
        </>
    );
}
