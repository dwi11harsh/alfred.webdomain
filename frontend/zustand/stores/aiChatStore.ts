import { create } from "zustand";

export interface UserChats {
  id: Number;
  chat: String;
}

export interface AIResponse {
  id: Number;
  chat: String;
}

export interface AIChatStoreInterface {
  userChat: UserChats[];
  aiResponse: AIResponse[];
  addUserChat: (chat: String) => void;
  addAIResponse: (chat: String) => void;
}

const useIdStore = create((set) => ({
  currId: 1,
  setCurrId: () => set((state: any) => ({ currId: state.currId + 1 })),
}));
