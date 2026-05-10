'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useChat } from '@/hooks/useChat'
import Sidebar from '@/components/layout/Sidebar'
import ChatContainer from '@/components/chat/ChatContainer'
import ChatInputBar from '@/components/input/ChatInputBar'
import type { CareerMode } from '@/lib/types'

export default function HomePage() {
  const {
    chats, currentChatId, messages,
    isStreaming, streamingText,
    careerMode, setCareerMode,
    sendMessage, stopStreaming,
    createNewChat, loadChat,
    deleteChat, clearAllChats,
  } = useChat()

  const [prefill, setPrefill]         = useState('')
  const [mobileOpen, setMobileOpen]   = useState(false)

  const handleSuggest = (text: string, mode: CareerMode) => {
    setCareerMode(mode)
    setPrefill(text)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">

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
                className="mt-4 ml-1 p-1.5 rounded-full bg-[#1e1e28] border border-white/10 text-[#9898b0] hover:text-white self-start"
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
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-white/[0.07] bg-[#0d0d14]">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-[#9898b0] hover:text-white hover:bg-white/[0.05] transition-all"
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
