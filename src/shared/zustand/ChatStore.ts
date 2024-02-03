// ChatStore.ts
import { SetState, create } from 'zustand';

type ChatStore = {
  isChatModalOpen: boolean;
  isChatRoomModalOpen: boolean;
  setChatModalOpen: (isOpen: boolean) => void;
  setChatRoomModalOpen: (isOpen: boolean) => void;
};

export const useChatStore = create<ChatStore>((set: SetState<ChatStore>) => ({
  isChatModalOpen: false,
  isChatRoomModalOpen: false,
  setChatModalOpen: (isOpen) => set({ isChatModalOpen: isOpen }),
  setChatRoomModalOpen: (isOpen) => set({ isChatRoomModalOpen: isOpen })
}));
