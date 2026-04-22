import CTA from "@/components/sections/CTA";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Hakkımızda - Yanınızda çalışan AI danışmanlık ekibi",
  description:
    "Dışarıda bir ofis değil, yanınıza gelen bir ekibiz. Kendi işimizi yapay zekayla yürüttüğümüz için asıl zamanımızı sizinle geçirebiliyoruz.",
  openGraph: {
    title: "Hakkımızda - Yanınızda çalışan AI danışmanlık ekibi",
    description:
      "Dışarıda bir ofis değil, yanınıza gelen bir ekibiz. Kendi işimizi yapay zekayla yürüttüğümüz için asıl zamanımızı sizinle geçirebiliyoruz.",
    type: "website",
    url: "https://www.verimio.com.tr/hakkimizda",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımızda - Yanınızda çalışan AI danışmanlık ekibi",
    description:
      "Ofisinize gelen, birlikte kuran, her hafta aynı masada olan bir ekibiz.",
  },
  alternates: { canonical: "https://www.verimio.com.tr/hakkimizda" },
};

const principles = [
  {
    title: "Sadece rapor değil",
    description:
      "Rapor teslim edip çekilmiyoruz. Strateji çiziyor, birlikte uyguluyor, sonuçları ölçüyoruz.",
  },
  {
    title: "Şablona değil, size özel",
    description:
      "Her şirketin işi farklı. Hazır reçete yerine sizi tanıyıp size özel bir yol çiziyoruz.",
  },
  {
    title: "Ölçülebilir sonuç",
    description:
      "Vaat değil, rakam. Tasarruf, yatırım getirisi, öncelik — hepsi sayıyla ölçülü.",
  },
  {
    title: "Küçük ekip, hızlı iş",
    description:
      "Yapay zekayla çalışıyoruz — kendimiz de. Az kişiyle çok iş çıkarıyoruz. Size de aynı yöntemi öğretiyoruz.",
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
            Yanınıza geliriz. Çünkü yerimiz olduğunu biliyoruz.
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
            Kendi işimizi yapay zekayla yürütüyoruz — raporları, tasarımları, akışları.
            Bu yüzden asıl zamanımızı sizinle geçirmeye ayırabiliyoruz. Ofisinize gelir,
            ekibinize karışır, birlikte kurarız. Sonra da kalırız.
          </p>
        </div>
      </section>

      {/* Piyasa gerçeği ↔ Size ne anlatır */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
                Piyasa gerçeği
              </p>
              <h2 className="text-2xl font-bold mb-4">
                Çoğu AI danışmanı slayt satıyor.
              </h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                AI dönüşümünden bahseden çoğu firma bunu kendi işinde uygulamamış.
                Önce size deniyor, sizinkinde öğreniyor. Biz tersini yaptık.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                AI&apos;ın neyi gerçekten çözdüğünü kendi işimizde gördük.
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
                Bu size ne anlatır
              </p>
              <h2 className="text-2xl font-bold mb-4">
                Kendi işini hızlandıramamış bir danışman, sizinkini zor hızlandırır.
              </h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Her projede araç farklı. Disiplin aynı. Kendi işimizi AI&apos;la yürüttüğümüz için neyin işe yaradığını, neyin zor olduğunu birinci ağızdan biliyoruz.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                Sözle değil, sayıyla. Her öneri bir yatırım getirisi hesabına dayanıyor.
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
            Neyi farklı yapıyoruz
          </h2>

          <div className="space-y-0">
            {principles.map((item, index) => (
              <div
                key={index}
                className="border-t border-border py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8"
              >
                <div className="md:col-span-1">
                  <span className="text-sm text-foreground-muted tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-foreground-secondary leading-relaxed">
                    {item.description}
                  </p>
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
