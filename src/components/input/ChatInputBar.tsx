/**
 * ChatInputBar Component
 * 
 * Purpose: Handles the user text input area at the bottom of the chat view.
 * - Manages the auto-resizing text field (textarea) that expands as the user types.
 * - Includes a Career Mode selector dropdown allowing the user to switch the context of the chat (e.g., General, Roadmap, Projects).
 * - Toggles between a Send button and a Stop (Square) button depending on whether the AI is currently streaming a response.
 * - Handles keyboard shortcuts like Enter (to submit) and Shift+Enter (to type a new line).
 */
'use client'
import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Square, Mic, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CAREER_MODES } from '@/lib/types'
import type { CareerMode } from '@/lib/types'

interface ChatInputBarProps {
  onSend: (text: string) => void
  onStop: () => void
  isStreaming: boolean
  careerMode: CareerMode
  onModeChange: (mode: CareerMode) => void
  prefill?: string
  onPrefillConsumed?: () => void
}

export default function ChatInputBar({
  onSend, onStop, isStreaming, careerMode, onModeChange, prefill, onPrefillConsumed
}: ChatInputBarProps) {
  const [text, setText]       = useState('')
  const [modeOpen, setModeOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Handle prefill from welcome screen chips
  useEffect(() => {
    if (prefill) {
      setText(prefill)
      textareaRef.current?.focus()
      onPrefillConsumed?.()
    }
  }, [prefill, onPrefillConsumed])

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 180) + 'px'
  }, [text])

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed || isStreaming) return
    onSend(trimmed)
    setText('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const activeMode = CAREER_MODES.find(m => m.value === careerMode)!

  return (
    <div className="border-t border-borderSubtle bg-bgBase/80 backdrop-blur-xl px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <div className="max-w-3xl mx-auto space-y-2">
        {/* Input container */}
        <div className="relative flex items-end gap-2 rounded-2xl bg-bgCard border border-borderSubtle px-3 py-2.5 focus-within:border-[#780206]/50 transition-colors duration-200">

          {/* Career mode chip */}
          <div className="relative shrink-0 self-end mb-0.5">
            <button
              onClick={() => setModeOpen(v => !v)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#780206]/15 border border-[#780206]/25 text-red-300 text-xs font-medium hover:bg-[#780206]/25 transition-all"
            >
              <span>{activeMode.icon}</span>
              <span className="hidden sm:inline">{activeMode.label}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            <AnimatePresence>
              {modeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-0 mb-2 z-50 w-52 rounded-xl bg-bgHover border border-borderSubtle shadow-xl overflow-hidden"
                >
                  {CAREER_MODES.map(m => (
                    <button
                      key={m.value}
                      onClick={() => { onModeChange(m.value); setModeOpen(false) }}
                      className={cn(
                        'w-full flex items-start gap-2.5 px-3 py-2.5 text-left hover:bg-bgHover transition-colors',
                        careerMode === m.value && 'bg-[#780206]/15'
                      )}
                    >
                      <span className="text-base">{m.icon}</span>
                      <div>
                        <p className={cn('text-xs font-medium', careerMode === m.value ? 'text-red-300' : 'text-textSecondary')}>
                          {m.label}
                        </p>
                        <p className="text-[10px] text-textMuted mt-0.5">{m.description}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleKey}
            placeholder={`Ask anything about your career… (${activeMode.label} mode)`}
            rows={1}
            className="flex-1 bg-transparent text-sm text-textPrimary placeholder-textMuted resize-none outline-none leading-relaxed py-1 max-h-44"
          />

          {/* Action buttons */}
          <div className="flex items-center gap-1 shrink-0 self-end mb-0.5">
            {/* Mic */}
            <button className="p-1.5 rounded-lg text-textMuted hover:text-textSecondary hover:bg-bgHover transition-all">
              <Mic className="w-4 h-4" />
            </button>

            {/* Send / Stop */}
            {isStreaming ? (
              <button
                onClick={onStop}
                className="p-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
              >
                <Square className="w-4 h-4" />
              </button>
            ) : (
              <motion.button
                onClick={handleSend}
                disabled={!text.trim()}
                whileHover={{ scale: text.trim() ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'p-2 rounded-lg transition-all duration-200',
                  text.trim()
                    ? 'bg-gradient-to-br from-[#780206] to-[#061161] text-white shadow-md shadow-[#780206]/30 hover:shadow-[#780206]/50'
                    : 'bg-bgHover/40 text-textMuted cursor-not-allowed'
                )}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-[10px] text-textMuted">
          Press <kbd className="px-1 py-0.5 rounded bg-bgHover font-mono text-[9px]">Enter</kbd> to send
          · <kbd className="px-1 py-0.5 rounded bg-bgHover font-mono text-[9px]">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  )
}
