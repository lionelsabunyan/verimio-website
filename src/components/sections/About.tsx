"use client";

import { ABOUT_CONTENT } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

const stats = [
  { value: "%60+", label: "Otomasyon potansiyeli" },
  { value: "90 gün", label: "Net yol haritası" },
  { value: "5 alan", label: "Danışmanlık kapsamı" },
];

export default function About() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionLabel className="mb-8">{ABOUT_CONTENT.label}</SectionLabel>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Sol: Ana metin + butonlar */}
          <div>
            <FadeIn delay={0.1}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-foreground/85">
                {ABOUT_CONTENT.text}
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <Button href="/hakkimizda" variant="primary" size="md">
                  {ABOUT_CONTENT.ctaPrimary}
                </Button>
                <Button href="#nasil-calisir" variant="ghost" size="md" icon={false}>
                  {ABOUT_CONTENT.ctaSecondary} →
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Sağ: Mini stat blokları */}
          <StaggerContainer className="grid grid-cols-1 gap-4 lg:pt-2" staggerDelay={0.12}>
            {stats.map((stat, i) => (
              <StaggerItem key={i}>
                <div className="flex items-center gap-6 p-6 rounded-2xl border border-border bg-surface hover:border-border-accent transition-colors duration-300 group">
                  <span className="text-3xl font-bold text-primary dark:text-primary-light group-hover:text-secondary transition-colors duration-300 shrink-0 tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-sm text-foreground-secondary leading-snug">
                    {stat.label}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
