import os
import streamlit as st
import time
import json
import uuid
from datetime import datetime
import requests
import speech_recognition as sr
from streamlit_lottie import st_lottie
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# ✅ Gemini API Configuration
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

# ✅ Streamlit Page Configuration
st.set_page_config(
    page_title="AI Career Chatbot 🎓",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ✅ Initialize Session State
if "chat_history" not in st.session_state:
    st.session_state.chat_history = {}  # {chat_id: {title, timestamp, messages}}

if "current_chat_id" not in st.session_state:
    st.session_state.current_chat_id = None

if "messages" not in st.session_state:
    st.session_state.messages = []

if "history_text" not in st.session_state:
    st.session_state.history_text = ""

if "career_mode" not in st.session_state:
    st.session_state.career_mode = "general"

# ✅ Load Lottie Animation
def load_lottieurl(url):
    """Load Lottie animation from URL"""
    try:
        r = requests.get(url, timeout=5)
        if r.status_code == 200:
            return r.json()
    except:
        pass
    return None

lottie_ai = load_lottieurl("https://assets10.lottiefiles.com/packages/lf20_tno6cg2w.json")

# ✅ Custom CSS for Fixed Layout (100vh, no page scroll)
st.markdown("""
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
    /* Reset Streamlit Defaults */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    
    /* Main App Container - Fixed Height */
    .main .block-container {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        max-width: 100%;
    }
    
    /* Body and HTML - Fixed Height, No Scroll */
    html, body, #root {
        height: 100vh;
        overflow: hidden;
    }
    
    /* Hide default Streamlit scrolling */
    .main {
        height: 100vh;
        overflow: hidden;
    }
    
    /* Sidebar Styling */
    .css-1d391kg {
        padding-top: 0.5rem;
    }
    
    /* Chat History Item Styling */
    .chat-history-btn {
        width: 100%;
        text-align: left;
        padding: 10px;
        margin: 5px 0;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        color: white;
        transition: all 0.2s;
    }
    
    .chat-history-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: #0575e6;
    }
    
    /* Header Styling */
    .app-header {
        background: linear-gradient(145deg, #1e3c72, #2a5298);
        color: white;
        padding: 15px 20px;
        margin: -1rem -1rem 1rem -1rem;
        border-radius: 0;
        font-family: 'Poppins', sans-serif;
        font-size: 1.5rem;
        font-weight: 600;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    
    /* Messages Container - Scrollable Only */
    .messages-wrapper {
        max-height: calc(100vh - 350px);
        overflow-y: auto;
        overflow-x: hidden;
        padding: 10px 0;
    }
    
    /* Message Timestamp */
    .message-timestamp {
        font-size: 0.7rem;
        color: #888;
        margin-top: 4px;
    }
    
    /* Quick Action Buttons */
    .quick-action-container {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-bottom: 1rem;
    }
    
    /* Career Mode Selector */
    .mode-selector-container {
        margin-bottom: 1rem;
        padding: 10px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
    }
    
    /* Typing Indicator */
    .typing-indicator {
        display: inline-flex;
        gap: 5px;
        padding: 8px 12px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
    }
    
    .typing-dot {
        width: 8px;
        height: 8px;
        background: #888;
        border-radius: 50%;
        animation: typing 1.4s infinite;
    }
    
    .typing-dot:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .typing-dot:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes typing {
        0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
        }
        30% {
            transform: translateY(-10px);
            opacity: 1;
        }
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
        .messages-wrapper {
            max-height: calc(100vh - 400px);
        }
    }
    
    /* Custom scrollbar */
    .messages-wrapper::-webkit-scrollbar {
        width: 8px;
    }
    
    .messages-wrapper::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 4px;
    }
    
    .messages-wrapper::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
    }
    
    .messages-wrapper::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
    }
    
    /* Chat Input Container with Microphone Button */
    .chat-input-container {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    /* Style for voice button to match input height */
    div[data-testid="column"]:first-child button {
        background: rgba(255, 255, 255, 0.05) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        color: #888 !important;
        font-size: 1.3rem !important;
        padding: 10px 12px !important;
        border-radius: 12px !important;
        transition: all 0.2s !important;
        height: auto !important;
        min-height: 48px !important;
    }
    
    div[data-testid="column"]:first-child button:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        border-color: #00f260 !important;
        color: #00f260 !important;
        transform: scale(1.05) !important;
    }
</style>
""", unsafe_allow_html=True)

# ✅ Load Chat History from localStorage (via JavaScript component)
def load_chat_history_from_storage():
    """Load chat history from localStorage using JavaScript"""
    try:
        # Try to get from session state first (synced via JS)
        if hasattr(st.session_state, '_local_storage_chats'):
            return st.session_state._local_storage_chats
    except:
        pass
    return {}

# ✅ Save Chat History to localStorage
def save_chat_history_to_storage():
    """Sync chat history to localStorage via JavaScript"""
    if st.session_state.chat_history:
        st.markdown(f"""
        <script>
        (function() {{
            try {{
                const chatHistory = {json.dumps(st.session_state.chat_history)};
                localStorage.setItem('career_chatbot_history', JSON.stringify(chatHistory));
            }} catch(e) {{
                console.error('Error saving to localStorage:', e);
            }}
        }})();
        </script>
        """, unsafe_allow_html=True)

# ✅ Load Chat History on App Load
def init_chat_history():
    """Initialize chat history from localStorage"""
    st.markdown("""
    <script>
    (function() {
        try {
            const stored = localStorage.getItem('career_chatbot_history');
            if (stored) {
                const history = JSON.parse(stored);
                // Store in a hidden input to sync with Streamlit
                const input = document.createElement('input');
                input.type = 'hidden';
                input.id = 'chat_history_storage';
                input.value = stored;
                document.body.appendChild(input);
            }
        } catch(e) {
            console.error('Error loading from localStorage:', e);
        }
    })();
    </script>
    """, unsafe_allow_html=True)

# Initialize on first load
if "_history_initialized" not in st.session_state:
    init_chat_history()
    st.session_state._history_initialized = True

# ✅ Generate Chat Title from First Message
def generate_chat_title(first_message):
    """Generate a title from the first user message"""
    if len(first_message) > 50:
        return first_message[:47] + "..."
    return first_message

# ✅ Career Guidance Prompts
def get_career_prompt(mode, user_input):
    """Get appropriate prompt based on career guidance mode"""
    base_prompt = "You are an expert career guidance counselor and AI assistant specialized in career development, skills assessment, and professional growth. Provide detailed, actionable, and personalized advice."
    
    prompts = {
        "general": f"{base_prompt} Answer the user's career-related question comprehensively.",
        "roadmap": f"""{base_prompt} Generate a detailed 6-12 month career roadmap with:
        - Monthly milestones and goals
        - Specific learning objectives
        - Recommended courses, resources, or certifications
        - Practical steps and actions
        - Timeline visualization
        Format it clearly with sections and actionable items.""",
        "skill_gap": f"""{base_prompt} Perform a skill gap analysis:
        - Identify current skills from user's input
        - Determine required skills for target role
        - Highlight specific skill gaps
        - Provide learning resources and practice opportunities
        - Suggest concrete steps to bridge each gap""",
        "comparison": f"""{base_prompt} Compare job roles mentioned by the user:
        - Responsibilities and day-to-day tasks
        - Required skills and qualifications
        - Career progression paths
        - Salary ranges (if known)
        - Industry demand and outlook
        - Which role might be a better fit and why""",
        "projects": f"""{base_prompt} Recommend relevant projects for the user's career path:
        - Project descriptions and objectives
        - Technologies and tools to use
        - Difficulty level (beginner/intermediate/advanced)
        - Learning outcomes and skills gained
        - How each project helps build their portfolio
        - Step-by-step guidance for getting started"""
    }
    
    return prompts.get(mode, prompts["general"]) + f"\n\nUser question: {user_input}"

# ✅ Load Chat from History
def load_chat_from_history(chat_id):
    """Load a specific chat from history"""
    if chat_id and chat_id in st.session_state.chat_history:
        chat_data = st.session_state.chat_history[chat_id]
        st.session_state.messages = chat_data.get("messages", [])
        st.session_state.current_chat_id = chat_id
        # Rebuild history text
        history_text = ""
        for msg in st.session_state.messages:
            role_label = "You" if msg["role"] == "user" else "AI"
            timestamp = msg.get("timestamp", "")
            history_text += f"[{timestamp}] {role_label}: {msg['content']}\n\n"
        st.session_state.history_text = history_text

# ✅ Create New Chat
def create_new_chat():
    """Create a new chat conversation"""
    # Save current chat if it exists
    if st.session_state.messages and st.session_state.current_chat_id:
        st.session_state.chat_history[st.session_state.current_chat_id] = {
            "title": st.session_state.chat_history[st.session_state.current_chat_id]["title"],
            "timestamp": st.session_state.chat_history[st.session_state.current_chat_id]["timestamp"],
            "messages": st.session_state.messages.copy()
        }
        save_chat_history_to_storage()
    
    # Create new chat
    new_chat_id = str(uuid.uuid4())
    st.session_state.current_chat_id = new_chat_id
    st.session_state.messages = []
    st.session_state.history_text = ""
    st.session_state.chat_history[new_chat_id] = {
        "title": "New Chat",
        "timestamp": datetime.now().isoformat(),
        "messages": []
    }

# ✅ Sidebar - Chat History
with st.sidebar:
    st.markdown('<div class="app-header">🏆 Excel Your Career</div>', unsafe_allow_html=True)
    
    # New Chat Button
    if st.button("➕ New Chat", use_container_width=True, type="primary"):
        create_new_chat()
        st.rerun()
    
    st.markdown("---")
    st.markdown("### 💬 Chat History")
    
    # Chat History List
    if st.session_state.chat_history:
        # Sort by timestamp (newest first)
        sorted_chats = sorted(
            st.session_state.chat_history.items(),
            key=lambda x: x[1]["timestamp"],
            reverse=True
        )
        
        for chat_id, chat_data in sorted_chats:
            is_active = chat_id == st.session_state.current_chat_id
            try:
                timestamp = datetime.fromisoformat(chat_data["timestamp"])
                time_str = timestamp.strftime("%b %d, %H:%M")
            except:
                time_str = "Recent"
            
            # Create button label with title and time
            label = f"{chat_data['title']}\n_{time_str}_"
            
            if st.button(
                label,
                key=f"chat_{chat_id}",
                use_container_width=True,
                type="primary" if is_active else "secondary"
            ):
                load_chat_from_history(chat_id)
                st.rerun()
    else:
        st.info("No chat history yet. Start a new conversation!")
    
    st.markdown("---")
    
    # Download and Clear buttons
    if st.session_state.history_text:
        st.download_button(
            "💾 Download Current Chat",
            data=st.session_state.history_text,
            file_name=f"career_chat_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt",
            use_container_width=True
        )
    
    if st.button("🧹 Clear All Chats", use_container_width=True):
        st.session_state.chat_history = {}
        st.session_state.current_chat_id = None
        st.session_state.messages = []
        st.session_state.history_text = ""
        st.rerun()

    st.markdown("---")
    st.write("🎙️ **Voice Control**")
    voice_clicked = st.button("🎤 Start Voice Input", key="voice_btn", use_container_width=True)

# ✅ Main Content Area
st.markdown('<div class="app-header">🎓 AI Career Guidance Chatbot</div>', unsafe_allow_html=True)

# ✅ Messages Container (Scrollable Only)
st.markdown('<div class="messages-wrapper">', unsafe_allow_html=True)

if not st.session_state.messages:
    # Welcome area with Lottie animation
    col1, col2 = st.columns([1, 2])
    with col1:
        if lottie_ai:
            st_lottie(lottie_ai, height=250, key="welcome_lottie")
    with col2:
        st.markdown("""
        <div style="padding: 20px;">
            <h2 style="color: white; margin-bottom: 15px;">👋 Welcome to AI Career Guidance!</h2>
            <p style="color: #ccc; line-height: 1.6; font-size: 1rem;">
                Ask me anything about your career path, skills, job roles, or get a personalized roadmap.<br><br>
                • <strong>Roadmap</strong> - Get a 6-12 month career plan<br>
                • <strong>Skill Gap Analysis</strong> - Identify areas to improve<br>
                • <strong>Job Comparison</strong> - Compare different roles<br>
                • <strong>Project Recommendations</strong> - Build your portfolio
            </p>
        </div>
        """, unsafe_allow_html=True)
else:
    # Display all messages
    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])
            if "timestamp" in msg:
                st.markdown(f'<div class="message-timestamp">{msg["timestamp"]}</div>', unsafe_allow_html=True)

