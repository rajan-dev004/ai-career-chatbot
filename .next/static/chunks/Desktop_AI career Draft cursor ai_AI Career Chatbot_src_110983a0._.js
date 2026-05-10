(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatDateLabel",
    ()=>formatDateLabel,
    "formatTimestamp",
    ()=>formatTimestamp,
    "generateChatTitle",
    ()=>generateChatTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatTimestamp(iso) {
    try {
        const d = new Date(iso);
        return d.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (e) {
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
        if (days < 7) return "".concat(days, " days ago");
        return d.toLocaleDateString([], {
            month: 'short',
            day: 'numeric'
        });
    } catch (e) {
        return '';
    }
}
function generateChatTitle(firstMessage) {
    const cleaned = firstMessage.trim();
    return cleaned.length > 50 ? cleaned.slice(0, 47) + '…' : cleaned;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/hooks/useChat.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChat",
    ()=>useChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/lib/utils.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const STORAGE_KEY = 'ai_career_chats';
function loadChats() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        return {};
    }
}
function saveChats(chats) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
    } catch (e) {}
}
function useChat() {
    _s();
    const [chats, setChats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [currentChatId, setCurrentChatId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isStreaming, setIsStreaming] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [streamingText, setStreamingText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [careerMode, setCareerMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('general');
    const abortRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Load from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useChat.useEffect": ()=>{
            setChats(loadChats());
        }
    }["useChat.useEffect"], []);
    // Persist on every change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useChat.useEffect": ()=>{
            saveChats(chats);
        }
    }["useChat.useEffect"], [
        chats
    ]);
    var _chats_currentChatId;
    const currentChat = currentChatId ? (_chats_currentChatId = chats[currentChatId]) !== null && _chats_currentChatId !== void 0 ? _chats_currentChatId : null : null;
    var _currentChat_messages;
    const messages = (_currentChat_messages = currentChat === null || currentChat === void 0 ? void 0 : currentChat.messages) !== null && _currentChat_messages !== void 0 ? _currentChat_messages : [];
    const createNewChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[createNewChat]": ()=>{
            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
            const newChat = {
                id,
                title: 'New Chat',
                timestamp: new Date().toISOString(),
                messages: [],
                mode: careerMode
            };
            setChats({
                "useChat.useCallback[createNewChat]": (prev)=>({
                        ...prev,
                        [id]: newChat
                    })
            }["useChat.useCallback[createNewChat]"]);
            setCurrentChatId(id);
            setStreamingText('');
            return id;
        }
    }["useChat.useCallback[createNewChat]"], [
        careerMode
    ]);
    const loadChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[loadChat]": (chatId)=>{
            setCurrentChatId(chatId);
            setStreamingText('');
        }
    }["useChat.useCallback[loadChat]"], []);
    const deleteChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[deleteChat]": (chatId)=>{
            setChats({
                "useChat.useCallback[deleteChat]": (prev)=>{
                    const next = {
                        ...prev
                    };
                    delete next[chatId];
                    return next;
                }
            }["useChat.useCallback[deleteChat]"]);
            setCurrentChatId({
                "useChat.useCallback[deleteChat]": (prev)=>prev === chatId ? null : prev
            }["useChat.useCallback[deleteChat]"]);
        }
    }["useChat.useCallback[deleteChat]"], []);
    const clearAllChats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[clearAllChats]": ()=>{
            setChats({});
            setCurrentChatId(null);
            setStreamingText('');
        }
    }["useChat.useCallback[clearAllChats]"], []);
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[sendMessage]": async (userInput)=>{
            if (!userInput.trim() || isStreaming) return;
            // Get or create chat
            let chatId = currentChatId;
            let existingChat;
            if (!chatId || !chats[chatId]) {
                chatId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
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
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                role: 'user',
                content: userInput.trim(),
                timestamp: new Date().toISOString(),
                mode: careerMode
            };
            const updatedMessages = [
                ...existingChat.messages,
                userMsg
            ];
            const title = existingChat.messages.length === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateChatTitle"])(userInput) : existingChat.title;
            const updatedChat = {
                ...existingChat,
                title,
                messages: updatedMessages,
                timestamp: new Date().toISOString()
            };
            setChats({
                "useChat.useCallback[sendMessage]": (prev)=>({
                        ...prev,
                        [chatId]: updatedChat
                    })
            }["useChat.useCallback[sendMessage]"]);
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
                    const err = await res.json().catch({
                        "useChat.useCallback[sendMessage]": ()=>({
                                error: 'Stream failed'
                            })
                    }["useChat.useCallback[sendMessage]"]);
                    var _err_error;
                    throw new Error((_err_error = err.error) !== null && _err_error !== void 0 ? _err_error : 'Request failed');
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
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                    role: 'assistant',
                    content: fullText,
                    timestamp: new Date().toISOString(),
                    mode: careerMode
                };
                setChats({
                    "useChat.useCallback[sendMessage]": (prev)=>{
                        var _prev_chatId;
                        var _prev_chatId_messages;
                        return {
                            ...prev,
                            [chatId]: {
                                ...prev[chatId],
                                messages: [
                                    ...(_prev_chatId_messages = (_prev_chatId = prev[chatId]) === null || _prev_chatId === void 0 ? void 0 : _prev_chatId.messages) !== null && _prev_chatId_messages !== void 0 ? _prev_chatId_messages : [],
                                    aiMsg
                                ],
                                timestamp: new Date().toISOString()
                            }
                        };
                    }
                }["useChat.useCallback[sendMessage]"]);
            } catch (err) {
                if (err.name === 'AbortError') return;
                const errMsg = {
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                    role: 'assistant',
                    content: "❌ **Error:** ".concat(err.message),
                    timestamp: new Date().toISOString()
                };
                setChats({
                    "useChat.useCallback[sendMessage]": (prev)=>{
                        var _prev_chatId;
                        var _prev_chatId_messages;
                        return {
                            ...prev,
                            [chatId]: {
                                ...prev[chatId],
                                messages: [
                                    ...(_prev_chatId_messages = (_prev_chatId = prev[chatId]) === null || _prev_chatId === void 0 ? void 0 : _prev_chatId.messages) !== null && _prev_chatId_messages !== void 0 ? _prev_chatId_messages : [],
                                    errMsg
                                ]
                            }
                        };
                    }
                }["useChat.useCallback[sendMessage]"]);
            } finally{
                setIsStreaming(false);
                setStreamingText('');
                abortRef.current = null;
            }
        }
    }["useChat.useCallback[sendMessage]"], [
        currentChatId,
        chats,
        careerMode,
        isStreaming
    ]);
    const stopStreaming = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[stopStreaming]": ()=>{
            var _abortRef_current;
            (_abortRef_current = abortRef.current) === null || _abortRef_current === void 0 ? void 0 : _abortRef_current.abort();
        }
    }["useChat.useCallback[stopStreaming]"], []);
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
_s(useChat, "8WEowKv/3Hvnd+CAbOuO7dWdJC0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Sidebar(param) {
    let { chats, currentChatId, onNewChat, onLoadChat, onDeleteChat, onClearAll } = param;
    _s();
    const [collapsed, setCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [hoveredId, setHoveredId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const sortedChats = Object.values(chats).sort((a, b)=>new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const filtered = search ? sortedChats.filter((c)=>c.title.toLowerCase().includes(search.toLowerCase())) : sortedChats;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].aside, {
            animate: {
                width: collapsed ? 64 : 260
            },
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30
            },
            className: "relative flex flex-col h-full bg-[#0d0d14] border-r border-white/[0.07] shrink-0 overflow-hidden z-20",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.07]', collapsed && 'justify-center px-2'),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 rounded-lg bg-gradient-to-br from-[#780206] to-[#061161] flex items-center justify-center shrink-0 shadow-lg shadow-[#780206]/30",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                className: "w-4 h-4 text-white"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            children: !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-sm gradient-text",
                                    children: "Excel Your Career"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                    lineNumber: 59,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                lineNumber: 52,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-3 py-3', collapsed && 'px-2'),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onNewChat,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('group w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200', 'bg-gradient-to-r from-[#780206] to-[#061161] hover:brightness-110', 'text-white shadow-md shadow-[#780206]/20 hover:shadow-[#780206]/40', collapsed && 'justify-center px-2'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "w-4 h-4 shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
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
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                    lineNumber: 79,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    children: !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.07]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: "w-3.5 h-3.5 text-[#55556a]"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                    lineNumber: 100,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: search,
                                    onChange: (e)=>setSearch(e.target.value),
                                    placeholder: "Search chats…",
                                    className: "flex-1 bg-transparent text-xs text-[#f0f0f5] placeholder-[#55556a] outline-none"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                    lineNumber: 101,
                                    columnNumber: 17
                                }, this),
                                search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSearch(''),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-3 h-3 text-[#55556a] hover:text-white transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 109,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                    lineNumber: 108,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                            lineNumber: 99,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                        lineNumber: 93,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-2 py-1 space-y-0.5",
                    children: [
                        !collapsed && filtered.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-10 text-[#55556a] text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                    className: "w-8 h-8 mx-auto mb-2 opacity-30"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: search ? 'No chats found' : 'No conversations yet'
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                    lineNumber: 122,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 opacity-60",
                                    children: "Start a new chat above"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                            lineNumber: 120,
                            columnNumber: 13
                        }, this),
                        filtered.map((chat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                layout: true,
                                onMouseEnter: ()=>setHoveredId(chat.id),
                                onMouseLeave: ()=>setHoveredId(null),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('group relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-150', currentChatId === chat.id ? 'bg-[#780206]/20 border border-[#780206]/30' : 'hover:bg-white/[0.05] border border-transparent', collapsed && 'justify-center px-2'),
                                onClick: ()=>onLoadChat(chat.id),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-4 h-4 shrink-0', currentChatId === chat.id ? 'text-red-400' : 'text-[#55556a] group-hover:text-[#9898b0]')
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 141,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        children: !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-xs font-medium truncate', currentChatId === chat.id ? 'text-red-200' : 'text-[#c8c8d8]'),
                                                    children: chat.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-[#55556a] mt-0.5",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateLabel"])(chat.timestamp)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                            lineNumber: 147,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 145,
                                        columnNumber: 15
                                    }, this),
                                    !collapsed && hoveredId === chat.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            onDeleteChat(chat.id);
                                        },
                                        className: "shrink-0 p-1 rounded-md hover:bg-red-500/20 text-[#55556a] hover:text-red-400 transition-all",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                            lineNumber: 168,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 164,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, chat.id, true, {
                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    children: !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        className: "px-3 py-3 border-t border-white/[0.07] space-y-1.5",
                        children: [
                            Object.keys(chats).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClearAll,
                                className: "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#55556a] hover:text-red-400 hover:bg-red-500/10 transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 187,
                                        columnNumber: 19
                                    }, this),
                                    "Clear all chats"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                lineNumber: 183,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 px-3 py-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-5 h-5 rounded-full bg-gradient-to-br from-[#780206] to-[#061161] flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "w-3 h-3 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                            lineNumber: 193,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 192,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-[#55556a]",
                                        children: "Powered by Gemini 2.0 Flash"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                        lineNumber: 195,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                                lineNumber: 191,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                        lineNumber: 178,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setCollapsed((v)=>!v),
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('absolute top-1/2 -translate-y-1/2 -right-3 z-30', 'w-6 h-6 rounded-full bg-[#1e1e28] border border-white/10 shadow-md', 'flex items-center justify-center text-[#9898b0] hover:text-white hover:border-white/20 transition-all'),
                    children: collapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                        className: "w-3 h-3"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                        lineNumber: 210,
                        columnNumber: 24
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                        className: "w-3 h-3"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                        lineNumber: 210,
                        columnNumber: 63
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
_s(Sidebar, "jG6HWgjZ6iKssaGtN8oxd4F9FKM=");
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MessageBubble
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/remark-gfm/lib/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$rehype$2d$highlight$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/rehype-highlight/lib/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function CopyButton(param) {
    let { text } = param;
    _s();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const copy = async ()=>{
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(()=>setCopied(false), 2000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: copy,
        className: "p-1.5 rounded-md text-[#55556a] hover:text-[#9898b0] hover:bg-white/[0.06] transition-all",
        title: "Copy message",
        children: copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
            className: "w-3.5 h-3.5 text-emerald-400"
        }, void 0, false, {
            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
            lineNumber: 31,
            columnNumber: 17
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
            className: "w-3.5 h-3.5"
        }, void 0, false, {
            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
            lineNumber: 31,
            columnNumber: 70
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(CopyButton, "NE86rL3vg4NVcTTWDavsT0hUBJs=");
_c = CopyButton;
function MessageBubble(param) {
    let { message, isStreaming, streamingText } = param;
    const isUser = message.role === 'user';
    const content = isStreaming && streamingText !== undefined ? streamingText : message.content;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('group flex gap-3 w-full', isUser && 'flex-row-reverse'),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-0.5', isUser ? 'bg-gradient-to-br from-[#780206] to-[#061161]' : 'bg-[#1e1e28] border border-white/[0.08]'),
                children: isUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                    className: "w-4 h-4 text-white"
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                    lineNumber: 55,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                    className: "w-4 h-4 text-red-400"
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                    lineNumber: 56,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col max-w-[80%] min-w-0', isUser && 'items-end'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative rounded-2xl px-4 py-3 text-sm leading-relaxed', isUser ? 'bg-gradient-to-br from-[#780206] to-[#061161] text-white rounded-tr-sm' : 'bg-[#16161e] border border-white/[0.07] rounded-tl-sm'),
                        children: isUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "whitespace-pre-wrap",
                            children: content
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "prose-ai",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                                    remarkPlugins: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
                                    ],
                                    rehypePlugins: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$rehype$2d$highlight$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
                                    ],
                                    children: content
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, this),
                                isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-block w-0.5 h-4 bg-red-400 ml-0.5 cursor-blink align-middle"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                                    lineNumber: 79,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                            lineNumber: 71,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-1.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity', isUser && 'flex-row-reverse'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-[#55556a]",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTimestamp"])(message.timestamp)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            !isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CopyButton, {
                                text: content
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                                lineNumber: 91,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c1 = MessageBubble;
var _c, _c1;
__turbopack_context__.k.register(_c, "CopyButton");
__turbopack_context__.k.register(_c1, "MessageBubble");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/TypingIndicator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TypingIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function TypingIndicator() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm bg-[#16161e] border border-white/[0.07] w-fit",
        children: [
            0,
            1,
            2
        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-2 h-2 rounded-full bg-red-400",
                style: {
                    animation: "pulse-dot 1.4s ease-in-out ".concat(i * 0.16, "s infinite")
                }
            }, i, false, {
                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/TypingIndicator.tsx",
                lineNumber: 6,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/TypingIndicator.tsx",
        lineNumber: 4,
        columnNumber: 5
    }, this);
}
_c = TypingIndicator;
var _c;
__turbopack_context__.k.register(_c, "TypingIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WelcomeScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/map.js [app-client] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/scale.js [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/wrench.js [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
'use client';
;
;
;
const FEATURES = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"],
        mode: 'roadmap',
        title: 'Career Roadmap',
        description: 'Get a personalized 6–12 month plan with milestones, resources, and timelines.',
        color: 'from-blue-500/20 to-indigo-600/20',
        border: 'border-blue-500/20',
        iconColor: 'text-blue-400',
        prompt: 'Create a 6-month career roadmap for me to become a full-stack developer'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"],
        mode: 'skill_gap',
        title: 'Skill Gap Analysis',
        description: 'Identify missing skills for your target role and get a learning plan.',
        color: 'from-emerald-500/20 to-teal-600/20',
        border: 'border-emerald-500/20',
        iconColor: 'text-emerald-400',
        prompt: 'Analyze skill gaps for transitioning from backend to ML engineering'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"],
        mode: 'comparison',
        title: 'Job Comparison',
        description: 'Compare roles side by side — responsibilities, pay, growth, and fit.',
        color: 'from-amber-500/20 to-orange-600/20',
        border: 'border-amber-500/20',
        iconColor: 'text-amber-400',
        prompt: 'Compare Software Engineer vs Data Scientist roles in 2025'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"],
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
function WelcomeScreen(param) {
    let { onSuggest } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center h-full px-4 py-8 overflow-y-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#780206]/10 border border-[#780206]/20 text-red-400 text-xs font-medium mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                className: "w-3.5 h-3.5"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            "AI-Powered Career Guidance"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl sm:text-4xl font-bold mb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "gradient-text",
                            children: "Excel Your Career"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[#9898b0] text-base max-w-md mx-auto leading-relaxed",
                        children: "Your personal AI career counselor. Get roadmaps, skill analysis, job comparisons, and project ideas — all tailored to you."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mb-8",
                children: FEATURES.map((feat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
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
                        className: "group text-left p-4 rounded-2xl bg-gradient-to-br ".concat(feat.color, " border ").concat(feat.border, " glass-hover transition-all duration-200 hover:scale-[1.02] hover:shadow-card"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-0.5 p-2 rounded-lg bg-white/5 ".concat(feat.iconColor),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(feat.icon, {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                        lineNumber: 95,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold text-sm text-[#e0e0f0]",
                                                    children: feat.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "w-3.5 h-3.5 text-[#55556a] group-hover:text-[#9898b0] group-hover:translate-x-0.5 transition-all"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                            lineNumber: 98,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-[#9898b0] mt-1 leading-relaxed",
                                            children: feat.description
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                            lineNumber: 102,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                            lineNumber: 93,
                            columnNumber: 13
                        }, this)
                    }, feat.title, false, {
                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] uppercase tracking-widest text-[#55556a] font-medium mb-2 text-center",
                        children: "Or try a quick question"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2 justify-center",
                        children: QUICK_PROMPTS.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onSuggest(p, 'general'),
                                className: "px-3 py-1.5 rounded-full text-xs text-[#9898b0] bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] hover:text-[#c8c8d8] hover:border-white/[0.12] transition-all duration-150",
                                children: p
                            }, p, false, {
                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_c = WelcomeScreen;
var _c;
__turbopack_context__.k.register(_c, "WelcomeScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/ChatContainer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$MessageBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/MessageBubble.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$TypingIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/TypingIndicator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$WelcomeScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/WelcomeScreen.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ChatContainer(param) {
    let { messages, isStreaming, streamingText, onSuggest } = param;
    _s();
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatContainer.useEffect": ()=>{
            var _bottomRef_current;
            (_bottomRef_current = bottomRef.current) === null || _bottomRef_current === void 0 ? void 0 : _bottomRef_current.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["ChatContainer.useEffect"], [
        messages,
        streamingText
    ]);
    const isEmpty = messages.length === 0 && !isStreaming;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 overflow-y-auto min-h-0",
        children: isEmpty ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$WelcomeScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            onSuggest: onSuggest
        }, void 0, false, {
            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
            lineNumber: 30,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl mx-auto px-4 py-6 space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    initial: false,
                    children: [
                        messages.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$MessageBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                message: msg
                            }, msg.id, false, {
                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
                                lineNumber: 35,
                                columnNumber: 15
                            }, this)),
                        isStreaming && (streamingText ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$MessageBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            message: {
                                id: 'streaming',
                                role: 'assistant',
                                content: streamingText,
                                timestamp: new Date().toISOString()
                            },
                            isStreaming: true,
                            streamingText: streamingText
                        }, "streaming", false, {
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
                            lineNumber: 41,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-full bg-[#1e1e28] border border-white/[0.08] flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        children: "✨"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
                                        lineNumber: 55,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
                                    lineNumber: 54,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$TypingIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
                                    lineNumber: 57,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, "typing", true, {
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
                            lineNumber: 53,
                            columnNumber: 17
                        }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
                    lineNumber: 33,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: bottomRef
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
                    lineNumber: 62,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
            lineNumber: 32,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/ChatContainer.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(ChatContainer, "eaUWg0io6wE0buoFSqU1QLjVsUo=");
_c = ChatContainer;
var _c;
__turbopack_context__.k.register(_c, "ChatContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/lib/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatInputBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/lib/types.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ChatInputBar(param) {
    let { onSend, onStop, isStreaming, careerMode, onModeChange, prefill, onPrefillConsumed } = param;
    _s();
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [modeOpen, setModeOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Handle prefill from welcome screen chips
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInputBar.useEffect": ()=>{
            if (prefill) {
                var _textareaRef_current;
                setText(prefill);
                (_textareaRef_current = textareaRef.current) === null || _textareaRef_current === void 0 ? void 0 : _textareaRef_current.focus();
                onPrefillConsumed === null || onPrefillConsumed === void 0 ? void 0 : onPrefillConsumed();
            }
        }
    }["ChatInputBar.useEffect"], [
        prefill,
        onPrefillConsumed
    ]);
    // Auto-resize textarea
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInputBar.useEffect": ()=>{
            const el = textareaRef.current;
            if (!el) return;
            el.style.height = 'auto';
            el.style.height = Math.min(el.scrollHeight, 180) + 'px';
        }
    }["ChatInputBar.useEffect"], [
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
    const activeMode = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAREER_MODES"].find((m)=>m.value === careerMode);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-t border-white/[0.07] bg-[#0a0a0f]/80 backdrop-blur-xl px-4 py-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl mx-auto space-y-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex items-end gap-2 rounded-2xl bg-[#16161e] border border-white/[0.09] px-3 py-2.5 focus-within:border-[#780206]/50 transition-colors duration-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative shrink-0 self-end mb-0.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setModeOpen((v)=>!v),
                                    className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#780206]/15 border border-[#780206]/25 text-red-300 text-xs font-medium hover:bg-[#780206]/25 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: activeMode.icon
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                            lineNumber: 72,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hidden sm:inline",
                                            children: activeMode.label
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: modeOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                        className: "absolute bottom-full left-0 mb-2 z-50 w-52 rounded-xl bg-[#1e1e28] border border-white/[0.1] shadow-xl overflow-hidden",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAREER_MODES"].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    onModeChange(m.value);
                                                    setModeOpen(false);
                                                },
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full flex items-start gap-2.5 px-3 py-2.5 text-left hover:bg-white/[0.05] transition-colors', careerMode === m.value && 'bg-[#780206]/15'),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-base",
                                                        children: m.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-xs font-medium', careerMode === m.value ? 'text-red-300' : 'text-[#c8c8d8]'),
                                                                children: m.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                                                lineNumber: 97,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] text-[#55556a] mt-0.5",
                                                                children: m.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                                                lineNumber: 100,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, m.value, true, {
                                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                                lineNumber: 87,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            ref: textareaRef,
                            value: text,
                            onChange: (e)=>setText(e.target.value),
                            onKeyDown: handleKey,
                            placeholder: "Ask anything about your career… (".concat(activeMode.label, " mode)"),
                            rows: 1,
                            className: "flex-1 bg-transparent text-sm text-[#f0f0f5] placeholder-[#55556a] resize-none outline-none leading-relaxed py-1 max-h-44"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 shrink-0 self-end mb-0.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "p-1.5 rounded-lg text-[#55556a] hover:text-[#9898b0] hover:bg-white/[0.05] transition-all",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this),
                                isStreaming ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onStop,
                                    className: "p-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                        lineNumber: 133,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: handleSend,
                                    disabled: !text.trim(),
                                    whileHover: {
                                        scale: text.trim() ? 1.05 : 1
                                    },
                                    whileTap: {
                                        scale: 0.95
                                    },
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-2 rounded-lg transition-all duration-200', text.trim() ? 'bg-gradient-to-br from-[#780206] to-[#061161] text-white shadow-md shadow-[#780206]/30 hover:shadow-[#780206]/50' : 'bg-white/[0.05] text-[#55556a] cursor-not-allowed'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                        lineNumber: 148,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-[10px] text-[#55556a]",
                    children: [
                        "Press ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                            className: "px-1 py-0.5 rounded bg-white/[0.06] font-mono text-[9px]",
                            children: "Enter"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                            lineNumber: 156,
                            columnNumber: 17
                        }, this),
                        " to send · ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                            className: "px-1 py-0.5 rounded bg-white/[0.06] font-mono text-[9px]",
                            children: "Shift+Enter"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                            lineNumber: 157,
                            columnNumber: 13
                        }, this),
                        " for new line"
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_s(ChatInputBar, "Uxcmi6U3OjYHoct5D3YPjj3byeY=");
_c = ChatInputBar;
var _c;
__turbopack_context__.k.register(_c, "ChatInputBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/hooks/useChat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/layout/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$ChatContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/chat/ChatContainer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$components$2f$input$2f$ChatInputBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/components/input/ChatInputBar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function HomePage() {
    _s();
    const { chats, currentChatId, messages, isStreaming, streamingText, careerMode, setCareerMode, sendMessage, stopStreaming, createNewChat, loadChat, deleteChat, clearAllChats } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"])();
    const [prefill, setPrefill] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSuggest = (text, mode)=>{
        setCareerMode(mode);
        setPrefill(text);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen overflow-hidden bg-[#0a0a0f]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:flex",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    chats: chats,
                    currentChatId: currentChatId,
                    onNewChat: createNewChat,
                    onLoadChat: loadChat,
                    onDeleteChat: deleteChat,
                    onClearAll: clearAllChats
                }, void 0, false, {
                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: mobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx",
                            lineNumber: 48,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx",
                                    lineNumber: 58,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setMobileOpen(false),
                                    className: "mt-4 ml-1 p-1.5 rounded-full bg-[#1e1e28] border border-white/10 text-[#9898b0] hover:text-white self-start",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx",
                                        lineNumber: 70,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx",
                                    lineNumber: 66,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx",
                            lineNumber: 53,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col flex-1 min-w-0 h-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:hidden flex items-center gap-3 px-4 py-3 border-b border-white/[0.07] bg-[#0d0d14]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMobileOpen(true),
                                className: "p-2 rounded-lg text-[#9898b0] hover:text-white hover:bg-white/[0.05] transition-all",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-semibold gradient-text",
                                children: "AI Career Guidance"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$components$2f$chat$2f$ChatContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        messages: messages,
                        isStreaming: isStreaming,
                        streamingText: streamingText,
                        onSuggest: handleSuggest
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$components$2f$input$2f$ChatInputBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onSend: sendMessage,
                        onStop: stopStreaming,
                        isStreaming: isStreaming,
                        careerMode: careerMode,
                        onModeChange: setCareerMode,
                        prefill: prefill,
                        onPrefillConsumed: ()=>setPrefill('')
                    }, void 0, false, {
                        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/AI career Draft cursor ai/AI Career Chatbot/src/app/page.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(HomePage, "gjflA6QDqF2ZdY073qjqy8BE+CQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$AI__career__Draft__cursor__ai$2f$AI__Career__Chatbot$2f$src$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"]
    ];
});
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_AI%20career%20Draft%20cursor%20ai_AI%20Career%20Chatbot_src_110983a0._.js.map