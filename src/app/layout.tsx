/**
 * RootLayout Component
 * 
 * Purpose: Defines the HTML layout wrapper around all pages in the Next.js application.
 * - Imports the global stylesheet (globals.css).
 * - Configures SEO metadata (title, description, keywords, OpenGraph meta tag properties).
 * - Appends global utility classes on the body element (h-screen, dark mode, antialiasing).
 */
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            if (localStorage.getItem('theme') === 'light') {
              document.documentElement.classList.add('light');
            } else {
              document.documentElement.classList.remove('light');
            }
          } catch (_) {}
        ` }} />
      </head>
      <body className="h-screen overflow-hidden bg-bgBase text-textPrimary antialiased">
        {children}
      </body>
    </html>
  )
}
