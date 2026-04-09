import type { Metadata } from "next";
import MultiStepForm from "@/components/form/MultiStepForm";
import { BENEFITS } from "@/lib/constants";

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
      <div className="max-w-2xl mx-auto px-6 py-10 pb-20">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Ücretsiz
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Şirket Check-Up&apos;ı
          </h1>
          <p className="text-foreground-secondary leading-relaxed">
            Şirketinizi tanıyoruz, eksiklerinizi analiz ediyoruz. Size özel otomasyon
            fırsatlarını, tasarruf potansiyelini ve 90 günlük yol haritasını içeren
            raporunuzu alın.
          </p>
        </div>

        {/* Form */}
        <MultiStepForm />
      </div>

      {/* Benefits */}
      <section className="py-24 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
            Raporunuzda neler var
          </p>
          <ul className="space-y-3 mt-6">
            {BENEFITS.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-foreground-secondary">
                <span className="w-1 h-1 rounded-full bg-foreground-muted mt-2.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
