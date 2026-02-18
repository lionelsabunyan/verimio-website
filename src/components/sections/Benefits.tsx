"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { BENEFITS, BRAND } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function Benefits() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <FadeIn direction="left">
            <div>
              {/* Label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary-light/30" />
                <span className="text-sm font-medium text-muted ml-1">
                  Raporunuzda Ne Var?
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Raporunuzda Neler{" "}
                <span className="gradient-text">Bulacaksınız?</span>
              </h2>
              <p className="text-lg text-muted mb-8">
                AI analiziniz sadece genel öneriler değil, firmanıza özel somut
                aksiyon planı içerir.
              </p>

              <Link
                href={BRAND.tallyFormUrl}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-primary font-semibold text-sm rounded-full hover:bg-secondary/90 transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25"
              >
                Ücretsiz Analiz Başlat
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>

          {/* Right - Checklist */}
          <StaggerContainer className="space-y-4" staggerDelay={0.08}>
            {BENEFITS.map((benefit, index) => (
              <StaggerItem key={index}>
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-background transition-colors duration-200">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium pt-1">
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
