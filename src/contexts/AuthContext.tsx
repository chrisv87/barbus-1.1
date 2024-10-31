import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  User,
  AuthError,
  fetchSignInMethodsForEmail
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import toast from 'react-hot-toast';

interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleAuthError = (error: AuthError) => {
    console.error('Auth error:', error);
    
    switch (error.code) {
      case 'auth/network-request-failed':
        toast.error('Network error. Please check your internet connection and try again.');
        break;
      case 'auth/too-many-requests':
        toast.error('Too many attempts. Please try again later.');
        break;
      case 'auth/user-disabled':
        toast.error('This account has been disabled.');
        break;
      default:
        toast.error('An error occurred. Please try again.');
    }
  };

  async function signup(email: string, password: string) {
    try {
      // Check if email exists first
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        toast.error('This email is already registered. Please sign in instead.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore with retry mechanism
      const retries = 3;
      for (let i = 0; i < retries; i++) {
        try {
          await setDoc(doc(db, 'users', user.uid), {
            email,
            createdAt: serverTimestamp(),
            notifications: true,
            role: 'user',
            emailVerified: false
          });
          break;
        } catch (error) {
          if (i === retries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }

      // Send verification email
      await sendEmailVerification(user, {
        url: 'https://barbus-gr.com/login',
        handleCodeInApp: true
      });

      toast.success('Account created! Please check your email for verification.');
    } catch (error) {
      const authError = error as AuthError;
      handleAuthError(authError);
      throw error;
    }
  }

  async function login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      if (!result.user.emailVerified) {
        toast.error('Please verify your email before signing in.');
        await sendEmailVerification(result.user, {
          url: 'https://barbus-gr.com/login',
          handleCodeInApp: true
        });
        await logout();
        return;
      }

      toast.success('Signed in successfully!');
    } catch (error) {
      const authError = error as AuthError;
      handleAuthError(authError);
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
    } catch (error) {
      const authError = error as AuthError;
      handleAuthError(authError);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}