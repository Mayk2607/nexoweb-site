// Planes y casos de uso por servicio
// Indexados por slug para fácil lookup desde la página de detalle

export interface ServicePlan {
  name: string;
  price: string;
  description: string;
  includes: string[];
  recommended?: boolean;
  type?: "project" | "monthly";
}

export interface ServiceUseCase {
  industry: string;
  scenario: string;
}

export interface ServiceExtras {
  plans: ServicePlan[];
  useCases: ServiceUseCase[];
  relatedServices?: string[];
}

export const serviceExtras: Record<string, ServiceExtras> = {

  // ── PRESENCIA DIGITAL ───────────────────────────────────────────────────────

  "diseno-desarrollo-web": {
    plans: [
      {
        name: "Sitio Esencial",
        price: "Desde $4,990 MXN",
        description: "Presencia web profesional en pocas semanas. Imagen sólida, formulario de contacto y todo lo que necesitas para empezar a ser encontrado en Google.",
        includes: [
          "Hasta 5 secciones (Inicio, Servicios, Nosotros, Contacto, Blog)",
          "Diseño responsivo mobile-first",
          "Formulario de contacto + integración WhatsApp",
          "SSL y hosting incluidos · Dominio incluido el primer año (la renovación anual se cotiza según la extensión contratada: .com, .mx, .com.mx, etc.)",
          "Panel de administración básico",
        ],
        type: "project",
      },
      {
        name: "Sitio Profesional",
        price: "Desde $9,990 MXN",
        description: "Un sitio que trabaja por ti. Diseño a medida, SEO técnico y estrategia de conversión para convertir visitas en clientes reales.",
        includes: [
          "Hasta 10 secciones + páginas internas ilimitadas",
          "Diseño UI/UX a medida con animaciones",
          "SEO técnico + estructura optimizada para Google",
          "Integración con CRM o sistema de reservas",
          "Google Analytics 4 + Search Console configurados",
          "30 días de soporte post-lanzamiento",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "Plataforma Web",
        price: "Desde $19,900 MXN",
        description: "Portal completo integrable con tus sistemas, escalable y preparado para crecer con tu empresa sin límites técnicos.",
        includes: [
          "Arquitectura escalable en la nube",
          "Roles de usuario y panel de administración avanzado",
          "Integración con APIs externas (pagos, logística, CRM)",
          "Optimización de velocidad avanzada (CDN, caché)",
          "Multilenguaje si se requiere",
          "Plan de mantenimiento mensual incluido 3 meses",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Clínicas y Salud", scenario: "Una clínica dental que necesita un sitio con sistema de citas online, galería de casos, testimonios verificados y chat directo a WhatsApp para captar pacientes nuevos automáticamente." },
      { industry: "Despachos Profesionales", scenario: "Un despacho de abogados o contadores que quiere proyectar autoridad con un sitio elegante, blog de contenido especializado y formulario de consulta inicial." },
      { industry: "Restaurantes y Hospitality", scenario: "Un restaurante o bar que necesita menú digital, reservaciones en línea, galería de ambiente y presencia en Google para captar clientes locales." },
      { industry: "Constructoras e Inmobiliarias", scenario: "Una inmobiliaria que requiere portal de propiedades con filtros de búsqueda, fichas técnicas descargables y formulario de interés para cada propiedad." },
    ],
    relatedServices: [
      "comercio-electronico-ecommerce",
      "posicionamiento-seo",
      "hosting-hospedaje-web",
      "branding-identidad-corporativa",
      "gestion-redes-sociales",
    ],
  },

  "comercio-electronico-ecommerce": {
    plans: [
      {
        name: "Tienda Starter",
        price: "Desde $8,990 MXN",
        description: "Empieza a vender en línea esta semana. Catálogo, pagos y gestión de pedidos listos para operar desde el primer día.",
        includes: [
          "Hasta 100 productos en catálogo",
          "Pasarela de pago (MercadoPago o Stripe)",
          "Carrito de compras y checkout optimizado",
          "Panel de gestión de pedidos e inventario",
          "Diseño responsivo y optimizado para móvil",
        ],
        type: "project",
      },
      {
        name: "Tienda Profesional",
        price: "Desde $15,900 MXN",
        description: "Reduce carritos abandonados, aumenta el ticket promedio y escala tu catálogo sin límites con una tienda diseñada para vender.",
        includes: [
          "Catálogo ilimitado con variantes y atributos",
          "Múltiples pasarelas de pago + OXXO Pay",
          "Recuperación de carritos abandonados",
          "Cupones, descuentos y programa de puntos",
          "Integración con Google Shopping y Meta Catalog",
          "Reportes de ventas y comportamiento de compra",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "E-Commerce Avanzado",
        price: "Desde $29,900 MXN",
        description: "Plataforma de alto volumen integrada a tu ERP y logística. Para empresas que venden en serio y necesitan escalar sin límites.",
        includes: [
          "Integración con ERP o sistema de inventario propio",
          "Multi-almacén y gestión logística integrada",
          "Personalización de experiencia por segmento de cliente",
          "API para app móvil o canales adicionales",
          "Soporte técnico dedicado y SLA garantizado",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Moda y Accesorios", scenario: "Una tienda de ropa que quiere vender a nivel nacional con catálogo por tallas y colores, lookbooks y retargeting automático a clientes que no completaron su compra." },
      { industry: "Alimentación y Gourmet", scenario: "Una empresa de alimentos artesanales que necesita e-commerce con control de caducidad en inventario, envíos refrigerados y suscripciones mensuales de productos." },
      { industry: "Salud y Bienestar", scenario: "Una tienda de suplementos o productos naturales que requiere fichas técnicas detalladas, calculadora de dosis y cumplimiento de regulaciones COFEPRIS en la descripción de productos." },
      { industry: "Industria y Herramientas", scenario: "Una distribuidora B2B que necesita catálogo técnico con búsqueda por número de parte, cotizaciones online y precios diferenciados por tipo de cliente." },
    ],
    relatedServices: [
      "diseno-desarrollo-web",
      "publicidad-facebook-instagram-ads",
      "marketing-digital",
      "posicionamiento-seo",
      "hosting-hospedaje-web",
    ],
  },

  "desarrollo-aplicaciones-web": {
    plans: [
      {
        name: "App Modular",
        price: "Desde $22,900 MXN",
        description: "Aplicación web con módulos específicos para un proceso de negocio concreto. Digitaliza tu operación sin sistemas genéricos que no se adaptan.",
        includes: [
          "Hasta 3 módulos funcionales",
          "Autenticación y perfiles de usuario",
          "Dashboard básico con reportes",
          "Despliegue en la nube",
          "Documentación de usuario",
        ],
        type: "project",
      },
      {
        name: "App Empresarial",
        price: "Desde $49,900 MXN",
        description: "Plataforma completa para gestionar los procesos clave del negocio con visibilidad en tiempo real e integraciones a tus sistemas actuales.",
        includes: [
          "Módulos ilimitados por fase de desarrollo",
          "Roles y permisos granulares",
          "Integraciones con sistemas externos vía API",
          "Notificaciones en tiempo real",
          "Panel de administración avanzado",
          "Soporte y mantenimiento 6 meses",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "App Avanzada",
        price: "Desde $89,900 MXN",
        description: "Plataforma multi-tenant lista para comercializar como producto SaaS o escalar a miles de usuarios sin límites de infraestructura.",
        includes: [
          "Arquitectura multi-inquilino (multi-tenant)",
          "Facturación y suscripciones automáticas",
          "Onboarding automatizado de nuevos clientes",
          "Infraestructura escalable con alta disponibilidad",
          "Panel de administración global de la plataforma",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Logística y Transporte", scenario: "Una empresa de paquetería que necesita portal para rastreo de envíos en tiempo real, asignación de rutas a conductores y reportes de eficiencia por zona." },
      { industry: "Educación y Capacitación", scenario: "Una institución educativa que requiere plataforma de cursos online con control de avance, evaluaciones automáticas, emisión de certificados y pagos de inscripción." },
      { industry: "Recursos Humanos", scenario: "Una empresa que quiere digitalizar su proceso de reclutamiento: portal de vacantes, recepción de CVs, evaluaciones online y pipeline de candidatos para el equipo de RH." },
      { industry: "Bienes Raíces", scenario: "Una inmobiliaria que necesita sistema de gestión de propiedades, seguimiento de prospectos, cálculo de comisiones y portal privado para clientes con documentos de su operación." },
    ],
    relatedServices: [
      "integracion-de-sistemas",
      "automatizacion-de-procesos",
      "hosting-hospedaje-web",
      "soluciones-en-la-nube",
      "crm-gestion-comercial",
    ],
  },

  "desarrollo-aplicaciones-moviles": {
    plans: [
      {
        name: "App MVP",
        price: "Desde $27,900 MXN",
        description: "Versión mínima viable para validar tu idea en el mercado rápidamente. Llega a iOS y Android en semanas, no en años.",
        includes: [
          "Funcionalidades core definidas en discovery",
          "Diseño UI/UX para iOS y Android",
          "Autenticación y perfiles básicos",
          "Publicación en Google Play y App Store",
          "30 días de soporte post-lanzamiento",
        ],
        type: "project",
      },
      {
        name: "App Completa",
        price: "Desde $54,900 MXN",
        description: "Aplicación con todas las funcionalidades para operar tu negocio desde mobile. Pagos, notificaciones y modo offline incluidos.",
        includes: [
          "Funcionalidades completas por módulo",
          "Notificaciones push personalizadas",
          "Pagos in-app integrados",
          "Modo offline con sincronización",
          "Panel web de administración incluido",
          "Analítica de uso con Firebase",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "App Avanzada",
        price: "Desde $109,900 MXN",
        description: "App de alto rendimiento integrada al ecosistema tecnológico de tu empresa. Para operaciones de misión crítica con miles de usuarios.",
        includes: [
          "Integración profunda con sistemas internos (ERP, CRM)",
          "Geolocalización y mapas avanzados",
          "Realidad aumentada o funciones especializadas",
          "Alta disponibilidad y manejo de gran volumen de usuarios",
          "Mantenimiento y evolución continua",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Delivery y Restaurantes", scenario: "Un restaurante o dark kitchen que necesita app de pedidos a domicilio con seguimiento en tiempo real, calificaciones y programa de lealtad para clientes frecuentes." },
      { industry: "Salud y Fitness", scenario: "Un gimnasio o estudio de yoga que quiere app para reservar clases, seguir rutinas, medir progreso y recibir recordatorios personalizados de sus entrenadores." },
      { industry: "Servicios a Domicilio", scenario: "Una empresa de servicios (limpieza, plomería, electricistas) que necesita app para que sus técnicos reciban órdenes de trabajo, naveguen a domicilios y registren el servicio con foto." },
      { industry: "Retail y Puntos de Venta", scenario: "Una cadena de tiendas que quiere app de lealtad con acumulación de puntos, notificaciones de ofertas personalizadas y cupones digitales para sus clientes frecuentes." },
    ],
    relatedServices: [
      "desarrollo-aplicaciones-web",
      "integracion-de-sistemas",
      "hosting-hospedaje-web",
      "crm-gestion-comercial",
      "automatizacion-de-procesos",
    ],
  },

  "branding-identidad-corporativa": {
    plans: [
      {
        name: "Identidad Starter",
        price: "Desde $6,990 MXN",
        description: "Logotipo e identidad visual esencial para empezar con imagen profesional que genere confianza desde el primer día.",
        includes: [
          "3 propuestas de concepto de logotipo",
          "2 rondas de ajustes",
          "Entrega en formatos vectoriales y PNG",
          "Paleta de colores y tipografías primarias",
          "Guía básica de uso",
        ],
        type: "project",
      },
      {
        name: "Sistema de Marca",
        price: "Desde $15,900 MXN",
        description: "Identidad completa con manual, aplicaciones y voz de marca. Tu empresa habla con una sola voz en todos los puntos de contacto.",
        includes: [
          "Logotipo + variantes (horizontal, vertical, ícono)",
          "Manual de marca completo (50+ páginas)",
          "Papelería corporativa (tarjetas, hoja membretada, sobre)",
          "Plantillas para redes sociales (post, stories, portadas)",
          "Definición de voz y tono de comunicación",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "Brandbook Premium",
        price: "Desde $29,900 MXN",
        description: "Identidad corporativa completa lista para escalar. Desde señalización hasta uniformes, con estrategia de posicionamiento incluida.",
        includes: [
          "Todo del plan Sistema de Marca",
          "Brandbook digital interactivo",
          "Aplicaciones en uniformes, vehículos y señalización",
          "Kit de medios (press kit) para medios y socios",
          "Sesión fotográfica corporativa de marca",
          "Estrategia de posicionamiento de marca",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Startups y Nuevos Negocios", scenario: "Una startup que acaba de constituirse y necesita identidad visual que transmita confianza y profesionalismo desde el primer día para cerrar sus primeros clientes e inversionistas." },
      { industry: "Restaurantes y Hospitalidad", scenario: "Un restaurante nuevo que quiere una marca que se reconozca en uniformes, menús, empaque para llevar, redes sociales y fachada con coherencia total desde el día uno." },
      { industry: "Rebranding Empresarial", scenario: "Una empresa con 10+ años de historia que creció y cuya imagen actual ya no refleja su tamaño ni posicionamiento actual. Actualización de marca sin perder el reconocimiento ganado." },
      { industry: "Despachos y Firmas", scenario: "Un despacho de abogados, consultores o arquitectos que requiere imagen institucional que proyecte autoridad, experiencia y diferenciación frente a la competencia en su segmento." },
    ],
    relatedServices: [
      "diseno-desarrollo-web",
      "gestion-redes-sociales",
      "produccion-contenido-digital",
      "marketing-digital",
      "publicidad-facebook-instagram-ads",
    ],
  },

  "hosting-hospedaje-web": {
    plans: [
      {
        name: "Hosting Starter",
        price: "Desde $199 MXN/mes",
        description: "Hosting administrado ideal para sitios corporativos y blogs. Tu sitio siempre activo, con SSL automático, backups semanales y soporte técnico, sin que te preocupes por el servidor. El registro y renovación del dominio se cotiza por separado según la extensión requerida (.com, .com.mx, .mx, .org, etc.).",
        includes: [
          "Sitio seguro y siempre disponible",
          "SSL gratuito con renovación automática",
          "Administración técnica por Nexoweb",
          "Backups semanales en nube",
          "Panel cPanel con acceso del cliente",
          "Soporte en horario hábil (respuesta 8 hrs)",
          "10 GB almacenamiento SSD",
        ],
        type: "monthly",
      },
      {
        name: "Hosting Administrado",
        price: "Desde $499 MXN/mes",
        description: "Hosting de alto rendimiento administrado por Nexoweb con monitoreo 24/7. Para sitios con mayor tráfico, e-commerce y proyectos que no pueden permitirse caídas ni fricciones técnicas.",
        includes: [
          "Sitio seguro con uptime garantizado",
          "SSL + configuración HTTPS optimizada",
          "Monitoreo de uptime 24/7 con alertas proactivas",
          "Backups diarios automatizados (retención 30 días)",
          "Actualizaciones de seguridad proactivas",
          "Soporte técnico prioritario (respuesta 4 hrs hábiles)",
          "25 GB SSD NVMe · CDN incluido",
        ],
        recommended: true,
        type: "monthly",
      },
      {
        name: "Hosting Empresarial",
        price: "Desde $1,990 MXN/mes",
        description: "Infraestructura dedicada y administrada para empresas con operaciones críticas. Recursos exclusivos, alta disponibilidad y soporte de guardia para que tu negocio nunca se detenga.",
        includes: [
          "Infraestructura dedicada exclusiva para tu empresa",
          "Alta disponibilidad con failover automático",
          "Monitoreo 24/7 con alertas proactivas",
          "Backups diarios + replicación en tiempo real",
          "Administración completa (parches, seguridad, optimización)",
          "Soporte de guardia para incidentes críticos",
          "Recursos configurados según carga y necesidades",
        ],
        type: "monthly",
      },
    ],
    useCases: [
      { industry: "Agencias y Freelancers", scenario: "Una agencia de diseño que necesita hosting confiable para los sitios de sus clientes con panel unificado, SSL automático y soporte técnico cuando algo falla." },
      { industry: "E-commerce", scenario: "Una tienda en línea que no puede permitirse caídas: hosting de alto rendimiento con uptime garantizado, CDN para carga rápida y backups diarios ante cualquier incidente." },
      { industry: "Portales Corporativos", scenario: "Una empresa con múltiples micrositios o portales que necesita gestión centralizada de hosting y certificados desde un solo panel con facturación unificada." },
      { industry: "Apps y Plataformas Web", scenario: "Una startup con aplicación web que requiere servidor con recursos escalables: más RAM y CPU en horas pico sin migrar ni interrumpir el servicio." },
    ],
    relatedServices: [
      "registro-administracion-dominios",
      "diseno-desarrollo-web",
      "correo-empresarial",
      "ciberseguridad-proteccion-datos",
      "respaldo-recuperacion-informacion",
    ],
  },

  "correo-empresarial": {
    plans: [
      {
        name: "Correo con Dominio Propio",
        price: "Desde $159 MXN/usuario/mes",
        description: "Correo corporativo IMAP con tu dominio propio para equipos pequeños. Sin licencias de terceros: administrado directamente por Nexoweb. Proyecta imagen de empresa seria desde el primer correo que envías.",
        includes: [
          "Correo con dominio propio (@tuempresa.mx)",
          "30 GB almacenamiento por usuario",
          "Acceso web + app móvil",
          "Configuración en todos los dispositivos",
          "Antispam básico incluido",
        ],
        type: "monthly",
      },
      {
        name: "Google Workspace / M365",
        price: "Desde $249 MXN/usuario/mes",
        description: "Suite completa de productividad: correo, Drive, Meet, Docs y más. Toda la colaboración de tu equipo en una sola plataforma.",
        includes: [
          "Gmail o Outlook con dominio propio",
          "Drive o OneDrive para colaboración en documentos",
          "Meet o Teams para videoconferencias",
          "Calendario compartido y gestión de equipos",
          "Seguridad avanzada (MFA, reportes de acceso)",
        ],
        recommended: true,
        type: "monthly",
      },
      {
        name: "Suite Corporativa",
        price: "Desde $390 MXN/usuario/mes",
        description: "Suite empresarial con cumplimiento regulatorio, archivo legal y soporte dedicado. Para empresas que no pueden permitirse riesgos en sus comunicaciones.",
        includes: [
          "Retención y archivo de correos por política legal",
          "eDiscovery y exportación para cumplimiento",
          "DLP (prevención de fuga de datos)",
          "Protección avanzada contra phishing y ransomware",
          "Administración centralizada multi-dominio",
        ],
        type: "monthly",
      },
    ],
    useCases: [
      { industry: "Equipos de Ventas", scenario: "Un equipo comercial que necesita correo corporativo, firmas profesionales unificadas, seguimiento de apertura de correos y sincronización con el CRM." },
      { industry: "Despachos y Firmas", scenario: "Un despacho jurídico que requiere correos con su dominio, archivo histórico de comunicaciones por expediente y protección contra phishing dirigido." },
      { industry: "Empresas con Sucursales", scenario: "Una cadena con múltiples ubicaciones que necesita correos centralizados para cada sucursal, gestión de usuarios por parte de IT y reportes de uso." },
      { industry: "Equipos Remotos", scenario: "Una empresa con colaboradores en distintas ciudades que necesita correo, videollamadas, almacenamiento compartido y chat interno en una sola plataforma accesible desde cualquier lugar." },
    ],
    relatedServices: [
      "registro-administracion-dominios",
      "hosting-hospedaje-web",
      "soporte-tecnico-it",
      "ciberseguridad-proteccion-datos",
      "automatizacion-de-procesos",
    ],
  },

  "registro-administracion-dominios": {
    plans: [
      {
        name: "Registro de Dominio",
        price: "Desde $499 MXN/año",
        description: "Registramos tu dominio con toda la configuración técnica lista para que tu sitio, correo y servicios digitales funcionen desde el primer día. El dominio queda a tu nombre, siempre.",
        includes: [
          "Registro del dominio a nombre del cliente",
          "Configuración DNS inicial completa",
          "Gestión técnica por Nexoweb",
          "Renovación anual gestionada (si se contrata)",
          "Soporte ante cualquier cambio o incidencia",
        ],
        type: "project",
      },
      {
        name: "Administración de Dominios",
        price: "Desde $990 MXN/año",
        description: "Administración técnica continua de tu dominio: cambios DNS, subdominios, monitoreo de vencimiento y renovaciones gestionadas. Nunca pierdas tu dominio por descuido.",
        includes: [
          "Administración completa del dominio",
          "Cambios DNS y configuración de subdominios",
          "Monitoreo de expiración con alertas automáticas",
          "Gestión de renovaciones sin riesgo de pérdida",
          "Soporte técnico prioritario",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "Portafolio de Dominios",
        price: "A consultar",
        description: "Para empresas con múltiples dominios o marcas. Gestión centralizada, auditoría DNS, inventario actualizado y renovaciones masivas con un solo punto de contacto.",
        includes: [
          "Gestión centralizada de múltiples dominios",
          "Auditoría DNS y diagnóstico de configuración",
          "Inventario con fechas de vencimiento y estados",
          "Renovaciones masivas coordinadas",
          "Seguridad DNS y protección de marca",
          "Consultoría de estrategia de dominios",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Empresas en crecimiento", scenario: "Una empresa que lanza su primer sitio web y necesita registrar su dominio correctamente, con DNS configurado para correo, hosting y herramientas digitales desde el inicio." },
      { industry: "Negocios con varias marcas", scenario: "Un grupo empresarial con 5 marcas distintas que quiere consolidar la administración de sus dominios en un solo proveedor con inventario claro y renovaciones coordinadas." },
      { industry: "E-commerce y tiendas en línea", scenario: "Una tienda en línea que necesita subdominios para su plataforma de pagos, checkout seguro y blog, con DNS configurado correctamente para evitar problemas de entregabilidad de correo." },
      { industry: "Empresas con dominio existente", scenario: "Una empresa que ya tiene su dominio en otro proveedor y quiere transferirlo a Nexoweb para tener hosting, correo y dominio administrados en un solo lugar con soporte unificado." },
    ],
    relatedServices: [
      "diseno-desarrollo-web",
      "hosting-hospedaje-web",
      "correo-empresarial",
      "ciberseguridad-proteccion-datos",
      "soluciones-en-la-nube",
    ],
  },

  // ── MARKETING Y CAPTACIÓN ─────────────────────────────────────────────────

  "posicionamiento-seo": {
    plans: [
      {
        name: "SEO Local",
        price: "Desde $3,500 MXN/mes",
        description: "Para negocios que quieren ser encontrados en su ciudad o región. Aparece primero cuando tus clientes potenciales buscan en Google.",
        includes: [
          "Optimización de Google Business Profile",
          "SEO On-Page para páginas clave",
          "10 palabras clave objetivo locales",
          "Reportes mensuales de posicionamiento",
          "Corrección de errores técnicos básicos",
        ],
        type: "monthly",
      },
      {
        name: "SEO Profesional",
        price: "Desde $7,500 MXN/mes",
        description: "Estrategia nacional con contenido, link building y analítica avanzada. Reduce tu dependencia de publicidad pagada generando tráfico orgánico consistente.",
        includes: [
          "Hasta 40 palabras clave estratégicas",
          "Producción de 2 artículos de blog SEO al mes",
          "Link building de calidad (DA 40+)",
          "Auditoría técnica + Core Web Vitals",
          "Google Analytics 4 + Search Console configurados",
          "Reporte ejecutivo mensual con tendencias",
        ],
        recommended: true,
        type: "monthly",
      },
      {
        name: "SEO Avanzado",
        price: "Desde $14,900 MXN/mes",
        description: "SEO agresivo para sectores competitivos o presencia nacional dominante. Para empresas que quieren liderar su categoría en resultados orgánicos.",
        includes: [
          "100+ palabras clave objetivo",
          "4-8 contenidos mensuales de alta autoridad",
          "Link building agresivo con medios y portales especializados",
          "SEO técnico avanzado (Schema, AMP, JavaScript SEO)",
          "Revisión de competidores y análisis de brecha mensual",
        ],
        type: "monthly",
      },
    ],
    useCases: [
      { industry: "Clínicas y Salud", scenario: "Una clínica que quiere aparecer en los primeros resultados cuando alguien en su ciudad busca 'dentista cerca de mí' o 'ortopedista en [ciudad]' para atraer pacientes nuevos sin pagar publicidad." },
      { industry: "Despachos Profesionales", scenario: "Un despacho de abogados que quiere posicionarse para términos como 'abogado laboral en Monterrey' y que las búsquedas de personas con su problema lleguen directamente a su sitio." },
      { industry: "E-commerce", scenario: "Una tienda en línea que quiere reducir su dependencia de Google Ads posicionando sus categorías y productos en búsquedas orgánicas de alta intención de compra." },
      { industry: "Turismo y Hospitalidad", scenario: "Un hotel boutique o agencia de viajes que busca captar clientes en búsquedas como 'hotel en Bacalar' o 'tours Oaxaca' para reducir comisiones de OTAs y plataformas de reserva." },
    ],
    relatedServices: [
      "diseno-desarrollo-web",
      "marketing-digital",
      "produccion-contenido-digital",
      "publicidad-facebook-instagram-ads",
      "consultoria-marketing",
    ],
  },

  "marketing-digital": {
    plans: [
      {
        name: "Plan Starter",
        price: "Desde $5,990 MXN/mes",
        description: "Estrategia digital enfocada en 1-2 canales para negocios que empiezan a invertir en marketing. Primeros resultados medibles en 30 días.",
        includes: [
          "Estrategia de 1 canal (Meta Ads o Google Ads)",
          "Gestión de presupuesto publicitario",
          "Diseño de 4 creativos por mes",
          "Reporte mensual de resultados",
          "Sesión de revisión mensual (1 hr)",
        ],
        type: "monthly",
      },
      {
        name: "Plan Crecimiento",
        price: "Desde $11,900 MXN/mes",
        description: "Marketing multicanal con embudo completo y optimización continua. Más leads, mejor calidad y menor costo por adquisición mes a mes.",
        includes: [
          "Estrategia 2-3 canales (Meta + Google + SEO)",
          "Embudo de captación y nurturing",
          "8 creativos + 2 piezas de contenido por mes",
          "Dashboard de KPIs en tiempo real",
          "Sesiones de revisión quincenales",
          "A/B testing de anuncios y landing pages",
        ],
        recommended: true,
        type: "monthly",
      },
      {
        name: "Plan Avanzado",
        price: "Desde $22,900 MXN/mes",
        description: "Estrategia integral para empresas que invierten en serio en crecimiento. Director de marketing digital dedicado y producción de contenido ilimitada.",
        includes: [
          "Todos los canales digitales relevantes",
          "Embudo completo: captación, conversión y retención",
          "Producción de contenido ilimitado",
          "Director de marketing digital dedicado",
          "Reuniones semanales de estrategia y resultados",
          "Optimización de landing pages y conversión web",
        ],
        type: "monthly",
      },
    ],
    useCases: [
      { industry: "Inmobiliarias", scenario: "Una inmobiliaria que necesita captación constante de prospectos interesados en comprar o rentar propiedades, con campañas segmentadas por zona, tipo de inmueble y capacidad de inversión." },
      { industry: "Escuelas y Capacitación", scenario: "Una institución educativa que quiere llenar su siguiente cohorte de alumnos con campañas orientadas a captación en temporadas de inscripción." },
      { industry: "Franquicias", scenario: "Una franquicia que necesita atraer tanto a compradores de franquicia (B2B) como a consumidores finales (B2C), con estrategias diferenciadas por audiencia y etapa del embudo." },
      { industry: "Manufactura y B2B", scenario: "Una empresa industrial que quiere generar leads de compradores corporativos a través de LinkedIn Ads, Google y contenido de autoridad en su sector." },
    ],
    relatedServices: [
      "posicionamiento-seo",
      "publicidad-facebook-instagram-ads",
      "gestion-redes-sociales",
      "produccion-contenido-digital",
      "crm-gestion-comercial",
    ],
  },

  "publicidad-facebook-instagram-ads": {
    plans: [
      {
        name: "Ads Starter",
        price: "Desde $3,990 MXN/mes",
        description: "Gestión de campañas para negocios que quieren sus primeras conversiones en Meta. Configuración completa y primera campaña activa en 5 días.",
        includes: [
          "Configuración de cuenta publicitaria y píxel",
          "1 campaña activa (tráfico o leads)",
          "4 creativos (imagen/video) por mes",
          "Optimización semanal de presupuesto",
          "Reporte mensual de resultados",
        ],
        type: "monthly",
      },
      {
        name: "Ads Profesional",
        price: "Desde $7,990 MXN/mes",
        description: "Campañas múltiples con retargeting, A/B testing y optimización de conversión. Llega a quienes ya te conocen y convierte más con menos presupuesto.",
        includes: [
          "Hasta 3 campañas simultáneas",
          "Retargeting a visitantes del sitio y video viewers",
          "Audiencias similares (Lookalike) configuradas",
          "8 creativos por mes + pruebas A/B",
          "Catálogo de productos si aplica",
          "Reporte semanal de resultados",
        ],
        recommended: true,
        type: "monthly",
      },
      {
        name: "Ads Avanzado",
        price: "Desde $15,900 MXN/mes",
        description: "Estrategia completa de embudo en Meta con presupuestos altos y ROAS objetivo. Para empresas que escalan con publicidad como palanca de crecimiento.",
        includes: [
          "Campañas ilimitadas en full funnel (awareness, consideración, conversión)",
          "Creativos ilimitados con producción de video incluida",
          "Optimización por ROAS objetivo configurado",
          "Integración con CRM para atribución de ventas",
          "Reuniones semanales de estrategia",
        ],
        type: "monthly",
      },
    ],
    useCases: [
      { industry: "Servicios Locales", scenario: "Una clínica estética, salón de belleza o spa que quiere atraer clientes de su zona con campañas geolocalizadas en Instagram mostrando antes/después y promociones de temporada." },
      { industry: "E-commerce", scenario: "Una tienda en línea que usa Facebook e Instagram Ads para recuperar carritos abandonados, mostrar su catálogo dinámico a personas que visitaron productos y generar ventas directas." },
      { industry: "Bienes Raíces", scenario: "Una inmobiliaria que usa Meta Ads para generar leads de prospectos interesados en comprar departamentos o casas, con formularios de captación directo en el anuncio." },
      { industry: "Eventos y Entretenimiento", scenario: "Un organizador de eventos, festival o congreso que necesita vender boletos rápidamente con campañas de urgencia segmentadas a audiencias específicas por intereses." },
    ],
    relatedServices: [
      "marketing-digital",
      "gestion-redes-sociales",
      "diseno-desarrollo-web",
      "comercio-electronico-ecommerce",
      "produccion-contenido-digital",
    ],
  },

  "gestion-redes-sociales": {
    plans: [
      {
        name: "Presencia Starter",
        price: "Desde $3,490 MXN/mes",
        description: "Mantén activas tus redes con contenido consistente y profesional. Tu marca presente en redes sin que tengas que preocuparte por qué publicar.",
        includes: [
          "2 redes sociales (Instagram + Facebook)",
          "12 publicaciones mensuales",
          "Diseño gráfico con tu identidad",
          "Redacción de copys",
          "Reporte mensual de métricas básicas",
        ],
        type: "monthly",
      },
      {
        name: "Comunidad Activa",
        price: "Desde $7,490 MXN/mes",
        description: "Gestión completa con estrategia de contenido, comunidad y analítica. Construye una audiencia que te compra, no solo que te sigue.",
        includes: [
          "Hasta 4 redes sociales",
          "20 publicaciones mensuales + stories diarias",
          "Gestión de comentarios y mensajes directos",
          "Calendario editorial estratégico",
          "Reporte quincenal de analítica y ajustes",
          "1 Reel o video corto por semana",
        ],
        recommended: true,
        type: "monthly",
      },
      {
        name: "Marca Dominante",
        price: "Desde $14,900 MXN/mes",
        description: "Estrategia de contenido agresiva para marcas que quieren liderar su categoría. Contenido diario, producción audiovisual y colaboraciones con influencers.",
        includes: [
          "Todas las redes relevantes para tu marca",
          "Contenido diario en todos los canales",
          "Producción de video y fotografía mensual",
          "Colaboraciones con microinfluencers",
          "Estrategia de crecimiento orgánico",
          "Reuniones semanales de revisión",
        ],
        type: "monthly",
      },
    ],
    useCases: [
      { industry: "Restaurantes y Food", scenario: "Un restaurante que quiere mostrar platillos, ambiente y eventos especiales en Instagram y TikTok para generar reservaciones y aumentar la afluencia en días de baja concurrencia." },
      { industry: "Moda y Belleza", scenario: "Una marca de ropa o cosméticos que necesita contenido visual atractivo, stories con tutoriales, collabs con influencers locales y gestión de comentarios y DMs de clientes interesados." },
      { industry: "Constructoras y Arquitectura", scenario: "Un despacho de arquitectura o constructora que quiere mostrar proyectos terminados, proceso de obra y testimonios de clientes en LinkedIn e Instagram para atraer inversores y clientes." },
      { industry: "Instituciones Educativas", scenario: "Una escuela o instituto que usa redes para mostrar vida estudiantil, logros de alumnos, eventos académicos y captar prospectos en temporada de inscripciones." },
    ],
    relatedServices: [
      "produccion-contenido-digital",
      "publicidad-facebook-instagram-ads",
      "marketing-digital",
      "branding-identidad-corporativa",
      "posicionamiento-seo",
    ],
  },

  "produccion-contenido-digital": {
    plans: [
      {
        name: "Pack Starter",
        price: "Desde $4,990 MXN/mes",
        description: "Contenido visual recurrente para mantener tus canales digitales activos. Fotografía, gráficos y un video mensual listos para publicar.",
        includes: [
          "1 sesión fotográfica mensual (2 hrs)",
          "20 fotografías editadas y entregadas",
          "4 piezas gráficas para redes",
          "1 video corto (Reel/TikTok) editado",
          "Entrega en formatos para cada plataforma",
        ],
        type: "monthly",
      },
      {
        name: "Producción Profesional",
        price: "Desde $11,900 MXN/mes",
        description: "Producción audiovisual completa con estrategia de contenido integrada. Más volumen, más calidad y dirección creativa para que tu marca destaque.",
        includes: [
          "2 sesiones de producción mensuales",
          "40 fotografías + selección editorial",
          "4 Reels/videos cortos editados",
          "1 video largo (YouTube) editado",
          "10 piezas gráficas animadas",
          "Guión y dirección creativa incluidos",
        ],
        recommended: true,
        type: "monthly",
      },
      {
        name: "Producción Corporativa",
        price: "Desde $22,000 MXN",
        description: "Proyecto de producción audiovisual mayor: video institucional, campaña o lanzamiento. Pre-producción, rodaje profesional y post-producción completa.",
        includes: [
          "Pre-producción completa (guión, storyboard, casting)",
          "Producción en locación o estudio con equipo profesional",
          "Post-producción: edición, color, motion y música",
          "Formatos para TV, web, redes y presentaciones",
          "Derechos de uso ilimitados para la marca",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Hoteles y Turismo", scenario: "Un hotel boutique o resort que necesita fotografía profesional de habitaciones, amenidades y restaurante para Booking, su sitio web y campañas de Instagram que conviertan." },
      { industry: "Clínicas Estéticas", scenario: "Una clínica que quiere videos de procedimientos con consentimiento, fotos antes/después y Reels educativos para posicionarse como referente en su especialidad en redes." },
      { industry: "Marcas de Producto", scenario: "Una marca de producto (alimentos, cosméticos, suplementos) que necesita fotografía de producto profesional para e-commerce, publicidad y redes con estética coherente." },
      { industry: "Empresas B2B", scenario: "Una empresa industrial o de servicios que quiere video institucional, testimonios de clientes y casos de éxito en video para su sitio web y presentaciones comerciales." },
    ],
    relatedServices: [
      "gestion-redes-sociales",
      "publicidad-facebook-instagram-ads",
      "marketing-digital",
      "branding-identidad-corporativa",
      "posicionamiento-seo",
    ],
  },

  "consultoria-marketing": {
    plans: [
      {
        name: "Diagnóstico Digital",
        price: "Desde $6,990 MXN",
        description: "Análisis de tu situación actual y recomendaciones prioritarias. Claridad total antes de invertir en marketing: sabe exactamente a dónde va cada peso.",
        includes: [
          "Auditoría de presencia digital actual",
          "Análisis de 3 competidores principales",
          "Reporte de oportunidades y brechas",
          "Sesión de presentación de resultados (2 hrs)",
          "Entregable: documento ejecutivo de diagnóstico",
        ],
        type: "project",
      },
      {
        name: "Estrategia Completa",
        price: "Desde $18,900 MXN",
        description: "Estrategia de marketing digital completa lista para ejecutar. Buyer personas, multicanal, presupuesto recomendado y roadmap de 12 meses.",
        includes: [
          "Diagnóstico completo de mercado y competencia",
          "Definición de buyer personas (2-3 perfiles)",
          "Estrategia multicanal con presupuesto recomendado",
          "Roadmap de 12 meses con prioridades",
          "KPIs y métricas de éxito por etapa",
          "2 sesiones de seguimiento en los 60 días siguientes",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "CMO Externo",
        price: "Desde $18,000 MXN/mes",
        description: "Director de Marketing externo para tu empresa. Estrategia, supervisión y resultados sin el costo de contratar un CMO de tiempo completo.",
        includes: [
          "Reuniones semanales de dirección de marketing",
          "Supervisión de agencias o equipo interno",
          "Revisión y ajuste de estrategia mensual",
          "Contratación y briefing de proveedores",
          "Reporte ejecutivo mensual para dirección general",
        ],
        type: "monthly",
      },
    ],
    useCases: [
      { industry: "Empresas en Crecimiento", scenario: "Una empresa que creció orgánicamente y ahora quiere escalar con marketing pero no sabe por dónde empezar ni cuánto invertir: la consultoría les da claridad antes de gastar." },
      { industry: "Lanzamientos de Producto", scenario: "Una empresa que va a lanzar un producto nuevo y necesita estrategia de go-to-market: segmento objetivo, canales, mensaje, presupuesto y calendario de actividades." },
      { industry: "Cambio de Mercado", scenario: "Un negocio que históricamente vendía por referidos y ahora quiere abrir canales digitales: necesitan saber qué canales, con qué presupuesto y en qué orden atacar." },
      { industry: "Equipos Internos sin Dirección", scenario: "Una empresa con equipo de marketing interno desarticulado que necesita un director externo que alinee la estrategia, priorice esfuerzos y mida resultados con criterio de negocio." },
    ],
    relatedServices: [
      "marketing-digital",
      "posicionamiento-seo",
      "crm-gestion-comercial",
      "publicidad-facebook-instagram-ads",
      "gestion-redes-sociales",
    ],
  },

  // ── TECNOLOGÍA EMPRESARIAL ────────────────────────────────────────────────

  "crm-gestion-comercial": {
    plans: [
      {
        name: "CRM Starter",
        price: "Desde $12,900 MXN",
        description: "Implementación y configuración de CRM existente (HubSpot, Pipedrive) para tu proceso comercial. Nunca pierdas un prospecto por falta de seguimiento.",
        includes: [
          "Configuración de embudos y etapas de venta",
          "Importación de contactos existentes",
          "Integración con formularios web y correo",
          "Capacitación al equipo comercial (4 hrs)",
          "Manual de uso para vendedores",
        ],
        type: "project",
      },
      {
        name: "CRM + Automatizaciones",
        price: "Desde $29,900 MXN",
        description: "CRM configurado con automatizaciones, integraciones y dashboards ejecutivos. Tu equipo de ventas enfocado en cerrar, no en capturar datos.",
        includes: [
          "Todo del plan CRM Starter",
          "Automatización de seguimiento (emails, recordatorios, tareas)",
          "Integración con WhatsApp Business",
          "Dashboards de métricas comerciales en tiempo real",
          "Integración con el sitio web para captación automática",
          "Soporte técnico 3 meses incluido",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "CRM a Medida",
        price: "Desde $54,900 MXN",
        description: "Sistema CRM desarrollado 100% a medida para procesos comerciales complejos. Flujos de aprobación, portal de clientes e integración con tu ERP.",
        includes: [
          "Desarrollo de módulos comerciales a tu medida",
          "Flujos de aprobación y cotización integrados",
          "Portal de clientes con historial y documentos",
          "Integración con ERP o sistema de facturación",
          "App móvil para vendedores en campo",
          "Soporte y evolución 6 meses incluidos",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Equipos de Ventas B2B", scenario: "Una empresa de servicios con 5+ vendedores que pierde seguimiento de prospectos, no sabe en qué etapa está cada oportunidad y necesita visibilidad completa del pipeline para su director comercial." },
      { industry: "Distribuidoras", scenario: "Una distribuidora con cientos de clientes activos que necesita gestionar pedidos recurrentes, alertas de clientes inactivos y seguimiento de cobranza integrado con el proceso comercial." },
      { industry: "Sector Inmobiliario", scenario: "Una inmobiliaria que recibe leads de distintos canales (portal, redes, referidos) y necesita centralizarlos, asignarlos a asesores y dar seguimiento automatizado sin que ninguno se pierda." },
      { industry: "Servicios Médicos o Educativos", scenario: "Una clínica o escuela que quiere gestionar el ciclo completo desde el primer contacto del prospecto hasta la conversión, con recordatorios automáticos y métricas de captación por canal." },
    ],
    relatedServices: [
      "marketing-digital",
      "automatizacion-de-procesos",
      "integracion-de-sistemas",
      "business-intelligence-dashboards",
      "consultoria-marketing",
    ],
  },

  "plataformas-empresariales-enterprise": {
    plans: [
      {
        name: "Plataforma Starter",
        price: "Desde $67,900 MXN",
        description: "Primera fase con los módulos más críticos de tu operación. Empieza a digitalizar sin necesitar todo de golpe: resultados desde la primera entrega.",
        includes: [
          "Discovery y arquitectura de solución",
          "Hasta 4 módulos funcionales en fase 1",
          "Roles y permisos de usuario",
          "Dashboard de operación",
          "Soporte post-lanzamiento 3 meses",
        ],
        type: "project",
      },
      {
        name: "Plataforma Completa",
        price: "Desde $129,900 MXN",
        description: "Plataforma empresarial con todos los módulos necesarios para operar. Integrada a tus sistemas actuales, con app móvil y BI incluidos.",
        includes: [
          "Módulos ilimitados por fase de desarrollo",
          "Integración con sistemas existentes (ERP, contabilidad)",
          "App móvil para operación en campo",
          "Reportes y BI integrados",
          "Capacitación completa a usuarios y administradores",
          "Soporte y mantenimiento 12 meses",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "Ecosistema Digital",
        price: "A consultar",
        description: "Ecosistema tecnológico completo que reemplaza y unifica todos los sistemas de la empresa. Para grupos empresariales con operaciones complejas.",
        includes: [
          "Auditoría y migración de sistemas actuales",
          "Desarrollo por fases con entregas continuas",
          "Arquitectura multi-módulo y multi-empresa",
          "Integraciones con proveedores, clientes y gobierno",
          "Equipo dedicado de desarrollo",
          "Contrato de evolución continua",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Manufactura", scenario: "Una empresa manufacturera que necesita plataforma para gestionar órdenes de producción, control de calidad, inventario de materias primas y despacho, todo integrado en tiempo real." },
      { industry: "Grupo Empresarial", scenario: "Un grupo con múltiples empresas que quiere plataforma unificada para gestionar todas las entidades con visibilidad consolidada para la dirección corporativa." },
      { industry: "Franquicias", scenario: "Una franquicia que necesita sistema para que cada franquiciatario opere con procesos estandarizados, y la franquiciadora tenga visibilidad del desempeño de cada unidad." },
      { industry: "Servicios Financieros", scenario: "Una empresa de crédito o factoraje que necesita plataforma para gestión de solicitudes, análisis de riesgo, control de cartera y reportes regulatorios con trazabilidad completa." },
    ],
    relatedServices: [
      "sistemas-gestion-operativa",
      "integracion-de-sistemas",
      "automatizacion-de-procesos",
      "business-intelligence-dashboards",
      "soluciones-en-la-nube",
    ],
  },

  "inteligencia-artificial": {
    plans: [
      {
        name: "IA Starter",
        price: "Desde $22,900 MXN",
        description: "Implementación de una solución de IA para un proceso específico. Automatiza tareas repetitivas y responde a clientes sin intervención humana.",
        includes: [
          "Discovery y definición de caso de uso",
          "Implementación de chatbot o automatización con IA",
          "Integración con canal existente (web, WhatsApp)",
          "Entrenamiento con información de tu empresa",
          "30 días de ajuste y optimización",
        ],
        type: "project",
      },
      {
        name: "IA Empresarial",
        price: "Desde $54,900 MXN",
        description: "Múltiples soluciones de IA integradas en los procesos clave del negocio. Atención al cliente, análisis predictivo y clasificación automática de datos.",
        includes: [
          "Chatbot inteligente de atención al cliente",
          "Análisis predictivo de ventas o demanda",
          "Automatización de clasificación de datos",
          "Dashboard de métricas de desempeño de la IA",
          "Capacitación al equipo",
          "Soporte 6 meses incluido",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "IA Estratégica",
        price: "A consultar",
        description: "IA como ventaja competitiva central: modelos propios, datos propietarios y roadmap de largo plazo. Para empresas que quieren liderar con inteligencia.",
        includes: [
          "Estrategia de datos e IA a largo plazo",
          "Desarrollo de modelos propios o fine-tuning",
          "Infraestructura de datos (data lake / warehouse)",
          "Equipo de IA dedicado durante el proyecto",
          "Transferencia de conocimiento al equipo interno",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Atención al Cliente", scenario: "Una empresa con alto volumen de consultas repetitivas (horarios, precios, estado de pedidos) que quiere chatbot inteligente que resuelva el 70% de las preguntas sin intervención humana." },
      { industry: "Ventas y CRM", scenario: "Un equipo comercial que quiere IA para calificar automáticamente leads según su comportamiento, predecir qué prospectos tienen mayor probabilidad de cerrar y priorizar el seguimiento." },
      { industry: "Operaciones y Logística", scenario: "Una empresa de distribución que quiere predecir la demanda por producto y zona para optimizar inventarios, reducir mermas y planificar compras con mayor precisión." },
      { industry: "Salud", scenario: "Una clínica que quiere asistente virtual que guíe a pacientes en el triaje inicial, responda preguntas frecuentes sobre procedimientos y agende citas automáticamente según disponibilidad." },
    ],
    relatedServices: [
      "automatizacion-de-procesos",
      "crm-gestion-comercial",
      "business-intelligence-dashboards",
      "integracion-de-sistemas",
      "plataformas-empresariales-enterprise",
    ],
  },

  "automatizacion-de-procesos": {
    plans: [
      {
        name: "Automatización Starter",
        price: "Desde $4,990 MXN",
        description: "Automatización de 1-2 procesos simples con herramientas no-code. Elimina tareas manuales repetitivas y recupera horas productivas desde el primer mes.",
        includes: [
          "Mapeo del proceso actual",
          "Automatización con n8n, Make o Zapier",
          "Pruebas y documentación",
          "Capacitación para mantenerlo",
          "30 días de soporte incluido",
        ],
        type: "project",
      },
      {
        name: "Automatización Empresarial",
        price: "Desde $19,900 MXN",
        description: "Automatización de múltiples procesos con integraciones entre sistemas. Conecta tus plataformas y elimina la captura de datos duplicada.",
        includes: [
          "Diagnóstico y priorización de procesos",
          "Hasta 5 automatizaciones implementadas",
          "Integraciones con tus plataformas actuales",
          "Monitoreo y alertas de errores",
          "Documentación técnica completa",
          "Soporte 3 meses incluido",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "Automatización Avanzada",
        price: "Desde $49,900 MXN",
        description: "Automatización profunda de la operación con orquestación de procesos compleja. Dashboard de monitoreo y soporte de evolución por 12 meses.",
        includes: [
          "Automatizaciones ilimitadas en el alcance definido",
          "Desarrollo de flujos custom con código si se requiere",
          "Dashboard de monitoreo de todas las automatizaciones",
          "Optimización continua post-implementación",
          "Soporte y evolución 12 meses",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Recursos Humanos", scenario: "Una empresa que quiere automatizar onboarding de empleados: envío de documentos, creación de cuentas en sistemas, asignación de cursos y notificaciones a cada área, sin intervención manual." },
      { industry: "E-commerce", scenario: "Una tienda online que quiere automatizar: confirmación de pedidos, actualización de inventario, notificación a bodega, seguimiento de envío al cliente y solicitud de reseña post-entrega." },
      { industry: "Contabilidad y Finanzas", scenario: "Una empresa que genera decenas de facturas al mes y quiere que el proceso de conciliación, envío al cliente y registro contable ocurra automáticamente al aprobar una venta." },
      { industry: "Agencias de Marketing", scenario: "Una agencia que quiere automatizar reportes semanales para clientes, consolidando datos de Google Ads, Meta, Analytics y CRM en un documento automático sin trabajo manual." },
    ],
    relatedServices: [
      "integracion-de-sistemas",
      "crm-gestion-comercial",
      "inteligencia-artificial",
      "business-intelligence-dashboards",
      "sistemas-gestion-operativa",
    ],
  },

  "business-intelligence-dashboards": {
    plans: [
      {
        name: "Dashboard Starter",
        price: "Desde $12,900 MXN",
        description: "Dashboard ejecutivo para 1-2 áreas del negocio con las métricas más importantes. Toma decisiones basadas en datos, no en intuición.",
        includes: [
          "Conexión a 2-3 fuentes de datos",
          "Dashboard interactivo con filtros básicos",
          "Hasta 15 KPIs configurados",
          "Actualización diaria de datos",
          "Capacitación de uso (2 hrs)",
        ],
        type: "project",
      },
      {
        name: "BI Empresarial",
        price: "Desde $30,900 MXN",
        description: "Sistema BI completo con múltiples dashboards, alertas y reportes automáticos. Todas las áreas del negocio con visibilidad en una sola pantalla.",
        includes: [
          "Conexión a fuentes ilimitadas de datos",
          "Dashboards por área (ventas, finanzas, ops, marketing)",
          "Reportes automáticos programados",
          "Alertas configuradas por umbral de KPI",
          "Capacitación a directivos y gerentes",
          "Soporte técnico 6 meses",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "Data Warehouse + BI",
        price: "Desde $62,900 MXN",
        description: "Infraestructura de datos centralizada con BI avanzado para empresas con alto volumen de datos históricos y análisis predictivo.",
        includes: [
          "Diseño e implementación de Data Warehouse",
          "ETL de todas las fuentes de datos",
          "Modelo de datos unificado",
          "BI sobre datos históricos de años anteriores",
          "Análisis predictivo básico",
          "Administración y evolución continua",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Retail y Cadenas", scenario: "Una cadena de tiendas que quiere dashboard consolidado de ventas por sucursal, producto y vendedor, con alertas cuando alguna tienda cae por debajo del objetivo diario." },
      { industry: "Empresas de Servicios", scenario: "Una empresa de servicios que quiere visibilidad en tiempo real de su rentabilidad por proyecto, utilización de equipo y pipeline de ventas para tomar decisiones de contratación o ajuste." },
      { industry: "Logística", scenario: "Una empresa logística que quiere medir en tiempo real: pedidos entregados vs pendientes, tiempos de entrega, incidencias por conductor y costo por kilómetro recorrido." },
      { industry: "Finanzas y Dirección General", scenario: "Un director general que quiere un tablero ejecutivo que consolide en una pantalla las métricas críticas de todas las áreas del negocio: ventas, cobranza, gastos y rentabilidad." },
    ],
    relatedServices: [
      "automatizacion-de-procesos",
      "integracion-de-sistemas",
      "crm-gestion-comercial",
      "sistemas-gestion-operativa",
      "plataformas-empresariales-enterprise",
    ],
  },

  "integracion-de-sistemas": {
    plans: [
      {
        name: "Integración Starter",
        price: "Desde $5,990 MXN",
        description: "Conexión entre 2 plataformas para sincronizar un flujo de datos específico. Elimina la captura doble y los errores de datos entre tus sistemas.",
        includes: [
          "Análisis de APIs de ambos sistemas",
          "Desarrollo de integración unidireccional o bidireccional",
          "Pruebas de sincronización",
          "Documentación técnica",
          "30 días de soporte post-implementación",
        ],
        type: "project",
      },
      {
        name: "Hub de Integraciones",
        price: "Desde $24,900 MXN",
        description: "Múltiples integraciones conectando el ecosistema tecnológico de tu empresa. Todos tus sistemas hablando entre sí con monitoreo centralizado.",
        includes: [
          "Hasta 5 integraciones entre sistemas",
          "Monitoreo centralizado de todas las integraciones",
          "Alertas automáticas ante errores",
          "Logs de transacciones para auditoría",
          "Documentación técnica completa",
          "Soporte 3 meses",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "Integración Avanzada",
        price: "A consultar",
        description: "Integración compleja de ecosistemas empresariales con middleware propio. Para empresas con arquitecturas complejas y SLA de disponibilidad garantizado.",
        includes: [
          "Análisis de arquitectura de integración",
          "Desarrollo de middleware o bus de integración",
          "Integraciones ilimitadas en el alcance definido",
          "SLA de disponibilidad garantizado",
          "Monitoreo 24/7 con soporte de guardia",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "E-commerce + ERP", scenario: "Una tienda online que quiere que cada pedido de Shopify actualice automáticamente el inventario en su ERP, genere la factura y notifique a bodega sin ningún paso manual." },
      { industry: "CRM + Contabilidad", scenario: "Una empresa que quiere que cuando se cierra una venta en su CRM, automáticamente se genere la factura en su sistema contable y se registre el ingreso sin captura doble." },
      { industry: "Marketplaces + Almacén", scenario: "Una empresa que vende en MercadoLibre, Amazon y su propia tienda, y necesita sincronizar inventario en tiempo real en los tres canales desde un sistema centralizado." },
      { industry: "RH + Nómina", scenario: "Una empresa que quiere que los cambios en su sistema de RH (altas, bajas, cambios de sueldo) se reflejen automáticamente en el sistema de nómina sin recaptura ni errores." },
    ],
    relatedServices: [
      "automatizacion-de-procesos",
      "crm-gestion-comercial",
      "business-intelligence-dashboards",
      "plataformas-empresariales-enterprise",
      "sistemas-gestion-operativa",
    ],
  },

  "soluciones-en-la-nube": {
    plans: [
      {
        name: "Migración Cloud",
        price: "Desde $9,900 MXN",
        description: "Migración de sistemas o sitios existentes a infraestructura cloud con cero downtime. Deja los servidores físicos obsoletos y pasa a la nube sin interrupciones.",
        includes: [
          "Evaluación de infraestructura actual",
          "Plan de migración con cero downtime",
          "Configuración del entorno cloud en AWS, GCP o Azure",
          "Migración de datos y aplicaciones",
          "Pruebas post-migración y entrega documentada",
        ],
        type: "project",
      },
      {
        name: "Cloud Administrado",
        price: "Desde $3,990 MXN/mes",
        description: "Infraestructura cloud diseñada, implementada y administrada por Nexoweb. Escala automáticamente, paga solo lo que usas y nunca te preocupes por el servidor.",
        includes: [
          "Infraestructura cloud diseñada para tu carga de trabajo",
          "Auto-scaling según demanda (picos sin degradación)",
          "Backups diarios automatizados",
          "Monitoreo 24/7 con alertas proactivas",
          "Actualizaciones de seguridad",
          "Reporte mensual de costos y salud de infraestructura",
          "Soporte técnico prioritario",
        ],
        recommended: true,
        type: "monthly",
      },
      {
        name: "Cloud Avanzado",
        price: "Desde $7,900 MXN/mes",
        description: "Arquitectura cloud multi-región de alta disponibilidad para operaciones críticas. SLA 99.95%, disaster recovery y seguridad avanzada incluidos.",
        includes: [
          "Arquitectura multi-región de alta disponibilidad",
          "SLA 99.95% uptime garantizado",
          "Disaster recovery con RTO < 1 hora",
          "Seguridad avanzada (WAF, protección DDoS, SIEM)",
          "FinOps: optimización continua de costos cloud",
          "Soporte de guardia 24/7",
        ],
        type: "monthly",
      },
    ],
    useCases: [
      { industry: "Startups Tecnológicas", scenario: "Una startup que quiere infraestructura cloud desde el inicio, escalable según el crecimiento de usuarios, sin invertir en servidores propios ni contratar un equipo de DevOps." },
      { industry: "Empresas con Servidores Físicos", scenario: "Una empresa con servidores on-premise obsoletos que quiere migrar a la nube para reducir costos de mantenimiento, mejorar disponibilidad y acceder desde cualquier lugar." },
      { industry: "E-commerce de Temporada", scenario: "Una tienda online con picos de tráfico en Buen Fin o Navidad que necesita infraestructura que escale automáticamente en temporada alta y se reduzca para ahorrar el resto del año." },
      { industry: "Manufactura con Software Propio", scenario: "Una planta industrial con sistemas legacy que quiere mover su software de gestión a la nube para acceder desde múltiples sitios y tener respaldo garantizado ante fallas de hardware." },
    ],
    relatedServices: [
      "hosting-hospedaje-web",
      "ciberseguridad-proteccion-datos",
      "respaldo-recuperacion-informacion",
      "infraestructura-tecnologica",
      "soporte-tecnico-it",
    ],
  },

  "ciberseguridad-proteccion-datos": {
    plans: [
      {
        name: "Diagnóstico de Seguridad",
        price: "Desde $9,900 MXN",
        description: "Auditoría completa de vulnerabilidades y plan de remediación priorizado. Sabe exactamente cuáles son los riesgos de tu empresa antes de que alguien los explote.",
        includes: [
          "Escaneo de vulnerabilidades de sistemas y red",
          "Revisión de políticas de acceso actuales",
          "Evaluación de cumplimiento (LFPDPPP)",
          "Reporte con hallazgos y riesgo por vulnerabilidad",
          "Presentación ejecutiva de resultados",
        ],
        type: "project",
      },
      {
        name: "Seguridad Implementada",
        price: "Desde $24,900 MXN",
        description: "Implementación del plan de seguridad completo para proteger tu empresa. Corrección de vulnerabilidades, MFA, cifrado y cultura de seguridad en tu equipo.",
        includes: [
          "Corrección de todas las vulnerabilidades críticas",
          "Implementación de MFA y políticas de contraseñas",
          "Cifrado de datos sensibles",
          "Configuración de firewall y segmentación de red",
          "Capacitación de cultura de seguridad al equipo",
          "Políticas de seguridad documentadas",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "SOC como Servicio",
        price: "Desde $12,900 MXN/mes",
        description: "Monitoreo continuo de amenazas y respuesta a incidentes 24/7. Tu empresa protegida las 24 horas sin necesidad de un equipo de seguridad interno.",
        includes: [
          "Monitoreo de seguridad 24/7",
          "Detección y respuesta a incidentes (MDR)",
          "Análisis de logs y comportamiento anómalo",
          "Reportes mensuales de amenazas detectadas",
          "Plan de respuesta a incidentes activable",
        ],
        type: "monthly",
      },
    ],
    useCases: [
      { industry: "Sector Salud", scenario: "Una clínica o hospital que maneja expedientes médicos y datos sensibles de pacientes, y necesita cumplir con la LFPDPPP y proteger su información ante accesos no autorizados o ransomware." },
      { industry: "Servicios Financieros", scenario: "Una empresa de crédito, factoraje o pagos que maneja información financiera de clientes y requiere implementar controles de seguridad para cumplimiento regulatorio y proteger su operación." },
      { industry: "Despachos Jurídicos", scenario: "Un despacho de abogados que maneja información confidencial de clientes bajo secreto profesional y necesita garantizar que esa información no sea accesible por terceros." },
      { industry: "Retail con E-commerce", scenario: "Una empresa de retail que procesa pagos en línea y quiere asegurarse de cumplir con PCI DSS, proteger datos de tarjetas y blindar su tienda contra ataques e inyecciones de código." },
    ],
    relatedServices: [
      "hosting-hospedaje-web",
      "soluciones-en-la-nube",
      "respaldo-recuperacion-informacion",
      "soporte-tecnico-it",
      "infraestructura-tecnologica",
    ],
  },

  "infraestructura-tecnologica": {
    plans: [
      {
        name: "Red Empresarial",
        price: "Desde $14,900 MXN",
        description: "Diseño e implementación de red para oficina o sucursal. Conectividad estable, segmentación por área y acceso remoto configurado desde el primer día.",
        includes: [
          "Diseño de red LAN/WiFi para tu espacio",
          "Instalación de switches, access points y firewall",
          "Segmentación de red por departamento",
          "Configuración de VPN para acceso remoto",
          "Documentación de la red entregada",
        ],
        type: "project",
      },
      {
        name: "Infraestructura Completa",
        price: "Desde $32,900 MXN",
        description: "Infraestructura IT completa: red, servidores, equipos y acceso remoto. Un entorno tecnológico profesional listo para escalar con tu empresa.",
        includes: [
          "Todo del plan Red Empresarial",
          "Configuración de servidor de archivos o NAS",
          "Implementación de directorio activo (AD)",
          "Configuración de estaciones de trabajo",
          "Políticas de seguridad centralizadas",
          "Soporte técnico 3 meses incluido",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "Multi-Sitio Avanzado",
        price: "A consultar",
        description: "Infraestructura conectada para empresas con múltiples oficinas o sucursales. WAN interconectada, gestión centralizada y monitoreo 24/7 de todos los nodos.",
        includes: [
          "Diseño de WAN interconectando todas las sedes",
          "VPN site-to-site con redundancia",
          "Gestión centralizada desde un solo panel",
          "Monitoreo 24/7 de todos los nodos",
          "Plan de contingencia por sitio",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Oficinas Nuevas o Remodeladas", scenario: "Una empresa que está instalando una nueva oficina y necesita diseñar e instalar toda la infraestructura de red, servidores y conectividad antes de que el equipo se mude." },
      { industry: "Empresas en Crecimiento", scenario: "Un negocio que creció rápido y su red original ya no soporta la cantidad de dispositivos y usuarios: caídas constantes, wifi lento y sin segmentación de acceso." },
      { industry: "Manufactura y Planta", scenario: "Una planta industrial que necesita red robusta para conectar maquinaria, sistemas SCADA, cámaras IP y oficinas administrativas con acceso segmentado por área." },
      { industry: "Cadenas con Sucursales", scenario: "Una cadena de tiendas o restaurantes que quiere conectar todas sus sucursales a una red centralizada para gestión de POS, inventario y monitoreo de cámaras desde casa matriz." },
    ],
    relatedServices: [
      "soluciones-en-la-nube",
      "ciberseguridad-proteccion-datos",
      "soporte-tecnico-it",
      "hosting-hospedaje-web",
      "respaldo-recuperacion-informacion",
    ],
  },

  "soporte-tecnico-it": {
    plans: [
      {
        name: "Soporte Starter",
        price: "Desde $3,490 MXN/mes",
        description: "Soporte remoto para empresas pequeñas con hasta 10 usuarios. Alguien que resuelve tus problemas técnicos sin necesitar contratar personal de tiempo completo.",
        includes: [
          "Mesa de ayuda remota en horario hábil",
          "Hasta 10 usuarios atendidos",
          "Tiempo de respuesta: 4 hrs hábiles",
          "Gestión de usuarios en Google Workspace o M365",
          "Reporte mensual de incidentes",
        ],
        type: "monthly",
      },
      {
        name: "IT Administrado",
        price: "Desde $8,490 MXN/mes",
        description: "Departamento IT completo: soporte, mantenimiento preventivo y asesoría. Usuarios ilimitados con soporte prioritario y parches de seguridad automáticos.",
        includes: [
          "Usuarios ilimitados",
          "Soporte remoto prioritario (2 hrs hábiles)",
          "Mantenimiento preventivo mensual",
          "Gestión de licencias y activos tecnológicos",
          "Parches de seguridad automáticos",
          "Asesoría en decisiones tecnológicas",
        ],
        recommended: true,
        type: "monthly",
      },
      {
        name: "IT Avanzado",
        price: "Desde $17,900 MXN/mes",
        description: "Soporte IT crítico con respuesta garantizada y técnico semi-dedicado. Para empresas donde una hora sin sistemas representa pérdidas significativas.",
        includes: [
          "Técnico IT semi-dedicado (20 hrs/sem en tus instalaciones)",
          "Tiempo de respuesta: 1 hr para incidentes críticos",
          "Soporte 24/7 para sistemas críticos",
          "Gestión completa de infraestructura",
          "Reuniones quincenales de reporte ejecutivo",
        ],
        type: "monthly",
      },
    ],
    useCases: [
      { industry: "Despachos y Firmas", scenario: "Un despacho de abogados, contadores o arquitectos con 5-15 personas que necesita soporte técnico cuando algo falla, sin tener que contratar a alguien de tiempo completo." },
      { industry: "PyMEs en Crecimiento", scenario: "Una empresa que creció de 5 a 30 empleados y ahora tiene más equipos, más licencias de software y más problemas técnicos de los que su dueño puede resolver solo." },
      { industry: "Empresas con Trabajo Remoto", scenario: "Una organización con equipo híbrido que necesita que todos sus colaboradores tengan soporte técnico sin importar desde dónde trabajen: oficina, casa o viaje." },
      { industry: "Retail y Puntos de Venta", scenario: "Una cadena de tiendas que necesita soporte rápido cuando un punto de venta (POS) falla o la red de una sucursal se cae, minimizando el tiempo en que no pueden procesar ventas." },
    ],
    relatedServices: [
      "infraestructura-tecnologica",
      "ciberseguridad-proteccion-datos",
      "hosting-hospedaje-web",
      "correo-empresarial",
      "soluciones-en-la-nube",
    ],
  },

  "gestion-documental-digital": {
    plans: [
      {
        name: "Digitalización Starter",
        price: "Desde $14,900 MXN",
        description: "Sistema de gestión documental para un departamento o tipo de documento. Di adiós a los archiveros físicos y encuentra cualquier documento en segundos.",
        includes: [
          "Configuración del sistema para 1 departamento",
          "Digitalización de hasta 2,000 documentos físicos",
          "Estructura de carpetas y categorías",
          "Control de acceso básico por usuario",
          "Capacitación al equipo (4 hrs)",
        ],
        type: "project",
      },
      {
        name: "Gestión Documental Completa",
        price: "Desde $36,900 MXN",
        description: "Sistema empresarial para toda la organización con flujos y firma digital. Aprobaciones automáticas, búsqueda OCR y cumplimiento regulatorio incluidos.",
        includes: [
          "Sistema para todos los departamentos",
          "Flujos de aprobación configurados",
          "Firma digital integrada",
          "Búsqueda por texto completo (OCR)",
          "Versionado y control de cambios",
          "Integración con correo y sistemas existentes",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "Repositorio Corporativo",
        price: "A consultar",
        description: "Repositorio documental de gran escala con cumplimiento regulatorio. Para empresas con volúmenes masivos de documentos y requisitos normativos estrictos.",
        includes: [
          "Migración de volúmenes masivos de documentos",
          "Cumplimiento con NOM-004, ISO 15489 u otras",
          "Retención y expurgo por política legal",
          "Auditoría completa de accesos y cambios",
          "Integración con ERP y sistemas de negocio",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Sector Legal", scenario: "Un despacho jurídico que maneja expedientes de clientes en papel y quiere digitalizarlos, organizarlos por caso y controlar quién puede acceder a qué expediente desde cualquier dispositivo." },
      { industry: "Recursos Humanos", scenario: "Una empresa que quiere digitalizar expedientes de empleados (contratos, evaluaciones, permisos), con flujos de aprobación para documentos y firma digital de contratos nuevos." },
      { industry: "Construcción e Ingeniería", scenario: "Una constructora que maneja planos, permisos y contratos de múltiples proyectos y necesita repositorio con control de versiones para que todos trabajen siempre con el documento más reciente." },
      { industry: "Salud", scenario: "Una clínica que quiere digitalizar expedientes médicos cumpliendo la NOM-004-SSA3, con acceso controlado por médico tratante y auditoría de quién consultó cada expediente y cuándo." },
    ],
    relatedServices: [
      "automatizacion-de-procesos",
      "sistemas-gestion-operativa",
      "ciberseguridad-proteccion-datos",
      "respaldo-recuperacion-informacion",
      "integracion-de-sistemas",
    ],
  },

  "respaldo-recuperacion-informacion": {
    plans: [
      {
        name: "Backup Starter",
        price: "Desde $1,490 MXN/mes",
        description: "Respaldo automatizado de tus archivos y bases de datos más críticos. Protege lo más valioso de tu empresa por menos de lo que cuesta una hora de inactividad.",
        includes: [
          "Backup diario de archivos críticos y bases de datos (hasta 50 GB)",
          "Retención de 30 días",
          "Almacenamiento cifrado en nube",
          "Alertas automáticas si falla un respaldo",
          "Panel de monitoreo básico",
          "Restauración dentro de 24 horas hábiles",
          "Reporte mensual de estado de respaldos",
        ],
        type: "monthly",
      },
      {
        name: "Backup Profesional",
        price: "Desde $3,490 MXN/mes",
        description: "Estrategia completa de backup con plan de recuperación documentado y probado trimestralmente. Backups inmutables anti-ransomware incluidos.",
        includes: [
          "Backup de todos los sistemas y aplicaciones",
          "Retención configurable (hasta 1 año)",
          "Backups inmutables (protección anti-ransomware)",
          "Plan de recuperación ante desastres (DRP) documentado",
          "Pruebas de restauración trimestrales",
          "Monitoreo 24/7 con reporte mensual",
          "Restauración dentro de 4 horas",
        ],
        recommended: true,
        type: "monthly",
      },
      {
        name: "Continuidad de Negocio",
        price: "Desde $7,900 MXN/mes",
        description: "Alta disponibilidad y recuperación en minutos para operaciones críticas. RTO < 1 hora para que tu empresa nunca deje de operar ante cualquier incidente.",
        includes: [
          "Replicación en tiempo real de sistemas críticos",
          "RTO < 1 hora y RPO < 15 minutos",
          "Ambiente de recuperación pre-configurado y probado",
          "Pruebas de failover semestrales documentadas",
          "Soporte de guardia 24/7 para activación del plan",
        ],
        type: "monthly",
      },
    ],
    useCases: [
      { industry: "E-commerce", scenario: "Una tienda online que sabe que perder sus datos de clientes, pedidos e inventario sería catastrófico: necesita backup continuo y saber que puede restaurar en horas si algo falla." },
      { industry: "Sector Salud", scenario: "Una clínica que tiene obligación legal de conservar expedientes médicos y no puede permitirse perderlos: backup con retención de 5+ años y acceso histórico garantizado." },
      { industry: "Servicios Financieros", scenario: "Una empresa financiera que maneja transacciones y contratos de clientes: necesita backup inmutable anti-ransomware y plan de recuperación probado para cumplimiento regulatorio." },
      { industry: "Manufactura", scenario: "Una planta industrial donde una caída del sistema de producción cuesta cientos de miles de pesos por hora: necesita recuperación en minutos, no en días." },
    ],
    relatedServices: [
      "ciberseguridad-proteccion-datos",
      "soluciones-en-la-nube",
      "hosting-hospedaje-web",
      "soporte-tecnico-it",
      "infraestructura-tecnologica",
    ],
  },

  "sistemas-gestion-operativa": {
    plans: [
      {
        name: "Sistema Modular",
        price: "Desde $34,900 MXN",
        description: "Sistema para gestionar el área operativa más crítica de tu negocio. Digitaliza inventario o pedidos y empieza a ver resultados desde la primera semana.",
        includes: [
          "1-2 módulos operativos (inventario o pedidos)",
          "Panel de administración web",
          "Reportes básicos de operación",
          "Roles de usuario por área",
          "Capacitación y soporte 3 meses",
        ],
        type: "project",
      },
      {
        name: "Sistema Operativo Completo",
        price: "Desde $79,900 MXN",
        description: "Plataforma completa de gestión operativa integrada. Inventario, logística, calidad y dashboards en tiempo real para toda tu operación.",
        includes: [
          "Inventario, pedidos, logística y calidad",
          "Integración con proveedores y clientes",
          "App móvil para operación en piso o campo",
          "Dashboards operativos en tiempo real",
          "Alertas automáticas por umbral",
          "Soporte y evolución 12 meses",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "ERP a Medida",
        price: "A consultar",
        description: "Sistema de gestión empresarial completo que reemplaza y unifica todas las herramientas genéricas de tu empresa. Multi-empresa, multi-almacén y BI integrado.",
        includes: [
          "Módulos: ventas, compras, inventario, producción, finanzas",
          "Integración con gobierno (CFDI, IMSS, SAT)",
          "Multi-empresa y multi-almacén",
          "Portal para clientes y proveedores",
          "BI y reportes ejecutivos integrados",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Distribuidoras", scenario: "Una distribuidora que maneja cientos de SKUs y necesita controlar stock en tiempo real, gestionar órdenes de compra a proveedores y rastrear pedidos a clientes desde un solo sistema." },
      { industry: "Manufactura", scenario: "Una empresa de manufactura que quiere sistema para planear producción, controlar materias primas, registrar mermas y generar órdenes de trabajo para el piso de planta." },
      { industry: "Empresas de Servicios con Campo", scenario: "Una empresa de instalación o mantenimiento que necesita gestionar órdenes de servicio, asignarlas a técnicos en campo, registrar materiales usados y generar reporte de avance." },
      { industry: "Restaurantes y Cadenas de Alimentos", scenario: "Una cadena de restaurantes que necesita controlar inventario de insumos por sucursal, recetas y rendimiento de platillos, alertas de productos próximos a agotarse y compras centralizadas." },
    ],
    relatedServices: [
      "plataformas-empresariales-enterprise",
      "automatizacion-de-procesos",
      "integracion-de-sistemas",
      "business-intelligence-dashboards",
      "crm-gestion-comercial",
    ],
  },

  "transformacion-digital": {
    plans: [
      {
        name: "Diagnóstico Digital",
        price: "Desde $12,900 MXN",
        description: "Evaluación de madurez digital y roadmap de transformación. Sabe exactamente en qué estado está tu empresa y cuál es el camino más eficiente para digitalizarte.",
        includes: [
          "Diagnóstico de madurez digital por área",
          "Análisis de brecha vs empresas líderes del sector",
          "Roadmap de transformación priorizado",
          "Presentación ejecutiva de resultados",
          "Sesión de planeación estratégica",
        ],
        type: "project",
      },
      {
        name: "Transformación por Fases",
        price: "Desde $49,900 MXN",
        description: "Ejecución del roadmap de transformación digital en fases de 90 días. Cambio real con gestión del cambio y medición de resultados en cada etapa.",
        includes: [
          "Gestión del programa de transformación",
          "Implementación de herramientas y procesos por fase",
          "Gestión del cambio y capacitación de equipos",
          "Medición de adopción y resultados por fase",
          "Reuniones mensuales de revisión con dirección",
          "Ajuste de roadmap según aprendizajes",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "Transformación Total",
        price: "A consultar",
        description: "Programa de transformación profunda de 12-24 meses con equipo dedicado. Reingeniería de procesos, implementación tecnológica y nueva cultura digital.",
        includes: [
          "Director de Transformación Digital asignado",
          "Equipo multidisciplinario (tecnología, procesos, cambio)",
          "Rediseño de procesos y modelos de operación",
          "Implementación tecnológica completa",
          "Cultura digital y nuevas formas de trabajo",
          "Medición de impacto en resultados de negocio",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Empresas Familiares Tradicionales", scenario: "Una empresa familiar de 20+ años con procesos en papel, sin sistema de gestión y con comunicación por WhatsApp que quiere modernizarse para poder escalar y competir." },
      { industry: "Manufactura", scenario: "Una planta industrial que todavía registra producción en papel, toma decisiones por intuición y quiere digitalizar sus procesos para mejorar eficiencia y reducir desperdicios." },
      { industry: "Distribuidoras y Logística", scenario: "Una distribuidora que gestiona sus rutas y entregas con hojas de cálculo, sin visibilidad en tiempo real de sus operadores ni control de inventario confiable." },
      { industry: "Sector Salud", scenario: "Una clínica o laboratorio que opera con expedientes en papel y citas por teléfono, y quiere digitalizar todos sus procesos para mejorar la experiencia del paciente y la eficiencia del personal." },
    ],
    relatedServices: [
      "consultoria-tecnologica",
      "sistemas-gestion-operativa",
      "automatizacion-de-procesos",
      "plataformas-empresariales-enterprise",
      "business-intelligence-dashboards",
    ],
  },

  "consultoria-tecnologica": {
    plans: [
      {
        name: "Evaluación Tecnológica",
        price: "Desde $9,900 MXN",
        description: "Diagnóstico del estado actual de la tecnología en tu empresa. Identifica deuda técnica, riesgos y oportunidades antes de tomar decisiones costosas.",
        includes: [
          "Evaluación de sistemas y herramientas actuales",
          "Identificación de deuda técnica y riesgos",
          "Análisis de costos tecnológicos actuales",
          "Reporte con recomendaciones priorizadas",
          "Sesión de presentación (2 hrs)",
        ],
        type: "project",
      },
      {
        name: "Estrategia Tecnológica",
        price: "Desde $24,900 MXN",
        description: "Hoja de ruta tecnológica completa alineada a los objetivos del negocio. Inversiones tecnológicas justificadas, en el orden correcto y con ROI medible.",
        includes: [
          "Diagnóstico completo de arquitectura actual",
          "Benchmarking tecnológico vs industria",
          "Estrategia de inversión tecnológica 12-24 meses",
          "Selección de proveedores recomendados",
          "Roadmap de implementación con estimados",
          "2 sesiones de seguimiento post-entrega",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "CTO Externo",
        price: "Desde $19,900 MXN/mes",
        description: "Director de Tecnología externo para liderazgo técnico continuo. Supervisión de proveedores, arquitectura de soluciones y dirección sin el costo de un CTO de planta.",
        includes: [
          "Reuniones semanales de dirección tecnológica",
          "Supervisión de proveedores y equipo de desarrollo",
          "Due diligence de inversiones tecnológicas",
          "Arquitectura de soluciones y revisión de código",
          "Representación en reuniones de dirección",
        ],
        type: "monthly",
      },
    ],
    useCases: [
      { industry: "Empresas Pre-Inversión", scenario: "Una empresa que busca inversión privada o capital de riesgo y necesita due diligence tecnológico para demostrar la solidez de su plataforma a los inversores." },
      { industry: "Startups sin CTO", scenario: "Una startup en etapa temprana que tiene equipo de negocio pero no sabe qué tecnología elegir ni cómo estructurar su arquitectura: un CTO externo les da dirección sin el costo de uno de tiempo completo." },
      { industry: "Empresas en Adquisición", scenario: "Una empresa que está adquiriendo otra y necesita evaluar la calidad y deuda técnica del sistema que van a heredar, antes de cerrar la transacción." },
      { industry: "Dirección Sin Perfil Técnico", scenario: "Un director general o dueño de negocio que toma decisiones de tecnología sin tener el perfil técnico para evaluarlas, y quiere un asesor de confianza que traduzca las recomendaciones a lenguaje de negocio." },
    ],
    relatedServices: [
      "transformacion-digital",
      "plataformas-empresariales-enterprise",
      "sistemas-gestion-operativa",
      "automatizacion-de-procesos",
      "integracion-de-sistemas",
    ],
  },

  "calidad-mejora-continua-digital": {
    plans: [
      {
        name: "Módulo de Calidad",
        price: "Desde $18,900 MXN",
        description: "Sistema digital para gestionar un proceso de calidad específico. Registros digitales, alertas automáticas e indicadores en tiempo real desde el primer mes.",
        includes: [
          "Digitalización de 1 proceso de calidad",
          "Formularios de registro y evidencia",
          "Alertas y notificaciones automáticas",
          "Reporte de indicadores básicos",
          "Capacitación al equipo (4 hrs)",
        ],
        type: "project",
      },
      {
        name: "Sistema de Gestión de Calidad",
        price: "Desde $46,900 MXN",
        description: "Sistema completo de gestión de calidad digital para toda la empresa. No conformidades, auditorías y reportes para certificaciones en una sola plataforma.",
        includes: [
          "Todos los módulos de calidad requeridos",
          "Flujos de no conformidades y acciones correctivas",
          "Auditorías internas digitalizadas",
          "Indicadores de desempeño por proceso",
          "Reportes para certificaciones (ISO, IATF, FSSC)",
          "Soporte durante auditorías externas",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "Calidad Avanzada",
        price: "A consultar",
        description: "Plataforma de calidad integrada al ecosistema productivo de la empresa. Control estadístico de procesos, trazabilidad completa y módulo Kaizen incluido.",
        includes: [
          "Integración con sistemas de producción y ERP",
          "Control estadístico de procesos (SPC)",
          "Trazabilidad completa por lote o producto",
          "Gestión de proveedores y auditorías externas",
          "Módulo de mejora continua (Kaizen, Six Sigma)",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Manufactura con ISO 9001", scenario: "Una empresa manufacturera que quiere o mantiene la certificación ISO 9001 y necesita digitalizar todos los registros, auditorías y acciones correctivas para cumplir con los requisitos del sistema." },
      { industry: "Alimentos (FSSC 22000 / BRC)", scenario: "Una empresa de alimentos con certificación de inocuidad que necesita registrar en tiempo real controles de temperatura, puntos críticos de control y no conformidades en línea de producción." },
      { industry: "Automotriz (IATF 16949)", scenario: "Un proveedor automotriz que necesita gestión digital de planes de control, AMEF, características especiales y auditorías de proceso para mantener su certificación y responder a auditorías de clientes OEM." },
      { industry: "Servicios de Salud", scenario: "Una clínica u hospital que quiere implementar sistema de gestión de calidad para acreditación y medir indicadores de calidad de atención, tiempos de espera y satisfacción del paciente." },
    ],
    relatedServices: [
      "sistemas-gestion-operativa",
      "automatizacion-de-procesos",
      "business-intelligence-dashboards",
      "integracion-de-sistemas",
      "gestion-documental-digital",
    ],
  },

  "soluciones-digitales-iglesias": {
    plans: [
      {
        name: "Presencia Starter",
        price: "Desde $8,990 MXN",
        description: "Sitio web institucional y transmisión en vivo para tu congregación. Alcanza a tus miembros y a nuevos visitantes más allá de las paredes de tu iglesia.",
        includes: [
          "Sitio web institucional responsive",
          "Calendario de eventos y servicios",
          "Integración con YouTube o Facebook Live",
          "Formulario de contacto y oración",
          "Panel de administración para el equipo pastoral",
        ],
        type: "project",
      },
      {
        name: "Ecosistema Congregacional",
        price: "Desde $19,900 MXN",
        description: "Plataforma completa con app, streaming y gestión de membresía. Conecta a tu congregación, registra asistencia y recibe ofrendas en línea desde cualquier lugar.",
        includes: [
          "Sitio web + app móvil para congregación",
          "Streaming en vivo multicanal",
          "Sistema de membresía y grupos celulares",
          "Gestión de asistencia digital",
          "Notificaciones push a la congregación",
          "Diezmos y ofrendas en línea",
        ],
        recommended: true,
        type: "project",
      },
      {
        name: "Plataforma Ministerial",
        price: "Desde $38,900 MXN",
        description: "Plataforma completa para iglesias grandes o redes de iglesias. Multi-campus, CRM pastoral, academia online y reportes de crecimiento incluidos.",
        includes: [
          "Todo del plan Ecosistema Congregacional",
          "Gestión de múltiples campus o sedes",
          "Portal de recursos y biblioteca multimedia",
          "CRM pastoral para seguimiento de miembros",
          "Reportes financieros y de crecimiento",
          "Academia online para capacitación ministerial",
        ],
        type: "project",
      },
    ],
    useCases: [
      { industry: "Iglesias Locales", scenario: "Una iglesia local que quiere transmitir sus cultos en vivo por internet para alcanzar a miembros que no pueden asistir presencialmente y registrar nuevos visitantes digitalmente." },
      { industry: "Redes de Iglesias", scenario: "Una red con múltiples congregaciones que necesita plataforma unificada para compartir recursos, gestionar membresía de cada iglesia y reportar métricas de crecimiento a la coordinación central." },
      { industry: "Ministerios de Jóvenes", scenario: "Un ministerio de jóvenes que quiere app con devocionales diarios, grupos de WhatsApp estructurados, registro de eventos y plataforma para compartir contenido audiovisual con la juventud." },
      { industry: "Organizaciones Sin Fines de Lucro", scenario: "Una fundación o ministerio social que necesita sitio para comunicar su impacto, recibir donaciones en línea, gestionar voluntarios y reportar resultados a sus donantes y aliados." },
    ],
    relatedServices: [
      "diseno-desarrollo-web",
      "gestion-redes-sociales",
      "produccion-contenido-digital",
      "marketing-digital",
      "hosting-hospedaje-web",
    ],
  },
};

// ── Por qué elegir Nexoweb — razones específicas por servicio ─────────────────

export const whyChooseBySlug: Record<string, string[]> = {

  // ── PRESENCIA DIGITAL ──────────────────────────────────────────────────────

  "diseno-desarrollo-web": [
    "Diseño 100% original — construido con tu identidad, no con plantillas genéricas.",
    "Mobile-first y velocidad optimizada — tu sitio carga rápido en cualquier dispositivo.",
    "SEO técnico incluido desde el inicio — Google puede encontrarte desde el día del lanzamiento.",
    "Integración con WhatsApp y formularios inteligentes — captura leads automáticamente.",
    "Panel de administración intuitivo — editas tu contenido sin tocar una línea de código.",
    "30 días de garantía post-entrega — ajustes sin costo después de lanzar.",
  ],

  "comercio-electronico-ecommerce": [
    "Pasarelas de pago integradas (Stripe, Conekta, MercadoPago) — cobras desde el día uno.",
    "Catálogo e inventario ilimitado — administras productos, precios y variantes tú mismo.",
    "Flujo de compra optimizado para reducir el abandono de carrito y aumentar conversiones.",
    "SEO para productos — tus artículos aparecen en Google y Google Shopping.",
    "Estrategia de lanzamiento incluida — te ayudamos a empezar a vender desde el primer día.",
    "Escalable a mercado nacional e internacional sin necesidad de rediseño.",
  ],

  "desarrollo-aplicaciones-web": [
    "Arquitectura profesional — código limpio, escalable y documentado desde el inicio.",
    "Sprints semanales — ves avances reales, no solo resultados al final del proyecto.",
    "Pruebas exhaustivas antes de producción — entregamos algo que funciona, no un beta.",
    "Documentación técnica incluida — tu equipo puede mantener y evolucionar el sistema.",
    "Sin vendor lock-in — eres dueño del código y puedes llevarlo donde quieras.",
    "Soporte y evolución continua después del lanzamiento.",
  ],

  "desarrollo-aplicaciones-moviles": [
    "Publicación en App Store y Google Play gestionada por nosotros de principio a fin.",
    "Diseño UI/UX nativo — la app se siente parte del ecosistema de cada plataforma.",
    "Compatibilidad con versiones nuevas del sistema operativo garantizada.",
    "Notificaciones push, métricas de uso y analítica integradas desde el inicio.",
    "Pruebas en dispositivos reales antes del lanzamiento — no solo en emuladores.",
    "Plan de evolución continua basado en el feedback real de tus usuarios.",
  ],

  "branding-identidad-corporativa": [
    "Diseño estratégico — cada elemento comunica lo que quieres transmitir, con intención.",
    "Coherencia en todos los canales: web, redes sociales, impresión y señalética.",
    "Archivos maestros en todos los formatos necesarios (SVG, PNG, PDF, AI).",
    "Manual de marca incluido — tu equipo aplica la identidad correctamente sin depender de nosotros.",
    "Proceso iterativo — apruebas cada etapa antes de avanzar, sin sorpresas.",
    "Estudio de competencia y posicionamiento de marca incluido.",
  ],

  "hosting-hospedaje-web": [
    "Infraestructura administrada por nosotros — tú te enfocas en tu negocio, nosotros en que funcione.",
    "SSL, backups automáticos y monitoreo continuo sin costo adicional.",
    "Soporte técnico directo — hablas con quien administra tu servidor, no con un chatbot.",
    "Migración de tu sitio actual incluida sin tiempo de inactividad.",
    "Panel de control claro — ves el estado de tu infraestructura en tiempo real.",
    "Planes escalables — creces sin cambiar de proveedor ni rediseñar nada.",
  ],

  "correo-empresarial": [
    "Correos con tu dominio propio — proyectas profesionalismo desde el primer mensaje.",
    "Configuración en todos los dispositivos (móvil, escritorio, tablet) incluida.",
    "Antispam y seguridad avanzada — tus correos llegan y los no deseados se quedan fuera.",
    "Sin límites restrictivos de almacenamiento en planes administrados.",
    "Migración desde cualquier proveedor anterior sin pérdida de datos.",
    "Soporte técnico directo si algo falla — respuesta en horas, no días.",
  ],

  "registro-administracion-dominios": [
    "Administramos tus dominios para que nunca pierdas uno por vencimiento.",
    "Renovaciones automáticas con aviso previo — cero riesgo de expiración inesperada.",
    "Configuración DNS, subdominios y redirecciones incluidas sin cargo extra.",
    "Asesoría en la elección de extensión (.com, .mx, .com.mx) según tu mercado objetivo.",
    "Portafolio centralizado — todos tus dominios en un solo lugar y bajo tu control.",
    "Transferencias y traspaso de dominios existentes sin complicaciones técnicas.",
  ],

  // ── MARKETING Y CAPTACIÓN ─────────────────────────────────────────────────

  "posicionamiento-seo": [
    "SEO local en Saltillo y posicionamiento nacional — donde están tus clientes reales.",
    "Auditoría técnica completa al inicio — identificamos exactamente qué frena tu posicionamiento.",
    "Reportes de ranking mensuales — ves en qué posición estás y cómo evoluciona.",
    "Contenido estratégico — creamos lo que Google y tus prospectos quieren leer.",
    "Sin promesas falsas — te decimos cuánto tarda y por qué. El SEO real requiere consistencia.",
    "Implementado directamente en tu sitio — sin plugins externos que pueden fallar o desactualizarse.",
  ],

  "marketing-digital": [
    "Estrategia integral — no solo campañas aisladas, construimos tu presencia digital completa.",
    "Reportes semanales con métricas reales — sin dashboards bonitos que no te dicen nada.",
    "Presupuesto 100% trazable — cada peso invertido tiene seguimiento y justificación.",
    "Equipo propio — quien planea es quien ejecuta. Sin outsourcing silencioso.",
    "A/B testing continuo — mejoramos creativos y mensajes con datos, no con suposiciones.",
    "Integración con tu sitio y CRM — trazabilidad completa del lead hasta la venta cerrada.",
  ],

  "publicidad-facebook-instagram-ads": [
    "Segmentación avanzada — llegamos a quien tiene más probabilidades reales de comprar.",
    "Creativos diseñados por nuestro equipo — imágenes y textos que detienen el scroll.",
    "Optimización diaria de campañas — ajustamos presupuestos y creativos en tiempo real.",
    "Reportes semanales claros — costo por lead, alcance y conversiones reales, sin tecnicismos.",
    "Sin presupuesto mínimo de entrada — arrancamos con lo que tienes y escalamos con resultados.",
    "Estrategia de embudo completa — atraemos, convertimos y retargeteamos a quien ya te conoce.",
  ],

  "gestion-redes-sociales": [
    "Contenido diseñado y redactado por nuestro equipo — diseño, copy y programación incluidos.",
    "Voz consistente con tu marca — nunca parece genérico ni producido por un bot.",
    "Calendario editorial mensual — siempre sabes qué se va a publicar y cuándo.",
    "Atención a comentarios y mensajes — tu comunidad nunca queda sin respuesta.",
    "Reportes mensuales de desempeño — alcance, engagement y crecimiento real.",
    "Estrategia diferenciada por red — lo que funciona en Instagram no es lo mismo que en LinkedIn.",
  ],

  "produccion-contenido-digital": [
    "Contenido estratégico — creamos con objetivo claro, no para llenar espacios del calendario.",
    "SEO integrado en cada pieza — tu contenido posiciona en Google y convierte lectores en clientes.",
    "Equipo creativo propio — redactores, diseñadores y estrategas trabajando juntos.",
    "Calendario de publicación y distribución incluido en el plan.",
    "Formatos múltiples — artículos, videos cortos, infografías, newsletters, podcasts y más.",
    "Medición de impacto — sabes qué contenido genera leads y cuál no está rindiendo.",
  ],

  "consultoria-marketing": [
    "Diagnóstico basado en tus datos reales — no en suposiciones ni mejores prácticas genéricas.",
    "Estrategia documentada y ejecutable — recibes un plan que tu equipo puede implementar.",
    "Sin conflicto de interés — te decimos lo que necesitas, no lo que queremos venderte.",
    "Benchmarking contra tu competencia directa en el mercado local y nacional.",
    "Acompañamiento en la implementación si lo necesitas — no solo el diagnóstico.",
    "Sesiones de revisión incluidas — la estrategia se ajusta según los resultados reales.",
  ],

  // ── TECNOLOGÍA EMPRESARIAL ────────────────────────────────────────────────

  "crm-gestion-comercial": [
    "CRM diseñado para tu proceso comercial real — no adaptado de una plantilla genérica.",
    "Automatizaciones que eliminan tareas manuales — tu equipo vende más y administra menos.",
    "Integración nativa con WhatsApp, correo y tu sitio web.",
    "Panel gerencial con métricas de ventas en tiempo real para tomar decisiones con datos.",
    "Capacitación completa — tu equipo adopta el sistema con confianza desde el primer día.",
    "Acceso directo al equipo técnico para ajustes — sin tickets ni tiempos de espera largos.",
  ],

  "plataformas-empresariales-enterprise": [
    "Arquitectura diseñada para escala — soporta el crecimiento de tu empresa sin límites técnicos.",
    "Integración con tus sistemas actuales (ERP, contabilidad, logística, CRM).",
    "Desarrollo por fases — inviertes de forma progresiva según las prioridades reales del negocio.",
    "Documentación técnica completa — tu equipo IT puede mantener y evolucionar el sistema.",
    "Seguridad enterprise — roles, permisos, auditoría de accesos y cumplimiento normativo.",
    "Sin vendor lock-in — eres dueño de la plataforma y de su código fuente.",
  ],

  "inteligencia-artificial": [
    "IA aplicada a tu operación real — no demos de laboratorio, soluciones que funcionan hoy.",
    "Modelos entrenados con tus datos — mayor precisión y resultados específicos para tu industria.",
    "Integración directa en tus sistemas y flujos actuales sin interrumpir la operación.",
    "ROI medible — definimos métricas de éxito concretas antes de implementar.",
    "Equipo con experiencia en proyectos de IA productivos, no solo exploratorios.",
    "Acompañamiento en la adopción — tu equipo entiende qué hace la IA y por qué.",
  ],

  "automatizacion-de-procesos": [
    "Diagnóstico de procesos incluido — identificamos qué automatizar para el mayor impacto.",
    "Automatizaciones conectadas a las herramientas que ya usas (WhatsApp, correo, ERP, CRM).",
    "Reducción de errores humanos en procesos repetitivos y de alto volumen.",
    "ROI visible desde las primeras semanas — mides el tiempo y costo que ahorras.",
    "Documentación completa de cada automatización — sin cajas negras en tu operación.",
    "Soporte y ajuste continuo — la automatización evoluciona junto con tu proceso.",
  ],

  "business-intelligence-dashboards": [
    "Dashboards diseñados para tomadores de decisión, no para analistas de datos.",
    "Integración con tus fuentes actuales — ERP, CRM, Excel, bases de datos y más.",
    "Actualización en tiempo real o programada según tus necesidades operativas.",
    "Visualizaciones claras — los indicadores más importantes siempre visibles de un vistazo.",
    "Capacitación incluida — tu equipo interpreta los datos con confianza y autonomía.",
    "Evolución constante — nuevas métricas y vistas a medida que tu negocio crece.",
  ],

  "integracion-de-sistemas": [
    "Conectamos sistemas que no se hablan — sin migración ni reemplazo costoso.",
    "Experiencia con APIs propias y de terceros bajo los principales estándares del mercado.",
    "Pruebas exhaustivas de consistencia de datos antes de salir a producción.",
    "Documentación técnica de cada integración — tu equipo IT sabe qué hace cada conexión.",
    "Monitoreo de las integraciones en producción — alertas automáticas si algo falla.",
    "Implementación en paralelo a tu operación — sin interrupciones en tu día a día.",
  ],

  "soluciones-en-la-nube": [
    "Migración planificada — sin tiempo de inactividad ni pérdida de datos durante el proceso.",
    "Infraestructura escalable — pagas por lo que usas y creces sin fricciones técnicas.",
    "Seguridad, backups automáticos y redundancia incluidos en todos los planes.",
    "Soporte de un equipo que conoce tu infraestructura desde adentro.",
    "Reducción de costos operativos frente a servidores físicos propios.",
    "Acceso desde cualquier lugar — tu equipo trabaja sin depender de una oficina.",
  ],

  "ciberseguridad-proteccion-datos": [
    "Auditoría inicial completa — identificamos vulnerabilidades antes de que alguien más lo haga.",
    "Soluciones adaptadas a tu industria y nivel de riesgo — no paquetes genéricos de caja.",
    "Cumplimiento normativo (LFPDPPP, ISO 27001 y otros según tu sector).",
    "Capacitación a tu equipo — el error humano es la principal causa de incidentes de seguridad.",
    "Respuesta a incidentes incluida — sabemos exactamente qué hacer si algo ocurre.",
    "Monitoreo continuo — detectamos amenazas antes de que escalen a un problema mayor.",
  ],

  "infraestructura-tecnologica": [
    "Diseño de infraestructura alineado a tu operación real — ni sobredimensionado ni limitado.",
    "Implementación sin interrumpir tu operación actual ni afectar a tus usuarios.",
    "Soporte técnico directo con quien administra tu infraestructura, no con un helpdesk externo.",
    "Monitoreo proactivo — resolvemos antes de que el problema llegue a afectarte.",
    "Documentación completa de tu entorno — nunca dependes del conocimiento de una sola persona.",
    "Escalabilidad planificada — creces sin tener que rediseñar toda la arquitectura.",
  ],

  "soporte-tecnico-it": [
    "Respuesta en horas, no días — acceso directo al equipo técnico sin tickets interminables.",
    "Soporte remoto y presencial en Saltillo, Coahuila — estamos donde nos necesitas.",
    "Soporte proactivo, no reactivo — identificamos problemas antes de que afecten tu operación.",
    "Documentación de tu entorno — cualquier miembro del equipo puede dar continuidad.",
    "Sin costo sorpresa — planes mensuales con disponibilidad garantizada y clara.",
    "Un equipo que ya conoce tu infraestructura — no técnicos que llegan de cero cada vez.",
  ],

  "gestion-documental-digital": [
    "Digitalización de archivos físicos incluida en el plan de implementación.",
    "Búsqueda inteligente — cualquier documento en segundos, sin importar el volumen.",
    "Control de acceso por roles — cada persona ve y edita solo lo que le corresponde.",
    "Versionado automático — nunca pierdes el historial completo de un documento.",
    "Cumplimiento normativo para documentos fiscales, legales y de calidad.",
    "Capacitación completa — tu equipo adopta el sistema con autonomía desde el primer día.",
  ],

  "respaldo-recuperacion-informacion": [
    "Respaldo automático y verificado — nos aseguramos de que realmente se pueda restaurar.",
    "Pruebas de recuperación periódicas — no descubrimos el problema en el peor momento posible.",
    "RPO y RTO definidos — sabes exactamente cuántos datos y cuánto tiempo puedes perder.",
    "Respaldo en múltiples ubicaciones — protección ante desastres físicos y lógicos.",
    "Alertas en tiempo real si el respaldo falla — cero sorpresas cuando más importa.",
    "Cumplimiento de políticas de retención de datos según tu industria y normativa.",
  ],

  "sistemas-gestion-operativa": [
    "Sistema diseñado para tu flujo operativo real — no para el proceso estándar de otro negocio.",
    "Implementación por módulos — adopción gradual sin disrupciones en tu operación.",
    "Integración con tus herramientas actuales (contabilidad, CRM, logística).",
    "Reportes operativos en tiempo real — toma decisiones con datos del día, no del mes pasado.",
    "Capacitación a usuarios operativos y administradores del sistema.",
    "Soporte continuo y evolución — el sistema crece conforme crece tu operación.",
  ],

  "transformacion-digital": [
    "Diagnóstico honesto — te decimos dónde estás realmente antes de proponer cualquier solución.",
    "Hoja de ruta por etapas — transformación progresiva sin paralizar tu operación actual.",
    "Equipo multidisciplinario — estrategia, tecnología y gestión del cambio trabajando juntos.",
    "Métricas de éxito definidas desde el inicio — sabes si la transformación está funcionando.",
    "Acompañamiento en la gestión del cambio — tu equipo adopta lo nuevo con confianza.",
    "Inversión progresiva — cada etapa demuestra valor antes de comprometer la siguiente.",
  ],

  "consultoria-tecnologica": [
    "Diagnóstico basado en tu realidad — no en mejores prácticas genéricas del mercado.",
    "Sin conflicto de interés — te decimos lo que necesitas, no lo que queremos venderte.",
    "Recomendaciones documentadas y ejecutables por tu equipo o el nuestro.",
    "Benchmarking contra soluciones reales del mercado para tu industria y tamaño de empresa.",
    "Acompañamiento en la toma de decisión — compras lo que necesitas, no lo que te ofrecen.",
    "Revisiones de avance incluidas — validamos que las recomendaciones están generando resultados.",
  ],

  "calidad-mejora-continua-digital": [
    "Sistema adaptado a tu marco normativo específico (ISO 9001, IATF, FSSC, etc.).",
    "Registros digitales auditables — cualquier auditor encuentra todo lo que necesita en segundos.",
    "Flujos de no conformidades y acciones correctivas automatizados con seguimiento.",
    "Panel de indicadores de calidad en tiempo real visible para el equipo gerencial.",
    "Interfaz simplificada para usuarios operativos — no necesitan entender la norma para usarlo.",
    "Soporte durante auditorías de certificación — estamos contigo cuando más importa.",
  ],

  "soluciones-digitales-iglesias": [
    "Experiencia real con instituciones religiosas — entendemos la dinámica pastoral y administrativa.",
    "Soluciones diseñadas para este contexto — no adaptaciones forzadas de sistemas corporativos.",
    "Streaming simultáneo en YouTube, Facebook y el sitio institucional sin configuraciones complejas.",
    "Sistema de membresía, grupos celulares y comunicación interna integrados.",
    "Capacitación para el equipo ministerial — sin tecnicismos, con paciencia y acompañamiento.",
    "Precios accesibles para instituciones sin fines de lucro — lo contemplamos desde la propuesta.",
  ],
};
