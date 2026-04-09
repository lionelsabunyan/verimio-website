import CTA from "@/components/sections/CTA";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Hakkımızda - Kurumsal AI Danışmanlığı",
  description:
    "Verimio, şirketlerin iş süreçlerini analiz eden, darboğazları tespit eden ve kurumsal AI dönüşümünde rehberlik eden bir danışmanlık firmasıdır.",
  openGraph: {
    title: "Hakkımızda - Kurumsal AI Danışmanlığı",
    description: "Şirketlerin iş süreçlerini analiz eden, darboğazları tespit eden ve kurumsal AI dönüşümünde rehberlik eden danışmanlık firması.",
    type: "website",
    url: "https://www.verimio.com.tr/hakkimizda",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımızda - Kurumsal AI Danışmanlığı",
    description: "Şirketlerin iş süreçlerini analiz eden, darboğazları tespit eden ve kurumsal AI dönüşümünde rehberlik eden danışmanlık firması.",
  },
  alternates: { canonical: "https://www.verimio.com.tr/hakkimizda" },
};

const differentiators = [
  {
    title: "Sadece rapor değil",
    description:
      "Analiz teslim edip çekilmiyoruz. Danışmanlık ve koçluk bizde aynı sürecin parçası — stratejiyi çizer, birlikte uygular, sonuçları ölçeriz.",
  },
  {
    title: "Şablona değil, size özel",
    description:
      "Her firmanın operasyonu farklıdır. Hazır reçete yerine, iş süreçlerinizi bizzat inceleyerek size özgü bir strateji ve yol haritası oluşturuyoruz.",
  },
  {
    title: "Ölçülebilir sonuç",
    description:
      "Soyut öneriler değil, somut rakamlar. Tasarruf potansiyelini, ROI'yi ve aksiyon önceliklerini sayısal olarak ortaya koyuyoruz.",
  },
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
            Şirketinizin içindeymiş gibi düşünen danışman ve koçunuz.
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
            AI ve otomasyon dönüşümünü yüzeysel değil, derinlemesine yönetiyoruz.
            İş süreçlerinizi analiz eder, darboğazları tespit eder ve size özel
            çözümlerle hem zamanınızı hem bütçenizi koruruz.
          </p>
        </div>
      </section>

      {/* Problem → Yaklaşım */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
                Sorun
              </p>
              <h2 className="text-2xl font-bold mb-4">Neden çoğu AI geçişi başarısız olur?</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Şirketler AI, otomasyon ya da agent teknolojilerini duymak istiyor — ama ne istediklerini tam olarak bilmiyor. Bu belirsizlik içinde gerçekleştirilen geçişler çoğunlukla yanlış araç seçimiyle, eksik analizle ve somut bir getiri olmadan sonuçlanıyor.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                Sonuç: hem zaman kaybı hem bütçe israfı.
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
                Yaklaşım
              </p>
              <h2 className="text-2xl font-bold mb-4">Bizim yaklaşımımız</h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Biz bir satış kanalı değil, danışmanlık firmasıyız. Firmanızın operasyonunu gerçekten anlamak için doğru soruları soruyor, süreçlerinizi inceliyor ve somut bulgular üzerine bir strateji kuruyoruz.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                Her önerimiz ölçülebilir bir ROI hesabına dayanıyor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Farklar — liste formatı */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Fark
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 max-w-2xl">
            Bizi farklı kılan üç temel ilke
          </h2>

          <div className="space-y-0">
            {differentiators.map((item, index) => (
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

      <CTA />
    </main>
  );
}
