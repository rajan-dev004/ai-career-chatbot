/**
 * MessageBubble Component
 *
 * Purpose: Renders an individual chat message bubble in the chat transcript.
 * - Uses markdown-it + highlight.js for markdown rendering (CJS-compatible, no ESM hang).
 * - Displays a simple user icon or sparkles icon depending on who sent the message.
 * - Includes a Copy-to-Clipboard button to copy message contents.
 * - Uses Framer Motion for entering animations.
 */
'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import { Copy, Check, User, Sparkles } from 'lucide-react'
import { cn, formatTimestamp } from '@/lib/utils'
import type { Message } from '@/lib/types'

// Configure markdown-it with highlight.js
const md: MarkdownIt = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight: (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre><code class="hljs language-${lang}">${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
      } catch {}
    }
    return `<pre><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`
  },
})

interface MessageBubbleProps {
  message: Message
  isStreaming?: boolean
  streamingText?: string
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="p-1.5 rounded-md text-textMuted hover:text-textSecondary hover:bg-bgHover transition-all"
      title="Copy message"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}

function MarkdownContent({ content, isStreaming }: { content: string; isStreaming?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = md.render(content)
    }
  }, [content])

  return (
    <>
      <div ref={ref} className="prose-ai" />
      {isStreaming && (
        <span className="inline-block w-0.5 h-4 bg-red-400 ml-0.5 cursor-blink align-middle" />
      )}
    </>
  )
}

export default function MessageBubble({ message, isStreaming, streamingText }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const content = isStreaming && streamingText !== undefined ? streamingText : message.content

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn('group flex gap-3 w-full', isUser && 'flex-row-reverse')}
    >
      {/* Avatar */}
      <div className={cn(
        'w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-0.5',
        isUser
          ? 'bg-gradient-to-br from-[#780206] to-[#061161]'
          : 'bg-bgHover border border-borderSubtle'
      )}>
        {isUser
          ? <User className="w-4 h-4 text-white" />
          : <Sparkles className="w-4 h-4 text-red-400" />
        }
      </div>

      {/* Bubble */}
      <div className={cn('flex flex-col max-w-[80%] min-w-0', isUser && 'items-end')}>
        <div className={cn(
          'relative rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isUser
            ? 'bg-gradient-to-br from-[#780206] to-[#061161] text-white rounded-tr-sm'
            : 'bg-bgCard border border-borderSubtle rounded-tl-sm'
        )}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : (
            <MarkdownContent content={content} isStreaming={isStreaming} />
          )}
        </div>

        {/* Timestamp + copy */}
        <div className={cn(
          'flex items-center gap-1.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity',
          isUser && 'flex-row-reverse'
        )}>
          <span className="text-[10px] text-textMuted">{formatTimestamp(message.timestamp)}</span>
          {!isStreaming && <CopyButton text={content} />}
        </div>
      </div>
    </motion.div>
  )
}
