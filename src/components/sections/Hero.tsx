"use client";

import { motion } from "framer-motion";
import { HERO_CONTENT, BRAND } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { RadialGlow } from "@/components/brand/Decoratives";
import TimeIcon from "@/components/brand/icons/ui/TimeIcon";
import ROIIcon from "@/components/brand/icons/ui/ROIIcon";
import RoadmapIcon from "@/components/brand/icons/ui/RoadmapIcon";
import HeroIllustration from "@/components/brand/illustrations/HeroIllustration";

const cardIcons = [TimeIcon, ROIIcon, RoadmapIcon];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background decoratives */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 pointer-events-none" />
      <RadialGlow color="lime" size={500} opacity={0.06} className="top-20 -right-40" />
      <RadialGlow color="purple" size={400} opacity={0.05} className="-bottom-20 -left-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-accent bg-primary/5 dark:bg-primary-light/5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-medium text-primary/80 dark:text-primary-light/80 tracking-wide">
                {HERO_CONTENT.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
            >
              {HERO_CONTENT.headline}
              <br />
              <span className="gradient-text">
                {HERO_CONTENT.headlineHighlight}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg text-foreground-secondary max-w-lg leading-relaxed"
            >
              {HERO_CONTENT.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button href={BRAND.tallyFormUrl} size="lg">
                {HERO_CONTENT.ctaPrimary}
              </Button>
              <Button href="#nasil-calisir" variant="outline" size="lg" icon={false}>
                {HERO_CONTENT.ctaSecondary}
              </Button>
            </motion.div>
          </div>

          {/* Right — Illustration + Outcome Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="space-y-5"
          >
            {/* Structured Flow illüstrasyonu */}
            <div className="rounded-2xl border border-border bg-surface/60 p-4 overflow-hidden">
              <HeroIllustration className="w-full opacity-85" />
            </div>

            {/* Outcome kartları — küçültülmüş, yatay */}
            <div className="grid grid-cols-3 gap-3">
              {HERO_CONTENT.cards.map((card, index) => {
                const Icon = cardIcons[index];
                return (
                  <div
                    key={index}
                    className="rounded-xl p-4 border bg-surface border-border hover:border-border-accent transition-colors duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 bg-primary/8 dark:bg-primary-light/10 text-primary dark:text-primary-light">
                      <Icon className="w-4 h-4" size={16} />
                    </div>
                    <h3 className="text-xs font-semibold text-foreground leading-snug">
                      {card.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
