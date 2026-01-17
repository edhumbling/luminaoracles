"use client";

import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
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

// Mobile Chat View with Visual Viewport API for instant keyboard handling
interface MobileChatViewProps {
    messages: Message[];
    input: string;
    setInput: (value: string) => void;
    isLoading: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
    inputRef: React.RefObject<HTMLTextAreaElement | null>;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

function MobileChatView({
    messages,
    input,
    setInput,
    isLoading,
    onSubmit,
    onClose,
    inputRef,
    messagesEndRef
}: MobileChatViewProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Use Visual Viewport API for instant keyboard detection using direct DOM manipulation
    // This avoids re-renders and solves lint warnings about inline styles
    useLayoutEffect(() => {
        const updateHeight = () => {
            const vv = window.visualViewport;
            const height = vv ? vv.height : window.innerHeight;
            if (containerRef.current) {
                containerRef.current.style.height = `${height}px`;
            }
        };

        // Initial set
        updateHeight();

        // Listen to visualViewport changes (fires when keyboard shows/hides)
        const vv = window.visualViewport;
        if (vv) {
            vv.addEventListener('resize', updateHeight);
            vv.addEventListener('scroll', updateHeight);
        }

        // Fallback for older browsers
        window.addEventListener('resize', updateHeight);

        return () => {
            if (vv) {
                vv.removeEventListener('resize', updateHeight);
                vv.removeEventListener('scroll', updateHeight);
            }
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, messagesEndRef]);

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 right-0 z-[9999] bg-black flex flex-col font-sans overflow-hidden"
        >
            <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-white/5 flex-shrink-0">
                <button
                    onClick={onClose}
                    className="p-2 -ml-2 rounded-full text-white/70 active:bg-white/10 transition-colors"
                    aria-label="Back"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                        <Image
                            src="/logo.png"
                            alt="Goddess AI"
                            width={28}
                            height={28}
                            className="object-contain"
                        />
                    </div>
                    <span className="text-white font-medium text-sm">Goddess AI</span>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 -mr-2 rounded-full text-white/70 active:bg-white/10 transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-black min-h-0">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full space-y-4 py-12">
                        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                            <Image
                                src="/logo.png"
                                alt="Goddess AI"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                        <div className="text-center space-y-1">
                            <h3 className="text-white font-medium">Lumina Oracles</h3>
                            <p className="text-white/50 text-sm max-w-[260px]">Ask me anything about your journey, guidance, or the divine.</p>
                        </div>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex w-full ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        {message.role === "assistant" ? (
                            <div className="flex gap-3 max-w-[90%]">
                                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Image
                                        src="/logo.png"
                                        alt="AI"
                                        width={20}
                                        height={20}
                                        className="object-contain"
                                    />
                                </div>
                                <p className="text-white/90 text-[15px] leading-relaxed whitespace-pre-wrap pt-1">{message.content}</p>
                            </div>
                        ) : (
                            <div className="bg-[#303030] text-white px-4 py-2.5 rounded-3xl rounded-tr-lg max-w-[85%]">
                                <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && messages[messages.length - 1]?.role === "user" && (
                    <div className="flex gap-3">
                        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                            <Image
                                src="/logo.png"
                                alt="AI"
                                width={20}
                                height={20}
                                className="object-contain"
                            />
                        </div>
                        <ThinkingDots />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Sits directly on keyboard */}
            <form
                onSubmit={onSubmit}
                className="bg-black px-3 py-2 border-t border-white/5 flex-shrink-0 transition-all duration-100"
            >
                <div className="flex items-end gap-2 bg-[#303030] rounded-3xl px-4 py-2">
                    <textarea
                        ref={inputRef}
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
                        placeholder="Ask Great Goddess anything..."
                        rows={1}
                        className="bg-transparent text-white placeholder:text-white/40 focus:outline-none flex-1 text-[16px] resize-none overflow-y-auto leading-6 max-h-[120px] py-1 break-words [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 mb-0.5 ${input.trim()
                            ? "bg-white text-black"
                            : "bg-white/20 text-white/40"
                            }`}
                        aria-label="Send"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
                        )}
                    </button>
                </div>
            </form>
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

    // Toggle visibility based on footer intersection and handle auto-open/hero check
    useEffect(() => {
        // Auto-open on /goddess-ai route
        if (pathname === '/goddess-ai') {
            setIsOpen(true);
            setIsVisible(true);
            setTimeout(() => inputRef.current?.focus(), 100);
        }

        // Logic to hide on Blogs Hero (Desktop only)
        const checkScroll = () => {
            if (pathname === '/blogs' && window.innerWidth >= 768) {
                // Hero is roughly 70vh. If we are near top (e.g. < 50vh), hide it.
                // The search bar is around 60-70vh.
                // We want to hide it when the user is viewing the hero.
                if (window.scrollY < window.innerHeight * 0.6) {
                    setIsVisible(false);
                    return;
                }
            }

            // If we are NOT in the hero logic (or scrolled past), we defer to the footer observer
            // However, observer is async/callback based.
            // We need to manage state carefully.
            // Simplified: If scrollY is small trigger hidden. If larger, let observer dictate.
            // But observer only sets FALSE when intersecting footer. It sets TRUE when NOT intersecting footer.
            // So if we scroll past hero, observer says "TRUE" (not intersecting footer).
            // This works.
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isFooterVisible = entry.isIntersecting;

                // If footer is visible, ALWAYS hide
                if (isFooterVisible) {
                    setIsVisible(false);
                } else {
                    // Footer NOT visible.
                    // Check if we are in Blogs Hero
                    if (pathname === '/blogs' && window.innerWidth >= 768 && window.scrollY < window.innerHeight * 0.6) {
                        setIsVisible(false);
                    } else {
                        setIsVisible(true);
                    }
                }
            },
            { threshold: 0.1 }
        );

        const footer = document.querySelector("footer");
        if (footer) {
            observer.observe(footer);
        }

        // Add scroll listener for the blogs page dynamic check
        const handleScroll = () => {
            // We only care about this check on blogs page desktop
            if (pathname === '/blogs' && window.innerWidth >= 768) {
                // If footer is in view, observer handles it?
                // Observer only fires on threshold change.
                // We need constant checking for Hero area.
                const footer = document.querySelector("footer");
                const footerRect = footer?.getBoundingClientRect();
                const isFooterVisible = footerRect && footerRect.top < window.innerHeight;

                if (isFooterVisible) {
                    setIsVisible(false);
                } else if (window.scrollY < window.innerHeight * 0.6) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            if (footer) observer.unobserve(footer);
            window.removeEventListener('scroll', handleScroll);
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
            if (window.history.length > 2) {
                router.back();
            } else {
                router.push('/');
            }
        }
    };

    // Mobile: Full screen overlay - Pure Black & Glassy Design
    if (isMobile && isOpen) {
        return (
            <MobileChatView
                messages={messages}
                input={input}
                setInput={setInput}
                isLoading={isLoading}
                onSubmit={onSubmit}
                onClose={handleClose}
                inputRef={inputRef}
                messagesEndRef={messagesEndRef}
            />
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
                                            ? "bg-[#2f2f2f] text-white"
                                            : "bg-white/10 text-white"
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
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
                        <div className={`relative flex items-end justify-between gap-2 transition-all duration-300 ${isOpen && !isMobile
                            ? "bg-[#0a0a0a] border border-white/10 rounded-2xl p-2"
                            : "bg-[#111111] border border-white/10 rounded-full pl-6 pr-2 py-2 shadow-2xl w-[600px] max-w-[90vw] hidden md:flex items-center"
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
                                placeholder="Ask Great Goddess anything..."
                                rows={1}
                                className={`bg-transparent text-white placeholder:text-white/30 focus:outline-none flex-1 text-base resize-none overflow-y-auto leading-6 max-h-[120px] py-1 break-words ${isOpen && !isMobile ? "px-2" : ""
                                    } [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:[&::-webkit-scrollbar]:block md:[&::-webkit-scrollbar]:w-1.5 md:[&::-webkit-scrollbar-track]:bg-transparent md:[&::-webkit-scrollbar-thumb]:bg-white/10 md:[&::-webkit-scrollbar-thumb]:rounded-full hover:md:[&::-webkit-scrollbar-thumb]:bg-white/20`}
                            />

                            <div className={`flex items-center gap-3 ${isOpen && !isMobile ? "mb-0.5" : ""}`}>
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
