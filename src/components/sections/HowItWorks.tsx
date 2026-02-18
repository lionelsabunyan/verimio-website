"use client";

import { ClipboardList, Bot, FileText } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const stepIcons = [ClipboardList, Bot, FileText];

const steps = [
  {
    step: "01",
    icon: 0,
    title: "Form Doldur",
    description:
      "3 dakikada iş süreçleriniz hakkında sorular yanıtlayın. Sektörünüze özel sorularla firmanızı tanıyalım.",
  },
  {
    step: "02",
    icon: 1,
    title: "AI Analiz Yapsın",
    description:
      "Yapay zeka cevaplarınızı analiz edip firmanıza özel otomasyon fırsatlarını ve ROI hesaplarını çıkarır.",
  },
  {
    step: "03",
    icon: 2,
    title: "Raporu Al",
    description:
      "1-2 dakika içinde e-postanıza detaylı PDF rapor gelir. Öncelik matrisi, araç önerileri ve 90 günlük yol haritası dahil.",
  },
];

export default function HowItWorks() {
  return (
    <section id="nasil-calisir" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-2 h-2 rounded-full bg-primary-light/30" />
            <span className="text-sm font-medium text-muted ml-1">Nasıl Çalışır?</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            3 Adımda{" "}
            <span className="gradient-text">AI Dönüşümü</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mb-16">
            Karmaşık danışmanlık süreçlerini unutun. Sadece 3 dakikada firmanızın
            AI potansiyelini keşfedin.
          </p>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
          staggerDelay={0.15}
        >
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-gradient-to-r from-foreground/5 via-primary/20 to-foreground/5 z-0" />

          {steps.map((step, index) => {
            const Icon = stepIcons[step.icon];
            return (
              <StaggerItem key={index}>
                <div className="relative z-10 flex flex-col h-full p-7 rounded-2xl border border-foreground/6 bg-white hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                  {/* Icon circle */}
                  <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Step number */}
                  <div className="text-5xl font-bold text-foreground/5 absolute top-5 right-6 select-none group-hover:text-primary/8 transition-colors duration-300">
                    {step.step}
                  </div>

                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed flex-1">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
