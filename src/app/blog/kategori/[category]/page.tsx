import Link from "next/link";
import { BLOG_POSTS, BRAND } from "@/lib/constants";
import BlogCoverImage from "@/components/brand/BlogCoverImage";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { notFound } from "next/navigation";

const CATEGORIES: Record<string, { label: string; description: string }> = {
  strategy: {
    label: "Strateji",
    description:
      "Kurumsal AI stratejisi, uygulama yol haritaları ve yönetim vizyonu hakkında içerikler.",
  },
  automation: {
    label: "Otomasyon",
    description:
      "İş süreci otomasyonu, n8n, Make ve otomasyon araçları hakkında rehberler ve karşılaştırmalar.",
  },
  "ai-tools": {
    label: "AI Araçları",
    description:
      "Şirketler için en iyi AI araçları, platform karşılaştırmaları ve uygulama rehberleri.",
  },
  tutorial: {
    label: "Rehber",
    description:
      "Adım adım uygulamalı rehberler — teknik bilgi gerektirmeden AI ve otomasyonu hayata geçirin.",
  },
  customer: {
    label: "Müşteri Deneyimi",
    description:
      "AI chatbot, sesli asistan ve müşteri hizmetleri otomasyonu ile müşteri deneyimini iyileştirme.",
  },
  data: {
    label: "Veri & Raporlama",
    description:
      "Veri kalitesi, raporlama otomasyonu ve veriye dayalı karar alma süreçleri hakkında içerikler.",
  },
  roi: {
    label: "ROI & Verimlilik",
    description:
      "AI yatırım getirisi hesaplama, maliyet analizi ve verimlilik ölçüm yöntemleri.",
  },
  security: {
    label: "Veri Güvenliği",
    description:
      "Kurumsal AI kullanımında veri güvenliği, gizlilik ve uyumluluk konuları.",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  const categoriesWithPosts = Object.keys(CATEGORIES).filter((cat) =>
    BLOG_POSTS.some((p) => p.category === cat)
  );
  return categoriesWithPosts.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES[category];
  if (!cat) return { title: "Kategori Bulunamadı" };

  const title = `${cat.label} — AI & Otomasyon Blog Yazıları`;
  return {
    title,
    description: cat.description,
    alternates: {
      canonical: `https://www.verimio.com.tr/blog/kategori/${category}`,
    },
    openGraph: {
      title: `${title} | Verimio`,
      description: cat.description,
      type: "website",
      url: `https://www.verimio.com.tr/blog/kategori/${category}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Verimio`,
      description: cat.description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORIES[category];
  if (!cat) notFound();

  const posts = BLOG_POSTS.filter((p) => p.category === category);

  return (
    <main className="pt-24">
      <BreadcrumbSchema
        items={[
          { name: "Ana Sayfa", url: "https://www.verimio.com.tr" },
          { name: "Blog", url: "https://www.verimio.com.tr/blog" },
          {
            name: cat.label,
            url: `https://www.verimio.com.tr/blog/kategori/${category}`,
          },
        ]}
      />

      {/* Hero */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-foreground-muted mb-4">
            <Link
              href="/blog"
              className="hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="tracking-[0.15em] uppercase font-medium">
              {cat.label}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            {cat.label}
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
            {cat.description}
          </p>
          <p className="text-sm text-foreground-muted mt-4">
            {posts.length} yazı
          </p>
        </div>
      </section>

      {/* Category nav */}
      <section className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className="px-3 py-1.5 text-xs text-foreground-muted hover:text-foreground border border-border hover:border-foreground/20 transition-colors"
            >
              Tümü
            </Link>
            {Object.entries(CATEGORIES)
              .filter(([key]) =>
                BLOG_POSTS.some((p) => p.category === key)
              )
              .map(([key, val]) => (
                <Link
                  key={key}
                  href={`/blog/kategori/${key}`}
                  className={`px-3 py-1.5 text-xs transition-colors ${
                    key === category
                      ? "bg-foreground text-background"
                      : "text-foreground-muted hover:text-foreground border border-border hover:border-foreground/20"
                  }`}
                >
                  {val.label}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Post list */}
      <section className="py-16 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="space-y-0">
            {posts.map((post, index) => (
              <Link
                key={index}
                href={`/blog/${post.slug}`}
                className="group border-b border-border py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
              >
                <div className="md:col-span-3 overflow-hidden border border-border bg-foreground/[0.04] p-2">
                  <BlogCoverImage
                    slug={post.slug}
                    title={post.title}
                    category={post.category}
                    index={index}
                  />
                </div>
                <div className="md:col-span-7">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-foreground-muted">
                      {post.date}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold mb-2 group-hover:text-foreground-secondary transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-foreground-secondary leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
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
            Otomasyon potansiyelinizi ve 90 günlük yol haritanızı ücretsiz
            check-up ile keşfedin.
          </p>
          <Link
            href={BRAND.checkupUrl}
            className="inline-flex items-center px-7 py-3.5 bg-background text-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Ücretsiz Check-Up Başlatın
          </Link>
        </div>
      </section>
    </main>
  );
}
