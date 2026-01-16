"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/blogs", label: "Blogs" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    const socialLinks = [
        {
            href: "https://www.tiktok.com/@greatgoddessdemystic?_r=1&_t=ZS-92w5SVgScbY",
            label: "TikTok",
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
            ),
        },
        {
            href: "mailto:goddessgreat16@gmail.com",
            label: "Email",
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
            ),
        },
        {
            href: "https://wa.me/233241343329",
            label: "WhatsApp",
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="relative w-full min-h-[80vh] overflow-hidden flex flex-col bg-black">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-40"
            >
                <source src="https://ik.imagekit.io/humbling/Flow.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-30" />

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 py-16">
                {/* Large Text Effect */}
                <div className="text-center mix-blend-overlay mb-16">
                    <h2 className="text-[20vw] md:text-[18vw] font-bold leading-none text-white tracking-tighter select-none animate-pulse-slow font-sans opacity-60">
                        Flow
                    </h2>
                </div>

                {/* Footer Navigation Grid */}
                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

                    {/* Logo & Brand */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <Link href="/" className="relative w-20 h-20 group">
                            <div className="absolute inset-0 bg-lumina-gold/20 blur-[25px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Image
                                src="/logo.png"
                                alt="Lumina Oracles Logo"
                                fill
                                className="object-contain drop-shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-transform duration-500 group-hover:scale-110"
                            />
                        </Link>
                        <p className="text-white/50 text-sm font-light tracking-wide text-center md:text-left max-w-xs">
                            Connect to your higher self with heavenly light and divine guidance.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col items-center gap-4">
                        <h3 className="text-lumina-gold font-[family-name:var(--font-calligraffitti)] text-xl mb-2">
                            Navigate
                        </h3>
                        <nav className="flex flex-col items-center gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-white/60 hover:text-lumina-gold text-sm uppercase tracking-[0.2em] transition-colors duration-300"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Social & Contact */}
                    <div className="flex flex-col items-center md:items-end gap-4">
                        <h3 className="text-lumina-gold font-[family-name:var(--font-calligraffitti)] text-xl mb-2">
                            Connect
                        </h3>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target={social.href.startsWith("http") ? "_blank" : undefined}
                                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    aria-label={social.label}
                                    className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-lumina-gold hover:border-lumina-gold/50 hover:bg-lumina-gold/10 transition-all duration-300 group"
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-300">
                                        {social.icon}
                                    </span>
                                </a>
                            ))}
                        </div>
                        {/* Phone Numbers */}
                        <div className="flex flex-col items-center md:items-end gap-2 mt-4">
                            <a href="tel:+233201639414" className="text-white/50 hover:text-lumina-gold text-sm font-mono tracking-wider transition-colors">
                                +233 20 163 9414
                            </a>
                            <a href="tel:+233241343329" className="text-white/50 hover:text-lumina-gold text-sm font-mono tracking-wider transition-colors">
                                +233 24 134 3329
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-20 border-t border-white/5 py-6 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/30 text-xs tracking-[0.3em] font-mono uppercase">
                        Lumina Oracles © {new Date().getFullYear()}
                    </p>
                    <p className="text-white/20 text-xs tracking-wide">
                        Light your way ✨
                    </p>
                </div>
            </div>
        </footer>
    );
}
