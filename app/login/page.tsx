import { login } from './actions'

// NOTE: Since searchParams in Next.js 15+ is a Promise, we must await it if we use it, 
// or define the prop as a Promise.
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const error = resolvedParams?.error as string | undefined

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7fb] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0a1224]">Nexoweb CRM</h1>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Panel de gestión de prospectos y clientes.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-[#0a1224]"
              placeholder="admin@nexoweb.mx"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-[#0a1224]"
              placeholder="••••••••"
            />
          </div>
          <button
            formAction={login}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-6"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}
