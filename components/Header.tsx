
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  
  // Check if we are on the founder page or any other page that needs dark text
  const isLightPage = pathname === "/founder" || pathname === "/contact";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/founder", label: "Founder" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 hidden md:block">
      <div className="mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24">
          {/* Logo - Far Left */}
          <Link href="/" className="relative w-16 h-16 group">
             <div className="absolute inset-0 bg-lumina-gold/20 blur-[20px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Image
              src="/logo.png"
              alt="Lumina Oracles Logo"
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Navigation - Right Side (or Center-Right) */}
          <nav className="relative">
            {/* Glass Background for Nav */}
            <div className={cn(
              "absolute inset-0 backdrop-blur-md rounded-full border shadow-lg -z-10 transition-colors duration-300",
              isLightPage 
                ? "bg-white/40 border-black/10 shadow-black/5" 
                : "bg-white/5 border-white/10 shadow-black/20"
            )} />
            
            <ul className="flex items-center gap-1 px-2 py-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "relative px-6 py-2.5 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-300 overflow-hidden group",
                        // Active State
                        isActive 
                          ? (isLightPage 
                              ? "text-lumina-gold bg-black/5 shadow-[0_0_15px_rgba(250,204,21,0.1)]" 
                              : "text-lumina-gold bg-white/10 shadow-[0_0_15px_rgba(250,204,21,0.1)]")
                          // Inactive State
                          : (isLightPage
                              ? "text-black/70 hover:text-black hover:bg-black/5"
                              : "text-white/70 hover:text-white hover:bg-white/5")
                      )}
                    >
                      <span className="relative z-10">{link.label}</span>
                      
                      {/* Hover Glow Effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-lumina-gold/0 via-lumina-gold/10 to-lumina-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
