"use client";

import Script from "next/script";

export default function MediaPage() {
    return (
        <>
            {/* TikTok Embed Script - Load early for fast rendering */}
            <Script
                src="https://www.tiktok.com/embed.js"
                strategy="beforeInteractive"
            />

            <main className="min-h-screen bg-black text-foreground pt-16 md:pt-20 pb-0">
                {/* Full Width TikTok Embed Container */}
                <div className="w-full h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex items-start justify-center overflow-hidden">
                    <blockquote
                        className="tiktok-embed w-full h-full"
                        cite="https://www.tiktok.com/@greatgoddessdemystic"
                        data-unique-id="greatgoddessdemystic"
                        data-embed-type="creator"
                        style={{
                            maxWidth: "100%",
                            minWidth: "100%",
                            width: "100%",
                            height: "100%",
                            margin: 0,
                            padding: 0,
                            border: "none"
                        }}
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
            </main>

            {/* Hide footer on this page via CSS */}
            <style jsx global>{`
        footer {
          display: none !important;
        }
      `}</style>
        </>
    );
}
