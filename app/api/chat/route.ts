import { convertToModelMessages, streamText } from 'ai'
import { gateway } from 'ai'
import type { UIMessage } from 'ai'

const systemPrompt = `You are Deniel John Prado's portfolio assistant. Answer questions about his work, tools, projects, interests, and contact details. Be concise, warm, and useful. If you do not know something from this context, say so instead of inventing details. Portfolio context: Deniel is a student developer from the Philippines focused on full stack development, Discord bots, automation, and modern web applications. He is learning backend engineering, APIs, databases, cloud, and DevOps. He is open to open source collaboration, student developer opportunities, web development, Discord bot development, and backend work. Featured projects: Asiana-PTFS-Website, AsianaPTFS-VAMS, aetherspacetime, and AAR-Utilities. Tools include JavaScript, Python, HTML5, Next.js, Discord bots, databases, GitHub, and Vercel. GitHub: https://github.com/aetherspace-a. Personal site: https://haunt.gg/zeop. Contact: hello@deniel.lol.`

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
