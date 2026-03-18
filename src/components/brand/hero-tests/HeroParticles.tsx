"use client";

/**
 * Varyant 3: Paper Shaders Smooth MeshGradient (full-bleed)
 * Kaynak: hero-auro2.txt — Verimio renklerine uyarlandı
 */

import { MeshGradient } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import { HERO_CONTENT, BRAND } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function HeroSmoothShader() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      {/* Full-bleed MeshGradient */}
      <div className="absolute inset-0">
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#1E0A46", "#2E1065", "#8B5CF6", "#A3E635"]}
          distortion={0.8}
          swirl={0.6}
          speed={0.35}
        />
        <div className="absolute inset-0 pointer-events-none bg-black/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          <span className="text-xs font-medium text-white/70">{HERO_CONTENT.badge}</span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold text-white leading-[1.05] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {HERO_CONTENT.headline}{" "}
          <span className="text-secondary">{HERO_CONTENT.headlineHighlight}</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {HERO_CONTENT.subheadline}
        </motion.p>

        <motion.div
          className="flex items-center gap-4 flex-wrap justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Button href={BRAND.tallyFormUrl} size="lg">{HERO_CONTENT.ctaPrimary}</Button>
          <Button href="#nasil-calisir" variant="outline" size="lg" icon={false} className="border-white/20 text-white hover:border-secondary hover:text-secondary hover:bg-transparent">
            {HERO_CONTENT.ctaSecondary}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
