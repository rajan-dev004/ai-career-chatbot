/**
 * useChat Custom Hook — Firestore-backed
 * 
 * Purpose: Centralized state management for chat sessions, message histories, and API communication.
 * - Loads and persists all chat data in Firestore under `users/{userId}/chats/{chatId}`.
 * - Uses onSnapshot for real-time sync across tabs/devices.
 * - Handles CRUD actions for chats (creating a new chat, loading an existing one, deleting, and clearing all).
 * - Handles sending user prompts to the '/api/chat' server endpoint.
 * - Implements chunk-by-chunk reading of the server-side text response stream to support real-time typing/streaming.
 * - Integrates AbortController to allow users to cancel/stop an ongoing streaming response.
 */
'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
const uuidv4 = () => crypto.randomUUID()
import type { Chat, Message, CareerMode } from '@/lib/types'
import { generateChatTitle } from '@/lib/utils'
import { db } from '@/lib/firebase'
import {
  collection, doc, setDoc, deleteDoc,
  onSnapshot, query, orderBy, writeBatch,
} from 'firebase/firestore'

/**
 * Returns the Firestore collection reference for a user's chats.
 */
function userChatsRef(userId: string) {
  return collection(db, 'users', userId, 'chats')
}

export function useChat(userId: string) {
  const [chats, setChats] = useState<Record<string, Chat>>({})
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [careerMode, setCareerMode] = useState<CareerMode>('general')
  const abortRef = useRef<AbortController | null>(null)

  // Real-time sync from Firestore
  useEffect(() => {
    if (!userId) return

    const q = query(userChatsRef(userId), orderBy('timestamp', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loaded: Record<string, Chat> = {}
      snapshot.docs.forEach((docSnap) => {
        const data = docSnap.data()
        loaded[docSnap.id] = {
          id: docSnap.id,
          title: data.title ?? 'New Chat',
          timestamp: data.timestamp ?? new Date().toISOString(),
          messages: data.messages ?? [],
          mode: data.mode ?? 'general',
        }
      })
      setChats(loaded)
    }, (error) => {
      console.error('Firestore sync error:', error)
    })

    return () => unsubscribe()
  }, [userId])

  const currentChat = currentChatId ? chats[currentChatId] ?? null : null
  const messages: Message[] = currentChat?.messages ?? []

  /**
   * Persist a chat document to Firestore.
   */
  const saveChat = useCallback(async (chat: Chat) => {
    if (!userId) return
    const docRef = doc(userChatsRef(userId), chat.id)
    await setDoc(docRef, {
      title: chat.title,
      mode: chat.mode,
      timestamp: chat.timestamp,
      messages: chat.messages,
    })
  }, [userId])

  const createNewChat = useCallback(() => {
    const id = uuidv4()
    const newChat: Chat = {
      id,
      title: 'New Chat',
      timestamp: new Date().toISOString(),
      messages: [],
      mode: careerMode,
    }
    // Optimistic local update; Firestore will sync via onSnapshot
    setChats(prev => ({ ...prev, [id]: newChat }))
    setCurrentChatId(id)
    setStreamingText('')
    saveChat(newChat)
    return id
  }, [careerMode, saveChat])

  const loadChat = useCallback((chatId: string) => {
    setCurrentChatId(chatId)
    setStreamingText('')
  }, [])

  const deleteChat = useCallback(async (chatId: string) => {
    // Optimistic local update
    setChats(prev => {
      const next = { ...prev }
      delete next[chatId]
      return next
    })
    setCurrentChatId(prev => (prev === chatId ? null : prev))

    // Delete from Firestore
    if (userId) {
      const docRef = doc(userChatsRef(userId), chatId)
      await deleteDoc(docRef)
    }
  }, [userId])

  const clearAllChats = useCallback(async () => {
    const chatIds = Object.keys(chats)
    // Optimistic local update
    setChats({})
    setCurrentChatId(null)
    setStreamingText('')

    // Batch delete from Firestore
    if (userId && chatIds.length > 0) {
      const batch = writeBatch(db)
      chatIds.forEach(id => {
        batch.delete(doc(userChatsRef(userId), id))
      })
      await batch.commit()
    }
  }, [userId, chats])

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

    // Optimistic local update
    setChats(prev => ({ ...prev, [chatId!]: updatedChat }))
    setCurrentChatId(chatId)
    setIsStreaming(true)
    setStreamingText('')

    // Save user message to Firestore
    saveChat(updatedChat)

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

      const finalChat: Chat = {
        ...updatedChat,
        messages: [...updatedMessages, aiMsg],
        timestamp: new Date().toISOString(),
      }

      setChats(prev => ({
        ...prev,
        [chatId!]: finalChat,
      }))

      // Save AI response to Firestore
      saveChat(finalChat)
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      const errMsg: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: `❌ **Error:** ${(err as Error).message}`,
        timestamp: new Date().toISOString(),
      }
      const errorChat: Chat = {
        ...updatedChat,
        messages: [...updatedMessages, errMsg],
      }
      setChats(prev => ({
        ...prev,
        [chatId!]: errorChat,
      }))
      saveChat(errorChat)
    } finally {
      setIsStreaming(false)
      setStreamingText('')
      abortRef.current = null
    }
  }, [currentChatId, chats, careerMode, isStreaming, saveChat])

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
