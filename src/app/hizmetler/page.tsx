import { BRAND } from "@/lib/constants";
import CTA from "@/components/sections/CTA";
import Button from "@/components/ui/Button";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";

export const metadata: Metadata = {
  title: "Hizmetler - Kurumsal AI Danışmanlığı",
  description:
    "Süreç analizi, iş akışı otomasyonu, müşteri deneyimi, veri otomasyonu, AI strateji danışmanlığı ve AI dönüşüm koçluğu. Şirketinize özel, ölçülebilir sonuçlar.",
  openGraph: {
    title: "Hizmetler - Kurumsal AI Danışmanlığı",
    description: "Süreç analizi, iş akışı otomasyonu, müşteri deneyimi, veri otomasyonu ve AI strateji danışmanlığı.",
    type: "website",
    url: "https://www.verimio.com.tr/hizmetler",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hizmetler - Kurumsal AI Danışmanlığı",
    description: "Süreç analizi, iş akışı otomasyonu, müşteri deneyimi, veri otomasyonu ve AI strateji danışmanlığı.",
  },
  alternates: { canonical: "https://www.verimio.com.tr/hizmetler" },
};

const services = [
  {
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
  {
    title: "AI Dönüşüm Koçluğu",
    description:
      "Strateji de uygulama da tek elden. Analiz eder, yol haritası çizer — sonra birlikte uygular, ekibinizi eğitir ve sonuçları ölçeriz. 3-12 ay boyunca yanınızdayız.",
    features: [
      "Sürekli eşlik: stratejiden uygulamaya tek ortak",
      "İş başında, departman bazlı AI eğitimi",
      "Değişim yönetimi ve ekip adaptasyonu",
      "KPI takibi ve sürekli iyileştirme döngüsü",
    ],
  },
];

const steps = [
  { step: "01", title: "Check-up ile başlar", description: "Sektörünüze ve yapınıza özel sorularla firmanızı tanıyoruz." },
  { step: "02", title: "Size özel analiz raporu", description: "Otomasyon potansiyelinizi ve tasarruf tahminlerinizi somut rakamlarla ortaya koyuyoruz." },
  { step: "03", title: "Strateji görüşmesi", description: "Raporu birlikte değerlendiriyoruz. Yol haritasını netleştiriyoruz." },
  { step: "04", title: "Uygulama ve takip", description: "Çözümleri hayata geçiriyoruz. Sonuçları ölçüyor, her adımda yanınızda duruyoruz." },
];

export default function HizmetlerPage() {
  return (
    <main className="pt-24">
      <BreadcrumbSchema
        items={[
          { name: "Ana Sayfa", url: "https://www.verimio.com.tr" },
          { name: "Hizmetler", url: "https://www.verimio.com.tr/hizmetler" },
        ]}
      />
      <ServiceSchema
        services={services.map((s) => ({
          name: s.title,
          description: s.description,
        }))}
      />

      {/* Hero */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Hizmetler
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Operasyonunuzu ölçülebilir şekilde iyileştiriyoruz.
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed mb-8 max-w-2xl">
            Her hizmet alanımız, önce doğru analiz — sonra somut ROI hesabı — ardından uygulama sıralamasıyla çalışır.
          </p>
          <Button href={BRAND.checkupUrl} size="md">
            Hangi çözüm bana uygun?
          </Button>
        </div>
      </section>

      {/* Services — liste formatı */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                <div className="md:col-span-1">
                  <span className="text-sm text-foreground-muted tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-5">
                  <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                  <p className="text-foreground-secondary leading-relaxed">{service.description}</p>
                </div>
                <div className="md:col-span-6">
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground-secondary">
                        <span className="w-1 h-1 rounded-full bg-foreground-muted mt-2 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Süreç — 4 adım */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Süreç
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 max-w-2xl">
            Tanıdan uygulamaya dört adım
          </h2>

          <div className="space-y-12">
            {steps.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-1">
                  <span className="text-4xl font-bold text-border">{item.step}</span>
                </div>
                <div className="md:col-span-5">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-foreground-secondary leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
