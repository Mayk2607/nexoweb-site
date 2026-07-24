// ─── Tipos ────────────────────────────────────────────────────────────────────

export type ServiceCategory = "presencia" | "marketing" | "tecnologia";

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  title: string;
  slug: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  benefits: string[];
  forWho: string;
  image: string;
  featured?: boolean;
  timeline?: string;
  faq?: ServiceFaq[];
}

// ─── Menú ─────────────────────────────────────────────────────────────────────

export const menuItems = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Portafolio", href: "/#portafolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/#contacto" },
];

// ─── Categorías de servicios ───────────────────────────────────────────────────

export const serviceCategories = [
  {
    id: "presencia" as ServiceCategory,
    title: "Presencia Digital",
    tagline: "Presencia digital estratégica que genera oportunidades de negocio.",
    description:
      "Diseño web, comercio electrónico, branding e identidad digital. Construimos la presencia de tu empresa en internet con una sola meta: generar resultados.",
    color: "blue",
    icon: "Globe",
  },
  {
    id: "marketing" as ServiceCategory,
    title: "Marketing y Crecimiento",
    tagline: "Estrategias digitales que convierten audiencias en clientes.",
    description:
      "SEO, publicidad digital, redes sociales y marketing de contenido. Estrategias medibles orientadas al crecimiento real de tu negocio.",
    color: "emerald",
    icon: "TrendingUp",
  },
  {
    id: "tecnologia" as ServiceCategory,
    title: "Ingeniería de Software",
    tagline: "Software, automatización e infraestructura para empresas que crecen.",
    description:
      "Desarrollo de software a medida, automatización de procesos, inteligencia artificial, infraestructura cloud y soporte tecnológico continuo.",
    color: "violet",
    icon: "Cpu",
  },
];

// ─── Servicios ────────────────────────────────────────────────────────────────

