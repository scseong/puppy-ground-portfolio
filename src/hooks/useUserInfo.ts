import { set } from 'react-hook-form';
import { create } from 'zustand';

export type User = {
  id: string | undefined;
};

export type UserInfoType = {
  initialState: User;
  serUser: (userInfo: User) => void;
  removeUser: () => void;
};

const initialState: User = localStorage.getItem('sb-mbcnyqlazlnrnrncctns-auth-token')
  ? JSON.parse(localStorage.getItem('sb-mbcnyqlazlnrnrncctns-auth-token')!).user.id
  : '';

const useUserInfo = create((set) => ({
  initialState,
  setUser: (userId: User) => set(() => ({ initialState: userId })),
  removeUser: () => set(() => ({ initialState: '' }))
}));

export default useUserInfo;
