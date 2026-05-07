export function About() {
  return (
    <section id="nosotros" className="relative mx-auto max-w-7xl px-6 py-12 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#00b4d8]/10 to-[#1c4a8f]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-gradient-to-tr from-[#1c4a8f]/10 to-transparent rounded-full blur-3xl -z-10" />

      <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/50 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-[#1c4a8f] via-[#00b4d8] to-[#1c4a8f]" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl mb-6">
              Nuestra Historia
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-slate-600">
              <p>
                Nexoweb nació a finales del <strong className="text-[#1c4a8f]">2023</strong> con una misión muy clara: democratizar la tecnología de alto nivel. Aunque somos una agencia joven como marca, nuestro equipo fundador cuenta con <strong className="text-[#00b4d8]">más de 10 años de experiencia</strong> combinada en el desarrollo de software corporativo y estrategias digitales.
              </p>
              <p>
                Surgimos para ofrecer herramientas reales y escalables a los negocios locales y empresas de la región. Nuestro objetivo es que la tecnología deje de ser un gasto y se convierta en el motor principal de su crecimiento operativo y comercial.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0f274f] to-[#1c4a8f] rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-2xl font-bold mb-4 relative z-10">Un propósito superior</h3>
            <p className="text-blue-50 leading-relaxed relative z-10">
              Más allá de nuestro trabajo con el sector corporativo, en Nexoweb tenemos un enfoque y preferencia especial: equipar a las <strong className="text-white">iglesias cristianas</strong> con herramientas de primer nivel.
              <br /><br />
              Creemos firmemente en poner nuestra experiencia a su servicio para que puedan organizar a sus comunidades, expandir su mensaje y perseguir sus objetivos espirituales y organizacionales con excelencia.
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-10 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl md:text-5xl font-extrabold text-[#1c4a8f] mb-2">+20</p>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Clientes Activos</p>
          </div>

          <div>
            <p className="text-4xl md:text-5xl font-extrabold text-[#00b4d8] mb-2">+3k</p>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Horas de Trabajo</p>
          </div>

          <div>
            <p className="text-4xl md:text-5xl font-extrabold text-[#1c4a8f] mb-2">+10</p>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Años Experiencia</p>
          </div>

          <div>
            <p className="text-4xl md:text-5xl font-extrabold text-[#00b4d8] mb-2">100%</p>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Compromiso</p>
          </div>
        </div>
      </div>
    </section>
  );
}
