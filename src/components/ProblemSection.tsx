import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react';

interface ProblemItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  antes: string;
  despues: string;
}

const PROBLEMS: ProblemItem[] = [
  {
    id: 'pedidos',
    icon: '📄',
    title: 'Pedidos enredados',
    description: 'Recibir pedidos por WhatsApp, llamadas y mostrador sin unificar consume más tiempo tratando de controlar tanta información y revisar qué se gastó.',
    antes: 'Revisar chats uno por uno mientras atiende el mostrador, y olvidar responder a alguien.',
    despues: 'Los pedidos de WhatsApp entran organizados solos. Los que le llegan por teléfono o en el mostrador, los anota en su cuaderno de siempre — solo le toma una foto y quedan organizados igual.',
  },
  {
    id: 'fiados',
    icon: '💵',
    title: 'Fiados que se olvidan',
    description: 'Cuentas mentales o en cuadernos sueltos que terminan en dinero perdido a fin de mes.',
    antes: 'Cuentas anotadas que al final son más trabajo para organizar, fiados en tiempo real.',
    despues: 'Cada fiado queda registrado en su tablero. Usted solo marca cuando se lo pagan.',
  },
  {
    id: 'inventario',
    icon: '📦',
    title: 'Inventario a ciegas',
    description: 'No saber qué se le está acabando hasta que el cliente lo pide y ya no hay.',
    antes: 'Sin saber qué se está acabando y qué hay me toma más tiempo tener control de inventario.',
    despues: 'Alerta automática cuando un producto está por acabarse, para reabastecer a tiempo.',
  },
  {
    id: 'tiempo',
    icon: '⏳',
    title: 'Tiempo perdido',
    description: 'Pasar horas al final del día organizando datos y cuadrando la caja.',
    antes: 'Pasar horas al final del día organizando datos y cuadrando la caja.',
    despues: 'Su caja del día ya calculada, lista para revisar en un solo vistazo. Sistema compatible con otros sistemas o con POS.',
  },
];

export const ProblemSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const toggleTab = (id: string) => {
    setActiveTab((prev) => (prev === id ? null : id));
  };

  return (
    <section id="problema" className="py-20 md:py-28 max-w-6xl mx-auto px-6 sm:px-8 border-t border-white/5">
      <div className="text-center md:text-left mb-12">
        <div className="inline-flex items-center gap-2 text-[#FF9F0A] text-xs font-bold uppercase tracking-widest mb-3">
          <div className="w-6 h-[1px] bg-[#FF9F0A]"></div>
          El día a día
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          ¿Le suena conocido?
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg mt-3 max-w-xl">
          Los 4 problemas que más dinero y horas de sueño le quitan a los tenderos en Colombia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROBLEMS.map((problem) => {
          const isOpen = activeTab === problem.id;
          return (
            <div
              key={problem.id}
              onClick={() => toggleTab(problem.id)}
              className="problem-card bg-[#121212] border border-[#222] hover:border-[#00FF66] transition-all rounded-2xl p-6 flex flex-col justify-between cursor-pointer group shadow-xl"
            >
              <div>
                <div className="w-12 h-12 bg-[#1a1a1a] rounded-xl flex items-center justify-center mb-4 text-xl group-hover:scale-110 transition-transform">
                  {problem.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {problem.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {problem.description}
                </p>
              </div>

              {/* Expandable comparison */}
              <div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTab(problem.id);
                  }}
                  className="w-full flex items-center justify-between text-sm text-[#00FF66] font-medium pt-4 border-t border-[#222] cursor-pointer"
                >
                  <span>{isOpen ? 'Ocultar solución' : 'Ver el cambio con Aló'}</span>
                  <ChevronDown
                    className={`w-4 h-4 transform transition-transform ${
                      isOpen ? 'rotate-180 text-[#00FF66]' : 'text-gray-400'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mt-4 space-y-3 pt-3 border-t border-[#222]"
                    >
                      <div className="bg-[#1a1a1a] p-3 rounded-xl border border-red-900/30 text-xs text-gray-300">
                        <span className="text-red-400 font-bold block mb-1">Antes:</span>
                        {problem.antes}
                      </div>
                      <div className="bg-[#1a1a1a] p-3 rounded-xl border border-green-900/30 text-xs text-gray-300">
                        <span className="text-[#00FF66] font-bold block mb-1">Con AlóDigital:</span>
                        {problem.despues}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

