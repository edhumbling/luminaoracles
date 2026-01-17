"use client";

import { cn } from "@/lib/utils";

const TESTIMONIALS = [
    {
        name: "Christian",
        text: "U are such an amazing person, selfless, loving, always ready to help, principled , incredible teacher, encouraging, down to earth, u love without conditions, u have a heart of gold. One thing I will add is we love you so much"
    },
    {
        name: "David Padmore",
        text: "My love you know very well that i always see you to be the Queen 👑 of all the Goddess and that's exactly what you are my dear."
    },
    {
        name: "Queen Judy",
        text: "Since I came in contact with you through Expanding Beyond the Seekers, your voice is unique, and is a great voice when it comes to presentation. You have the personality as well and in depth knowledge when it comes to spirituality. For instance, anytime I called you that’s when something is difficult you have that patience, calmness. tolerance to explain issues concerning spirituality. Again,when it comes to explaining issues concerning this our path of journey, you have the patience to explain to the simplest form. Thank you."
    },
    {
        name: "Ether Azura",
        text: "You are a powerful, lovely Goddess"
    },
    {
        name: "Clemson",
        text: "The truth is there's no better time for me to appreciate you than this day, Your kindness, calmness and generosity have been a guiding light on my awakening journey, inspiring growth and positivity in ways my Queen and i will always cherish, Thank you once again for being a true blessing to me and my Queen,and may the universe fill your heart with unwavering blessings and joy. THANK YOU SOO MUCH QUEEN OF QUANTUM HIGHWAYS🙏."
    },
    {
        name: "Kojo",
        text: "Meeting you has been a blessing. Your words, and spiritual guidance have helped me find balance and clarity. Thank you very much mamaga one 😊"
    },
    {
        name: "Bygonehub",
        text: "You are one in thousand. Infact, no amount of words will comprehend your kind hearted ❤️ works, you are always in our shoes. Infact you impacted positively in my life without even knowing personally, your great works alone. Above all, you are powerful not forgetting every single advise you gave. I appreciate 🙏. Thank you sooo much🙏🏾🙏🏾🙏🏾🙏🏾🙏🏾🙏🏾🙏🏾. You are soo lovely"
    },
    {
        name: "TompoGh777",
        text: "Since the day I was born, I have never known happiness in my life until GG came into my life. Every second I close my eyes, I see GG and find happiness in my heart ❤️. I'm proud to say you are my everything. I love everything about you and you're my world. I LOVE YOU MAA GODDESS 😘🥰❤️"
    }
];

export default function WallOfLove() {
    return (
        <section className="relative py-32 bg-black overflow-hidden">
            {/* Exoteric Aurora Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/40 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow" />
                <div className="absolute top-[10%] right-[-10%] w-[40%] h-[60%] bg-lumina-cyan/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow delay-700" />
                <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-lumina-gold/20 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow delay-1000" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center mb-20 text-center">
                    <span className="text-lumina-gold font-mono text-xs tracking-[0.3em] uppercase mb-4 animate-pulse-slow">
                        Verified Testimonials
                    </span>
                    <h2 className="text-4xl md:text-6xl font-thin uppercase text-white tracking-widest relative inline-block">
                        Wall of <span className="font-[family-name:var(--font-calligraffitti)] text-lumina-gold">Love</span>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-lumina-gold to-transparent" />
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((testimonial, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-lumina-gold/50 transition-all duration-500",
                                // Sharp distinct design
                                "hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(250,204,21,0.1)]",
                                // Varied heights for "masonry" feel if we were using it, but grid works well for readibility
                                // We can add a custom clip path for sharpness
                                "[clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)]",
                            )}
                        >
                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 w-8 h-8 flex items-start justify-end p-2 opacity-50">
                                <span className="text-lumina-gold font-serif text-4xl leading-none">"</span>
                            </div>

                            <div className="relative z-10">
                                <p className="text-white/80 font-light leading-relaxed mb-6 text-sm">
                                    {testimonial.text}
                                </p>

                                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lumina-gold to-purple-600 flex items-center justify-center text-xs font-bold text-black uppercase">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <span className="text-lumina-gold font-mono text-xs tracking-widest uppercase truncate">
                                        {testimonial.name}
                                    </span>
                                </div>
                            </div>

                            {/* Sharp accent line */}
                            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-lumina-gold transition-all duration-500 group-hover:w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
