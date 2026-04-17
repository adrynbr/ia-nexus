import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Wind, Anchor } from 'lucide-react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const tabs: { id: AppTab; icon: any; label: string }[] = [
    { id: 'chat', icon: MessageCircle, label: 'Conversar' },
    { id: 'breathe', icon: Wind, label: 'Respirar' },
    { id: 'ground', icon: Anchor, label: 'Acalmar' },
  ];

  return (
    <div className="flex flex-col h-[100dvh] max-w-md mx-auto bg-slate-50 shadow-2xl overflow-hidden relative font-sans">
      {/* Área de Conteúdo Principal */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navegação Inferior */}
      <nav className="h-20 bg-white border-t border-slate-200 flex items-center justify-around px-2 w-full z-40 shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-24 h-full transition-colors ${
                isActive ? 'text-indigo-600' : 'text-slate-400'
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${isActive ? 'bg-indigo-50' : ''}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] mt-1 font-bold uppercase tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
