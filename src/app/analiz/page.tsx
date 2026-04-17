import type { Metadata } from "next";
import MultiStepForm from "@/components/form/MultiStepForm";
import { BRAND, HOW_IT_WORKS, REPORT_SECTIONS } from "@/lib/constants";
import ProductSchema from "@/components/seo/ProductSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";

const ANALIZ_FAQ = [
  {
    question: "Şirket Check-Up gerçekten ücretsiz mi?",
    answer:
      "Evet, Şirket Check-Up tamamen ücretsizdir ve herhangi bir satış koşulu içermez. Amaç, şirketinizin AI ve otomasyon hazırlığını nesnel olarak değerlendirmek ve size özel bir yol haritası sunmaktır.",
  },
  {
    question: "Raporumu ne kadar sürede alırım?",
    answer:
      "Formu tamamladıktan sonra kişiselleştirilmiş raporunuzu genellikle 24 saat içinde e-postanıza iletiyoruz. Detaylı sektörel analizler için bu süre 48 saate kadar uzayabilir.",
  },
  {
    question: "Raporda tam olarak neler yer alıyor?",
    answer:
      "Operasyonel verimlilik değerlendirmesi, sektörünüze özel otomasyon fırsatları, tahmini ROI hesaplamaları, öncelikli 3-5 aksiyon önerisi ve 90 günlük uygulama yol haritası yer alır.",
  },
  {
    question: "Şirketim KOBİ. Bu hizmet bana uygun mu?",
    answer:
      "Evet. Check-Up hem KOBİ'lere hem de kurumsal yapılara uygundur. Öneriler şirket büyüklüğünüze, sektörünüze ve mevcut operasyonel olgunluğunuza göre özelleştirilir.",
  },
  {
    question: "Rapordan sonra iletişime devam etmek zorunda mıyım?",
    answer:
      "Kesinlikle hayır. Rapor sizindir, istediğiniz gibi kullanırsınız. Devam etmek isteyen şirketlerle bir tanışma görüşmesi yapıyoruz; bu tamamen size bağlıdır.",
  },
];

export const metadata: Metadata = {
  title: "Şirket Check-Up'ı - Ücretsiz AI Hazırlık Analizi",
  description:
    "Şirketinizin operasyonel verimliliğini ve AI hazırlığını analiz ediyoruz. Formu doldurun, size özel raporunuz e-postanıza iletilsin.",
  openGraph: {
    title: "Şirket Check-Up'ı - Ücretsiz AI Hazırlık Analizi",
    description: "Şirketinizin operasyonel verimliliğini ve AI hazırlığını analiz ediyoruz.",
    type: "website",
    url: "https://www.verimio.com.tr/analiz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Şirket Check-Up'ı - Ücretsiz AI Hazırlık Analizi",
    description: "Şirketinizin operasyonel verimliliğini ve AI hazırlığını analiz ediyoruz.",
  },
  alternates: { canonical: "https://www.verimio.com.tr/analiz" },
};

export default function AnalizPage() {
  return (
    <main className="pt-24">
      <ProductSchema
        name="Şirket Check-Up — Ücretsiz AI Hazırlık Analizi"
        description="Şirketinizin operasyonel verimliliğini ve AI hazırlığını analiz eden, 90 günlük uygulama yol haritası içeren ücretsiz kurumsal değerlendirme."
        url="https://www.verimio.com.tr/analiz"
      />
      <BreadcrumbSchema
        items={[
          { name: "Ana Sayfa", url: "https://www.verimio.com.tr" },
          { name: "Analiz", url: "https://www.verimio.com.tr/analiz" },
        ]}
      />
      <FAQSchema items={ANALIZ_FAQ} />

      {/* Hero */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Ücretsiz analiz
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Şirket Check-Up&apos;ı
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
            Birkaç soru, birkaç dakika. Şirketinize özel bir rapor — nereden başlayın,
            nerede ne kazanırsınız — e-postanıza gelir.
          </p>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="pb-24 md:pb-32 scroll-mt-28">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <MultiStepForm />
        </div>
      </section>

      {/* What's in the report */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Raporda neler var
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-12 max-w-xl">
            Şirketinize özel, dört bölüm.
          </h2>
          <div className="space-y-0">
            {REPORT_SECTIONS.map((section, index) => (
              <div key={index} className="border-t border-border py-8 grid grid-cols-1 md:grid-cols-[2rem_1fr] gap-x-6 gap-y-1">
                <span className="text-xs tabular-nums text-foreground-muted pt-1 hidden md:block">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold mb-1">{section.title}</h3>
                  <p className="text-foreground-secondary leading-relaxed max-w-lg">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* Sonraki Adım — 5 adımlı süreç */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Sonraki adım
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 max-w-2xl">
            Rapor geldikten sonra
          </h2>
          <p className="text-foreground-secondary leading-relaxed mb-16 max-w-2xl">
            Rapor bitmiyor. Beş adımlı bir akışımız var — fiyatı sakladık ama süreci
            değil. İsterseniz doğrudan 30 dakikalık görüşmeye gelin.
          </p>

          <div className="space-y-12 mb-16">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-1">
                  <span aria-hidden="true" className="text-4xl font-bold text-[#8F8F8F]">{item.step}</span>
                </div>
                <div className="md:col-span-8">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-foreground-secondary leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-border">
            <a
              href={BRAND.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 bg-foreground text-background font-medium rounded-none hover:opacity-90 transition-opacity text-sm"
            >
              30 Dakikalık Görüşme Planla
            </a>
            <a
              href="#form"
              className="inline-flex items-center text-sm text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
            >
              Raporu önce alayım
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