export const services: Service[] = [
  // ── PRESENCIA DIGITAL ──────────────────────────────────────────────────────
  {
    title: "Diseño y Desarrollo Web",
    slug: "diseno-desarrollo-web",
    category: "presencia",
    tagline: "Sitios modernos, rápidos y diseñados para convertir.",
    description:
      "Desarrollamos sitios web corporativos, landing pages y portales que no solo se ven increíbles, sino que están ingeniados para generar prospectos y ventas desde el primer día.",
    benefits: [
      "Diseño UI/UX responsivo y orientado a conversión",
      "Optimización de velocidad (Core Web Vitals)",
      "Estructura técnica base para SEO",
      "Integración con WhatsApp y formularios inteligentes",
      "Panel de administración incluido",
    ],
    forWho: "Negocios que necesitan una presencia web profesional y efectiva.",
    image: "/assets/webdesign_service.png",
    featured: true,
    timeline: "4 – 6 semanas",
    faq: [
      { q: "¿El diseño es original o usan plantillas?", a: "100% a medida. Partimos de cero con tu identidad de marca, paleta de colores y objetivos de negocio. No usamos plantillas genéricas." },
      { q: "¿Puedo actualizar el contenido yo mismo después de la entrega?", a: "Sí. Todo sitio incluye un panel de administración intuitivo con el que puedes editar textos, imágenes, publicar artículos y más, sin tocar una línea de código." },
      { q: "¿El sitio funciona bien en celulares y tablets?", a: "Por supuesto. Desarrollamos con enfoque mobile-first: tu sitio se adapta y se ve perfecto en cualquier dispositivo, desde un teléfono hasta una pantalla de escritorio." },
      { q: "¿Qué pasa si quiero cambios o mejoras después de lanzar?", a: "Los ajustes menores están cubiertos durante el período de garantía (30 días). Para evoluciones y nuevas funciones, ofrecemos planes de mantenimiento y desarrollo continuo a costo accesible." },
    ],
  },
  {
    title: "Comercio Electrónico (E-commerce)",
    slug: "comercio-electronico-ecommerce",
    category: "presencia",
    tagline: "Tu tienda en línea, lista para vender 24/7.",
    description:
      "Creamos tiendas en línea seguras, eficientes y optimizadas para maximizar la conversión: desde el catálogo de productos hasta el checkout y los pagos automatizados.",
    benefits: [
      "Catálogo de productos con filtros avanzados",
      "Integración de pasarelas de pago (Stripe, MercadoPago, PayPal)",
      "Carrito de compras y recuperación de abandonados",
      "Gestión de inventario y pedidos",
      "Optimización de velocidad para móvil",
    ],
    forWho: "Empresas que quieren vender productos o servicios en internet.",
    image: "/assets/webdesign_service.png",
    featured: true,
    timeline: "6 – 8 semanas",
    faq: [
      { q: "¿Qué pasarelas de pago soportan?", a: "Integramos Stripe, MercadoPago y PayPal como opciones estándar. Si tu negocio requiere otra pasarela o pagos en OXXO, transferencia o meses sin intereses, lo evaluamos en la propuesta." },
      { q: "¿Puedo manejar mis productos e inventario yo mismo?", a: "Sí. El panel de administración te permite agregar, editar y desactivar productos, actualizar stock, gestionar pedidos y ver reportes de ventas en tiempo real sin depender de nosotros." },
      { q: "¿La tienda es segura para mis clientes?", a: "Absolutamente. Implementamos SSL, cumplimos estándares PCI DSS para pagos, y los datos de tarjeta nunca se almacenan en nuestros servidores: se procesan directamente por las pasarelas certificadas." },
      { q: "¿Cuántos productos puedo tener en el catálogo?", a: "Sin límite. La plataforma escala con tu catálogo sin afectar el rendimiento ni el tiempo de carga. Hemos trabajado con catálogos de miles de productos sin problema." },
    ],
  },
  {
    title: "Desarrollo de Aplicaciones Web",
    slug: "desarrollo-aplicaciones-web",
    category: "presencia",
    tagline: "Aplicaciones web a la medida de tu proceso.",
    description:
      "Construimos aplicaciones web personalizadas para cubrir necesidades específicas de tu empresa: portales de clientes, sistemas internos, plataformas SaaS y más.",
    benefits: [
      "Arquitectura escalable en la nube",
      "Autenticación y roles de usuario",
      "Integración con APIs y sistemas externos",
      "Paneles de control y reportes en tiempo real",
      "Mantenimiento y evolución continua",
    ],
    forWho: "Empresas con procesos únicos que requieren soluciones digitales propias.",
    image: "/assets/webdesign_service.png",
    timeline: "8 – 14 semanas",
    faq: [
      { q: "¿Qué diferencia hay entre una app web y un sitio web?", a: "Un sitio web muestra información. Una app web es interactiva: los usuarios inician sesión, realizan acciones, gestionan datos y el sistema responde en tiempo real. Básicamente es un software que corre en el navegador." },
      { q: "¿La aplicación será mía o tendrán propiedad sobre el código?", a: "El código, la base de datos y toda la infraestructura son 100% tuyos desde el día de la entrega. No generamos dependencia tecnológica." },
      { q: "¿Puede integrarse con los sistemas que ya uso (ERP, CRM, etc.)?", a: "Sí. Diseñamos la integración con cualquier sistema que exponga una API o permita conexión por base de datos. Lo evaluamos en la fase de diagnóstico." },
      { q: "¿Qué pasa cuando la app necesita crecer o agregar funciones?", a: "Construimos con arquitectura modular pensada para escalar. Agregar módulos o usuarios adicionales no implica reescribir el sistema. Ofrecemos retainers de desarrollo para evolución continua." },
    ],
  },
  {
    title: "Desarrollo de Aplicaciones Móviles",
    slug: "desarrollo-aplicaciones-moviles",
    category: "presencia",
    tagline: "Apps para Android e iOS que conectan tu negocio con tus clientes.",
    description:
      "Diseñamos y desarrollamos aplicaciones móviles nativas e híbridas que ofrecen experiencias fluidas, funcionales y alineadas con la identidad de tu marca.",
    benefits: [
      "Diseño UX centrado en el usuario móvil",
      "Publicación en Google Play y App Store",
      "Notificaciones push y mensajería integrada",
      "Sincronización en tiempo real con sistemas backend",
      "Soporte y actualizaciones post-lanzamiento",
    ],
    forWho: "Empresas que quieren conectar con sus clientes directamente desde su dispositivo.",
    image: "/assets/webdesign_service.png",
    timeline: "10 – 16 semanas",
    faq: [
      { q: "¿Desarrollan para Android e iOS al mismo tiempo?", a: "Sí. Usamos React Native para desarrollar una sola base de código que corre en ambas plataformas de forma nativa, reduciendo costos y tiempos sin sacrificar rendimiento." },
      { q: "¿Cómo se publica la app en las tiendas?", a: "Nosotros gestionamos el proceso de publicación en Google Play y App Store, incluyendo la creación de cuentas de desarrollador si no las tienes, capturas, descripciones y cumplimiento de políticas." },
      { q: "¿La app puede funcionar sin internet?", a: "Depende de los requerimientos. Podemos implementar funcionamiento offline con sincronización cuando recupera conexión. Lo definimos en la fase de diseño según tu caso de uso." },
      { q: "¿Qué incluye el soporte post-lanzamiento?", a: "Incluye corrección de bugs críticos y ajustes menores por 30 días. Para actualizaciones de funciones, nuevas versiones de iOS/Android y mejoras continuas ofrecemos planes de mantenimiento mensual." },
    ],
  },
  {
    title: "Branding e Identidad Corporativa",
    slug: "branding-identidad-corporativa",
    category: "presencia",
    tagline: "Creamos marcas que generan confianza y se recuerdan.",
    description:
      "Diseñamos identidades visuales y sistemas de marca completos que proyectan autoridad, coherencia y profesionalismo en todos los puntos de contacto con tus clientes.",
    benefits: [
      "Diseño de logotipo e identidad visual completa",
      "Manual de marca y lineamientos de uso",
      "Aplicaciones gráficas para redes y papelería",
      "Estrategia de voz y tono de marca",
      "Brandbook digital interactivo",
    ],
    forWho: "Empresas que quieren diferenciarse y elevar su percepción de valor.",
    image: "/assets/branding_service.png",
    featured: true,
    timeline: "3 – 5 semanas",
    faq: [
      { q: "¿Cuántas propuestas de logotipo presentan?", a: "Presentamos 3 propuestas conceptuales distintas en la primera revisión. A partir de ahí, refinamos la seleccionada hasta llegar al resultado final con hasta 2 rondas de ajustes incluidas." },
      { q: "¿Qué formatos de archivos entrega?", a: "Entregamos el paquete completo en SVG, PNG (fondo transparente), PDF vectorial, y versiones para fondo oscuro y claro. Todos los archivos originales editables son tuyos." },
      { q: "¿El manual de marca sirve para que otros diseñadores lo usen?", a: "Sí. El manual está pensado exactamente para eso: define colores en HEX/CMYK/Pantone, tipografías, proporciones del logo, usos correctos e incorrectos, y ejemplos de aplicación para que cualquier proveedor lo use bien." },
      { q: "¿Pueden rediseñar una marca que ya tengo?", a: "Sí, hacemos rebranding. El proceso comienza con un diagnóstico de tu marca actual, lo que funciona y lo que no, antes de proponer la nueva dirección. Puedes evolucionar sin perder reconocimiento." },
    ],
  },
  {
    title: "Hosting y Hospedaje Web",
    slug: "hosting-hospedaje-web",
    category: "presencia",
    tagline: "Infraestructura rápida, segura y monitoreada 24/7.",
    description:
      "Administramos la infraestructura de tu sitio web en servidores de alto rendimiento para que tu operación siempre esté disponible, segura y sin fricciones técnicas.",
    benefits: [
      "Sitio siempre activo con monitoreo 24/7",
      "Certificados SSL incluidos e instalados",
      "Backups diarios automatizados",
      "Administración técnica completa por Nexoweb",
      "Migración incluida sin tiempo de inactividad",
    ],
    forWho: "Cualquier empresa con presencia web que requiera estabilidad y soporte real.",
    image: "/assets/hosting_service.png",
    timeline: "Activo en 24 – 48 hrs",
    faq: [
      { q: "¿En qué servidores está alojado el hosting?", a: "Usamos infraestructura en AWS, DigitalOcean y servidores dedicados según el plan. Todos están en centros de datos con certificaciones de alta disponibilidad y SLA de 99.9% de uptime." },
      { q: "¿Qué pasa si mi sitio cae fuera de horario laboral?", a: "Nuestro monitoreo es 24/7 y ante una caída activamos alertas automáticas. Para sitios críticos, ofrecemos respuesta de guardia con tiempo de respuesta garantizado, incluso en fines de semana y festivos." },
      { q: "¿Puedo migrar mi sitio actual a su hosting?", a: "Sí. Gestionamos la migración completa de tu sitio actual, bases de datos y correos sin tiempo de inactividad. El proceso es transparente para tus visitantes." },
      { q: "¿El dominio está incluido en el hosting?", a: "No. El hosting cubre exclusivamente la infraestructura, seguridad, SSL y administración técnica de tu sitio. El registro y renovación del dominio se cotiza por separado según la extensión (.com, .com.mx, .mx, .org, etc.). Consulta nuestro servicio de Registro y Administración de Dominios." },
    ],
  },
  {
    title: "Correo Empresarial",
    slug: "correo-empresarial",
    category: "presencia",
    tagline: "Comunícate con profesionalismo desde el primer correo.",
    description:
      "Configuramos y administramos cuentas de correo corporativo con tu dominio propio, integrando las mejores plataformas para garantizar entregabilidad, seguridad y productividad.",
    benefits: [
      "Correos con tu dominio (@tunegocio.mx)",
      "Integración con Google Workspace o Microsoft 365",
      "Configuración en todos los dispositivos",
      "Antispam y filtros de seguridad avanzados",
      "Soporte técnico incluido",
    ],
    forWho: "Empresas que quieren comunicarse con imagen profesional.",
    image: "/assets/hosting_service.png",
    timeline: "Activo en 24 – 48 hrs",
    faq: [
      { q: "¿Usan Google Workspace o Microsoft 365?", a: "Configuramos ambas plataformas según tu preferencia. Google Workspace es ideal para colaboración en la nube y facilidad de uso. Microsoft 365 es preferido en entornos con Outlook y Office ya integrados." },
      { q: "¿Cuántas cuentas puedo tener?", a: "Sin límite. Configura tantas cuentas como colaboradores necesites. Gestionamos grupos de distribución, alias y cuentas compartidas para equipos o áreas de tu empresa." },
      { q: "¿Pueden migrar mis correos actuales al nuevo sistema?", a: "Sí. Migramos histórico completo de correos, contactos y calendarios de tu plataforma actual al nuevo sistema, sin perder ningún mensaje." },
      { q: "¿Cómo se protege el correo de spam y phishing?", a: "Configuramos SPF, DKIM y DMARC en tu dominio más filtros avanzados de antispam. Esto protege la entregabilidad de tus correos y bloquea intentos de suplantación de identidad." },
    ],
  },
  {
    title: "Registro y Administración de Dominios",
    slug: "registro-administracion-dominios",
    category: "presencia",
    tagline: "Tu dominio, administrado y protegido por Nexoweb.",
    description:
      "Registramos y administramos tu dominio con configuración técnica completa: DNS, subdominios, renovaciones y monitoreo de expiración. El nombre de tu marca en internet, siempre a tu nombre y bajo tu control.",
    benefits: [
      "Registro a nombre del cliente, siempre",
      "Configuración DNS y subdominios incluida",
      "Monitoreo de vencimiento con alertas automáticas",
      "Renovaciones gestionadas sin riesgo de pérdida",
      "Soporte técnico ante cualquier cambio o incidencia",
    ],
    forWho: "Empresas que necesitan un dominio registrado correctamente o que quieren delegar la gestión técnica a un equipo confiable.",
    image: "/assets/hosting_service.png",
    timeline: "Activo en 1 – 3 días hábiles",
    faq: [
      { q: "¿El dominio queda a mi nombre?", a: "Siempre. El dominio se registra o transfiere con tus datos como titular. Nexoweb gestiona la parte técnica, pero la titularidad y el control son 100% tuyos." },
      { q: "¿Qué extensiones de dominio manejan?", a: "Trabajamos con .com, .com.mx, .mx, .org, .net, .io y muchas más. El precio varía según la extensión y el registrador. En tu cotización te informamos el costo exacto de la extensión que necesitas." },
      { q: "¿Qué pasa si mi dominio está a punto de vencer?", a: "Con nuestro servicio de administración, monitoreamos la fecha de vencimiento y te notificamos con anticipación para que nunca pierdas tu dominio por olvido o descuido." },
      { q: "¿Pueden transferir un dominio que ya tengo en otro proveedor?", a: "Sí. Gestionamos la transferencia completa de tu dominio desde cualquier registrador (GoDaddy, Namecheap, Google Domains, etc.) sin interrupciones ni tiempo de inactividad." },
    ],
  },
  {
    title: "Posicionamiento SEO",
    slug: "posicionamiento-seo",
    category: "presencia",
    tagline: "Más clientes te encuentran en Google. Sin pagar por clic.",
    description:
      "Implementamos estrategias de posicionamiento orgánico que incrementan la visibilidad de tu sitio web en buscadores, generando tráfico calificado de forma sostenible.",
    benefits: [
      "Auditoría técnica y diagnóstico de visibilidad",
      "Optimización On-Page (contenido, metadatos, estructura)",
      "Link building y autoridad de dominio",
      "Estrategia de palabras clave por intención de compra",
      "Reportes mensuales de posicionamiento y tráfico",
    ],
    forWho: "Empresas que quieren reducir dependencia de publicidad pagada.",
    image: "/assets/marketing_service.png",
    timeline: "Resultados visibles en 90 – 180 días",
    faq: [
      { q: "¿En cuánto tiempo veré resultados?", a: "El SEO orgánico toma tiempo. Los primeros movimientos de posicionamiento se ven entre el mes 2 y 3. Resultados sólidos y tráfico consistente se consolidan entre los 6 y 12 meses. Es una inversión a largo plazo con retorno sostenible." },
      { q: "¿Garantizan el primer lugar en Google?", a: "Nadie puede garantizar posiciones específicas porque Google decide según decenas de factores. Lo que sí garantizamos es aplicar las mejores prácticas, medir resultados y mejorar continuamente tu visibilidad." },
      { q: "¿El SEO sirve si ya invierto en publicidad pagada (Google Ads)?", a: "Son estrategias complementarias. Los Ads te dan tráfico inmediato mientras dures pagando. El SEO construye presencia orgánica que sigue atrayendo clientes sin costo por clic, reduciendo tu dependencia de inversión publicitaria." },
      { q: "¿Qué informes recibiré?", a: "Recibes reporte mensual con posicionamiento de palabras clave, tráfico orgánico, páginas de mayor rendimiento, acciones realizadas ese mes y plan del siguiente. Todo conectado con Google Search Console y Analytics." },
    ],
  },

  // ── MARKETING Y CAPTACIÓN ──────────────────────────────────────────────────
  {
    title: "Marketing Digital",
    slug: "marketing-digital",
    category: "marketing",
    tagline: "Estrategia integral para crecer tu negocio en línea.",
    description:
      "Diseñamos y ejecutamos estrategias de marketing digital completas que combinan publicidad, contenido y análisis para generar demanda predecible y escalable.",
    benefits: [
      "Estrategia multicanal alineada a tus objetivos comerciales",
      "Embudos de captación y conversión optimizados",
      "Gestión de presupuesto publicitario con foco en ROI",
      "Reportes ejecutivos con KPIs de negocio reales",
      "Reuniones de revisión y ajuste estratégico",
    ],
    forWho: "Empresas listas para invertir en crecimiento digital con resultados medibles.",
    image: "/assets/marketing_service.png",
    featured: true,
    timeline: "Estrategia en 2 sem / primeros resultados en 30 días",
    faq: [
      { q: "¿Qué canales digitales manejan?", a: "Google Ads, Meta Ads (Facebook e Instagram), TikTok Ads, SEO, email marketing, contenido y redes sociales. La estrategia define qué combinación tiene mayor ROI para tu negocio específico." },
      { q: "¿Cuánto presupuesto necesito para publicidad?", a: "El presupuesto mínimo recomendado depende del canal y tu mercado. En nuestra primera reunión hacemos un análisis de competencia y te recomendamos un presupuesto realista según tus objetivos." },
      { q: "¿Cómo miden el éxito?", a: "Definimos KPIs desde el inicio: costo por lead, retorno sobre inversión publicitaria (ROAS), conversiones, tráfico calificado. Recibes dashboard en tiempo real y reporte ejecutivo mensual." },
      { q: "¿Trabajan con contrato mensual o por proyecto?", a: "Ofrecemos ambas modalidades. Para estrategias integrales recomendamos contratos mensuales que permiten optimización continua. Para proyectos puntuales (lanzamientos, campañas de temporada) trabajamos por proyecto." },
    ],
  },
  {
    title: "Publicidad en Facebook e Instagram Ads",
    slug: "publicidad-facebook-instagram-ads",
    category: "marketing",
    tagline: "Campañas segmentadas que llegan a tus clientes ideales.",
    description:
      "Creamos, gestionamos y optimizamos campañas de publicidad en Meta (Facebook e Instagram) diseñadas para generar prospectos calificados, ventas y reconocimiento de marca.",
    benefits: [
      "Configuración avanzada de audiencias y segmentación",
      "Diseño de creativos y copywriting persuasivo",
      "Campañas de retargeting a visitantes interesados",
      "Optimización continua de presupuesto y anuncios",
      "Reporte detallado de resultados y conversiones",
    ],
    forWho: "Negocios que quieren captar clientes a través de redes sociales.",
    image: "/assets/marketing_service.png",
    timeline: "Campañas activas en 7 – 10 días",
    faq: [
      { q: "¿Necesito tener muchos seguidores para que funcione?", a: "No. Los Meta Ads se pagan por alcance, no por seguidores orgánicos. Podemos llegar a miles de personas de tu público objetivo aunque tu página tenga pocos fans. Los seguidores ayudan a la credibilidad, pero no son un requisito para anunciar." },
      { q: "¿Quién diseña los anuncios?", a: "Nuestro equipo crea los creativos (imágenes, videos, carruseles) y el copywriting de cada anuncio. Si ya tienes material visual de calidad, podemos usarlo y adaptarlo para los formatos de Meta." },
      { q: "¿Con qué presupuesto mínimo recomiendan iniciar?", a: "Para ver resultados estadísticamente relevantes recomendamos un presupuesto de inversión publicitaria mínimo de $5,000 MXN mensuales. Con menos presupuesto, el algoritmo de Meta no tiene suficientes datos para optimizar." },
      { q: "¿Cómo sé que los leads que llegan son de calidad?", a: "Configuramos la segmentación por demografía, intereses, comportamientos y audiencias similares a tus clientes actuales. Además, implementamos formularios con preguntas de calificación para filtrar prospectos desde el anuncio." },
    ],
  },
  {
    title: "Gestión de Redes Sociales",
    slug: "gestion-redes-sociales",
    category: "marketing",
    tagline: "Contenido que conecta, comunidades que compran.",
    description:
      "Administramos tus redes sociales con una estrategia de contenido clara, consistente y orientada a construir autoridad y relaciones de confianza con tu audiencia.",
    benefits: [
      "Calendario editorial mensual planificado",
      "Diseño de posts y piezas gráficas con tu identidad",
      "Redacción de copys optimizados por plataforma",
      "Gestión de comentarios y mensajes directos",
      "Análisis de métricas y ajuste de estrategia",
    ],
    forWho: "Marcas que quieren mantener presencia activa y relevante en redes sociales.",
    image: "/assets/marketing_service.png",
    timeline: "Operación completa en 7 días",
    faq: [
      { q: "¿Qué redes sociales manejan?", a: "Instagram, Facebook, LinkedIn, TikTok y X (Twitter). La recomendación de plataformas depende de tu industria y dónde está tu audiencia. No todas las marcas necesitan estar en todas las redes." },
      { q: "¿Cuántas publicaciones hacen por semana?", a: "Depende del plan contratado. Nuestros planes van de 3 a 7 publicaciones semanales por red social. Te presentamos el calendario editorial del mes con anticipación para tu revisión y aprobación." },
      { q: "¿Yo puedo aprobar el contenido antes de que se publique?", a: "Sí. Cada mes presentamos el calendario editorial completo con contenido, diseños y copys para tu revisión. Publicamos solo con tu visto bueno." },
      { q: "¿Responden los comentarios y mensajes de mis seguidores?", a: "Sí, gestionamos la comunidad: respondemos comentarios, mensajes directos y consultas dentro del horario definido. Para consultas que requieren respuesta técnica o comercial específica, las redirigimos a tu equipo." },
    ],
  },
  {
    title: "Producción de Contenido Digital",
    slug: "produccion-contenido-digital",
    category: "marketing",
    tagline: "Fotos, videos y piezas que comunican y venden.",
    description:
      "Producimos contenido visual y audiovisual de alta calidad para tus canales digitales: desde fotografía corporativa hasta videos cortos optimizados para redes sociales.",
    benefits: [
      "Fotografía corporativa y de producto",
      "Producción y edición de video (Reels, YouTube, TikTok)",
      "Diseño gráfico para campañas y redes sociales",
      "Animaciones y motion graphics",
      "Guión y dirección de contenido estratégico",
    ],
    forWho: "Marcas que necesitan contenido visual profesional para diferenciarse.",
    image: "/assets/marketing_service.png",
    timeline: "2 – 4 semanas por proyecto",
    faq: [
      { q: "¿La producción se hace en mis instalaciones o en estudio?", a: "Ambas opciones. Para fotografía de producto o corporativa podemos ir a tus instalaciones. Si requieres estudio con fondo neutro, iluminación controlada o set específico, coordinamos el espacio." },
      { q: "¿Los videos están optimizados para redes sociales?", a: "Sí. Editamos en los formatos y proporciones correctas para cada plataforma (9:16 para Reels/TikTok, 16:9 para YouTube, 1:1 para feed) con subtítulos, música libre de derechos y cortes dinámicos." },
      { q: "¿Quién escribe los guiones y la dirección del contenido?", a: "Nuestro equipo desarrolla el guión y la dirección creativa alineados a tu estrategia de marca. Tú apruebas el concepto antes de la producción para asegurarnos de que el mensaje es exactamente el que quieres transmitir." },
      { q: "¿Los archivos finales son míos?", a: "Sí. Entregamos todos los archivos editados en alta resolución, y también los proyectos de edición originales si los necesitas. El contenido producido es 100% de tu propiedad." },
    ],
  },
  {
    title: "Consultoría de Marketing",
    slug: "consultoria-marketing",
    category: "marketing",
    tagline: "Claridad estratégica antes de invertir en publicidad.",
    description:
      "Asesoramos a tu equipo comercial y directivo para definir la estrategia de marketing más efectiva según tu mercado, presupuesto y objetivos de negocio.",
    benefits: [
      "Diagnóstico de presencia digital y competencia",
      "Definición de buyer persona y propuesta de valor",
      "Roadmap de marketing con prioridades por impacto",
      "Selección de canales y presupuesto recomendado",
      "Acompañamiento en implementación y medición",
    ],
    forWho: "Directivos que quieren tomar decisiones de marketing basadas en datos.",
    image: "/assets/marketing_service.png",
    timeline: "Diagnóstico en 1 sem / Estrategia en 3 sem",
    faq: [
      { q: "¿Qué diferencia hay entre consultoría y contratar una agencia?", a: "La consultoría te da la estrategia, los criterios de decisión y el plan. No ejecutamos las campañas (aunque podemos hacerlo si lo decides). Es ideal cuando quieres entender bien el panorama antes de invertir, o cuando tienes un equipo interno que necesita dirección." },
      { q: "¿Pueden trabajar con mi equipo de marketing interno?", a: "Sí, ese es uno de nuestros modelos más comunes. Actuamos como director de marketing externo: diseñamos la estrategia, capacitamos a tu equipo y supervisamos la ejecución sin reemplazarlos." },
      { q: "¿Cuál es el entregable de la consultoría?", a: "Al finalizar recibes un documento ejecutivo con diagnóstico de situación actual, análisis de competencia, buyer personas, roadmap de acciones priorizadas por impacto/esfuerzo, y presupuesto recomendado por canal." },
      { q: "¿Cuántas sesiones incluye el proceso?", a: "El proceso estándar incluye 4 sesiones de trabajo: kick-off, diagnóstico, presentación de estrategia y sesión de preguntas/ajustes. Sesiones adicionales se cotizan por separado si el proyecto lo requiere." },
    ],
  },

  // ── TECNOLOGÍA EMPRESARIAL ─────────────────────────────────────────────────
  {
    title: "CRM y Gestión Comercial",
    slug: "crm-gestion-comercial",
    category: "tecnologia",
    tagline: "Control total sobre tus leads, ventas y clientes.",
    description:
      "Implementamos y desarrollamos sistemas CRM que automatizan tu proceso comercial, eliminan la fuga de oportunidades y dan a tu equipo visibilidad completa del pipeline.",
    benefits: [
      "Configuración de embudos de venta a tu medida",
      "Automatización de seguimiento y recordatorios",
      "Dashboards de métricas comerciales en tiempo real",
      "Integración con formularios web y WhatsApp",
      "Capacitación a tu equipo comercial",
    ],
    forWho: "Equipos de ventas que quieren ordenar su proceso y cerrar más negocios.",
    image: "/assets/crm_service.png",
    featured: true,
    timeline: "4 – 8 semanas",
    faq: [
      { q: "¿Implementan un CRM existente (HubSpot, Pipedrive) o desarrollan uno propio?", a: "Ambas opciones. Si tu empresa necesita un flujo estándar, configuramos e implementamos HubSpot, Pipedrive o similar con las integraciones necesarias. Si tus procesos son muy específicos, desarrollamos un CRM a medida que se adapta exactamente a tu forma de vender." },
      { q: "¿Se puede integrar con WhatsApp para el seguimiento de leads?", a: "Sí. Integramos la API oficial de WhatsApp Business para que los mensajes, conversaciones y seguimientos queden registrados automáticamente en el CRM de cada prospecto." },
      { q: "¿Mi equipo de ventas necesita mucha capacitación para usarlo?", a: "Diseñamos los flujos con simplicidad operativa en mente. Incluimos sesiones de capacitación práctica y documentación de usuario. En promedio, un vendedor domina el sistema en 1-2 semanas de uso diario." },
      { q: "¿El CRM puede generar reportes y métricas comerciales?", a: "Sí. Configuramos dashboards con métricas clave: leads por canal, tasa de conversión por etapa, tiempo promedio de cierre, rendimiento por vendedor y proyección de ventas. Visibilidad completa del pipeline en tiempo real." },
    ],
  },
  {
    title: "Plataformas Empresariales (Enterprise)",
    slug: "plataformas-empresariales-enterprise",
    category: "tecnologia",
    tagline: "Sistemas a medida para gestionar y escalar tu negocio.",
    description:
      "Desarrollamos plataformas empresariales robustas que centralizan la operación, conectan equipos y automatizan procesos complejos en una sola solución.",
    benefits: [
      "Arquitectura escalable y modular",
      "Roles, permisos y flujos de aprobación",
      "Integración con ERP, contabilidad y logística",
      "Módulos personalizados por área del negocio",
      "Soporte técnico y evolución continua",
    ],
    forWho: "Empresas con operaciones complejas que superaron las herramientas genéricas.",
    image: "/assets/crm_service.png",
    featured: true,
    timeline: "12 – 20 semanas (por fases)",
    faq: [
      { q: "¿Qué tipo de empresas necesitan una plataforma enterprise?", a: "Empresas que tienen procesos complejos que las herramientas genéricas (Excel, software estándar) ya no pueden manejar bien: múltiples sucursales, flujos de aprobación complejos, integración de áreas, o volúmenes de operación que requieren automatización." },
      { q: "¿Cuánto tiempo lleva desarrollar una plataforma de este tipo?", a: "Desarrollamos por fases. Una primera versión funcional con los módulos más críticos puede estar lista en 12-14 semanas. Las fases siguientes añaden módulos adicionales en ciclos de 4-6 semanas." },
      { q: "¿Qué pasa si cambian mis procesos o necesidades en el futuro?", a: "Construimos con arquitectura modular precisamente para esto. Agregar, modificar o eliminar módulos no implica rehacer el sistema. La plataforma evoluciona con tu empresa." },
      { q: "¿Pueden reemplazar un ERP o sistema heredado que ya uso?", a: "Sí. Hacemos migración de datos desde el sistema actual, garantizando que el historial y la información crítica se preserven. También podemos hacer una transición gradual donde ambos sistemas conviven mientras tu equipo se adapta." },
    ],
  },
  {
    title: "Inteligencia Artificial",
    slug: "inteligencia-artificial",
    category: "tecnologia",
    tagline: "IA aplicada a procesos reales de tu empresa.",
    description:
      "Implementamos soluciones de inteligencia artificial que optimizan decisiones, automatizan tareas repetitivas y mejoran la experiencia de tus clientes con tecnología de punta.",
    benefits: [
      "Chatbots y asistentes virtuales inteligentes",
      "Análisis predictivo de ventas y demanda",
      "Automatización de clasificación y procesamiento de datos",
      "Personalización de experiencias con Machine Learning",
      "Integración con modelos de lenguaje (LLMs)",
    ],
    forWho: "Empresas que quieren ventaja competitiva a través de tecnología inteligente.",
    image: "/assets/crm_service.png",
    featured: true,
    timeline: "6 – 12 semanas según complejidad",
    faq: [
      { q: "¿Necesito mucha infraestructura para implementar IA?", a: "No necesariamente. Muchas soluciones de IA corren sobre APIs de modelos existentes (OpenAI, Anthropic, Google) sin infraestructura propia. Evaluamos en la propuesta qué arquitectura tiene mejor relación costo-beneficio para tu caso." },
      { q: "¿Un chatbot de IA puede reemplazar a mi equipo de atención?", a: "Puede automatizar entre el 60-80% de las consultas repetitivas, liberando a tu equipo para atender casos complejos. No lo vemos como reemplazo sino como multiplicador: tu equipo hace más con menos esfuerzo rutinario." },
      { q: "¿Los datos de mi empresa se usan para entrenar modelos externos?", a: "No. Usamos APIs de inferencia donde tus datos se procesan pero no se usan para reentrenar modelos globales. Para casos sensibles implementamos modelos on-premise o en tu propio entorno cloud privado." },
      { q: "¿Cómo sé si la IA está tomando buenas decisiones?", a: "Implementamos dashboards de monitoreo y métricas de calidad para cada solución. Definimos umbrales de confianza y mecanismos de revisión humana para casos límite. La IA se audita, no opera como caja negra." },
    ],
  },
  {
    title: "Automatización de Procesos",
    slug: "automatizacion-de-procesos",
    category: "tecnologia",
    tagline: "Menos trabajo manual. Más tiempo para lo que importa.",
    description:
      "Digitalizamos y automatizamos los procesos operativos de tu empresa para reducir errores, ahorrar tiempo y aumentar la productividad de tu equipo.",
    benefits: [
      "Mapeo y diagnóstico de procesos actuales",
      "Automatización de flujos de aprobación y notificaciones",
      "Integración entre herramientas y plataformas (Zapier, n8n, APIs)",
      "Automatización de reportes y tareas recurrentes",
      "Medición de productividad antes y después",
    ],
    forWho: "Empresas con procesos manuales o repetitivos que consumen tiempo del equipo.",
    image: "/assets/crm_service.png",
    timeline: "3 – 6 semanas por proceso",
    faq: [
      { q: "¿Cómo identifican qué procesos automatizar primero?", a: "Hacemos un mapeo de procesos y los evaluamos por: tiempo que consumen, frecuencia, tasa de error y estandarización. Los de mayor impacto y menor complejidad van primero, generando ahorro rápido." },
      { q: "¿Qué herramientas usan para automatizar?", a: "Dependiendo del caso usamos n8n, Make, Zapier para integraciones entre plataformas SaaS, o desarrollamos flujos custom con código si la lógica es compleja. No dependemos de una sola herramienta." },
      { q: "¿Qué pasa si el proceso automatizado falla?", a: "Configuramos alertas automáticas ante errores y mecanismos de reintentos. Cada automatización tiene logs de ejecución que permiten diagnosticar y corregir fallas rápidamente. Incluimos monitoreo proactivo." },
      { q: "¿Pueden automatizar procesos que involucran personas externas (clientes, proveedores)?", a: "Sí. Diseñamos flujos que incluyen notificaciones, formularios y acciones tanto para tu equipo interno como para partes externas: clientes que aprueban, proveedores que confirman, etc." },
    ],
  },
  {
    title: "Business Intelligence y Dashboards",
    slug: "business-intelligence-dashboards",
    category: "tecnologia",
    tagline: "Toma decisiones con datos, no con suposiciones.",
    description:
      "Diseñamos e implementamos sistemas de Business Intelligence y dashboards ejecutivos que convierten datos dispersos en información accionable para tu dirección.",
    benefits: [
      "Centralización de datos desde múltiples fuentes",
      "Dashboards interactivos por área (ventas, finanzas, ops)",
      "KPIs y alertas configuradas por objetivo",
      "Reportes automatizados para dirección y consejo",
      "Capacitación en lectura e interpretación de datos",
    ],
    forWho: "Directivos y gerentes que necesitan visibilidad real del negocio.",
    image: "/assets/crm_service.png",
    timeline: "4 – 6 semanas",
    faq: [
      { q: "¿De qué fuentes de datos pueden extraer información?", a: "Prácticamente cualquier fuente: bases de datos SQL/NoSQL, archivos Excel/CSV, APIs de plataformas (Shopify, HubSpot, Meta, Google Analytics), sistemas contables y ERP. Si tiene datos, podemos conectarlo." },
      { q: "¿Los dashboards se actualizan en tiempo real?", a: "Depende del diseño. Para métricas críticas de ventas o operación configuramos actualización en tiempo real o cada pocos minutos. Para reportes directivos, actualizaciones diarias o semanales son suficientes y más eficientes." },
      { q: "¿Necesito conocimientos técnicos para usar los dashboards?", a: "No. Los dashboards se diseñan para que cualquier directivo o gerente pueda explorarlos sin capacitación técnica: filtros intuitivos, gráficas claras y métricas explicadas en lenguaje de negocio, no de sistemas." },
      { q: "¿Pueden hacer dashboards específicos por área (finanzas, ventas, operaciones)?", a: "Sí, y es la práctica recomendada. Cada área ve solo los datos relevantes para sus decisiones. Configuramos permisos para que el dashboard de finanzas no sea accesible para el equipo de ventas, y viceversa." },
    ],
  },
  {
    title: "Integración de Sistemas",
    slug: "integracion-de-sistemas",
    category: "tecnologia",
    tagline: "Conecta tus plataformas. Elimina la captura manual.",
    description:
      "Conectamos las aplicaciones y plataformas que ya usa tu empresa para que compartan información automáticamente, eliminando silos de datos y trabajo duplicado.",
    benefits: [
      "Integración vía APIs REST y webhooks",
      "Sincronización bidireccional entre sistemas",
      "Conexión con ERP, CRM, e-commerce y más",
      "Monitoreo de integraciones y alertas de falla",
      "Documentación técnica de cada integración",
    ],
    forWho: "Empresas con múltiples herramientas que no se comunican entre sí.",
    image: "/assets/crm_service.png",
    timeline: "3 – 5 semanas por integración",
    faq: [
      { q: "¿Qué sistemas pueden conectar?", a: "Cualquier sistema que tenga API o base de datos accesible: SAP, Salesforce, HubSpot, Shopify, WooCommerce, QuickBooks, sistemas a medida, apps propias, plataformas de logística, entre otros." },
      { q: "¿Qué pasa si uno de los sistemas no tiene API?", a: "Exploramos alternativas: integraciones por base de datos directa, exportación/importación automatizada de archivos, o scraping controlado. En casos extremos, documentamos por qué la integración no es viable." },
      { q: "¿La sincronización es en tiempo real?", a: "Depende del caso y la criticidad. Para movimientos de inventario o estados de pedidos suele ser en tiempo real o cada minuto. Para sincronización de catálogos o reportes, procesos por lotes cada hora o noche son más eficientes." },
      { q: "¿Qué pasa si una integración falla y los datos se desincronizan?", a: "Implementamos mecanismos de detección de fallas, alertas automáticas y procedimientos de reconciliación. Cada integración tiene logs de transacciones que permiten identificar y revertir errores." },
    ],
  },
  {
    title: "Soluciones en la Nube",
    slug: "soluciones-en-la-nube",
    category: "tecnologia",
    tagline: "Migra, escala y opera con infraestructura cloud profesional.",
    description:
      "Diseñamos, implementamos y administramos arquitecturas cloud que dan a tu empresa la escalabilidad, seguridad y disponibilidad que una operación moderna exige.",
    benefits: [
      "Migración de sistemas on-premise a la nube",
      "Arquitectura serverless y contenedores (Docker/K8s)",
      "Alta disponibilidad y balanceo de carga",
      "Backups automatizados y recuperación ante desastres",
      "Gestión y monitoreo de infraestructura cloud",
    ],
    forWho: "Empresas que quieren infraestructura flexible, segura y escalable.",
    image: "/assets/hosting_service.png",
    timeline: "3 – 8 semanas según escala",
    faq: [
      { q: "¿En qué nube trabajan: AWS, Azure o Google Cloud?", a: "Trabajamos principalmente con AWS y DigitalOcean para la mayoría de los proyectos. Si tu empresa ya tiene acuerdo con Azure o Google Cloud, también los gestionamos. La elección depende de tus necesidades y costos." },
      { q: "¿La migración a la nube interrumpe mi operación?", a: "Diseñamos la migración para hacerla con cero downtime o interrupciones mínimas planificadas fuera de horario laboral. Hacemos pruebas completas en ambiente paralelo antes de hacer el cambio definitivo." },
      { q: "¿Cómo controlan los costos de la nube para que no se disparen?", a: "Implementamos alertas de gasto, revisiones de recursos infrautilizados y optimización de instancias. También configuramos auto-scaling para que pagues exactamente lo que usas, ni más ni menos." },
      { q: "¿Quién administra la infraestructura después de implementada?", a: "Ofrecemos administración continua como servicio: monitoreo, actualizaciones de seguridad, optimización de costos y soporte ante incidentes. También podemos transferir la administración a tu equipo IT con documentación completa." },
    ],
  },
  {
    title: "Ciberseguridad y Protección de Datos",
    slug: "ciberseguridad-proteccion-datos",
    category: "tecnologia",
    tagline: "Protege tu información y la de tus clientes.",
    description:
      "Implementamos estrategias de ciberseguridad para proteger los sistemas, datos y operación de tu empresa contra amenazas digitales, cumpliendo con estándares de privacidad.",
    benefits: [
      "Auditoría de vulnerabilidades y riesgos",
      "Implementación de políticas de acceso y autenticación",
      "Cifrado de datos en tránsito y en reposo",
      "Monitoreo de amenazas y respuesta a incidentes",
      "Cumplimiento de regulaciones (LFPDPPP, GDPR)",
    ],
    forWho: "Empresas que manejan información sensible de clientes o procesos críticos.",
    image: "/assets/support_service.png",
    timeline: "4 – 8 semanas",
    faq: [
      { q: "¿Por dónde empezar si no sé qué tan vulnerable está mi empresa?", a: "Con una auditoría de vulnerabilidades. Analizamos tu infraestructura, aplicaciones y políticas de acceso para darte un diagnóstico priorizado: qué riesgos atender primero según su impacto potencial." },
      { q: "¿Qué regulaciones de privacidad aplican a mi empresa en México?", a: "La Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) aplica a cualquier empresa que maneje datos personales de mexicanos. Si tienes clientes o empleados en Europa, también aplica el GDPR. Te asesoramos en el cumplimiento de ambas." },
      { q: "¿Hacen pruebas de penetración (pentesting)?", a: "Sí. Realizamos pruebas de penetración controladas para identificar vulnerabilidades reales antes de que lo haga alguien con malas intenciones. Los hallazgos se documentan con nivel de riesgo y plan de remediación." },
      { q: "¿Qué hacemos si sufrimos un ataque o brecha de datos?", a: "Ofrecemos servicio de respuesta a incidentes: contención del ataque, análisis forense para determinar el alcance, notificación a las autoridades si aplica y plan de recuperación. Es importante tener esto definido antes de que ocurra un incidente." },
    ],
  },
  {
    title: "Infraestructura Tecnológica",
    slug: "infraestructura-tecnologica",
    category: "tecnologia",
    tagline: "Redes, servidores y plataformas para que tu empresa funcione.",
    description:
      "Diseñamos e implementamos la infraestructura tecnológica que soporta la operación diaria de tu empresa: redes, servidores, equipos y plataformas de trabajo.",
    benefits: [
      "Diseño y configuración de redes LAN/WAN",
      "Administración de servidores físicos y virtuales",
      "Configuración de estaciones de trabajo y equipos",
      "Implementación de VPN y acceso remoto seguro",
      "Soporte técnico preventivo y correctivo",
    ],
    forWho: "Empresas que necesitan infraestructura tecnológica confiable y bien administrada.",
    image: "/assets/support_service.png",
    timeline: "2 – 5 semanas según alcance",
    faq: [
      { q: "¿Pueden diseñar la red de una oficina nueva o sucursal?", a: "Sí. Desde el diseño lógico de la red (segmentación, VLANs, políticas de acceso) hasta la instalación física de cableado estructurado, switches, access points y firewall. Entregamos documentación completa." },
      { q: "¿Manejan equipos de diferentes marcas?", a: "Sí. Trabajamos con Cisco, HP, Ubiquiti, MikroTik, Dell y otras marcas comunes en el mercado empresarial. También podemos recomendarte la mejor opción según tu presupuesto y necesidades de rendimiento." },
      { q: "¿Qué incluye el mantenimiento preventivo?", a: "Revisión periódica de firmware y parches de seguridad en equipos, limpieza física de servidores, verificación de backups, monitoreo de capacidad y rendimiento, y reporte de estado general de la infraestructura." },
      { q: "¿Pueden dar soporte remoto a equipos y usuarios en distintas ubicaciones?", a: "Sí. Configuramos herramientas de acceso remoto seguro que nos permiten resolver incidentes y dar soporte a tus usuarios en cualquier ubicación sin necesidad de desplazamiento, reduciendo tiempos de atención." },
    ],
  },
  {
    title: "Soporte Técnico IT",
    slug: "soporte-tecnico-it",
    category: "tecnologia",
    tagline: "Tu departamento de sistemas, sin el costo de uno interno.",
    description:
      "Operamos como el equipo de IT de tu empresa: desde la resolución de incidentes hasta el mantenimiento preventivo y la gestión de licencias y usuarios.",
    benefits: [
      "Mesa de ayuda remota con tiempo de respuesta garantizado",
      "Gestión de usuarios y licencias (Google Workspace / M365)",
      "Mantenimiento preventivo de software y equipos",
      "Parches de emergencia en sitios web",
      "Asesoría continua en decisiones tecnológicas",
    ],
    forWho: "Empresas sin equipo IT interno que necesitan soporte profesional continuo.",
    image: "/assets/support_service.png",
    timeline: "Servicio activo en 48 hrs",
    faq: [
      { q: "¿Cuánto cuesta comparado con tener un empleado IT interno?", a: "Un empleado IT en México cuesta entre $15,000 y $35,000 MXN mensuales más prestaciones. Nuestros planes de soporte IT parten de una fracción de ese costo, con acceso a un equipo multidisciplinario en lugar de una sola persona." },
      { q: "¿Cuál es el tiempo de respuesta garantizado?", a: "Depende del plan. Nuestros planes estándar garantizan respuesta en 4 horas hábiles para incidentes críticos y 8 horas para solicitudes normales. Los planes premium ofrecen respuesta en 1 hora para emergencias." },
      { q: "¿Pueden dar soporte a usuarios en home office o múltiples oficinas?", a: "Sí. El soporte remoto es el núcleo del servicio. Usamos herramientas de acceso remoto seguro para resolver el 90% de los incidentes sin necesidad de visita presencial." },
      { q: "¿Qué pasa con las licencias de software que ya tengo?", a: "Las auditamos, consolidamos y gestionamos. Muchas empresas tienen licencias duplicadas o subutilizadas. Identificamos ahorros y garantizamos que todo el software esté correctamente licenciado y actualizado." },
    ],
  },
  {
    title: "Gestión Documental Digital",
    slug: "gestion-documental-digital",
    category: "tecnologia",
    tagline: "Digitaliza, organiza y controla tus documentos empresariales.",
    description:
      "Implementamos sistemas de gestión documental que eliminan el papel, organizan la información y permiten acceso seguro a los documentos correctos en el momento correcto.",
    benefits: [
      "Digitalización y clasificación de documentos físicos",
      "Sistema de versionado y control de cambios",
      "Flujos de aprobación y firma digital",
      "Búsqueda avanzada y etiquetado inteligente",
      "Control de acceso por usuario y departamento",
    ],
    forWho: "Empresas con volúmenes altos de documentación que necesitan orden y trazabilidad.",
    image: "/assets/crm_service.png",
    timeline: "4 – 7 semanas",
    faq: [
      { q: "¿La firma digital tiene validez legal en México?", a: "Sí. La firma electrónica avanzada tiene plena validez legal en México conforme al Código de Comercio y la Ley de Firma Electrónica Avanzada. Usamos proveedores certificados para garantizar la autenticidad e integridad de los documentos." },
      { q: "¿Pueden digitalizar documentos físicos en papel?", a: "Sí. Coordinamos el proceso de digitalización masiva: escaneo, nomenclatura, indexación y carga al sistema. Para volúmenes muy altos, trabajamos con aliados especializados en digitalización documental." },
      { q: "¿Qué tan fácil es encontrar un documento específico después?", a: "El sistema incluye búsqueda por texto completo (OCR), metadatos, etiquetas y filtros por fecha, tipo, área o autor. Encontrar un documento toma segundos en lugar de minutos buscando en carpetas físicas." },
      { q: "¿Se puede acceder desde cualquier lugar y dispositivo?", a: "Sí. El sistema es 100% web y responsive. Tus equipos pueden acceder desde oficina, home office o campo desde cualquier navegador con sus credenciales y los permisos que les correspondan." },
    ],
  },
  {
    title: "Respaldo y Recuperación de Información",
    slug: "respaldo-recuperacion-informacion",
    category: "tecnologia",
    tagline: "Tus datos protegidos. Tu negocio, sin interrupciones.",
    description:
      "Diseñamos e implementamos estrategias de backup y recuperación ante desastres para garantizar la continuidad operativa de tu empresa ante cualquier incidente.",
    benefits: [
      "Backups automáticos en múltiples ubicaciones",
      "Plan de recuperación ante desastres (DRP)",
      "Pruebas periódicas de restauración",
      "Retención de datos configurable por política",
      "Alertas de fallo y monitoreo de respaldos",
    ],
    forWho: "Empresas que no pueden permitirse perder información crítica.",
    image: "/assets/support_service.png",
    timeline: "1 – 2 semanas para implementar",
    faq: [
      { q: "¿Con qué frecuencia se hacen los respaldos?", a: "Depende de la criticidad de tus datos. Los backups pueden ser continuos (replicación en tiempo real), horarios, diarios o semanales. Definimos la frecuencia correcta según cuánto tiempo de datos puedes permitirte perder en el peor caso (RPO)." },
      { q: "¿Cuánto tiempo tarda recuperar la operación si algo falla?", a: "El tiempo de recuperación (RTO) depende del plan de contingencia diseñado. Para sistemas críticos, diseñamos recuperación en minutos u horas. Para sistemas menos críticos, en horas o días. Lo definimos y lo probamos antes de necesitarlo." },
      { q: "¿Los backups están protegidos contra ransomware?", a: "Sí. Implementamos respaldos inmutables e aislados de la red principal, de modo que un ataque de ransomware no pueda cifrar o eliminar las copias de seguridad. Es la protección más efectiva contra este tipo de amenaza." },
      { q: "¿Cómo sé que mis backups realmente funcionan?", a: "Realizamos pruebas de restauración periódicas y documentadas. Un backup que nunca se prueba es un backup del que no puedes fiarte. Te entregamos reporte de cada prueba exitosa." },
    ],
  },
  {
    title: "Sistemas de Gestión Operativa",
    slug: "sistemas-gestion-operativa",
    category: "tecnologia",
    tagline: "Controla operaciones, inventarios y logística desde un solo lugar.",
    description:
      "Desarrollamos e implementamos sistemas que centralizan la gestión operativa de tu empresa: inventarios, logística, calidad, producción y más, desde una sola plataforma.",
    benefits: [
      "Módulos de inventario y control de stock",
      "Gestión de pedidos y logística",
      "Control de calidad e indicadores operativos",
      "Integración con proveedores y clientes",
      "Reportes operativos y tableros de control",
    ],
    forWho: "Empresas de manufactura, distribución o servicios con operaciones complejas.",
    image: "/assets/crm_service.png",
    timeline: "8 – 14 semanas",
    faq: [
      { q: "¿Esto reemplaza a un ERP?", a: "Puede ser una alternativa o un complemento. Para empresas que no necesitan todo lo que ofrece un ERP genérico (y no quieren pagar por ello), desarrollamos exactamente los módulos operativos que necesitas, sin funciones que nunca usarás." },
      { q: "¿Puede conectarse con mi sistema de ventas o e-commerce?", a: "Sí. Integramos con plataformas de ventas como Shopify, WooCommerce o sistemas propios para que los pedidos fluyan automáticamente al módulo de operaciones sin captura manual." },
      { q: "¿Cómo maneja el sistema múltiples almacenes o sucursales?", a: "Diseñamos la arquitectura multi-almacén desde el inicio si tu operación lo requiere. Cada ubicación gestiona su inventario y los movimientos entre almacenes se registran con trazabilidad completa." },
      { q: "¿Pueden los proveedores o clientes acceder a ciertos datos del sistema?", a: "Sí. Podemos implementar portales de acceso externo donde tus proveedores confirman pedidos, actualizan embarques o consultan facturas, y tus clientes rastrean el estado de sus órdenes, todo sin exponer datos internos sensibles." },
    ],
  },
  {
    title: "Transformación Digital",
    slug: "transformacion-digital",
    category: "tecnologia",
    tagline: "Moderniza tu empresa con tecnología, innovación y visión estratégica.",
    description:
      "Acompañamos a las organizaciones en su proceso de transformación digital: desde el diagnóstico de madurez tecnológica hasta la implementación de nuevas formas de operar.",
    benefits: [
      "Diagnóstico de madurez digital por área",
      "Roadmap de transformación por etapas",
      "Gestión del cambio y capacitación de equipos",
      "Implementación de herramientas y metodologías ágiles",
      "Seguimiento de adopción y resultados",
    ],
    forWho: "Organizaciones que quieren competir en la economía digital con estructura.",
    image: "/assets/crm_service.png",
    timeline: "3 – 18 meses (proceso por fases)",
    faq: [
      { q: "¿Por dónde se empieza un proceso de transformación digital?", a: "Por el diagnóstico. Evaluamos la madurez digital de cada área de tu empresa: ventas, operaciones, marketing, finanzas y RH. Identificamos dónde hay mayor brecha y mayor oportunidad de impacto para construir el roadmap." },
      { q: "¿Qué pasa con los empleados que resisten el cambio tecnológico?", a: "La gestión del cambio es parte del proceso, no un extra. Diseñamos planes de capacitación graduales, comunicamos el porqué del cambio, y medimos la adopción. Las empresas que fallan en transformación digital lo hacen por personas, no por tecnología." },
      { q: "¿Cuánto tiempo toma ver resultados reales?", a: "Los primeros resultados tangibles (eficiencia, reducción de errores, visibilidad) suelen verse en los primeros 90 días de la primera fase. La transformación completa es un proceso de 12-24 meses, pero con victorias rápidas que mantienen el impulso." },
      { q: "¿Trabajamos con metodologías ágiles o tradicionales?", a: "Usamos metodologías ágiles adaptadas al contexto empresarial: sprints cortos, entregables concretos, revisión constante. Esto permite ajustar la dirección según los aprendizajes sin comprometer el plan completo." },
    ],
  },
  {
    title: "Consultoría Tecnológica",
    slug: "consultoria-tecnologica",
    category: "tecnologia",
    tagline: "Asesoría experta para tomar las decisiones tecnológicas correctas.",
    description:
      "Asesoramos a directivos y equipos de TI en la selección, implementación y evolución de la tecnología que mejor se adapta a los objetivos y realidades de su empresa.",
    benefits: [
      "Evaluación de arquitectura y stack tecnológico actual",
      "Recomendación de soluciones con base en ROI",
      "Due diligence tecnológico para inversiones",
      "Selección de proveedores y herramientas",
      "Revisión periódica de estrategia tecnológica",
    ],
    forWho: "Directivos que quieren tomar decisiones de tecnología con criterio experto.",
    image: "/assets/crm_service.png",
    timeline: "2 – 4 semanas",
    faq: [
      { q: "¿Para qué sirve la consultoría tecnológica si ya tengo un equipo IT?", a: "Tu equipo IT conoce tu operación interna. Nosotros aportamos perspectiva externa, conocimiento del mercado de soluciones y experiencia en proyectos de distintas industrias. Es la combinación que produce las mejores decisiones." },
      { q: "¿Pueden hacer due diligence tecnológico para una adquisición o inversión?", a: "Sí. Evaluamos la deuda técnica, calidad del código, escalabilidad, seguridad y viabilidad del equipo de una empresa que estás considerando adquirir o en la que vas a invertir. Un reporte técnico independiente antes de cerrar." },
      { q: "¿Tienen conflicto de interés al recomendar proveedores?", a: "No tenemos acuerdos de referido con proveedores de software. Nuestras recomendaciones se basan exclusivamente en el mejor fit para tus necesidades, presupuesto y capacidades de tu equipo." },
      { q: "¿La consultoría incluye acompañamiento en la implementación?", a: "La consultoría estándar entrega estrategia y recomendaciones. Si decides que también ejecutemos la implementación, lo hacemos como un proyecto separado con su propia propuesta. No te dejamos con un documento y sin apoyo." },
    ],
  },
  {
    title: "Calidad y Mejora Continua Digital",
    slug: "calidad-mejora-continua-digital",
    category: "tecnologia",
    tagline: "Herramientas para gestionar calidad, auditorías e indicadores.",
    description:
      "Implementamos sistemas digitales para la gestión de calidad que permiten a tu empresa medir, controlar y mejorar continuamente sus procesos con trazabilidad total.",
    benefits: [
      "Digitalización de procesos de calidad (ISO, Six Sigma)",
      "Módulos de auditorías internas y externas",
      "Indicadores de desempeño por proceso",
      "Gestión de no conformidades y acciones correctivas",
      "Reportes de cumplimiento para certificaciones",
    ],
    forWho: "Empresas que buscan certificaciones o estandarización de procesos.",
    image: "/assets/crm_service.png",
    timeline: "6 – 10 semanas",
    faq: [
      { q: "¿El sistema ayuda a obtener certificaciones ISO?", a: "Sí. Digitalizamos los registros, evidencias y procedimientos que los auditores ISO requieren. El sistema garantiza que la documentación esté actualizada, trazable y accesible para cualquier auditoría interna o externa." },
      { q: "¿Puede usarlo personal de operación sin formación en calidad?", a: "Sí. Diseñamos formularios y flujos simplificados para el personal operativo. Registran evidencias, reportan no conformidades y cierran acciones correctivas con una interfaz intuitiva, sin necesidad de entender el marco normativo completo." },
      { q: "¿Cómo se gestiona una no conformidad dentro del sistema?", a: "Se registra la no conformidad, se asigna responsable, se define la acción correctiva con fecha límite, el sistema envía recordatorios automáticos y registra el cierre con evidencia. Todo queda trazado para auditoría." },
      { q: "¿El sistema puede adaptarse a normas distintas a ISO (FSSC, IATF, etc.)?", a: "Sí. El sistema es configurable para distintos marcos normativos. La estructura de auditorías, indicadores y controles se adapta a los requisitos del estándar que tu empresa necesite certificar o mantener." },
    ],
  },
  {
    title: "Soluciones Digitales para Iglesias",
    slug: "soluciones-digitales-iglesias",
    category: "tecnologia",
    tagline: "Tecnología diseñada para instituciones religiosas y sin fines de lucro.",
    description:
      "Desarrollamos plataformas digitales especializadas para iglesias e instituciones: sitios web institucionales, streaming en vivo, apps de congregación y sistemas de gestión pastoral.",
    benefits: [
      "Sitio web institucional con calendario de eventos",
      "Plataforma de streaming para cultos y conferencias",
      "App móvil para la congregación",
      "Sistema de gestión pastoral y membresía",
      "Herramientas de comunicación interna",
    ],
    forWho: "Iglesias e instituciones religiosas que quieren conectar con su comunidad digitalmente.",
    image: "/assets/crm_service.png",
    timeline: "4 – 8 semanas",
    faq: [
      { q: "¿El streaming funciona en YouTube, Facebook y el sitio al mismo tiempo?", a: "Sí. Configuramos transmisión simultánea (multistreaming) a YouTube, Facebook y cualquier otra plataforma, además de embed en el sitio institucional para quienes prefieren verlo ahí." },
      { q: "¿El sistema de membresía puede manejar diezmos y ofrendas digitales?", a: "Sí. Integramos pasarelas de pago para recepción de diezmos, ofrendas y donaciones en línea con comprobantes automáticos y reportes financieros para la administración de la institución." },
      { q: "¿La app móvil puede enviar notificaciones a la congregación?", a: "Sí. Notificaciones push para eventos, transmisiones en vivo, mensajes del pastor, recursos y devocionales. El equipo administrativo las gestiona desde un panel web sin necesidad de conocimientos técnicos." },
      { q: "¿Tienen experiencia con instituciones religiosas?", a: "Sí. Hemos trabajado con iglesias de distintas denominaciones y entendemos sus necesidades específicas: gestión de membresía familiar, grupos celulares, control de asistencia y comunicación pastoral. No adaptamos soluciones genéricas, diseñamos para este contexto." },
    ],
  },
];

