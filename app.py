import os
import streamlit as st
import time
import uuid
from datetime import datetime
import requests
import speech_recognition as sr
from streamlit_lottie import st_lottie
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# ── Gemini Configuration ─────────────────────────────────────────────────────
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-2.5-flash")

# ── Page Config ──────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="AI Career Chatbot",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ── Session State ────────────────────────────────────────────────────────────
if "chat_history" not in st.session_state:
    st.session_state.chat_history = {}
if "current_chat_id" not in st.session_state:
    st.session_state.current_chat_id = None
if "messages" not in st.session_state:
    st.session_state.messages = []
if "history_text" not in st.session_state:
    st.session_state.history_text = ""
if "career_mode" not in st.session_state:
    st.session_state.career_mode = "general"
if "is_generating" not in st.session_state:
    st.session_state.is_generating = False
if "current_prompt" not in st.session_state:
    st.session_state.current_prompt = None

# ── Inject CSS safely (avoids nth-child parser bug) ──────────────────────────
def inject_css():
    css = """
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    * { box-sizing: border-box; margin: 0; }

    html, body, [data-testid="stAppViewContainer"] {
        background: #212121 !important;
        font-family: 'Inter', sans-serif !important;
    }

    #MainMenu, footer, header { visibility: hidden; }
    [data-testid="stToolbar"] { display: none !important; }
    [data-testid="stDecoration"] { display: none !important; }

    .block-container {
        padding-top: 1.5rem !important;
        padding-bottom: 0 !important;
        max-width: 860px !important;
    }

    /* ── Sidebar ── */
    [data-testid="stSidebar"] {
        background: #171717 !important;
        border-right: 1px solid #2f2f2f !important;
    }
    [data-testid="stSidebar"] > div:first-child {
        padding: 14px 10px !important;
    }
    .sidebar-brand {
        font-size: 1.05rem;
        font-weight: 700;
        color: #ececec;
        padding: 4px 4px 14px 4px;
        display: flex;
        align-items: center;
        gap: 6px;
        border-bottom: 1px solid #2f2f2f;
        margin-bottom: 10px;
    }
    .sidebar-label {
        font-size: 0.68rem;
        font-weight: 600;
        color: #555;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        padding: 10px 4px 4px 4px;
    }

    /* sidebar buttons */
    [data-testid="stSidebar"] [data-testid="stBaseButton-primary"] > button,
    [data-testid="stSidebar"] [data-testid="stBaseButton-primary"] {
        background: #2a2a2a !important;
        color: #ececec !important;
        border: 1px solid #3a3a3a !important;
        border-radius: 8px !important;
        font-size: 0.85rem !important;
        font-weight: 500 !important;
        text-align: left !important;
    }
    [data-testid="stSidebar"] [data-testid="stBaseButton-primary"] > button:hover,
    [data-testid="stSidebar"] [data-testid="stBaseButton-primary"]:hover {
        background: #3a3a3a !important;
        border-color: #505050 !important;
    }
    [data-testid="stSidebar"] [data-testid="stBaseButton-secondary"] > button,
    [data-testid="stSidebar"] [data-testid="stBaseButton-secondary"] {
        background: transparent !important;
        color: #aaa !important;
        border: none !important;
        border-radius: 8px !important;
        font-size: 0.82rem !important;
        font-weight: 400 !important;
        text-align: left !important;
    }
    [data-testid="stSidebar"] [data-testid="stBaseButton-secondary"] > button:hover,
    [data-testid="stSidebar"] [data-testid="stBaseButton-secondary"]:hover {
        background: #2a2a2a !important;
        color: #fff !important;
    }

    /* selectbox in sidebar */
    [data-testid="stSidebar"] [data-testid="stSelectbox"] div[data-baseweb="select"] > div {
        background: #2a2a2a !important;
        border: 1px solid #3a3a3a !important;
        border-radius: 8px !important;
        color: #ececec !important;
        font-size: 0.85rem !important;
    }

    /* ── Main chat messages ── */
    [data-testid="stChatMessage"] {
        background: transparent !important;
        border: none !important;
        padding: 6px 0 !important;
    }

    /* ── Chat input ── */
    [data-testid="stChatInput"] textarea {
        background: #2f2f2f !important;
        color: #ececec !important;
        font-family: 'Inter', sans-serif !important;
        font-size: 0.95rem !important;
        border-radius: 12px !important;
        border: 1px solid #404040 !important;
    }
    [data-testid="stChatInput"] textarea:focus {
        border-color: #555 !important;
        box-shadow: none !important;
    }
    [data-testid="stChatInput"] textarea::placeholder {
        color: #666 !important;
    }

    /* ── Timestamp ── */
    .msg-ts {
        font-size: 0.67rem;
        color: #555;
        margin-top: 2px;
    }

    /* ── Typing animation ── */
    .typing-row {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 6px 0;
    }
    .dot {
        width: 7px; height: 7px;
        background: #777;
        border-radius: 50%;
        animation: blink 1.2s infinite;
    }
    .dot.d2 { animation-delay: 0.2s; }
    .dot.d3 { animation-delay: 0.4s; }
    @keyframes blink {
        0%, 80%, 100% { opacity: 0.25; transform: scale(0.8); }
        40%           { opacity: 1;    transform: scale(1);   }
    }

    /* ── Welcome screen ── */
    .welcome-wrap {
        text-align: center;
        padding: 40px 20px 20px 20px;
    }
    .welcome-title {
        font-size: 1.8rem;
        font-weight: 700;
        color: #ececec;
        margin-bottom: 8px;
    }
    .welcome-sub {
        font-size: 0.95rem;
        color: #777;
        margin-bottom: 28px;
    }

    /* ── Suggestion buttons ── */
    [data-testid="stMainBlockContainer"] [data-testid="stBaseButton-secondary"] > button {
        background: #2a2a2a !important;
        color: #ccc !important;
        border: 1px solid #3a3a3a !important;
        border-radius: 10px !important;
        font-size: 0.85rem !important;
        text-align: left !important;
        padding: 10px 14px !important;
        line-height: 1.4 !important;
        white-space: normal !important;
        height: auto !important;
    }
    [data-testid="stMainBlockContainer"] [data-testid="stBaseButton-secondary"] > button:hover {
        background: #363636 !important;
        border-color: #505050 !important;
        color: #fff !important;
    }

    /* ── Divider ── */
    hr { border-color: #2f2f2f !important; margin: 8px 0 !important; }

    /* ── Scrollbar ── */
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #3a3a3a; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #505050; }

    /* ── stAlert (info/warning) in sidebar ── */
    [data-testid="stSidebar"] .stAlert {
        font-size: 0.8rem;
        border-radius: 8px;
    }
    
    /* ── Stop Button Styling ── */
    .stButton > button[key="stop_btn"] {
        background: #212121 !important;
        color: #ececec !important;
        border: 1px solid #404040 !important;
        border-radius: 8px !important;
        font-size: 0.85rem !important;
        padding: 6px 12px !important;
        margin: 0 auto !important;
        display: block !important;
    }
    """
    st.html(f"<style>{css}</style>")

