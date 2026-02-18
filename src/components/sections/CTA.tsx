"use client";

import { CTA_CONTENT, BRAND } from "@/lib/constants";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import { RadialGlow } from "@/components/brand/Decoratives";

function FadeUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

export default function CTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 via-primary/5 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-secondary/40 to-transparent" />
      <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

      {/* Decorative glows */}
      <RadialGlow color="lime" size={300} opacity={0.08} className="top-10 right-10" />
      <RadialGlow color="purple" size={250} opacity={0.06} className="bottom-10 left-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/20 bg-secondary/5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-medium text-secondary tracking-wide">
              {CTA_CONTENT.label}
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {CTA_CONTENT.headline}
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {CTA_CONTENT.description}
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href={BRAND.tallyFormUrl} size="lg">
              {CTA_CONTENT.ctaPrimary}
            </Button>
            <Button
              href="/hizmetler"
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:border-secondary hover:text-secondary hover:bg-transparent"
            >
              {CTA_CONTENT.ctaSecondary}
            </Button>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