// ─── Servicios destacados (home) ──────────────────────────────────────────────

export const featuredServices = services.filter((s) => s.featured);

// ─── Proceso ─────────────────────────────────────────────────────────────────

export const process = [
  {
    step: "01",
    title: "Descubrimiento del negocio",
    text: "Conocemos tu empresa, tus objetivos y los retos que quieres resolver. Sin tecnicismos, con escucha real.",
  },
  {
    step: "02",
    title: "Propuesta personalizada",
    text: "Diseñamos la solución técnica y comercial alineada a tu realidad. Alcance claro, precio transparente, sin letra chica.",
  },
  {
    step: "03",
    title: "Diseño y validación",
    text: "Antes de escribir código, validamos contigo el diseño, el flujo y la experiencia. Tu aprobación define el rumbo.",
  },
  {
    step: "04",
    title: "Desarrollo iterativo",
    text: "Implementamos por sprints con entregas semanales. Tienes visibilidad del avance en todo momento.",
  },
  {
    step: "05",
    title: "Implementación",
    text: "Lanzamos en producción con pruebas exhaustivas. Nos aseguramos de que todo funcione desde el primer día.",
  },
  {
    step: "06",
    title: "Capacitación",
    text: "Tu equipo aprende a usar lo que construimos juntos. No entregamos y desaparecemos — te acompañamos en la curva de adopción.",
  },
  {
    step: "07",
    title: "Acompañamiento posterior",
    text: "Soporte continuo, mejoras iterativas y evolución constante. Crecemos contigo a largo plazo.",
  },
];

