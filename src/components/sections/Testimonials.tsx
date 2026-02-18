"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { FadeIn } from "@/components/ui/motion";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="section-padding bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <Quote className="w-10 h-10 text-primary/20 dark:text-primary-light/20 mb-8" />
          </FadeIn>

          <div className="overflow-hidden min-h-[160px] relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-snug text-foreground/85 mb-10"
              >
                &ldquo;{TESTIMONIALS[current].quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-4">
            {/* Attribution */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-full bg-primary/10 dark:bg-primary-light/10 border border-border flex items-center justify-center flex-shrink-0">
                  <span className="text-primary dark:text-primary-light font-bold text-base">
                    {TESTIMONIALS[current].name[0]}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {TESTIMONIALS[current].name}
                  </div>
                  <div className="text-xs text-foreground-secondary mt-0.5">
                    {TESTIMONIALS[current].role}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => navigate(-1)}
                whileTap={{ scale: 0.92 }}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-border-accent hover:bg-primary/5 transition-colors"
                aria-label="Önceki"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`rounded-full transition-all duration-200 ${
                      i === current ? "w-4 h-1.5 bg-primary dark:bg-primary-light" : "w-1.5 h-1.5 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                    aria-label={`${i + 1}. yorum`}
                  />
                ))}
              </div>

              <motion.button
                onClick={() => navigate(1)}
                whileTap={{ scale: 0.92 }}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-border-accent hover:bg-primary/5 transition-colors"
                aria-label="Sonraki"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
