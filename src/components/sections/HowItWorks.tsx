"use client";

import { HOW_IT_WORKS } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function HowItWorks() {
  return (
    <section id="nasil-calisir" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <FadeIn>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary-light/30" />
            <span className="text-sm font-medium text-muted ml-1">
              Nasıl Çalışır?
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            3 Adımda{" "}
            <span className="gradient-text">AI Dönüşümü</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mb-12">
            Karmaşık danışmanlık süreçlerini unutun. Sadece 3 dakikada firmanızın
            AI potansiyelini keşfedin.
          </p>
        </FadeIn>

        {/* Steps */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {HOW_IT_WORKS.map((step, index) => (
            <StaggerItem key={index}>
              <div className="relative p-8 rounded-2xl border border-foreground/5 hover:border-primary-light/20 transition-all duration-300 group bg-white h-full">
                {/* Step Number */}
                <div className="text-6xl font-bold text-foreground/5 absolute top-4 right-6">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="text-4xl mb-6">{step.icon}</div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted leading-relaxed">{step.description}</p>

                {/* Connecting line (not on last item) */}
                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-foreground/10" />
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
