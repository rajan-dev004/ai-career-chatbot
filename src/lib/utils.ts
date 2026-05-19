/**
 * Utility Helpers
 * 
 * Purpose: Provides helper functions used across the application.
 * - cn(...): Combines classes conditionally (clsx) and handles Tailwind CSS overrides/conflicts (tailwind-merge).
 * - formatTimestamp(iso): Formats an ISO date string into a user-friendly timestamp (e.g., "10:30 AM").
 * - formatDateLabel(iso): Formats an ISO date string into relative terms (e.g., "Today", "Yesterday", or "3 days ago").
 * - generateChatTitle(firstMessage): Generates a concise title from the user's initial message to label the chat session in the sidebar.
 */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

export function formatDateLabel(iso: string): string {
  try {
    const d = new Date(iso)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const days = Math.floor(diff / 86400000)
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  } catch {
    return ''
  }
}

export function generateChatTitle(firstMessage: string): string {
  const cleaned = firstMessage.trim()
  return cleaned.length > 50 ? cleaned.slice(0, 47) + '…' : cleaned
}
