'use client';
import useAuth from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AuthProvider from './AuthProvider';

function PrivateRouteWrapper({ children }: { children: React.ReactNode }) {
  const { errorTopRight } = useToast();
  const user = useAuth((state) => state.user);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      errorTopRight({ message: '로그인이 필요한 페이지입니다' });
      router.replace('/auth/login');
      return;
    }
    setIsLoading(false);
  }, []);

  return !isLoading && children;
}

// const AuthProvidedPrivateRouteWrapper = ({ children }: { children: React.ReactNode }) => (
//   <AuthProvider>
//     <PrivateRouteWrapper>{children}</PrivateRouteWrapper>
//   </AuthProvider>
// );

export default PrivateRouteWrapper;
