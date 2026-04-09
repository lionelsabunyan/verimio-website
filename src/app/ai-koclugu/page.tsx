import {
  GraduationCap,
  Users,
  Target,
  TrendingUp,
  Brain,
  MessageSquare,
  BarChart3,
  Briefcase,
  ShoppingCart,
  Factory,
  Landmark,
  CheckCircle2,
  Lightbulb,
  Repeat,
  ChevronDown,
} from "lucide-react";
import CTA from "@/components/sections/CTA";
import Button from "@/components/ui/Button";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  title: "AI Koçluğu — Strateji ve Uygulama Tek Elden | Verimio",
  description:
    "AI koçluğu ile şirketinizin yapay zeka dönüşümüne birebir eşlik ediyoruz. Strateji, uygulama ve sürekli destek — hepsi tek elden. Ücretsiz check-up ile başlayın.",
  keywords:
    "AI koçluğu, yapay zeka koçluğu, AI koçu, yapay zeka koçu, kurumsal AI eğitimi, ChatGPT eğitimi şirketler için, yapay zeka eğitimi kurumsal, AI danışmanlık, AI dönüşüm koçluğu",
  openGraph: {
    title: "AI Koçluğu — Strateji ve Uygulama Tek Elden",
    description:
      "Şirketinizin yapay zeka dönüşümünde strateji de uygulama da tek elden. Danışmanlık ve koçluk aynı sürecin parçası.",
    type: "website",
    url: "https://www.verimio.com.tr/ai-koclugu",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Koçluğu — Strateji ve Uygulama Tek Elden",
    description:
      "Şirketinizin yapay zeka dönüşümünde strateji de uygulama da tek elden.",
  },
  alternates: { canonical: "https://www.verimio.com.tr/ai-koclugu" },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const processSteps = [
  {
    icon: Target,
    phase: "Faz 1",
    title: "Keşif & Durum Analizi",
    description:
      "Şirketinizin mevcut süreçlerini, veri altyapısını ve ekip yetkinliklerini haritalıyoruz. AI hazırlık seviyenizi belirliyor, en yüksek etkili fırsat alanlarını ortaya çıkarıyoruz.",
    duration: "1-2 hafta",
  },
  {
    icon: Lightbulb,
    phase: "Faz 2",
    title: "Strateji & Yol Haritası",
    description:
      "Size özel bir AI dönüşüm yol haritası oluşturuyoruz. Hangi süreçte hangi araç, hangi sırayla uygulanacak, beklenen ROI ne olacak — hepsi somut ve ölçülebilir.",
    duration: "1-2 hafta",
  },
  {
    icon: Repeat,
    phase: "Faz 3",
    title: "Uygulama & Koçluk",
    description:
      "Pilot projeleri birlikte hayata geçiriyoruz. Ekibinize birebir eğitim veriyor, araçları tanıtıyor ve her adımda yanınızda oluyoruz. Sorunlar çıktığında birlikte çözüyoruz.",
    duration: "4-8 hafta",
  },
  {
    icon: TrendingUp,
    phase: "Faz 4",
    title: "Ölçümleme & Sürekli İyileştirme",
    description:
      "Sonuçları birlikte takip ediyoruz. KPI'lar üzerinden performansı ölçüyor, yeni fırsatları tespit ediyor ve dönüşümü sürdürülebilir kılıyoruz.",
    duration: "Sürekli",
  },
];

