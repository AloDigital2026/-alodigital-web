import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';
import closingImage from '../assets/images/frame_cierre_1787747258676.jpg';

export const ContactSection: React.FC = () => {
  const [storeName, setStoreName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const getWhatsAppLink = () => {
    let text = 'Hola Diego, vi la página de AlóDigital y quiero saber más para mi tienda';
    if (storeName.trim()) {
      text += ` "${storeName.trim()}"`;
    }
    if (neighborhood.trim()) {
      text += ` ubicada en ${neighborhood.trim()}`;
    }
    return `https://wa.me/573167539440?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contacto" className="py-20 md:py-28 max-w-6xl mx-auto px-6 sm:px-8 border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Photo Box */}
        <div className="max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80 relative group">
          <img
            src={closingImage}
            alt="Más ventas, más tranquilidad con AlóDigital - Don Arturo"
            referrerPolicy="no-referrer"
            className="w-full object-cover group-hover:scale-105 transition-transform duration-500 max-h-72 sm:max-h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-4">
            <span className="text-xs font-semibold text-white/90 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#30D158]" /> Más ventas, más tranquilidad para su negocio
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-[#30D158] text-xs font-bold uppercase tracking-widest">
            <div className="w-6 h-[1px] bg-[#30D158]"></div>
            Contacto Directo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            ¿Listo para modernizar <span className="text-[#30D158]">su tienda</span>?
          </h2>
          <p className="text-base sm:text-lg text-[#86868b] max-w-xl mx-auto leading-relaxed">
            Escríbame y le muestro cómo adaptamos este sistema exactamente a como usted trabaja hoy, sin complicaciones.
          </p>
        </div>

        {/* Tarjeta de contacto */}
        <div className="bg-[#121212] border border-[#222] rounded-3xl p-10 w-full max-w-3xl mx-auto text-center shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-2">
            ESCRIBIR DIRECTO A DIEGO (ASESOR ALÓDIGITAL)
          </h3>
          <p className="text-[#00FF66] text-sm font-medium mb-8 flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#00FF66] rounded-full inline-block animate-pulse"></span>
            Disponible hoy
          </p>
          
          {/* Campos de formulario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-left">
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Nombre de su tienda (opcional)"
              className="bg-[#1a1a1a] text-white border border-[#333] rounded-xl p-4 focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] outline-none transition-all placeholder:text-gray-600 text-sm"
            />
            <input
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              placeholder="Barrio o Ciudad (opcional)"
              className="bg-[#1a1a1a] text-white border border-[#333] rounded-xl p-4 focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] outline-none transition-all placeholder:text-gray-600 text-sm"
            />
          </div>

          {/* Botones de acción */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              id="contacto-whatsapp-btn"
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00FF66] text-[#121212] font-bold p-4 rounded-xl flex items-center justify-center gap-3 hover:bg-green-400 transition-colors text-sm shadow-[0_10px_25px_rgba(0,255,102,0.2)]"
            >
              <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.199.297-.766.967-.939 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.206-.242-.579-.487-.501-.669-.51l-.571-.01c-.197 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.273-.198-.57-.347z"></path>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.565 4.196 1.639 6.015L.057 24l6.139-1.643A11.916 11.916 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.815c-1.953 0-3.808-.521-5.441-1.497l-.39-.232-4.043 1.084 1.081-3.939-.251-.404c-1.028-1.658-1.571-3.572-1.571-5.557 0-5.851 4.759-10.61 10.61-10.61s10.61 4.759 10.61 10.61c0 5.852-4.759 10.611-10.61 10.611z"></path>
              </svg>
              <span>Escribir por WhatsApp</span>
            </a>
            
            <a
              id="contacto-email-btn"
              href="mailto:dgordz1969@gmail.com?subject=Consulta%20Al%C3%B3Digital%20para%20mi%20tienda"
              className="bg-[#1a1a1a] text-gray-400 font-medium p-4 rounded-xl flex items-center justify-center gap-3 border border-[#333] hover:border-gray-600 hover:text-white transition-all text-sm"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>Enviar Correo</span>
            </a>
          </div>
        </div>

        {/* Direct Contact Info Details */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-[#86868b]">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#30D158]" /> +57 316 753 9440
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#0A84FF]" /> dgordz1969@gmail.com
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF9F0A]" /> Respuesta el mismo día
          </span>
        </div>
      </div>
    </section>
  );
};
