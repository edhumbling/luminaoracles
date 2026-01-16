"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BlogBackButton() {
    const router = useRouter();

    const handleBack = () => {
        // If we have history, go back to preserve scroll position
        // Otherwise fallback to explicit navigation (though router.back() usually handles history)
        // For a strict "Back to Blogs" feature, ideally we only go back if previous page was blogs.
        // But standard "Back" behavior is usually expected to restore scroll.

        // Check if we can go back, otherwise push to /blogs? 
        // In a simple implementing, router.back() is the direct answer to "restore scroll position".
        router.back();
    };

    return (
        <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/70 hover:text-lumina-gold transition-colors group bg-black/40 backdrop-blur-md pr-4 rounded-full border border-white/10 cursor-pointer"
            aria-label="Back to blogs"
        >
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-lumina-gold transition-colors">
                <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-sm uppercase tracking-widest font-mono">Back to Blogs</span>
        </button>
    );
}
