export default function Footer() {
    return (
        <footer className="relative w-full h-[80vh] min-h-[600px] overflow-hidden flex items-center justify-center bg-black">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60"
            >
                <source src="https://ik.imagekit.io/humbling/Flow.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Gradient Overlay for seamless integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-20" />

            {/* Content Content */}
            <div className="relative z-10 w-full text-center mix-blend-overlay mb-24 md:mb-40">
                <h1 className="text-[25vw] font-bold leading-none text-white tracking-tighter select-none animate-pulse-slow font-sans opacity-80">
                    Flow
                </h1>
            </div>

            {/* Subtle copyright/links at bottom */}
            <div className="absolute bottom-8 w-full text-center z-20">
                <p className="text-white/30 text-xs tracking-[0.3em] font-mono uppercase">
                    Lumina Oracles © {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
}
