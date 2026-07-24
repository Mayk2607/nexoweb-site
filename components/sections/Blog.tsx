import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/config/data";

export function Blog() {
  return (
    <section id="blog" className="bg-gray-50 py-24 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#1251a3] mb-4">Blog</p>
            <h2 className="text-4xl font-black tracking-tight text-gray-900">
              Recursos para escalar tu negocio.
            </h2>
          </div>
          <Link href="/blog" className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-[#1251a3] hover:text-[#0a1525] transition-colors">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <article key={post.slug} className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-[#b8d0ef] hover:shadow-lg transition-all">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col flex-1 p-7">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                  {post.date}
                </span>
                <h3 className="font-black text-gray-900 leading-snug mb-3 text-base">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed flex-1 mb-5">
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#1251a3] group-hover:text-[#0a1525] transition-colors">
                  Leer artículo <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
