import React, { useState } from 'react';
import { Check, HelpCircle, ChevronDown, Sparkles, MapPin, Smartphone, Headset } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: '¿Qué pasa con mis pedidos de WhatsApp y telefónicos?',
    answer: 'Sus pedidos de WhatsApp usted los recibe como siempre, solo los copia a su Tablero de Control y ya. Sus pedidos telefónicos siguen anotados donde usted prefiera, solo toma una foto que conecta a su Tablero de Control y listo. ¿Ve lo sencillo y la necesidad de invitar a los vecinos a usar su Catálogo Inteligente en línea?',
  },
  {
    question: '¿Necesito comprar un computador costoso o funciona en mi celular?',
    answer: 'Para ver a detalle y calcular con comodidad, lo ideal es usar su computador personal o de negocio. Pero desde su celular puede hacer lo de siempre: enviar las capturas de sus pedidos de WhatsApp y fotos de pedidos telefónicos directamente al sistema con un par de toques.',
  },
  {
    question: '¿Quién se encarga de subir mis productos y precios?',
    answer: 'Para todo lo que es actualización de inventario y precios usted es el único que tiene acceso a esos cambios directamente desde su Tablero de Control.',
  },
  {
    question: '¿Cómo me ayuda el Perfil de Google Maps?',
    answer: 'Conecta su tienda directamente con las búsquedas locales de su barrio, facilitando que más vecinos encuentren su ubicación y su catálogo digital al instante.',
  },
  {
    question: '¿Y si no sé mucho de tecnología?',
    answer: 'El sistema está diseñado específicamente para tenderos, sin complicaciones ni enredos. Si sabe usar WhatsApp, sabe usar esto.',
  },
];

export const PricingSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="precios" className="py-20 md:py-28 max-w-6xl mx-auto px-6 sm:px-8 border-t border-white/5">
      {/* Highlight Box from original design */}
      <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/80 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-[#FF9F0A] text-xs font-bold uppercase tracking-widest">
            <div className="w-6 h-[1px] bg-[#FF9F0A]"></div>
            Inversión
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Un solo pago.<br />
            <span className="text-[#30D158]">Sin sorpresas.</span>
          </h2>

          <p className="text-[#86868b] text-base sm:text-lg leading-relaxed">
            Todo configurado, funcionando y enlazado con su perfil de Google Maps para que sus vecinos lo encuentren.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-start gap-2">
              <Smartphone className="w-5 h-5 text-[#30D158]" />
              <span className="text-xs font-bold text-white">En su Celular</span>
              <span className="text-[11px] text-[#86868b]">Sin comprar equipos extras</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-start gap-2">
              <MapPin className="w-5 h-5 text-[#0A84FF]" />
              <span className="text-xs font-bold text-white">Google Maps</span>
              <span className="text-[11px] text-[#86868b]">Visibilidad en su barrio</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-start gap-2">
              <Headset className="w-5 h-5 text-[#FF9F0A]" />
              <span className="text-xs font-bold text-white">Acompañamiento</span>
              <span className="text-[11px] text-[#86868b]">Soporte humano directo</span>
            </div>
          </div>
        </div>

        {/* Right column: Price cards */}
        <div className="lg:col-span-6 space-y-6">
          {/* Card 1: Instalación Única */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#161618] border border-white/10 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#30D158]">
                <Sparkles className="w-3.5 h-3.5" /> Instalación Única
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#30D158]/10 text-[#30D158] border border-[#30D158]/20">
                Puesta en marcha
              </span>
            </div>

            <div className="text-4xl sm:text-5xl font-black text-white font-mono mt-3 mb-2 tracking-tight">
              $1.000.000 <span className="text-sm font-medium text-[#86868b] block sm:inline font-sans">COP · una sola vez</span>
            </div>

            <ul className="space-y-3 text-sm text-[#86868b] pt-4 border-t border-white/5">
              <li className="flex items-start gap-3 text-zinc-300">
                <span className="w-5 h-5 rounded-full bg-[#30D158]/20 text-[#30D158] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                <span>Catálogo web y sistema de pedidos</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-300">
                <span className="w-5 h-5 rounded-full bg-[#30D158]/20 text-[#30D158] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                <span>Configuración de Perfil de Google</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-300">
                <span className="w-5 h-5 rounded-full bg-[#30D158]/20 text-[#30D158] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                <span className="leading-relaxed">Así de simple: solo aprende a enviar la foto de su cuaderno y a reenviar sus mensajes de WhatsApp — la hoja inteligente hace el resto.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Mantenimiento Mensual */}
          <div className="p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/10 shadow-lg">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#0A84FF] mb-2">
              Mantenimiento
            </div>

            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-2 tracking-tight">
              $250.000 <span className="text-sm font-medium text-[#86868b] block sm:inline font-sans">COP · al mes</span>
            </div>

            <ul className="space-y-3 text-sm text-[#86868b] pt-4 border-t border-white/5">
              <li className="flex items-start gap-3 text-zinc-300">
                <span className="w-5 h-5 rounded-full bg-[#0A84FF]/20 text-[#0A84FF] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                <span className="leading-relaxed">Soporte técnico si algo falla — usted no tiene que resolverlo solo.</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-300">
                <span className="w-5 h-5 rounded-full bg-[#0A84FF]/20 text-[#0A84FF] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                <span className="leading-relaxed">Monitoreo del sistema para detectar y corregir errores antes de que los note.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Preguntas Frecuentes FAQ */}
      <div className="mt-16 pt-12 border-t border-white/5 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00FF66] mb-2">
            <div className="w-6 h-[1px] bg-[#00FF66]"></div>
            Preguntas Frecuentes
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Todo lo que necesita saber</h3>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="faq-item bg-[#121212] border border-[#222] rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left text-white font-bold text-base sm:text-lg hover:text-[#00FF66] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 transform transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#00FF66]' : 'text-gray-400'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-[#222] pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
