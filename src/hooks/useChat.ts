/**
 * useChat Custom Hook
 * 
 * Purpose: Centralized state management for chat sessions, message histories, and API communication.
 * - Handles saving/loading chat history to and from localStorage to persist chats across reloads.
 * - Manages CRUD actions for chats (creating a new chat, loading an existing one, deleting, and clearing all).
 * - Handles sending user prompts to the '/api/chat' server endpoint.
 * - Implements chunk-by-chunk reading of the server-side text response stream to support real-time typing/streaming.
 * - Integrates AbortController to allow users to cancel/stop an ongoing streaming response.
 */
'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
const uuidv4 = () => crypto.randomUUID()
import type { Chat, Message, CareerMode } from '@/lib/types'
import { generateChatTitle } from '@/lib/utils'

const STORAGE_KEY = 'ai_career_chats'

function loadChats(): Record<string, Chat> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveChats(chats: Record<string, Chat>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats))
  } catch {}
}

export function useChat() {
  const [chats, setChats] = useState<Record<string, Chat>>({})
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [careerMode, setCareerMode] = useState<CareerMode>('general')
  const abortRef = useRef<AbortController | null>(null)

  // Load from localStorage on mount
  useEffect(() => { setChats(loadChats()) }, [])

  // Persist on every change
  useEffect(() => { saveChats(chats) }, [chats])

  const currentChat = currentChatId ? chats[currentChatId] ?? null : null
  const messages: Message[] = currentChat?.messages ?? []

  const createNewChat = useCallback(() => {
    const id = uuidv4()
    const newChat: Chat = {
      id,
      title: 'New Chat',
      timestamp: new Date().toISOString(),
      messages: [],
      mode: careerMode,
    }
    setChats(prev => ({ ...prev, [id]: newChat }))
    setCurrentChatId(id)
    setStreamingText('')
    return id
  }, [careerMode])

  const loadChat = useCallback((chatId: string) => {
    setCurrentChatId(chatId)
    setStreamingText('')
  }, [])

  const deleteChat = useCallback((chatId: string) => {
    setChats(prev => {
      const next = { ...prev }
      delete next[chatId]
      return next
    })
    setCurrentChatId(prev => (prev === chatId ? null : prev))
  }, [])

  const clearAllChats = useCallback(() => {
    setChats({})
    setCurrentChatId(null)
    setStreamingText('')
  }, [])

  const sendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim() || isStreaming) return

    // Get or create chat
    let chatId = currentChatId
    let existingChat: Chat
    if (!chatId || !chats[chatId]) {
      chatId = uuidv4()
      existingChat = {
        id: chatId,
        title: 'New Chat',
        timestamp: new Date().toISOString(),
        messages: [],
        mode: careerMode,
      }
    } else {
      existingChat = { ...chats[chatId] }
    }

    const userMsg: Message = {
      id: uuidv4(),
      role: 'user',
      content: userInput.trim(),
      timestamp: new Date().toISOString(),
      mode: careerMode,
    }

    const updatedMessages = [...existingChat.messages, userMsg]
    const title = existingChat.messages.length === 0
      ? generateChatTitle(userInput)
      : existingChat.title

    const updatedChat: Chat = {
      ...existingChat,
      title,
      messages: updatedMessages,
      timestamp: new Date().toISOString(),
    }

    setChats(prev => ({ ...prev, [chatId!]: updatedChat }))
    setCurrentChatId(chatId)
    setIsStreaming(true)
    setStreamingText('')

    abortRef.current = new AbortController()

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput.trim(), mode: careerMode }),
        signal: abortRef.current.signal,
      })

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: 'Stream failed' }))
        throw new Error(err.error ?? 'Request failed')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        fullText += chunk
        setStreamingText(fullText)
      }

      const aiMsg: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: fullText,
        timestamp: new Date().toISOString(),
        mode: careerMode,
      }

      setChats(prev => ({
        ...prev,
        [chatId!]: {
          ...prev[chatId!],
          messages: [...(prev[chatId!]?.messages ?? []), aiMsg],
          timestamp: new Date().toISOString(),
        },
      }))
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      const errMsg: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: `❌ **Error:** ${(err as Error).message}`,
        timestamp: new Date().toISOString(),
      }
      setChats(prev => ({
        ...prev,
        [chatId!]: {
          ...prev[chatId!],
          messages: [...(prev[chatId!]?.messages ?? []), errMsg],
        },
      }))
    } finally {
      setIsStreaming(false)
      setStreamingText('')
      abortRef.current = null
    }
  }, [currentChatId, chats, careerMode, isStreaming])

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort()
  }, [])

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
    clearAllChats,
  }
}
