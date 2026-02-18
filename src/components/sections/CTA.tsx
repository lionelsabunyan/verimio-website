"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTA_CONTENT, BRAND } from "@/lib/constants";
import { FadeIn } from "@/components/ui/motion";

export default function CTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />

      {/* Decorative circles */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-light/5" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-secondary/5" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        {/* Label */}
        <FadeIn>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
            <div className="w-2.5 h-2.5 rounded-full bg-secondary/30" />
            <span className="text-sm font-medium text-cream/60 ml-1">
              {CTA_CONTENT.label}
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {CTA_CONTENT.headline}
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg text-cream/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            {CTA_CONTENT.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={BRAND.tallyFormUrl}
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary/90 transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25"
            >
              {CTA_CONTENT.ctaPrimary}
              <ArrowUpRight className="w-5 h-5" />
            </Link>
            <Link
              href="/hizmetler"
              className="inline-flex items-center gap-2 px-8 py-4 border border-cream/20 text-cream font-medium rounded-full hover:border-secondary hover:text-secondary transition-all duration-200"
            >
              {CTA_CONTENT.ctaSecondary}
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-8 text-sm text-cream/40">
            ⏱️ Sadece 3 dakika • 💳 Kredi kartı yok • 📞 Satış araması yok
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
