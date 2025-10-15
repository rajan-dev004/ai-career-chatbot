import os
import streamlit as st
import time
import requests
import speech_recognition as sr
from streamlit_lottie import st_lottie
import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv()
# ✅ Gemini API Configuration
api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-2.5-pro")

# ✅ Streamlit Page Configuration
st.set_page_config(page_title="AI Career Chatbot 🎓", page_icon="🤖", layout="wide")

# ✅ Custom Google Font & CSS Styling
st.markdown("""
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
<style>
    html, body, [class*="css"] {
        font-family: 'Poppins', sans-serif;
        color: #ffffff;
        background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl3PLZep0WdI8evRx--x4lDfxHnSvLuF8gp6oSCSRe59p7Fs09g257wqRFXHpxP1mxn1E&usqp=CAU') no-repeat center center fixed;
        background-size: cover;
        background-blend-mode: lighten;
    }
    .main {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(8px);
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    }
    button {
        background: linear-gradient(145deg, #00f260, #0575e6);
        border: none;
        border-radius: 12px;
        padding: 0.6rem 1.2rem;
        color: white;
        font-weight: bold;
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
        transition: 0.3s ease;
    }
    button:hover {
        box-shadow: 0 0 25px rgba(0, 255, 255, 0.9);
        transform: scale(1.05);
    }
</style>

""", unsafe_allow_html=True)

# ✅ Load Lottie Animation
def load_lottieurl(url):
    r = requests.get(url)
    if r.status_code != 200:
        return None
    return r.json()

lottie_ai = load_lottieurl("https://assets10.lottiefiles.com/packages/lf20_tno6cg2w.json")

# ✅ Header Section
col1, col2 = st.columns(2)
with col1:
    st.title("🎓 AI Career Guidance Chatbot")
    st.markdown("Get AI-powered career advice tailored to your future goals! 💼")
with col2:
    st.image("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl3PLZep0WdI8evRx--x4lDfxHnSvLuF8gp6oSCSRe59p7Fs09g257wqRFXHpxP1mxn1E&usqp=CAU", width=220)

st_lottie(lottie_ai, height=300, key="ai")

# ✅ Session State Initialization
if "messages" not in st.session_state:
    st.session_state.messages = []

if "history_text" not in st.session_state:
    st.session_state.history_text = ""

# ✅ Typing Animation
def display_typing(text):
    placeholder = st.empty()
    typed_text = ""
    for char in text:
        typed_text += char
        placeholder.markdown(typed_text + "▌")
        time.sleep(0.01)
    placeholder.markdown(typed_text)

# ✅ Display Chat History
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# ✅ Quick Career Buttons
st.subheader("💡 Quick Career Questions")
col1, col2 = st.columns(2)
with col1:
    if st.button("📈 What career suits my skills?"):
        st.session_state.user_input = "What career suits my skills?"
with col2:
    if st.button("🎓 Best degree for AI?"):
        st.session_state.user_input = "What is the best degree for AI?"

# ✅ Voice to Text
def transcribe_voice():
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
    return ""

# ✅ Chat Input Box
with st.form(key="chat_form"):
    user_input = st.text_input("Type or ask your question 🎙️", value=st.session_state.get("user_input", ""))
    st.session_state["user_input"] = ""
    submit = st.form_submit_button("🚀 Ask Now")

if st.button("🎤 Speak Now"):
    user_input = transcribe_voice()

# ✅ Chatbot Gemini Response
if submit or user_input:
    if user_input.strip() != "":
        with st.chat_message("user"):
            st.markdown(user_input)
        st.session_state.messages.append({"role": "user", "content": user_input})
        st.session_state.history_text += f"👨‍💼 You: {user_input}\n"

        try:
            with st.spinner("AI is thinking... 🤔"):
                response = model.generate_content(
                    [f"You are a helpful career guidance assistant.", user_input]
                )
                bot_reply = response.text

            with st.chat_message("ai"):
                display_typing(bot_reply)

            st.session_state.messages.append({"role": "ai", "content": bot_reply})
            st.session_state.history_text += f"🤖 AI: {bot_reply}\n"

        except Exception as e:
            st.error(f"❌ Error: {e}")
    else:
        st.warning("Please enter or speak a question.")

# ✅ Download Chat Option
st.subheader("📥 Download Chat")
st.download_button("💾 Save Chat as .txt", data=st.session_state.history_text, file_name="career_chat_history.txt")

# ✅ Reset Chat Button
st.subheader("🧹 Reset")
if st.button("Clear All"):
    st.session_state.messages = []
    st.session_state.history_text = ""
    st.experimental_rerun()

# ✅ Footer
st.markdown("---")
st.caption(" Powered by Google Gemini | Built by Rajan with Prompt Engineering")
