"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Header */}
          <div>
            {/* Label */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary-light/30" />
              <span className="text-sm font-medium text-muted ml-1">
                Sık Sorulan Sorular
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold">
              Merak{" "}
              <span className="gradient-text">Ettikleriniz</span>
            </h2>
          </div>

          {/* Right - Accordion */}
          <div className="space-y-0">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className="border-b border-foreground/10"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="text-lg font-medium pr-4 group-hover:text-primary transition-colors">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-primary-light" />
                    ) : (
                      <Plus className="w-5 h-5 text-muted" />
                    )}
                  </div>
                </button>
                {openIndex === index && (
                  <div className="pb-6">
                    <p className="text-muted leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
