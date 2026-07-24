"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Depende del alcance. Una landing page puede estar lista en 1-2 semanas. Un sitio web completo toma entre 3-6 semanas. Sistemas y plataformas a medida entre 6-16 semanas. En la propuesta siempre especificamos el tiempo estimado con claridad.",
  },
  {
    q: "¿Cómo es el proceso de contratación?",
    a: "Primero tenemos una reunión de descubrimiento (sin costo). Analizamos tus necesidades y en menos de 24 horas hábiles te enviamos una propuesta personalizada con alcance, entregables, tiempo y precio. Si la apruebas, firmamos el acuerdo y comenzamos.",
  },
  {
    q: "¿Necesito dar un anticipo?",
    a: "Sí. Los proyectos se manejan con un anticipo del 50% al inicio y el saldo al finalizar. Para servicios mensuales, la facturación es al inicio de cada período. Todo se detalla en el acuerdo de servicio.",
  },
  {
    q: "¿El dominio y el hosting están incluidos?",
    a: "Los proyectos de diseño web y e-commerce pueden incluir el dominio el primer año como parte del paquete. El hosting y la renovación anual del dominio son servicios independientes. Te explicamos todo con transparencia en la propuesta para que no haya sorpresas.",
  },
  {
    q: "¿Ofrecen soporte después de entregar el proyecto?",
    a: "Sí. Todo proyecto incluye un período de garantía de 30 días para ajustes. Para soporte y evolución continua ofrecemos planes de mantenimiento mensual. No desaparecemos cuando entregamos.",
  },
  {
    q: "¿Puedo ampliar o modificar el proyecto después?",
    a: "Por supuesto. Construimos con tecnología escalable para que puedas crecer sin rehacer todo desde cero. Nuevas funciones, módulos o integraciones se cotízan y planean en el momento que lo necesites.",
  },
  {
    q: "¿Trabajan con empresas pequeñas o solo con grandes empresas?",
    a: "Trabajamos con negocios de todos los tamaños: desde emprendedores y PyMEs hasta empresas con operaciones regionales. Lo importante es que tengas claridad en tus objetivos — el tamaño de la empresa no define la calidad del trabajo.",
  },
  {
    q: "¿Qué formas de pago aceptan?",
    a: "Aceptamos transferencia bancaria, depósito, tarjeta de crédito/débito y facturamos con RFC para empresas que requieran comprobante fiscal. Consultamos la disponibilidad de otras opciones según el proyecto.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#f0f4fa] py-24 border-t border-[#dce8f7]">
      <div className="mx-auto max-w-4xl px-6">

        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-3">Preguntas frecuentes</p>
          <h2 className="text-4xl font-black tracking-tight text-gray-900 mb-4">
            Resolvemos tus dudas.
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Si no encuentras lo que buscas,{" "}
            <Link href="/contacto" className="font-semibold text-[#1251a3] hover:underline">
              escríbenos directamente
            </Link>
            .
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#dce8f7] bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-bold text-gray-900 text-sm leading-snug">{item.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-[#1251a3] transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-7 pb-6">
                  <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-lg bg-[#1251a3] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#0d1f35] transition-colors shadow-lg shadow-[#1251a3]/20"
          >
            Tengo otra pregunta <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-xs text-gray-400">✓ Respuesta en menos de 24 horas hábiles</p>
        </div>

      </div>
    </section>
  );
}
