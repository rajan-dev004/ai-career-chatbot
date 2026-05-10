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
