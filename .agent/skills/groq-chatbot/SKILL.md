---
name: groq-chatbot
description: Build a streaming AI chatbot with Groq API, RAG context, and Next.js. Includes floating UI, model fallbacks, mobile optimization, and Vercel deployment.
---

# Groq AI Chatbot Skill

A complete, portable guide to building a production-ready RAG-powered AI chatbot using Groq's ultra-fast inference with Next.js.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [File Structure](#file-structure)
3. [Environment Setup](#environment-setup)
4. [RAG Context System](#rag-context-system)
5. [API Route Implementation](#api-route-implementation)
6. [Chat Component Implementation](#chat-component-implementation)
7. [UI/UX Design System](#uiux-design-system)
8. [Streaming & SSE Handling](#streaming--sse-handling)
9. [Model Selection & Fallbacks](#model-selection--fallbacks)
10. [Mobile Optimization](#mobile-optimization)
11. [Keyboard & Accessibility](#keyboard--accessibility)
12. [Deployment](#deployment)
13. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER INTERACTION                           │
├─────────────────────────────────────────────────────────────────────┤
│  Desktop: Floating search bar → Expands to chat panel               │
│  Mobile: FAB trigger → Full-screen overlay                          │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    ChatBot.tsx (Client Component)                    │
│  • State: messages[], input, isLoading, isOpen, isMobile            │
│  • Handles: form submit, streaming response, UI transitions          │
└───────────────────────────────┬─────────────────────────────────────┘
                                │ POST /api/chatbot
                                │ { messages: [...] }
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    API Route (app/api/chatbot/route.ts)             │
│  1. Validate API key exists                                          │
│  2. Build system prompt + RAG context                                │
│  3. Try models in priority order (with fallbacks)                   │
│  4. Transform SSE stream → simplified format                        │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
            ┌───────────────────┴───────────────────┐
            ▼                                       ▼
┌───────────────────────┐              ┌───────────────────────┐
│   RAG Context         │              │   LLM Provider(s)     │
│   (lib/context.ts)    │              │   • Groq (primary)    │
│   • Knowledge base    │              │   • GLM (backup)      │
│   • System prompt     │              │   • OpenAI-compatible │
└───────────────────────┘              └───────────────────────┘
```

### Data Flow

1. User types message in input → triggers `onSubmit`
2. Component adds user message to state, calls `/api/chatbot`
3. API builds system message with RAG context
4. API tries models sequentially until one succeeds
5. Streaming response is transformed and piped back
6. Client reads SSE stream, updates assistant message in real-time
7. UI auto-scrolls to latest message

---

## File Structure

Create these files in your Next.js project:

```
your-app/
├── app/
│   └── api/
│       └── chatbot/
│           └── route.ts          # API endpoint for chat
├── components/
│   └── ChatBot.tsx               # Main chat UI component
├── lib/
│   └── chat-context.ts           # RAG knowledge base & system prompt
├── public/
│   └── logo.png                  # Bot avatar (optional)
└── .env.local                    # API keys (gitignored)
```

---

## Environment Setup

### `.env.local` (gitignored)

```bash
# Primary - Groq API (fast, free tier available)
GROQ_API_KEY=gsk_your_groq_key_here

# Backup - GLM API (optional, Chinese provider)
GLM_API_KEY=your_glm_key_here
```

### Getting API Keys

| Provider | URL | Free Tier |
|----------|-----|-----------|
| Groq | <https://console.groq.com> | 6000+ RPD |
| GLM (Zhipu) | <https://open.bigmodel.cn> | Yes |
| OpenRouter | <https://openrouter.ai> | Pay-as-you-go |

---

## RAG Context System

The RAG (Retrieval-Augmented Generation) context provides the AI with knowledge about your app/business.

### `lib/chat-context.ts`

```typescript
// RAG Context for AI Assistant
// This file provides structured knowledge for the AI

/**
 * Returns the knowledge base as a formatted string.
 * Include all information the AI should know about:
 * - Your business/app
 * - Services, products, pricing
 * - Contact information
 * - FAQs
 * - Legal pages (links)
 * - Team members
 */
export function getChatContext(): string {
    return `
# [Your App/Business Name] - Knowledge Base

## About
[Brief description of your app/business]
- Key differentiator 1
- Key differentiator 2
- Founded by: [Founder name]

## Website Pages (EXACT URLs)
- **Homepage**: https://yourdomain.com
- **Services**: https://yourdomain.com/services
- **Contact**: https://yourdomain.com/contact
- **About**: https://yourdomain.com/about
- **Blog**: https://yourdomain.com/blog
- **Terms**: https://yourdomain.com/terms
- **Privacy**: https://yourdomain.com/privacy

## Services/Products
### Service 1
Description of service 1
**Book at**: https://yourdomain.com/services/service-1

### Service 2
Description of service 2
**Book at**: https://yourdomain.com/services/service-2

## Contact Information
- **Email**: contact@yourdomain.com
- **Phone**: +1 234 567 8900
- **Location**: City, Country

## FAQs
Q: Common question 1?
A: Answer to question 1.

Q: Common question 2?
A: Answer to question 2.
`.trim();
}

/**
 * System prompt that defines the AI's personality and behavior.
 * Customize this to match your brand voice.
 * 
 * STYLE CHARACTERISTICS:
 * - Warm: Less
 * - Enthusiastic: Less
 * - Headers & Lists: Default
 * - Emoji: Less
 */
export const CHAT_SYSTEM_PROMPT = `You are [AI Name], the virtual assistant for [Your Business].

## Your Identity
- You are an intelligent, practical AI assistant
- You speak in a direct, clear, and professional tone
- Get right to the point. Above all be practical.
- Avoid excessive warmth or enthusiasm

## Your Capabilities
1. **Answer questions accurately** using the knowledge base
2. **Provide exact URLs** when users ask about pages or features
3. **Anticipate needs** and suggest relevant information
4. **Connect information** by suggesting related topics/services
5. **Ask clarifying questions** when needed
6. **Admit uncertainty** when something is outside your knowledge

## Response Guidelines
1. Always provide working URLs from the knowledge base
2. Be specific and actionable, not vague
3. Structure complex responses clearly with headers and lists
4. Recommend relevant services when appropriate
5. Direct users to contact for personalized inquiries
6. Keep responses concise and practical

## Important Rules
- NEVER provide medical, legal, or financial advice
- Direct personal inquiries to contact information
- Be honest when something is outside your knowledge
- Always use EXACT URLs from the knowledge base
- NEVER use em dashes (—). Use commas, periods, or colons instead.
- Minimize emoji usage
`;
```

---

## UI Design & Behavior Specification

### Desktop Behavior

#### Collapsed State (Default)
```
┌────────────────────────────────────────────────────────────────┐
│  [    Ask me anything...                        ]  [Ctrl+I] ▲  │
└────────────────────────────────────────────────────────────────┘
```
- **Position**: Fixed bottom center, 600px width, max 90vw
- **Style**: `bg-[#111111]`, `border border-white/10`, `rounded-full`
- **Padding**: `pl-6 pr-2 py-2`
- **Shadow**: `shadow-2xl`
- **Visibility**: Hides when footer is in viewport (IntersectionObserver)
- **Trigger**: Click input, press Ctrl+I, or type and submit

#### Expanded State
```
┌────────────────────────────────────────────────────────────────┐
│  🤖 Bot Name                                              [×]  │
│  AI Assistant                                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  [Welcome message / Empty state]                               │
│                                                                │
│  AI:  Response content here...                                 │
│                                          User: Message here    │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  [    Type a message...                                  ] ▲   │
└────────────────────────────────────────────────────────────────┘
```
- **Backdrop**: `fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]`
- **Panel**: `bg-[#0a0a0a] border border-white/10 rounded-2xl`
- **Messages area**: `h-[70vh] max-h-[600px] overflow-y-auto`
- **Animation**: `animate-in slide-in-from-bottom-4 duration-300`

### Mobile Behavior

#### Collapsed State
- Input bar hidden on mobile (no floating bar)
- FAB or other trigger mechanism

#### Expanded State (Full Screen Overlay)
```
┌────────────────────────────────────────────────────────────────┐
│  ◀  🤖 Bot Name                                           [×]  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  [Messages area - flex-1 with overflow scroll]                 │
│                                                                │
│  AI avatar + response                                          │
│                                          User bubble           │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  [    Input with auto-resize              ] [Send button]      │
└────────────────────────────────────────────────────────────────┘
```
- **Container**: `fixed top-0 left-0 right-0 z-[9999]`
- **Height**: Dynamic via Visual Viewport API (handles keyboard)
- **Layout**: `flex flex-col` with `flex-1 min-h-0` for messages
- **Header**: `flex-shrink-0` with back button, avatar, name, close
- **Input**: `flex-shrink-0`, 16px font (prevents iOS zoom)

### Component States

| State | Desktop | Mobile |
|-------|---------|--------|
| **Closed** | Floating input bar | Hidden |
| **Opening** | Slide up animation | Full screen fade |
| **Open/Empty** | Welcome message + bot logo | Same |
| **Open/Active** | Messages + streaming | Same |
| **Loading** | ThinkingDots animation | Same |
| **Closing** | Fade out | Slide down |

### Input Bar Design

#### Desktop Input (Collapsed)
```css
/* Floating search bar */
.input-collapsed {
  background: #111111;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 9999px; /* rounded-full */
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  width: 600px;
  max-width: 90vw;
}
```

#### Desktop Input (Expanded)
```css
/* Inside chat panel */
.input-expanded {
  background: #0a0a0a;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 1rem;
  padding: 0.5rem;
}
```

#### Mobile Input
```css
/* Bottom of full-screen overlay */
.input-mobile {
  background: #000;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 0.5rem 0.75rem;
}

.input-mobile-inner {
  background: #303030;
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
}
```

### Send Button States

| State | Style |
|-------|-------|
| **Disabled** | `bg-white/5 text-white/20 cursor-not-allowed` |
| **Ready** | `bg-blue-600 hover:bg-blue-500 text-white` (desktop) |
| **Ready** | `bg-white text-black` (mobile) |
| **Loading** | `Loader2` icon with `animate-spin` |

### Message Bubble Design

#### User Messages
```css
.user-bubble {
  background: #2f2f2f; /* or #303030 */
  color: white;
  border-radius: 1.5rem;
  border-top-right-radius: 0.5rem;
  padding: 0.625rem 1rem;
  max-width: 80-85%;
  align-self: flex-end;
}
```

#### AI Messages
```css
.ai-message {
  display: flex;
  gap: 0.75rem;
  max-width: 80-90%;
}

.ai-avatar {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  flex-shrink: 0;
}

.ai-content {
  color: rgba(255,255,255,0.9);
  font-size: 15px;
  line-height: 1.625;
  white-space: pre-wrap;
}
```

### Transitions & Animations

| Element | Transition |
|---------|------------|
| **Container position** | `transition-all duration-500 ease-out` |
| **Backdrop** | Instant appear/disappear |
| **Chat panel** | `animate-in slide-in-from-bottom-4 duration-300` |
| **Input bar visibility** | `transition-opacity duration-300` |
| **Send button** | `transition-colors` |

### Z-Index Hierarchy

| Layer | Z-Index |
|-------|---------|
| Backdrop | 9998 |
| Chat container | 9999 |
| Mobile overlay | 9999 |

### Key Interactions

1. **Keyboard shortcut**: Ctrl+I / Cmd+I opens chat and focuses input
2. **Click backdrop**: Closes chat
3. **Enter key**: Sends message
4. **Shift+Enter**: New line in input
5. **Auto-scroll**: Messages area scrolls to bottom on new messages
6. **Auto-focus**: Input focused when chat opens
7. **Footer hide**: Floating bar hides when footer enters viewport

### Key Principles for RAG Context

1. **Be Exhaustive**: Include all pages, services, contact info
2. **Use Exact URLs**: Never let the AI hallucinate links
3. **Structure Clearly**: Use headers, lists, tables
4. **Keep Updated**: Update when your site changes
5. **Include Personality**: Define how the AI should speak

---

## API Route Implementation

### `app/api/chatbot/route.ts`

```typescript
import { getChatContext, CHAT_SYSTEM_PROMPT } from '@/lib/chat-context';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GLM_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

// Groq models in priority order (primary → fallbacks)
const MODELS = [
    'moonshotai/kimi-k2-instruct-0905',      // Kimi K2: 200 tok/s, 262K context
    'meta-llama/llama-4-maverick-17b-128e-instruct', // Llama 4 Maverick: 600 tok/s
    'meta-llama/llama-4-scout-17b-16e-instruct',     // Llama 4 Scout: 750 tok/s
    'qwen/qwen3-32b',                         // Qwen3-32B: 400 tok/s
    'llama-3.3-70b-versatile',               // Llama 3.3 70B: reliable fallback
];

// GLM backup models (when all Groq models fail)
const GLM_MODELS = [
    'glm-4.7-flash',
    'glm-4.6v-flash',
    'glm-4.5-flash',
];

interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

/**
 * Try a Groq model with the given messages
 */
async function tryGroqModel(
    model: string,
    messages: ChatMessage[],
): Promise<Response | null> {
    try {
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                messages,
                max_tokens: 1024,
                temperature: 0.7,
                stream: true,
            }),
        });

        if (response.ok) {
            return response;
        }

        // Log error but continue to next model
        const errorText = await response.text();
        console.warn(`Model ${model} failed (${response.status}):`, errorText.slice(0, 200));
        return null;
    } catch (error) {
        console.warn(`Model ${model} error:`, error);
        return null;
    }
}

/**
 * Try a GLM model as backup
 */
async function tryGlmModel(
    model: string,
    messages: ChatMessage[],
): Promise<Response | null> {
    if (!process.env.GLM_API_KEY) {
        return null;
    }

    try {
        const response = await fetch(GLM_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GLM_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                messages,
                max_tokens: 1024,
                temperature: 0.7,
                stream: true,
            }),
        });

        if (response.ok) {
            return response;
        }

        const errorText = await response.text();
        console.warn(`GLM Model ${model} failed (${response.status}):`, errorText.slice(0, 200));
        return null;
    } catch (error) {
        console.warn(`GLM Model ${model} error:`, error);
        return null;
    }
}

export async function POST(req: Request) {
    try {
        // 1. Validate API keys
        if (!process.env.GROQ_API_KEY && !process.env.GLM_API_KEY) {
            console.error('No API keys configured!');
            return new Response(
                JSON.stringify({ error: 'No API keys configured' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // 2. Parse request
        const { messages } = await req.json();
        console.log('Chat API received', messages.length, 'messages');

        // 3. Build system prompt with RAG context
        const context = getChatContext();
        const systemMessage = `${CHAT_SYSTEM_PROMPT}

Here is the knowledge base you should use to answer questions:

${context}`;

        // 4. Prepare messages array
        const apiMessages: ChatMessage[] = [
            { role: 'system', content: systemMessage },
            ...messages,
        ];

        // 5. Try models in order until one succeeds
        let response: Response | null = null;
        let usedModel = '';

        // Try Groq models first
        for (const model of MODELS) {
            response = await tryGroqModel(model, apiMessages);
            if (response) {
                usedModel = model;
                console.log(`Using Groq model: ${model}`);
                break;
            }
        }

        // If all Groq models failed, try GLM backup
        if (!response && process.env.GLM_API_KEY) {
            console.log('Groq models failed, trying GLM backup...');
            for (const model of GLM_MODELS) {
                response = await tryGlmModel(model, apiMessages);
                if (response) {
                    usedModel = `glm:${model}`;
                    console.log(`Using GLM model: ${model}`);
                    break;
                }
            }
        }

        // 6. Handle all models failed
        if (!response) {
            return new Response(
                JSON.stringify({ error: 'All models failed. Please try again later.' }),
                { status: 503, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // 7. Transform SSE stream to simplified format
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        const transformStream = new TransformStream({
            async transform(chunk, controller) {
                const text = decoder.decode(chunk);
                const lines = text.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') {
                            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                            return;
                        }
                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices?.[0]?.delta?.content || '';
                            if (content) {
                                const formattedData = JSON.stringify({ content });
                                controller.enqueue(encoder.encode(`data: ${formattedData}\n\n`));
                            }
                        } catch {
                            // Skip malformed JSON
                        }
                    }
                }
            },
        });

        // 8. Return streaming response
        const readableStream = response.body?.pipeThrough(transformStream);

        return new Response(readableStream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'X-Model-Used': usedModel,
            },
        });
    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to generate response' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
```

---

## Chat Component Implementation

### `components/ChatBot.tsx`

```typescript
"use client";

import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { X, Send, Loader2, ArrowUp, ArrowLeft } from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp?: string;
}

// ============================================================================
// UTILITIES
// ============================================================================

const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Renders message content with clickable URLs
 */
function renderMessageContent(content: string) {
    const urlRegex = /(https?:\/\/[^\s<]+|www\.[^\s<]+)/gi;
    const parts = content.split(urlRegex);

    return parts.map((part, index) => {
        if (part.match(urlRegex)) {
            const url = part.startsWith('www.') ? `https://${part}` : part;
            return (
                <a
                    key={`url-${index}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300 break-all"
                >
                    {part}
                </a>
            );
        }
        return <span key={`text-${index}`}>{part}</span>;
    });
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Animated thinking indicator
 */
function ThinkingDots() {
    return (
        <div className="flex items-center gap-1 px-2">
            <span className="text-white/50 text-sm">thinking</span>
            <span className="flex gap-0.5">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </span>
        </div>
    );
}

// ============================================================================
// MOBILE CHAT VIEW
// ============================================================================

interface MobileChatViewProps {
    messages: Message[];
    input: string;
    setInput: (value: string) => void;
    isLoading: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
    inputRef: React.RefObject<HTMLTextAreaElement | null>;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
    botName: string;
    botLogo: string;
}

function MobileChatView({
    messages,
    input,
    setInput,
    isLoading,
    onSubmit,
    onClose,
    inputRef,
    messagesEndRef,
    botName,
    botLogo
}: MobileChatViewProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Use Visual Viewport API for instant keyboard handling
    useLayoutEffect(() => {
        const updateHeight = () => {
            const vv = window.visualViewport;
            const height = vv ? vv.height : window.innerHeight;
            if (containerRef.current) {
                containerRef.current.style.height = `${height}px`;
            }
        };

        updateHeight();

        const vv = window.visualViewport;
        if (vv) {
            vv.addEventListener('resize', updateHeight);
            vv.addEventListener('scroll', updateHeight);
        }
        window.addEventListener('resize', updateHeight);

        return () => {
            if (vv) {
                vv.removeEventListener('resize', updateHeight);
                vv.removeEventListener('scroll', updateHeight);
            }
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, messagesEndRef]);

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 right-0 z-[9999] bg-black flex flex-col overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-white/5 flex-shrink-0">
                <button
                    onClick={onClose}
                    className="p-2 -ml-2 rounded-full text-white/70 active:bg-white/10"
                    aria-label="Back"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                        <Image src={botLogo} alt={botName} width={28} height={28} className="object-contain" />
                    </div>
                    <span className="text-white font-medium text-sm">{botName}</span>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 -mr-2 rounded-full text-white/70 active:bg-white/10"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-black min-h-0">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full space-y-4 py-12">
                        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                            <Image src={botLogo} alt={botName} width={40} height={40} className="object-contain" />
                        </div>
                        <div className="text-center space-y-1">
                            <h3 className="text-white font-medium">{botName}</h3>
                            <p className="text-white/50 text-sm max-w-[260px]">
                                Ask me anything about your app or service.
                            </p>
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
                                    <Image src={botLogo} alt="AI" width={20} height={20} className="object-contain" />
                                </div>
                                <p className="text-white/90 text-[15px] leading-relaxed whitespace-pre-wrap pt-1">
                                    {renderMessageContent(message.content)}
                                </p>
                            </div>
                        ) : (
                            <div className="bg-[#303030] text-white px-4 py-2.5 rounded-3xl rounded-tr-lg max-w-[85%]">
                                <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                                    {message.content}
                                </p>
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && messages[messages.length - 1]?.role === "user" && (
                    <div className="flex gap-3">
                        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                            <Image src={botLogo} alt="AI" width={20} height={20} className="object-contain" />
                        </div>
                        <ThinkingDots />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={onSubmit} className="bg-black px-3 py-2 border-t border-white/5 flex-shrink-0">
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
                        placeholder={`Ask ${botName} anything...`}
                        rows={1}
                        className="bg-transparent text-white placeholder:text-white/40 focus:outline-none flex-1 text-[16px] resize-none overflow-y-auto leading-6 max-h-[120px] py-1"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 mb-0.5 ${
                            input.trim() ? "bg-white text-black" : "bg-white/20 text-white/40"
                        }`}
                        aria-label="Send"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUp className="w-5 h-5" />}
                    </button>
                </div>
            </form>
        </div>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface ChatBotProps {
    botName?: string;
    botLogo?: string;
    apiEndpoint?: string;
    welcomeMessage?: string;
    placeholder?: string;
}

export default function ChatBot({
    botName = "AI Assistant",
    botLogo = "/logo.png",
    apiEndpoint = "/api/chatbot",
    welcomeMessage = "I am here to help. Ask me anything.",
    placeholder = "Ask me anything...",
}: ChatBotProps) {
    // State
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Refs
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Hooks
    const pathname = usePathname();
    const router = useRouter();

    // ========================================================================
    // EFFECTS
    // ========================================================================

    // Hide when footer is visible
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
    }, [pathname]);

    // Keyboard shortcut: Ctrl+I
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

    // Auto-scroll on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // ========================================================================
    // HANDLERS
    // ========================================================================

    /**
     * Send message to API and handle streaming response
     */
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
            const response = await fetch(apiEndpoint, {
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
                    content: "I apologize, I am experiencing difficulties. Please try again in a moment.",
                    timestamp: formatTime(new Date())
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }, [messages, isLoading, apiEndpoint]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isOpen && input.trim()) {
            setIsOpen(true);
        }
        if (input.trim()) {
            sendMessage(input);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setMessages([]);
        setInput("");
    };

    // ========================================================================
    // RENDER
    // ========================================================================

    // Mobile: Full-screen overlay
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
                botName={botName}
                botLogo={botLogo}
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
                className={`fixed z-[9999] transition-all duration-500 ease-out ${
                    isOpen
                        ? "bottom-0 left-0 right-0 md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:w-[600px] md:max-w-[90vw]"
                        : "bottom-8 left-1/2 -translate-x-1/2"
                }`}
            >
                {/* Expanded Chat Panel (Desktop) */}
                {isOpen && !isMobile && (
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden mb-4 animate-in slide-in-from-bottom-4 duration-300">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center relative overflow-hidden">
                                    <Image src={botLogo} alt={botName} fill className="object-contain p-1" />
                                </div>
                                <div>
                                    <h2 className="text-white font-medium">{botName}</h2>
                                    <p className="text-white/50 text-xs">AI Assistant</p>
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
                        <div className="h-[70vh] max-h-[600px] overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 && (
                                <div className="text-center py-8">
                                    <div className="relative w-14 h-14 mx-auto mb-4">
                                        <Image src={botLogo} alt={botName} fill className="object-contain" />
                                    </div>
                                    <h3 className="text-lg text-white mb-2">Welcome!</h3>
                                    <p className="text-white/50 text-sm max-w-xs mx-auto">{welcomeMessage}</p>
                                </div>
                            )}
                            
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                            message.role === "user"
                                                ? "bg-[#2f2f2f] text-white"
                                                : "bg-white/10 text-white"
                                        }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                            {message.role === "assistant" 
                                                ? renderMessageContent(message.content) 
                                                : message.content}
                                        </p>
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

                {/* Input Bar */}
                <form 
                    onSubmit={onSubmit} 
                    className={`transition-opacity duration-300 ${
                        !isVisible && !isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                >
                    <div className="relative group">
                        <div className={`relative flex items-end justify-between gap-2 transition-all duration-300 ${
                            isOpen && !isMobile
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
                                placeholder={placeholder}
                                rows={1}
                                className={`bg-transparent text-white placeholder:text-white/30 focus:outline-none flex-1 text-base resize-none overflow-y-auto leading-6 max-h-[120px] py-1 ${
                                    isOpen && !isMobile ? "px-2" : ""
                                }`}
                            />

                            <div className={`flex items-center gap-3 ${isOpen && !isMobile ? "mb-0.5" : ""}`}>
                                {!isOpen && !input && (
                                    <span className="text-white/20 text-xs font-mono hidden sm:block">Ctrl+I</span>
                                )}
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                        input.trim()
                                            ? "bg-blue-600 hover:bg-blue-500 text-white"
                                            : "bg-white/5 text-white/20 cursor-not-allowed"
                                    }`}
                                    aria-label="Send message"
                                >
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUp className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
```

---

## UI/UX Design System

### Design Principles

| Principle | Implementation |
|-----------|----------------|
| **Dark Mode** | Pure black (#000, #0a0a0a) backgrounds |
| **Glassmorphism** | `backdrop-blur-sm`, `bg-white/10` overlays |
| **Minimal Chrome** | Thin borders (`border-white/10`) |
| **Smooth Transitions** | `transition-all duration-300` |
| **Clear Hierarchy** | User messages right, AI left |

### Color Tokens

```css
/* Backgrounds */
--bg-primary: #000000;
--bg-secondary: #0a0a0a;
--bg-elevated: #111111;
--bg-input: #303030;

/* Text */
--text-primary: rgba(255, 255, 255, 0.9);
--text-secondary: rgba(255, 255, 255, 0.5);
--text-muted: rgba(255, 255, 255, 0.3);

/* Borders */
--border-subtle: rgba(255, 255, 255, 0.05);
--border-default: rgba(255, 255, 255, 0.1);

/* Accents (customize per brand) */
--accent-primary: #3b82f6; /* Blue */
--accent-hover: #2563eb;
```

### Message Bubbles

```
User Message:
┌─────────────────────────────────┐
│  bg-[#2f2f2f] or bg-[#303030]  │
│  rounded-3xl rounded-tr-lg     │
│  px-4 py-2.5                   │
│  max-w-[80-85%]                │
└─────────────────────────────────┘

AI Message:
┌────────────────────────────────────┐
│  bg-white/10                       │
│  rounded-2xl                       │
│  px-4 py-3                         │
│  max-w-[80-90%]                    │
│  + avatar on left                  │
└────────────────────────────────────┘
```

### Layout States

```
COLLAPSED (Desktop):
┌──────────────────────────────────────────────────┐
│ [    Ask me anything...              ] [Ctrl+I] ▲│
└──────────────────────────────────────────────────┘
   └── Centered, 600px width, rounded-full

EXPANDED (Desktop):
┌──────────────────────────────────────────────────┐
│  🤖 Bot Name                               [×]  │
├──────────────────────────────────────────────────┤
│                                                  │
│  [AI message...]                                 │
│                           [User message]         │
│                                                  │
├──────────────────────────────────────────────────┤
│ [    Type a message...                     ] ▲  │
└──────────────────────────────────────────────────┘

MOBILE (Full Screen):
┌──────────────────────────────────────────────────┐
│  ◀  🤖 Bot Name                            [×]  │
├──────────────────────────────────────────────────┤
│  [Empty state / Messages]                        │
│                                                  │
├──────────────────────────────────────────────────┤
│ [    Input...                              ] ▲  │
└──────────────────────────────────────────────────┘
```

---

## Streaming & SSE Handling

### Server-Side (API Route)

The API transforms the raw LLM SSE stream into a simplified format:

```
Raw LLM Response:
data: {"id":"...","choices":[{"delta":{"content":"Hello"}}]}
data: {"id":"...","choices":[{"delta":{"content":" world"}}]}
data: [DONE]

Transformed Response:
data: {"content":"Hello"}
data: {"content":" world"}
data: [DONE]
```

### Client-Side (Component)

```typescript
// Create reader from response stream
const reader = response.body?.getReader();
const decoder = new TextDecoder();

while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // Decode chunk and split into SSE lines
    const chunk = decoder.decode(value);
    const lines = chunk.split("\n").filter(line => line.startsWith("data: "));

    for (const line of lines) {
        const data = line.slice(6); // Remove "data: " prefix
        if (data === "[DONE]") continue;
        
        try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
                // Append to accumulated content
                assistantContent += parsed.content;
                // Update message in state
                setMessages(prev => prev.map(m => 
                    m.id === assistantId ? { ...m, content: assistantContent } : m
                ));
            }
        } catch {
            // Skip malformed data
        }
    }
}
```

---

## Model Selection & Fallbacks

### Strategy

```
1. Try primary model (fastest/best)
   ↓ (if fails)
2. Try fallback models in order
   ↓ (if all fail)
3. Try backup provider (GLM)
   ↓ (if all fail)
4. Return 503 error
```

### Groq Models (as of Jan 2026)

| Model | Speed | Context | Best For |
|-------|-------|---------|----------|
| `moonshotai/kimi-k2-instruct-0905` | 200 tok/s | 262K | Long context, reasoning |
| `meta-llama/llama-4-maverick-17b-128e-instruct` | 600 tok/s | 131K | Fast, capable |
| `meta-llama/llama-4-scout-17b-16e-instruct` | 750 tok/s | 131K | Fastest |
| `qwen/qwen3-32b` | 400 tok/s | 131K | Balanced |
| `llama-3.3-70b-versatile` | 300 tok/s | 131K | Reliable fallback |

### GLM Backup Models

| Model | Notes |
|-------|-------|
| `glm-4.7-flash` | Latest free model |
| `glm-4.6v-flash` | Vision-capable |
| `glm-4.5-flash` | Stable |

---

## Mobile Optimization

### Key Techniques

1. **Visual Viewport API**: Handles keyboard appearance without layout jumps

```typescript
useLayoutEffect(() => {
    const updateHeight = () => {
        const vv = window.visualViewport;
        const height = vv ? vv.height : window.innerHeight;
        containerRef.current.style.height = `${height}px`;
    };

    const vv = window.visualViewport;
    vv?.addEventListener('resize', updateHeight);
    vv?.addEventListener('scroll', updateHeight);
}, []);
```

1. **Font Size**: Use 16px minimum to prevent iOS zoom on focus

2. **Full-Screen Container**: `fixed top-0 left-0 right-0 z-[9999]`

3. **Flex Layout**: `flex flex-col` with `flex-1 min-h-0` for messages area

4. **Input at Bottom**: `flex-shrink-0` for input area

---

## Keyboard & Accessibility

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+I` / `⌘+I` | Open chat |
| `Enter` | Send message |
| `Shift+Enter` | New line |
| `Escape` | Close chat (add if needed) |

### ARIA Attributes

```typescript
// Buttons
<button aria-label="Send message">
<button aria-label="Close chat">
<button aria-label="Back">

// Input
<textarea
    aria-label="Chat input"
    placeholder="..."
/>

// Live region for new messages (optional)
<div aria-live="polite" aria-atomic="true">
```

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables:
   - `GROQ_API_KEY`
   - `GLM_API_KEY` (optional)

### Critical: Remove Static Export

```typescript
// next.config.ts - CORRECT for API routes
const nextConfig = {};

// ❌ WRONG - disables API routes
const nextConfig = { output: 'export' };
```

### Deployment Checklist

- [ ] Add `GROQ_API_KEY` to Vercel environment variables
- [ ] Remove `output: 'export'` from next.config.ts
- [ ] Test locally with `npm run dev` first
- [ ] Verify API route: `curl -X POST http://localhost:3000/api/chatbot`
- [ ] Check streaming works in production

---

## Troubleshooting

### 405 Method Not Allowed

**Cause**: `output: 'export'` in `next.config.ts` disables API routes.
**Fix**: Remove `output: 'export'`.

### Streaming Not Working

1. Check `Content-Type: text/event-stream` header
2. Verify `Cache-Control: no-cache`
3. Test with curl: `curl -N http://localhost:3000/api/chatbot ...`

### API Key Not Working

1. Restart dev server after adding `.env.local`
2. Check format: `GROQ_API_KEY=gsk_...` (no quotes)
3. Verify on Vercel: Settings → Environment Variables

### Model Rate Limits

Groq has rate limits per model. The fallback chain handles this automatically.

### Mobile Keyboard Issues

1. Ensure Visual Viewport API is used
2. Font size ≥ 16px
3. Container uses dynamic height, not `100vh`

### URLs Not Clickable

Check the `renderMessageContent` function is applied to assistant messages.

---

## Usage Example

```typescript
// In your layout.tsx or page
import ChatBot from "@/components/ChatBot";

export default function Layout({ children }) {
    return (
        <>
            {children}
            <ChatBot
                botName="My AI Assistant"
                botLogo="/my-logo.png"
                apiEndpoint="/api/chatbot"
                welcomeMessage="How can I help you today?"
                placeholder="Ask me anything..."
            />
        </>
    );
}
```

---

## Customization Checklist

When porting to a new project:

- [ ] Update `lib/chat-context.ts` with your knowledge base
- [ ] Customize system prompt personality
- [ ] Update bot name and logo
- [ ] Adjust color tokens (accent colors)
- [ ] Add/modify welcome message
- [ ] Configure API endpoint name
- [ ] Set up environment variables
- [ ] Test on mobile and desktop
