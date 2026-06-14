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

// Start timing Firebase module body evaluation
const tModuleStart = typeof window !== 'undefined' ? performance.now() : 0;
if (typeof window !== 'undefined') {
  console.log('[Telemetry] [Firebase] Module body evaluation started.');
  console.time('[Telemetry] [Firebase] Total Module Initialization');
}

const firebaseConfig = {
  apiKey: "AIzaSyAwDYBWdtB8lEfbUqKXyKA3D-YSv6aUimk",
  authDomain: "ai-career-chatbot.firebaseapp.com",
  projectId: "ai-career-chatbot",
  storageBucket: "ai-career-chatbot.firebasestorage.app",
  messagingSenderId: "360005341854",
  appId: "1:360005341854:web:1637f0f7ab19475f4ee18f",
  measurementId: "G-KKXF0TH1KR",
}

// Initialize Firebase (prevent duplicate initialization in dev hot-reload)
const tAppStart = typeof window !== 'undefined' ? performance.now() : 0;
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
if (typeof window !== 'undefined') {
  console.log(`[Telemetry] [Firebase] App initialized in ${(performance.now() - tAppStart).toFixed(2)}ms`);
}

const tAuthStart = typeof window !== 'undefined' ? performance.now() : 0;
const auth = getAuth(app)
if (typeof window !== 'undefined') {
  console.log(`[Telemetry] [Firebase] Auth initialized in ${(performance.now() - tAuthStart).toFixed(2)}ms`);
}

const tDbStart = typeof window !== 'undefined' ? performance.now() : 0;
const db = getFirestore(app)
if (typeof window !== 'undefined') {
  console.log(`[Telemetry] [Firebase] Firestore initialized in ${(performance.now() - tDbStart).toFixed(2)}ms`);
  console.timeEnd('[Telemetry] [Firebase] Total Module Initialization');
  console.log(`[Telemetry] [Firebase] Total module load + init took ${(performance.now() - tModuleStart).toFixed(2)}ms`);
}

export { app, auth, db }
