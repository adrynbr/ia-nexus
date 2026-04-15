export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export type AppTab = 'chat' | 'breathe' | 'ground';
