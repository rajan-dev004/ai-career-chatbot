/**
 * ChatContainer Component
 * 
 * Purpose: Manages and displays the scrollable chat message list.
 * - Displays the WelcomeScreen if there are no messages in the active chat.
 * - Iterates over existing messages and renders each using the MessageBubble component.
 * - Dynamically renders a TypingIndicator or a streaming MessageBubble while waiting for or receiving AI responses.
 * - Automatically scrolls to the bottom of the chat container as new messages arrive.
 */
'use client'
import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import WelcomeScreen from './WelcomeScreen'
import type { Message, CareerMode } from '@/lib/types'

interface ChatContainerProps {
  messages: Message[]
  isStreaming: boolean
  streamingText: string
  onSuggest: (text: string, mode: CareerMode) => void
}

export default function ChatContainer({
  messages, isStreaming, streamingText, onSuggest
}: ChatContainerProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  const isEmpty = messages.length === 0 && !isStreaming

  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      {isEmpty ? (
        <WelcomeScreen onSuggest={onSuggest} />
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map(msg => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Streaming message */}
            {isStreaming && (
              streamingText ? (
                <MessageBubble
                  key="streaming"
                  message={{
                    id: 'streaming',
                    role: 'assistant',
                    content: streamingText,
                    timestamp: new Date().toISOString(),
                  }}
                  isStreaming
                  streamingText={streamingText}
                />
              ) : (
                <div key="typing" className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-bgHover border border-borderSubtle flex items-center justify-center">
                    <span className="text-xs">✨</span>
                  </div>
                  <TypingIndicator />
                </div>
              )
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  )
}
