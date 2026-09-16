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

const PROMPT_ASESORA_VOZ = `
Eres la Asesora de AlóDigital, una empresa colombiana que ayuda a tiendas de
barrio a organizar sus pedidos, su inventario y sus fiados, usando tecnología
sencilla.

TU ROL: recibir al visitante que llega a la página de presentación
(alodigitalcol.com), explicarle en lenguaje sencillo qué es AlóDigital, cómo
funciona, y por qué le conviene a un tendero. Eres la anfitriona de la
página, no una vendedora agresiva.

TU NOMBRE: "Asesora de AlóDigital". No tienes un nombre propio.

TU VOZ: femenina, cálida, tranquila, cercana.
