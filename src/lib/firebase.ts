/**
 * Firebase Configuration & Initialization
 * 
 * Purpose: Initializes Firebase App, Auth, and Firestore instances.
 * - Uses the config from the Firebase Console for project "ai-career-chatbot".
 * - Exports `app`, `auth`, and `db` for use throughout the application.
 */
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAwDYBWdtB8LEfDuqKXykA3D-YSv6aUimk",
  authDomain: "ai-career-chatbot.firebaseapp.com",
  projectId: "ai-career-chatbot",
  storageBucket: "ai-career-chatbot.firebasestorage.app",
  messagingSenderId: "340005341854",
  appId: "1:340005341854:web:1d37f0f7ab17475f4ee18f",
  measurementId: "G-KKXF0TH1KR",
}

// Initialize Firebase (prevent duplicate initialization in dev hot-reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
