"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { HOW_IT_WORKS } from "@/lib/constants";
import DiscoveryIcon from "@/components/brand/icons/process/DiscoveryIcon";
import AnalysisIcon from "@/components/brand/icons/process/AnalysisIcon";
import ExecutionIcon from "@/components/brand/icons/process/ExecutionIcon";

const stepIcons = [DiscoveryIcon, AnalysisIcon, ExecutionIcon];

export default function HowItWorks() {
  return (
    <section id="nasil-calisir" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionLabel className="mb-4">Nasıl Çalışır?</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Danışmanlık Sürecimiz</span>
          </h2>
          <p className="text-lg text-foreground-secondary max-w-2xl mb-16">
            Firmanıza özgü bir süreçle, doğru adımları birlikte atıyoruz.
          </p>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
          staggerDelay={0.15}
        >
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-gradient-to-r from-border via-border-accent to-border z-0" />

          {HOW_IT_WORKS.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <StaggerItem key={index}>
                <div className="relative z-10 flex flex-col h-full p-7 rounded-2xl border border-border bg-surface hover:border-border-accent hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group" style={{boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)"}}>
                  {/* Icon circle */}
                  <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5 text-primary-light group-hover:text-white transition-colors duration-300" size={20} />
                  </div>

                  {/* Step number */}
                  <div className="text-5xl font-bold text-foreground/8 dark:text-foreground/10 absolute top-5 right-6 select-none group-hover:text-primary/10 transition-colors duration-300">
                    {step.step}
                  </div>

                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed flex-1">
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
