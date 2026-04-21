import { blogPosts } from "@/config/data";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Home } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Blog - Nexoweb Digital Agency",
  description: "Recursos, estrategias y guías sobre marketing digital, branding corporativo y crecimiento empresarial.",
};

export default function BlogIndex() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f4f7fb] pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumbs */}
          <nav className="flex mb-8 text-sm text-slate-500">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-[#1c4a8f] transition flex items-center">
                  <Home className="w-4 h-4" />
                </Link>
              </li>
              <li>
                <ChevronRight className="w-4 h-4" />
              </li>
              <li className="font-medium text-slate-900">Blog</li>
            </ol>
          </nav>

          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Insights & Recursos
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              Estrategias accionables sobre marketing, branding y tecnología para escalar tu empresa en el entorno digital.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg hover:border-[#1c4a8f]/30"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="flex flex-col flex-1 p-8">
                  <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {post.date}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 leading-snug mb-4">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 mb-8 flex-1">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#1c4a8f] transition group-hover:text-[#0f274f]"
                  >
                    Leer artículo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
