"use client";

import { ABOUT_CONTENT } from "@/lib/constants";
import { FadeIn } from "@/components/ui/motion";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

export default function About() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionLabel className="mb-8">{ABOUT_CONTENT.label}</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-snug max-w-4xl text-foreground/85">
            {ABOUT_CONTENT.text}
          </p>
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
    </section>
  );
}
