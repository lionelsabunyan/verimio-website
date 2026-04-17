import Link from "next/link";
import CTA from "@/components/sections/CTA";
import Button from "@/components/ui/Button";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";

export const metadata: Metadata = {
  title: "AI Koçluğu — Strateji ve Uygulama Tek Elden",
  description:
    "AI koçluğu ile şirketinizin yapay zeka dönüşümüne birebir eşlik ediyoruz. Strateji, uygulama ve sürekli destek — hepsi tek elden.",
  keywords:
    "AI koçluğu, yapay zeka koçluğu, AI koçu, kurumsal AI eğitimi, AI danışmanlık, AI dönüşüm koçluğu",
  openGraph: {
    title: "AI Koçluğu — Strateji ve Uygulama Tek Elden",
    description: "Şirketinizin yapay zeka dönüşümünde strateji de uygulama da tek elden.",
    type: "website",
    url: "https://www.verimio.com.tr/ai-koclugu",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Koçluğu — Strateji ve Uygulama Tek Elden",
    description: "Şirketinizin yapay zeka dönüşümünde strateji de uygulama da tek elden.",
  },
  alternates: { canonical: "https://www.verimio.com.tr/ai-koclugu" },
};

const processSteps = [
  { phase: "Faz 1", title: "Keşif & Durum Analizi", description: "Şirketinizin mevcut süreçlerini, veri altyapısını ve ekip yetkinliklerini haritalıyoruz. AI hazırlık seviyenizi belirliyor, en yüksek etkili fırsat alanlarını ortaya çıkarıyoruz.", duration: "1-2 hafta" },
  { phase: "Faz 2", title: "Strateji & Yol Haritası", description: "Size özel bir AI dönüşüm yol haritası oluşturuyoruz. Hangi süreçte hangi araç, hangi sırayla uygulanacak, beklenen ROI ne olacak — hepsi somut ve ölçülebilir.", duration: "1-2 hafta" },
  { phase: "Faz 3", title: "Uygulama & Koçluk", description: "Pilot projeleri birlikte kurarız. Ekibinize araçları bizzat gösteririz. Her hafta bir saat beraber çalışırız — kaybolmazsınız.", duration: "4-8 hafta" },
  { phase: "Faz 4", title: "Ölçümleme & Sürekli İyileştirme", description: "Sonuçları birlikte takip ederiz. Neyin işe yaradığını görürüz. İşlemeyeni değiştiririz.", duration: "Sürekli" },
];

const departments = [
  { title: "İnsan Kaynakları", examples: "İşe alım süreçlerini hızlandırma, çalışan bağlılığı analizi, performans değerlendirme otomasyonu" },
  { title: "Pazarlama", examples: "İçerik üretimi, kampanya optimizasyonu, müşteri segmentasyonu, sosyal medya otomasyonu" },
  { title: "Satış", examples: "Lead skorlama, teklif hazırlama otomasyonu, CRM zenginleştirme, satış tahminleme" },
  { title: "Operasyon", examples: "Raporlama otomasyonu, tedarik zinciri optimizasyonu, kalite kontrol, süreç madenciliği" },
  { title: "Finans", examples: "Otomatik mutabakat, nakit akışı tahmini, fatura işleme, uyumluluk kontrolleri" },
  { title: "Müşteri Hizmetleri", examples: "Akıllı chatbot, sesli asistan, otomatik bilet yönlendirme, müşteri memnuniyeti analizi" },
];

const comparisons = [
  { aspect: "Süre", traditional: "Proje bazlı, genellikle 1-3 ay", verimio: "Sürekli eşlik, 3-12 ay" },
  { aspect: "Yaklaşım", traditional: "Analiz → rapor → teslim et → çekil", verimio: "Analiz → strateji → birlikte uygula → ölç → iyileştir" },
  { aspect: "Uygulama", traditional: "Genellikle müşteriye bırakılır", verimio: "Birlikte yapılır, her adımda destek" },
  { aspect: "Eğitim", traditional: "Ayrı satın alınır veya hiç verilmez", verimio: "İş başında, gerçek verilerinizle, sürecin parçası" },
  { aspect: "Sonuç Takibi", traditional: "Proje bitince ilişki biter", verimio: "Sürekli KPI ölçümü ve iyileştirme döngüsü" },
];

