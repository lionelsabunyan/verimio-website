"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_ITEMS } from "@/lib/constants";
import { FadeIn } from "@/components/ui/motion";
import SectionLabel from "@/components/ui/SectionLabel";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left */}
          <div className="lg:col-span-2">
            <FadeIn>
              <SectionLabel className="mb-4">SSS</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Merak{" "}
                <span className="gradient-text">Ettikleriniz</span>
              </h2>
              <p className="text-foreground-secondary leading-relaxed">
                Aklınızdaki soruların cevabını burada bulamazsanız bize yazın.
              </p>
            </FadeIn>
          </div>

          {/* Right — Accordion */}
          <div className="lg:col-span-3 space-y-0 divide-y divide-border">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index}>
                <motion.button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                  whileTap={{ scale: 0.995 }}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-button-${index}`}
                >
                  <span className={`text-base font-medium pr-6 transition-colors duration-200 ${
                    openIndex === index ? "text-primary dark:text-primary-light" : "text-foreground group-hover:text-primary/80 dark:group-hover:text-primary-light/80"
                  }`}>
                    {item.question}
                  </span>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
                    openIndex === index ? "bg-primary text-white" : "bg-foreground/6 text-foreground-secondary group-hover:bg-foreground/10"
                  }`} aria-hidden="true">
                    {openIndex === index
                      ? <Minus className="w-3.5 h-3.5" />
                      : <Plus className="w-3.5 h-3.5" />
                    }
                  </div>
                </motion.button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-button-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm text-foreground-secondary leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
