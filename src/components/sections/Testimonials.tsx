"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { FadeIn } from "@/components/ui/motion";
import TestimonialAvatar from "@/components/brand/TestimonialAvatar";

function StarRating() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 üzerinden 5 yıldız">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-secondary">
          <path d="M8 1l1.85 3.75 4.15.6-3 2.92.71 4.14L8 10.25l-3.71 1.96.71-4.14L2 5.35l4.15-.6z" />
        </svg>
      ))}
    </div>
  );
}

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Sol — Başlık + navigasyon */}
          <FadeIn>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
                <span className="text-sm font-medium text-foreground-secondary tracking-wide uppercase ml-1">
                  Müşterilerimiz
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                Sonuçlar{" "}
                <span className="gradient-text">konuşuyor.</span>
              </h2>

              <p className="text-foreground-secondary leading-relaxed mb-8 max-w-md">
                Operasyonlarını dönüştüren firmalar, süreçten ne elde ettiklerini aktarıyor.
              </p>

              {/* Navigasyon butonları */}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => navigate(-1)}
                  whileTap={{ scale: 0.92 }}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-border-accent hover:bg-primary/5 transition-colors"
                  aria-label="Önceki"
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>

                <div className="flex items-center gap-1.5">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                      className={`rounded-full transition-all duration-200 ${
                        i === current
                          ? "w-5 h-1.5 bg-secondary"
                          : "w-1.5 h-1.5 bg-foreground/20 hover:bg-foreground/40"
                      }`}
                      aria-label={`${i + 1}. yorum`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={() => navigate(1)}
                  whileTap={{ scale: 0.92 }}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-border-accent hover:bg-primary/5 transition-colors"
                  aria-label="Sonraki"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </FadeIn>

          {/* Sağ — Testimonial kartı */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="rounded-2xl border border-border bg-surface p-8 shadow-sm"
              >
                {/* Rating */}
                <StarRating />

                {/* Quote */}
                <blockquote className="text-lg sm:text-xl font-medium leading-relaxed text-foreground/85 mt-5 mb-8">
                  &ldquo;{TESTIMONIALS[current].quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <TestimonialAvatar name={TESTIMONIALS[current].name} index={current} />
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {TESTIMONIALS[current].name}
                    </div>
                    <div className="text-xs text-foreground-secondary mt-0.5">
                      {TESTIMONIALS[current].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
