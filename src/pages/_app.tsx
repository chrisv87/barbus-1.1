import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AuthProvider from '../contexts/AuthContext';
import '../styles/globals.css';
import Navigation from '../components/Navigation';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Handle auth state changes
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-black">
        <Navigation />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;