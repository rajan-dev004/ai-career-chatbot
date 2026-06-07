/**
 * POST /api/chat - Route Handler
 * 
 * Purpose: Next.js API Route handler that securely handles chatbot requests.
 * - Extracts message and career mode parameters from the client's HTTP request body.
 * - Validates API key and request parameters.
 * - Calls the Google Generative AI SDK using the 'gemini-flash-latest' model.
 * - Creates a dynamic prompt based on the selected CareerMode.
 * - Spawns a ReadableStream to stream the text blocks from the Gemini API back to the client in real-time.
 */
import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest } from 'next/server'
import { getCareerPrompt } from '@/lib/prompts'
import type { CareerMode } from '@/lib/types'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return Response.json({ error: 'GEMINI_API_KEY is not configured on the server.' }, { status: 500 })
  }

  let message: string
  let mode: CareerMode
  try {
    const body = await req.json()
    message = body.message ?? ''
    mode = body.mode ?? 'general'
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!message.trim()) {
    return Response.json({ error: 'Message is required.' }, { status: 400 })
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
  const prompt = getCareerPrompt(mode, message)

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const result = await model.generateContentStream(prompt)
        for await (const chunk of result.stream) {
          const text = chunk.text()
          if (text) controller.enqueue(encoder.encode(text))
        }
        controller.close()
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error'
        controller.enqueue(encoder.encode(`\n\n❌ **Error:** ${msg}`))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
