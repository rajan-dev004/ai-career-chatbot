/**
 * WelcomeScreen Component
 * 
 * Purpose: Renders the initial dashboard onboarding view shown when a chat is empty.
 * - Displays a welcome hero heading and description.
 * - Shows interactive "Feature Cards" for specific career assistance modes (Roadmap, Skill Gap, Comparison, Projects).
 * - Provides clickable quick prompts at the bottom to easily initiate a career guidance search.
 */
'use client'
import { motion } from 'framer-motion'
import { Map, Target, Scale, Wrench, MessageCircle, ArrowRight } from 'lucide-react'
import type { CareerMode } from '@/lib/types'

interface WelcomeScreenProps {
  onSuggest: (text: string, mode: CareerMode) => void
}

const FEATURES = [
  {
    icon: Map,
    mode: 'roadmap' as CareerMode,
    title: 'Career Roadmap',
    description: 'Get a personalized 6–12 month plan with milestones, resources, and timelines.',
    color: 'from-blue-500/20 to-indigo-600/20',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
    prompt: 'Create a 6-month career roadmap for me to become a full-stack developer',
  },
  {
    icon: Target,
    mode: 'skill_gap' as CareerMode,
    title: 'Skill Gap Analysis',
    description: 'Identify missing skills for your target role and get a learning plan.',
    color: 'from-emerald-500/20 to-teal-600/20',
    border: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
    prompt: 'Analyze skill gaps for transitioning from backend to ML engineering',
  },
  {
    icon: Scale,
    mode: 'comparison' as CareerMode,
    title: 'Job Comparison',
    description: 'Compare roles side by side — responsibilities, pay, growth, and fit.',
    color: 'from-amber-500/20 to-orange-600/20',
    border: 'border-amber-500/20',
    iconColor: 'text-amber-400',
    prompt: 'Compare Software Engineer vs Data Scientist roles in 2025',
  },
  {
    icon: Wrench,
    mode: 'projects' as CareerMode,
    title: 'Project Ideas',
    description: 'Get tailored portfolio projects that impress recruiters in your field.',
    color: 'from-purple-500/20 to-pink-600/20',
    border: 'border-purple-500/20',
    iconColor: 'text-purple-400',
    prompt: 'Suggest 5 portfolio projects for a React frontend developer',
  },
]

const QUICK_PROMPTS = [
  'How do I switch careers to product management?',
  'What skills do I need for DevOps in 2025?',
  'Review my career path as a junior developer',
  'Best certifications for cloud computing?',
]

export default function WelcomeScreen({ onSuggest }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center w-full min-h-full px-4 py-6">
      <div className="my-auto flex flex-col items-center w-full">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#780206]/10 border border-[#780206]/20 text-red-400 text-xs font-medium mb-4">
            <MessageCircle className="w-3.5 h-3.5" />
            AI-Career Guidance Chatbot
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="gradient-text">Excel Your Career</span>
          </h1>
          <p className="text-[#9898b0] text-base max-w-md mx-auto leading-relaxed">
            Your personal AI career counselor. Get roadmaps, skill analysis, job comparisons, and project ideas — all tailored to you.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mb-8">
          {FEATURES.map((feat, i) => (
            <motion.button
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
              onClick={() => onSuggest(feat.prompt, feat.mode)}
              className={`group text-left p-4 rounded-2xl bg-gradient-to-br ${feat.color} border ${feat.border} glass-hover transition-all duration-200 hover:scale-[1.02] hover:shadow-card`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 p-2 rounded-lg bg-white/5 ${feat.iconColor}`}>
                  <feat.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-textPrimary">{feat.title}</h3>
                    <ArrowRight className="w-3.5 h-3.5 text-textMuted group-hover:text-textSecondary group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-textSecondary mt-1 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Quick prompts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-2xl"
        >
          <p className="text-[10px] uppercase tracking-widest text-textMuted font-medium mb-2 text-center">
            Or try a quick question
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {QUICK_PROMPTS.map(p => (
              <button
                key={p}
                onClick={() => onSuggest(p, 'general')}
                className="px-3 py-1.5 rounded-full text-xs text-textSecondary bg-bgHover border border-borderSubtle hover:bg-bgHover/80 hover:text-textPrimary hover:border-borderHover transition-all duration-150"
              >
                {p}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
