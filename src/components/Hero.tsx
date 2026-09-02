import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SimulatedOrder {
  id: number;
  channel: 'WhatsApp' | 'Teléfono' | 'Mostrador';
  channelIcon: string;
  client: string;
  items: string;
  amount: number;
}

const SAMPLE_ORDERS: SimulatedOrder[] = [
  { id: 402, channel: 'WhatsApp', channelIcon: '💬', client: 'Don Alberto • WhatsApp', items: '1 Leche Alquería + Pan Tajado', amount: 24500 },
  { id: 401, channel: 'Teléfono', channelIcon: '📞', client: 'Doña Maria • Llamada', items: 'Cubeta de Huevos AA x30', amount: 12800 },
  { id: 403, channel: 'Mostrador', channelIcon: '🏪', client: 'Carlos (Vecino) • Mostrador', items: '2 Gaseosas + Papas Margarita', amount: 18500 },
  { id: 404, channel: 'WhatsApp', channelIcon: '💬', client: 'Sra. Patricia • WhatsApp', items: 'Arroz Diana 1kg + Aceite 500ml', amount: 16800 },
];

export const Hero: React.FC = () => {
  const [cajaTotal, setCajaTotal] = useState<number>(142500);
  const [fiadosPendientes, setFiadosPendientes] = useState<number>(61100);
  const [stockBajo, setStockBajo] = useState<number>(3);
  const [recentOrdersList, setRecentOrdersList] = useState<SimulatedOrder[]>([
    SAMPLE_ORDERS[0],
    SAMPLE_ORDERS[1],
  ]);
  const [recentEvent, setRecentEvent] = useState<string | null>(null);
  const [activeChannelPulse, setActiveChannelPulse] = useState<string | null>(null);
  const [simIndex, setSimIndex] = useState<number>(2);

  const handleSimulateOrder = (channelType?: 'WhatsApp' | 'Teléfono' | 'Mostrador') => {
    const nextOrder = SAMPLE_ORDERS[simIndex % SAMPLE_ORDERS.length];
    setSimIndex((prev) => prev + 1);

    const channel = channelType || nextOrder.channel;
    setActiveChannelPulse(channel);

    const newOrderInstance: SimulatedOrder = {
      ...nextOrder,
      id: 400 + Math.floor(Math.random() * 90) + 10,
      channel,
      channelIcon: channel === 'WhatsApp' ? '💬' : channel === 'Teléfono' ? '📞' : '🏪',
      client: `${nextOrder.client.split(' • ')[0]} • ${channel}`,
    };

    setCajaTotal((prev) => prev + nextOrder.amount);
    setRecentOrdersList((prev) => [newOrderInstance, prev[0] || SAMPLE_ORDERS[0]]);
    setRecentEvent(`¡Nuevo pedido de ${channel}! +$${nextOrder.amount.toLocaleString('es-CO')}`);

    setTimeout(() => {
      setActiveChannelPulse(null);
    }, 1200);
  };

  return (
    <section className="pt-14 pb-20 md:pt-20 md:pb-28 max-w-6xl mx-auto px-6 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Column: Value Prop */}
        <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-[#FF9F0A] text-xs font-bold uppercase tracking-widest justify-center lg:justify-start">
            <div className="w-6 h-[1px] bg-[#FF9F0A]"></div>
            Sincronización Total
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-[#f5f5f7]">
            Su tienda, sin <span className="text-[#30D158]">caos</span> de pedidos.
          </h1>

          <p className="text-base sm:text-lg text-[#86868b] leading-relaxed max-w-lg mx-auto lg:mx-0">
            Centralice WhatsApp, llamadas y mostrador en un solo tablero digital. Compatible con su sistema POS, controle inventario y fiados en tiempo real.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-2">
            <a
              id="hero-catalogo-btn"
              href="https://alodigital2026.github.io/catalogo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#30D158] text-black px-8 py-4 rounded-full font-bold text-sm shadow-[0_10px_30px_rgba(48,209,88,0.2)] hover:shadow-[0_10px_40px_rgba(48,209,88,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Ver catálogo en vivo</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              id="hero-como-funciona-btn"
              href="#solucion"
              className="w-full sm:w-auto border border-white/10 px-8 py-4 rounded-full font-bold text-sm text-[#f5f5f7] hover:bg-white/5 transition-all text-center"
            >
              Cómo funciona
            </a>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-[#86868b]">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#30D158]" /> Sin cambiar su número
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#30D158]" /> Instalación completa en su tienda
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#30D158]" /> Cero complicaciones
            </span>
          </div>
        </div>

        {/* Right Column: Sophisticated Dark Live Dashboard */}
        <div className="lg:col-span-6">
          <div className="relative">
            {/* Ambient glow */}
            <div className="absolute -inset-4 bg-[#30D158]/10 blur-[80px] rounded-full pointer-events-none"></div>

            {/* Main Card */}
            <div className="relative bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
              {/* Window Header */}
              <div className="flex justify-between items-center pb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">
                    Tablero en tiempo real
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] animate-ping inline-block"></span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500"></div>
                </div>
              </div>

              {/* 3 Metric cards */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-xs text-[#86868b] mb-1">Caja hoy</div>
                  <div className="text-lg sm:text-xl font-bold text-white font-mono">
                    ${(cajaTotal / 1000).toFixed(0)}k
                  </div>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-xs text-[#86868b] mb-1">Fiados</div>
                  <div className="text-lg sm:text-xl font-bold text-[#FF9F0A] font-mono">
                    ${(fiadosPendientes / 1000).toFixed(0)}k
                  </div>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-xs text-[#86868b] mb-1">Stock bajo</div>
                  <div className="text-lg sm:text-xl font-bold text-red-400 font-mono">
                    -{stockBajo}
                  </div>
                </div>
              </div>

              {/* Channel Trigger Pills */}
              <div>
                <div className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest mb-2 flex justify-between items-center">
                  <span>Canales de Entrada</span>
                  <span className="text-[#30D158] font-normal lowercase">toque para simular</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleSimulateOrder('WhatsApp')}
                    className={`p-2.5 rounded-lg border transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeChannelPulse === 'WhatsApp'
                        ? 'bg-[#30D158]/20 border-[#30D158] text-[#30D158] scale-105 shadow-[0_0_10px_#30D158]'
                        : 'bg-white/5 border-white/5 text-[#f5f5f7] hover:border-white/20'
                    }`}
                  >
                    <span>💬</span> WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSimulateOrder('Teléfono')}
                    className={`p-2.5 rounded-lg border transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeChannelPulse === 'Teléfono'
                        ? 'bg-[#0A84FF]/20 border-[#0A84FF] text-[#0A84FF] scale-105 shadow-[0_0_10px_#0A84FF]'
                        : 'bg-white/5 border-white/5 text-[#f5f5f7] hover:border-white/20'
                    }`}
                  >
                    <span>📞</span> Llamada
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSimulateOrder('Mostrador')}
                    className={`p-2.5 rounded-lg border transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeChannelPulse === 'Mostrador'
                        ? 'bg-[#FF453A]/20 border-[#FF453A] text-[#FF453A] scale-105 shadow-[0_0_10px_#FF453A]'
                        : 'bg-white/5 border-white/5 text-[#f5f5f7] hover:border-white/20'
                    }`}
                  >
                    <span>🏪</span> Mostrador
                  </button>
                </div>
              </div>

              {/* Recent Orders section */}
              <div className="space-y-2.5 pt-1">
                <div className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">
                  Últimos Pedidos
                </div>

                {recentOrdersList.slice(0, 2).map((ord) => (
                  <div
                    key={ord.id}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#30D158]/20 flex items-center justify-center text-sm flex-shrink-0">
                        {ord.channelIcon}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-white">Pedido #{ord.id}</div>
                        <div className="text-[10px] text-[#86868b]">{ord.client}</div>
                      </div>
                    </div>
                    <div className="text-sm font-bold font-mono text-white">
                      ${ord.amount.toLocaleString('es-CO')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Notification Banner when orders simulate */}
              <AnimatePresence>
                {recentEvent && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-2.5 rounded-lg bg-[#30D158]/10 border border-[#30D158]/30 text-[#30D158] text-xs font-medium flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{recentEvent}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

