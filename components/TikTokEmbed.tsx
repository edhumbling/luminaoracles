"use client";

import { useEffect, useState, useRef } from "react";

export default function TikTokEmbed() {
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
    }, []);

    return (
        <>
            <main className="min-h-screen bg-black text-foreground pt-24 md:pt-32 pb-0 px-4">
                {/* Full Width TikTok Embed Container */}
                <div
                    ref={containerRef}
                    className="w-full min-h-[calc(100vh-96px)] md:min-h-[calc(100vh-128px)] flex items-start justify-center relative"
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
                                Loading TikTok Feed...
                            </p>

                            {/* Animated Dots */}
                            <div className="flex gap-2 mt-4">
                                <span className="w-3 h-3 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-3 h-3 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    )}

                    {/* TikTok Embed Box - hidden until loaded */}
                    <blockquote
                        className="tiktok-embed"
                        cite="https://www.tiktok.com/@greatgoddessdemystic"
                        data-unique-id="greatgoddessdemystic"
                        data-embed-type="creator"
                        style={{
                            maxWidth: "780px",
                            minWidth: "288px",
                            opacity: isLoading ? 0 : 1,
                            transition: "opacity 0.5s ease-in-out"
                        }}
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
