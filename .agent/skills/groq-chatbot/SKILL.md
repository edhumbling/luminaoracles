---
name: groq-chatbot
description: Build a streaming AI chatbot with Groq API, RAG context, and Next.js. Includes floating UI, model fallbacks, and Vercel deployment.
---

# Groq AI Chatbot Skill

Build a RAG-powered AI chatbot using Groq's ultra-fast inference with Next.js.

## Architecture Overview

```
User Query → GoddessAI.tsx (Client) → /api/goddess (Route) → Groq REST API
                                           ↓
                                    RAG Context (lib/goddess-context.ts)
```

## Files to Create

### 1. Environment Variables

**`.env.local`** (gitignored):

```
GROQ_API_KEY=gsk_your_key_here
```

### 2. RAG Context (`lib/goddess-context.ts`)

```typescript
export function getGoddessContext(): string {
  return `
# Your Knowledge Base
- Site information
- Services, FAQ, contact info
- Any content the AI should know
`.trim();
}

export const GODDESS_SYSTEM_PROMPT = `You are [Name], a helpful AI assistant...`;
```

### 3. API Route (`app/api/[name]/route.ts`)

Key features:

- Direct Groq REST API calls (no SDK dependencies)
- Model fallback chain for reliability
- SSE streaming for real-time responses
- Check for API key existence

```typescript
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const MODELS = [
  'moonshotai/kimi-k2-instruct-0905',  // Primary
  'llama-3.3-70b-versatile',           // Fallback
];

export async function POST(req: Request) {
  // 1. Check API key
  if (!process.env.GROQ_API_KEY) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500 });
  }

  // 2. Get messages and build system prompt with RAG context
  const { messages } = await req.json();
  const apiMessages = [
    { role: 'system', content: systemMessage + ragContext },
    ...messages,
  ];

  // 3. Try models in order
  for (const model of MODELS) {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, messages: apiMessages, stream: true }),
    });
    if (response.ok) {
      // 4. Transform SSE and return
      return new Response(transformedStream, {
        headers: { 'Content-Type': 'text/event-stream' },
      });
    }
  }
}
```

### 4. Chat Component (`components/ChatBot.tsx`)

Key features:

- `useState` for messages, input, loading state
- `fetch` to API route with streaming reader
- Desktop: floating bar that expands
- Mobile: full-screen overlay

```typescript
const sendMessage = async (userMessage: string) => {
  const response = await fetch("/api/chatbot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [...prev, { role: "user", content: userMessage }] }),
  });

  const reader = response.body?.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    // Parse SSE chunks and update UI
  }
};
```

## Groq Models (as of Jan 2026)

| Model | Speed | Context | Best For |
|-------|-------|---------|----------|
| `moonshotai/kimi-k2-instruct-0905` | 200 tok/s | 262K | Reasoning, long context |
| `meta-llama/llama-4-maverick-17b-128e-instruct` | 600 tok/s | 131K | Fast, capable |
| `meta-llama/llama-4-scout-17b-16e-instruct` | 750 tok/s | 131K | Fastest |
| `qwen/qwen3-32b` | 400 tok/s | 131K | Balanced |
| `llama-3.3-70b-versatile` | 300 tok/s | 131K | Reliable fallback |

## Troubleshooting

### 405 Method Not Allowed

**Cause:** `output: 'export'` in `next.config.ts` disables API routes.
**Fix:** Remove `output: 'export'` for Vercel deployment.

```typescript
// next.config.ts - WRONG for API routes
const nextConfig = { output: 'export' }; // ❌

// next.config.ts - CORRECT for API routes
const nextConfig = {}; // ✅
```

### API Key Not Working

1. Restart dev server after adding `.env.local`
2. Check key format: `GROQ_API_KEY=gsk_...`
3. Verify key on Vercel: Settings → Environment Variables

### Model Errors

Use fallback chain - if one model is rate-limited, try the next:

```typescript
for (const model of MODELS) {
  const response = await tryModel(model, messages);
  if (response?.ok) return response;
}
```

## Deployment Checklist

- [ ] Add `GROQ_API_KEY` to Vercel environment variables
- [ ] Remove `output: 'export'` from next.config.ts
- [ ] Test locally with `npm run dev` first
- [ ] Verify API route works: `curl -X POST http://localhost:3000/api/chatbot`
