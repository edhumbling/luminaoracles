"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/data";
import { Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactSection() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        service: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        
        // Simulate network delay for "transmitting to the ether"
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setStatus("success");
        setFormData({ name: "", email: "", service: "", message: "" });
    };

    // Helper for input change
    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <section className="pt-0 pb-24 relative border-t border-black/10 overflow-hidden min-h-[800px] flex flex-col justify-center">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none mix-blend-multiply"
            >
                <source src="https://ik.imagekit.io/humbling/Sequence%2002_1.mp4" type="video/mp4" />
            </video>
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col items-center mb-16 text-center">
                    <span className="text-white font-mono text-xs tracking-widest uppercase mb-4 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)] animate-pulse-slow">
                        Finalize the Connection
                    </span>
                    <h2 className="text-4xl md:text-6xl font-thin uppercase text-white drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                        Sacred <span className="font-normal text-white drop-shadow-[0_0_25px_rgba(250,204,21,0.8)]">Petition</span>
                    </h2>
                    <div className="w-24 h-px bg-white mt-6 opacity-30 shadow-[0_0_10px_rgba(250,204,21,1)]" />
                </div>

                {/* Sacred Petition Form / Success Message */}
                <div className="relative max-w-2xl mx-auto">
                    {status === "success" ? (
                        <div className="bg-white/95 backdrop-blur-md p-12 text-center shadow-[0_0_50px_rgba(250,204,21,0.15)] border border-white/40 animate-in fade-in zoom-in-95 duration-700 ease-out">
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-lumina-gold blur-xl opacity-40 animate-radiate" />
                                    <CheckCircle2 className="w-16 h-16 text-lumina-gold relative z-10 drop-shadow-md" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-thin uppercase text-black mb-4 tracking-tight">Petition Received</h3>
                            <p className="text-black/60 font-mono text-sm leading-relaxed mb-8 max-w-md mx-auto">
                                Your sacred query has been transmitted to the ether. We shall reflect upon your words and respond within the cycle of the moon.
                            </p>
                            <button 
                                onClick={() => setStatus("idle")}
                                className="group flex items-center justify-center gap-2 mx-auto text-xs font-bold uppercase tracking-widest text-black/40 hover:text-lumina-gold transition-colors"
                            >
                                <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                Send Another Petition
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white/90 backdrop-blur-sm p-10 shadow-2xl shadow-black/5 border border-white/50 relative overflow-hidden group">
                            {/* Sharp Top Accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-lumina-gold shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
                            
                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2 group/field">
                                        <label className="text-xs font-bold uppercase text-black/40 block tracking-widest group-focus-within/field:text-lumina-gold transition-colors">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => updateField("name", e.target.value)}
                                            className="w-full bg-white/50 border border-black/10 p-3 text-black font-sans focus:border-lumina-gold focus:outline-none transition-all placeholder:text-black/20 focus:bg-white focus:shadow-[0_0_20px_rgba(250,204,21,0.1)]"
                                            placeholder="ENTER NAME"
                                        />
                                    </div>
                                    <div className="space-y-2 group/field">
                                        <label className="text-xs font-bold uppercase text-black/40 block tracking-widest group-focus-within/field:text-lumina-gold transition-colors">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => updateField("email", e.target.value)}
                                            className="w-full bg-white/50 border border-black/10 p-3 text-black font-sans focus:border-lumina-gold focus:outline-none transition-all placeholder:text-black/20 focus:bg-white focus:shadow-[0_0_20px_rgba(250,204,21,0.1)]"
                                            placeholder="ENTER EMAIL"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group/field">
                                    <label className="text-xs font-bold uppercase text-black/40 block tracking-widest group-focus-within/field:text-lumina-gold transition-colors">
                                        Service Desired
                                    </label>
                                    <div className="relative">
                                        <select 
                                            value={formData.service}
                                            onChange={(e) => updateField("service", e.target.value)}
                                            className="w-full bg-white/50 border border-black/10 p-3 text-black font-sans focus:border-lumina-gold focus:outline-none transition-all appearance-none cursor-pointer hover:bg-black/5 focus:bg-white focus:shadow-[0_0_20px_rgba(250,204,21,0.1)]"
                                        >
                                            <option value="" className="text-black/20">SELECT SACRED SERVICE</option>
                                            {SERVICES.map((service) => (
                                                <option key={service.id} value={service.id}>
                                                    {service.title}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 group/field">
                                    <label className="text-xs font-bold uppercase text-black/40 block tracking-widest group-focus-within/field:text-lumina-gold transition-colors">
                                        Your Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={(e) => updateField("message", e.target.value)}
                                        className="w-full bg-white/50 border border-black/10 p-4 text-black font-sans focus:border-lumina-gold focus:outline-none transition-all placeholder:text-black/20 resize-none focus:bg-white focus:shadow-[0_0_20px_rgba(250,204,21,0.1)]"
                                        placeholder="SHARE YOUR HEART'S QUERY..."
                                    />
                                </div>

                                <button 
                                    disabled={status === "submitting"}
                                    className="w-full py-5 bg-black text-white font-bold uppercase tracking-widest hover:bg-lumina-gold hover:text-black transition-all duration-300 border border-black group-hover:border-lumina-gold relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <span className={cn("relative z-10 flex items-center justify-center gap-2", status === "submitting" && "opacity-0")}>
                                        Submit Petition
                                    </span>
                                    {status === "submitting" && (
                                        <div className="absolute inset-0 flex items-center justify-center z-20">
                                            <Loader2 className="w-6 h-6 animate-spin text-white" />
                                        </div>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
