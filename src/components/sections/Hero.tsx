"use client";

import { Zap, TrendingUp, Map } from "lucide-react";
import { motion } from "framer-motion";
import { HERO_CONTENT, BRAND } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { RadialGlow } from "@/components/brand/Decoratives";

const cardIcons = [Zap, TrendingUp, Map];

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

          {/* Right — Static Outcome Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="space-y-4"
          >
            {HERO_CONTENT.cards.map((card, index) => {
              const Icon = cardIcons[index];
              return (
                <div
                  key={index}
                  className="rounded-2xl p-6 border bg-surface border-border hover:border-border-hover hover:bg-foreground/3 transition-colors duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/8 dark:bg-primary-light/10 text-primary dark:text-primary-light">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground mb-1">
                        {card.title}
                      </h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
