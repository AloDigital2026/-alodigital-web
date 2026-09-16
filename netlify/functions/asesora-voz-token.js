// netlify/functions/asesora-voz-token.js
//
// Genera un "permiso temporal" (token efímero) para que el navegador del
// visitante se conecte DIRECTO a la voz en vivo de Gemini, sin pasar los
// mensajes de audio por Netlify y sin exponer nunca la clave secreta
// (GEMINI_API_KEY) en el navegador.
//
// El navegador llama a esta función UNA sola vez, al abrir el modo de voz.
// Esta función le responde con un permiso de un solo uso, válido por pocos
// minutos, ya limitado al modelo y configuración de la Asesora. El
// navegador usa ese permiso como si fuera la clave, directamente con
// Gemini, para toda la conversación de voz.
//
// Es completamente independiente de asesora.js (el chat de texto) y de
// todo lo demás del sistema. Si esto falla, el chat de texto sigue
// funcionando normal.
//
// NOTA: esta versión pide el permiso directo a Google por internet (fetch),
// en vez de usar la librería @google/genai en el servidor. Hace exactamente
// lo mismo, pero evita el problema de empaquetado que tenía Netlify con esa
// librería. El navegador del visitante sigue usando la librería completa
// sin ningún problema, porque ese conflicto solo pasaba del lado del
// servidor.

const PROMPT_ASESORA_VOZ = `
Eres la Asesora de AlóDigital, una empresa colombiana que ayuda a tiendas de
barrio a organizar sus pedidos, su inventario y sus fiados, usando
