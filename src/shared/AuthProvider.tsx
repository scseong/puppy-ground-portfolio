'use client';
import React, { useEffect } from 'react';
import { supabase } from './supabase/supabase';
import useAuth from '@/hooks/useAuth';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuth((state) => state.setUser);
  const isAuthInitialized = useAuth((state) => state.isAuthInitialized);
  const setIsAuthInitialized = useAuth((state) => state.setIsAuthInitialized);

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setIsAuthInitialized(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!isAuthInitialized) {
    return null;
  }

  return children;
}

export default AuthProvider;
