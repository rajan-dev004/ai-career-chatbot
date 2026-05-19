module.exports = [
"[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/.next-internal/server/app/api/chat/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/lib/prompts.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Prompt Configurations
 * 
 * Purpose: Stores and dynamically constructs the custom system prompts for different career modes.
 * - BASE_PROMPT: Sets the AI assistant's persona as an expert career counselor and specifies output markdown formatting rules.
 * - CAREER_PROMPTS: Maps specific instructions for each career mode (roadmap structure, skill gaps, comparison criteria, and portfolio ideas).
 * - getCareerPrompt: Merges the mode-specific prompt with the user's input before sending it to the Gemini API.
 */ __turbopack_context__.s([
    "getCareerPrompt",
    ()=>getCareerPrompt
]);
const BASE_PROMPT = `You are an expert career guidance counselor and AI assistant specialized in career development, skills assessment, and professional growth. Provide detailed, actionable, and personalized advice. Format your responses with proper markdown: use **bold**, ## headers, bullet lists, and numbered steps for clarity. Be concise but comprehensive.`;
const CAREER_PROMPTS = {
    general: `${BASE_PROMPT}\n\nAnswer the user's career-related question comprehensively.`,
    roadmap: `${BASE_PROMPT}\n\nGenerate a detailed 6-12 month career roadmap with:
- ## Month-by-month milestones and goals
- Specific learning objectives for each phase
- Recommended courses, certifications, or resources (with links where possible)
- Practical action steps
- A clear timeline

Format with clear sections (## Month 1-2, ## Month 3-4, etc.) and actionable bullet points.`,
    skill_gap: `${BASE_PROMPT}\n\nPerform a thorough skill gap analysis:
- ## Current Skills: identify what the user already has
- ## Target Role Requirements: list required skills for their goal
- ## Skill Gaps: highlight exactly what's missing
- ## Learning Resources: specific courses, books, or platforms for each gap
- ## Action Plan: concrete weekly steps to bridge each gap

Use tables where helpful for comparison.`,
    comparison: `${BASE_PROMPT}\n\nCompare the job roles mentioned by the user across these dimensions:
- ## Overview: brief description of each role
- ## Day-to-Day Responsibilities
- ## Required Skills & Qualifications
- ## Career Progression Path
- ## Salary Ranges (global and India context)
- ## Industry Demand & Job Market Outlook
- ## Which role fits better and why

Use a comparison table if applicable.`,
    projects: `${BASE_PROMPT}\n\nRecommend portfolio projects tailored to the user's career path:
- ## Project Name & Description
- ## Technologies & Tools to use
- ## Difficulty: Beginner / Intermediate / Advanced
- ## Learning Outcomes & skills gained
- ## Portfolio Impact: how this helps their resume
- ## Getting Started: first 3 steps to begin today

Provide at least 3-5 project ideas with enough detail to start immediately.`
};
function getCareerPrompt(mode, userInput) {
    const prompt = CAREER_PROMPTS[mode] ?? CAREER_PROMPTS.general;
    return `${prompt}\n\n---\nUser question: ${userInput}`;
}
}),
"[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * POST /api/chat - Route Handler
 * 
 * Purpose: Next.js API Route handler that securely handles chatbot requests.
 * - Extracts message and career mode parameters from the client's HTTP request body.
 * - Validates API key and request parameters.
 * - Calls the Google Generative AI SDK using the 'gemini-flash-latest' model.
 * - Creates a dynamic prompt based on the selected CareerMode.
 * - Spawns a ReadableStream to stream the text blocks from the Gemini API back to the client in real-time.
 */ __turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$prompts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/lib/prompts.ts [app-route] (ecmascript)");
;
;
const runtime = 'nodejs';
async function POST(req) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return Response.json({
            error: 'GEMINI_API_KEY is not configured on the server.'
        }, {
            status: 500
        });
    }
    let message;
    let mode;
    try {
        const body = await req.json();
        message = body.message ?? '';
        mode = body.mode ?? 'general';
    } catch  {
        return Response.json({
            error: 'Invalid request body.'
        }, {
            status: 400
        });
    }
    if (!message.trim()) {
        return Response.json({
            error: 'Message is required.'
        }, {
            status: 400
        });
    }
    const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](apiKey);
    const model = genAI.getGenerativeModel({
        model: 'gemini-flash-latest'
    });
    const prompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$prompts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCareerPrompt"])(mode, message);
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start (controller) {
            try {
                const result = await model.generateContentStream(prompt);
                for await (const chunk of result.stream){
                    const text = chunk.text();
                    if (text) controller.enqueue(encoder.encode(text));
                }
                controller.close();
            } catch (err) {
                const msg = err instanceof Error ? err.message : 'Unknown error';
                controller.enqueue(encoder.encode(`\n\n❌ **Error:** ${msg}`));
                controller.close();
            }
        }
    });
    return new Response(stream, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache, no-store',
            'X-Content-Type-Options': 'nosniff'
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__79b3633b._.js.map