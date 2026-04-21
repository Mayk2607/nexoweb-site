import { blogPosts } from "@/config/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);
  
  if (!post) {
    return { title: "Post no encontrado" };
  }

  return {
    title: `${post.title} - Nexoweb Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-32 pb-24">
        <article className="mx-auto max-w-4xl px-6">
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
              <li>
                <Link href="/blog" className="hover:text-[#1c4a8f] transition">
                  Blog
                </Link>
              </li>
              <li>
                <ChevronRight className="w-4 h-4" />
              </li>
              <li className="font-medium text-slate-900 truncate max-w-[200px] sm:max-w-xs">
                {post.title}
              </li>
            </ol>
          </nav>

          <header className="mb-12">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-slate-400">
              {post.date}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-8">
              {post.title}
            </h1>
            
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </header>

          <div className="mx-auto max-w-3xl">
            <div 
              className="prose prose-slate prose-lg md:prose-xl max-w-none 
                         prose-headings:font-bold prose-headings:text-slate-900
                         prose-a:text-[#1c4a8f] hover:prose-a:text-[#0f274f]
                         prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-16 pt-8 border-t border-slate-200">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-sm font-bold text-[#1c4a8f] hover:text-[#0f274f] transition group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Volver a todos los artículos
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