const departments = [
  {
    icon: Users,
    title: "İnsan Kaynakları",
    examples:
      "İşe alım süreçlerini hızlandırma, çalışan bağlılığı analizi, performans değerlendirme otomasyonu",
  },
  {
    icon: MessageSquare,
    title: "Pazarlama",
    examples:
      "İçerik üretimi, kampanya optimizasyonu, müşteri segmentasyonu, sosyal medya otomasyonu",
  },
  {
    icon: Briefcase,
    title: "Satış",
    examples:
      "Lead skorlama, teklif hazırlama otomasyonu, CRM zenginleştirme, satış tahminleme",
  },
  {
    icon: BarChart3,
    title: "Operasyon",
    examples:
      "Raporlama otomasyonu, tedarik zinciri optimizasyonu, kalite kontrol, süreç madenciliği",
  },
  {
    icon: Landmark,
    title: "Finans",
    examples:
      "Otomatik mutabakat, nakit akışı tahmini, fatura işleme, uyumluluk kontrolleri",
  },
  {
    icon: ShoppingCart,
    title: "Müşteri Hizmetleri",
    examples:
      "Akıllı chatbot, sesli asistan, otomatik bilet yönlendirme, müşteri memnuniyeti analizi",
  },
];

const comparisons = [
  {
    aspect: "Süre",
    traditional: "Proje bazlı, genellikle 1-3 ay",
    verimio: "Sürekli eşlik, 3-12 ay — stratejiden uygulamaya",
  },
  {
    aspect: "Yaklaşım",
    traditional: "Analiz → rapor → teslim et → çekil",
    verimio: "Analiz → strateji → birlikte uygula → ölç → iyileştir",
  },
  {
    aspect: "Uygulama",
    traditional: "Genellikle müşteriye bırakılır",
    verimio: "Birlikte yapılır, her adımda destek",
  },
  {
    aspect: "Eğitim",
    traditional: "Ayrı satın alınır veya hiç verilmez",
    verimio: "İş başında, gerçek verilerinizle, sürecin parçası",
  },
  {
    aspect: "Sonuç Takibi",
    traditional: "Proje bitince ilişki biter",
    verimio: "Sürekli KPI ölçümü ve iyileştirme döngüsü",
  },
];