const faqItems = [
  { question: "AI koçluğu nedir?", answer: "AI koçluğu, şirketinizin yapay zeka dönüşümüne sürekli ve kişiselleştirilmiş eşlik eden bir hizmettir. Verimio'da ikisini aynı kişi yapar — strateji çizer, birlikte uygular, sonuçları ölçer." },
  { question: "AI koçluğu ile AI danışmanlığı arasındaki fark nedir?", answer: "Geleneksel danışmanlık genellikle proje bazlıdır: analiz yapılır, rapor teslim edilir. Verimio'da ise danışmanlık ve koçluk tek süreçtir — hem stratejiyi çizer hem birlikte uygularız." },
  { question: "Süreç ne kadar sürer?", answer: "Tipik bir süreç 3-12 ay arasındadır. İlk keşif ve strateji 2-4 hafta, pilot uygulamalar 4-8 hafta, sürekli iyileştirme devam eden bir süreçtir." },
  { question: "Hangi departmanlar faydalanabilir?", answer: "İK, pazarlama, satış, operasyon, finans ve müşteri hizmetleri dahil tüm departmanlar. Her departman için ayrı kullanım senaryoları sunuyoruz." },
  { question: "Maliyeti nedir?", answer: "Fiyatlandırmamız şirket büyüklüğü, kapsam ve süreye göre özelleştirilir. Ücretsiz Check-Up ile başlayabilirsiniz." },
  { question: "Küçük şirketler de alabilir mi?", answer: "Evet. 5-10 kişilik ekiplerden 500+ çalışanlı şirketlere kadar her ölçekte çalışıyoruz." },
  { question: "Uzaktan mı, yüz yüze mi?", answer: "Her iki formatta da çalışıyoruz. Düzenli online görüşmeler ve gerektiğinde yerinde çalıştaylar düzenliyoruz." },
  { question: "Nasıl başlarım?", answer: "Ücretsiz Şirket Check-Up'ı formumuzu doldurun. 48 saat içinde AI hazırlık raporunuzu e-postanıza gönderiyoruz." },
] as const;

const targetAudience = [
  "Yapay zekayı denemek istiyor ama nereden başlayacağını bilmiyorsanız",
  "Bir AI eğitimi aldınız ama uygulamaya geçemediyseniz",
  "Danışmanlık raporu aldınız ama rafa kalktıysa",
  "Ekibiniz AI araçlarına direnç gösteriyorsa",
  "Rakiplerinizin AI kullandığını görüyor ve geride kalmak istemiyorsanız",
  "KOBİ olarak büyük bütçeler ayıramıyorsanız ama yine de dönüşmek istiyorsanız",
];

