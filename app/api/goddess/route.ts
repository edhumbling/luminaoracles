import { getGoddessContext, GODDESS_SYSTEM_PROMPT } from '@/lib/goddess-context';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GLM_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

// Groq models in order of priority (primary first, then fallbacks)
const MODELS = [
    'moonshotai/kimi-k2-instruct-0905',      // Kimi K2 - Primary (200 tok/s, 262K context)
    'meta-llama/llama-4-maverick-17b-128e-instruct', // Llama 4 Maverick (600 tok/s, 131K context)
    'meta-llama/llama-4-scout-17b-16e-instruct',     // Llama 4 Scout (750 tok/s, 131K context)
    'qwen/qwen3-32b',                         // Qwen3-32B (400 tok/s, 131K context)
    'llama-3.3-70b-versatile',               // Llama 3.3 70B - Final fallback
];

// GLM backup models (free tier) - used when all Groq models fail
const GLM_MODELS = [
    'glm-4.7-flash',    // Latest free model
    'glm-4.6v-flash',   // Vision-capable free model
    'glm-4.5-flash',    // Stable free model
];

async function tryModel(
    model: string,
    apiMessages: Array<{ role: string; content: string }>,
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
                messages: apiMessages,
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

// Try GLM model (backup fallback)
async function tryGlmModel(
    model: string,
    apiMessages: Array<{ role: string; content: string }>,
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
                messages: apiMessages,
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
        // Check for at least one API key
        if (!process.env.GROQ_API_KEY && !process.env.GLM_API_KEY) {
            console.error('No API keys configured!');
            return new Response(
                JSON.stringify({ error: 'No API keys configured' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const { messages } = await req.json();
        console.log('Goddess AI received request with', messages.length, 'messages');

        // Get RAG context
        const context = getGoddessContext();

        // Build system message with context
        const systemMessage = `${GODDESS_SYSTEM_PROMPT}

Here is the knowledge base about Lumina Oracles that you should use to answer questions:

${context}`;

        // Prepare messages with system prompt
        const apiMessages = [
            { role: 'system', content: systemMessage },
            ...messages,
        ];

        // Try each model in order until one succeeds
        let response: Response | null = null;
        let usedModel = '';

        for (const model of MODELS) {
            response = await tryModel(model, apiMessages);
            if (response) {
                usedModel = model;
                console.log(`Using model: ${model}`);
                break;
            }
        }

        // If all Groq models failed, try GLM backup models
        if (!response && process.env.GLM_API_KEY) {
            console.log('All Groq models failed, trying GLM backup models...');
            for (const model of GLM_MODELS) {
                response = await tryGlmModel(model, apiMessages);
                if (response) {
                    usedModel = `glm:${model}`;
                    console.log(`Using GLM backup model: ${model}`);
                    break;
                }
            }
        }

        if (!response) {
            return new Response(
                JSON.stringify({ error: 'All models failed. Please try again later.' }),
                { status: 503, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Create a TransformStream to convert SSE to a simpler format
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
                                // Format for the client
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

        // Pipe the response through the transform stream
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
        console.error('Goddess AI Error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to generate response' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
