import Link from "next/link";
import { ArrowUpRight, CheckCircle2, BarChart3, Users2 } from "lucide-react";
import { BRAND } from "@/lib/constants";
import FAQ from "@/components/sections/FAQ";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | Verimio - Kurumsal AI Danışmanlığı",
  description:
    "Verimio, şirketlerin iş süreçlerini analiz eden, darboğazları tespit eden ve kurumsal AI dönüşümünde rehberlik eden bir danışmanlık firmasıdır.",
};

const differentiators = [
  {
    icon: CheckCircle2,
    title: "Sadece Rapor Değil",
    description:
      "Analiz teslim edip çekilmiyoruz. Uygulama sürecinde de yanınızda oluyoruz — her adımı birlikte planlıyor, geribildirim alarak ilerliyoruz.",
  },
  {
    icon: Users2,
    title: "Şablona Değil, Size Özel",
    description:
      "Her firmanın operasyonu farklıdır. Hazır reçete yerine, iş süreçlerinizi bizzat inceleyerek size özgü bir strateji ve yol haritası oluşturuyoruz.",
  },
  {
    icon: BarChart3,
    title: "Ölçülebilir Sonuç",
    description:
      "Soyut öneriler değil, somut rakamlar. Tasarruf potansiyelini, ROI'yi ve aksiyon önceliklerini sayısal olarak ortaya koyuyoruz.",
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
              Şirketinizin içindeymiş gibi{" "}
              <span className="gradient-text">düşünen danışmanınız.</span>
            </h1>

            <p className="text-lg text-foreground-secondary leading-relaxed mb-8 max-w-2xl">
              AI ve otomasyon dönüşümünü yüzeysel değil, derinlemesine yönetiyoruz.
              İş süreçlerinizi analiz eder, darboğazları tespit eder ve size özel
              çözümlerle hem zamanınızı hem bütçenizi koruruz.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={BRAND.tallyFormUrl}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary-hover transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25 text-sm"
              >
                Ücretsiz Check-Up Başlatın
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

      {/* Problem → Yaklaşım */}
      <section className="section-padding bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
            <span className="text-sm font-medium text-foreground-secondary tracking-wide uppercase ml-1">Neden Verimio?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Gördüğümüz sorun,{" "}
            <span className="gradient-text">geliştirdiğimiz cevap.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Sol: Problem */}
            <div className="p-8 rounded-2xl border border-border bg-surface">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-6">
                <span className="text-red-500 text-lg font-bold">!</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Neden çoğu AI geçişi başarısız olur?</h3>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Şirketler AI, otomasyon ya da agent teknolojilerini duymak istiyor — ama ne istediklerini tam olarak bilmiyor. Bu belirsizlik içinde gerçekleştirilen geçişler çoğunlukla yanlış araç seçimiyle, eksik analizle ve somut bir getiri olmadan sonuçlanıyor.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                Sonuç: hem zaman kaybı hem bütçe israfı. Ve bir süre sonra "AI bizim için değilmiş" yanılgısı.
              </p>
            </div>

            {/* Sağ: Yaklaşım */}
            <div className="p-8 rounded-2xl border border-border-accent bg-surface">
              <div className="w-10 h-10 rounded-xl bg-primary-light/10 flex items-center justify-center mb-6">
                <span className="text-primary-light text-lg font-bold">✓</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Bizim yaklaşımımız</h3>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Biz bir satış kanalı değil, danışmanlık firmasıyız. Firmanızın operasyonunu gerçekten anlamak için doğru soruları soruyor, süreçlerinizi inceliyor ve somut bulgular üzerine bir strateji kuruyoruz.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                Her önerimiz ölçülebilir bir ROI hesabına dayanıyor. Şirketinizin içindeymiş gibi düşünerek, dışarıdan bir perspektifle çalışıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nasıl Farklıyız — 3 kart */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60" />
            <span className="text-sm font-medium text-foreground-secondary tracking-wide uppercase ml-1">Çalışma Biçimimiz</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Bizi farklı kılan{" "}
            <span className="gradient-text">üç temel ilke.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
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

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-dark" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Birlikte Çalışalım
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Firmanızın verimliliğini ve AI hazırlığını analiz ediyoruz.
            Size özel yol haritanız 48 saat içinde hazır.
          </p>
          <Link
            href={BRAND.tallyFormUrl}
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary-hover transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25"
          >
            Ücretsiz Check-Up Başlatın
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
