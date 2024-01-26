import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import AuthProvider from './AuthProvider';

function PublicRouteWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const user = useAuth((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push('/');
      return;
    }
    setIsLoading(false);
  });
  return !isLoading && children;
}

// const AuthProvidedPublicRouteWrapper = ({ children }: { children: React.ReactNode }) => (
//   <AuthProvider>
//     <PublicRouteWrapper>{children}</PublicRouteWrapper>
//   </AuthProvider>
// );

export default PublicRouteWrapper;
