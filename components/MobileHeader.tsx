"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MobileHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/blogs", label: "Blogs" },
        { href: "/media", label: "Media" },
        { href: "/about", label: "About" },
        { href: "/goddess-ai", label: "✨ Goddess AI", isSpecial: true },
        { href: "/contact", label: "Contact" },
    ];

    const menuExpandedState: "true" | "false" = isMenuOpen ? "true" : "false";

    return (
        <>
            {/* Mobile Header Bar - Only visible on mobile */}
            <header className="fixed top-0 left-0 right-0 z-50 md:hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-transparent backdrop-blur-xl border-b border-white/10 shadow-sm">
                    {/* Hamburger Menu Button - Left Side */}
                    <button
                        onClick={toggleMenu}
                        className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
                        aria-label="Toggle portals menu"
                        {...{ 'aria-expanded': menuExpandedState }}
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

                    {/* Brand Name - Center */}
                    <Link href="/" onClick={closeMenu}>
                        <span className="font-[family-name:var(--font-calligraffitti)] text-3xl text-lumina-gold drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                            Lumora
                        </span>
                    </Link>

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

            {/* Slide-out Navigation Menu - Knife Edge Glass Design */}
            <nav
                className={`fixed top-0 left-0 h-full w-[85vw] max-w-md bg-transparent backdrop-blur-3xl z-50 md:hidden transition-transform duration-300 ease-out will-change-transform [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)] drop-shadow-[0_0_20px_rgba(0,0,0,0.3)] ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Glass sheen overlay */}
                <div className="absolute inset-0 bg-white/5 pointer-events-none" />

                {/* Spiritual Light overlay */}
                <div className="absolute inset-0 bg-[url('/asset_sacred_geometry_1767893429698.png')] opacity-10 pointer-events-none mix-blend-overlay bg-cover bg-center" />

                {/* Menu Header */}
                <div className="relative flex items-center justify-between px-6 py-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
                    <span className="font-[family-name:var(--font-calligraffitti)] text-3xl text-lumina-gold drop-shadow-md">
                        Portals
                    </span>
                    <button
                        onClick={closeMenu}
                        className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-lumina-gold transition-colors duration-100"
                        aria-label="Close menu"
                    >
                        <svg
                            className="w-8 h-8"
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
                <div className="px-6 py-6 relative z-10">
                    <ul className="space-y-4">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="group flex items-center justify-between py-2 transition-all duration-300"
                                >
                                    <span className="text-white/80 font-[family-name:var(--font-calligraffitti)] text-3xl group-hover:text-lumina-gold transition-colors duration-300 drop-shadow-sm">
                                        {link.label}
                                    </span>
                                    <span className="text-lumina-gold opacity-0 group-hover:opacity-100 transform translate-x-[-20px] group-hover:translate-x-0 transition-all duration-300 text-xl">
                                        ✨
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Footer Decoration */}
                {/* Footer Decoration */}
                <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-white/10 bg-transparent">
                    <p className="text-white/30 font-mono text-[10px] text-center uppercase tracking-[0.2em] mb-2">
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
