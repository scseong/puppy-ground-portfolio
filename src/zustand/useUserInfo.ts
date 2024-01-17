import { create } from 'zustand';

export type User = {
  id: string;
  email: string;
  user_metadata: {
    avatar_url: string;
    display_name: string;
  };
};

export type UserInfoType = {
  initialState: User | null;
  seUser: (userInfo: User) => void;
  removeUser: () => void;
};

// let initialState: User = { id:'' };
// const useUserInfo = () => {
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const authToken = localStorage.getItem('sb-mbcnyqlazlnrnrncctns-auth-token');
//       if (authToken) {
//         const parseToken = JSON.parse(authToken);
//         initialState = parseToken.user.id;
//       }
//     }
//   }, []);

// const initialState: User = localStorage.getItem('sb-mbcnyqlazlnrnrncctns-auth-toke'')
//   ? JSON.parse(localStorage.getItem('sb-mbcnyqlazlnrnrncctns-auth-toke')!).user.id
//   : '';

const initialState = null;

console.log('1234', initialState);

const useUserInfo = create((set) => ({
  initialState,
  setUser: (userId: User | null) => set(() => ({ initialState: userId?.id })),
  removeUser: () => set(() => ({ initialState: null }))
}));

//   const store = create((set) => ({
//     initialState,
//     setUser: (userId: User) => set(() => ({ initialState: userId })),
//     removeUser: () => set(() => ({ initialState: '' }))
//   }));
//   return store.getState();
// };

export default useUserInfo;
