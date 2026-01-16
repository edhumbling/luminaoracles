"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MobileHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/founder", label: "Founder" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <>
            {/* Mobile Header Bar - Only visible on mobile */}
            <header className="fixed top-0 left-0 right-0 z-50 md:hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5">
                    {/* Hamburger Menu Button - Left Side */}
                    <button
                        onClick={toggleMenu}
                        className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
                        aria-label="Toggle portals menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span
                            className={`block w-6 h-0.5 bg-lumina-gold shadow-[0_0_10px_rgba(250,204,21,0.5)] transition-transform duration-150 ease-out ${isMenuOpen ? "rotate-45 translate-y-2" : ""
                                }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-lumina-gold shadow-[0_0_10px_rgba(250,204,21,0.5)] transition-opacity duration-100 ease-out ${isMenuOpen ? "opacity-0" : ""
                                }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-lumina-gold shadow-[0_0_10px_rgba(250,204,21,0.5)] transition-transform duration-150 ease-out ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                                }`}
                        />
                    </button>

                    {/* Logo - Right Side */}
                    <Link href="/" className="relative w-10 h-10" onClick={closeMenu}>
                        <Image
                            src="/logo.png"
                            alt="Lumina Oracles Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                        />
                    </Link>
                </div>
            </header>

            {/* Backdrop Overlay - Fast fade */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-150 ease-out ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={closeMenu}
            />

            {/* Slide-out Navigation Menu - Fast slide */}
            <nav
                className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-[#FFFBEB] to-white z-50 md:hidden shadow-2xl transition-transform duration-200 ease-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                style={{ willChange: 'transform' }}
            >
                {/* Spiritual Light overlay */}
                <div className="absolute inset-0 bg-[url('/asset_sacred_geometry_1767893429698.png')] opacity-5 pointer-events-none mix-blend-multiply bg-cover bg-center" />

                {/* Menu Header */}
                <div className="relative flex items-center justify-between p-6 border-b border-lumina-gold/20 bg-white/50 backdrop-blur-sm">
                    <span className="font-[family-name:var(--font-calligraffitti)] text-2xl text-lumina-gold drop-shadow-sm">
                        Portals
                    </span>
                    <button
                        onClick={closeMenu}
                        className="w-8 h-8 flex items-center justify-center text-black/40 hover:text-lumina-gold transition-colors duration-100"
                        aria-label="Close menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="p-6 relative z-10">
                    <ul className="space-y-4">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="group flex items-center justify-between py-3 px-4 rounded-lg border border-lumina-gold/20 bg-white/60 hover:bg-gradient-to-r hover:from-[#FFFBEB] hover:to-white hover:border-lumina-gold hover:shadow-[0_0_15px_rgba(250,204,21,0.2)] transition-all duration-150"
                                >
                                    <span className="text-black/80 font-medium uppercase tracking-widest text-sm group-hover:text-black transition-colors duration-100">
                                        {link.label}
                                    </span>
                                    <span className="text-lumina-gold opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-150">
                                        ✨
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Footer Decoration */}
                <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-lumina-gold/10 bg-white/30 backdrop-blur-sm">
                    <p className="text-black/40 font-mono text-[10px] text-center uppercase tracking-[0.2em] mb-2">
                        Sacred Geometry
                    </p>
                    <div className="flex justify-center gap-2 opacity-30">
                        <div className="w-1 h-1 rounded-full bg-lumina-gold" />
                        <div className="w-1 h-1 rounded-full bg-lumina-gold" />
                        <div className="w-1 h-1 rounded-full bg-lumina-gold" />
                    </div>
                </div>
            </nav>
        </>
    );
}
