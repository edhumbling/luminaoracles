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
        { href: "/#services", label: "Services" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <>
            {/* Mobile Header Bar - Only visible on mobile */}
            <header className="fixed top-0 left-0 right-0 z-50 md:hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-md border-b border-white/10">
                    {/* Hamburger Menu Button - Left Side */}
                    <button
                        onClick={toggleMenu}
                        className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span
                            className={`block w-6 h-0.5 bg-lumina-gold transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""
                                }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-lumina-gold transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""
                                }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-lumina-gold transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""
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

            {/* Backdrop Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={closeMenu}
            />

            {/* Slide-out Navigation Menu */}
            <nav
                className={`fixed top-0 left-0 h-full w-72 bg-black/95 backdrop-blur-md z-50 md:hidden transform transition-transform duration-300 ease-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <span className="text-lumina-gold font-mono text-xs tracking-widest uppercase">
                        Navigation
                    </span>
                    <button
                        onClick={closeMenu}
                        className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-lumina-gold transition-colors"
                        aria-label="Close menu"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="p-4">
                    <ul className="space-y-2">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="block py-3 px-4 text-white font-medium uppercase tracking-wider text-sm border border-white/10 hover:border-lumina-gold hover:bg-lumina-gold/10 hover:text-lumina-gold transition-all duration-200"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Footer Decoration */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <p className="text-white/30 font-mono text-xs text-center uppercase tracking-widest">
                        Lumina Oracles
                    </p>
                </div>
            </nav>
        </>
    );
}
