import { getGoddessContext, GODDESS_SYSTEM_PROMPT } from '@/lib/goddess-context';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

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

        // Call Groq API with streaming
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: apiMessages,
                max_tokens: 1024,
                temperature: 0.7,
                stream: true,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Groq API Error:', error);
            return new Response(
                JSON.stringify({ error: 'Failed to generate response' }),
                { status: response.status, headers: { 'Content-Type': 'application/json' } }
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
