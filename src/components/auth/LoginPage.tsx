/**
 * LoginPage Component
 * 
 * Purpose: Full-screen login page shown to unauthenticated users.
 * - Displays app branding with gradient background and animated elements.
 * - Provides a "Sign in with Google" button using Firebase Auth popup flow.
 * - Responsive design with Framer Motion entrance animations.
 */
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, MessageSquare, Map, Target, GitCompare, Lightbulb, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const features = [
  { icon: MessageSquare, label: 'Career Q&A', description: 'Get personalized career advice' },
  { icon: Map,           label: 'Roadmaps',   description: 'Build 6-12 month career plans' },
  { icon: Target,        label: 'Skill Gap',   description: 'Identify missing skills' },
  { icon: GitCompare,    label: 'Job Compare', description: 'Compare roles side by side' },
  { icon: Lightbulb,     label: 'Projects',    description: 'Portfolio project ideas' },
]

export default function LoginPage() {
  const { signInWithGoogle } = useAuth()
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    setIsSigningIn(true)
    setError(null)
    try {
      await signInWithGoogle()
    } catch (err) {
      console.error('Sign in error:', err)
      const message = (err as Error).message
      // Don't show error for user-cancelled popup
      if (!message.includes('popup-closed-by-user') && !message.includes('cancelled-popup-request')) {
        setError(`Sign in failed: ${message}`)
      }
    } finally {
      setIsSigningIn(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-bgBase relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#780206]/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#061161]/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#780206]/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center gap-8 px-6 py-12 max-w-md w-full"
      >
        {/* Logo & Branding */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#780206] to-[#061161] flex items-center justify-center shadow-xl shadow-[#780206]/30">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold gradient-text">AI Career Guidance</h1>
            <p className="text-sm text-textMuted mt-1">Your personal AI career counselor</p>
          </div>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.08 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bgHover border border-borderSubtle text-xs text-textSecondary"
            >
              <f.icon className="w-3 h-3 text-textMuted" />
              {f.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Sign in card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full bg-bgSidebar border border-borderSubtle rounded-2xl p-6 shadow-2xl shadow-black/20 backdrop-blur-sm"
        >
          <p className="text-center text-sm text-textSecondary mb-5">
            Sign in to save your conversations and access them from anywhere
          </p>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-2 px-3 py-2 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Google Sign In Button */}
          <button
            onClick={handleSignIn}
            disabled={isSigningIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {isSigningIn ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            {isSigningIn ? 'Signing in…' : 'Sign in with Google'}
          </button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-[11px] text-textMuted text-center"
        >
          Powered by Gemini 2.0 Flash • Your data stays private
        </motion.p>
      </motion.div>
    </div>
  )
}
