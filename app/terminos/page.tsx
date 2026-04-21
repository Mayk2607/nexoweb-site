import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Términos y Condiciones | Nexoweb",
  description: "Términos y Condiciones de uso de los servicios de Nexoweb.",
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#0a1224]">
      <Header />
      
      <div className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-4xl bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
          <h1 className="text-3xl md:text-5xl font-bold text-[#0f274f] mb-8">Términos y Condiciones</h1>
          <p className="text-sm text-slate-500 mb-8">Última actualización: {new Date().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}</p>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Aceptación de los Términos</h2>
              <p>
                Al contratar los servicios de Nexoweb, usted (el Cliente) acepta quedar vinculado por estos Términos y Condiciones. 
                Si no está de acuerdo con alguna parte de los términos, entonces no podrá acceder o utilizar nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. Servicios Ofrecidos</h2>
              <p>
                Nexoweb ofrece servicios de diseño web, desarrollo de software corporativo, automatización CRM, alojamiento (hosting) y consultoría digital. 
                El alcance específico de cada proyecto, entregables y plazos se definirán en una cotización o propuesta técnica formal que será aprobada por ambas partes antes del inicio del desarrollo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Pagos y Facturación</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Todo proyecto nuevo requiere un pago inicial (anticipo) del porcentaje acordado en la propuesta técnica para comenzar el desarrollo.</li>
                <li>Los servicios de suscripción mensual (como hosting, soporte IT y mantenimiento) se facturan de manera recurrente por mes adelantado.</li>
                <li>Nexoweb se reserva el derecho de suspender temporalmente servicios digitales (incluyendo hosting) si existiera un retraso de pago superior a 15 días naturales.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">4. Propiedad Intelectual</h2>
              <p>
                Tras la liquidación total del costo del proyecto, los derechos de uso del código frontend, diseño visual y activos creados exclusivamente para el Cliente serán transferidos al mismo.
                Las licencias de software propietario, arquitecturas de backend propietario de Nexoweb, y bibliotecas de terceros mantienen sus respectivas licencias originales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">5. Confidencialidad</h2>
              <p>
                Nexoweb se compromete a mantener estricta confidencialidad sobre las bases de datos, planes de negocio y operativas internas del Cliente a los que tenga acceso durante el desarrollo del proyecto y la provisión del servicio.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">6. Modificaciones a los Servicios</h2>
              <p>
                Nos reservamos el derecho de retirar o modificar nuestro servicio, y cualquier material que proveamos a través de la plataforma, a nuestra entera discreción y sin previo aviso. No seremos responsables si, por cualquier razón, todo o parte del servicio está indisponible en cualquier momento.
              </p>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
