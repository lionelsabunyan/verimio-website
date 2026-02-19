import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  BarChart3,
  Workflow,
  Database,
  BrainCircuit,
  CheckCircle2,
  Clock,
  HeadphonesIcon,
  TrendingUp,
} from "lucide-react";
import { BRAND } from "@/lib/constants";
import { getServiceIconStyle } from "@/lib/brand-colors";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetler | Verimio - Kurumsal AI Danışmanlığı",
  description:
    "Süreç analizi, iş akışı otomasyonu, müşteri deneyimi, veri otomasyonu ve AI strateji danışmanlığı. Şirketinize özel, ölçülebilir sonuçlar.",
};

const services = [
  {
    icon: Workflow,
    title: "Süreç Analizi & Optimizasyonu",
    description:
      "İş süreçlerinizi uçtan uca haritalıyoruz. Zaman ve kaynak kaybına yol açan adımları tespit edip, operasyonunuzu sade ve ölçeklenebilir hale getiriyoruz.",
    features: [
      "Uçtan uca iş akışı analizi ve haritalama",
      "Darboğaz ve israf noktalarının tespiti",
      "Belge ve bilgi yönetimi sistemleri",
      "Onay ve yetkilendirme süreçlerinin dijitalleştirilmesi",
    ],
  },
  {
    icon: BrainCircuit,
    title: "İş Akışı Otomasyonu",
    description:
      "Tekrarlayan, manuel görevleri otomatize ediyoruz. Ekibiniz rutin işler yerine stratejik çalışmaya vakit ayırsın.",
    features: [
      "Manuel süreçlerin otomasyona alınması",
      "Sistemler arası veri entegrasyonu",
      "Otomatik bildirim ve takip mekanizmaları",
      "Araç ve platform entegrasyonu",
    ],
  },
  {
    icon: Bot,
    title: "Müşteri Deneyimi Otomasyonu",
    description:
      "7/24 müşteri desteği sağlayan akıllı çözümler. Sık sorulan soruları otomatik yanıtlayın, ekibinizin yükünü azaltın, memnuniyeti artırın.",
    features: [
      "Firmanıza özel eğitilmiş dijital asistan",
      "Çoklu kanal desteği (web, WhatsApp, e-posta)",
      "Canlı destek sistemi entegrasyonu",
      "Performans izleme ve sürekli iyileştirme",
    ],
  },
  {
    icon: BarChart3,
    title: "Veri & Raporlama Otomasyonu",
    description:
      "Dağınık verilerinizi anlamlı bilgilere dönüştürün. Gerçek zamanlı dashboard'lar ve otomatik raporlarla karar alma sürecinizi hızlandırın.",
    features: [
      "Otomatik veri toplama ve birleştirme",
      "Gerçek zamanlı dashboard tasarımı",
      "KPI takibi ve periyodik rapor oluşturma",
      "Veri temizleme, yapılandırma ve görselleştirme",
    ],
  },
  {
    icon: Database,
    title: "AI Strateji & Entegrasyon",
    description:
      "Doğru araçla, doğru süreçte, doğru zamanda AI kullanın. Bağımsız danışmanlar olarak firmanıza en uygun teknolojiyi seçip entegrasyon sürecini yönetiyoruz.",
    features: [
      "AI kullanım alanlarının önceliklendirilmesi",
      "Bağımsız araç ve platform tavsiyesi",
      "Entegrasyon stratejisi ve yol haritası",
      "Ekip eğitimi ve adaptasyon desteği",
    ],
  },
];

const steps = [
  {
    step: "01",
    title: "Her şey check-up'la başlar",
    description:
      "Sektörünüze ve yapınıza özel sorularla firmanızı tanıyoruz. Süreçlerinizi, ihtiyaçlarınızı ve önceliklerinizi dinliyoruz.",
  },
  {
    step: "02",
    title: "Size özel analiz raporu",
    description:
      "48 saat içinde otomasyon potansiyelinizi, tasarruf tahminlerinizi ve öncelikli aksiyon alanlarınızı somut rakamlarla ortaya koyuyoruz.",
  },
  {
    step: "03",
    title: "Strateji görüşmesi",
    description:
      "Raporu birlikte değerlendiriyoruz. Yol haritasını netleştiriyor, hangi adımları birlikte atağımızı kararlaştırıyoruz.",
  },
  {
    step: "04",
    title: "Uygulama ve takip",
    description:
      "Çözümleri hayata geçiriyoruz. Sonuçları ölçüyor, gerektiğinde yeniden planlıyor ve her adımda yanınızda duruyoruz.",
  },
];