// ─── Diferenciadores ──────────────────────────────────────────────────────────

export const differentiators = [
  {
    title: "Tres capacidades, un solo equipo",
    text: "Diseño, marketing, desarrollo de software e infraestructura tecnológica bajo el mismo techo. No necesitas coordinar múltiples proveedores ni explicar tu negocio a distintos equipos. Un solo interlocutor que entiende todo el ecosistema.",
    icon: "Layers",
  },
  {
    title: "Empresa mexicana con presencia local",
    text: "Basados en Saltillo, Coahuila, operamos en todo México. Conocemos el mercado local, respondemos en tu zona horaria y entendemos el contexto de las empresas que quieren crecer en México. Sin barreras de idioma ni de horario.",
    icon: "MapPin",
  },
  {
    title: "Metodología ágil con visibilidad total",
    text: "Trabajamos en sprints semanales con entregas y reportes constantes. En todo momento sabes exactamente en qué etapa está tu proyecto, qué se completó y qué sigue. Sin cajas negras ni sorpresas al final del proceso.",
    icon: "Zap",
  },
  {
    title: "Tu tecnología, tu propiedad",
    text: "Todo lo que construimos es tuyo: código fuente, dominios, bases de datos, accesos e infraestructura. Sin dependencias propietarias ni cláusulas de permanencia. Si el día de mañana decides continuar con otro equipo, te entregamos todo sin restricciones.",
    icon: "Shield",
  },
  {
    title: "Acceso directo al equipo técnico",
    text: "No tienes que pasar por ejecutivos de cuenta ni help desks genéricos. Hablas directamente con el equipo que diseñó y construyó tu solución. La respuesta es más rápida, más precisa y sin pérdida de contexto entre intermediarios.",
    icon: "Headphones",
  },
  {
    title: "Orientados a resultados de negocio",
    text: "No medimos nuestro trabajo en horas facturadas ni en entregables. Lo medimos en crecimiento, eficiencia operativa y rentabilidad para tu empresa. Cada solución que construimos tiene un objetivo de negocio claro desde el primer día.",
    icon: "TrendingUp",
  },
];

