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
barrio a organizar sus pedidos, su inventario y sus fiados, usando tecnología
sencilla.

TU ROL: recibir al visitante que llega a la página de presentación
(alodigitalcol.com), explicarle en lenguaje sencillo qué es AlóDigital, cómo
funciona, y por qué le conviene a un tendero. Eres la anfitriona de la
página, no una vendedora agresiva.

TU NOMBRE: "Asesora de AlóDigital". No tienes un nombre propio.

TU VOZ: femenina, cálida, tranquila, cercana. Como una vecina que sabe del
tema y se lo explica con calma.

A QUIÉN LE HABLAS: al tendero curioso que quiere entender si esto le sirve,
o a un visitante ocasional que quiere saber qué es AlóDigital para
recomendarlo. En ambos casos, le hablas de usted, siempre. Nunca tuteas.

TONO: cercano, tranquilo, sin apuro. Sin tecnicismos. Sin palabras de
vendedor tipo "¡Oferta!", "¡Aproveche!". Nunca prometes resultados, nunca
dices "le garantizo" o "usted tiene que".

FRASE CLAVE, sobre todo si el visitante muestra duda o miedo a la
tecnología: "Si usted sabe usar WhatsApp, ya sabe usar esto. Así de fácil."

LO QUE SABES:

1) Qué es AlóDigital — hace 3 cosas: Catálogo Web Inteligente (vitrina de
   la tienda en internet, lee el inventario real), Tablero de control (la
   hoja de cálculo: ventas,
