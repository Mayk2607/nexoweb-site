import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Aviso de Privacidad | Nexoweb",
  description: "Aviso de Privacidad y protección de datos personales de Nexoweb.",
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#0a1224]">
      <Header />
      
      <div className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-4xl bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
          <h1 className="text-3xl md:text-5xl font-bold text-[#0f274f] mb-8">Aviso de Privacidad</h1>
          <p className="text-sm text-slate-500 mb-8">Última actualización: {new Date().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}</p>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Identidad y Domicilio del Responsable</h2>
              <p>
                Nexoweb, con sede en Coahuila, México, es responsable del tratamiento y protección de los datos personales 
                que usted comparta con nosotros, operando bajo estricto apego a las regulaciones mexicanas en materia de protección de datos personales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. Datos Personales Recabados</h2>
              <p>
                Para llevar a cabo las finalidades descritas en el presente aviso, utilizaremos los siguientes datos personales:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Nombre completo y puesto dentro de su empresa.</li>
                <li>Datos de contacto: correo electrónico institucional o personal, y número de teléfono (móvil y/o WhatsApp).</li>
                <li>Datos de facturación e información fiscal para la emisión de CFDI.</li>
                <li>Datos corporativos e información técnica para la ejecución de proyectos digitales.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Finalidad del Tratamiento de Datos</h2>
              <p>Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades primarias:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Proveer los servicios profesionales y productos que ha solicitado.</li>
                <li>Comunicación y seguimiento de proyectos, soporte técnico y actualizaciones de sus servicios (hosting, dominios, CRM).</li>
                <li>Elaboración de presupuestos, contratos comerciales y facturación.</li>
              </ul>
              <p className="mt-4">De manera adicional, utilizaremos su información para finalidades secundarias (envío de boletines, ofertas comerciales, etc.), a las cuales podrá oponerse en cualquier momento.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">4. Transferencia de Datos</h2>
              <p>
                Nexoweb <strong>NO</strong> vende, renta, ni transfiere su información personal a terceros ajenos a la operativa técnica (ej. plataformas de facturación, proveedores de alojamiento e infraestructura cloud contratados en su beneficio), salvo requerimiento por autoridad competente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">5. Derechos ARCO</h2>
              <p>
                Usted tiene derecho a conocer qué datos personales tenemos de usted (Acceso), solicitar la corrección de su información personal si está desactualizada, inexacta o incompleta (Rectificación), pedir su eliminación de nuestros registros (Cancelación), así como oponerse al uso de sus datos personales para fines específicos (Oposición).
              </p>
              <p className="mt-2">
                Para ejercer sus derechos ARCO, puede ponerse en contacto directo enviando un correo electrónico a <strong>consultoria@nexoweb.mx</strong> o al teléfono <strong>(844) 750-2607</strong>.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">6. Uso de Tecnologías de Rastreo (Cookies)</h2>
              <p>
                Le informamos que en nuestra página de Internet utilizamos cookies, web beacons y otras tecnologías a través de las cuales es posible monitorear su comportamiento como usuario de Internet, así como brindarle un mejor servicio y experiencia de usuario al navegar en nuestra página, ofreciéndole servicios basados en sus preferencias.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
