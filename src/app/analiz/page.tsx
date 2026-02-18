import type { Metadata } from "next";
import MultiStepForm from "@/components/form/MultiStepForm";

export const metadata: Metadata = {
  title: "Ücretsiz AI Analizi | Verimio",
  description:
    "3 dakikada şirketinizin AI potansiyelini keşfedin. Kişiselleştirilmiş rapor anında e-postanızda.",
};

export default function AnalizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/4 via-background to-secondary/3 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-10 pb-20">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/30 bg-secondary/8 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-medium text-primary/70 tracking-wide">
              Tamamen Ücretsiz · 3 Dakika
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            AI Hazırlık{" "}
            <span className="gradient-text">Testiniz</span>
          </h1>
          <p className="text-muted text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Şirketinize özel otomasyon fırsatlarını, tasarruf potansiyelini ve
            90 günlük yol haritasını içeren raporunuzu alın.
          </p>
        </div>

        {/* Form */}
        <MultiStepForm />
      </div>
    </div>
  );
}
