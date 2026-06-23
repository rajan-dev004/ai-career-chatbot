/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#fdf2f2',
          100: '#fde8e8',
          400: '#e02424',
          500: '#780206',
          600: '#061161',
          700: '#040b4d',
        },
        dark: {
          50:  '#f0f0f5',
          100: '#c8c8d8',
          200: '#8b8b9e',
          300: '#555567',
          400: '#2a2a38',
          500: '#1e1e28',
          600: '#16161e',
          700: '#111118',
          800: '#0d0d14',
          900: '#0a0a0f',
        },
        bgBase: 'var(--bg-base)',
        bgSidebar: 'var(--bg-sidebar)',
        bgCard: 'var(--bg-card)',
        bgInput: 'var(--bg-input)',
        bgHover: 'var(--bg-hover)',
        textPrimary: 'var(--text-1)',
        textSecondary: 'var(--text-2)',
        textMuted: 'var(--text-3)',
        borderSubtle: 'var(--border-subtle)',
        borderHover: 'var(--border-hover)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(135deg, #780206, #061161)',
        'user-bubble': 'linear-gradient(135deg, #780206, #061161)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'bounce-dot': {
          '0%, 80%, 100%': { transform: 'translateY(0)', opacity: '0.5' },
          '40%':           { transform: 'translateY(-6px)', opacity: '1' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(156, 163, 175, 0.1)', borderColor: 'rgba(179, 183, 188, 0.2)' },
          '50%':      { boxShadow: '0 0 25px rgba(65, 124, 226, 0.4)', borderColor: 'rgba(156, 163, 175, 0.5)' },
        },
        'pulse-text-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(220, 38, 38, 0.3))' },
          '50%':      { filter: 'drop-shadow(0 0 25px rgba(220, 38, 38, 0.7))' },
        },
      },
      animation: {
        'fade-in':      'fade-in 0.3s ease-out',
        'slide-in-left':'slide-in-left 0.3s ease-out',
        'bounce-dot':   'bounce-dot 1.4s ease-in-out infinite',
        'shimmer':      'shimmer 2s linear infinite',
        'pulse-glow':   'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-text-glow': 'pulse-text-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'glow':       '0 0 20px rgba(120, 2, 6, 0.3)',
        'glow-sm':    '0 0 10px rgba(120, 2, 6, 0.2)',
        'card':       '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.6)',
      },
      maxWidth: {
        '3xl': '58rem',
      },
    },
  },
  plugins: [],
}

module.exports = config
