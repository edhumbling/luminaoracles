"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Sparkles, Send, Loader2, ArrowUp } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export default function GoddessAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Toggle visibility based on footer intersection
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(!entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        const footer = document.querySelector("footer");
        if (footer) {
            observer.observe(footer);
        }

        return () => {
            if (footer) observer.unobserve(footer);
        };
    }, []);

    // Ctrl+I shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "i") {
                e.preventDefault();
                setIsOpen(true);
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Send message to API
    const sendMessage = useCallback(async (userMessage: string) => {
        if (!userMessage.trim() || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: userMessage.trim(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/goddess", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMsg].map(m => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to get response");
            }

            // Handle streaming response
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantContent = "";
            const assistantId = (Date.now() + 1).toString();

            // Add placeholder for assistant message
            setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "" }]);

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split("\n").filter(line => line.startsWith("data: "));

                    for (const line of lines) {
                        const data = line.slice(6);
                        if (data === "[DONE]") continue;
                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.content) {
                                assistantContent += parsed.content;
                                setMessages(prev =>
                                    prev.map(m =>
                                        m.id === assistantId ? { ...m, content: assistantContent } : m
                                    )
                                );
                            }
                        } catch {
                            // Skip malformed data
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: "I apologize, beloved. I am experiencing difficulties connecting to the divine realm. Please try again in a moment.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }, [messages, isLoading]);

    // Handle form submit
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isOpen && input.trim()) {
            setIsOpen(true);
        }
        if (input.trim()) {
            sendMessage(input);
        }
    };

    // Close and reset
    const handleClose = () => {
        setIsOpen(false);
        setMessages([]);
        setInput("");
    };

    // Mobile: Full screen overlay
    if (isMobile && isOpen) {
        return (
            <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lumina-gold/20 to-amber-600/20 border border-lumina-gold/30 flex items-center justify-center relative overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="Goddess AI Logo"
                                fill
                                className="object-contain p-1"
                            />
                        </div>
                        <div>
                            <h2 className="text-white font-medium">Goddess AI</h2>
                            <p className="text-white/50 text-xs">Divine Guidance</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 text-white/50 hover:text-white transition-colors"
                        aria-label="Close chat"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center py-12">
                            <div className="relative w-16 h-16 mx-auto mb-4">
                                <Image
                                    src="/logo.png"
                                    alt="Goddess AI Logo"
                                    fill
                                    className="object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                                />
                            </div>
                            <h3 className="text-xl text-white mb-2">Welcome, Beloved</h3>
                            <p className="text-white/50 text-sm max-w-xs mx-auto">
                                I am here to guide you on your spiritual journey. Ask me about our services, teachings, or anything your soul seeks.
                            </p>
                        </div>
                    )}
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.role === "user"
                                    ? "bg-lumina-gold text-black"
                                    : "bg-white/10 text-white"
                                    }`}
                            >
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && messages[messages.length - 1]?.role === "user" && (
                        <div className="flex justify-start">
                            <div className="bg-white/10 rounded-2xl px-4 py-3">
                                <Loader2 className="w-5 h-5 text-lumina-gold animate-spin" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={onSubmit} className="p-4 border-t border-white/10">
                    <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask the Goddess..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-lumina-gold/50"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="w-12 h-12 rounded-full bg-lumina-gold text-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                            aria-label="Send message"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    // Desktop: Floating bar that expands
    return (
        <>
            {/* Backdrop when open */}
            {isOpen && !isMobile && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                    onClick={handleClose}
                />
            )}

            {/* Main container */}
            <div
                className={`fixed z-[9999] transition-all duration-500 ease-out ${isOpen
                    ? "bottom-0 left-0 right-0 md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:w-[600px] md:max-w-[90vw]"
                    : "bottom-8 left-1/2 -translate-x-1/2"
                    }`}
            >
                {/* Expanded Chat Panel */}
                {isOpen && !isMobile && (
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden mb-4 animate-in slide-in-from-bottom-4 duration-300">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lumina-gold/20 to-amber-600/20 border border-lumina-gold/30 flex items-center justify-center relative overflow-hidden">
                                    <Image
                                        src="/logo.png"
                                        alt="Goddess AI Logo"
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-white font-medium">Goddess AI</h2>
                                    <p className="text-white/50 text-xs">Divine Guidance • Lumina Oracles</p>
                                </div>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/5"
                                aria-label="Close chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 && (
                                <div className="text-center py-8">
                                    <div className="relative w-14 h-14 mx-auto mb-4">
                                        <Image
                                            src="/logo.png"
                                            alt="Goddess AI Logo"
                                            fill
                                            className="object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                                        />
                                    </div>
                                    <h3 className="text-lg text-white mb-2">Welcome, Beloved</h3>
                                    <p className="text-white/50 text-sm max-w-xs mx-auto">
                                        I am here to illuminate your path. Ask me anything about Lumina Oracles.
                                    </p>
                                </div>
                            )}
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user"
                                            ? "bg-lumina-gold text-black"
                                            : "bg-white/10 text-white"
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && messages[messages.length - 1]?.role === "user" && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 rounded-2xl px-4 py-3">
                                        <Loader2 className="w-5 h-5 text-lumina-gold animate-spin" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                )}

                {/* Search Bar / Input */}
                <form onSubmit={onSubmit} className={`transition-opacity duration-300 ${!isVisible && !isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className="relative group">
                        <div className={`relative flex items-center justify-between gap-2 transition-all duration-300 ${isOpen && !isMobile
                                ? "bg-[#0a0a0a] border border-white/10 rounded-2xl p-2"
                                : "bg-[#111111] border border-white/10 rounded-full pl-6 pr-2 py-2 shadow-2xl w-[600px] max-w-[90vw] hidden md:flex"
                            }`}>
                            <input
                                ref={!isOpen ? inputRef : undefined}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                className={`bg-transparent text-white placeholder:text-white/30 focus:outline-none flex-1 text-base ${isOpen && !isMobile ? "px-2" : ""
                                    }`}
                            />

                            <div className="flex items-center gap-3">
                                {!isOpen && !input && (
                                    <span className="text-white/20 text-xs font-mono hidden sm:block">Ctrl+I</span>
                                )}
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${input.trim()
                                            ? "bg-emerald-900/50 hover:bg-emerald-800 text-emerald-100"
                                            : "bg-white/5 text-white/20 cursor-not-allowed"
                                        }`}
                                    aria-label="Send message"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <ArrowUp className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
