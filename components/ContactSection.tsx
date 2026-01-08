export default function ContactSection() {
    return (
        <section className="py-24 bg-background relative">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-4xl md:text-6xl font-thin uppercase text-foreground">
                        Begin Your <span className="text-lumina-lavender font-normal">Journey</span>
                    </h2>
                    <p className="mt-4 font-sans text-foreground/60 max-w-lg">
                        Send your sacred petition to the oracle. We are listening with an open heart.
                    </p>
                </div>

                {/* Sacred Petition Form */}
                <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/50 relative overflow-hidden">
                    {/* Soft background gradient */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-lumina-cyan via-lumina-gold to-lumina-lavender" />

                    <form className="space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-lumina-lavender/80 block tracking-widest">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-background border-b border-border-util p-3 text-foreground font-sans focus:border-lumina-cyan focus:outline-none transition-all placeholder:text-foreground/20"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-lumina-lavender/80 block tracking-widest">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="w-full bg-background border-b border-border-util p-3 text-foreground font-sans focus:border-lumina-cyan focus:outline-none transition-all placeholder:text-foreground/20"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-lumina-lavender/80 block tracking-widest">
                                Service Desired
                            </label>
                            <select className="w-full bg-background border-b border-border-util p-3 text-foreground font-sans focus:border-lumina-cyan focus:outline-none transition-all appearance-none cursor-pointer hover:bg-black/5 rounded-t-lg">
                                <option value="" className="text-foreground/20">Select a Sacred Service</option>
                                <option value="psychic">Psychic Reading</option>
                                <option value="astrology">Astrology Service</option>
                                <option value="healing">Energy Healing</option>
                                <option value="coaching">Spiritual Coaching</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-lumina-lavender/80 block tracking-widest">
                                Your Message
                            </label>
                            <textarea
                                rows={4}
                                className="w-full bg-background border border-border-util p-4 rounded-xl text-foreground font-sans focus:border-lumina-cyan focus:outline-none focus:ring-1 focus:ring-lumina-cyan/20 transition-all placeholder:text-foreground/20 resize-none"
                                placeholder="Share your heart's query..."
                            />
                        </div>

                        <button className="w-full py-5 bg-gradient-to-r from-lumina-cyan to-lumina-lavender text-white font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300">
                            Send Petition
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
