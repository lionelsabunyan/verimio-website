import Link from "next/link";
import { BLOG_POSTS, BRAND } from "@/lib/constants";
import BlogCoverImage from "@/components/brand/BlogCoverImage";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

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
    <main className="pt-24">
      <BreadcrumbSchema
        items={[
          { name: "Ana Sayfa", url: "https://www.verimio.com.tr" },
          { name: "Blog", url: "https://www.verimio.com.tr/blog" },
        ]}
      />

      {/* Hero */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Blog
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            AI & Otomasyon İçerikleri
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
            Yapay zeka, otomasyon ve operasyonel verimlilik hakkında güncel
            içerikler. Uygulamalı rehberler ve sektörel analizler.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="space-y-0">
            {BLOG_POSTS.map((post, index) => (
              <Link
                key={index}
                href={`/blog/${post.slug}`}
                className="group border-b border-border py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
              >
                {/* Cover — small */}
                <div className="md:col-span-3 overflow-hidden">
                  <BlogCoverImage slug={post.slug} title={post.title} category={post.category} index={index} />
                </div>

                {/* Content */}
                <div className="md:col-span-7">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-foreground-muted">
                      {categoryLabels[post.category] ?? post.category}
                    </span>
                    <span className="text-xs text-foreground-muted">{post.date}</span>
                  </div>
                  <h2 className="text-lg font-bold mb-2 group-hover:text-foreground-secondary transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-foreground-secondary leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                {/* Arrow */}
                <div className="md:col-span-2 hidden md:flex items-center justify-end">
                  <span className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">
                    Oku →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-foreground">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-background mb-4 max-w-2xl">
            Firmanız için doğru adımı atın
          </h2>
          <p className="text-background/70 leading-relaxed mb-8 max-w-xl">
            Otomasyon potansiyelinizi, tasarruf fırsatlarınızı ve 90 günlük yol haritanızı
            ücretsiz check-up ile keşfedin.
          </p>
          <Link
            href={BRAND.tallyFormUrl}
            className="inline-flex items-center px-7 py-3.5 bg-background text-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Ücretsiz Check-Up Başlatın
          </Link>
        </div>
      </section>
    </main>
  );
}