inject_css()


# ── Helpers ──────────────────────────────────────────────────────────────────
def load_lottie(url):
    try:
        r = requests.get(url, timeout=5)
        if r.status_code == 200:
            return r.json()
    except Exception:
        pass
    return None


def generate_chat_title(msg):
    return msg[:47] + "..." if len(msg) > 50 else msg


def get_career_prompt(mode, user_input):
    base = (
        "You are an expert career guidance counselor specialised in career development, "
        "skills assessment and professional growth. Give detailed, actionable, personalised advice."
    )
    prompts = {
        "general":    f"{base} Answer the user's career question comprehensively.",
        "roadmap":    f"{base} Build a detailed 6-12 month career roadmap with monthly milestones, learning objectives, recommended resources, and practical steps.",
        "skill_gap":  f"{base} Do a thorough skill-gap analysis: current skills → target role requirements → gaps → resources to close them.",
        "comparison": f"{base} Compare the job roles the user mentions across responsibilities, skills, salary, progression, and fit.",
        "projects":   f"{base} Recommend portfolio projects suited to the user's career goal with tech stack, difficulty level, and learning outcomes.",
    }
    return prompts.get(mode, prompts["general"]) + f"\n\nUser question: {user_input}"


def load_chat(chat_id):
    if chat_id and chat_id in st.session_state.chat_history:
        data = st.session_state.chat_history[chat_id]
        st.session_state.messages = data.get("messages", [])
        st.session_state.current_chat_id = chat_id
        ht = ""
        for m in st.session_state.messages:
            label = "You" if m["role"] == "user" else "AI"
            ht += f"[{m.get('timestamp','')}] {label}: {m['content']}\n\n"
        st.session_state.history_text = ht