export default function AIKocluguPage() {
  return (
    <main className="pt-24">
      <BreadcrumbSchema items={[
        { name: "Ana Sayfa", url: "https://www.verimio.com.tr" },
        { name: "AI Koçluğu", url: "https://www.verimio.com.tr/ai-koclugu" },
      ]} />
      <FAQSchema items={faqItems} />
      <ServiceSchema services={[
        { name: "AI Koçluğu", description: "Şirketlerin yapay zeka dönüşümüne sürekli eşlik eden koçluk hizmeti." },
        { name: "Kurumsal AI Eğitimi", description: "Departman bazlı, uygulamalı yapay zeka eğitim programları." },
      ]} />

      {/* Hero */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">AI Koçluğu</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Strateji de uygulama da tek elden.
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed mb-8 max-w-2xl">
            Verimio&apos;da ikisini aynı kişi yapar. Analiz eder, yol haritası çizer. Sonra birlikte uygular, ekibinizi eğitir.
          </p>
          <Button href="/analiz" size="md">Ücretsiz Check-Up Başlat</Button>
        </div>
      </section>

      {/* AI Koçluğu Nedir? */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">Kavram</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 max-w-2xl">AI Koçluğu Nedir?</h2>
          <div className="max-w-3xl space-y-4 text-foreground-secondary leading-relaxed">
            <p><strong className="text-foreground">AI koçluğu</strong>, şirketinizin yapay zeka dönüşümüne sürekli, kişiselleştirilmiş ve sonuç odaklı eşlik eden bir hizmettir.</p>
            <p>Önce <strong className="text-foreground">danışman</strong> olarak süreçlerinizi analiz eder, yol haritası çizeriz. Sonra <strong className="text-foreground">koç</strong> olarak birlikte uygular, ekibinizi eğitir ve sonuçları ölçeriz.</p>
          </div>
        </div>
      </section>

      {/* Karşılaştırma */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">Karşılaştırma</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 max-w-2xl">Geleneksel Yaklaşım vs Verimio Modeli</h2>
          <div className="overflow-x-auto border border-border">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-6 text-xs font-medium text-foreground-muted uppercase tracking-wider">Kriter</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-foreground-muted uppercase tracking-wider">Geleneksel</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-foreground uppercase tracking-wider">Verimio</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row) => (
                  <tr key={row.aspect} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-6 font-medium text-foreground text-sm">{row.aspect}</td>
                    <td className="py-4 px-6 text-foreground-muted text-sm">{row.traditional}</td>
                    <td className="py-4 px-6 text-foreground text-sm">{row.verimio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4 Faz Süreci */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">Süreç</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 max-w-2xl">Nasıl çalışır</h2>
          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-2">
                  <span className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase">{step.phase}</span>
                  <p className="text-xs text-foreground-muted mt-1">{step.duration}</p>
                </div>
                <div className="md:col-span-5">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-foreground-secondary leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departmanlar */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">Departmanlar</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 max-w-2xl">Hangi departmanlar için</h2>
          <div className="space-y-0">
            {departments.map((dept, index) => (
              <div key={index} className="border-t border-border py-6 grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-1">
                  <span className="text-sm text-foreground-muted tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-bold">{dept.title}</h3>
                </div>
                <div className="md:col-span-8">
                  <p className="text-foreground-secondary leading-relaxed">{dept.examples}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* Kimler İçin */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">Hedef Kitle</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 max-w-2xl">AI Koçluğu kime göre</h2>
          <ul className="space-y-4">
            {targetAudience.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-foreground-secondary leading-relaxed">
                <span className="w-1 h-1 rounded-full bg-foreground-muted mt-2.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SSS */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">SSS</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 max-w-2xl">Sık Sorulan Sorular</h2>
          <div className="space-y-0">
            {faqItems.map((item, index) => (
              <details key={index} className="group border-b border-border">
                <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer list-none select-none">
                  <h3 className="font-bold text-foreground leading-snug pr-4">{item.question}</h3>
                  <span className="text-foreground-muted shrink-0 transition-transform duration-200 group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <div className="pb-6">
                  <p className="text-foreground-secondary leading-relaxed max-w-2xl">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* İlgili İçerikler */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-6">İlgili yazılar</p>
          <div className="space-y-0">
            {[
              { title: "AI Danışmanlık Neden Farklıdır?", href: "/blog/ai-danismanlik-neden-farklidir" },
              { title: "Şirketlerde Yapay Zeka Devrimi: 5 Adım", href: "/blog/kobide-yapay-zeka-devrimi" },
              { title: "Ekibiniz AI'dan Korkmalı mı?", href: "/blog/ekibiniz-yapay-zekadan-korkmali-mi-yoksa-onu-kucaklamali-mi" },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="group flex items-baseline justify-between py-4 border-b border-border">
                <span className="text-foreground font-medium group-hover:text-foreground-secondary transition-colors pr-4">{link.title}</span>
                <span className="text-sm text-foreground-muted shrink-0">Oku →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
