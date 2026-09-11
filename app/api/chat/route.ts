import { convertToModelMessages, streamText } from 'ai'
import { gateway } from 'ai'
import type { UIMessage } from 'ai'

const systemPrompt = `You are Deniel's portfolio assistant. Answer questions about Deniel John Prado, his work, tools, projects, interests, and how to contact him. Be concise, warm, and useful. If you do not know something from the portfolio context, say so instead of inventing details. Portfolio context: Deniel is a developer, designer, and community builder working across frontend development, documentation, community design, and visual systems. His featured projects are Community Atlas, Field Notes, and Signal Garden. His tools include HTML5, JavaScript, Python, Next.js, Discord, GitHub, and Vercel. Contact: hello@deniel.dev.`

export async function POST(request: Request) {
  const body = await request.json() as { messages?: UIMessage[] }
  const messages = Array.isArray(body.messages) ? body.messages : []
  const modelMessages = await convertToModelMessages(messages)

  const result = streamText({
    model: gateway('openai/gpt-4o-mini'),
    system: systemPrompt,
    messages: modelMessages,
    maxOutputTokens: 500,
    temperature: 0.7,
  })

  return result.toUIMessageStreamResponse()
}
