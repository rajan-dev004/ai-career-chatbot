/**
 * TypeScript Type Definitions
 * 
 * Purpose: Defines core structural interfaces and types utilized throughout the application.
 * - CareerMode: Represents the different chat categories (General advice, Roadmap development, Skill gap analysis, Job comparison, Portfolio project ideas).
 * - Message: Represents a single dialogue entry in a chat (user prompt or assistant reply).
 * - Chat: Represents a single, unified conversation session with an ID, title, timestamp, and array of messages.
 * - ChatState: Describes the local state structure for useChat.
 * - CAREER_MODES: A static array containing UI labels, descriptions, and icons for each career mode.
 */
export type CareerMode = 'general' | 'roadmap' | 'skill_gap' | 'comparison' | 'projects'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  mode?: CareerMode
}

export interface Chat {
  id: string
  title: string
  timestamp: string
  messages: Message[]
  mode: CareerMode
}

export interface ChatState {
  chats: Record<string, Chat>
  currentChatId: string | null
  isStreaming: boolean
  streamingText: string
  careerMode: CareerMode
}

export const CAREER_MODES: { value: CareerMode; label: string; icon: string; description: string }[] = [
  { value: 'general',    label: 'General',       icon: '💬', description: 'Career Q&A and advice' },
  { value: 'roadmap',    label: 'Roadmap',        icon: '🗺️', description: '6-12 month career plan' },
  { value: 'skill_gap',  label: 'Skill Gap',      icon: '🎯', description: 'Identify missing skills' },
  { value: 'comparison', label: 'Job Compare',    icon: '⚖️', description: 'Compare job roles' },
  { value: 'projects',   label: 'Projects',       icon: '🛠️', description: 'Portfolio project ideas' },
]
