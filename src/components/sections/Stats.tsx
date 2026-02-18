"use client";

import { STATS } from "@/lib/constants";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { motion } from "framer-motion";

export default function Stats() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.1}>
          {STATS.map((stat, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative p-6 rounded-2xl bg-dark text-white overflow-hidden group cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-light/15 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl font-bold text-secondary mb-1.5 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs text-cream/50 leading-snug">{stat.label}</div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