st.markdown('</div>', unsafe_allow_html=True)

# ✅ Voice to Text Function (Preserved from original)
def transcribe_voice():
    """Voice to text transcription (requires microphone permissions)"""
    try:
        r = sr.Recognizer()
        with sr.Microphone() as source:
            st.info("🎤 Listening... Speak now!")
            audio = r.listen(source)
            try:
                text = r.recognize_google(audio)
                st.success("🗣️ You said: " + text)
                return text
            except sr.UnknownValueError:
                st.error("Speech not recognized. Try again!")
            except sr.RequestError as e:
                st.error(f"Speech recognition error: {e}")
    except Exception as e:
        st.error(f"Microphone error: {e}. Please check browser permissions.")
    return ""

# ✅ Chat Input
user_input = st.chat_input("Type your message here (Shift+Enter for new line)...")

# Handle voice input
if voice_clicked:
    voice_text = transcribe_voice()
    if voice_text:
        st.session_state.voice_input = voice_text

# Handle voice input
if "voice_input" in st.session_state and st.session_state.voice_input:
    user_input = st.session_state.voice_input
    del st.session_state.voice_input

# Handle quick input
if "quick_input" in st.session_state and st.session_state.quick_input:
    user_input = st.session_state.quick_input
    del st.session_state.quick_input

