import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/Base';
import { Play, Square } from 'lucide-react';

export default function BreathingCircle() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    if (!isActive) return;

    let timer: NodeJS.Timeout;
    
    const runCycle = () => {
      setPhase('inhale');
      setSeconds(4);
      timer = setTimeout(() => {
        setPhase('hold');
        setSeconds(4);
        timer = setTimeout(() => {
          setPhase('exhale');
          setSeconds(4);
          timer = setTimeout(runCycle, 4000);
        }, 4000);
      }, 4000);
    };

    runCycle();

    const countdown = setInterval(() => {
      setSeconds(prev => (prev > 1 ? prev - 1 : 4));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, [isActive]);

  const getInstruction = () => {
    if (!isActive) return 'Pronto?';
    switch (phase) {
      case 'inhale': return 'Inspire';
      case 'hold': return 'Segure';
      case 'exhale': return 'Expire';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Brilho Externo */}
        <motion.div
          animate={{
            scale: isActive && (phase === 'inhale' || phase === 'hold') ? 1.5 : 1,
            opacity: isActive ? (phase === 'inhale' ? 0.3 : 0.1) : 0.05,
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 bg-indigo-400 rounded-full blur-3xl"
        />
        
        {/* Círculo Principal */}
        <motion.div
          animate={{
            scale: isActive ? (phase === 'inhale' || phase === 'hold' ? 1.2 : 0.8) : 1,
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="w-48 h-48 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center shadow-2xl z-10"
        >
          <div className="text-white text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={isActive ? phase : 'idle'}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xl font-medium"
              >
                {getInstruction()}
              </motion.div>
            </AnimatePresence>
            {isActive && <div className="text-4xl font-bold mt-1">{seconds}</div>}
          </div>
        </motion.div>
      </div>
      
      <div className="mt-8 flex gap-2 mb-8">
        {['inhale', 'hold', 'exhale'].map((p) => (
          <div
            key={p}
            className={`h-2 w-12 rounded-full transition-colors duration-500 ${
              isActive && phase === p ? 'bg-indigo-600' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      <Button 
        variant={isActive ? 'danger' : 'primary'} 
        onClick={() => setIsActive(!isActive)}
        className="w-48"
      >
        {isActive ? (
          <>
            <Square size={18} fill="currentColor" /> Parar
          </>
        ) : (
          <>
            <Play size={18} fill="currentColor" /> Começar
          </>
        )}
      </Button>
    </div>
  );
}
