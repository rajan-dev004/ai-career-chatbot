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
  console.log('\n[Telemetry] [API-Chat] POST /api/chat request received.');
  const tRequestStart = performance.now();

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('[Telemetry] [API-Chat] Error: GEMINI_API_KEY is not configured on the server.');
    return Response.json({ error: 'GEMINI_API_KEY is not configured on the server.' }, { status: 500 })
  }

  let message: string
  let mode: CareerMode
  try {
    const body = await req.json()
    message = body.message ?? ''
    mode = body.mode ?? 'general'
  } catch (err) {
    console.error('[Telemetry] [API-Chat] Error parsing request body:', err);
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!message.trim()) {
    console.warn('[Telemetry] [API-Chat] Warning: Empty message received.');
    return Response.json({ error: 'Message is required.' }, { status: 400 })
  }

  console.log(`[Telemetry] [API-Chat] Initializing GoogleGenerativeAI with mode: "${mode}"`);
  const tInitStart = performance.now();
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
  const prompt = getCareerPrompt(mode, message)
  console.log(`[Telemetry] [API-Chat] Model client initialized in ${(performance.now() - tInitStart).toFixed(2)}ms`);

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      console.log('[Telemetry] [API-Chat] Stream initialized. Requesting content from Gemini...');
      const tStreamStart = performance.now();
      let firstTokenReceived = false;

      try {
        const result = await model.generateContentStream(prompt)
        console.log(`[Telemetry] [API-Chat] generateContentStream promise resolved in ${(performance.now() - tStreamStart).toFixed(2)}ms`);

        for await (const chunk of result.stream) {
          if (!firstTokenReceived) {
            console.log(`[Telemetry] [API-Chat] First token received in ${(performance.now() - tStreamStart).toFixed(2)}ms (Time-To-First-Token)`);
            firstTokenReceived = true;
          }
          const text = chunk.text()
          if (text) controller.enqueue(encoder.encode(text))
        }

        console.log(`[Telemetry] [API-Chat] Stream complete. Total stream duration: ${(performance.now() - tStreamStart).toFixed(2)}ms`);
        console.log(`[Telemetry] [API-Chat] Total API Chat Request lifecycle took ${(performance.now() - tRequestStart).toFixed(2)}ms\n`);
        controller.close()
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error'
        console.error(`[Telemetry] [API-Chat] Stream generation failed after ${(performance.now() - tStreamStart).toFixed(2)}ms:`, err);
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
