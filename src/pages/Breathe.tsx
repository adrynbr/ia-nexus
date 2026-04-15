import React from 'react';
import BreathingCircle from '../components/calm/BreathingCircle';

export default function Breathe() {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <header className="p-6 bg-white border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Respirar</h2>
        <p className="text-slate-500 text-sm">Siga o ritmo do círculo para se acalmar.</p>
      </header>

      <div className="p-6 flex-1 flex flex-col items-center justify-center">
        <BreathingCircle />
        
        <div className="mt-8 max-w-xs text-center space-y-4">
          <p className="text-slate-600 text-sm leading-relaxed">
            A respiração profunda ajuda a reduzir o estresse e a ansiedade instantaneamente.
          </p>
          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <p className="text-indigo-800 text-xs font-medium">
              Dica: Tente relaxar os ombros e fechar os olhos enquanto respira.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
