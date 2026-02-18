import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  BarChart3,
  FileText,
  Workflow,
  Sparkles,
  Database,
  CheckCircle2,
} from "lucide-react";
import { BRAND } from "@/lib/constants";
import { getServiceIconStyle } from "@/lib/brand-colors";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetler | Verimio - Kurumsal AI Danışmanlığı",
  description:
    "Süreç danışmanlığı, iş akışı otomasyonu, AI entegrasyonu ve operasyonel verimlilik analizi. Şirketinize özel danışmanlık çözümleri.",
};

const services = [
  {
    icon: Workflow,
    title: "Süreç Danışmanlığı",
    description:
      "İş süreçlerinizi baştan sona analiz ediyor, darboğazları tespit ediyor ve operasyonel verimliliği artıracak çözümler tasarlıyoruz.",
    features: [
      "İş akışı analizi ve optimizasyonu",
      "Otomatik veri işleme ve entegrasyon",
      "Onay süreçlerinin dijitalleştirilmesi",
      "Sistemler arası entegrasyon tasarımı",
    ],
  },
  {
    icon: Bot,
    title: "Müşteri Deneyimi Otomasyonu",
    description:
      "7/24 müşteri desteği sağlayan akıllı çözümler. Sık sorulan soruları otomatik yanıtlayın, müşteri memnuniyetini ve ekip verimliliğini artırın.",
    features: [
      "Firmanıza özel eğitilmiş dijital asistan",
      "Çoklu kanal desteği (web, WhatsApp)",
      "Canlı destek sistemi entegrasyonu",
      "Performans izleme ve sürekli iyileştirme",
    ],
  },
  {
    icon: BarChart3,
    title: "Otomatik Raporlama",
    description:
      "Excel tablolarından kurtulun. Gerçek zamanlı dashboard'lar ve otomatik rapor oluşturma ile karar alma sürecinizi hızlandırın.",
    features: [
      "Otomatik veri toplama ve birleştirme",
      "Gerçek zamanlı dashboard tasarımı",
      "Periyodik rapor oluşturma",
      "Veri görselleştirme ve analiz",
    ],
  },
  {
    icon: Sparkles,
    title: "AI Destekli İçerik Stratejisi",
    description:
      "Ürün açıklamalarından kurumsal iletişime, blog yazılarından e-posta kampanyalarına — AI destekli içerik üretimi ve yönetimi.",
    features: [
      "Marka sesinize uygun içerik",
      "SEO optimizasyonlu metin üretimi",
      "Çoklu dil desteği",
      "İçerik takvimi planlaması",
    ],
  },
  {
    icon: Database,
    title: "Veri Analizi & Dashboard",
    description:
      "Dağınık verilerinizi anlamlı bilgilere dönüştürün. İş zekası çözümleri ile veriye dayalı kararlar alın.",
    features: [
      "Veri temizleme ve yapılandırma",
      "İş zekası dashboard'ları",
      "Tahminsel analiz",
      "KPI takibi ve raporlama",
    ],
  },
  {
    icon: FileText,
    title: "Belge ve Bilgi Yönetimi",
    description:
      "Dosya aramanın son bulduğu yer. AI destekli belge sınıflandırma, arama ve yönetim çözümleri ile kurumsal verimliliğinizi artırın.",
    features: [
      "Otomatik belge sınıflandırma",
      "Akıllı arama ve indeksleme",
      "Optik karakter tanıma ve veri çıkarma",
      "Güvenli arşivleme çözümleri",
    ],
  },
];

const process = [
  {
    step: "01",
    title: "Şirket Check-Up'ı",
    description: "Sektörünüze özel soruları yanıtlayın, firmanızı tanıyalım.",
  },
  {
    step: "02",
    title: "Detaylı Rapor",
    description: "48 saat içinde size özel analiz raporunuz hazırlanır.",
  },
  {
    step: "03",
    title: "Danışmanlık Görüşmesi",
    description: "İsterseniz ücretsiz görüşmeyle yol haritanızı birlikte netleştirin.",
  },
  {
    step: "04",
    title: "Uygulama",
    description: "Seçtiğiniz çözümleri her adımda yanınızda olarak hayata geçirelim.",
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
              Şirketinize Özel{" "}
              <span className="gradient-text">AI Danışmanlığı</span>
            </h1>

            <p className="text-lg text-foreground-secondary leading-relaxed mb-8 max-w-2xl">
              Sektörünüze ve ihtiyaçlarınıza göre özelleştirilmiş danışmanlık çözümleri
              sunuyoruz. Her çözüm, somut ROI hesapları ve uygulama planıyla birlikte gelir.
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

      {/* Process */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60" />
              <span className="text-sm font-medium text-foreground-secondary tracking-wide uppercase ml-1">Süreç</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Nasıl <span className="gradient-text">Başlarsınız?</span>
            </h2>
            <p className="text-foreground-secondary leading-relaxed">
              4 adımda danışmanlık sürecinizi başlatın.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
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
