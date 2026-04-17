import React from 'react';
import { Card } from '../components/ui/Base';
import { motion } from 'motion/react';

export default function Ground() {
  const groundingSteps = [
    { num: 5, label: "Coisas que você pode ver", desc: "Olhe ao seu redor e identifique 5 objetos diferentes." },
    { num: 4, label: "Coisas que você pode tocar", desc: "Sinta a textura de 4 coisas próximas a você." },
    { num: 3, label: "Coisas que você pode ouvir", desc: "Preste atenção em 3 sons diferentes no ambiente." },
    { num: 2, label: "Coisas que você pode cheirar", desc: "Tente identificar 2 cheiros no ar agora." },
    { num: 1, label: "Coisa que você pode saborear", desc: "Sinta o gosto na sua boca ou imagine um sabor favorito." }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <header className="p-6 bg-white border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Acalmar</h2>
        <p className="text-slate-500 text-sm">Técnica de aterramento 5-4-3-2-1.</p>
      </header>

      <div className="p-6 space-y-4 flex-1 overflow-y-auto [-webkit-overflow-scrolling:touch] touch-pan-y [overscroll-behavior-y:none]">
        <p className="text-slate-600 text-sm mb-6 text-center italic">
          Esta técnica ajuda a trazer sua mente de volta ao presente quando você se sente ansioso(a) ou sobrecarregado(a).
        </p>

        {groundingSteps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="flex items-center gap-4 p-4 border-l-4 border-l-indigo-500">
              <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold shrink-0">
                {step.num}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{step.label}</h4>
                <p className="text-slate-500 text-xs mt-0.5">{step.desc}</p>
              </div>
            </Card>
          </motion.div>
        ))}

        <div className="pt-4">
          <Card className="bg-emerald-50 border-emerald-100 p-4">
            <p className="text-emerald-800 text-xs text-center font-medium">
              Sinta seus pés no chão e perceba como você está seguro(a) agora.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
