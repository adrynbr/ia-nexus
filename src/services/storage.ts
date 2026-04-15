import { Message } from "../types";

const STORAGE_KEYS = {
  CHAT_HISTORY: 'nexus_chat_history',
};

export const storage = {
  getChatHistory: (): Message[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    return data ? JSON.parse(data) : [];
  },
  saveChatHistory: (history: Message[]) => {
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(history));
  },
  clearChat: () => {
    localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
  }
};
