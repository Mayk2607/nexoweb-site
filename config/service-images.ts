const BASE = "https://images.unsplash.com/photo-";
const Q = "?auto=format&fit=crop&w=1200&q=80";
const u = (id: string) => `${BASE}${id}${Q}`;

export const serviceImages: Record<string, string> = {
  // ── Presencia Digital ──────────────────────────────────────────────────────
  "diseno-desarrollo-web":
    u("1547658719-da2b51169166"), // web design on laptop screen

  "comercio-electronico-ecommerce":
    u("1556742049-0cfed4f6a45d"), // person shopping online with credit card

  "desarrollo-aplicaciones-web":
    u("1461749280684-dccba630e2f6"), // dual monitors with code

  "desarrollo-aplicaciones-moviles":
    u("1512941937669-90a1b58e7e9c"), // hand holding smartphone with app

  "branding-identidad-corporativa":
    u("1561070791-2526d30994b5"), // design desk with brand color swatches

  "hosting-hospedaje-web":
    u("1558494949-ef010cbdcc31"), // modern server room / data center

  "correo-empresarial":
    u("1596526131083-e8c633c948d2"), // email inbox open on laptop

  "registro-administracion-dominios":
    u("1516321318423-f06f85e504b3"), // domain / internet address concept

  // ── Marketing y Captación ─────────────────────────────────────────────────
  "posicionamiento-seo":
    u("1432888498266-38ffec3eaf0a"), // person analyzing search results on phone

  "marketing-digital":
    u("1460925895917-afdab827c52f"), // MacBook Pro with analytics dashboard

  "publicidad-facebook-instagram-ads":
    u("1611162617213-7d7a39e9b1d7"), // social media apps on smartphone

  "gestion-redes-sociales":
    u("1611162617474-5b21e879e113"), // content creator composing posts

  "produccion-contenido-digital":
    u("1492691527719-9d1e07e534b4"), // professional camera on tripod filming

  "consultoria-marketing":
    u("1552664730-d307ca884978"), // team at whiteboard planning strategy

  // ── Tecnología Empresarial ────────────────────────────────────────────────
  "crm-gestion-comercial":
    u("1551288049-bebda4e38f71"), // CRM / sales pipeline on laptop

  "plataformas-empresariales-enterprise":
    u("1573167507387-6b4b98cb7c13"), // enterprise office with screens

  "inteligencia-artificial":
    u("1620712943543-bcc4688e7485"), // robotic hand with glowing AI circuit

  "automatizacion-de-procesos":
    u("1485827404703-89b55fcc595e"), // white industrial robot arm

  "business-intelligence-dashboards":
    u("1509228468518-180dd4864904"), // analytics data charts on screen

  "integracion-de-sistemas":
    u("1558346490-a72e53ae2d4f"), // interconnected network nodes

  "soluciones-en-la-nube":
    u("1544197150-b99a580bb7a8"), // close-up of server rack / cloud hardware

  "ciberseguridad-proteccion-datos":
    u("1563986768609-322da13575f3"), // padlock icon on dark laptop screen

  "infraestructura-tecnologica":
    u("1601134467661-3d775b999c0b"), // network cables and patch panel

  "soporte-tecnico-it":
    u("1586953208448-b95a79798f07"), // IT technician working at helpdesk

  "gestion-documental-digital":
    u("1568234928966-359c35dd8327"), // organized folders and digital documents

  "respaldo-recuperacion-informacion":
    u("1518770660439-4636190af475"), // hard drives and data storage

  "sistemas-gestion-operativa":
    u("1586864387967-d02ef85d93e8"), // operations dashboard on large monitor

  "transformacion-digital":
    u("1519389950473-47ba0277781c"), // diverse team collaborating with devices

  "consultoria-tecnologica":
    u("1600880292203-757bb62b4baf"), // tech consultant presenting to board

  "calidad-mejora-continua-digital":
    u("1454165804606-c3d57bc86b40"), // professionals reviewing quality reports

  "soluciones-digitales-iglesias":
    u("1529070538774-1843cb3265df"), // church congregation with screens / streaming
};
