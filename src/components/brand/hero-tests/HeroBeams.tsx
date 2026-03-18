"use client";

/**
 * Varyant 1: Paper Shaders MeshGradient + Wireframe + PulsingBorder
 * Kaynak: hero.txt — Verimio renklerine uyarlandı
 */

import { useEffect, useRef, useState } from "react";
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import { HERO_CONTENT, BRAND } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function HeroShader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const enter = () => setIsActive(true);
    const leave = () => setIsActive(false);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-v" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
          </filter>
          <filter id="text-glow-v" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Layer 1: MeshGradient — Verimio renkleri */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#0A0514", "#1E0A46", "#8B5CF6", "#2E1065", "#A3E635"]}
        speed={0.25}
        distortion={0.6}
        swirl={0.4}
      />

      {/* Layer 2: Subtle second gradient for depth */}
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-30"
        colors={["#0A0514", "#8B5CF6", "#A3E635", "#2E1065"]}
        speed={0.15}
        distortion={0.3}
        swirl={0.7}
        grainOverlay={0.15}
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-end">
        <main className="max-w-2xl p-8 md:p-16 pb-16">
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse mr-2" />
            <span className="text-white/80 text-sm font-medium">{HERO_CONTENT.badge}</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              className="block text-3xl md:text-4xl lg:text-5xl font-light mb-2"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #8B5CF6 40%, #A3E635 70%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% 200%",
                filter: "url(#text-glow-v)",
              }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              {HERO_CONTENT.headline}
            </motion.span>
            <span className="block font-black text-white drop-shadow-2xl">{HERO_CONTENT.headlineHighlight}</span>
          </motion.h1>

          <motion.p
            className="text-lg text-white/60 mb-8 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {HERO_CONTENT.subheadline}
          </motion.p>

          <motion.div
            className="flex items-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Button href={BRAND.tallyFormUrl} size="lg">{HERO_CONTENT.ctaPrimary}</Button>
            <Button href="#nasil-calisir" variant="outline" size="lg" icon={false} className="border-white/20 text-white hover:border-secondary hover:text-secondary hover:bg-transparent">
              {HERO_CONTENT.ctaSecondary}
            </Button>
          </motion.div>
        </main>
      </div>

      {/* PulsingBorder accent — bottom right */}
      <div className="absolute bottom-8 right-8 z-30 w-16 h-16">
        <PulsingBorder
          colors={["#8B5CF6", "#A3E635", "#2E1065", "#8B5CF6"]}
          colorBack="#00000000"
          speed={1.5}
          roundness={1}
          thickness={0.1}
          softness={0.2}
          intensity={5}
          spots={5}
          spotSize={0.1}
          pulse={0.1}
          smoke={0.5}
          smokeSize={4}
          style={{ width: "60px", height: "60px", borderRadius: "50%" }}
        />
      </div>
    </div>
  );
}
