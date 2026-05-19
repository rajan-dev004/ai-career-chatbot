/**
 * TypingIndicator Component
 * 
 * Purpose: Renders a pulsing loading indicator (three bouncing dots)
 * to let the user know that the AI is generating or preparing a response.
 */
'use client'
export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm bg-bgCard border border-borderSubtle w-fit">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-red-400"
          style={{ animation: `pulse-dot 1.4s ease-in-out ${i * 0.16}s infinite` }}
        />
      ))}
    </div>
  )
}
