import { create } from 'zustand';

export type User = {
  id: string | undefined;
};

export type UserInfoType = {
  initialState: User;
  // serUser: (userInfo: User) => void;
  removeUser: () => void;
};

const initialState: User = {
  id: localStorage.getItem('sb-mbcnyqlazlnrnrncctns-auth-token')
    ? JSON.parse(localStorage.getItem('sb-mbcnyqlazlnrnrncctns-auth-token')!).user.id
    : ''
};

const useUserInfo = create<UserInfoType>()((set) => ({
  initialState,
  setUser: (userInfo: string) => set(() => ({ initialState: { id: userInfo } })),
  removeUser: () => set(() => ({ initialState: undefined }))
}));

export default useUserInfo;
