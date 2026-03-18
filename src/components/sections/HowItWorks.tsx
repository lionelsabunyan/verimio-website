"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { HOW_IT_WORKS } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section id="nasil-calisir" className="section-padding bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left — sticky header */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <FadeIn>
              <SectionLabel className="mb-4">Nasıl Çalışır?</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                Danışmanlık <span className="text-primary-light">Sürecimiz</span>
              </h2>
              <p className="text-foreground-secondary leading-relaxed">
                Firmanıza özgü bir süreçle, doğru adımları birlikte atıyoruz.
              </p>
            </FadeIn>
          </div>

          {/* Right — vertical timeline with numbers */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {HOW_IT_WORKS.map((step, index) => {
                const isLast = index === HOW_IT_WORKS.length - 1;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="flex gap-6 group"
                  >
                    {/* Timeline column — number instead of icon */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-primary-light/10 flex items-center justify-center group-hover:bg-primary-light/20 transition-colors duration-300">
                        <span className="text-lg font-bold text-primary-light">{index + 1}</span>
                      </div>
                      {!isLast && (
                        <div className="w-px flex-1 min-h-[40px] bg-border my-2" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-10">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary-light transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