// ─── Métricas ─────────────────────────────────────────────────────────────────

export const metrics = [
  { value: "31", label: "servicios tecnológicos especializados" },
  { value: "360°", label: "solución integral en un solo equipo" },
  { value: "24/7", label: "soporte y monitoreo de infraestructura" },
  { value: "100%", label: "propiedad de tu tecnología e infraestructura" },
];

// ─── Portafolio ───────────────────────────────────────────────────────────────

export const portfolioCases = [
  {
    name: "Alpha Dent Service",
    slug: "alpha-dent-service",
    client: "Alpha Dent",
    result: "Ecosistema digital completo: sitio con reservas automatizadas, CRM a medida y portal financiero.",
    image: "/assets/portfolio_alphadent_real.png",
    link: "https://alphadentservice.com",
    tags: ["Next.js", "PostgreSQL", "CRM", "Automatización"],
    duration: "6 Semanas",
    before:
      "Alpha Dent operaba con procesos manuales: agenda por WhatsApp, sin seguimiento financiero y sin presencia web que captara clientes automáticamente.",
    after:
      "Desarrollamos un ecosistema digital completo con sitio web de reservas automatizadas, CRM a medida con panel financiero y dashboards gerenciales. Procesos 100% digitalizados.",
  },
  {
    name: "DML Security",
    slug: "dml-security",
    client: "DML Security",
    result: "Landing page corporativa de alta conversión para captación B2B en seguridad electrónica.",
    image: "/assets/portfolio_dml_real.png",
    link: "https://dmlsecurity.com.mx",
    tags: ["React", "Diseño Corporativo", "Lead Gen", "SEO"],
    duration: "3 Semanas",
    before:
      "DML Security carecía de presencia digital que reflejara su nivel empresarial. Las ventas dependían de referidos sin un canal digital de captación.",
    after:
      "Plataforma corporativa de alta conversión que actúa como canal de adquisición B2B 24/7, con catálogo de servicios estructurado y CTAs estratégicos a WhatsApp y formularios.",
  },
];

