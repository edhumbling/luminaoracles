"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function MistOverlay() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden mix-blend-screen opacity-60">
            {/* Layer 1: Slow Drifting Fog */}
            <div className="absolute inset-0 animate-drift-slow opacity-50">
                <Image
                    src="/fog-texture.png"
                    alt="Heavenly Mist"
                    fill
                    className="object-cover scale-150"
                    priority
                />
            </div>

            {/* Layer 2: Faster Drifting Fog (Parallax) */}
            <div className="absolute inset-0 animate-drift-medium opacity-30 animation-delay-2000">
                <Image
                    src="/fog-texture.png"
                    alt="Heavenly Mist Layer 2"
                    fill
                    className="object-cover scale-125 translate-x-10"
                />
            </div>

            {/* Cleansing Cycle: Controls visibility of the entire mist container */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent animate-mist-cycle" />
        </div>
    );
}