if user_input:
    # Initialize new chat if needed
    if st.session_state.current_chat_id is None:
        create_new_chat()
    
    # Add user message
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    user_message = {
        "role": "user",
        "content": user_input,
        "timestamp": timestamp
    }
    st.session_state.messages.append(user_message)
    st.session_state.history_text += f"[{timestamp}] You: {user_input}\n\n"
    
    # Update chat title if this is the first message
    if len(st.session_state.messages) == 1:
        title = generate_chat_title(user_input)
        st.session_state.chat_history[st.session_state.current_chat_id]["title"] = title
    
    # Show typing indicator and get AI response
    with st.chat_message("assistant"):
        message_placeholder = st.empty()
        message_placeholder.markdown("""
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
        """, unsafe_allow_html=True)
        
        try:
            # Get response from Gemini
            prompt = get_career_prompt(st.session_state.career_mode, user_input)
            response = model.generate_content(prompt)
            bot_reply = response.text
            
            # Display response with typing animation
            message_placeholder.empty()
            
            # Simulate typing effect
            display_text = ""
            for char in bot_reply:
                display_text += char
                message_placeholder.markdown(display_text + "▌")
                time.sleep(0.005)
            
            message_placeholder.markdown(display_text)
            
            # Add AI message
            ai_message = {
                "role": "assistant",
                "content": bot_reply,
                "timestamp": timestamp
            }
            st.session_state.messages.append(ai_message)
            st.session_state.history_text += f"[{timestamp}] AI: {bot_reply}\n\n"
            
        except Exception as e:
            message_placeholder.error(f"❌ Error: {str(e)}")
    
    # Save to chat history
    if st.session_state.current_chat_id:
        st.session_state.chat_history[st.session_state.current_chat_id]["messages"] = st.session_state.messages.copy()
        st.session_state.chat_history[st.session_state.current_chat_id]["timestamp"] = datetime.now().isoformat()
        save_chat_history_to_storage()
    
    st.rerun()

# ✅ Sync localStorage on every render
save_chat_history_to_storage()

# ✅ Smooth scroll script
st.markdown("""
<script>
// Auto-scroll to bottom of messages
window.addEventListener('load', function() {
    setTimeout(function() {
        const messagesContainer = document.querySelector('.messages-wrapper');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }, 100);
});

// Scroll on new messages
const observer = new MutationObserver(function() {
    const messagesContainer = document.querySelector('.messages-wrapper');
    if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});

setTimeout(function() {
    const messagesContainer = document.querySelector('.messages-wrapper');
    if (messagesContainer) {
        observer.observe(messagesContainer, { childList: true, subtree: true });
    }
}, 500);
</script>
""", unsafe_allow_html=True)

# ✅ Footer
st.markdown("""
<div style="padding: 10px; text-align: center; color: #888; font-size: 0.8rem; margin-top: 10px;">
    Built by Rajan with Prompt Engineering | Powered by Gemini
</div>
""", unsafe_allow_html=True)
