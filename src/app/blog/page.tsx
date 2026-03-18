import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { BLOG_POSTS, BRAND } from "@/lib/constants";

const categoryLabels: Record<string, string> = {
  strategy: "Strateji",
  automation: "Otomasyon",
  customer: "Müşteri",
  data: "Veri",
  roi: "ROI",
  "ai-tools": "AI Araçları",
  tutorial: "Rehber",
  security: "Güvenlik",
};
import BlogCoverImage from "@/components/brand/BlogCoverImage";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Blog - AI & Otomasyon İçerikleri",
  description:
    "Şirketler için AI araçları, otomasyon stratejileri ve operasyonel verimlilik içerikleri. Verimio blog.",
  alternates: { canonical: "https://www.verimio.com.tr/blog" },
  openGraph: {
    title: "Blog - AI & Otomasyon İçerikleri | Verimio",
    description: "Şirketler için AI araçları, otomasyon stratejileri ve operasyonel verimlilik içerikleri.",
    type: "website",
    url: "https://www.verimio.com.tr/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - AI & Otomasyon İçerikleri | Verimio",
    description: "Şirketler için AI araçları, otomasyon stratejileri ve operasyonel verimlilik içerikleri.",
  },
};

export default function BlogPage() {
  return (
    <main className="pt-20">
      <BreadcrumbSchema
        items={[
          { name: "Ana Sayfa", url: "https://www.verimio.com.tr" },
          { name: "Blog", url: "https://www.verimio.com.tr/blog" },
        ]}
      />
      {/* Hero */}
      <section className="section-padding pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-6 h-0.5 rounded-full bg-primary-light" />
              <span className="text-xs font-medium text-foreground-muted tracking-widest uppercase">Blog</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              AI & Otomasyon{" "}
              <span className="text-primary-light">İpuçları</span>
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
                className="group bg-surface rounded-2xl border border-border overflow-hidden hover:border-border-accent transition-all duration-300 glow-card"
              >
                {/* Cover image */}
                <div className="p-4 pb-0 overflow-hidden rounded-t-xl">
                  <div className="transition-transform duration-500 group-hover:scale-105">
                    <BlogCoverImage slug={post.slug} title={post.title} category={post.category} index={index} />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/8 dark:bg-primary-light/10 text-xs font-medium text-primary-light">
                      {categoryLabels[post.category] ?? post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-foreground-secondary">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
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
                    aria-label={`Devamını Oku: ${post.title}`}
                  >
                    Devamını Oku
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
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
            Firmanız için <span className="text-primary-light">doğru adımı atın</span>
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
    </main>
  );
}
