import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { BLOG_POSTS, BRAND } from "@/lib/constants";
import BlogCardImage from "@/components/brand/BlogCardImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Verimio - AI & Otomasyon İçerikleri",
  description:
    "Şirketler için AI araçları, otomasyon stratejileri ve operasyonel verimlilik içerikleri. Verimio blog.",
};

export default function BlogPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60" />
              <span className="text-sm font-medium text-foreground-secondary tracking-wide uppercase ml-1">Blog</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              AI & Otomasyon{" "}
              <span className="gradient-text">İpuçları</span>
            </h1>

            <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
              Yapay zeka, otomasyon ve operasyonel verimlilik hakkında güncel
              içerikler. Uygulamalı rehberler ve sektörel analizler.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, index) => (
              <article
                key={index}
                className="group bg-surface rounded-2xl border border-border overflow-hidden hover:border-border-accent transition-all duration-300"
              >
                {/* Branded Image Pattern */}
                <div className="p-4 pb-0">
                  <BlogCardImage index={index} title={post.title} category={post.category} />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-foreground-secondary mb-3">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>

                  <h2 className="text-lg font-bold mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary-light hover:text-primary dark:hover:text-secondary transition-colors"
                  >
                    Devamını Oku
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Firmanız için <span className="gradient-text">doğru adımı atın</span>
          </h2>
          <p className="text-foreground-secondary leading-relaxed mb-8">
            Otomasyon potansiyelinizi, tasarruf fırsatlarınızı ve 90 günlük yol haritanızı
            ücretsiz check-up ile keşfedin.
          </p>
          <Link
            href={BRAND.tallyFormUrl}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary-hover transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25 text-sm"
          >
            Ücretsiz Check-Up Başlatın
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
