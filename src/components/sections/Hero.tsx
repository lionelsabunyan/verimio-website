"use client";

import { useState } from "react";
import { ChevronDown, Zap, TrendingUp, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_CONTENT, BRAND } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { RadialGlow } from "@/components/brand/Decoratives";

const cardIcons = [Zap, TrendingUp, Map];

export default function Hero() {
  const [openCard, setOpenCard] = useState<number>(0);

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
                Türk KOBİ&apos;leri için AI Danışmanlığı
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

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {["Tamamen ücretsiz", "3 dakikada tamamla", "Satış araması yok"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-foreground-secondary">
                  <span className="w-1 h-1 rounded-full bg-secondary" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — Accordion Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="space-y-3"
          >
            {HERO_CONTENT.cards.map((card, index) => {
              const Icon = cardIcons[index];
              const isOpen = openCard === index;
              return (
                <motion.div
                  key={index}
                  onClick={() => setOpenCard(isOpen ? -1 : index)}
                  className={`rounded-2xl p-5 cursor-pointer border transition-colors duration-200 ${
                    isOpen
                      ? "bg-primary/5 dark:bg-primary-light/10 border-border-accent"
                      : "bg-surface border-border hover:bg-foreground/5 hover:border-border-hover"
                  }`}
                  layout
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                        isOpen ? "bg-primary text-white" : "bg-foreground/8 text-foreground-secondary"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className={`text-base font-semibold transition-colors duration-200 ${
                        isOpen ? "text-primary dark:text-primary-light" : "text-foreground"
                      }`}>
                        {card.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                        isOpen ? "text-primary dark:text-primary-light" : "text-foreground-muted"
                      }`} />
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 ml-12 text-sm text-foreground-secondary leading-relaxed">
                          {card.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="grid grid-cols-3 gap-3 pt-2"
            >
              {[
                { value: "10+", label: "Firma" },
                { value: "%60+", label: "Ort. potansiyel" },
                { value: "3dk", label: "Form süresi" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-surface border border-border">
                  <div className="text-xl font-bold text-primary dark:text-primary-light">{stat.value}</div>
                  <div className="text-xs text-foreground-muted mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
