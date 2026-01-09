export default function ContactSection() {
    return (
        <section className="pt-0 pb-24 relative border-t border-black/10 overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="https://ik.imagekit.io/humbling/Sequence%2002_1.mp4" type="video/mp4" />
            </video>
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col items-center mb-16 text-center">
                    <span className="text-white font-mono text-xs tracking-widest uppercase mb-4 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">Finalize the Connection</span>
                    <h2 className="text-4xl md:text-6xl font-thin uppercase text-white drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                        Sacred <span className="font-normal text-white drop-shadow-[0_0_25px_rgba(250,204,21,0.8)]">Petition</span>
                    </h2>
                    <div className="w-24 h-px bg-white mt-6 opacity-30 shadow-[0_0_10px_rgba(250,204,21,1)]" />
                </div>

                {/* Sacred Petition Form */}
                <div className="max-w-2xl mx-auto bg-white p-10 shadow-none border border-black/10 relative overflow-hidden group">
                    {/* Sharp Top Accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-lumina-gold" />

                    <form className="space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-black/40 block tracking-widest">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-background border border-black/10 p-3 text-foreground font-sans focus:border-lumina-gold focus:outline-none transition-all placeholder:text-foreground/20"
                                    placeholder="ENTER NAME"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-black/40 block tracking-widest">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="w-full bg-background border border-black/10 p-3 text-foreground font-sans focus:border-lumina-gold focus:outline-none transition-all placeholder:text-foreground/20"
                                    placeholder="ENTER EMAIL"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-black/40 block tracking-widest">
                                Service Desired
                            </label>
                            <select className="w-full bg-background border border-black/10 p-3 text-foreground font-sans focus:border-lumina-gold focus:outline-none transition-all appearance-none cursor-pointer hover:bg-black/5">
                                <option value="" className="text-foreground/20">SELECT SACRED SERVICE</option>
                                <option value="psychic">Psychic Reading</option>
                                <option value="astrology">Astrology Service</option>
                                <option value="healing">Energy Healing</option>
                                <option value="coaching">Spiritual Coaching</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-black/40 block tracking-widest">
                                Your Message
                            </label>
                            <textarea
                                rows={4}
                                className="w-full bg-background border border-black/10 p-4 text-foreground font-sans focus:border-lumina-gold focus:outline-none transition-all placeholder:text-foreground/20 resize-none"
                                placeholder="SHARE YOUR HEART'S QUERY..."
                            />
                        </div>

                        <button className="w-full py-5 bg-black text-white font-bold uppercase tracking-widest hover:bg-lumina-gold hover:text-black transition-all duration-100 border border-black group-hover:border-lumina-gold">
                            Submit Petition
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
