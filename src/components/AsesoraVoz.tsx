// src/components/AsesoraVoz.tsx
//
// Ventana emergente separada para hablar con la Asesora por voz.
// Es completamente independiente de AsesoraChat.tsx (el chat de texto):
// si algo aquí falla, el chat de texto sigue funcionando exactamente
// igual que hoy.
//
// Flujo:
// 1. Pide un permiso temporal a Netlify (asesora-voz-token.js).
// 2. Con ese permiso, el navegador se conecta DIRECTO a Gemini (no pasa
//    por Netlify en cada palabra — solo para pedir el permiso inicial).
// 3. Captura el micrófono y manda el audio a Gemini en vivo.
// 4. Reproduce el audio que la Asesora va respondiendo.
//
// Es "voz por turnos": la Asesora termina su respuesta completa antes de
// volver a escuchar, tal como se probó y aprobó en Google AI Studio.

import React, { useCallback, useRef, useState } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Mic, X } from 'lucide-react';

type EstadoVoz = 'inactivo' | 'conectando' | 'escuchando' | 'hablando' | 'error';

const MODELO_VOZ = 'gemini-3.1-flash-live-preview';

interface Props {
  onCerrar: () => void;
}

export const AsesoraVoz: React.FC<Props> = ({ onCerrar }) => {
  const [estado, setEstado] = useState<EstadoVoz>('inactivo');
  const [mensajeError, setMensajeError] = useState('');

  // Referencias a todo lo que hay que apagar limpiamente al terminar
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const procesadorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const playbackContextRef = useRef<AudioContext | null>(null);
  const colaReproduccionRef = useRef<number>(0);

  // El micrófono del navegador entrega el audio en un formato (Float32);
  // Gemini necesita otro formato (PCM16 en base64). Esta función traduce
  // de uno a otro.
  const float32APcm16Base64 = (buffer: Float32Array): string => {
    const pcm16 = new Int16Array(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
      const s = Math.max(-1, Math.min(1, buffer[i]));
      pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    let binario = '';
    const bytes = new Uint8Array(pcm16.buffer);
    for (let i = 0; i < bytes.length; i++) binario += String.fromCharCode(bytes[i]);
    return btoa(binario);
  };

  // Reproduce cada fragmento de audio que va llegando de la Asesora, uno
  // detrás de otro en orden, sin que se corten ni se monten entre sí.
  //
  // NOTA sobre el desvanecimiento (fade): al pegar muchos pedacitos de
  // audio cortos uno detrás de otro, el punto exacto donde termina uno y
  // empieza el siguiente casi nunca cae en silencio absoluto — eso genera
  // un "click" audible en cada unión. Con muchos pedacitos por segundo,
  // esos clics seguidos se oyen como si la voz se cortara o sonara
  // entrecortada. Por eso cada pedacito sube y baja de volumen muy
  // rápido (unos milisegundos) al principio y al final, en vez de
  // empezar y terminar de golpe. Es el mismo remedio que usa el ejemplo
  // oficial de Google para este tipo de audio en vivo.
  const DURACION_FADE = 0.004; // 4 milisegundos, imperceptible al oído

  const reproducirFragmento = (base64Audio: string) => {
    if (!playbackContextRef.current) {
      playbackContextRef.current = new AudioContext({ sampleRate: 24000 });
      colaReproduccionRef.current = playbackContextRef.current.currentTime + 0.05;
    }
    const ctx = playbackContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const binario = atob(base64Audio);
    const bytes = new Uint8Array(binario.length);
    for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
    const pcm16 = new Int16Array(bytes.buffer);

    const audioBuffer = ctx.createBuffer(1, pcm16.length, 24000);
    const canal = audioBuffer.getChannelData(0);
    for (let i = 0; i < pcm16.length; i++) canal[i] = pcm16[i] / 32768;

    const fuente = ctx.createBufferSource();
    fuente.buffer = audioBuffer;

    // Nodo de volumen dedicado a este pedacito, solo para el fade.
    const ganancia = ctx.createGain();
    fuente.connect(ganancia);
    ganancia.connect(ctx.destination);

    const inicio = Math.max(colaReproduccionRef.current, ctx.currentTime + 0.01);
    const duracion = audioBuffer.duration;
    const fin = inicio + duracion;

    ganancia.gain.setValueAtTime(0, inicio);
    ganancia.gain.linearRampToValueAtTime(1, inicio + DURACION_FADE);
    ganancia.gain.setValueAtTime(1, Math.max(inicio + DURACION_FADE, fin - DURACION_FADE));
    ganancia.gain.linearRampToValueAtTime(0, fin);

    fuente.start(inicio);
    colaReproduccionRef.current = fin;

    setEstado('hablando');
    fuente.onended = () => {
      if (ctx.currentTime >= colaReproduccionRef.current - 0.05) {
        setEstado('escuchando');
      }
    };
  };

  const iniciar = useCallback(async () => {
    setEstado('conectando');
    setMensajeError('');

    try {
      // 1. Permiso temporal desde Netlify
      const respuestaToken = await fetch('/.netlify/functions/asesora-voz-token');
      const datosToken = await respuestaToken.json();
      if (!datosToken || datosToken.status !== 'success') {
        throw new Error('sin_token');
      }

      // 2. Conexión directa navegador → Gemini, usando ese permiso
      const ai = new GoogleGenAI({ apiKey: datosToken.token });
      const session = await ai.live.connect({
        model: MODELO_VOZ,
        config: { responseModalities: [Modality.AUDIO] },
        callbacks: {
          onopen: () => setEstado('escuchando'),
          onmessage: (mensaje: any) => {
            const partes = mensaje?.serverContent?.modelTurn?.parts || [];
            for (const parte of partes) {
              if (parte.inlineData?.data) {
                reproducirFragmento(parte.inlineData.data);
              }
            }
          },
          onerror: () => {
            setMensajeError('Se perdió la conexión de voz. Intente de nuevo.');
            setEstado('error');
          },
          onclose: () => {
            setEstado((actual) => (actual === 'error' ? actual : 'inactivo'));
          },
        },
      });
      sessionRef.current = session;

      // 3. Micrófono: pide permiso y empieza a mandar audio en vivo
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;
      const fuente = audioContext.createMediaStreamSource(stream);
      const procesador = audioContext.createScriptProcessor(4096, 1, 1);
      procesadorRef.current = procesador;

      procesador.onaudioprocess = (evento) => {
        const datos = evento.inputBuffer.getChannelData(0);
        const base64 = float32APcm16Base64(datos);
        sessionRef.current?.sendRealtimeInput?.({
          audio: { data: base64, mimeType: 'audio/pcm;rate=16000' },
        });
      };

      fuente.connect(procesador);
      procesador.connect(audioContext.destination);
    } catch (error) {
      setMensajeError(
        'No se pudo activar la voz. Revise el permiso del micrófono en el navegador e intente de nuevo.'
      );
      setEstado('error');
    }
  }, []);

  const detener = useCallback(() => {
    procesadorRef.current?.disconnect();
    audioContextRef.current?.close();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    sessionRef.current?.close?.();
    playbackContextRef.current?.close();
    playbackContextRef.current = null;
    setEstado('inactivo');
  }, []);

  const cerrarTodo = () => {
    detener();
    onCerrar();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center px-4">
      <div className="relative bg-[#111111] border border-white/10 rounded-3xl w-full max-w-sm p-6 text-center">
        <button
          type="button"
          onClick={cerrarTodo}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
          aria-label="Cerrar voz"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto rounded-full bg-[#30D158]/20 flex items-center justify-center text-2xl mb-4">
          🎧
        </div>

        <div className="text-white font-bold mb-1">Asesora de AlóDigital</div>
        <div className="text-[#86868b] text-sm mb-6 min-h-[20px]">
          {estado === 'inactivo' && 'Presione el botón y hable con la Asesora'}
          {estado === 'conectando' && 'Conectando…'}
          {estado === 'escuchando' && 'Escuchando… hable con confianza'}
          {estado === 'hablando' && 'Hablando…'}
          {estado === 'error' && mensajeError}
        </div>

        {estado === 'inactivo' || estado === 'error' ? (
          <button
            type="button"
            onClick={iniciar}
            className="mx-auto flex items-center gap-2 px-6 py-3 rounded-full bg-[#30D158] text-black font-bold hover:bg-[#34E05F] transition-colors"
          >
            <Mic className="w-4 h-4" />
            Hablar con la Asesora
          </button>
        ) : (
          <button
            type="button"
            onClick={detener}
            className="mx-auto flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
          >
            Terminar
          </button>
        )}
      </div>
    </div>
  );
};
