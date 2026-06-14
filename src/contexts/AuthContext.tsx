/**
 * AuthContext — Firebase Authentication Provider
 * 
 * Purpose: Provides auth state (user, loading) and auth actions (signInWithGoogle, logout)
 * to the entire component tree via React Context.
 * - Listens to onAuthStateChanged to track sign-in/sign-out.
 * - Renders a loading spinner while Firebase determines auth state.
 */
'use client'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  type User,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Profile auth resolution time
  useEffect(() => {
    console.log('[Telemetry] [Auth] AuthProvider mounted.');
    const tMount = performance.now();
    console.time('[Telemetry] [Auth] Time to First Auth State');

    let isFirstCallback = true;
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const duration = performance.now() - tMount;
      if (isFirstCallback) {
        console.log(`[Telemetry] [Auth] First auth state resolved. Logged-in user: ${firebaseUser ? firebaseUser.email : 'None'}`);
        console.log(`[Telemetry] [Auth] Time to first auth state took ${duration.toFixed(2)}ms`);
        console.timeEnd('[Telemetry] [Auth] Time to First Auth State');
        isFirstCallback = false;
      } else {
        console.log(`[Telemetry] [Auth] Auth state changed. User: ${firebaseUser ? firebaseUser.email : 'None'}`);
      }
      
      setUser(firebaseUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    console.log('[Telemetry] [Auth] Google Sign-In initiated.');
    const tStart = performance.now();
    console.time('[Telemetry] [Auth] Google Sign-In Flow');
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      console.log(`[Telemetry] [Auth] Google Sign-In succeeded in ${(performance.now() - tStart).toFixed(2)}ms`);
    } catch (error) {
      console.error(`[Telemetry] [Auth] Google Sign-In failed after ${(performance.now() - tStart).toFixed(2)}ms`, error);
      throw error;
    } finally {
      console.timeEnd('[Telemetry] [Auth] Google Sign-In Flow');
    }
  }

  const logout = async () => {
    console.log('[Telemetry] [Auth] Sign-out initiated.');
    const tStart = performance.now();
    await signOut(auth)
    console.log(`[Telemetry] [Auth] Sign-out completed in ${(performance.now() - tStart).toFixed(2)}ms`);
  }

  // Loading screen while Firebase determines auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bgBase">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#780206] to-[#061161] flex items-center justify-center shadow-lg shadow-[#780206]/30 animate-pulse">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#780206] animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-[#780206]/70 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-[#061161] animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
