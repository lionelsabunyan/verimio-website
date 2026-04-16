import CTA from "@/components/sections/CTA";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Hakkımızda - Yapay zekayla çalışan bir danışmanlık ekibi",
  description:
    "Verimio, yapay zekayla çalışan bir kurumsal danışmanlık ekibidir. Müşterilerine önerdiği dönüşümü kendi operasyonunda da uyguluyor.",
  openGraph: {
    title: "Hakkımızda - Yapay zekayla çalışan bir danışmanlık ekibi",
    description: "Operasyonunu bizzat AI ile dönüştürmüş bir danışmanlık ekibi. AI-native yöntem, şeffaf süreç, ölçülebilir sonuç.",
    type: "website",
    url: "https://www.verimio.com.tr/hakkimizda",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımızda - Yapay zekayla çalışan bir danışmanlık ekibi",
    description: "Operasyonunu bizzat AI ile dönüştürmüş bir danışmanlık ekibi.",
  },
  alternates: { canonical: "https://www.verimio.com.tr/hakkimizda" },
};

const principles = [
  {
    title: "Sadece rapor değil, uygulamaya kadar",
    description:
      "Analiz teslim edip çekilmiyoruz. Danışmanlık ve koçluk bizde aynı sürecin parçası — stratejiyi çizer, birlikte uygular, sonuçları ölçeriz.",
  },
  {
    title: "Şablona değil, size özel",
    description:
      "Her firmanın operasyonu farklıdır. Hazır reçete yerine iş süreçlerinizi bizzat inceleyerek size özgü bir strateji ve yol haritası oluşturuyoruz.",
  },
  {
    title: "Ölçülebilir sonuç",
    description:
      "Soyut öneriler değil, somut rakamlar. Tasarruf potansiyelini, ROI'yi ve aksiyon önceliklerini sayısal olarak ortaya koyuyoruz.",
  },
  {
    title: "Operasyon şeffaflığı",
    description:
      "Ekibimizin büyük bölümü AI-asistanlı pipeline'lardan oluşuyor. Bunu saklamıyoruz — tam tersi, kanıtımız. Çalışma biçimimiz, size sunduğumuz dönüşümün kendisidir.",
  },
];

const operations = [
  "45+ blog yazısı, büyük bölümü AI-asistanlı içerik pipeline'ı ile hazırlandı",
  "Görsel üretim fal.ai üzerinden, içerik akışı Claude API ile entegre",
  "Command Center üzerinde skill-tabanlı iş akışı: planlama, yazım, görsel, yayın",
  "Bu site Next.js 16 + Tailwind v4 ile sıfırdan inşa edildi",
];

export default function HakkimizdaPage() {
  return (
    <main className="pt-24">
      <BreadcrumbSchema
        items={[
          { name: "Ana Sayfa", url: "https://www.verimio.com.tr" },
          { name: "Hakkımızda", url: "https://www.verimio.com.tr/hakkimizda" },
        ]}
      />

      {/* Hero */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Hakkımızda
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Yapay zekayla çalışan bir ekip, yapay zeka dönüşümünü anlatır.
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
            Verimio bir satış kanalı değil, operasyonunu bizzat AI ile dönüştürmüş bir
            danışmanlık ekibidir. Müşterilerimize önerdiğimizi kendi operasyonumuzda
            da uyguladık — ve hâlâ uyguluyoruz.
          </p>
        </div>
      </section>

      {/* Piyasa Gerçekliği → Ne Anlatır */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
                Piyasa gerçekliği
              </p>
              <h2 className="text-2xl font-bold mb-4">Çoğu AI danışmanlığı slayt satıyor.</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                AI dönüşümünü konuşan çoğu firma, bunu kendi operasyonunda uygulamamış.
                Yöntemi müşterisinde deniyor. Biz tersini yaptık: içerik üretimimizin
                büyük bölümü otomatik pipeline'larla hazırlanıyor, görsel üretimimiz
                AI ile yürüyor, iş akışlarımız AI-asistanlı.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                Önerdiğimiz dönüşümü kendi üzerimizde kanıtladık.
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
                Bu size ne anlatır
              </p>
              <h2 className="text-2xl font-bold mb-4">Operasyonunu otomatize edememiş bir danışmanlık, sizinkini edemez.</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Bir danışmanlık firmasının kendi süreçlerini AI ile verimli hale getirmemiş
                olması, müşterisine bunu yapabilmesini zorlaştırır. Biz yöntemi kendi üzerimizde
                doğruladık. Öneriler slayt değil, çalışmış pratikler.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                Her önerimiz, somut bir ROI hesabına dayanıyor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dört İlke */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            İlkeler
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 max-w-2xl">
            Bizi farklı kılan dört ilke
          </h2>

          <div className="space-y-0">
            {principles.map((item, index) => (
              <div key={index} className="border-t border-border py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-1">
                  <span className="text-sm text-foreground-muted tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-foreground-secondary leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* Operasyonumuz — Şeffaflık bloğu */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Operasyonumuz
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 max-w-2xl">
            Kendi ilacımızı kendimiz içtik.
          </h2>
          <p className="text-foreground-secondary leading-relaxed mb-12 max-w-2xl">
            Müşterilerimize anlattığımız AI-asistanlı çalışma biçimini kendi operasyonumuzda
            canlı tutuyoruz. Aşağıdaki dört kalem, şu an nasıl çalıştığımızın özeti:
          </p>

          <div className="space-y-0">
            {operations.map((item, index) => (
              <div key={index} className="border-t border-border py-6 grid grid-cols-[2rem_1fr] gap-4 md:gap-8">
                <span className="text-xs text-foreground-muted tabular-nums pt-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-foreground-secondary leading-relaxed">{item}</p>
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
