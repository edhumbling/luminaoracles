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
            <div className="relative z-10 w-full text-center mix-blend-overlay mb-40 md:mb-80">
                <h1 className="text-[25vw] font-bold leading-none text-white tracking-tighter select-none animate-pulse-slow font-sans opacity-80">
                    Flow
                </h1>
            </div>

            {/* Subtle copyright/links at bottom */}
            {/* Subtle copyright/links at bottom */}
            <div className="absolute bottom-8 w-full text-center z-20 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-white/50 text-sm font-mono tracking-widest">
                    <a href="tel:+233201639414" className="hover:text-lumina-gold transition-colors">+233 20 163 9414</a>
                    <span className="hidden md:inline text-lumina-gold/30">•</span>
                    <a href="tel:+233241343329" className="hover:text-lumina-gold transition-colors">+233 24 134 3329</a>
                </div>
                <p className="text-white/30 text-xs tracking-[0.3em] font-mono uppercase">
                    Lumina Oracles © {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
}
