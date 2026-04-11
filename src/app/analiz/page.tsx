import type { Metadata } from "next";
import MultiStepForm from "@/components/form/MultiStepForm";
import { REPORT_SECTIONS } from "@/lib/constants";

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
            Birkaç soru, birkaç dakika. Şirketinize özel AI hazırlık raporu
            — somut fırsatlar, öncelikli aksiyonlar ve uygulama yol haritası —
            doğrudan e-postanıza gelsin.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <MultiStepForm />
        </div>
      </section>

      {/* What's in the report */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Raporunuzda neler var
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-12 max-w-xl">
            Formu doldurun, e-postanıza gelsin.
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
    </main>
  );
}
