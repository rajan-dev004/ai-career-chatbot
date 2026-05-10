'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, MessageSquare, Trash2, ChevronLeft, ChevronRight,
  Sparkles, Trophy, Search, X
} from 'lucide-react'
import { cn, formatDateLabel } from '@/lib/utils'
import type { Chat } from '@/lib/types'

interface SidebarProps {
  chats: Record<string, Chat>
  currentChatId: string | null
  onNewChat: () => void
  onLoadChat: (id: string) => void
  onDeleteChat: (id: string) => void
  onClearAll: () => void
}

export default function Sidebar({
  chats, currentChatId, onNewChat, onLoadChat, onDeleteChat, onClearAll
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch]       = useState('')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const sortedChats = Object.values(chats).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
  const filtered = search
    ? sortedChats.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
    : sortedChats

  return (
    <>
      {/* Sidebar panel */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 260 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative flex flex-col h-full bg-[#0d0d14] border-r border-white/[0.07] shrink-0 overflow-hidden z-20"
      >
        {/* ── Header ── */}
        <div className={cn(
          'flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.07]',
          collapsed && 'justify-center px-2'
        )}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#780206] to-[#061161] flex items-center justify-center shrink-0 shadow-lg shadow-[#780206]/30">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="font-semibold text-sm gradient-text">Excel Your Career</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── New Chat button ── */}
        <div className={cn('px-3 py-3', collapsed && 'px-2')}>
          <button
            onClick={onNewChat}
            className={cn(
              'group w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
              'bg-gradient-to-r from-[#780206] to-[#061161] hover:brightness-110',
              'text-white shadow-md shadow-[#780206]/20 hover:shadow-[#780206]/40',
              collapsed && 'justify-center px-2'
            )}
          >
            <Plus className="w-4 h-4 shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  New Chat
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* ── Search (expanded only) ── */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-3 pb-2"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.07]">
                <Search className="w-3.5 h-3.5 text-[#55556a]" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search chats…"
                  className="flex-1 bg-transparent text-xs text-[#f0f0f5] placeholder-[#55556a] outline-none"
                />
                {search && (
                  <button onClick={() => setSearch('')}>
                    <X className="w-3 h-3 text-[#55556a] hover:text-white transition-colors" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Chat list ── */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5">
          {!collapsed && filtered.length === 0 && (
            <div className="text-center py-10 text-[#55556a] text-xs">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>{search ? 'No chats found' : 'No conversations yet'}</p>
              <p className="mt-1 opacity-60">Start a new chat above</p>
            </div>
          )}
          {filtered.map(chat => (
            <motion.div
              key={chat.id}
              layout
              onMouseEnter={() => setHoveredId(chat.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                'group relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-150',
                currentChatId === chat.id
                  ? 'bg-[#780206]/20 border border-[#780206]/30'
                  : 'hover:bg-white/[0.05] border border-transparent',
                collapsed && 'justify-center px-2'
              )}
              onClick={() => onLoadChat(chat.id)}
            >
              <MessageSquare className={cn(
                'w-4 h-4 shrink-0',
                currentChatId === chat.id ? 'text-red-400' : 'text-[#55556a] group-hover:text-[#9898b0]'
              )} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex-1 min-w-0"
                  >
                    <p className={cn(
                      'text-xs font-medium truncate',
                      currentChatId === chat.id ? 'text-red-200' : 'text-[#c8c8d8]'
                    )}>
                      {chat.title}
                    </p>
                    <p className="text-[10px] text-[#55556a] mt-0.5">{formatDateLabel(chat.timestamp)}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Delete button */}
              {!collapsed && hoveredId === chat.id && (
                <button
                  onClick={e => { e.stopPropagation(); onDeleteChat(chat.id) }}
                  className="shrink-0 p-1 rounded-md hover:bg-red-500/20 text-[#55556a] hover:text-red-400 transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── Footer ── */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-3 py-3 border-t border-white/[0.07] space-y-1.5"
            >
              {Object.keys(chats).length > 0 && (
                <button
                  onClick={onClearAll}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#55556a] hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear all chats
                </button>
              )}
              <div className="flex items-center gap-2 px-3 py-1.5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#780206] to-[#061161] flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-[10px] text-[#55556a]">Powered by Gemini 2.0 Flash</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Collapse toggle ── */}
        <button
          onClick={() => setCollapsed(v => !v)}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 -right-3 z-30',
            'w-6 h-6 rounded-full bg-[#1e1e28] border border-white/10 shadow-md',
            'flex items-center justify-center text-[#9898b0] hover:text-white hover:border-white/20 transition-all'
          )}
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>
    </>
  )
}
