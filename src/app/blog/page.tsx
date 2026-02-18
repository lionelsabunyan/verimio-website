import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { BLOG_POSTS, BRAND } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Verimio - AI & Otomasyon İpuçları",
  description:
    "KOBİ'ler için AI araçları, otomasyon stratejileri ve dijital dönüşüm ipuçları. Verimio blog.",
};

const allPosts = [
  ...BLOG_POSTS,
  {
    title: "AI Otomasyon ROI Hesaplama Rehberi",
    excerpt:
      "Yapay zeka yatırımınızın geri dönüşünü nasıl hesaplarsınız? Adım adım ROI analizi rehberi.",
    date: "1 Şubat 2026",
    slug: "ai-otomasyon-roi-hesaplama",
  },
  {
    title: "Küçük İşletmeler İçin CRM Otomasyonu",
    excerpt:
      "Müşteri ilişkilerinizi AI ile güçlendirin. CRM otomasyon araçları ve en iyi uygulamalar.",
    date: "25 Ocak 2026",
    slug: "kucuk-isletmeler-crm-otomasyon",
  },
  {
    title: "Veri Güvenliği ve AI: Bilmeniz Gerekenler",
    excerpt:
      "AI araçlarını kullanırken verilerinizi nasıl korursunuz? KVKK uyumlu AI kullanım rehberi.",
    date: "20 Ocak 2026",
    slug: "veri-guvenligi-ai-rehber",
  },
];

export default function BlogPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary-light/30" />
              <span className="text-sm font-medium text-muted ml-1">Blog</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              AI & Otomasyon{" "}
              <span className="gradient-text">İpuçları</span>
            </h1>

            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              Türk KOBİ&apos;leri için yapay zeka, otomasyon ve dijital dönüşüm
              hakkında güncel içerikler. Pratik ipuçları ve adım adım rehberler.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post, index) => (
              <article
                key={index}
                className="group bg-white rounded-2xl border border-foreground/5 overflow-hidden hover:border-primary-light/20 transition-all duration-300"
              >
                {/* Placeholder Image */}
                <div className="aspect-[16/10] bg-gradient-to-br from-primary-light/10 to-secondary/10 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-2xl">📝</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted mb-3">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>

                  <h2 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary-light hover:text-primary transition-colors"
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

      {/* Newsletter CTA */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            AI İpuçlarını <span className="gradient-text">Kaçırmayın</span>
          </h2>
          <p className="text-muted leading-relaxed mb-8">
            Her hafta işinize yarayacak AI ve otomasyon ipuçlarını e-postanıza gönderelim.
            Abone olun, güncel kalın.
          </p>
          <Link
            href={BRAND.tallyFormUrl}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary/90 transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25 text-sm"
          >
            Ücretsiz Analiz ile Başlayın
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
