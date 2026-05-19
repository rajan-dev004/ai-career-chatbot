module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Utility Helpers
 * 
 * Purpose: Provides helper functions used across the application.
 * - cn(...): Combines classes conditionally (clsx) and handles Tailwind CSS overrides/conflicts (tailwind-merge).
 * - formatTimestamp(iso): Formats an ISO date string into a user-friendly timestamp (e.g., "10:30 AM").
 * - formatDateLabel(iso): Formats an ISO date string into relative terms (e.g., "Today", "Yesterday", or "3 days ago").
 * - generateChatTitle(firstMessage): Generates a concise title from the user's initial message to label the chat session in the sidebar.
 */ __turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatDateLabel",
    ()=>formatDateLabel,
    "formatTimestamp",
    ()=>formatTimestamp,
    "generateChatTitle",
    ()=>generateChatTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatTimestamp(iso) {
    try {
        const d = new Date(iso);
        return d.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch  {
        return '';
    }
}
function formatDateLabel(iso) {
    try {
        const d = new Date(iso);
        const now = new Date();
        const diff = now.getTime() - d.getTime();
        const days = Math.floor(diff / 86400000);
        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        return d.toLocaleDateString([], {
            month: 'short',
            day: 'numeric'
        });
    } catch  {
        return '';
    }
}
function generateChatTitle(firstMessage) {
    const cleaned = firstMessage.trim();
    return cleaned.length > 50 ? cleaned.slice(0, 47) + '…' : cleaned;
}
}),
"[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/hooks/useChat.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * useChat Custom Hook
 * 
 * Purpose: Centralized state management for chat sessions, message histories, and API communication.
 * - Handles saving/loading chat history to and from localStorage to persist chats across reloads.
 * - Manages CRUD actions for chats (creating a new chat, loading an existing one, deleting, and clearing all).
 * - Handles sending user prompts to the '/api/chat' server endpoint.
 * - Implements chunk-by-chunk reading of the server-side text response stream to support real-time typing/streaming.
 * - Integrates AbortController to allow users to cancel/stop an ongoing streaming response.
 */ __turbopack_context__.s([
    "useChat",
    ()=>useChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/uuid/dist/esm/v4.js [app-ssr] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const STORAGE_KEY = 'ai_career_chats';
function loadChats() {
    if ("TURBOPACK compile-time truthy", 1) return {};
    //TURBOPACK unreachable
    ;
}
function saveChats(chats) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
    } catch  {}
}
function useChat() {
    const [chats, setChats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [currentChatId, setCurrentChatId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isStreaming, setIsStreaming] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [streamingText, setStreamingText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [careerMode, setCareerMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('general');
    const abortRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Load from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setChats(loadChats());
    }, []);
    // Persist on every change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        saveChats(chats);
    }, [
        chats
    ]);
    const currentChat = currentChatId ? chats[currentChatId] ?? null : null;
    const messages = currentChat?.messages ?? [];
    const createNewChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
        const newChat = {
            id,
            title: 'New Chat',
            timestamp: new Date().toISOString(),
            messages: [],
            mode: careerMode
        };
        setChats((prev)=>({
                ...prev,
                [id]: newChat
            }));
        setCurrentChatId(id);
        setStreamingText('');
        return id;
    }, [
        careerMode
    ]);
    const loadChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((chatId)=>{
        setCurrentChatId(chatId);
        setStreamingText('');
    }, []);
    const deleteChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((chatId)=>{
        setChats((prev)=>{
            const next = {
                ...prev
            };
            delete next[chatId];
            return next;
        });
        setCurrentChatId((prev)=>prev === chatId ? null : prev);
    }, []);
    const clearAllChats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setChats({});
        setCurrentChatId(null);
        setStreamingText('');
    }, []);
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (userInput)=>{
        if (!userInput.trim() || isStreaming) return;
        // Get or create chat
        let chatId = currentChatId;
        let existingChat;
        if (!chatId || !chats[chatId]) {
            chatId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
            existingChat = {
                id: chatId,
                title: 'New Chat',
                timestamp: new Date().toISOString(),
                messages: [],
                mode: careerMode
            };
        } else {
            existingChat = {
                ...chats[chatId]
            };
        }
        const userMsg = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            role: 'user',
            content: userInput.trim(),
            timestamp: new Date().toISOString(),
            mode: careerMode
        };
        const updatedMessages = [
            ...existingChat.messages,
            userMsg
        ];
        const title = existingChat.messages.length === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateChatTitle"])(userInput) : existingChat.title;
        const updatedChat = {
            ...existingChat,
            title,
            messages: updatedMessages,
            timestamp: new Date().toISOString()
        };
        setChats((prev)=>({
                ...prev,
                [chatId]: updatedChat
            }));
        setCurrentChatId(chatId);
        setIsStreaming(true);
        setStreamingText('');
        abortRef.current = new AbortController();
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userInput.trim(),
                    mode: careerMode
                }),
                signal: abortRef.current.signal
            });
            if (!res.ok || !res.body) {
                const err = await res.json().catch(()=>({
                        error: 'Stream failed'
                    }));
                throw new Error(err.error ?? 'Request failed');
            }
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let fullText = '';
            while(true){
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, {
                    stream: true
                });
                fullText += chunk;
                setStreamingText(fullText);
            }
            const aiMsg = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                role: 'assistant',
                content: fullText,
                timestamp: new Date().toISOString(),
                mode: careerMode
            };
            setChats((prev)=>({
                    ...prev,
                    [chatId]: {
                        ...prev[chatId],
                        messages: [
                            ...prev[chatId]?.messages ?? [],
                            aiMsg
                        ],
                        timestamp: new Date().toISOString()
                    }
                }));
        } catch (err) {
            if (err.name === 'AbortError') return;
            const errMsg = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                role: 'assistant',
                content: `❌ **Error:** ${err.message}`,
                timestamp: new Date().toISOString()
            };
            setChats((prev)=>({
                    ...prev,
                    [chatId]: {
                        ...prev[chatId],
                        messages: [
                            ...prev[chatId]?.messages ?? [],
                            errMsg
                        ]
                    }
                }));
        } finally{
            setIsStreaming(false);
            setStreamingText('');
            abortRef.current = null;
        }
    }, [
        currentChatId,
        chats,
        careerMode,
        isStreaming
    ]);
    const stopStreaming = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        abortRef.current?.abort();
    }, []);
    return {
        chats,
        currentChatId,
        currentChat,
        messages,
        isStreaming,
        streamingText,
        careerMode,
        setCareerMode,
        sendMessage,
        stopStreaming,
        createNewChat,
        loadChat,
        deleteChat,
        clearAllChats
    };
}
}),
"[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Sidebar Component
 * 
 * Purpose: Renders the left-side navigation sidebar for chat session management.
 * - Handles the display, creation, selection, and deletion of past chat sessions.
 * - Supports searching and filtering the chat history by title.
 * - Allows collapsing/expanding the sidebar to maximize chat workspace space.
 * - Uses Framer Motion for spring-based expand/collapse animations.
 */ __turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/sun.js [app-ssr] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/moon.js [app-ssr] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function Sidebar({ chats, currentChatId, onNewChat, onLoadChat, onDeleteChat, onClearAll }) {
    const [collapsed, setCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [hoveredId, setHoveredId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('dark');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const isLight = document.documentElement.classList.contains('light');
        setTheme(isLight ? 'light' : 'dark');
    }, []);
    const toggleTheme = ()=>{
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        if (nextTheme === 'light') {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
        localStorage.setItem('theme', nextTheme);
        setTheme(nextTheme);
    };
    const sortedChats = Object.values(chats).sort((a, b)=>new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const filtered = search ? sortedChats.filter((c)=>c.title.toLowerCase().includes(search.toLowerCase())) : sortedChats;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].aside, {
            animate: {
                width: collapsed ? 64 : 260
            },
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30
            },
            className: "relative flex flex-col h-full bg-bgSidebar border-r border-borderSubtle shrink-0 overflow-hidden z-20",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2.5 px-4 py-4 border-b border-borderSubtle', collapsed && 'justify-center px-2'),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 rounded-lg bg-gradient-to-br from-[#780206] to-[#061161] flex items-center justify-center shrink-0 shadow-lg shadow-[#780206]/30",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                className: "w-4 h-4 text-white"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            children: !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    width: 0
                                },
                                animate: {
                                    opacity: 1,
                                    width: 'auto'
                                },
                                exit: {
                                    opacity: 0,
                                    width: 0
                                },
                                transition: {
                                    duration: 0.2
                                },
                                className: "overflow-hidden whitespace-nowrap",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-sm gradient-text",
                                    children: "Excel Your Career"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                    lineNumber: 86,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                lineNumber: 79,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('px-3 py-3', collapsed && 'px-2'),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onNewChat,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('group w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200', 'bg-gradient-to-r from-[#780206] to-[#061161] hover:brightness-110', 'text-white shadow-md shadow-[#780206]/20 hover:shadow-[#780206]/40', collapsed && 'justify-center px-2'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "w-4 h-4 shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    exit: {
                                        opacity: 0
                                    },
                                    className: "whitespace-nowrap",
                                    children: "New Chat"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                    lineNumber: 106,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    children: !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            height: 0
                        },
                        animate: {
                            opacity: 1,
                            height: 'auto'
                        },
                        exit: {
                            opacity: 0,
                            height: 0
                        },
                        className: "px-3 pb-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-bgHover border border-borderSubtle",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: "w-3.5 h-3.5 text-textMuted"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                    lineNumber: 127,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: search,
                                    onChange: (e)=>setSearch(e.target.value),
                                    placeholder: "Search chats…",
                                    className: "flex-1 bg-transparent text-xs text-textPrimary placeholder-textMuted outline-none"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                    lineNumber: 128,
                                    columnNumber: 17
                                }, this),
                                search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSearch(''),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-3 h-3 text-textMuted hover:text-textPrimary transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 136,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                    lineNumber: 135,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                            lineNumber: 126,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                        lineNumber: 120,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-2 py-1 space-y-0.5",
                    children: [
                        !collapsed && filtered.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-10 text-textMuted text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                    className: "w-8 h-8 mx-auto mb-2 opacity-30"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                    lineNumber: 148,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: search ? 'No chats found' : 'No conversations yet'
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                    lineNumber: 149,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 opacity-60",
                                    children: "Start a new chat above"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                            lineNumber: 147,
                            columnNumber: 13
                        }, this),
                        filtered.map((chat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                layout: true,
                                onMouseEnter: ()=>setHoveredId(chat.id),
                                onMouseLeave: ()=>setHoveredId(null),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('group relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-150', currentChatId === chat.id ? 'bg-[#780206]/20 border border-[#780206]/30' : 'hover:bg-bgHover border border-transparent', collapsed && 'justify-center px-2'),
                                onClick: ()=>onLoadChat(chat.id),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-4 h-4 shrink-0', currentChatId === chat.id ? 'text-red-400' : 'text-textMuted group-hover:text-textSecondary')
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        children: !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0
                                            },
                                            animate: {
                                                opacity: 1
                                            },
                                            exit: {
                                                opacity: 0
                                            },
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-xs font-medium truncate', currentChatId === chat.id ? 'text-red-200' : 'text-textSecondary'),
                                                    children: chat.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-textMuted mt-0.5",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateLabel"])(chat.timestamp)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                            lineNumber: 174,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 172,
                                        columnNumber: 15
                                    }, this),
                                    !collapsed && hoveredId === chat.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            onDeleteChat(chat.id);
                                        },
                                        className: "shrink-0 p-1 rounded-md hover:bg-red-500/20 text-textMuted hover:text-red-400 transition-all",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                            lineNumber: 195,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 191,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, chat.id, true, {
                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this),
                collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-auto px-2 py-3 flex justify-center border-t border-borderSubtle",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleTheme,
                        className: "p-2 rounded-lg text-textMuted hover:text-textSecondary hover:bg-bgHover transition-all",
                        title: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
                        children: theme === 'dark' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                            className: "w-4 h-4 text-amber-400"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                            lineNumber: 210,
                            columnNumber: 35
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                            className: "w-4 h-4 text-indigo-400"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                            lineNumber: 210,
                            columnNumber: 80
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                        lineNumber: 205,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                    lineNumber: 204,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    children: !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        className: "px-3 py-3 border-t border-borderSubtle space-y-1.5",
                        children: [
                            Object.keys(chats).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClearAll,
                                className: "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-textMuted hover:text-red-400 hover:bg-red-500/10 transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 227,
                                        columnNumber: 19
                                    }, this),
                                    "Clear all chats"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                lineNumber: 223,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleTheme,
                                className: "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-textMuted hover:text-textSecondary hover:bg-bgHover transition-all",
                                children: [
                                    theme === 'dark' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                        className: "w-3.5 h-3.5 text-amber-400"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 237,
                                        columnNumber: 37
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                        className: "w-3.5 h-3.5 text-indigo-400"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 237,
                                        columnNumber: 86
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: theme === 'dark' ? 'Light Mode' : 'Dark Mode'
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 238,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                lineNumber: 233,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 px-3 py-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-5 h-5 rounded-full bg-gradient-to-br from-[#780206] to-[#061161] flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "w-3 h-3 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                            lineNumber: 243,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 242,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-textMuted",
                                        children: "Powered by Gemini 2.0 Flash"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 245,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                lineNumber: 241,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                        lineNumber: 218,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                    lineNumber: 216,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setCollapsed((v)=>!v),
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('absolute top-1/2 -translate-y-1/2 -right-3 z-30', 'w-6 h-6 rounded-full bg-bgHover border border-borderSubtle shadow-md', 'flex items-center justify-center text-textSecondary hover:text-textPrimary transition-all'),
                    children: collapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                        className: "w-3 h-3"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                        lineNumber: 260,
                        columnNumber: 24
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                        className: "w-3 h-3"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                        lineNumber: 260,
                        columnNumber: 63
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                    lineNumber: 252,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs) <export default as minpath>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "minpath",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
}),
"[externals]/node:process [external] (node:process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:process", () => require("node:process"));

