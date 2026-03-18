"use client";

/**
 * Varyant 4: Split Layout + Clip-Path Reveal + MeshGradient sağ panel
 * Kaynak: hero-flower.txt — Verimio'ya uyarlandı, sağ taraf MeshGradient ile
 */

import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HERO_CONTENT, BRAND } from "@/lib/constants";
import Button from "@/components/ui/Button";
import TimeIcon from "@/components/brand/icons/ui/TimeIcon";
import ROIIcon from "@/components/brand/icons/ui/ROIIcon";
import RoadmapIcon from "@/components/brand/icons/ui/RoadmapIcon";

const cardIcons = [TimeIcon, ROIIcon, RoadmapIcon];

export default function HeroSplit() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <motion.section
      className="relative flex w-full min-h-screen flex-col overflow-hidden bg-[#0A0514] text-white md:flex-row"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left: Content */}
      <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16">
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-medium text-white/70">{HERO_CONTENT.badge}</span>
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
          variants={itemVariants}
        >
          {HERO_CONTENT.headline}
          <br />
          <span className="text-secondary">{HERO_CONTENT.headlineHighlight}</span>
        </motion.h1>

        <motion.div className="w-20 h-1 bg-secondary rounded-full mb-6" variants={itemVariants} />

        <motion.p
          className="text-lg text-white/50 max-w-md leading-relaxed mb-8"
          variants={itemVariants}
        >
          {HERO_CONTENT.subheadline}
        </motion.p>

        <motion.div className="flex items-center gap-4 flex-wrap mb-12" variants={itemVariants}>
          <Button href={BRAND.tallyFormUrl} size="lg">{HERO_CONTENT.ctaPrimary}</Button>
          <Button href="#nasil-calisir" variant="outline" size="lg" icon={false} className="border-white/20 text-white hover:border-secondary hover:text-secondary hover:bg-transparent">
            {HERO_CONTENT.ctaSecondary}
          </Button>
        </motion.div>

        {/* Outcome cards */}
        <motion.div className="grid grid-cols-3 gap-3" variants={containerVariants}>
          {HERO_CONTENT.cards.map((card, i) => {
            const Icon = cardIcons[i];
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="rounded-xl p-4 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-secondary/30 transition-all glow-card"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 bg-white/10 text-secondary">
                  <Icon className="w-4 h-4" size={16} />
                </div>
                <h3 className="text-xs font-semibold text-white/80 leading-snug">{card.title}</h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Right: MeshGradient with clip-path reveal */}
      <motion.div
        className="w-full min-h-[400px] md:w-1/2 md:min-h-full lg:w-2/5 relative overflow-hidden"
        initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
        animate={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
        transition={{ duration: 1.2, ease: "circOut" }}
      >
        {mounted && (
          <MeshGradient
            className="absolute inset-0 w-full h-full"
            colors={["#1E0A46", "#8B5CF6", "#A3E635", "#2E1065"]}
            speed={0.3}
            distortion={0.7}
            swirl={0.5}
          />
        )}
        {/* Diagonal overlay accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#0A0514]/20 to-[#0A0514]/60" />
      </motion.div>
    </motion.section>
  );
}
