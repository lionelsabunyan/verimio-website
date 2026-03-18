"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HERO_CONTENT, BRAND } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { FloatingShapes } from "@/components/brand/Decoratives";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0C0C10]">

      {/* ── Aurora Background — warm coral/gold tones ── */}
      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: auroraOpacity }}>
        <div
          className="absolute -inset-[10px] opacity-40 will-change-transform"
          style={{
            backgroundImage: [
              "repeating-linear-gradient(100deg, #0C0C10 0%, #0C0C10 5%, transparent 8%, transparent 14%, #0C0C10 18%)",
              "repeating-linear-gradient(100deg, #FF6B6B 8%, #E05555 14%, #FFD93D 20%, #1A1A2E 28%, #FF6B6B 34%)",
            ].join(","),
            backgroundSize: "300% 200%",
            backgroundPosition: "50% 50%",
            filter: "blur(30px)",
            animation: "verimio-aurora 80s linear infinite",
            maskImage: "radial-gradient(ellipse 80% 70% at 70% 30%, black 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 70% 30%, black 20%, transparent 70%)",
          }}
        />
        <div
          className="absolute -inset-[10px] opacity-25 will-change-transform mix-blend-soft-light"
          style={{
            backgroundImage: [
              "repeating-linear-gradient(100deg, #0C0C10 0%, #0C0C10 5%, transparent 8%, transparent 14%, #0C0C10 18%)",
              "repeating-linear-gradient(100deg, #FFD93D 8%, #FF6B6B 16%, #1A1A2E 24%, #FFD93D 32%)",
            ].join(","),
            backgroundSize: "250% 150%",
            backgroundAttachment: "fixed",
            filter: "blur(40px)",
            animation: "verimio-aurora 80s linear infinite",
          }}
        />
      </motion.div>

      {/* Warm radial accents */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(255,107,107,0.05) 0%, transparent 60%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(255,217,61,0.03) 0%, transparent 60%)", filter: "blur(60px)" }} />

      <FloatingShapes count={4} />

      {/* ── Centered Content ── */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B] animate-pulse" />
          <span className="text-sm font-medium text-white/60 tracking-wide">
            {HERO_CONTENT.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-white mb-6"
        >
          {HERO_CONTENT.headline}
          <br />
          <span className="bg-gradient-to-r from-[#FF6B6B] via-[#FF8E8E] to-[#FFD93D] bg-clip-text text-transparent">
            {HERO_CONTENT.headlineHighlight}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {HERO_CONTENT.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <Button href={BRAND.tallyFormUrl} size="lg">
            {HERO_CONTENT.ctaPrimary}
          </Button>
          <Button
            href="#nasil-calisir"
            variant="outline"
            size="lg"
            icon={false}
            className="border-white/15 text-white hover:border-[#FF6B6B] hover:text-[#FF6B6B] hover:bg-transparent"
          >
            {HERO_CONTENT.ctaSecondary}
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="max-w-4xl mx-auto px-8"><div className="animated-divider" /></div>
      </div>
    </section>
  );
}
