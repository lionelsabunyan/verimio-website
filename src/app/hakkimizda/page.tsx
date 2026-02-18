import Link from "next/link";
import { ArrowUpRight, Users, Target, Lightbulb, TrendingUp } from "lucide-react";
import { BRAND } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | Verimio - AI Dönüşüm Danışmanlığı",
  description:
    "Verimio, Türk KOBİ'lerinin yapay zeka ile dijital dönüşümüne odaklanan bir AI danışmanlık firmasıdır.",
};

const values = [
  {
    icon: Target,
    title: "Misyonumuz",
    description:
      "Türk KOBİ'lerinin yapay zeka teknolojilerinden en verimli şekilde faydalanmasını sağlamak. Karmaşık teknolojiyi basit, uygulanabilir çözümlere dönüştürüyoruz.",
  },
  {
    icon: Lightbulb,
    title: "Vizyonumuz",
    description:
      "Türkiye'nin en güvenilir AI dönüşüm partneri olmak. Her ölçekteki işletmenin yapay zekayı günlük operasyonlarına entegre edebildiği bir gelecek inşa ediyoruz.",
  },
  {
    icon: Users,
    title: "Yaklaşımımız",
    description:
      "Her firmanın kendine özgü ihtiyaçları olduğuna inanıyoruz. Standart çözümler yerine, iş süreçlerinize özel AI stratejileri geliştiriyoruz.",
  },
  {
    icon: TrendingUp,
    title: "Sonuç Odaklılık",
    description:
      "Sadece rapor vermiyoruz, sonuç üretiyoruz. ROI hesaplarımız gerçekçi, önerilerimiz uygulanabilir. Her adımda yanınızdayız.",
  },
];

const timeline = [
  {
    year: "2025",
    title: "Fikir Aşaması",
    description: "KOBİ'lerin AI dönüşümündeki boşluğu fark ettik. Araştırma ve planlama sürecine başladık.",
  },
  {
    year: "2026 Q1",
    title: "Lansman",
    description: "Ücretsiz AI check-up formumuzla ilk firmalarla çalışmaya başladık. İlk 50 firma analiz edildi.",
  },
  {
    year: "2026 Q2",
    title: "Büyüme",
    description: "Danışmanlık hizmetimizi genişlettik. Sektör özelinde çözümler geliştirmeye devam ediyoruz.",
  },
];

export default function HakkimizdaPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60" />
              <span className="text-sm font-medium text-foreground-secondary tracking-wide uppercase ml-1">Hakkımızda</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              AI Dönüşümünde{" "}
              <span className="gradient-text">Güvenilir Partneriniz</span>
            </h1>

            <p className="text-lg text-foreground-secondary leading-relaxed mb-8 max-w-2xl">
              Türk KOBİ&apos;lerinin dijital dönüşümüne odaklanan bir AI danışmanlık
              firmasıyız. İster dijital dünyada deneyimli olun, ister ilk adımlarınızı
              atıyor olun — firmanıza özel AI çözümleri sunuyoruz.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={BRAND.tallyFormUrl}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary-hover transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25 text-sm"
              >
                Ücretsiz Analiz Başlat
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/hizmetler"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-border text-foreground font-medium rounded-full hover:border-border-hover transition-all duration-200 text-sm"
              >
                Hizmetlerimiz
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
            <span className="text-sm font-medium text-foreground-secondary tracking-wide uppercase ml-1">Değerlerimiz</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Neden <span className="gradient-text">Verimio?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border border-border hover:border-border-accent transition-all duration-300 bg-surface group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-light/10 flex items-center justify-center mb-6 group-hover:bg-primary-light/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary-light" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  {item.title}
                </h3>
                <p className="text-foreground-secondary leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60" />
            <span className="text-sm font-medium text-foreground-secondary tracking-wide uppercase ml-1">Yolculuğumuz</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Kısa <span className="gradient-text">Tarihçemiz</span>
          </h2>

          <div className="space-y-0">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-8 group">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary-light border-4 border-border-accent" />
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-primary-light/30 to-border min-h-[80px]" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-12">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light/10 text-primary-light">{item.year}</span>
                  <h3 className="text-xl font-bold mt-2 mb-2">{item.title}</h3>
                  <p className="text-foreground-secondary leading-relaxed max-w-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-dark" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Birlikte Çalışalım
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Firmanızın AI potansiyelini keşfetmek için ilk adımı atın. Ücretsiz
            analiziniz sizi bekliyor.
          </p>
          <Link
            href={BRAND.tallyFormUrl}
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary-hover transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25"
          >
            Ücretsiz Analiz Başlat
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