const problemCards = [
  {
    icon: Clock,
    problem: "Ekibiniz tekrarlayan işlere çok fazla vakit mi harcıyor?",
    solution: "Süreç Analizi ve İş Akışı Otomasyonu ile bu yükü kaldırıyoruz.",
  },
  {
    icon: HeadphonesIcon,
    problem: "Müşteri destek talepleriniz yönetilemez hale mi geliyor?",
    solution: "Müşteri Deneyimi Otomasyonu ile 7/24 destek kapasitesi oluşturuyoruz.",
  },
  {
    icon: TrendingUp,
    problem: "Verileriniz var ama doğru kararı almakta zorlanıyor musunuz?",
    solution: "Veri & Raporlama Otomasyonu ile anlık, doğru ve görsel raporlar sunuyoruz.",
  },
];

export default function HizmetlerPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
              <span className="text-sm font-medium text-foreground-secondary tracking-wide uppercase ml-1">Hizmetlerimiz</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Operasyonunuzu{" "}
              <span className="gradient-text">ölçülebilir şekilde iyileştiriyoruz.</span>
            </h1>

            <p className="text-lg text-foreground-secondary leading-relaxed mb-8 max-w-2xl">
              Her hizmet alanımız, önce doğru analiz — sonra somut ROI hesabı — ardından uygulama
              sıralamasıyla çalışır. Şirketinize özgün, rakam temelli çözümler sunuyoruz.
            </p>

            <Link
              href={BRAND.tallyFormUrl}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary-hover transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25 text-sm"
            >
              Hangi Çözüm Bana Uygun?
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
            <span className="text-sm font-medium text-foreground-secondary tracking-wide uppercase ml-1">Hizmet Alanları</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            5 alanda <span className="gradient-text">danışmanlık.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const style = getServiceIconStyle(index);
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl border border-border hover:border-border-accent transition-all duration-300 bg-surface group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${style.bg} ${style.text} flex items-center justify-center mb-6`}
                  >
                    <service.icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-foreground-secondary leading-relaxed mb-6">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground-secondary">
                        <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engagement Model — 4 adım */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60" />
              <span className="text-sm font-medium text-foreground-secondary tracking-wide uppercase ml-1">Nasıl Çalışıyoruz?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Tanı'dan uygulamaya{" "}
              <span className="gradient-text">4 adım.</span>
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              Her proje aynı disiplinle başlar: önce anlamak, sonra planlamak, sonra yapmak.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-primary text-secondary font-bold text-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hangi Hizmet Size Uygun? */}
      <section className="section-padding bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60" />
            <span className="text-sm font-medium text-foreground-secondary tracking-wide uppercase ml-1">Nereden Başlayalım?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Hangi sorunu{" "}
            <span className="gradient-text">çözmek istiyorsunuz?</span>
          </h2>
          <p className="text-foreground-secondary leading-relaxed mb-12 max-w-2xl">
            Doğru hizmet alanını belirlemek için önce sorunu netleştirmek gerekir.
            Ücretsiz check-up ile birlikte buluyoruz.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {problemCards.map((card, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border border-border bg-surface hover:border-border-accent transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-light/10 flex items-center justify-center mb-6 group-hover:bg-primary-light/20 transition-colors">
                  <card.icon className="w-6 h-6 text-primary-light" />
                </div>
                <p className="font-semibold text-lg mb-3 leading-snug">{card.problem}</p>
                <p className="text-sm text-foreground-secondary leading-relaxed">{card.solution}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href={BRAND.tallyFormUrl}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary-hover transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25 text-sm"
            >
              Ücretsiz Check-Up Başlatın
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-dark" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Firmanıza En Uygun Çözümü Bulalım
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Ücretsiz check-up ile hangi danışmanlık alanlarının firmanıza en çok fayda
            sağlayacağını birlikte belirleyelim.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={BRAND.tallyFormUrl}
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary-hover transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25"
            >
              Ücretsiz Check-Up Başlatın
              <ArrowUpRight className="w-5 h-5" />
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:border-secondary hover:text-secondary transition-all duration-200"
            >
              Bize Ulaşın
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
