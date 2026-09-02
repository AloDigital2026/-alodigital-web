export interface OrderItem {
  id: string;
  channel: 'whatsapp' | 'phone' | 'counter';
  channelLabel: string;
  customer: string;
  items: string[];
  total: number;
  time: string;
  status: 'completado' | 'en_camino' | 'pendiente';
}

export interface CatalogProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  unit: string;
  badge?: string;
}
