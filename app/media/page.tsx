"use client";

import { useEffect } from "react";

export default function MediaPage() {
    useEffect(() => {
        // Dynamically load TikTok embed script
        const script = document.createElement("script");
        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup on unmount
            const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []);

    return (
        <>
            <main className="min-h-screen bg-black text-foreground pt-24 md:pt-32 pb-0 px-0">
                {/* Full Width TikTok Embed Container */}
                <div className="w-full min-h-[calc(100vh-96px)] md:min-h-[calc(100vh-128px)] flex items-start justify-center">
                    <blockquote
                        className="tiktok-embed"
                        cite="https://www.tiktok.com/@greatgoddessdemystic"
                        data-unique-id="greatgoddessdemystic"
                        data-embed-type="creator"
                        style={{
                            maxWidth: "780px",
                            minWidth: "288px",
                            width: "100%"
                        }}
                    >
                        <section>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.tiktok.com/@greatgoddessdemystic?refer=creator_embed"
                                className="text-lumina-gold hover:underline"
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
