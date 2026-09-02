import React, { useState } from 'react';
import { ShoppingBag, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import catalogImage from '../assets/images/frame_catalogo_1787747245140.jpg';

interface CategoryItem {
  id: string;
  name: string;
  price: string;
  category: string;
  badge?: string;
}

const SAMPLE_CATALOG_ITEMS: CategoryItem[] = [
  { id: '1', name: 'Leche Alquería Entera 1.1L', price: '$4.800', category: 'Lácteos', badge: 'Más vendido' },
  { id: '2', name: 'Cubeta de Huevos AA x30', price: '$18.500', category: 'Lácteos' },
  { id: '3', name: 'Pan Tajado Bimbo Artesano', price: '$8.200', category: 'Panadería' },
  { id: '4', name: 'Café Sello Rojo 500g', price: '$17.900', category: 'Despensa', badge: 'Popular' },
  { id: '5', name: 'Arroz Diana Tradicional 1kg', price: '$4.600', category: 'Despensa' },
  { id: '6', name: 'Gaseosa Coca-Cola 1.5L', price: '$6.500', category: 'Bebidas' },
];

export const SolutionSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [cartCount, setCartCount] = useState<number>(2);

  const categories = ['Todos', 'Lácteos', 'Panadería', 'Despensa', 'Bebidas'];

  const filteredItems = selectedCategory === 'Todos'
    ? SAMPLE_CATALOG_ITEMS
    : SAMPLE_CATALOG_ITEMS.filter((i) => i.category === selectedCategory);

  return (
    <section id="solucion" className="py-20 md:py-28 max-w-6xl mx-auto px-6 sm:px-8 border-t border-white/5">
      {/* Reemplaza el bloque del título principal y subtítulo de la sección de Solución */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[#00FF66] text-xs font-bold tracking-widest uppercase block mb-3">LA SOLUCIÓN</span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
          Un Catálogo Inteligente en tiempo real que asiste a sus necesidades inmediatas
        </h2>
        <p className="text-gray-400 text-base md:text-lg">
          Procesa pedidos al instante, permite pedir por texto lo que no ve, programa horarios extendidos y actúa como un asistente comercial en vivo, muy por encima de una página estática tradicional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: 3 Steps */}
        <div className="lg:col-span-6 space-y-5">
          <div className="flex gap-5 items-start p-5 rounded-2xl bg-[#111111] border border-white/5 transition-colors hover:border-white/10">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-[#30D158] font-mono font-bold flex items-center justify-center text-base flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1 tracking-tight">
                El cliente pide como siempre
              </h3>
              <p className="text-[#86868b] text-sm leading-relaxed">
                Por WhatsApp, por llamada, o desde su catálogo web. Con el tiempo, puede invitar a sus clientes de siempre a pedir directo ahí — más cómodo para todos, cuando usted quiera.
              </p>
            </div>
          </div>

          <div className="flex gap-5 items-start p-5 rounded-2xl bg-[#111111] border border-white/5 transition-colors hover:border-white/10">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-[#30D158] font-mono font-bold flex items-center justify-center text-base flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1 tracking-tight">
                AlóDigital lo registra solo
              </h3>
              <p className="text-[#86868b] text-sm leading-relaxed">
                Guarda el producto correcto, el precio exacto y calcula el total sin errores de tipeo.
              </p>
            </div>
          </div>

          {/* Mini card: Por dentro todo queda en orden */}
          <div className="flex gap-4 items-start p-4 rounded-2xl bg-[#111111] border border-dashed border-white/15 ml-0 sm:ml-8">
            <span className="text-xl flex-shrink-0">🗂️</span>
            <div>
              <strong className="text-xs font-bold text-white block mb-0.5">
                Por dentro, todo queda en orden.
              </strong>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Sus productos, sus pedidos y su panel del día viven organizados en un solo lugar. Usted solo necesita mirar lo último.
              </p>
            </div>
          </div>

          <div className="flex gap-5 items-start p-5 rounded-2xl bg-[#111111] border border-white/5 transition-colors hover:border-white/10">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-[#30D158] font-mono font-bold flex items-center justify-center text-base flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1 tracking-tight">
                Usted solo entrega
              </h3>
              <p className="text-[#86868b] text-sm leading-relaxed">
                Revisa la caja del día, sus fiados y el inventario en un tablero digital, cuando quiera.
              </p>
            </div>
          </div>

          <div className="pt-2 pl-2">
            <a
              href="https://alodigital2026.github.io/catalogo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#30D158] hover:text-[#34E05F] group"
            >
              <span>Explorar catálogo digital de demostración</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right: Mockup Image + Micro Catalog */}
        <div id="catalogo-preview" className="lg:col-span-6 space-y-6">
          <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-[#111111] shadow-2xl shadow-black/80">
            <img
              src={catalogImage}
              alt="Catálogo digital de AlóDigital"
              referrerPolicy="no-referrer"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#30D158] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Catálogo Web Personalizado
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                Los clientes arman su carrito y el pedido le llega listo a su WhatsApp
              </h4>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://alodigital2026.github.io/catalogo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#30D158] text-black font-bold text-xs hover:bg-[#34E05F] transition-all flex items-center gap-1.5 shadow-[0_10px_20px_rgba(48,209,88,0.2)]"
                >
                  <span>Probar catálogo en vivo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Micro-catalog tester */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#86868b]">
                Vista Rápida del Catálogo
              </span>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#30D158]">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{cartCount} items simulados</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-black font-bold'
                      : 'bg-white/5 text-[#86868b] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              {filteredItems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between hover:border-white/15 transition-colors"
                >
                  <div className="truncate mr-2">
                    <div className="text-xs font-semibold text-white truncate">{item.name}</div>
                    <div className="text-[11px] font-mono text-[#30D158]">{item.price}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCartCount((c) => c + 1)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-[#30D158] hover:text-black text-white text-xs transition-colors flex-shrink-0 cursor-pointer"
                    title="Añadir al pedido simulado"
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

