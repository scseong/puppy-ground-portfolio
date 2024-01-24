import React from 'react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

function PublicRouteWrapper({ children }: { children: React.ReactNode }) {
  const user = useAuth((state) => state.user);
  const router = useRouter();
  if (user) {
    router.push('/');
  }
  return children;
}

export default PublicRouteWrapper;
