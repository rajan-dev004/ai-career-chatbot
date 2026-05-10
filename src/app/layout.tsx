import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Career Guidance — Excel Your Career',
  description: 'Personalized AI-powered career guidance, roadmaps, skill gap analysis, and project recommendations.',
  keywords: ['career guidance', 'AI career coach', 'skill gap', 'career roadmap', 'job comparison'],
  authors: [{ name: 'Rajan' }],
  openGraph: {
    title: 'AI Career Guidance',
    description: 'Your personal AI career counselor powered by Gemini.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="h-screen overflow-hidden bg-[#0a0a0f] text-[#f0f0f5] antialiased">
        {children}
      </body>
    </html>
  )
}