def create_new_chat():
    cid = st.session_state.current_chat_id
    if st.session_state.messages and cid and cid in st.session_state.chat_history:
        st.session_state.chat_history[cid]["messages"] = st.session_state.messages.copy()
    new_id = str(uuid.uuid4())
    st.session_state.current_chat_id = new_id
    st.session_state.messages = []
    st.session_state.history_text = ""
    st.session_state.chat_history[new_id] = {
        "title": "New Chat",
        "timestamp": datetime.now().isoformat(),
        "messages": [],
    }


def transcribe_voice():
    try:
        r = sr.Recognizer()
        with sr.Microphone() as source:
            st.toast("🎤 Listening… speak now!")
            audio = r.listen(source, timeout=8)
            try:
                return r.recognize_google(audio)
            except sr.UnknownValueError:
                st.warning("Could not understand speech. Please try again.")
            except sr.RequestError as e:
                st.error(f"Speech API error: {e}")
    except Exception as e:
        st.error(f"Microphone error: {e}")
    return ""


lottie_ai = load_lottie("https://assets10.lottiefiles.com/packages/lf20_tno6cg2w.json")

# ════════════════════════════════════════════════════════════════════════════
# SIDEBAR
# ════════════════════════════════════════════════════════════════════════════
with st.sidebar:
    st.markdown('<div class="sidebar-brand">🎓 Excel Your Career</div>', unsafe_allow_html=True)

    if st.button("＋  New Chat", use_container_width=True, type="primary"):
        create_new_chat()
        st.rerun()

    st.markdown('<div class="sidebar-label">Recent</div>', unsafe_allow_html=True)

    if st.session_state.chat_history:
        sorted_chats = sorted(
            st.session_state.chat_history.items(),
            key=lambda x: x[1]["timestamp"],
            reverse=True,
        )
        for chat_id, chat_data in sorted_chats:
            is_active = chat_id == st.session_state.current_chat_id
            try:
                ts = datetime.fromisoformat(chat_data["timestamp"]).strftime("%b %d")
            except Exception:
                ts = ""
            label = f"{'● ' if is_active else '○ '}{chat_data['title']}  ·  {ts}"
            if st.button(label, key=f"ch_{chat_id}", use_container_width=True,
                         type="primary" if is_active else "secondary"):
                load_chat(chat_id)
                st.rerun()
    else:
        st.caption("No chats yet — start a conversation!")

    st.markdown("---")
    st.markdown('<div class="sidebar-label">Guidance Mode</div>', unsafe_allow_html=True)

    mode_map = {
        "💬  General":          "general",
        "🗺️  Career Roadmap":   "roadmap",
        "🔍  Skill Gap":        "skill_gap",
        "⚖️  Job Comparison":   "comparison",
        "🛠️  Project Ideas":    "projects",
    }
    
    inv_mode_map = {v: k for k, v in mode_map.items()}
    current_label = inv_mode_map.get(st.session_state.career_mode, "💬  General")
    
    mode_labels = list(mode_map.keys())
    try:
        default_idx = mode_labels.index(current_label)
    except ValueError:
        default_idx = 0
        
    sel = st.selectbox(
        "Mode",
        mode_labels,
        index=default_idx,
        label_visibility="collapsed",
    )
    st.session_state.career_mode = mode_map.get(sel, "general")

    st.markdown("---")

    if st.button("🎤  Voice Input", use_container_width=True, type="secondary"):
        text = transcribe_voice()
        if text:
            st.session_state.voice_pending = text
            st.rerun()

    if st.session_state.history_text:
        st.download_button(
            "💾  Download Chat",
            data=st.session_state.history_text,
            file_name=f"career_chat_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt",
            use_container_width=True,
        )

    if st.button("🗑️  Clear All Chats", use_container_width=True, type="secondary"):
        st.session_state.chat_history = {}
        st.session_state.current_chat_id = None
        st.session_state.messages = []
        st.session_state.history_text = ""
        st.rerun()


# ════════════════════════════════════════════════════════════════════════════
# MAIN AREA
# ════════════════════════════════════════════════════════════════════════════

