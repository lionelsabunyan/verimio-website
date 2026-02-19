"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EXPERTISE_ITEMS } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { RadialGlow } from "@/components/brand/Decoratives";

export default function Expertise() {
  return (
    <section className="relative bg-dark text-white section-padding overflow-hidden">
      {/* Decorative glow */}
      <RadialGlow color="lime" size={350} opacity={0.08} className="top-10 -right-20" />
      <RadialGlow color="purple" size={300} opacity={0.06} className="bottom-10 -left-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <FadeIn>
            <div>
              <SectionLabel variant="light" className="mb-4">
                Uzmanlık Alanlarımız
              </SectionLabel>

              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Şirketinizi bir üst
                <br />
                seviyeye taşıyoruz
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="right">
            <div className="flex items-end h-full">
              <div>
                <p className="text-white/60 mb-6 max-w-md">
                  İş süreçlerinizi bugünün teknolojisiyle yeniden tasarlıyor,
                  ölçülebilir sonuçlar üretiyoruz.
                </p>
                <Link
                  href="/hizmetler"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium text-sm rounded-full hover:border-secondary hover:text-secondary transition-all duration-200"
                >
                  Tüm Hizmetleri Gör
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Service List */}
        <StaggerContainer className="space-y-0" staggerDelay={0.1}>
          {EXPERTISE_ITEMS.map((item, index) => (
            <StaggerItem key={index}>
              <Link
                href="/hizmetler"
                className="border-t border-white/10 py-8 group flex flex-col md:flex-row md:items-start gap-4 md:gap-0"
              >
                {/* Left: Number + Title */}
                <div className="flex items-baseline gap-4 md:w-1/2">
                  <span className="text-sm font-mono text-white/30 tabular-nums shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/40 group-hover:text-secondary transition-colors duration-500">
                    {item.title}
                  </h3>
                </div>

                {/* Right: Description + Arrow */}
                <div className="flex items-start gap-4 md:w-1/2 md:pl-8">
                  <p className="text-base text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-500">
                    {item.description}
                  </p>
                  <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-secondary transition-colors duration-500 shrink-0 mt-1" />
                </div>
              </Link>
            </StaggerItem>
          ))}
          {/* Last border */}
          <div className="border-t border-white/10" />
        </StaggerContainer>
      </div>
    </section>
  );
}
