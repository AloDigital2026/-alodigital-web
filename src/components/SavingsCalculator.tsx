import React, { useState } from 'react';
import { Clock, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';

export const SavingsCalculator: React.FC = () => {
  const [closingHours, setClosingHours] = useState<number>(9); // hours/week spent summing notebooks and books
  const [uncollectedCredit, setUncollectedCredit] = useState<number>(400000); // COP per month

  // Calculated values matching exact spec
  const horasRecuperadas = Math.round(closingHours * 4 * 0.7);
  const dineroRecuperado = Math.round((uncollectedCredit * 0.7) / 1000) * 1000;
  let dias = Math.round((1000000 / Math.max(dineroRecuperado, 50000)) * 30);
  if (dias > 365) dias = 365;

  return (
    <section id="calculadora" className="py-20 max-w-6xl mx-auto px-6 sm:px-8 border-t border-white/5">
      <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Subtle accent backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#30D158]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Controls */}
          <div className="lg:col-span-6 space-y-6">
            {/* Reemplaza el título y subtítulo de la sección de la calculadora */}
            <div className="mb-8">
              <span className="text-[#00FF66] text-xs font-bold tracking-widest uppercase block mb-3">CALCULADORA DE IMPACTO</span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
                ¿Cuánto tiempo gasta usted organizando los pedidos del día?
              </h2>
              <p className="text-gray-400 text-sm md:text-base">
                Mueva los valores según el movimiento de su tienda para calcular el orden, el tiempo libre y el dinero que recupera al mes.
              </p>
            </div>

            {/* Slider 1: Horas semanales sumando libretas y cuentas */}
            <div className="bg-black/40 p-4 sm:p-5 rounded-2xl border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-white">Horas semanales sumando libretas y cuentas</span>
                <span className="text-[#0A84FF] font-bold font-mono text-base">{closingHours} hrs/sem</span>
              </div>
              <input
                id="sliderHoras"
                type="range"
                min="2"
                max="20"
                step="1"
                value={closingHours}
                onChange={(e) => setClosingHours(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#30D158]"
              />
              <div className="flex justify-between text-[11px] text-[#86868b] font-mono">
                <span>2 hrs (rápido)</span>
                <span>10 hrs</span>
                <span>20 hrs (muy pesado)</span>
              </div>
            </div>

            {/* Slider 2: Fiados o diferencias enredadas al mes */}
            <div className="bg-black/40 p-4 sm:p-5 rounded-2xl border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-white">Fiados o diferencias enredadas al mes</span>
                <span className="text-[#FF453A] font-bold font-mono text-base">${uncollectedCredit.toLocaleString('es-CO')} COP</span>
              </div>
              <input
                id="sliderFiados"
                type="range"
                min="50000"
                max="800000"
                step="10000"
                value={uncollectedCredit}
                onChange={(e) => setUncollectedCredit(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#FF453A]"
              />
              <div className="flex justify-between text-[11px] text-[#86868b] font-mono">
                <span>$50.000</span>
                <span>$400.000</span>
                <span>$800.000</span>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-6 bg-[#161618] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="pb-4 border-b border-white/5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#30D158] block mb-1">
                Resultado Estimado Mensual
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Lo que usted recupera con AlóDigital:
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/40 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-[#0A84FF]/20 text-[#0A84FF] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#86868b]">Tiempo libre para descansar o estar en familia</div>
                  <div className="text-2xl font-black text-white font-mono">
                    <span id="resHoras">{horasRecuperadas}</span> horas <span className="text-sm font-normal text-zinc-400">al mes</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/40 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-[#30D158]/20 text-[#30D158] flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#86868b]">Dinero en fiados claros y mejor cobrados</div>
                  <div className="text-2xl font-black text-[#30D158] font-mono">
                    +$<span id="resDinero">{dineroRecuperado.toLocaleString('es-CO')}</span> <span className="text-sm font-normal text-zinc-400">COP/mes</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#30D158]/10 border border-[#30D158]/20 text-xs text-zinc-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#30D158] flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#30D158]">Retorno de inversión:</strong> Con estos números, la instalación se paga sola en aproximadamente <strong className="text-white">{dias}</strong> días.
              </span>
            </div>

            <p className="text-[11px] text-[#86868b] leading-normal">
              Estos cálculos son una guía orientativa a partir de sus propios datos. Cada tienda es distinta — su ahorro real puede variar.
            </p>

            <a
              id="calc-cta-btn"
              href="#contacto"
              className="w-full py-3.5 rounded-full bg-[#30D158] text-black font-bold text-sm text-center flex items-center justify-center gap-2 hover:bg-[#34E05F] transition-all shadow-[0_10px_30px_rgba(48,209,88,0.2)]"
            >
              <span>Quiero implementar esto en mi tienda</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
