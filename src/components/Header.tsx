import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="header-nav"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/80'
          : 'bg-[#050505]/60 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white group">
          <div className="w-3 h-3 rounded-full bg-[#30D158] shadow-[0_0_10px_#30D158]"></div>
          <span className="font-bold tracking-tight">AlóDigital</span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#86868b]">
          <a href="#problema" className="hover:text-white transition-colors">
            El Problema
          </a>
          <a href="#solucion" className="hover:text-white transition-colors">
            Solución
          </a>
          <a href="#catalogo-preview" className="hover:text-white transition-colors">
            Catálogo
          </a>
          <a href="#calculadora" className="hover:text-white transition-colors">
            Calculadora
          </a>
          <a href="#precios" className="hover:text-white transition-colors">
            Precios
          </a>
        </nav>

        {/* Action buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            id="nav-catalogo-cta"
            href="https://alodigital2026.github.io/catalogo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-4 py-2 rounded-full border border-white/10 text-[#f5f5f7] hover:bg-white/5 transition-colors flex items-center gap-1"
          >
            Ver Catálogo <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </a>
          <a
            id="nav-whatsapp-cta"
            href="#contacto"
            className="text-xs font-semibold px-5 py-2.5 bg-[#f5f5f7] text-black rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
          >
            Hablemos
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#86868b] hover:text-white hover:bg-white/5"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#050505]/98 px-6 py-6 space-y-4 backdrop-blur-2xl">
          <nav className="flex flex-col gap-4 text-base font-medium text-[#86868b]">
            <a
              href="#problema"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white transition-colors"
            >
              El Problema
            </a>
            <a
              href="#solucion"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white transition-colors"
            >
              Cómo Funciona
            </a>
            <a
              href="#catalogo-preview"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white transition-colors"
            >
              Catálogo
            </a>
            <a
              href="#calculadora"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white transition-colors"
            >
              Calculadora de Ahorro
            </a>
            <a
              href="#precios"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white transition-colors"
            >
              Inversión
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white transition-colors"
            >
              Contacto
            </a>
          </nav>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href="https://alodigital2026.github.io/catalogo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 text-sm font-semibold rounded-full border border-white/15 text-[#f5f5f7]"
            >
              Ver Catálogo en Vivo ↗
            </a>
            <a
              href="https://wa.me/573167539440?text=Hola%20Diego%2C%20vi%20la%20p%C3%A1gina%20de%20Al%C3%B3Digital%20y%20quiero%20saber%20m%C3%A1s"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 text-sm font-semibold rounded-full bg-[#30D158] text-black shadow-[0_10px_30px_rgba(48,209,88,0.2)] flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Escribir por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

