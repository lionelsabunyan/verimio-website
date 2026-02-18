"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Quote Icon */}
          <Quote className="w-12 h-12 text-primary-light/30 mb-8" />

          {/* Quote Text */}
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-snug text-foreground/90 mb-10">
            &quot;{TESTIMONIALS[current].quote}&quot;
          </blockquote>

          {/* Attribution & Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar placeholder */}
              <div className="w-12 h-12 rounded-full bg-primary-light/20 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">
                  {TESTIMONIALS[current].name[0]}
                </span>
              </div>
              <div>
                <div className="font-semibold text-foreground">
                  {TESTIMONIALS[current].name}
                </div>
                <div className="text-sm text-muted">
                  {TESTIMONIALS[current].role}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:border-primary-light hover:bg-primary-light/5 transition-all"
                aria-label="Önceki"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-muted">
                <span className="font-semibold text-foreground">
                  {String(current + 1).padStart(2, "0")}
                </span>{" "}
                / {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:border-primary-light hover:bg-primary-light/5 transition-all"
                aria-label="Sonraki"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
