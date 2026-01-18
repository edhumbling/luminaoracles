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
                    className="w-full min-h-[calc(100vh-96px)] md:min-h-[calc(100vh-128px)] flex flex-col md:flex-row items-start justify-center gap-8 relative pb-20 overflow-y-auto"
                >

                    {/* Colorful Loading Animation */}
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black">
                            {/* Animated Gradient Orb */}
                            <div className="relative w-32 h-32 mb-8">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-spin blur-lg opacity-60" />
                                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 animate-pulse" />
                                <div className="absolute inset-4 rounded-full bg-black flex items-center justify-center">
                                    <svg className="w-12 h-12 text-white animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Loading Text */}
                            <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 font-semibold text-lg animate-pulse">
                                Loading TikTok Feeds...
                            </p>

                            {/* Animated Dots */}
                            <div className="flex gap-2 mt-4">
                                <span className="w-3 h-3 rounded-full bg-pink-500 animate-bounce" />
                                <span className="w-3 h-3 rounded-full bg-purple-500 animate-bounce [animation-delay:150ms]" />
                                <span className="w-3 h-3 rounded-full bg-cyan-500 animate-bounce [animation-delay:300ms]" />                            </div>
                        </div>
                    )}

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

                    {/* YouTube Channel */}
                    <div className={`transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'} flex flex-col items-center`}>
                        <h2 className="text-[#FF0000] font-serif text-xl mb-4 uppercase tracking-widest flex items-center gap-2">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                            </svg>
                            YouTube
                        </h2>
                        <a
                            href="https://youtube.com/@priestess-c5l?si=jtjkbWQJJDDO4qxB"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 w-[325px] flex flex-col items-center gap-4 hover:border-[#FF0000]/50 hover:shadow-[0_0_30px_-10px_rgba(255,0,0,0.3)] transition-all duration-300 group"
                        >
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF0000] to-[#cc0000] flex items-center justify-center mb-2 shadow-lg group-hover:scale-110 transition-transform">
                                <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <h3 className="text-white font-serif text-xl mb-1">Priestess C5L</h3>
                                <p className="text-white/60 text-sm">Official YouTube Channel</p>
                            </div>
                            <button className="mt-2 text-xs uppercase tracking-widest text-white bg-[#FF0000] hover:bg-[#cc0000] px-6 py-2 rounded-full transition-colors font-medium">
                                Subscribe / Watch
                            </button>
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
