import { process } from "../../config/data";

export function Process() {
  return (
    <section className="bg-white py-24 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-16 text-center text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Método Nexoweb
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => (
            <article
              key={item.step}
              className="relative rounded-2xl border border-slate-100 bg-[#f4f7fb]/50 p-8 hover:bg-[#f4f7fb] transition-colors"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f274f] to-[#1c4a8f] text-white shadow-md font-bold">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
