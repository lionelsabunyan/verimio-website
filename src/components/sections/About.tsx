"use client";

import { ABOUT_CONTENT } from "@/lib/constants";
import { FadeIn } from "@/components/ui/motion";
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
        {/* Stat strip — horizontal, bold, minimal */}
        <FadeIn>
          <div className="grid grid-cols-3 gap-6 mb-16 pb-12 border-b border-border text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-light tabular-nums mb-1">
                  {stat.value}
                </span>
                <span className="text-sm text-foreground-secondary">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <FadeIn>
              <SectionLabel className="mb-6">{ABOUT_CONTENT.label}</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-foreground/85 mb-8">
                {ABOUT_CONTENT.text}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap items-center gap-4">
                <Button href="/hakkimizda" variant="primary" size="md">
                  {ABOUT_CONTENT.ctaPrimary}
                </Button>
                <Button href="#nasil-calisir" variant="ghost" size="md" icon={false}>
                  {ABOUT_CONTENT.ctaSecondary} →
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Right — accent quote */}
          <div className="lg:col-span-5 flex items-center">
            <FadeIn delay={0.15} direction="right">
              <blockquote className="border-l-2 border-primary-light/30 pl-6">
                <p className="text-lg text-foreground-secondary italic leading-relaxed">
                  &ldquo;Doğru analiz olmadan yapılan her otomasyon yatırımı, çözümden çok yeni sorunlar üretir.&rdquo;
                </p>
                <footer className="mt-4 text-sm font-medium text-foreground-muted">
                  — Verimio Yaklaşımı
                </footer>
              </blockquote>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
