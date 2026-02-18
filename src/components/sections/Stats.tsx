"use client";

import { STATS } from "@/lib/constants";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function Stats() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.1}>
          {STATS.map((stat, index) => (
            <StaggerItem key={index}>
              <div className="relative p-6 rounded-2xl bg-dark text-white overflow-hidden group">
                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl font-bold text-secondary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-cream/60">{stat.label}</div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
