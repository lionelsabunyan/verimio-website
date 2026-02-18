"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EXPERTISE_ITEMS } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function Expertise() {
  return (
    <section className="bg-dark text-white section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <FadeIn>
            <div>
              {/* Label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <div className="w-2.5 h-2.5 rounded-full bg-secondary/30" />
                <span className="text-sm font-medium text-cream/60 ml-1">
                  Uzmanlık Alanlarımız
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                İşletmenizi bir üst
                <br />
                seviyeye taşıyoruz
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="right">
            <div className="flex items-end h-full">
              <div>
                <p className="text-cream/60 mb-6 max-w-md">
                  AI dönüşümünde uzmanız. Her alanda somut çözümler ve
                  gerçekçi ROI hesaplarıyla firmanızı geleceğe hazırlıyoruz.
                </p>
                <Link
                  href="/hizmetler"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-cream/20 text-cream font-medium text-sm rounded-full hover:border-secondary hover:text-secondary transition-all duration-200"
                >
                  Tüm Hizmetleri Gör
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Large Service List */}
        <StaggerContainer className="space-y-0" staggerDelay={0.1}>
          {EXPERTISE_ITEMS.map((item, index) => (
            <StaggerItem key={index}>
              <div className="border-t border-cream/10 py-8 group cursor-default">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream/20 group-hover:text-secondary transition-colors duration-500">
                    {item}
                  </h3>
                  <ArrowUpRight className="w-6 h-6 text-cream/20 group-hover:text-secondary transition-colors duration-500" />
                </div>
              </div>
            </StaggerItem>
          ))}
          {/* Last border */}
          <div className="border-t border-cream/10" />
        </StaggerContainer>
      </div>
    </section>
  );
}
