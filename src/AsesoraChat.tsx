import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { AsesoraVoz } from './AsesoraVoz';

interface MensajeChat {
  role: 'visitante' | 'asesora';
  text: string;
}

const MENSAJE_BIENVENIDA =
  'Hola, soy la Asesora de AlóDigital. ¿En qué le puedo ayudar? Puede preguntarme lo que quiera sobre cómo funciona, el precio, o cualquier duda que tenga.';

export const AsesoraChat: React.FC = () => {
  const [abierto, setAbierto] = useState(false);
  const [vozAbierta, setVozAbierta] = useState(false);
  const [mensajes, setMensajes] = useState<MensajeChat[]>([
    { role: 'asesora', text: MENSAJE_BIENVENIDA },
  ]);
  const [textoInput, setTextoInput] = useState('');
  const [enviando, setEnviando] = useState(false);
  const finalMensajesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (finalMensajesRef.current) {
      finalMensajesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mensajes, abierto]);

  const enviarMensaje = async () => {
    const texto = textoInput.trim();
    if (!texto || enviando) return;

    const historialActual = mensajes;
    const nuevosMensajes: MensajeChat[] = [...historialActual, { role: 'visitante', text: texto }];
    setMensajes(nuevosMensajes);
    setTextoInput('');
    setEnviando(true);

    try {
      const respuesta = await fetch('/.netlify/functions/asesora', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: texto,
          // No incluye el mensaje de bienvenida fijo en el historial que se envía,
          // ya que ese saludo no vino de una respuesta real de la Asesora.
          historial: historialActual.filter((m) => m.text !== MENSAJE_BIENVENIDA),
        }),
      });

      const datos = await respuesta.json();
      const textoRespuesta =
        datos && datos.respuesta
          ? datos.respuesta
          : 'Disculpe, tuve un problema para responder. ¿Le parece si me escribe directamente por WhatsApp al 316 753 9440?';

      setMensajes((prev) => [...prev, { role: 'asesora', text: textoRespuesta }]);
    } catch (error) {
      setMensajes((prev) => [
        ...prev,
        {
          role: 'asesora',
          text: 'Disculpe, tuve un problema para responder. ¿Le parece si me escribe directamente por WhatsApp al 316 753 9440?',
        },
      ]);
    } finally {
      setEnviando(false);
    }
  };

  const manejarTecla = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      enviarMensaje();
    }
  };

  return (
    <>
      {/* Botón de voz (flota un poco más arriba que el botón de chat) */}
      <button
        type="button"
        onClick={() => setVozAbierta(true)}
        className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-[#111111] border border-[#30D158]/40 text-[#30D158] shadow-lg hover:bg-[#1a1a1a] transition-all"
        aria-label="Hablar con la Asesora por voz"
      >
        🎙️
      </button>

      {/* Botón flotante de texto (igual que antes) */}
      <button
        type="button"
        onClick={() => setAbierto((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#30D158] text-black font-bold text-sm shadow-[0_10px_30px_rgba(48,209,88,0.35)] hover:bg-[#34E05F] transition-all"
        aria-label="Hablar con la Asesora de AlóDigital"
      >
        {abierto ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        <span>{abierto ? 'Cerrar' : 'Hable con la Asesora'}</span>
      </button>

      {/* Ventana de chat (igual que antes) */}
      {abierto && (
        <div className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-sm h-[70vh] max-h-[520px] bg-[#111111] border border-white/10 rounded-3xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden">
          {/* Encabezado */}
          <div className="px-5 py-4 border-b border-white/10 bg-black/40 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#30D158]/20 flex items-center justify-center text-lg">
              🎧
            </div>
            <div>
              <div className="text-sm font-bold text-white">Asesora de AlóDigital</div>
              <div className="text-[11px] text-[#86868b]">Responde en segundos</div>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {mensajes.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'visitante' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'visitante'
                      ? 'bg-[#30D158] text-black font-medium'
                      : 'bg-[#1a1a1a] text-zinc-200 border border-white/5'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {enviando && (
              <div className="flex justify-start">
                <div className="bg-[#1a1a1a] text-zinc-400 border border-white/5 rounded-2xl px-4 py-2.5 text-sm">
                  Escribiendo…
                </div>
              </div>
            )}

            <div ref={finalMensajesRef} />
          </div>

          {/* Entrada de texto */}
          <div className="px-3 py-3 border-t border-white/10 bg-black/30 flex items-center gap-2">
            <input
              type="text"
              value={textoInput}
              onChange={(e) => setTextoInput(e.target.value)}
              onKeyDown={manejarTecla}
              placeholder="Escríbale a la Asesora…"
              disabled={enviando}
              className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-[#86868b] outline-none focus:border-[#30D158]/50 transition-colors disabled:opacity-50"
            />
            <button
              type="button"
              onClick={enviarMensaje}
              disabled={enviando || !textoInput.trim()}
              className="p-2.5 rounded-full bg-[#30D158] text-black hover:bg-[#34E05F] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Ventana de voz (nueva, completamente separada de la lógica de arriba) */}
      {vozAbierta && <AsesoraVoz onCerrar={() => setVozAbierta(false)} />}
    </>
  );
};
