"use client";

import Image from "next/image";
import ContactSection from "@/components/ContactSection";
import { Mail, MessageCircle, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/contact_hero.png"
                    alt="Sanctuary Entrance"
                    fill
                    className="object-cover opacity-70"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-thin tracking-tighter text-white drop-shadow-[0_0_30px_rgba(250,204,21,0.6)] mb-4">
                        Contact the <span className="font-normal text-lumina-gold font-[family-name:var(--font-calligraffitti)]">Oracle</span>
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
                        Reach out across the veil. We are here to guide you on your spiritual journey.
                    </p>
                </div>
            </section>

            {/* Contact Details Cards */}
            <section className="py-20 px-6 relative z-10 -mt-20">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* WhatsApp Card */}
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center hover:border-lumina-gold/50 transition-colors group">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <MessageCircle className="w-8 h-8 text-lumina-gold" />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-widest mb-2 text-white">WhatsApp</h3>
                        <p className="text-white/50 text-sm mb-6">Direct spiritual connection via message</p>
                        <a
                            href="https://wa.me/233241343329"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lumina-gold hover:text-white transition-colors font-mono"
                        >
                            +233 24 134 3329
                        </a>
                    </div>

                    {/* Email Card */}
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center hover:border-lumina-gold/50 transition-colors group">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Mail className="w-8 h-8 text-lumina-gold" />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-widest mb-2 text-white">Email</h3>
                        <p className="text-white/50 text-sm mb-6">For detailed inquiries and booking support</p>
                        <a
                            href="mailto:goddessgreat16@gmail.com"
                            className="text-lumina-gold hover:text-white transition-colors font-mono break-all"
                        >
                            goddessgreat16@gmail.com
                        </a>
                    </div>

                    {/* Phone Card */}
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center hover:border-lumina-gold/50 transition-colors group">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Phone className="w-8 h-8 text-lumina-gold" />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-widest mb-2 text-white">Call</h3>
                        <p className="text-white/50 text-sm mb-6">Speak directly with our sanctuary</p>
                        <div className="flex flex-col gap-2">
                            <a
                                href="tel:+233201639414"
                                className="text-lumina-gold hover:text-white transition-colors font-mono"
                            >
                                +233 20 163 9414
                            </a>
                            <a
                                href="tel:+233241343329"
                                className="text-lumina-gold hover:text-white transition-colors font-mono"
                            >
                                +233 24 134 3329
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sacred Petition Form (Reused) */}
            <ContactSection />
        </main>
    );
}
