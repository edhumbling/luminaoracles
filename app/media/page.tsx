"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function MediaPage() {
    useEffect(() => {
        // Re-initialize TikTok embeds when component mounts
        if (typeof window !== "undefined" && (window as unknown as { tiktokEmbed?: { init: () => void } }).tiktokEmbed) {
            (window as unknown as { tiktokEmbed: { init: () => void } }).tiktokEmbed.init();
        }
    }, []);

    return (
        <main className="min-h-screen bg-background text-foreground pt-24 md:pt-32 pb-20 px-6 md:px-12 lg:px-24">
            {/* Page Header */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <span className="inline-block py-1 px-3 border border-lumina-gold/30 rounded-full text-xs font-semibold tracking-widest text-lumina-gold uppercase mb-4 bg-lumina-gold/5 backdrop-blur-sm">
                    Video Content
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-calligraffitti)] text-lumina-gold mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    TikTok Live
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Explore spiritual wisdom, mystical teachings, and divine guidance through video content from Judith Avotri.
                </p>
            </div>

            {/* TikTok Embed Container */}
            <div className="max-w-3xl mx-auto">
                <div className="bg-black/30 backdrop-blur-sm border border-lumina-gold/20 rounded-2xl p-6 md:p-10 shadow-[0_0_30px_rgba(250,204,21,0.1)]">
                    {/* TikTok Creator Embed */}
                    <blockquote
                        className="tiktok-embed"
                        cite="https://www.tiktok.com/@greatgoddessdemystic"
                        data-unique-id="greatgoddessdemystic"
                        data-embed-type="creator"
                        style={{ maxWidth: "780px", minWidth: "288px", margin: "0 auto" }}
                    >
                        <section>
                            <a
                                target="_blank"
                                href="https://www.tiktok.com/@greatgoddessdemystic?refer=creator_embed"
                                className="text-lumina-gold hover:underline"
                            >
                                @greatgoddessdemystic
                            </a>
                        </section>
                    </blockquote>
                </div>

                {/* Follow CTA */}
                <div className="text-center mt-12">
                    <a
                        href="https://www.tiktok.com/@greatgoddessdemystic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-black border border-lumina-gold/50 text-lumina-gold rounded-full hover:bg-lumina-gold/10 hover:border-lumina-gold transition-all duration-300 shadow-[0_0_15px_rgba(250,204,21,0.1)] hover:shadow-[0_0_25px_rgba(250,204,21,0.3)]"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                        Follow on TikTok
                    </a>
                </div>
            </div>

            {/* TikTok Embed Script */}
            <Script
                src="https://www.tiktok.com/embed.js"
                strategy="lazyOnload"
            />
        </main>
    );
}
