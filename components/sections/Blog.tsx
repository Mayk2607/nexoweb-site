"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/config/data";

export function Blog() {
  return (
    <section id="blog" className="bg-[#f4f7fb] py-24 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
        >
          Blog y Recursos
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg hover:border-[#1c4a8f]/30"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="flex flex-col flex-1 p-8">
                <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {post.date}
                </span>
                <h3 className="text-xl font-bold text-slate-900 leading-snug mb-3">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 mb-6 flex-1">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto flex items-center gap-2 text-sm font-bold text-[#1c4a8f] transition hover:text-[#0f274f]"
                >
                  Leer artículo <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Ver todos los artículos
          </Link>
        </div>
      </div>
    </section>
  );
}
