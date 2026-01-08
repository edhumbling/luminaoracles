"use client";

export default function LiquidBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-white">
            {/* SVG Filter for Gooey Effect */}
            <svg className="hidden">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="50" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>

            {/* Animated Blobs Container with Filter */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{ filter: "url(#goo)" }}
            >
                {/* Blob 1 - Gold */}
                <div
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-lumina-gold/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
                />

                {/* Blob 2 - Cyan */}
                <div
                    className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-lumina-cyan/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"
                />

                {/* Blob 3 - Lavender */}
                <div
                    className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-lumina-lavender/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"
                />

                {/* Blob 4 - White/Highlight */}
                <div
                    className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-lumina-white/60 rounded-full mix-blend-overlay filter blur-2xl opacity-50 animate-blob animation-delay-6000"
                />
            </div>

            {/* Subtle Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
