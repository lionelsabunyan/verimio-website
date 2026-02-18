"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ABOUT_CONTENT } from "@/lib/constants";
import { FadeIn } from "@/components/ui/motion";

export default function About() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <FadeIn>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary-light/30" />
            <span className="text-sm font-medium text-muted ml-1">
              {ABOUT_CONTENT.label}
            </span>
          </div>
        </FadeIn>

        {/* Big Text */}
        <FadeIn delay={0.1}>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-snug max-w-4xl text-foreground/90">
            {ABOUT_CONTENT.text}
          </p>
        </FadeIn>

        {/* Buttons */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <Link
              href="/hakkimizda"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-primary font-semibold text-sm rounded-full hover:bg-secondary/90 transition-all duration-200"
            >
              {ABOUT_CONTENT.ctaPrimary}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="#nasil-calisir"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              {ABOUT_CONTENT.ctaSecondary}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
