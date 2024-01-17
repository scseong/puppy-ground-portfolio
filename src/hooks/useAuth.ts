import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

export type AuthStore = {
  isAuthInitialized: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  setIsAuthInitialized: (isAuthInitialized: boolean) => void;
};

const useAuth = create<AuthStore>((set) => ({
  isAuthInitialized: false,
  user: null,
  setUser: (user) => set(() => ({ user })),
  setIsAuthInitialized: (isAuthInitialized) => set(() => ({ isAuthInitialized }))
}));

export default useAuth;
