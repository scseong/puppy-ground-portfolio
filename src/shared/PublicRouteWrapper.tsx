import React from 'react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import AuthProvider from './AuthProvider';

function PublicRouteWrapper({ children }: { children: React.ReactNode }) {
  const user = useAuth((state) => state.user);
  const router = useRouter();
  if (user) {
    router.push('/');
    return null;
  }
  return children;
}

// const AuthProvidedPublicRouteWrapper = ({ children }: { children: React.ReactNode }) => (
//   <AuthProvider>
//     <PublicRouteWrapper>{children}</PublicRouteWrapper>
//   </AuthProvider>
// );

export default PublicRouteWrapper;
