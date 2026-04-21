export const menuItems = [
  { label: "Home", href: "#home" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Blog", href: "#blog" },
  { label: "Contacto", href: "#contacto" },
];

export const services = [
  {
    title: "Branding y diseño de marca",
    slug: "branding-diseno-marca",
    description: "Creamos marcas con posicionamiento real: identidad visual, narrativa y lineamientos para vender con coherencia.",
    content: "En un mercado saturado, la identidad visual y narrativa son el principal diferenciador. Diseñamos marcas corporativas que transmiten autoridad, confianza y profesionalismo desde el primer contacto.",
    benefits: [
      "Identidad visual completa (Logo, paleta, tipografías)",
      "Manual de marca y lineamientos comerciales",
      "Aplicaciones gráficas para redes sociales y papelería",
      "Narrativa y voz de marca"
    ],
    individualPlans: [
      { name: "Brand Starter", price: "$8,500 MXN", features: ["Diseño de Logotipo profesional (2 propuestas)", "Paleta de colores corporativa", "Selección de tipografías primarias", "Mini-manual de uso de marca", "1 Ronda de revisión"] },
      { name: "Brand Corporate", price: "$18,900 MXN", features: ["Todo el plan Starter", "Manual de identidad corporativo completo", "Diseño de 10 plantillas para Redes Sociales", "Papelería digital (Firma de correo, hojas membretadas)", "3 Rondas de revisión"] },
      { name: "Brand 360 Premium", price: "$34,900 MXN", features: ["Todo el plan Corporate", "Brandbook interactivo y guía de estilo", "Estrategia de voz y tono de marca", "Lineamientos de fotografía corporativa", "Diseño de empaque o merchandising", "Revisiones ilimitadas en etapa de boceto"] }
    ],
    image: "/assets/branding_service_header_1776754721013.png"
  },
  {
    title: "Hosting administrado",
    slug: "hosting-administrado",
    description: "Infraestructura premium, segura y monitoreada para que tu operación esté siempre activa y sin fricciones.",
    content: "Tu sitio web y correos corporativos son el corazón de tu negocio. Ofrecemos servidores de alto rendimiento (VPS), monitoreo 24/7 y seguridad avanzada para asegurar que tu empresa nunca se detenga.",
    benefits: [
      "Servidores de alto rendimiento (NVMe, Litespeed)",
      "Certificados SSL gratuitos e instalación",
      "Backups diarios automatizados",
      "Dominio .com gratis en todos los planes anuales"
    ],
    individualPlans: [
      { name: "Hosting Básico", price: "$1,490 MXN/año", features: ["10GB SSD NVMe", "Certificado SSL de seguridad incluido", "Hasta 5 cuentas de correo corporativo", "Dominio .com GRATIS (1er año)", "Backups semanales", "Soporte técnico (L-V)"] },
      { name: "Hosting Avanzado", price: "$3,490 MXN/año", features: ["50GB SSD NVMe de máxima velocidad", "Certificado SSL Premium", "Hasta 20 cuentas de correo corporativo", "Dominio .com GRATIS (1er año)", "Backups diarios automáticos", "Optimización de caché LiteSpeed"] },
      { name: "VPS Dedicado", price: "$8,900 MXN/año", features: ["Servidor Privado (2 vCPU, 4GB RAM)", "Recursos aislados 100% para tu empresa", "Cuentas de correo ilimitadas", "Dominio .com GRATIS (1er año)", "IP Dedicada", "Soporte prioritario y monitoreo 24/7"] }
    ],
    image: "/assets/hosting_service_header_1776754763937.png"
  },
  {
    title: "Diseño web profesional",
    slug: "diseno-web-profesional",
    description: "Sitios y landing pages orientados a conversión, experiencia de usuario y autoridad digital.",
    content: "Desarrollamos páginas web que no solo se ven increíbles, sino que están diseñadas con ingeniería de conversión para generar prospectos y ventas. Optimizadas para velocidad y posicionamiento (SEO).",
    benefits: [
      "Diseño UI/UX corporativo y responsivo",
      "Optimización de velocidad (Core Web Vitals)",
      "Estructura orientada a SEO y conversión",
      "Integración con WhatsApp y formularios"
    ],
    individualPlans: [
      { name: "Landing Page", price: "$8,900 MXN", features: ["Diseño One-Page orientado a conversión", "Estructura narrativa y Copywriting básico", "Formulario de captación de prospectos", "Botón flotante de WhatsApp", "Hosting 1 año incluido", "Integración básica de analíticas"] },
      { name: "Web Corporativa", price: "$16,900 MXN", features: ["Sitio multi-página (Hasta 5 secciones)", "Diseño de interfaz premium personalizado", "Módulo de Blog integrado", "Estrategia SEO On-Page", "Panel autoadministrable", "Hosting 1 año incluido"] },
      { name: "E-commerce Avanzado", price: "$32,900 MXN", features: ["Catálogo de productos online", "Integración de pasarelas de pago (Stripe, PayPal, MercadoPago)", "Perfiles de usuario y carritos abandonados", "Optimización extrema (Core Web Vitals)", "Capacitación de uso de plataforma", "Mantenimiento gratuito 1 mes"] }
    ],
    image: "/assets/web_design_service_header_1776754777462.png"
  },
  {
    title: "Desarrollo de sistemas (CRM)",
    slug: "desarrollo-sistemas-crm",
    description: "Sistemas y módulos a medida para controlar ventas, procesos y operación desde un solo flujo.",
    content: "Automatiza tu proceso comercial. Implementamos y desarrollamos CRMs que te permiten tener un control absoluto sobre cada lead, automatizar respuestas y medir el rendimiento de tu equipo de ventas en tiempo real.",
    benefits: [
      "Implementación de CRM (HubSpot, Supabase, Custom)",
      "Automatización de correos y WhatsApp",
      "Dashboards financieros y de métricas",
      "Integración de pasarelas de pago"
    ],
    individualPlans: [
      { name: "Setup CRM Base", price: "$14,900 MXN", features: ["Mapeo y configuración de embudos de venta", "Importación de base de datos de prospectos", "Conexión con formularios del sitio web", "Reglas básicas de asignación de leads", "Reporte estándar de desempeño", "Capacitación a equipo comercial (2 hrs)"] },
      { name: "CRM + Automatización", price: "$29,900 MXN", features: ["Todo el Setup Base", "Automatizaciones avanzadas (Email y WhatsApp)", "Módulo de seguimiento y recordatorios automáticos", "Dashboards y gráficas personalizadas en tiempo real", "Integración con calendarios (Calendly/Google)", "Soporte post-implementación"] },
      { name: "Desarrollo a Medida", price: "Desde $55,000 MXN", features: ["Desarrollo de módulos operativos propios", "Conexión de datos mediante APIs externas", "Creación de portal privado de clientes", "Arquitectura escalable en la nube (Serverless)", "Auditoría de seguridad", "Soporte y mantenimiento continuo"] }
    ],
    image: "/assets/media__1776788727771.png"
  },
  {
    title: "Soporte IT",
    slug: "soporte-it",
    description: "Soporte técnico continuo para prevenir fallas, resolver incidencias y proteger la continuidad del negocio.",
    content: "Mantenemos tu tecnología funcionando. Desde la administración de correos corporativos hasta la resolución de problemas en equipos de trabajo, operamos como tu departamento de sistemas remoto.",
    benefits: [
      "Mesa de ayuda remota 24/7",
      "Gestión de correos y Google Workspace / Microsoft 365",
      "Mantenimiento preventivo de software",
      "Asesoría en seguridad informática"
    ],
    individualPlans: [
      { name: "Bolsa de Horas", price: "$3,500 MXN", features: ["Paquete de 5 horas de soporte", "Vigencia de 3 meses", "Atención remota a incidentes", "Configuración y reparación de correos", "Parches web de emergencia", "Sin compromiso de mensualidad"] },
      { name: "Póliza Mensual Base", price: "$4,500 MXN/mes", features: ["Horas ilimitadas (resolución de fallos web/correo)", "Monitoreo proactivo de sitio web", "Gestión de licencias y usuarios (Google Workspace)", "Mantenimiento preventivo mensual", "Tiempo de respuesta estándar (4 hrs)", "Asesoría IT básica"] },
      { name: "Póliza Corporativa 24/7", price: "$12,900 MXN/mes", features: ["SLA de respuesta rápida (1 hora)", "Soporte técnico avanzado 24/7", "Gestión completa de servidores y bases de datos", "Auditoría de ciberseguridad mensual", "Respaldos en la nube gestionados", "Reunión de consultoría IT trimestral"] }
    ],
    image: "/assets/media__1776788809733.png"
  },
  {
    title: "Marketing digital y captación",
    slug: "marketing-digital-captacion",
    description: "Estrategia, pauta y contenido para atraer demanda calificada y convertirla en oportunidades comerciales.",
    content: "Dejamos atrás los 'likes' para enfocarnos en ROI. Diseñamos campañas de publicidad rentables en Google y Meta Ads, combinadas con estrategias de contenido orgánico para posicionar a tu empresa como líder.",
    benefits: [
      "Campañas en Google Ads (Search) y Meta Ads",
      "Gestión de redes sociales (Community Management)",
      "Estrategia de contenidos y SEO",
      "Reportes ejecutivos de rendimiento"
    ],
    individualPlans: [
      { name: "Ads Manager", price: "$6,500 MXN/mes", features: ["Gestión exclusiva de Google Ads o Meta Ads", "Estructuración de hasta 2 campañas activas", "Optimización semanal de presupuesto y Costo por Clic", "Configuración de píxeles de rastreo", "Reporte ejecutivo mensual", "(Nota: No incluye diseño gráfico)"] },
      { name: "Growth Digital", price: "$14,900 MXN/mes", features: ["Gestión de múltiples campañas (Google y Meta)", "Creación de 12 diseños/posts mensuales para RRSS", "Copywriting persuasivo para anuncios", "Campañas de Retargeting a visitantes de la web", "Gestión básica de comunidad (Respuestas en redes)", "Sesión estratégica de revisión mensual"] },
      { name: "Dirección Mkt 360", price: "$28,900 MXN/mes", features: ["Estrategia omnicanal (Ads, SEO, Email Marketing)", "Embudos automatizados de captación de leads", "Producción de creativos (Incluye edición de video corto)", "Publicaciones ilimitadas planificadas estratégicamente", "Reportes en tiempo real y KPIs de negocio", "Reuniones quincenales de alineación comercial"] }
    ],
    image: "/assets/media__1776788925957.png"
  },
  {
    title: "Digitalización de cobranza y pagos",
    slug: "digitalizacion-cobranza-pagos",
    description: "Automatiza tu flujo de ingresos con pasarelas de pago y suscripciones recurrentes.",
    content: "Elimina la fricción al cobrar. Implementamos infraestructuras de pago (Stripe, PayPal, MercadoPago) para que tus clientes puedan pagarte con tarjeta en segundos, ya sea a través de links directos, tiendas online o suscripciones automáticas.",
    benefits: [
      "Apertura y validación de cuenta Stripe",
      "Suscripciones y cargos recurrentes automáticos",
      "Links de pago (Payment Links) listos para WhatsApp",
      "Dashboards financieros y control de ingresos"
    ],
    individualPlans: [
      { name: "Setup Cobranza Express", price: "$4,500 MXN", features: ["Alta y configuración de cuenta Stripe", "Validación fiscal y bancaria", "Creación de 5 productos/servicios", "Generación de Payment Links", "Capacitación de uso (1 hora)", "Soporte técnico 15 días"] },
      { name: "Automatización E-commerce", price: "$12,900 MXN", features: ["Todo el Setup Express", "Integración directa en tu sitio web actual", "Carrito de compras optimizado", "Configuración de impuestos y envíos", "Recuperación de carritos abandonados", "Pruebas de pago en entorno seguro"] },
      { name: "Suscripciones (MRR)", price: "$18,500 MXN", features: ["Todo lo anterior", "Lógica de cobros mensuales/anuales (Suscripciones)", "Portales de cliente para gestionar tarjetas", "Webhooks para notificación de pagos exitosos", "Cancelaciones automatizadas", "Consultoría para estructurar precios MRR"] }
    ],
    image: "/assets/digital_payments_header_1776783642727.png"
  }
];

export const process = [
  {
    step: "01",
    title: "Diagnóstico profundo",
    text: "Revisamos negocio, oferta, tráfico y conversión para definir prioridades de impacto.",
  },
  {
    step: "02",
    title: "Arquitectura de crecimiento",
    text: "Diseñamos la solución visual, técnica y comercial alineada a tus objetivos reales.",
  },
  {
    step: "03",
    title: "Ejecución por sprints",
    text: "Entregamos rápido con validaciones semanales y foco en resultados medibles.",
  },
  {
    step: "04",
    title: "Optimización continua",
    text: "Iteramos con datos para incrementar conversión y eficiencia operativa.",
  },
];

export const metrics = [
  { value: "360°", label: "solución integral en un solo equipo" },
  { value: "24/7", label: "soporte y monitoreo de infraestructura" },
  { value: "SEO", label: "base técnica para visibilidad orgánica" },
  { value: "CRM", label: "sistemas para ordenar ventas y servicio" },
];

export const cases = [
  {
    name: "Empresa B2B de servicios",
    result: "Incremento de reuniones calificadas en 60 días",
  },
  {
    name: "Operación comercial regional",
    result: "Reducción del costo por lead con web y campañas integradas",
  },
  {
    name: "Firma en crecimiento",
    result: "Centralización de CRM, soporte y seguimiento comercial",
  },
];

export const plans = [
  {
    name: "Plan Básico",
    idealFor: "Negocios que inician su presencia digital",
    summary: "Arranca con una presencia profesional que proyecta confianza y genera primeras oportunidades.",
    setupPrice: "Desde $12,900 MXN",
    monthlyPrice: "Desde $1,490 MXN/mes",
    breakdown: [
      {
        title: "Branding y presencia",
        items: ["Logo base, paleta y lineamientos iniciales", "Línea gráfica esencial para redes"],
      },
      {
        title: "Web y tecnología",
        items: ["Sitio web corporativo hasta 5 secciones", "Formulario de contacto y botón de WhatsApp"],
      },
      {
        title: "Infraestructura y soporte",
        items: ["Hosting administrado + SSL + dominio (1 año)", "Soporte técnico mensual básico"],
      },
      {
        title: "Visibilidad",
        items: ["SEO técnico inicial", "Configuración de Google Search Console"],
      },
    ],
    buttonText: "Agendar cita",
    buttonLink: "#contacto",
  },
  {
    name: "Plan Pro",
    idealFor: "Empresas en crecimiento comercial",
    summary: "Escala tu captación con procesos comerciales claros y control sobre cada lead.",
    setupPrice: "Desde $24,900 MXN",
    monthlyPrice: "Desde $3,490 MXN/mes",
    breakdown: [
      {
        title: "Todo Básico + crecimiento comercial",
        items: ["Mejora de web para conversión", "Landing adicional para campañas"],
      },
      {
        title: "Marketing y captación",
        items: ["Estrategia de captación y embudo", "Gestión y optimización mensual de campañas"],
      },
      {
        title: "Operación comercial",
        items: ["Integración de CRM para seguimiento de leads", "Automatizaciones iniciales de contacto"],
      },
      {
        title: "Soporte y analítica",
        items: ["Soporte IT prioritario", "Reporte mensual de rendimiento y oportunidades"],
      },
    ],
    highlighted: true,
    buttonText: "Agendar cita",
    buttonLink: "#contacto",
  },
  {
    name: "Plan Premium",
    idealFor: "Empresas que buscan un ecosistema 360",
    summary: "Activa una operación digital integral con tecnología, automatización y acompañamiento estratégico.",
    setupPrice: "Desde $49,900 MXN",
    monthlyPrice: "Desde $7,900 MXN/mes",
    breakdown: [
      {
        title: "Todo Pro + ecosistema integral",
        items: ["Arquitectura digital 360 por unidad de negocio", "Diseño de flujo completo de captación a cierre"],
      },
      {
        title: "Sistemas y automatización",
        items: ["Desarrollo de módulo CRM/operaciones a medida", "Automatizaciones comerciales y de soporte"],
      },
      {
        title: "Dirección estratégica",
        items: ["Consultoría continua y roadmap trimestral", "Priorización de sprints por impacto en ingresos"],
      },
      {
        title: "Soporte avanzado",
        items: ["Soporte técnico 24/7", "Monitoreo e indicadores clave de negocio"],
      },
    ],
    buttonText: "Agendar cita",
    buttonLink: "#contacto",
  },
];

export const webPackages = [
  {
    name: "Starter (Web en Renta)",
    idealFor: "Negocios locales y emprendedores",
    summary: "Tu página web profesional sin descapitalizarte. Diseñada a la medida y con mantenimiento incluido para que nunca se vuelva obsoleta.",
    setupPrice: "$990 MXN",
    monthlyPrice: "$890 MXN/mes",
    breakdown: [
      {
        title: "Diseño Web y Tecnología",
        items: ["Landing Page estructurada (One-Page)", "Diseño a la medida (Cero plantillas)", "Integración de WhatsApp para ventas"],
      },
      {
        title: "Mantenimiento y Hosting (Incluido)",
        items: ["Hosting de Alta Velocidad y SSL", "Dominio .com GRATIS (mientras dure el plan)", "1 Hora de cambios o soporte al mes"],
      },
    ],
    buttonText: "Contratar y empezar",
    buttonLink: "https://wa.me/528447502607?text=Hola,%20quiero%20contratar%20el%20Plan%20Starter%20de%20%24890%20al%20mes.%20%C2%BFMe%20puedes%20pasar%20el%20link%20de%20pago?",
  },
  {
    name: "Negocio (Web + Soporte)",
    idealFor: "Pymes en crecimiento",
    summary: "Sitio web corporativo completo, correos empresariales y un equipo técnico respaldando tu presencia online mes a mes.",
    setupPrice: "$1,990 MXN",
    monthlyPrice: "$1,490 MXN/mes",
    breakdown: [
      {
        title: "Web Corporativa (Hasta 5 Secciones)",
        items: ["Diseño multi-página (Inicio, Servicios, etc.)", "Optimización SEO On-Page Básica", "Formularios de contacto dinámicos"],
      },
      {
        title: "Ecosistema y Mantenimiento",
        items: ["Hosting Avanzado NVMe", "Hasta 5 cuentas de correo corporativo", "Actualizaciones de seguridad y respaldos", "2 Horas de cambios o soporte al mes"],
      },
    ],
    highlighted: true,
    buttonText: "Contratar y empezar",
    buttonLink: "https://wa.me/528447502607?text=Hola,%20quiero%20contratar%20el%20Plan%20Negocio%20de%20%241%2C490%20al%20mes.%20%C2%BFMe%20puedes%20pasar%20el%20link%20de%20pago?",
  },
  {
    name: "Growth (Catálogo / CRM)",
    idealFor: "Empresas con enfoque agresivo en ventas",
    summary: "Para empresas que necesitan catálogos, cobrar en línea o conectar su web a un sistema CRM de gestión de leads.",
    setupPrice: "$4,900 MXN",
    monthlyPrice: "$2,990 MXN/mes",
    breakdown: [
      {
        title: "Catálogo o Sistema Integrado",
        items: ["Catálogo de productos o integraciones a medida", "Pasarelas de pago o conexión a CRM", "Panel autoadministrable"],
      },
      {
        title: "Infraestructura Premium",
        items: ["Hosting Premium para alto tráfico", "Correos corporativos ilimitados", "Soporte Técnico prioritario (SLA rápido)"],
      },
    ],
    buttonText: "Contratar y empezar",
    buttonLink: "https://wa.me/528447502607?text=Hola,%20quiero%20contratar%20el%20Plan%20Growth%20de%20%242%2C990%20al%20mes.%20%C2%BFMe%20puedes%20pasar%20el%20link%20de%20pago?",
  },
];

export const ecosystemLayers = [
  {
    title: "Base: Hosting + Dominio",
    text: "Infraestructura, correos y seguridad para operar con confiabilidad y imagen profesional desde el primer día.",
  },
  {
    title: "Centro: Sitio Web",
    text: "Tu sitio como centro de conversión, integración y control de todo tu ecosistema digital.",
  },
  {
    title: "Atracción: Marketing Digital",
    text: "SEO, pauta y embudos para transformar tráfico en oportunidades de negocio.",
  },
  {
    title: "Relación: Community Management",
    text: "Contenido y gestión de comunidad para sostener atención, confianza y recordación de marca.",
  },
  {
    title: "Identidad: Branding",
    text: "Identidad consistente en cada punto de contacto para elevar valor percibido y diferenciación.",
  },
  {
    title: "Soporte y Expansión: IT + CRM + Automatización",
    text: "Soporte continuo, sistemas y automatización para escalar sin perder control operativo.",
  },
];

export const niches = [
  {
    title: "Negocios locales y pymes",
    zone: "Saltillo, Ramos Arizpe y Monterrey",
    points: [
      "Sitios corporativos y landing pages enfocadas en captación",
      "Marketing y redes para construir demanda constante",
      "Soporte técnico para sostener continuidad operativa",
    ],
  },
  {
    title: "Iglesias cristianas",
    zone: "Digitalización institucional",
    points: [
      "Web institucional y canales digitales para conectar con la congregación",
      "Estrategia de contenido y presencia online con enfoque pastoral",
      "Acompañamiento técnico para administración y estabilidad digital",
    ],
  },
];