const faqItems = [
  {
    question: "AI koçluğu nedir?",
    answer:
      "AI koçluğu, şirketinizin yapay zeka dönüşümüne sürekli ve kişiselleştirilmiş eşlik eden bir hizmettir. Verimio'da danışmanlık ve koçluk aynı sürecin parçasıdır — strateji çizer, birlikte uygular, sonuçları ölçeriz.",
  },
  {
    question: "AI koçluğu ile AI danışmanlığı arasındaki fark nedir?",
    answer:
      "Geleneksel danışmanlık genellikle proje bazlıdır: analiz yapılır, rapor teslim edilir. Verimio'da ise danışmanlık ve koçluk tek süreçtir — hem stratejiyi çizer hem birlikte uygularız. Ayrı ayrı satın almanıza gerek yok.",
  },
  {
    question: "AI koçluğu süreci ne kadar sürer?",
    answer:
      "Tipik bir süreç 3-12 ay arasındadır. İlk keşif ve strateji 2-4 hafta, pilot uygulamalar 4-8 hafta, sürekli iyileştirme devam eden bir süreçtir. Süre, şirketinizin büyüklüğü ve hedeflerine göre özelleştirilir.",
  },
  {
    question: "Hangi departmanlar AI koçluğundan faydalanabilir?",
    answer:
      "İK, pazarlama, satış, operasyon, finans ve müşteri hizmetleri dahil tüm departmanlar faydalanabilir. Her departman için ayrı kullanım senaryoları ve araç önerileri sunuyoruz.",
  },
  {
    question: "AI koçluğunun maliyeti nedir?",
    answer:
      "Fiyatlandırmamız şirket büyüklüğü, kapsam ve süreye göre özelleştirilir. Ücretsiz Şirket Check-Up'ı ile başlayabilirsiniz — AI hazırlık durumunuzu analiz eder, size özel yol haritası ve bütçe önerisi sunarız.",
  },
  {
    question: "Küçük şirketler de AI koçluğu alabilir mi?",
    answer:
      "Evet. 5-10 kişilik ekiplerden 500+ çalışanlı şirketlere kadar her ölçekte AI koçluğu veriyoruz. KOBİ'ler için özelleştirilmiş, bütçe dostu paketlerimiz var.",
  },
  {
    question: "Uzaktan mı, yüz yüze mi çalışıyorsunuz?",
    answer:
      "Her iki formatta da çalışıyoruz. Düzenli online görüşmeler, ekran paylaşımlı eğitimler ve gerektiğinde yerinde çalıştaylar düzenliyoruz. Hibrit model en verimli sonuçları üretiyor.",
  },
  {
    question: "AI koçluğuna nasıl başlarım?",
    answer:
      "Ücretsiz Şirket Check-Up'ı formumuzu doldurun. 48 saat içinde AI hazırlık raporunuzu ve önerilen yol haritasını e-postanıza gönderiyoruz. Beğenirseniz koçluk sürecine birlikte başlıyoruz.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function AIKocluguPage() {
  return (
    <main className="pt-24">
      {/* Schema */}
      <BreadcrumbSchema
        items={[
          { name: "Ana Sayfa", url: "https://www.verimio.com.tr" },
          { name: "AI Koçluğu", url: "https://www.verimio.com.tr/ai-koclugu" },
        ]}
      />
      <FAQSchema items={faqItems} />
      <ServiceSchema
        services={[
          {
            name: "AI Koçluğu",
            description:
              "Şirketlerin yapay zeka dönüşümüne sürekli ve kişiselleştirilmiş eşlik eden koçluk hizmeti. Stratejiden uygulamaya, eğitimden ölçümlemeye kadar her aşamada destek.",
          },
          {
            name: "Kurumsal AI Eğitimi",
            description:
              "Departman bazlı, uygulamalı yapay zeka eğitim programları. ChatGPT, otomasyon araçları ve veri analizi konularında ekibinizi güçlendirin.",
          },
        ]}
      />

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            AI Koçluğu
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Strateji de uygulama da tek elden.
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed mb-8 max-w-2xl">
            Verimio&apos;da danışmanlık ve koçluk aynı sürecin parçasıdır.
            Analiz eder, yol haritası çizer — sonra birlikte uygular,
            ekibinizi eğitir ve sonuçları ölçeriz.
          </p>
          <Button href="/analiz" size="md">
            Ücretsiz Check-Up Başlat
          </Button>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  AI KOÇLUĞU NEDİR?                                           */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-0.5 rounded-full bg-primary-light" />
            <span className="text-xs font-medium text-foreground-muted tracking-widest uppercase">
              Kavram
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            AI Koçluğu Nedir?
          </h2>
          <div className="max-w-3xl space-y-4 text-foreground-secondary leading-relaxed">
            <p>
              <strong className="text-foreground">AI koçluğu</strong>,
              şirketinizin yapay zeka dönüşümüne{" "}
              <em>sürekli, kişiselleştirilmiş ve sonuç odaklı</em> eşlik eden
              bir hizmettir. Strateji oluşturmakla kalmaz, uygulamayı da
              birlikte yapar.
            </p>
            <p>
              Verimio&apos;da danışmanlık ve koçluk ayrı hizmetler değildir —
              aynı sürecin farklı aşamalarıdır. Önce{" "}
              <strong className="text-foreground">danışman</strong> olarak
              süreçlerinizi analiz eder, yol haritası çizeriz. Sonra{" "}
              <strong className="text-foreground">koç</strong> olarak birlikte
              uygular, ekibinizi eğitir ve sonuçları ölçeriz.
            </p>
            <p>
              Türkiye&apos;de birçok şirket yapay zekayı &quot;denemek&quot;
              istiyor ama nereden başlayacağını bilmiyor. Geleneksel modellerde
              ya sadece analiz yapılır ya sadece eğitim verilir. Verimio&apos;nun
              farkı:{" "}
              <strong className="text-foreground">
                strateji, uygulama, eğitim ve sürekli destek — hepsi tek elden.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  KARŞILAŞTIRMA: Geleneksel vs Verimio                       */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
              <span className="text-xs font-semibold text-foreground-secondary tracking-widest uppercase ml-1">
                Karşılaştırma
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Geleneksel Yaklaşım vs{" "}
              <span className="text-foreground">Verimio Modeli</span>
            </h2>
            <p className="text-foreground-secondary max-w-2xl mx-auto">
              Piyasadaki çoğu firma ya danışmanlık ya eğitim yapıyor. Biz
              strateji, uygulama, eğitim ve sürekli desteği tek süreçte
              birleştiriyoruz.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground-muted uppercase tracking-wider">
                    Kriter
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground-muted uppercase tracking-wider">
                    Geleneksel Yaklaşım
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground uppercase tracking-wider">
                    Verimio Modeli
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row) => (
                  <tr
                    key={row.aspect}
                    className="border-b border-border last:border-b-0"
                  >
                    <td className="py-4 px-6 font-medium text-foreground text-sm">
                      {row.aspect}
                    </td>
                    <td className="py-4 px-6 text-foreground-secondary text-sm">
                      {row.traditional}
                    </td>
                    <td className="py-4 px-6 text-foreground font-medium text-sm">
                      {row.verimio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  NASIL ÇALIŞIR? 4 Faz                                        */}
      {/* ============================================================ */}
      <section id="nasil-calisir" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
              <span className="text-xs font-semibold text-foreground-secondary tracking-widest uppercase ml-1">
                Süreç
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              AI Koçluğu{" "}
              <span className="text-foreground">Nasıl Çalışır?</span>
            </h2>
            <p className="text-foreground-secondary max-w-2xl mx-auto">
              Dönüşüm bir sprint değil, bir maratondur. 4 aşamalı sürecimiz
              sizi adım adım hedefe taşır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {processSteps.map((step) => (
              <div
                key={step.phase}
                className="relative p-8 rounded-2xl bg-surface border border-border hover:border-foreground transition-all duration-300 group "
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
                    <step.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                    {step.phase}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary group-hover:text-foreground transition-colors">
                  {step.title}
                </h3>
                <p className="text-foreground-secondary leading-relaxed mb-4">
                  {step.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-foreground-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground-muted" />
                  Süre: {step.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  NEDEN AI KOÇLUĞU?                                           */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-0.5 rounded-full bg-primary-light" />
            <span className="text-xs font-medium text-foreground-muted tracking-widest uppercase">
              Avantajlar
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Neden <span className="text-foreground">AI Koçluğu?</span>
          </h2>
          <p className="text-foreground-secondary leading-relaxed mb-10 max-w-3xl">
            Yapay zeka dönüşümü sadece bir yazılım satın almak değildir. Bir{" "}
            <strong className="text-foreground">
              kültür değişikliği, süreç yeniden tasarımı ve ekip dönüşümüdür.
            </strong>{" "}
            Bu dönüşümde en büyük engel teknoloji değil, insandır.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                icon: Brain,
                title: "Strateji + Uygulama Birlikte",
                text: "Geleneksel modelde strateji teslim edilir, uygulaması size kalır. Verimio modelinde birlikte uyguluyoruz.",
              },
              {
                icon: GraduationCap,
                title: "Eğitim Yerinde, İş Başında",
                text: "Sınıf ortamında değil, kendi iş süreçleriniz üzerinde, gerçek verilerinizle öğreniyorsunuz.",
              },
              {
                icon: CheckCircle2,
                title: "Ölçülebilir Sonuçlar",
                text: "Her aşamada KPI takibi yapıyoruz. Tasarruf edilen saat, azalan hata oranı, artan verimlilik — somut rakamlar.",
              },
              {
                icon: Factory,
                title: "Sektörel Uzmanlık",
                text: "Üretim, perakende, finans, lojistik ve profesyonel hizmetlerde AI uygulamaları deneyimimiz var.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8 rounded-2xl bg-surface border border-border hover:border-foreground transition-all duration-300 group "
              >
                <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-6 group-hover:bg-foreground/10 transition-colors">
                  <item.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary group-hover:text-foreground transition-colors">
                  {item.title}
                </h3>
                <p className="text-foreground-secondary leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DEPARTMANLAR                                                 */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
              <span className="text-xs font-semibold text-foreground-secondary tracking-widest uppercase ml-1">
                Departmanlar
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Hangi Departmanlar İçin{" "}
              <span className="text-foreground">AI Koçluğu?</span>
            </h2>
            <p className="text-foreground-secondary max-w-2xl mx-auto">
              Her departmanın yapay zeka ile verimlilik kazanabileceği alanlar
              farklıdır. Koçluk sürecini departmanınızın gerçekliğine göre
              özelleştiriyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept) => (
              <div
                key={dept.title}
                className="p-8 rounded-2xl bg-surface border border-border hover:border-foreground transition-all duration-300 group "
              >
                <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-6 group-hover:bg-foreground/10 transition-colors">
                  <dept.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary group-hover:text-foreground transition-colors">
                  {dept.title}
                </h3>
                <p className="text-foreground-secondary leading-relaxed">
                  {dept.examples}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  KİMLER İÇİN?                                                */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-0.5 rounded-full bg-primary-light" />
            <span className="text-xs font-medium text-foreground-muted tracking-widest uppercase">
              Hedef Kitle
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            AI Koçluğu{" "}
            <span className="text-foreground">Kime Göre?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Yapay zekayı denemek istiyor ama nereden başlayacağını bilmiyorsanız",
              "Bir AI eğitimi aldınız ama uygulamaya geçemediyseniz",
              "Danışmanlık raporu aldınız ama rafa kalktıysa",
              "Ekibiniz AI araçlarına direnç gösteriyorsa",
              "Rakiplerinizin AI kullandığını görüyor ve geride kalmak istemiyorsanız",
              "KOBİ olarak büyük bütçeler ayıramıyorsanız ama yine de dönüşmek istiyorsanız",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 p-5 rounded-xl bg-surface border border-border"
              >
                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <p className="text-foreground-secondary leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SSS — Native details/summary accordion                     */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
              <span className="text-xs font-semibold text-foreground-secondary tracking-widest uppercase ml-1">
                SSS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Sık Sorulan{" "}
              <span className="text-foreground">Sorular</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-border bg-surface overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 text-foreground font-semibold hover:bg-foreground/[0.02] transition-colors list-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown className="w-5 h-5 text-foreground-muted shrink-0 ml-4 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-foreground-secondary leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  İLGİLİ İÇERİKLER                                           */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">İlgili İçerikler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "AI Danışmanlık Neden Farklıdır?",
                href: "/blog/ai-danismanlik-neden-farklidir",
              },
              {
                title: "Şirketlerde Yapay Zeka Devrimi: 5 Adım",
                href: "/blog/kobide-yapay-zeka-devrimi",
              },
              {
                title: "İş Dünyası İçin Prompt Mühendisliği",
                href: "/blog/is-dunyasi-icin-prompt-muhendisligi-chatgptden-gercek-deger-",
              },
              {
                title: "Ekibiniz AI'dan Korkmalı mı?",
                href: "/blog/ekibiniz-yapay-zekadan-korkmali-mi-yoksa-onu-kucaklamali-mi",
              },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-4 p-6 rounded-2xl bg-surface border border-border hover:border-foreground transition-all duration-300 group "
              >
                <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center shrink-0 group-hover:bg-foreground/10 transition-colors">
                  <GraduationCap className="w-5 h-5 text-foreground" />
                </div>
                <span className="font-medium group-hover:text-primary group-hover:text-foreground transition-colors">
                  {link.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                          */}
      {/* ============================================================ */}
      <CTA />
    </main>
  );
}
