"use client";

import { CheckCircle2 } from "lucide-react";
import { BENEFITS, BRAND } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Benefits() {
  return (
    <section className="section-padding bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <FadeIn direction="left">
            <SectionLabel className="mb-4">Check-Up Raporunuzda</SectionLabel>

            <h2 className="text-3xl sm:text-4xl font-bold mb-5">
              Raporunuzda Neler{" "}
              <span className="gradient-text">Bulacaksınız?</span>
            </h2>
            <p className="text-lg text-foreground-secondary mb-8 leading-relaxed">
              Check-up raporunuz genel öneriler değil, firmanıza özel somut
              aksiyon planı ve 90 günlük yol haritası içerir.
            </p>

            <Button href={BRAND.tallyFormUrl} size="lg">
              Ücretsiz Check-Up Başlatın
            </Button>
          </FadeIn>

          {/* Right — Checklist */}
          <StaggerContainer className="space-y-3" staggerDelay={0.07}>
            {BENEFITS.map((benefit, index) => (
              <StaggerItem key={index}>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-border-accent hover:shadow-sm transition-all duration-200 group">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-200" />
                  <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-200">
                    {benefit}
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
