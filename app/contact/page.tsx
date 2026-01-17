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
            <section className="py-20 px-4 md:px-6 relative z-10 -mt-20">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
                    {/* WhatsApp Card */}
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 p-4 md:p-8 rounded-xl md:rounded-2xl flex flex-col items-center justify-center text-center hover:border-lumina-gold/50 transition-colors group aspect-square">
                        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform">
                            <MessageCircle className="w-5 h-5 md:w-8 md:h-8 text-lumina-gold" />
                        </div>
                        <h3 className="text-xs md:text-xl font-bold uppercase tracking-widest mb-1 md:mb-2 text-white">WhatsApp</h3>
                        <p className="text-white/50 text-[10px] md:text-sm mb-2 md:mb-6 hidden md:block">Direct spiritual connection via message</p>
                        <a
                            href="https://wa.me/233241343329"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lumina-gold hover:text-white transition-colors font-mono text-[10px] md:text-base whitespace-nowrap"
                        >
                            +233 24 134 3329
                        </a>
                    </div>

                    {/* Email Card */}
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 p-4 md:p-8 rounded-xl md:rounded-2xl flex flex-col items-center justify-center text-center hover:border-lumina-gold/50 transition-colors group aspect-square">
                        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform">
                            <Mail className="w-5 h-5 md:w-8 md:h-8 text-lumina-gold" />
                        </div>
                        <h3 className="text-xs md:text-xl font-bold uppercase tracking-widest mb-1 md:mb-2 text-white">Email</h3>
                        <p className="text-white/50 text-[10px] md:text-sm mb-2 md:mb-6 hidden md:block">For detailed inquiries and booking support</p>
                        <a
                            href="mailto:goddessgreat16@gmail.com"
                            className="text-lumina-gold hover:text-white transition-colors font-mono text-[10px] md:text-base break-all md:break-normal line-clamp-1"
                        >
                            goddessgreat16@
                        </a>
                    </div>

                    {/* Phone Card */}
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 p-4 md:p-8 rounded-xl md:rounded-2xl flex flex-col items-center justify-center text-center hover:border-lumina-gold/50 transition-colors group aspect-square col-span-2 md:col-span-1 border-t-0 md:border-t border-white/10">
                        {/* Note: col-span-2 on mobile helps the 3rd item not look awkward in a 2-col grid, or the user specifically asked for "two vertical layout" which might mean 2 columns? "two vertical layout for the cards" usually means 2 per row. A 3rd odd one might be centered or span. Let's stick to simple grid flow but center the last one if needed, or just let it be.
                        Wait, "two vertical layout" on mobile... usually implies 2 columns.
                        If there are 3 items, the 3rd will be alone on the second row. I'll make it col-span-2 on mobile so it centers nicely? Or just keep it regular grid-cols-2. Let's make it regular grid-cols-2 for "small squares". If it spans it becomes a rectangle.
                        The user said "square shaped... two vertical layout". If I make the 3rd one span 2 cols, it won't be square. 
                        I will leave it as is, but maybe centered?
                        Actually, let's just make it grid-cols-2 and the 3rd one will be on the next line.
                        User asked: "make mobile small squared".
                        Re-reading: "two vertical layout for the cards". This could mean 2 columns.
                        I will proceed with grid-cols-2. The 3rd card will wrap.
                        */}
                        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform">
                            <Phone className="w-5 h-5 md:w-8 md:h-8 text-lumina-gold" />
                        </div>
                        <h3 className="text-xs md:text-xl font-bold uppercase tracking-widest mb-1 md:mb-2 text-white">Call</h3>
                        <p className="text-white/50 text-[10px] md:text-sm mb-2 md:mb-6 hidden md:block">Speak directly with our sanctuary</p>
                        <div className="flex flex-col gap-1 md:gap-2 text-[10px] md:text-base">
                            <a
                                href="tel:+233201639414"
                                className="text-lumina-gold hover:text-white transition-colors font-mono whitespace-nowrap"
                            >
                                +233 20 163 9414
                            </a>
                            <a
                                href="tel:+233241343329"
                                className="text-lumina-gold hover:text-white transition-colors font-mono whitespace-nowrap"
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
