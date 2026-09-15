import React, { useState } from 'react';
import { Check, HelpCircle, ChevronDown, Sparkles, MapPin, Smartphone, Headset, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: '¿Qué pasa con mis pedidos de WhatsApp y telefónicos?',
    answer: 'Nada cambia en cómo los recibe: sus clientes le siguen escribiendo y llamando igual que siempre. Lo único distinto es que ahora, con un par de toques, esos pedidos quedan organizados solos en su Tablero — sin cuadernos sueltos, sin chats perdidos, sin tener que acordarse de nada al final del día.',
  },
  {
    question: '¿Necesito comprar un computador costoso o funciona en mi celular?',
    answer: 'Para ver a detalle y calcular con comodidad, lo ideal es usar su computador personal o de negocio. Pero desde su celular puede hacer lo de siempre: enviar las capturas de sus pedidos de WhatsApp y fotos de pedidos telefónicos directamente al sistema con un par de toques.',
  },
  {
    question: '¿Quién se encarga de subir mis productos y precios?',
    answer: 'Nosotros dejamos todo cargado y configurado desde el primer día: sus productos, sus precios, su catálogo. De ahí en adelante, usted tiene el control — cuando cambia un precio o llega mercancía nueva, lo actualiza desde su Tablero en menos de un minuto. Y si algún día prefiere que lo hagamos nosotros, puede modificar el plan que elija.',
  },
  {
    question: '¿Cómo me ayuda el Perfil de Google Maps?',
    answer: 'Cuando un vecino busca en Google "tienda cerca de mí" o el nombre de su negocio, su tienda aparece con foto, dirección, horario y el enlace a su catálogo. Es visibilidad gratis en el lugar donde la gente ya está buscando — sin pagar publicidad, sin hacer nada extra.',
  },
  {
    question: '¿Y si no sé mucho de tecnología?',
    answer: 'El sistema está diseñado específicamente para tenderos, sin complicaciones ni enredos. Si sabe usar WhatsApp, sabe usar esto. Y si alguna vez se traba, nosotros estamos del otro lado para resolverlo — usted no tiene que entenderse con la tecnología, para eso está la mensualidad.',
  },
];

interface Plan {
  nombre: string;
  destacado: boolean;
  instalacion: string;
  mensual: string;
  incluye: string[];
}

const PLANES: Plan[] = [
  {
    nombre: 'Básico',
    destacado: false,
    instalacion: '$1.000.000',
    mensual: '$250.000',
    incluye: [
      'Catálogo web y sistema de pedidos',
      'Tablero con caja, fiados e inventario',
      'Configuración de Perfil de Google',
      'Soporte técnico y monitoreo del sistema',
    ],
  },
  {
    nombre: 'Plus',
    destacado: true,
    instalacion: '$1.500.000',
    mensual: '$300.000',
    incluye: [
      'Todo lo del plan Básico',
      'La Asesora responde con voz en su página',
      'Soporte técnico y monitoreo del sistema',
    ],
  },
  {
    nombre: 'Premium',
    destacado: false,
    instalacion: '$1.800.000',
    mensual: '$400.000',
    incluye: [
      'Todo lo del plan Plus',
      'Integración con Whaticket',
      'Soporte técnico y monitoreo del sistema',
    ],
  },
];

export const PricingSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="precios" className="py-20 md:py-28 max-w-6xl mx-auto px-6 sm:px-8 border-t border-white/5">
      {/* Encabezado + info de respaldo */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-[#FF9F0A] text-xs font-bold uppercase tracking-widest mb-3">
          <div className="w-6 h-[1px] bg-[#FF9F0A]"></div>
          Inversión
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          Elija el plan que <span className="text-[#30D158]">le sirve hoy.</span>
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg mt-3 max-w-xl mx-auto">
          Todo configurado, funcionando, y enlazado con su perfil de Google Maps para que sus vecinos lo encuentren.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-2xl mx-auto">
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

      {/* Tres planes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {PLANES.map((plan) => (
          <div
            key={plan.nombre}
            className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden shadow-xl flex flex-col ${
              plan.destacado
                ? 'bg-[#161618] border-[#30D158]/50 shadow-[0_0_40px_rgba(48,209,88,0.12)] md:-translate-y-2'
                : 'bg-[#111111] border-white/10'
            }`}
          >
            {plan.destacado && (
              <span className="absolute top-0 right-0 text-[11px] font-bold px-3 py-1.5 rounded-bl-2xl bg-[#30D158] text-black">
                Más elegido
              </span>
            )}

            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#30D158] mb-1">
              {plan.nombre === 'Básico' && <Sparkles className="w-3.5 h-3.5" />}
              {plan.nombre === 'Plus' && <Mic className="w-3.5 h-3.5" />}
              {plan.nombre === 'Premium' && <Headset className="w-3.5 h-3.5" />}
              {plan.nombre}
            </div>

            <div className="mt-2">
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                {plan.instalacion}
              </div>
              <span className="text-xs font-medium text-[#86868b]">COP · instalación única</span>
            </div>

            <div className="mt-3 pt-3 border-t border-white/5">
              <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
                {plan.mensual}
              </div>
              <span className="text-xs font-medium text-[#86868b]">COP · mantenimiento al mes</span>
            </div>

            <ul className="space-y-3 text-sm pt-6 mt-6 border-t border-white/5 flex-1">
              {plan.incluye.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-[#30D158]/20 text-[#30D158] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contacto"
              className={`mt-6 block text-center px-5 py-3 rounded-full font-bold text-sm transition-all ${
                plan.destacado
                  ? 'bg-[#30D158] text-black hover:bg-[#34E05F]'
                  : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
              }`}
            >
              Quiero este plan
            </a>
          </div>
        ))}
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
