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
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0514]">

      {/* ── Aurora Background ── */}
      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: auroraOpacity }}>
        <div
          className="absolute -inset-[10px] opacity-40 will-change-transform"
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
        <div
          className="absolute -inset-[10px] opacity-30 will-change-transform mix-blend-soft-light"
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
      </motion.div>

      {/* Radial glow accents */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 60%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(163,230,53,0.04) 0%, transparent 60%)", filter: "blur(60px)" }} />

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
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
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
          <span className="bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#A3E635] bg-clip-text text-transparent">
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
            className="border-white/15 text-white hover:border-secondary hover:text-secondary hover:bg-transparent"
          >
            {HERO_CONTENT.ctaSecondary}
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom edge — thin animated divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="max-w-4xl mx-auto px-8"><div className="animated-divider" /></div>
      </div>
    </section>
  );
}
