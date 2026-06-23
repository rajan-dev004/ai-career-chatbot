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
import { CAREER_MODES } from '@/lib/types'
import type { CareerMode } from '@/lib/types'

export const runtime = 'nodejs'

const MAX_MESSAGE_LENGTH = 4000;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('[API-Chat] Server misconfiguration: Missing API key');
    return Response.json({ error: 'Server misconfiguration.' }, { status: 500 })
  }

  let message: string
  let mode: CareerMode
  
  try {
    const body = await req.json()
    if (typeof body.message !== 'string') {
      return Response.json({ error: 'Invalid message format.' }, { status: 400 })
    }
    message = body.message.trim()
    mode = body.mode
  } catch (err) {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!message) {
    return Response.json({ error: 'Message is required.' }, { status: 400 })
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return Response.json({ error: 'Message exceeds maximum allowed length.' }, { status: 400 })
  }

  const validModes = CAREER_MODES.map(m => m.value)
  if (!validModes.includes(mode)) {
    mode = 'general'
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    const prompt = getCareerPrompt(mode, message)
    
    // Await the initial connection before returning the HTTP 200 stream response.
    // This catches 503s/Auth errors immediately.
    const result = await model.generateContentStream(prompt)

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text()
            if (text) controller.enqueue(encoder.encode(text))
          }
          controller.close()
        } catch (streamErr) {
          console.error('[API-Chat] Error during streaming:', streamErr)
          // Abort the stream on the client side
          controller.error(streamErr)
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

  } catch (err) {
    console.error('[API-Chat] Initial API generation error:', err)
    return Response.json({ error: 'Service temporarily unavailable. Please try again later.' }, { status: 503 })
  }
}
