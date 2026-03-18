"use client";

/**
 * Varyant 2: Aceternity Aurora Background
 * Kaynak: hero-aura.txt — CSS-only aurora, Verimio renklerine uyarlandı
 */

import { motion } from "framer-motion";
import { HERO_CONTENT, BRAND } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function HeroAurora() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0514]">
      {/* Aurora effect layer */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform"
          style={{
            backgroundImage: [
              "repeating-linear-gradient(100deg, #0A0514 0%, #0A0514 5%, transparent 8%, transparent 14%, #0A0514 18%)",
              "repeating-linear-gradient(100deg, #8B5CF6 8%, #6D28D9 14%, #A3E635 20%, #2E1065 28%, #8B5CF6 34%)",
            ].join(","),
            backgroundSize: "300% 200%",
            backgroundPosition: "50% 50%",
            filter: "blur(30px)",
            animation: "verimio-aurora 80s linear infinite",
            maskImage: "radial-gradient(ellipse 80% 70% at 70% 30%, black 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 70% 30%, black 20%, transparent 70%)",
          }}
        />
        {/* After pseudo — mix-blend for depth */}
        <div
          className="pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform mix-blend-difference"
          style={{
            backgroundImage: [
              "repeating-linear-gradient(100deg, #0A0514 0%, #0A0514 5%, transparent 8%, transparent 14%, #0A0514 18%)",
              "repeating-linear-gradient(100deg, #A3E635 8%, #8B5CF6 16%, #2E1065 24%, #A3E635 32%)",
            ].join(","),
            backgroundSize: "250% 150%",
            backgroundAttachment: "fixed",
            filter: "blur(40px)",
            animation: "verimio-aurora 80s linear infinite",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="relative z-10 flex flex-col items-center justify-center px-4 text-center max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          <span className="text-xs font-medium text-white/70">{HERO_CONTENT.badge}</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05]">
          {HERO_CONTENT.headline}
          <br />
          <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A3E635] bg-clip-text text-transparent">
            {HERO_CONTENT.headlineHighlight}
          </span>
        </h1>

        <p className="text-lg text-white/50 max-w-xl leading-relaxed mb-8">
          {HERO_CONTENT.subheadline}
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Button href={BRAND.tallyFormUrl} size="lg">{HERO_CONTENT.ctaPrimary}</Button>
          <Button href="#nasil-calisir" variant="outline" size="lg" icon={false} className="border-white/20 text-white hover:border-secondary hover:text-secondary hover:bg-transparent">
            {HERO_CONTENT.ctaSecondary}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
