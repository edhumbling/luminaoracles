"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ArticleShareProps {
    title: string;
    slug: string;
}

export default function ArticleShare({ title, slug }: ArticleShareProps) {
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/blogs/${slug}` : '';

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: `Check out this article: ${title}`,
                    url: shareUrl,
                });
            } catch (error) {
                console.log("Error sharing", error);
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-lumina-gold/10 hover:bg-lumina-gold/20 border border-lumina-gold/30 rounded-full text-lumina-gold transition-all duration-300 group"
        >
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />}
            <span className="text-sm font-medium tracking-widest uppercase">
                {copied ? "Link Copied" : "Share Article"}
            </span>
        </button>
    );
}
