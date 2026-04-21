export default function Home() {
  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Servicios", href: "#servicios" },
    { label: "Paquetes", href: "#paquetes" },
    { label: "Nichos", href: "#nichos" },
    { label: "Portafolio", href: "#portafolio" },
    { label: "Blog", href: "#blog" },
    { label: "Contacto", href: "#contacto" },
  ];

  const services = [
    {
      title: "Branding y diseno de marca",
      description:
        "Creamos marcas con posicionamiento real: identidad visual, narrativa y lineamientos para vender con coherencia.",
    },
    {
      title: "Hosting administrado",
      description:
        "Infraestructura premium, segura y monitoreada para que tu operacion este siempre activa y sin fricciones.",
    },
    {
      title: "Diseno web profesional",
      description:
        "Sitios y landing pages orientados a conversion, experiencia de usuario y autoridad digital.",
    },
    {
      title: "Desarrollo de sistemas (CRM y mas)",
      description:
        "Sistemas y modulos a medida para controlar ventas, procesos y operacion desde un solo flujo.",
    },
    {
      title: "Soporte IT",
      description:
        "Soporte tecnico continuo para prevenir fallas, resolver incidencias y proteger la continuidad del negocio.",
    },
    {
      title: "Marketing digital y captacion de clientes",
      description:
        "Estrategia, pauta y contenido para atraer demanda calificada y convertirla en oportunidades comerciales.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Diagnostico profundo",
      text: "Revisamos negocio, oferta, trafico y conversion para definir prioridades de impacto.",
    },
    {
      step: "02",
      title: "Arquitectura de crecimiento",
      text: "Disenamos la solucion visual, tecnica y comercial alineada a tus objetivos reales.",
    },
    {
      step: "03",
      title: "Ejecucion por sprints",
      text: "Entregamos rapido con validaciones semanales y foco en resultados medibles.",
    },
    {
      step: "04",
      title: "Optimizacion continua",
      text: "Iteramos con datos para incrementar conversion y eficiencia operativa.",
    },
  ];

  const metrics = [
    { value: "360°", label: "solucion integral en un solo equipo" },
    { value: "24/7", label: "soporte y monitoreo de infraestructura" },
    { value: "SEO", label: "base tecnica para visibilidad organica" },
    { value: "CRM", label: "sistemas para ordenar ventas y servicio" },
  ];

  const cases = [
    {
      name: "Empresa B2B de servicios",
      result: "Incremento de reuniones calificadas en 60 dias",
    },
    {
      name: "Operacion comercial regional",
      result: "Reduccion del costo por lead con web y campanas integradas",
    },
    {
      name: "Firma en crecimiento",
      result: "Centralizacion de CRM, soporte y seguimiento comercial",
    },
  ];

  const plans = [
    {
      name: "Plan Basico",
      idealFor: "Negocios que inician su presencia digital",
      summary: "Arranca con una presencia profesional que proyecta confianza y genera primeras oportunidades.",
      setupPrice: "Desde $12,900 MXN",
      monthlyPrice: "Desde $1,490 MXN/mes",
      breakdown: [
        {
          title: "Branding y presencia",
          items: ["Logo base, paleta y lineamientos iniciales", "Linea grafica esencial para redes"],
        },
        {
          title: "Web y tecnologia",
          items: ["Sitio web corporativo hasta 5 secciones", "Formulario de contacto y boton de WhatsApp"],
        },
        {
          title: "Infraestructura y soporte",
          items: ["Hosting administrado + SSL + dominio (1 ano)", "Soporte tecnico mensual basico"],
        },
        {
          title: "Visibilidad",
          items: ["SEO tecnico inicial", "Configuracion de Google Search Console"],
        },
      ],
    },
    {
      name: "Plan Pro",
      idealFor: "Empresas en crecimiento comercial",
      summary: "Escala tu captacion con procesos comerciales claros y control sobre cada lead.",
      setupPrice: "Desde $24,900 MXN",
      monthlyPrice: "Desde $3,490 MXN/mes",
      breakdown: [
        {
          title: "Todo Basico + crecimiento comercial",
          items: ["Mejora de web para conversion", "Landing adicional para campanas"],
        },
        {
          title: "Marketing y captacion",
          items: ["Estrategia de captacion y embudo", "Gestion y optimizacion mensual de campanas"],
        },
        {
          title: "Operacion comercial",
          items: ["Integracion de CRM para seguimiento de leads", "Automatizaciones iniciales de contacto"],
        },
        {
          title: "Soporte y analitica",
          items: ["Soporte IT prioritario", "Reporte mensual de rendimiento y oportunidades"],
        },
      ],
      highlighted: true,
    },
    {
      name: "Plan Premium",
      idealFor: "Empresas que buscan un ecosistema 360",
      summary: "Activa una operacion digital integral con tecnologia, automatizacion y acompanamiento estrategico.",
      setupPrice: "Desde $49,900 MXN",
      monthlyPrice: "Desde $7,900 MXN/mes",
      breakdown: [
        {
          title: "Todo Pro + ecosistema integral",
          items: ["Arquitectura digital 360 por unidad de negocio", "Diseno de flujo completo de captacion a cierre"],
        },
        {
          title: "Sistemas y automatizacion",
          items: ["Desarrollo de modulo CRM/operaciones a medida", "Automatizaciones comerciales y de soporte"],
        },
        {
          title: "Direccion estrategica",
          items: ["Consultoria continua y roadmap trimestral", "Priorizacion de sprints por impacto en ingresos"],
        },
        {
          title: "Soporte avanzado",
          items: ["Soporte tecnico 24/7", "Monitoreo e indicadores clave de negocio"],
        },
      ],
    },
  ];

  const ecosystemLayers = [
    {
      title: "Base: Hosting + Dominio",
      text: "Infraestructura, correos y seguridad para operar con confiabilidad y imagen profesional desde el primer dia.",
    },
    {
      title: "Centro: Sitio Web",
      text: "Tu sitio como centro de conversion, integracion y control de todo tu ecosistema digital.",
    },
    {
      title: "Atraccion: Marketing Digital",
      text: "SEO, pauta y embudos para transformar trafico en oportunidades de negocio.",
    },
    {
      title: "Relacion: Community Management",
      text: "Contenido y gestion de comunidad para sostener atencion, confianza y recordacion de marca.",
    },
    {
      title: "Identidad: Branding",
      text: "Identidad consistente en cada punto de contacto para elevar valor percibido y diferenciacion.",
    },
    {
      title: "Soporte y Expansion: IT + CRM + Automatizacion",
      text: "Soporte continuo, sistemas y automatizacion para escalar sin perder control operativo.",
    },
  ];

  const niches = [
    {
      title: "Negocios locales y pymes",
      zone: "Saltillo, Ramos Arizpe y Monterrey",
      points: [
        "Sitios corporativos y landing pages enfocadas en captacion",
        "Marketing y redes para construir demanda constante",
        "Soporte tecnico para sostener continuidad operativa",
      ],
    },
    {
      title: "Iglesias cristianas",
      zone: "Digitalizacion institucional",
      points: [
        "Web institucional y canales digitales para conectar con la congregacion",
        "Estrategia de contenido y presencia online con enfoque pastoral",
        "Acompanamiento tecnico para administracion y estabilidad digital",
      ],
    },
  ];

  return (
    <main id="home" className="min-h-screen bg-[#f4f7fb] text-[#0a1224]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <p className="text-xl font-bold tracking-tight text-slate-900">Nexoweb</p>
          <nav className="hidden items-center gap-6 md:flex">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contacto"
            className="rounded-lg bg-[#0f274f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#123469]"
          >
            Agendar diagnostico
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pt-20 pb-14">
        <p className="mb-5 inline-flex rounded-full border border-slate-300 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
          Ecosistema digital para crecimiento real
        </p>
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="max-w-5xl text-5xl font-bold leading-tight text-slate-900 md:text-7xl">
              Convierte tu presencia digital en una maquina de crecimiento con Nexoweb.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-600">
              Unificamos marca, tecnologia, marketing y soporte IT para que escales con estrategia, ejecucion y control total.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contacto"
                className="rounded-lg bg-[#0f274f] px-7 py-3 font-semibold text-white transition hover:bg-[#123469]"
              >
                Agendar diagnostico
              </a>
              <a
                href="#servicios"
                className="rounded-lg border border-slate-300 bg-white px-7 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Ver ecosistema
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Nexoweb en accion</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-3xl font-bold text-[#0f274f]">{metric.value}</p>
                  <p className="mt-2 text-sm text-slate-600">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Servicios todo-en-uno</h2>
          <p className="max-w-md text-sm text-slate-600">
            Cada servicio esta disenado para integrarse y aumentar el rendimiento comercial de tu negocio.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <div className="mb-5 h-10 w-10 rounded-lg bg-gradient-to-br from-[#15366b] to-[#2c63b8] opacity-90 transition group-hover:opacity-100" />
              <h3 className="text-2xl font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-3 text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Como funciona el ecosistema Nexoweb</h2>
          <p className="max-w-md text-sm text-slate-600">
            Construimos una arquitectura digital por capas para que cada inversion genere impacto medible.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ecosystemLayers.map((layer) => (
            <article key={layer.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">{layer.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{layer.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="paquetes" className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Paquetes de servicios</h2>
          <p className="max-w-md text-sm text-slate-600">
            Elige el nivel de implementacion ideal para tu etapa y evoluciona hacia un ecosistema completo.
          </p>
        </div>
        <p className="mb-6 max-w-3xl text-sm text-slate-500">
          Inversiones referenciales sujetas a alcance, volumen operativo y nivel de automatizacion requerido.
        </p>
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-2xl border bg-white p-7 shadow-sm ${
                plan.highlighted ? "border-[#1c4a8f] ring-2 ring-[#1c4a8f]/15" : "border-slate-200"
              }`}
            >
              {plan.highlighted ? (
                <p className="mb-4 inline-flex rounded-full bg-[#1c4a8f] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                  Recomendado
                </p>
              ) : null}
              <h3 className="text-2xl font-semibold text-slate-900">{plan.name}</h3>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Inversion inicial</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">{plan.setupPrice}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Gestion mensual</p>
                <p className="mt-1 text-lg font-semibold text-[#0f274f]">{plan.monthlyPrice}</p>
              </div>
              <p className="mt-2 text-sm font-medium text-[#1c4a8f]">{plan.idealFor}</p>
              <p className="mt-3 text-slate-600">{plan.summary}</p>
              <div className="mt-5 space-y-4">
                {plan.breakdown.map((group) => (
                  <div key={group.title}>
                    <p className="text-sm font-semibold text-slate-900">{group.title}</p>
                    <ul className="mt-2 space-y-2 text-sm text-slate-700">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-[#1c4a8f]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <a
                href="#contacto"
                className={`mt-6 inline-block rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                  plan.highlighted
                    ? "bg-[#0f274f] text-white hover:bg-[#123469]"
                    : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Agendar diagnostico de 20 min
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="nichos" className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Nichos estrategicos</h2>
          <p className="max-w-md text-sm text-slate-600">
            Verticales donde combinamos contexto, ejecucion tecnica y enfoque en resultados sostenibles.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {niches.map((niche) => (
            <article key={niche.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-2xl font-semibold text-slate-900">{niche.title}</h3>
              <p className="mt-2 text-sm font-medium text-[#1c4a8f]">{niche.zone}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                {niche.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#1c4a8f]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="nosotros" className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Nosotros</h2>
          <p className="mt-4 max-w-4xl text-slate-600">
            Nexoweb es un aliado estrategico para empresas e instituciones que buscan crecer con orden, enfoque comercial y capacidad operativa.
            Integramos estrategia, ejecucion y soporte continuo para convertir el entorno digital en una ventaja competitiva.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">Mision</h3>
              <p className="mt-3 text-sm text-slate-600">
                Ayudar a empresas a crecer con soluciones digitales integrales que conecten marca, tecnologia y captacion de clientes.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">Vision</h3>
              <p className="mt-3 text-sm text-slate-600">
                Ser la agencia de referencia en transformacion digital para negocios que buscan escalar con orden, calidad y resultados medibles.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">Valores</h3>
              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                <li>Excelencia en cada entrega</li>
                <li>Transparencia con el cliente</li>
                <li>Innovacion practica y constante</li>
                <li>Compromiso con resultados</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">Metodo Nexoweb</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {process.map((item) => (
            <article key={item.step} className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold tracking-[0.15em] text-[#1c4a8f]">{item.step}</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="portafolio" className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">Resultados y casos</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {cases.map((item) => (
            <article key={item.name} className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm text-[#1c4a8f]">{item.name}</p>
              <p className="mt-3 text-lg font-medium text-slate-900">{item.result}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="blog" className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">Blog</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Como construir una marca digital consistente",
            "CRM para equipos comerciales: guia practica",
            "Captacion de clientes: estrategia y medicion",
          ].map((post) => (
            <article key={post} className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm text-[#1c4a8f]">Articulo destacado</p>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{post}</h3>
              <a href="#contacto" className="mt-4 inline-block text-sm font-semibold text-[#1c4a8f]">
                Leer mas
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="contacto" className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm md:p-14">
          <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">Construimos tu ecosistema digital completo</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Todo lo que tu negocio necesita en digital, en un solo equipo: marca, web, marketing, soporte y sistemas para escalar con control.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:info@nexoweb.com"
              className="inline-block rounded-lg bg-[#0f274f] px-8 py-3 font-semibold text-white transition hover:bg-[#123469]"
            >
              Solicitar propuesta
            </a>
            <a
              href="#servicios"
              className="inline-block rounded-lg border border-slate-300 bg-slate-50 px-8 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Ver el ecosistema
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
