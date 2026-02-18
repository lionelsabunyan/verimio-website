"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_CONTENT, BRAND } from "@/lib/constants";

export default function Hero() {
  const [openCard, setOpenCard] = useState<number>(1);

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-3 h-3 rounded-full bg-primary-light/40" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
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
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-muted max-w-lg leading-relaxed"
            >
              {HERO_CONTENT.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href={BRAND.tallyFormUrl}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary/90 transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25 text-sm"
              >
                {HERO_CONTENT.ctaPrimary}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="#nasil-calisir"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-foreground/20 text-foreground font-medium rounded-full hover:border-foreground/40 transition-all duration-200 text-sm"
              >
                {HERO_CONTENT.ctaSecondary}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right - Accordion Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="space-y-4"
          >
            {HERO_CONTENT.cards.map((card, index) => (
              <div
                key={index}
                onClick={() => setOpenCard(openCard === index ? -1 : index)}
                className={`rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  openCard === index
                    ? "bg-primary-light/10 border border-primary-light/20"
                    : "bg-foreground/5 border border-transparent hover:bg-foreground/8"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-lg font-semibold ${
                      openCard === index ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {card.title}
                  </h3>
                  {openCard === index ? (
                    <ChevronUp className="w-5 h-5 text-primary-light" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted" />
                  )}
                </div>
                <AnimatePresence>
                  {openCard === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4">
                        <p className="text-muted leading-relaxed">
                          {card.description}
                        </p>
                        <Link
                          href={BRAND.tallyFormUrl}
                          className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary-light hover:text-primary transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary-light/20 flex items-center justify-center">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
