import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../store/AppContext';
import { sendMessageStream } from '../services/ai';
import { motion } from 'motion/react';
import { Send, Trash2, Sparkles, User, Loader2 } from 'lucide-react';
import { Message } from '../types';

export default function Chat() {
  const { chatHistory, setChatHistory, clearChat } = useApp();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 150;
      
      // Auto-scroll only if we are near bottom or it's a very short history
      if (isAtBottom || chatHistory.length <= 2) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  }, [chatHistory, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    const newHistory = [...chatHistory, userMessage];
    setChatHistory(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      let assistantContent = '';
      const assistantId = crypto.randomUUID();
      
      const stream = sendMessageStream(chatHistory, input);
      
      for await (const chunk of stream) {
        assistantContent += chunk;
        setChatHistory([
          ...newHistory,
          {
            id: assistantId,
            role: 'assistant',
            content: assistantContent,
            timestamp: Date.now(),
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Cabeçalho do Chat */}
      <header className="p-4 bg-white border-b border-slate-200 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Nexus</h2>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Online</span>
            </div>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </header>

      {/* Área de Mensagens */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-4 space-y-6 [overscroll-behavior:contain] [-webkit-overflow-scrolling:touch] touch-pan-y"
      >
        {chatHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-8">
            <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600">
              <Sparkles size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Olá, eu sou o Nexus</h3>
            <p className="text-slate-500 text-sm">
              Estou aqui para ouvir e apoiar você. Como você está se sentindo agora?
            </p>
            <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
              {["Estou me sentindo ansioso(a)", "Como me proteger de abusos online?", "Só preciso conversar"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="p-3 text-xs font-medium text-indigo-600 bg-white border border-indigo-100 rounded-2xl hover:bg-indigo-50 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {chatHistory.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 ${
                msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-indigo-600 text-white'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
              </div>
              <div className={`p-4 rounded-3xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-2 max-w-[85%]">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Sparkles size={16} />
              </div>
              <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-indigo-600" />
                <span className="text-xs text-slate-400 font-medium">Nexus está pensando...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Área de Entrada */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative flex items-center gap-2 bg-slate-100 p-1 rounded-3xl border border-slate-200 focus-within:border-indigo-300 focus-within:bg-white transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-transparent py-3 px-4 text-sm focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              input.trim() && !isLoading 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'bg-slate-300 text-slate-500'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[9px] text-center text-slate-400 mt-2 uppercase tracking-widest font-bold">
          O Nexus é uma IA de apoio, não substitui ajuda profissional.
        </p>
      </div>
    </div>
  );
}
