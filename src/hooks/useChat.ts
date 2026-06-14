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
  const [isCloudSyncing, setIsCloudSyncing] = useState(true)
  const abortRef = useRef<AbortController | null>(null)

  // Load initial chats from localStorage on client-side mount
  useEffect(() => {
    if (typeof window !== 'undefined' && userId) {
      const cached = localStorage.getItem(`chats_${userId}`)
      if (cached) {
        try {
          setChats(JSON.parse(cached))
        } catch (e) {
          console.error('Error parsing cached chats on mount:', e)
        }
      }
    }
  }, [userId])

  // Real-time sync from Firestore
  useEffect(() => {
    if (!userId) return

    console.log(`[Telemetry] [ChatHook] Setting up Firestore subscription for user: ${userId}`);
    const tSubStart = performance.now();
    console.time(`[Telemetry] [ChatHook] Firestore First Snapshot Sync`);

    let isFirstSnapshot = true;
    const q = query(userChatsRef(userId), orderBy('timestamp', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const duration = performance.now() - tSubStart;
      if (isFirstSnapshot) {
        console.log(`[Telemetry] [ChatHook] First snapshot returned ${snapshot.size} chats.`);
        console.log(`[Telemetry] [ChatHook] Firestore initial sync took ${duration.toFixed(2)}ms`);
        console.timeEnd(`[Telemetry] [ChatHook] Firestore First Snapshot Sync`);
        isFirstSnapshot = false;
      } else {
        console.log(`[Telemetry] [ChatHook] Firestore snapshot update returned ${snapshot.size} chats. Callback in ${(performance.now() - tSubStart).toFixed(2)}ms`);
      }

      const loaded: Record<string, Chat> = {}
      const tProcessStart = performance.now();
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
      console.log(`[Telemetry] [ChatHook] Processed snapshot data in ${(performance.now() - tProcessStart).toFixed(2)}ms`);
      
      setChats(loaded)
      setIsCloudSyncing(true)

      // Cache the synced chats locally
      if (typeof window !== 'undefined') {
        localStorage.setItem(`chats_${userId}`, JSON.stringify(loaded))
      }
    }, (error) => {
      console.error('Firestore sync error, falling back to local storage:', error)
      setIsCloudSyncing(false)

      // Load from localStorage as fallback when subscription fails
      if (typeof window !== 'undefined') {
        try {
          const cached = localStorage.getItem(`chats_${userId}`)
          if (cached) {
            setChats(JSON.parse(cached))
          }
        } catch (e) {
          console.error('Error parsing cached chats on sync error:', e)
        }
      }
    })

    return () => unsubscribe()
  }, [userId])

  const currentChat = currentChatId ? chats[currentChatId] ?? null : null
  const messages: Message[] = currentChat?.messages ?? []

  /**
   * Persist a chat document to LocalStorage and Firestore.
   */
  const saveChat = useCallback(async (chat: Chat) => {
    if (!userId) return

    // 1. Always save to localStorage first as immediate local backup
    if (typeof window !== 'undefined') {
      try {
        const cachedStr = localStorage.getItem(`chats_${userId}`)
        let localChats: Record<string, Chat> = {}
        if (cachedStr) {
          localChats = JSON.parse(cachedStr)
        }
        localChats[chat.id] = chat
        localStorage.setItem(`chats_${userId}`, JSON.stringify(localChats))
      } catch (e) {
        console.error('Failed to save to localStorage:', e)
      }
    }

    // 2. Try to save to Firestore if cloud syncing is active
    if (isCloudSyncing) {
      try {
        const docRef = doc(userChatsRef(userId), chat.id)
        await setDoc(docRef, {
          title: chat.title,
          mode: chat.mode,
          timestamp: chat.timestamp,
          messages: chat.messages,
        })
      } catch (err) {
        console.error('Failed to write to Firestore, falling back to local-only:', err)
        setIsCloudSyncing(false)
      }
    }
  }, [userId, isCloudSyncing])

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

    if (!userId) return

    // Delete from localStorage
    if (typeof window !== 'undefined') {
      try {
        const cachedStr = localStorage.getItem(`chats_${userId}`)
        if (cachedStr) {
          const localChats = JSON.parse(cachedStr)
          delete localChats[chatId]
          localStorage.setItem(`chats_${userId}`, JSON.stringify(localChats))
        }
      } catch (e) {
        console.error('Failed to delete from localStorage:', e)
      }
    }

    // Delete from Firestore
    if (isCloudSyncing) {
      try {
        const docRef = doc(userChatsRef(userId), chatId)
        await deleteDoc(docRef)
      } catch (err) {
        console.error('Failed to delete from Firestore:', err)
        setIsCloudSyncing(false)
      }
    }
  }, [userId, isCloudSyncing])

  const clearAllChats = useCallback(async () => {
    const chatIds = Object.keys(chats)
    // Optimistic local update
    setChats({})
    setCurrentChatId(null)
    setStreamingText('')

    if (!userId) return

    // Clear from localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(`chats_${userId}`)
      } catch (e) {
        console.error('Failed to clear localStorage:', e)
      }
    }

    // Batch delete from Firestore
    if (isCloudSyncing && chatIds.length > 0) {
      try {
        const batch = writeBatch(db)
        chatIds.forEach(id => {
          batch.delete(doc(userChatsRef(userId), id))
        })
        await batch.commit()
      } catch (err) {
        console.error('Failed to batch delete from Firestore:', err)
        setIsCloudSyncing(false)
      }
    }
  }, [userId, chats, isCloudSyncing])

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

    console.log('[Telemetry] [ChatHook] sendMessage initiated.');
    const tSendStart = performance.now();
    console.time('[Telemetry] [ChatHook] Total Chat Transaction');

    // Save user message to Firestore
    const tSaveUserStart = performance.now();
    await saveChat(updatedChat);
    console.log(`[Telemetry] [ChatHook] Saved user message to Firestore in ${(performance.now() - tSaveUserStart).toFixed(2)}ms`);

    abortRef.current = new AbortController()

    try {
      console.log('[Telemetry] [ChatHook] Sending POST request to /api/chat...');
      const tFetchStart = performance.now();
      
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput.trim(), mode: careerMode }),
        signal: abortRef.current.signal,
      })

      const fetchLatency = performance.now() - tFetchStart;
      console.log(`[Telemetry] [ChatHook] /api/chat responded (status: ${res.status}) in ${fetchLatency.toFixed(2)}ms`);

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: 'Stream failed' }))
        throw new Error(err.error ?? 'Request failed')
      }

      console.log('[Telemetry] [ChatHook] Stream body received, reading stream...');
      const tStreamStart = performance.now();
      
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''
      let isFirstChunk = true;

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        if (isFirstChunk) {
          console.log(`[Telemetry] [ChatHook] Time to first token: ${(performance.now() - tStreamStart).toFixed(2)}ms`);
          isFirstChunk = false;
        }
        fullText += chunk
        setStreamingText(fullText)
      }

      console.log(`[Telemetry] [ChatHook] Finished reading response stream. Stream read duration: ${(performance.now() - tStreamStart).toFixed(2)}ms`);

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
      const tSaveAiStart = performance.now();
      await saveChat(finalChat)
      console.log(`[Telemetry] [ChatHook] Saved AI response to Firestore in ${(performance.now() - tSaveAiStart).toFixed(2)}ms`);
      console.log(`[Telemetry] [ChatHook] Total chat transaction completed in ${(performance.now() - tSendStart).toFixed(2)}ms`);
      console.timeEnd('[Telemetry] [ChatHook] Total Chat Transaction');
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        console.log('[Telemetry] [ChatHook] Chat streaming aborted by user.');
        return
      }
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
      await saveChat(errorChat)
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
    isCloudSyncing,
  }
}
