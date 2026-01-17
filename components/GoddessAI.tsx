"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { X, Sparkles, Send, Loader2, ArrowUp, ArrowLeft } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp?: string;
}

// Helper to format time
const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Animated thinking dots component
function ThinkingDots() {
    return (
        <div className="flex items-center gap-1 px-2">
            <span className="text-white/50 text-sm">thinking</span>
            <span className="flex gap-0.5">
                <span className="w-1.5 h-1.5 bg-lumina-gold rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-lumina-gold rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-lumina-gold rounded-full animate-bounce [animation-delay:300ms]" />
            </span>
        </div>
    );
}

export default function GoddessAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const pathname = usePathname();
    const router = useRouter();

    // Toggle visibility based on footer intersection and handle auto-open on /goddess-ai
    useEffect(() => {
        // Auto-open on /goddess-ai route
        if (pathname === '/goddess-ai') {
            setIsOpen(true);
            setIsVisible(true);
            setTimeout(() => inputRef.current?.focus(), 100);
        }

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
    }, [pathname]);

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
            timestamp: formatTime(new Date()),
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
            setMessages(prev => [...prev, {
                id: assistantId,
                role: "assistant",
                content: "",
                timestamp: formatTime(new Date())
            }]);

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
                    timestamp: formatTime(new Date())
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
        if (pathname === '/goddess-ai') {
            router.back();
        }
    };

    // Mobile: Full screen overlay
    if (isMobile && isOpen) {
        return (
            <div className="fixed inset-0 z-[9999] bg-[#0b141a] flex flex-col font-sans">
                {/* WhatsApp-style Header */}
                <div className="flex items-center gap-2 p-2 bg-[#202c33] border-b border-white/5 shadow-sm">
                    <button
                        onClick={handleClose}
                        className="p-1 rounded-full text-white/70 hover:bg-white/10 flex items-center gap-1"
                        aria-label="Back"
                    >
                        <ArrowLeft className="w-6 h-6" />
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-lumina-gold/20 to-amber-600/20 border border-lumina-gold/30 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                            <Image
                                src="/logo.png"
                                alt="Goddess AI"
                                fill
                                className="object-contain p-1"
                            />
                        </div>
                    </button>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-white font-medium truncate text-base">Goddess AI</h2>
                        <p className="text-white/60 text-xs truncate">online</p>
                    </div>
                    <div className="flex items-center gap-4 px-2">
                        <div className="w-5 h-5" /> {/* Placeholder/Spacer for symmetry or potential menu */}
                    </div>
                </div>

                {/* Messages Area */}
                <div
                    className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#0b141a] relative pb-[100px] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-blend-overlay"
                >
                    <div className="absolute inset-0 bg-black/80 pointer-events-none" /> {/* Dim the background pattern */}

                    {/* Welcome System Message */}
                    {messages.length === 0 && (
                        <div className="flex justify-center my-4 relative z-10">
                            <div className="bg-[#1f2c34] text-lumina-gold text-[10px] px-3 py-1.5 rounded-lg shadow-sm text-center max-w-[80%] border border-lumina-gold/10">
                                Messages are private & sacred. Connect with divine guidance.
                            </div>
                        </div>
                    )}

                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex w-full ${message.role === "user" ? "justify-end" : "justify-start"} relative z-10`}
                        >
                            <div
                                className={`relative max-w-[85%] rounded-lg px-3 py-1.5 shadow-sm text-[15px] leading-snug ${message.role === "user"
                                    ? "bg-[#005c4b] text-[#e9edef] rounded-tr-none"
                                    : "bg-[#202c33] text-[#e9edef] rounded-tl-none"
                                    }`}
                            >
                                {/* Tail Pseudo-element simulation */}
                                <div className={`absolute top-0 w-3 h-3 ${message.role === "user"
                                    ? "right-[-8px] border-t-[12px] border-t-[#005c4b] border-r-[12px] border-r-transparent rotate-0 [clip-path:polygon(0_0,100%_0,0_100%)]"
                                    : "left-[-8px] border-t-[12px] border-t-[#202c33] border-l-[12px] border-l-transparent rotate-0 [clip-path:polygon(0_0,100%_0,100%_100%)]" // Using borders for triangle
                                    }`}
                                />

                                <p className="whitespace-pre-wrap mb-1">{message.content}</p>
                                <div className="flex items-center justify-end gap-1 mt-0.5 select-none">
                                    <span className="text-[11px] text-white/50 min-w-[30px] text-right">
                                        {message.timestamp || formatTime(new Date())}
                                    </span>
                                    {message.role === "user" && (
                                        <div className="text-[#53bdeb]">
                                            <svg viewBox="0 0 16 11" height="11" width="16" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 16 11">
                                                <path fill="currentColor" d="M11.575 0.355L6.62 5.309 6.275 6.449 2.055 2.225 0.5 3.78 4.72 8 6.22 9.5 7.72 8 16 0.355H11.575z M13.125 0.355L8.17 5.309 7.825 6.449 6.275 8 7.775 9.5 16 1.275 16 0.355H13.125z"></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isLoading && messages[messages.length - 1]?.role === "user" && (
                        <div className="flex justify-start relative z-10">
                            <div className="bg-[#202c33] rounded-lg rounded-tl-none px-4 py-3 shadow-sm">
                                <ThinkingDots />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area - Desktop Style & Keyboard Fixed */}
                <form
                    onSubmit={onSubmit}
                    className="fixed bottom-0 left-0 right-0 p-4 bg-[#0b141a]/90 backdrop-blur-md border-t border-white/5 pb-[env(safe-area-inset-bottom,20px)] z-[10000]"
                >
                    <div className="relative group">
                        <div className="relative flex items-center justify-between gap-2 bg-[#111111] border border-white/10 rounded-2xl p-2 transition-all duration-300">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                    e.target.style.height = 'auto';
                                    const lineHeight = 20;
                                    const maxLines = 6;
                                    e.target.style.height = `${Math.min(e.target.scrollHeight, lineHeight * maxLines)}px`;
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        onSubmit(e as unknown as React.FormEvent);
                                    }
                                }}
                                placeholder="Ask a question..."
                                rows={1}
                                className="bg-transparent text-white placeholder:text-white/30 focus:outline-none flex-1 text-base resize-none overflow-y-auto leading-6 max-h-[120px] px-2"
                            />

                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${input.trim()
                                    ? "bg-emerald-900/50 hover:bg-emerald-800 text-emerald-100"
                                    : "bg-white/5 text-white/20 cursor-not-allowed"
                                    }`}
                                aria-label="Send message"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <ArrowUp className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div >
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
                        <div className="h-[600px] md:h-[70vh] overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
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
                                        <ThinkingDots />
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
                            <textarea
                                ref={!isOpen ? inputRef : undefined}
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                    e.target.style.height = 'auto';
                                    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        onSubmit(e as unknown as React.FormEvent);
                                    }
                                }}
                                placeholder="Ask a question..."
                                rows={1}
                                className={`bg-transparent text-white placeholder:text-white/30 focus:outline-none flex-1 text-base resize-none overflow-y-auto leading-6 max-h-[120px] ${isOpen && !isMobile ? "px-2" : ""
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
