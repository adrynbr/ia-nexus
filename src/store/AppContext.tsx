import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message } from '../types';
import { storage } from '../services/storage';

interface AppContextType {
  chatHistory: Message[];
  setChatHistory: (history: Message[]) => void;
  clearChat: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [chatHistory, setChatHistoryState] = useState<Message[]>(storage.getChatHistory());

  const setChatHistory = (history: Message[]) => {
    storage.saveChatHistory(history);
    setChatHistoryState(history);
  };

  const clearChat = () => {
    storage.clearChat();
    setChatHistoryState([]);
  };

  return (
    <AppContext.Provider value={{
      chatHistory,
      setChatHistory,
      clearChat
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