// ─── Blog (posts estáticos de ejemplo — se migran a PostgreSQL en producción) ──

export const blogPosts = [
  {
    title: "Cómo construir una marca digital consistente",
    slug: "como-construir-marca-digital-consistente",
    date: "12 Abril, 2026",
    excerpt:
      "La coherencia visual y narrativa es el activo más valioso de cualquier empresa en el entorno digital. Descubre cómo estructurar una identidad que genere confianza inmediata.",
    image: "/assets/blog_marca.png",
    content: `
      <h2>El poder de la primera impresión digital</h2>
      <p>En un entorno donde la competencia está a un clic de distancia, la identidad de tu empresa no puede permitirse ser ambigua. Una marca digital consistente no solo se trata de un logotipo bonito; es el ecosistema completo de cómo te perciben tus prospectos en todos los puntos de contacto.</p>
      <h3>1. Estandarización Visual</h3>
      <p>El cerebro humano procesa imágenes 60,000 veces más rápido que el texto. Utilizar una <strong>paleta de colores estricta</strong>, un <strong>sistema tipográfico limpio</strong> y un <strong>estilo fotográfico corporativo</strong> asegura que tu marca sea reconocible al instante.</p>
      <h3>2. Voz y Tono</h3>
      <p>¿Cómo habla tu empresa? Definir si tu tono es <em>directo y ejecutivo</em>, <em>cálido y consultivo</em> o <em>técnico y autoritativo</em> es fundamental para conectar con tu cliente ideal en cada canal.</p>
      <h3>3. Manual de Identidad Digital</h3>
      <p>Toda empresa que busque escalar necesita un documento central. Un <strong>Brandbook</strong> moderno debe incluir reglas de uso del logotipo, códigos de color exactos, jerarquía tipográfica y lineamientos de redacción.</p>
      <blockquote>"La consistencia construye confianza, y la confianza construye ventas."</blockquote>
    `,
  },
  {
    title: "CRM para equipos comerciales: guía práctica",
    slug: "crm-equipos-comerciales-guia-practica",
    date: "18 Abril, 2026",
    excerpt:
      "Implementar un CRM es el primer paso hacia la previsibilidad financiera. Conoce las mejores prácticas para asegurar que tu equipo de ventas realmente lo utilice.",
    image: "/assets/blog_crm.png",
    content: `
      <h2>Del caos a la previsibilidad comercial</h2>
      <p>El principal problema de los equipos de ventas modernos no es la falta de prospectos, sino la <strong>fuga de oportunidades</strong> por falta de seguimiento estructurado.</p>
      <h3>El error de la "Carga de Datos"</h3>
      <p>Muchos proyectos de CRM fracasan porque se convierten en carga administrativa. La clave es la <strong>automatización invisible</strong>: captura automática de leads, sincronización de correos y conexión con WhatsApp.</p>
      <h3>Pipeline: El mapa del tesoro</h3>
      <p>Tu embudo debe reflejar tu proceso comercial real. Etapas recomendadas: Lead Nuevo → Contacto Inicial → Diagnóstico/Cotización → Negociación → Ganado/Perdido.</p>
      <h3>Métricas que importan</h3>
      <p>Vigila la <em>Tasa de Conversión por Etapa</em>, la <em>Velocidad del Ciclo de Ventas</em> y el <em>Motivo de Pérdida</em> para iterar tu estrategia con datos reales.</p>
    `,
  },
  {
    title: "Captación de clientes: estrategia y medición",
    slug: "captacion-clientes-estrategia-medicion",
    date: "21 Abril, 2026",
    excerpt:
      "No pagues por likes, invierte en adquisición de clientes. Cómo estructurar campañas que generen ROI positivo y predecible.",
    image: "/assets/blog_captacion.png",
    content: `
      <h2>El fin del marketing de vanidad</h2>
      <p>Las métricas de vanidad han perdido todo su valor corporativo. El único indicador que importa a dirección es el <strong>CAC</strong> y el <strong>ROAS</strong>.</p>
      <h3>El Embudo de Conversión</h3>
      <p>Una estrategia efectiva no envía tráfico ciego al home. Usa embudos específicos: <strong>TOFU</strong> (reconocimiento), <strong>MOFU</strong> (retargeting + lead magnet), <strong>BOFU</strong> (cierre directo).</p>
      <h3>El poder de las Landing Pages</h3>
      <p>Una campaña sin landing optimizada es dinero quemado. Un único CTA, carga en menos de 2 segundos, sin menú de navegación que distraiga.</p>
      <h3>Medición en Tiempo Real</h3>
      <p>Con píxeles de seguimiento avanzados sabes exactamente qué campaña y qué anuncio generó al cliente que cerró el contrato.</p>
    `,
  },
];