module.exports = mod;
}),
"[externals]/node:process [external] (node:process, cjs) <export default as minproc>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "minproc",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:process [external] (node:process, cjs)");
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs) <export fileURLToPath as urlToPath>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "urlToPath",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
}),
"[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * MessageBubble Component
 * 
 * Purpose: Renders an individual chat message bubble in the chat transcript.
 * - Highlights code blocks and renders formatted Markdown for AI responses.
 * - Displays a simple user icon or sparkles icon depending on who sent the message.
 * - Includes a Copy-to-Clipboard button to copy message contents.
 * - Uses Framer Motion for entering animations.
 */ __turbopack_context__.s([
    "default",
    ()=>MessageBubble
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/react-markdown/lib/index.js [app-ssr] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/remark-gfm/lib/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$rehype$2d$highlight$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/rehype-highlight/lib/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function CopyButton({ text }) {
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const copy = async ()=>{
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(()=>setCopied(false), 2000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: copy,
        className: "p-1.5 rounded-md text-textMuted hover:text-textSecondary hover:bg-bgHover transition-all",
        title: "Copy message",
        children: copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
            className: "w-3.5 h-3.5 text-emerald-400"
        }, void 0, false, {
            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
            lineNumber: 40,
            columnNumber: 17
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
            className: "w-3.5 h-3.5"
        }, void 0, false, {
            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
            lineNumber: 40,
            columnNumber: 70
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
function MessageBubble({ message, isStreaming, streamingText }) {
    const isUser = message.role === 'user';
    const content = isStreaming && streamingText !== undefined ? streamingText : message.content;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 12
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.3,
            ease: 'easeOut'
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('group flex gap-3 w-full', isUser && 'flex-row-reverse'),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-0.5', isUser ? 'bg-gradient-to-br from-[#780206] to-[#061161]' : 'bg-bgHover border border-borderSubtle'),
                children: isUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                    className: "w-4 h-4 text-white"
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                    lineNumber: 64,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                    className: "w-4 h-4 text-red-400"
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                    lineNumber: 65,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col max-w-[80%] min-w-0', isUser && 'items-end'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative rounded-2xl px-4 py-3 text-sm leading-relaxed', isUser ? 'bg-gradient-to-br from-[#780206] to-[#061161] text-white rounded-tr-sm' : 'bg-bgCard border border-borderSubtle rounded-tl-sm'),
                        children: isUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "whitespace-pre-wrap",
                            children: content
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "prose-ai",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                                    remarkPlugins: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
                                    ],
                                    rehypePlugins: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$rehype$2d$highlight$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
                                    ],
                                    children: content
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this),
                                isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-block w-0.5 h-4 bg-red-400 ml-0.5 cursor-blink align-middle"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                                    lineNumber: 88,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-1.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity', isUser && 'flex-row-reverse'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-textMuted",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTimestamp"])(message.timestamp)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            !isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CopyButton, {
                                text: content
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                                lineNumber: 100,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/TypingIndicator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * TypingIndicator Component
 * 
 * Purpose: Renders a pulsing loading indicator (three bouncing dots)
 * to let the user know that the AI is generating or preparing a response.
 */ __turbopack_context__.s([
    "default",
    ()=>TypingIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function TypingIndicator() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm bg-bgCard border border-borderSubtle w-fit",
        children: [
            0,
            1,
            2
        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-2 h-2 rounded-full bg-red-400",
                style: {
                    animation: `pulse-dot 1.4s ease-in-out ${i * 0.16}s infinite`
                }
            }, i, false, {
                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/TypingIndicator.tsx",
                lineNumber: 12,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/TypingIndicator.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * WelcomeScreen Component
 * 
 * Purpose: Renders the initial dashboard onboarding view shown when a chat is empty.
 * - Displays a welcome hero heading and description.
 * - Shows interactive "Feature Cards" for specific career assistance modes (Roadmap, Skill Gap, Comparison, Projects).
 * - Provides clickable quick prompts at the bottom to easily initiate a career guidance search.
 */ __turbopack_context__.s([
    "default",
    ()=>WelcomeScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/map.js [app-ssr] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/target.js [app-ssr] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/scale.js [app-ssr] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/wrench.js [app-ssr] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-ssr] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
'use client';
;
;
;
const FEATURES = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"],
        mode: 'roadmap',
        title: 'Career Roadmap',
        description: 'Get a personalized 6–12 month plan with milestones, resources, and timelines.',
        color: 'from-blue-500/20 to-indigo-600/20',
        border: 'border-blue-500/20',
        iconColor: 'text-blue-400',
        prompt: 'Create a 6-month career roadmap for me to become a full-stack developer'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"],
        mode: 'skill_gap',
        title: 'Skill Gap Analysis',
        description: 'Identify missing skills for your target role and get a learning plan.',
        color: 'from-emerald-500/20 to-teal-600/20',
        border: 'border-emerald-500/20',
        iconColor: 'text-emerald-400',
        prompt: 'Analyze skill gaps for transitioning from backend to ML engineering'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"],
        mode: 'comparison',
        title: 'Job Comparison',
        description: 'Compare roles side by side — responsibilities, pay, growth, and fit.',
        color: 'from-amber-500/20 to-orange-600/20',
        border: 'border-amber-500/20',
        iconColor: 'text-amber-400',
        prompt: 'Compare Software Engineer vs Data Scientist roles in 2025'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"],
        mode: 'projects',
        title: 'Project Ideas',
        description: 'Get tailored portfolio projects that impress recruiters in your field.',
        color: 'from-purple-500/20 to-pink-600/20',
        border: 'border-purple-500/20',
        iconColor: 'text-purple-400',
        prompt: 'Suggest 5 portfolio projects for a React frontend developer'
    }
];
const QUICK_PROMPTS = [
    'How do I switch careers to product management?',
    'What skills do I need for DevOps in 2025?',
    'Review my career path as a junior developer',
    'Best certifications for cloud computing?'
];
function WelcomeScreen({ onSuggest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center w-full min-h-full px-4 py-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "my-auto flex flex-col items-center w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: -20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        duration: 0.5
                    },
                    className: "text-center mb-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#780206]/10 border border-[#780206]/20 text-red-400 text-xs font-medium mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                    className: "w-3.5 h-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this),
                                "AI-Powered Career Guidance"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl sm:text-4xl font-bold mb-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "gradient-text",
                                children: "Excel Your Career"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[#9898b0] text-base max-w-md mx-auto leading-relaxed",
                            children: "Your personal AI career counselor. Get roadmaps, skill analysis, job comparisons, and project ideas — all tailored to you."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mb-8",
                    children: FEATURES.map((feat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: 0.1 + i * 0.07,
                                duration: 0.4
                            },
                            onClick: ()=>onSuggest(feat.prompt, feat.mode),
                            className: `group text-left p-4 rounded-2xl bg-gradient-to-br ${feat.color} border ${feat.border} glass-hover transition-all duration-200 hover:scale-[1.02] hover:shadow-card`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `mt-0.5 p-2 rounded-lg bg-white/5 ${feat.iconColor}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(feat.icon, {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                            lineNumber: 104,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                        lineNumber: 103,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-semibold text-sm text-textPrimary",
                                                        children: feat.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                        className: "w-3.5 h-3.5 text-textMuted group-hover:text-textSecondary group-hover:translate-x-0.5 transition-all"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                                lineNumber: 107,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-textSecondary mt-1 leading-relaxed",
                                                children: feat.description
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                                lineNumber: 111,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                        lineNumber: 106,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                lineNumber: 102,
                                columnNumber: 15
                            }, this)
                        }, feat.title, false, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    transition: {
                        delay: 0.5
                    },
                    className: "w-full max-w-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] uppercase tracking-widest text-textMuted font-medium mb-2 text-center",
                            children: "Or try a quick question"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2 justify-center",
                            children: QUICK_PROMPTS.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onSuggest(p, 'general'),
                                    className: "px-3 py-1.5 rounded-full text-xs text-textSecondary bg-bgHover border border-borderSubtle hover:bg-bgHover/80 hover:text-textPrimary hover:border-borderHover transition-all duration-150",
                                    children: p
                                }, p, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
            lineNumber: 71,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/ChatContainer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * ChatContainer Component
 * 
 * Purpose: Manages and displays the scrollable chat message list.
 * - Displays the WelcomeScreen if there are no messages in the active chat.
 * - Iterates over existing messages and renders each using the MessageBubble component.
 * - Dynamically renders a TypingIndicator or a streaming MessageBubble while waiting for or receiving AI responses.
 * - Automatically scrolls to the bottom of the chat container as new messages arrive.
 */ __turbopack_context__.s([
    "default",
    ()=>ChatContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$MessageBubble$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/MessageBubble.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$TypingIndicator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/TypingIndicator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$WelcomeScreen$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function ChatContainer({ messages, isStreaming, streamingText, onSuggest }) {
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        bottomRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [
        messages,
        streamingText
    ]);
    const isEmpty = messages.length === 0 && !isStreaming;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 overflow-y-auto min-h-0",
        children: isEmpty ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$WelcomeScreen$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            onSuggest: onSuggest
        }, void 0, false, {
            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
            lineNumber: 39,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl mx-auto px-4 py-6 space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    initial: false,
                    children: [
                        messages.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$MessageBubble$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                message: msg
                            }, msg.id, false, {
                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this)),
                        isStreaming && (streamingText ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$MessageBubble$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            message: {
                                id: 'streaming',
                                role: 'assistant',
                                content: streamingText,
                                timestamp: new Date().toISOString()
                            },
                            isStreaming: true,
                            streamingText: streamingText
                        }, "streaming", false, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
                            lineNumber: 50,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-full bg-bgHover border border-borderSubtle flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        children: "✨"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
                                        lineNumber: 64,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
                                    lineNumber: 63,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$TypingIndicator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
                                    lineNumber: 66,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, "typing", true, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
                            lineNumber: 62,
                            columnNumber: 17
                        }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
                    lineNumber: 42,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: bottomRef
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
                    lineNumber: 71,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
            lineNumber: 41,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/lib/types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * TypeScript Type Definitions
 * 
 * Purpose: Defines core structural interfaces and types utilized throughout the application.
 * - CareerMode: Represents the different chat categories (General advice, Roadmap development, Skill gap analysis, Job comparison, Portfolio project ideas).
 * - Message: Represents a single dialogue entry in a chat (user prompt or assistant reply).
 * - Chat: Represents a single, unified conversation session with an ID, title, timestamp, and array of messages.
 * - ChatState: Describes the local state structure for useChat.
 * - CAREER_MODES: A static array containing UI labels, descriptions, and icons for each career mode.
 */ __turbopack_context__.s([
    "CAREER_MODES",
    ()=>CAREER_MODES
]);
const CAREER_MODES = [
    {
        value: 'general',
        label: 'General',
        icon: '💬',
        description: 'Career Q&A and advice'
    },
    {
        value: 'roadmap',
        label: 'Roadmap',
        icon: '🗺️',
        description: '6-12 month career plan'
    },
    {
        value: 'skill_gap',
        label: 'Skill Gap',
        icon: '🎯',
        description: 'Identify missing skills'
    },
    {
        value: 'comparison',
        label: 'Job Compare',
        icon: '⚖️',
        description: 'Compare job roles'
    },
    {
        value: 'projects',
        label: 'Projects',
        icon: '🛠️',
        description: 'Portfolio project ideas'
    }
];
}),
"[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * ChatInputBar Component
 * 
 * Purpose: Handles the user text input area at the bottom of the chat view.
 * - Manages the auto-resizing text field (textarea) that expands as the user types.
 * - Includes a Career Mode selector dropdown allowing the user to switch the context of the chat (e.g., General, Roadmap, Projects).
 * - Toggles between a Send button and a Stop (Square) button depending on whether the AI is currently streaming a response.
 * - Handles keyboard shortcuts like Enter (to submit) and Shift+Enter (to type a new line).
 */ __turbopack_context__.s([
    "default",
    ()=>ChatInputBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/square.js [app-ssr] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/mic.js [app-ssr] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/lib/types.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function ChatInputBar({ onSend, onStop, isStreaming, careerMode, onModeChange, prefill, onPrefillConsumed }) {
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [modeOpen, setModeOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Handle prefill from welcome screen chips
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (prefill) {
            setText(prefill);
            textareaRef.current?.focus();
            onPrefillConsumed?.();
        }
    }, [
        prefill,
        onPrefillConsumed
    ]);
    // Auto-resize textarea
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = Math.min(el.scrollHeight, 180) + 'px';
    }, [
        text
    ]);
    const handleSend = ()=>{
        const trimmed = text.trim();
        if (!trimmed || isStreaming) return;
        onSend(trimmed);
        setText('');
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
    };
    const handleKey = (e)=>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    const activeMode = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CAREER_MODES"].find((m)=>m.value === careerMode);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-t border-borderSubtle bg-bgBase/80 backdrop-blur-xl px-4 py-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl mx-auto space-y-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex items-end gap-2 rounded-2xl bg-bgCard border border-borderSubtle px-3 py-2.5 focus-within:border-[#780206]/50 transition-colors duration-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative shrink-0 self-end mb-0.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setModeOpen((v)=>!v),
                                    className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#780206]/15 border border-[#780206]/25 text-red-300 text-xs font-medium hover:bg-[#780206]/25 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: activeMode.icon
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                            lineNumber: 81,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hidden sm:inline",
                                            children: activeMode.label
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                            lineNumber: 82,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                            lineNumber: 83,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: modeOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: 8,
                                            scale: 0.95
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0,
                                            scale: 1
                                        },
                                        exit: {
                                            opacity: 0,
                                            y: 8,
                                            scale: 0.95
                                        },
                                        transition: {
                                            duration: 0.15
                                        },
                                        className: "absolute bottom-full left-0 mb-2 z-50 w-52 rounded-xl bg-bgHover border border-borderSubtle shadow-xl overflow-hidden",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CAREER_MODES"].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    onModeChange(m.value);
                                                    setModeOpen(false);
                                                },
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full flex items-start gap-2.5 px-3 py-2.5 text-left hover:bg-bgHover transition-colors', careerMode === m.value && 'bg-[#780206]/15'),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-base",
                                                        children: m.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-xs font-medium', careerMode === m.value ? 'text-red-300' : 'text-textSecondary'),
                                                                children: m.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                                                lineNumber: 106,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] text-textMuted mt-0.5",
                                                                children: m.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                                                lineNumber: 109,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                                        lineNumber: 105,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, m.value, true, {
                                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                                lineNumber: 96,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                        lineNumber: 88,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            ref: textareaRef,
                            value: text,
                            onChange: (e)=>setText(e.target.value),
                            onKeyDown: handleKey,
                            placeholder: `Ask anything about your career… (${activeMode.label} mode)`,
                            rows: 1,
                            className: "flex-1 bg-transparent text-sm text-textPrimary placeholder-textMuted resize-none outline-none leading-relaxed py-1 max-h-44"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 shrink-0 self-end mb-0.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "p-1.5 rounded-lg text-textMuted hover:text-textSecondary hover:bg-bgHover transition-all",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this),
                                isStreaming ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onStop,
                                    className: "p-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                        lineNumber: 142,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: handleSend,
                                    disabled: !text.trim(),
                                    whileHover: {
                                        scale: text.trim() ? 1.05 : 1
                                    },
                                    whileTap: {
                                        scale: 0.95
                                    },
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('p-2 rounded-lg transition-all duration-200', text.trim() ? 'bg-gradient-to-br from-[#780206] to-[#061161] text-white shadow-md shadow-[#780206]/30 hover:shadow-[#780206]/50' : 'bg-bgHover/40 text-textMuted cursor-not-allowed'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                        lineNumber: 157,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-[10px] text-textMuted",
                    children: [
                        "Press ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                            className: "px-1 py-0.5 rounded bg-bgHover font-mono text-[9px]",
                            children: "Enter"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                            lineNumber: 165,
                            columnNumber: 17
                        }, this),
                        " to send · ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                            className: "px-1 py-0.5 rounded bg-bgHover font-mono text-[9px]",
                            children: "Shift+Enter"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                            lineNumber: 166,
                            columnNumber: 13
                        }, this),
                        " for new line"
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                    lineNumber: 164,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
            lineNumber: 71,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * HomePage Component
 * 
 * Purpose: Main dashboard layout container that mounts the core UI components.
 * - Imports and invokes the useChat custom hook to manage state & messaging.
 * - Displays a responsive sidebar (Sidebar) which is hidden or rendered via slide-out drawer on mobile viewports.
 * - Integrates the scrollable chat display (ChatContainer) and the bottom input bar (ChatInputBar).
 * - Manages sidebar drawer open/close states (mobileOpen) and handles click suggestions from features cards.
 */ __turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/hooks/useChat.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/layout/Sidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$ChatContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/chat/ChatContainer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$components$2f$input$2f$ChatInputBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/components/input/ChatInputBar.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function HomePage() {
    const { chats, currentChatId, messages, isStreaming, streamingText, careerMode, setCareerMode, sendMessage, stopStreaming, createNewChat, loadChat, deleteChat, clearAllChats } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChat"])();
    const [prefill, setPrefill] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSuggest = (text, mode)=>{
        setCareerMode(mode);
        setPrefill(text);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen overflow-hidden bg-bgBase",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:flex",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    chats: chats,
                    currentChatId: currentChatId,
                    onNewChat: createNewChat,
                    onLoadChat: loadChat,
                    onDeleteChat: deleteChat,
                    onClearAll: clearAllChats
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: mobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden",
                            onClick: ()=>setMobileOpen(false)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx",
                            lineNumber: 57,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                x: -280
                            },
                            animate: {
                                x: 0
                            },
                            exit: {
                                x: -280
                            },
                            transition: {
                                type: 'spring',
                                stiffness: 300,
                                damping: 30
                            },
                            className: "fixed left-0 top-0 h-full z-40 md:hidden flex",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    chats: chats,
                                    currentChatId: currentChatId,
                                    onNewChat: ()=>{
                                        createNewChat();
                                        setMobileOpen(false);
                                    },
                                    onLoadChat: (id)=>{
                                        loadChat(id);
                                        setMobileOpen(false);
                                    },
                                    onDeleteChat: deleteChat,
                                    onClearAll: clearAllChats
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx",
                                    lineNumber: 67,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setMobileOpen(false),
                                    className: "mt-4 ml-1 p-1.5 rounded-full bg-bgHover border border-borderSubtle text-textSecondary hover:text-textPrimary self-start",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx",
                                    lineNumber: 75,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col flex-1 min-w-0 h-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:hidden flex items-center gap-3 px-4 py-3 border-b border-borderSubtle bg-bgSidebar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMobileOpen(true),
                                className: "p-2 rounded-lg text-textSecondary hover:text-textPrimary hover:bg-bgHover transition-all",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-semibold gradient-text",
                                children: "AI Career Guidance"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$ChatContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        messages: messages,
                        isStreaming: isStreaming,
                        streamingText: streamingText,
                        onSuggest: handleSuggest
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__JS__and__Streamlit$2f$AI__Career__Chatbot$2f$src$2f$components$2f$input$2f$ChatInputBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        onSend: sendMessage,
                        onStop: stopStreaming,
                        isStreaming: isStreaming,
                        careerMode: careerMode,
                        onModeChange: setCareerMode,
                        prefill: prefill,
                        onPrefillConsumed: ()=>setPrefill('')
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/AI career JS and Streamlit/AI Career Chatbot/src/app/page.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1c4318c0._.js.map