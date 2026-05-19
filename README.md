# 🚀 AI Career Guidance Chatbot

An interactive, responsive AI-powered career counseling chatbot built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Google Gemini API** (`gemini-1.5-flash` or similar models via the `@google/generative-ai` package). It supports multiple modes of interaction, including roadmaps, comparison, portfolio ideas, skill-gap analysis, and general chat.

## 🛠️ Tech Stack & Architecture

Here is the tech stack used in the project:

### **Frontend Framework & Core**
*   **Next.js 15.3.2 (App Router):** Modern React framework for server-rendered page routing, performance, and API route endpoints.
*   **React 19.0.0:** The UI rendering engine utilizing hooks, layouts, and server/client components.
*   **TypeScript 5.6.0:** Providing static typing and code reliability.

### **Styling & Presentation**
*   **Tailwind CSS 3.4.17:** Utility-first CSS framework for rapid UI styling with responsive utilities.
*   **Framer Motion 11.11.0:** Powering micro-animations, transitions, and slide-in sidebar drawers.
*   **Lucide React 0.507.0:** Premium vector SVG icons for visual accents.
*   **PostCSS & Autoprefixer:** Under-the-hood CSS compilation and autoprefixing.

### **AI & API Integration**
*   **Google Generative AI SDK (`@google/generative-ai` v0.21.0):** Interfacing with Google Gemini models.
*   **Gemini Flash model (`gemini-flash-latest`):** Efficient, streaming-enabled generative model for rapid chat responses.

### **Text Rendering & Syntax Highlighting**
*   **React Markdown 9.0.1:** Renders AI-generated responses (markdown format) cleanly.
*   **Remark GFM 4.0.0:** Standard GitHub-Flavored Markdown support (tables, lists, links).
*   **Rehype Highlight 7.0.2 & Highlight.js 11.10.0:** Auto-detects and highlights code syntax inside responses.

---

## 🌟 Core Features

1.  **Multiple Career Modes:**
    *   💬 **General:** Generic Career Q&A and advice.
    *   🗺️ **Roadmap:** Structured 6-12 month milestones, learning objectives, and timeline.
    *   🎯 **Skill Gap:** Highlights current vs. target requirements, and suggests resources.
    *   ⚖️ **Job Compare:** Deep comparison of salary ranges, industry demand, and responsibilities.
    *   🛠️ **Projects:** Recommends resume-boosting portfolio ideas with technologies and getting-started steps.
2.  **Streaming Text Responses:** Leverages HTTP ReadableStream to stream AI responses word-by-word.
3.  **Responsive Sidebar Drawer:** Desktop sidebar collapses into a slide-in sidebar drawer on mobile screens.
4.  **Local Storage Persistence:** Chat sessions are persisted across page reloads.

---

## 📁 Directory Structure

```
AI Career Chatbot/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts       # Server-side Gemini API Integration (Streaming)
│   │   ├── globals.css            # Custom CSS and global scrollbar styles
│   │   ├── layout.tsx             # Root Layout (Fonts, metadata)
│   │   └── page.tsx               # Main Dashboard page layout & mobile state
│   ├── components/                # Modular React elements (Sidebar, Chat, Input)
│   ├── hooks/                     # Custom React Hooks (State logic, localStorage integration)
│   └── lib/
│       ├── prompts.ts             # Custom structured career mode prompts
│       └── types.ts               # TypeScript Interfaces (Chat, Message, Mode)
├── tailwind.config.ts             # Tailwind layout config
├── next.config.ts                 # Next.js custom settings
├── package.json                   # Dependencies list
└── tsconfig.json                  # TypeScript compiler rules
```

---

## 🚀 Running the Project Locally

### 1. Prerequisites
Ensure you have Node.js installed (v18.x or above recommended).

### 2. Environment Configuration
Create a `.env.local` file (or update your existing one) in the root directory and add your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Install Dependencies
Run the following command to download dependencies:
```bash
npm install
```

### 4. Run Development Server
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for Production
To compile a production build of the website:
```bash
npm run build
npm start
```
