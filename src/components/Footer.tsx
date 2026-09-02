import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 max-w-6xl mx-auto px-6 sm:px-8 border-t border-white/5 text-center">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-[#86868b]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#30D158]"></span>
          <span className="font-semibold text-white">AlóDigital</span>
          <span>— Tecnología sencilla para tiendas de barrio.</span>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <a href="#problema" className="hover:text-white transition-colors">El Problema</a>
          <a href="#solucion" className="hover:text-white transition-colors">Cómo Funciona</a>
          <a href="#precios" className="hover:text-white transition-colors">Inversión</a>
          <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors ml-2 cursor-pointer border border-white/5"
            title="Volver arriba"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-8 text-xs text-zinc-600">
        © {new Date().getFullYear()} AlóDigital. Todos los derechos reservados. Diseñado para tenderos colombianos.
      </div>
    </footer>
  );
};