// ─── Opciones del formulario de contacto ─────────────────────────────────────

export const contactServiceOptions = [
  // Presencia Digital — slugs exactos del catálogo
  { group: "Presencia Digital", value: "diseno-desarrollo-web",          label: "Diseño y Desarrollo Web" },
  { group: "Presencia Digital", value: "comercio-electronico-ecommerce", label: "Comercio Electrónico (E-commerce)" },
  { group: "Presencia Digital", value: "desarrollo-aplicaciones-web",    label: "Desarrollo de Aplicaciones Web" },
  { group: "Presencia Digital", value: "desarrollo-aplicaciones-moviles",label: "Desarrollo de Aplicaciones Móviles" },
  { group: "Presencia Digital", value: "branding-identidad-corporativa", label: "Branding e Identidad Corporativa" },
  { group: "Presencia Digital", value: "hosting-hospedaje-web",          label: "Hosting y Hospedaje Web" },
  { group: "Presencia Digital", value: "registro-administracion-dominios", label: "Registro y Administración de Dominios" },
  { group: "Presencia Digital", value: "correo-empresarial",             label: "Correo Empresarial" },
  { group: "Presencia Digital", value: "posicionamiento-seo",            label: "Posicionamiento SEO" },
  // Marketing y Captación
  { group: "Marketing y Captación", value: "marketing-digital",                    label: "Marketing Digital" },
  { group: "Marketing y Captación", value: "publicidad-facebook-instagram-ads",    label: "Publicidad en Facebook e Instagram Ads" },
  { group: "Marketing y Captación", value: "gestion-redes-sociales",               label: "Gestión de Redes Sociales" },
  { group: "Marketing y Captación", value: "produccion-contenido-digital",          label: "Producción de Contenido Digital" },
  { group: "Marketing y Captación", value: "consultoria-marketing",                label: "Consultoría de Marketing" },
  // Tecnología Empresarial
  { group: "Tecnología Empresarial", value: "crm-gestion-comercial",                  label: "CRM y Gestión Comercial" },
  { group: "Tecnología Empresarial", value: "plataformas-empresariales-enterprise",   label: "Plataformas Empresariales (Enterprise)" },
  { group: "Tecnología Empresarial", value: "inteligencia-artificial",                label: "Inteligencia Artificial" },
  { group: "Tecnología Empresarial", value: "automatizacion-de-procesos",             label: "Automatización de Procesos" },
  { group: "Tecnología Empresarial", value: "business-intelligence-dashboards",       label: "Business Intelligence y Dashboards" },
  { group: "Tecnología Empresarial", value: "integracion-de-sistemas",                label: "Integración de Sistemas" },
  { group: "Tecnología Empresarial", value: "soluciones-en-la-nube",                  label: "Soluciones en la Nube" },
  { group: "Tecnología Empresarial", value: "ciberseguridad-proteccion-datos",        label: "Ciberseguridad y Protección de Datos" },
  { group: "Tecnología Empresarial", value: "infraestructura-tecnologica",            label: "Infraestructura Tecnológica" },
  { group: "Tecnología Empresarial", value: "soporte-tecnico-it",                     label: "Soporte Técnico IT" },
  { group: "Tecnología Empresarial", value: "gestion-documental-digital",             label: "Gestión Documental Digital" },
  { group: "Tecnología Empresarial", value: "respaldo-recuperacion-informacion",      label: "Respaldo y Recuperación de Información" },
  { group: "Tecnología Empresarial", value: "sistemas-gestion-operativa",             label: "Sistemas de Gestión Operativa" },
  { group: "Tecnología Empresarial", value: "transformacion-digital",                 label: "Transformación Digital" },
  { group: "Tecnología Empresarial", value: "consultoria-tecnologica",                label: "Consultoría Tecnológica" },
  { group: "Tecnología Empresarial", value: "calidad-mejora-continua-digital",        label: "Calidad y Mejora Continua Digital" },
  { group: "Tecnología Empresarial", value: "soluciones-digitales-iglesias",          label: "Soluciones Digitales para Iglesias" },
  // General
  { group: "General", value: "diagnostico", label: "Diagnóstico / No sé por dónde empezar" },
  { group: "General", value: "otro",        label: "Otro" },
];

export const contactGoalOptions = [
  { value: "presencia-online", label: "Tener presencia online profesional" },
  { value: "mas-clientes", label: "Conseguir más clientes" },
  { value: "vender-internet", label: "Vender por internet" },
  { value: "automatizar", label: "Automatizar procesos internos" },
  { value: "imagen-marca", label: "Mejorar imagen y posicionamiento de marca" },
  { value: "sistema-medida", label: "Desarrollar un sistema a la medida" },
  { value: "asesoria", label: "Necesito asesoría, no sé por dónde empezar" },
];
