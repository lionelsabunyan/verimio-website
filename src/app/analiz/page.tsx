import type { Metadata } from "next";
import MultiStepForm from "@/components/form/MultiStepForm";
import Benefits from "@/components/sections/Benefits";

export const metadata: Metadata = {
  title: "Şirket Check-Up'ı | Verimio",
  description:
    "Şirketinizin operasyonel verimliliğini ve AI hazırlığını analiz ediyoruz. Formu doldurun, size özel raporunuz e-postanıza iletilsin.",
};

export default function AnalizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/4 dark:from-primary/20 dark:via-background dark:to-secondary/8 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-10 pb-20">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-accent bg-secondary/8 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-medium text-foreground-secondary tracking-wide">
              Ücretsiz
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Şirket{" "}
            <span className="gradient-text">Check-Up&apos;ı</span>
          </h1>
          <p className="text-foreground-secondary text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Şirketinizi tanıyoruz, eksiklerinizi analiz ediyoruz. Size özel otomasyon
            fırsatlarını, tasarruf potansiyelini ve 90 günlük yol haritasını içeren
            raporunuzu alın.
          </p>
        </div>

        {/* Form */}
        <MultiStepForm />
      </div>

      {/* Benefits — what's in the report */}
      <Benefits />
    </div>
  );
}
