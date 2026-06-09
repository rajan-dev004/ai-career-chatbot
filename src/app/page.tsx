/**
 * HomePage Component
 * 
 * Purpose: Main dashboard layout container that mounts the core UI components.
 * - Imports and invokes the useChat custom hook to manage state & messaging.
 * - Displays a responsive sidebar (Sidebar) which is hidden or rendered via slide-out drawer on mobile viewports.
 * - Integrates the scrollable chat display (ChatContainer) and the bottom input bar (ChatInputBar).
 * - Manages sidebar drawer open/close states (mobileOpen) and handles click suggestions from features cards.
 * - Gates the chat UI behind Firebase authentication — unauthenticated users see the login page.
 */
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useChat } from '@/hooks/useChat'
import Sidebar from '@/components/layout/Sidebar'
import ChatContainer from '@/components/chat/ChatContainer'
import ChatInputBar from '@/components/input/ChatInputBar'
import LoginPage from '@/components/auth/LoginPage'
import type { CareerMode } from '@/lib/types'

export default function HomePage() {
  const { user } = useAuth()

  // Show login page if not authenticated
  if (!user) return <LoginPage />

  return <AuthenticatedApp userId={user.uid} />
}

function AuthenticatedApp({ userId }: { userId: string }) {
  const {
    chats, currentChatId, messages,
    isStreaming, streamingText,
    careerMode, setCareerMode,
    sendMessage, stopStreaming,
    createNewChat, loadChat,
    deleteChat, clearAllChats,
  } = useChat(userId)

  const [prefill, setPrefill]         = useState('')
  const [mobileOpen, setMobileOpen]   = useState(false)

  const handleSuggest = (text: string, mode: CareerMode) => {
    setCareerMode(mode)
    setPrefill(text)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-bgBase">

      {/* ── Desktop Sidebar ── */}
      <div className="hidden md:flex">
        <Sidebar
          chats={chats}
          currentChatId={currentChatId}
          onNewChat={createNewChat}
          onLoadChat={loadChat}
          onDeleteChat={deleteChat}
          onClearAll={clearAllChats}
        />
      </div>

      {/* ── Mobile Sidebar Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-full z-40 md:hidden flex"
            >
              <Sidebar
                chats={chats}
                currentChatId={currentChatId}
                onNewChat={() => { createNewChat(); setMobileOpen(false) }}
                onLoadChat={id => { loadChat(id); setMobileOpen(false) }}
                onDeleteChat={deleteChat}
                onClearAll={clearAllChats}
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="mt-4 ml-1 p-1.5 rounded-full bg-bgHover border border-borderSubtle text-textSecondary hover:text-textPrimary self-start"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <div className="flex flex-col flex-1 min-w-0 h-full">

        {/* Top bar (mobile only) */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-borderSubtle bg-bgSidebar">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-textSecondary hover:text-textPrimary hover:bg-bgHover transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-semibold gradient-text">AI Career Guidance</span>
        </div>

        {/* Chat messages */}
        <ChatContainer
          messages={messages}
          isStreaming={isStreaming}
          streamingText={streamingText}
          onSuggest={handleSuggest}
        />

        {/* Input bar */}
        <ChatInputBar
          onSend={sendMessage}
          onStop={stopStreaming}
          isStreaming={isStreaming}
          careerMode={careerMode}
          onModeChange={setCareerMode}
          prefill={prefill}
          onPrefillConsumed={() => setPrefill('')}
        />
      </div>
    </div>
  )
}