# ── Welcome / empty state ────────────────────────────────────────────────────
if not st.session_state.messages:
    col_l, col_c, col_r = st.columns([1, 4, 1])
    with col_c:
        if lottie_ai:
            st_lottie(lottie_ai, height=120, key="welcome_lottie")
        st.markdown(
            '<div class="welcome-title">How can I help your career today?</div>'
            '<div class="welcome-sub">Ask anything — roadmaps, skill gaps, job comparisons, project ideas, and more.</div>',
            unsafe_allow_html=True,
        )

    suggestions = [
        ("🗺️ Build a career roadmap",      "Create a 6-month roadmap to become a Data Scientist"),
        ("🔍 Analyse my skill gap",         "I know Python & SQL — what do I need for an ML Engineer role?"),
        ("⚖️ Compare two roles",            "Compare Software Engineer vs Product Manager career paths"),
        ("🛠️ Suggest portfolio projects",   "Recommend portfolio projects for a Full-Stack Developer"),
    ]
    c1, c2 = st.columns(2)
    for i, (title, prompt) in enumerate(suggestions):
        col = c1 if i % 2 == 0 else c2
        with col:
            if st.button(title, key=f"sug_{i}", use_container_width=True, type="secondary"):
                st.session_state.voice_pending = prompt
                st.rerun()

else:
    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])
            if "timestamp" in msg:
                st.markdown(f'<div class="msg-ts">{msg["timestamp"]}</div>', unsafe_allow_html=True)


# ── Chat input ──────────────────────────────────────────────────────────────
pending = st.session_state.pop("voice_pending", None) if "voice_pending" in st.session_state else None
user_input = st.chat_input("Message AI Career Advisor…")
if pending:
    user_input = pending

# ── Stop button overlay (rendered ABOVE the input) ──────────────────────────
if st.session_state.is_generating:
    col_l, col_c, col_r = st.columns([1, 1, 1])
    with col_c:
        if st.button("⏹ Stop generating", key="stop_btn", use_container_width=True):
            st.session_state.is_generating = False
            st.session_state.current_prompt = None
            st.rerun()

# ── Process message ───────────────────────────────────────────────────────────
if user_input or st.session_state.current_prompt:
    # If it's a fresh input, prepare it and rerun to show the stop button
    if user_input and not st.session_state.is_generating:
        st.session_state.current_prompt = user_input
        st.session_state.is_generating = True
        st.rerun()

    # Now we are in the run where is_generating is True and we have a current_prompt
    prompt_text = st.session_state.current_prompt
    st.session_state.current_prompt = None # Clear it for the next check
    
    if st.session_state.current_chat_id is None:
        create_new_chat()

    ts = datetime.now().strftime("%b %d, %H:%M")

    # Append & show user message
    st.session_state.messages.append({"role": "user", "content": prompt_text, "timestamp": ts})
    st.session_state.history_text += f"[{ts}] You: {prompt_text}\n\n"

    if len(st.session_state.messages) == 1:
        st.session_state.chat_history[st.session_state.current_chat_id]["title"] = generate_chat_title(prompt_text)

    # Note: The above changes won't be visible until the next run OR we re-render here
    # But since we are already past the message display loop, we need to show the new message manually
    # or just let it naturally show up after the next rerun.
    # To keep it smooth, let's just proceed to generation.

    with st.chat_message("assistant"):
        st.toast("🤔 AI Career Advisor is thinking...")
        placeholder = st.empty()
        placeholder.markdown(
            '<div class="typing-row">'
            '<div class="dot"></div>'
            '<div class="dot d2"></div>'
            '<div class="dot d3"></div>'
            '</div>',
            unsafe_allow_html=True,
        )
        try:
            full_prompt = get_career_prompt(st.session_state.career_mode, prompt_text)
            response = model.generate_content(full_prompt)
            
            if not response or not response.text:
                bot_reply = "I'm sorry, I couldn't generate a response. Please try again."
            else:
                bot_reply = response.text

            placeholder.empty()
            display = ""
            for char in bot_reply:
                display += char
                placeholder.markdown(display + "▌")
                time.sleep(0.005)
            placeholder.markdown(display)
            st.markdown(f'<div class="msg-ts">{ts}</div>', unsafe_allow_html=True)

            st.session_state.messages.append({"role": "assistant", "content": bot_reply, "timestamp": ts})
            st.session_state.history_text += f"[{ts}] AI: {bot_reply}\n\n"

        except Exception as e:
            placeholder.error(f"❌ {e}")

    st.session_state.is_generating = False
    cid = st.session_state.current_chat_id
    st.session_state.chat_history[cid]["messages"] = st.session_state.messages.copy()
    st.session_state.chat_history[cid]["timestamp"] = datetime.now().isoformat()
    st.rerun()

# ── Footer ─────────────────────────────────────────────────────────────────────
st.markdown(
    '<div style="text-align:center;color:#3a3a3a;font-size:0.7rem;padding:8px 0 4px 0;">'
    'Built by Rajan · Powered by Gemini 2.5 Flash'
    '</div>',
    unsafe_allow_html=True,
)
