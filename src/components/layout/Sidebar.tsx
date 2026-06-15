/**
 * Sidebar Component
 * 
 * Purpose: Renders the left-side navigation sidebar for chat session management.
 * - Handles the display, creation, selection, and deletion of past chat sessions.
 * - Supports searching and filtering the chat history by title.
 * - Allows collapsing/expanding the sidebar to maximize chat workspace space.
 * - Uses Framer Motion for spring-based expand/collapse animations.
 */
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, MessageSquare, Trash2, ChevronLeft, ChevronRight,
  Sparkles, Trophy, Search, X, Sun, Moon, LogOut
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn, formatDateLabel } from '@/lib/utils'
import type { Chat } from '@/lib/types'

interface SidebarProps {
  chats: Record<string, Chat>
  currentChatId: string | null
  onNewChat: () => void
  onLoadChat: (id: string) => void
  onDeleteChat: (id: string) => void
  onClearAll: () => void
  isCloudSyncing: boolean
}

export default function Sidebar({
  chats, currentChatId, onNewChat, onLoadChat, onDeleteChat, onClearAll, isCloudSyncing
}: SidebarProps) {
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch]       = useState('')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [showStatusInfo, setShowStatusInfo] = useState(false)

  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const isLight = document.documentElement.classList.contains('light')
    setTheme(isLight ? 'light' : 'dark')
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
    localStorage.setItem('theme', nextTheme)
    setTheme(nextTheme)
  }

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
        className="relative flex flex-col h-full bg-bgSidebar border-r border-borderSubtle shrink-0 overflow-hidden z-20"
      >
        {/* ── Header ── */}
        <div className={cn(
          'flex items-center gap-2.5 px-4 py-4 border-b border-borderSubtle',
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
                <span className="font-semibold text-sm gradient-text">AI Career Guide</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Storage Status Indicator ── */}
        {!collapsed && (
          <div className="px-3 pt-2">
            <div className={cn(
              "flex flex-col gap-1 px-3 py-1.5 rounded-lg border text-[10px] font-medium transition-all duration-200",
              isCloudSyncing 
                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" 
                : "bg-amber-500/5 border-amber-500/20 text-amber-400"
            )}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5">
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full animate-pulse",
                    isCloudSyncing ? "bg-emerald-400 shadow-sm shadow-emerald-400/50" : "bg-amber-400 shadow-sm shadow-amber-400/50"
                  )} />
                  <span>{isCloudSyncing ? 'Cloud Sync Active' : 'Saved Locally'}</span>
                </div>
                <button 
                  onClick={() => setShowStatusInfo(!showStatusInfo)}
                  className="underline opacity-75 hover:opacity-100 transition-opacity"
                >
                  {showStatusInfo ? 'Hide' : 'Info'}
                </button>
              </div>
              {showStatusInfo && (
                <p className="text-[9px] text-textMuted leading-relaxed border-t border-borderSubtle pt-1 mt-0.5">
                  {isCloudSyncing 
                    ? "Your conversations are backed up in your Firebase cloud database."
                    : "Chats are saved to your browser because Firestore is not created in your Firebase Console. Go to Console -> Firestore to enable cloud sync."
                  }
                </p>
              )}
            </div>
          </div>
        )}

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
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bgHover border border-borderSubtle">
                <Search className="w-3.5 h-3.5 text-textMuted" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search chats…"
                  className="flex-1 bg-transparent text-xs text-textPrimary placeholder-textMuted outline-none"
                />
                {search && (
                  <button onClick={() => setSearch('')}>
                    <X className="w-3 h-3 text-textMuted hover:text-textPrimary transition-colors" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Chat list ── */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5">
          {!collapsed && filtered.length === 0 && (
            <div className="text-center py-10 text-textMuted text-xs">
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
                  : 'hover:bg-bgHover border border-transparent',
                collapsed && 'justify-center px-2'
              )}
              onClick={() => onLoadChat(chat.id)}
            >
              <MessageSquare className={cn(
                'w-4 h-4 shrink-0',
                currentChatId === chat.id ? 'text-red-400' : 'text-textMuted group-hover:text-textSecondary'
              )} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex-1 min-w-0"
                  >
                    <p className={cn(
                      'text-xs font-medium truncate',
                      currentChatId === chat.id ? 'text-red-200' : 'text-textSecondary'
                    )}>
                      {chat.title}
                    </p>
                    <p className="text-[10px] text-textMuted mt-0.5">{formatDateLabel(chat.timestamp)}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Delete button */}
              {!collapsed && hoveredId === chat.id && (
                <button
                  onClick={e => { e.stopPropagation(); onDeleteChat(chat.id) }}
                  className="shrink-0 p-1 rounded-md hover:bg-red-500/20 text-textMuted hover:text-red-400 transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Compact Theme Toggle (when collapsed) */}
        {collapsed && (
          <div className="mt-auto px-2 py-3 flex flex-col items-center gap-2 border-t border-borderSubtle">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName ?? 'User'}
                className="w-7 h-7 rounded-full ring-2 ring-[#780206]/30"
                referrerPolicy="no-referrer"
                title={user.displayName ?? 'User'}
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#780206] to-[#061161] flex items-center justify-center text-white text-xs font-bold"
                title={user?.displayName ?? 'User'}>
                {(user?.displayName ?? user?.email ?? 'U').charAt(0).toUpperCase()}
              </div>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-textMuted hover:text-textSecondary hover:bg-bgHover transition-all"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>
            <button
              onClick={logout}
              className="p-2 rounded-lg text-textMuted hover:text-red-400 hover:bg-red-500/10 transition-all"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ── Footer ── */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-3 py-3 border-t border-borderSubtle space-y-1.5"
            >
              {Object.keys(chats).length > 0 && (
                <button
                  onClick={onClearAll}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-textMuted hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear all chats
                </button>
              )}
              
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-textMuted hover:text-textSecondary hover:bg-bgHover transition-all"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              {/* User profile */}
              {user && (
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-bgHover/50 border border-borderSubtle">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName ?? 'User'}
                      className="w-7 h-7 rounded-full shrink-0 ring-2 ring-[#780206]/30"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#780206] to-[#061161] flex items-center justify-center shrink-0 text-white text-xs font-bold">
                      {(user.displayName ?? user.email ?? 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-textSecondary truncate">
                      {user.displayName ?? 'User'}
                    </p>
                    <p className="text-[10px] text-textMuted truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Sign out button */}
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-textMuted hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#780206] to-[#061161] flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-[10px] text-textMuted">Powered by Gemini 2.0 Flash</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Collapse toggle ── */}
        <button
          onClick={() => setCollapsed(v => !v)}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 -right-3 z-30',
            'w-6 h-6 rounded-full bg-bgHover border border-borderSubtle shadow-md',
            'flex items-center justify-center text-textSecondary hover:text-textPrimary transition-all'
          )}
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>
    </>
  )
}
