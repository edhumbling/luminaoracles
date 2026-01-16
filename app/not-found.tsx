import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden px-6">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lumina-gold/5 via-background to-background" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lumina-gold/5 rounded-full blur-[100px] animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-lumina-lavender/5 rounded-full blur-[80px] animate-pulse-slow delay-1000" />

            {/* Content */}
            <div className="relative z-10 text-center max-w-lg mx-auto">
                <h1 className="text-8xl md:text-9xl font-[family-name:var(--font-calligraffitti)] text-lumina-gold/20 select-none">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-calligraffitti)] text-lumina-gold mb-6 -mt-8 relative z-20">
                    Path Not Found
                </h2>

                <p className="text-foreground/60 font-light leading-relaxed mb-8">
                    The path you are seeking has faded into the mist. <br />
                    Sometimes, getting lost is just another way of finding a new direction.
                </p>

                <div className="flex flex-col items-center gap-4">
                    <Link
                        href="/"
                        className="px-8 py-3 rounded-full bg-lumina-gold/10 border border-lumina-gold/30 text-lumina-gold hover:bg-lumina-gold/20 hover:scale-105 transition-all duration-300 uppercase tracking-widest text-xs font-medium shadow-[0_0_20px_rgba(250,204,21,0.1)]"
                    >
                        Return Home
                    </Link>

                    <Link
                        href="/contact"
                        className="text-xs uppercase tracking-widest text-foreground/40 hover:text-lumina-gold transition-colors duration-300"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>

            {/* Spiritual Decorative Element */}
            <div className="absolute bottom-12 flex items-center gap-4 opacity-20">
                <div className="h-px w-12 bg-lumina-gold" />
                <span className="text-lumina-gold text-lg">✨</span>
                <div className="h-px w-12 bg-lumina-gold" />
            </div>
        </div>
    );
}
