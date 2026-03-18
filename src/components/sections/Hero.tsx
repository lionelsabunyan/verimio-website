"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HERO_CONTENT, BRAND } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { FloatingShapes } from "@/components/brand/Decoratives";
import TimeIcon from "@/components/brand/icons/ui/TimeIcon";
import ROIIcon from "@/components/brand/icons/ui/ROIIcon";
import RoadmapIcon from "@/components/brand/icons/ui/RoadmapIcon";

const cardIcons = [TimeIcon, ROIIcon, RoadmapIcon];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0A0514]">

      {/* ── Aurora Background (full-bleed) ── */}
      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: auroraOpacity }}>
        {/* Primary aurora layer — yumuşak blur, yavaş geçiş */}
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
        {/* Secondary layer — mix-blend for depth, extra soft */}
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

      {/* Subtle radial glow accents */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 60%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(163,230,53,0.04) 0%, transparent 60%)", filter: "blur(60px)" }} />

      <FloatingShapes count={4} />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — text */}
          <motion.div className="space-y-8" style={{ y: textY }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-medium text-white/70 tracking-wide">
                {HERO_CONTENT.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white"
            >
              {HERO_CONTENT.headline}
              <br />
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A3E635] bg-clip-text text-transparent">
                {HERO_CONTENT.headlineHighlight}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg text-white/50 max-w-lg leading-relaxed"
            >
              {HERO_CONTENT.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button href={BRAND.tallyFormUrl} size="lg">
                {HERO_CONTENT.ctaPrimary}
              </Button>
              <Button href="#nasil-calisir" variant="outline" size="lg" icon={false} className="border-white/20 text-white hover:border-secondary hover:text-secondary hover:bg-transparent">
                {HERO_CONTENT.ctaSecondary}
              </Button>
            </motion.div>
          </motion.div>

          {/* Right — Outcome Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="space-y-5"
            style={{ y: cardsY }}
          >
            <div className="grid grid-cols-3 gap-3">
              {HERO_CONTENT.cards.map((card, index) => {
                const Icon = cardIcons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="rounded-xl p-4 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-secondary/30 transition-all duration-200 glow-card"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 bg-white/10 text-secondary">
                      <Icon className="w-4 h-4" size={16} />
                    </div>
                    <h3 className="text-xs font-semibold text-white/80 leading-snug">
                      {card.title}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
