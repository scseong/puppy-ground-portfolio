import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

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

export default PublicRouteWrapper;
