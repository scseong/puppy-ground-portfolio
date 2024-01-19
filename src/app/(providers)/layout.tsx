'use client';
import ReactQueryProviders from '@/utils/ReactQueryProviders';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
import { supabase } from '@/shared/supabase/supabase';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Footer, Header } from '../_components/layout';

function ProvidersLayout({ children }: { children: React.ReactNode }) {
  const setUser = useAuth((state) => state.setUser);
  const isAuthInitialized = useAuth((state) => state.isAuthInitialized);
  const setIsAuthInitialized = useAuth((state) => state.setIsAuthInitialized);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      // console.log('123', event, session);

      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }

      if (!isAuthInitialized) {
        setIsAuthInitialized(true);
      }
    });
  }, []);

  if (!isAuthInitialized) {
    return null;
  }

  return (
    <ReactQueryProviders>
      <ReactQueryDevtools initialIsOpen={false} />
      <Header />
      {children}
      <ToastContainer />
      <Footer />
    </ReactQueryProviders>
  );
}

export default ProvidersLayout;
