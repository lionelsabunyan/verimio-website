"use client";

import { motion } from "framer-motion";

interface HeroVisualProps {
  variant?: "home" | "about" | "services";
  className?: string;
}

const variants = {
  home: {
    orbs: [
      { color: "rgba(139, 92, 246, 0.20)", size: 320, blur: 100, x: "20%", y: "20%", anim: "orb-float-1", duration: "20s" },
      { color: "rgba(163, 230, 53, 0.10)", size: 260, blur: 120, x: "65%", y: "55%", anim: "orb-float-2", duration: "25s" },
      { color: "rgba(46, 16, 101, 0.15)", size: 200, blur: 80, x: "50%", y: "10%", anim: "orb-float-3", duration: "22s" },
    ],
    gridOpacity: 1,
  },
  about: {
    orbs: [
      { color: "rgba(139, 92, 246, 0.15)", size: 250, blur: 100, x: "30%", y: "30%", anim: "orb-float-1", duration: "30s" },
      { color: "rgba(46, 16, 101, 0.12)", size: 200, blur: 90, x: "60%", y: "50%", anim: "orb-float-2", duration: "28s" },
    ],
    gridOpacity: 0.8,
  },
  services: {
    orbs: [
      { color: "rgba(163, 230, 53, 0.12)", size: 280, blur: 110, x: "25%", y: "25%", anim: "orb-float-2", duration: "15s" },
      { color: "rgba(139, 92, 246, 0.18)", size: 240, blur: 100, x: "60%", y: "45%", anim: "orb-float-1", duration: "18s" },
      { color: "rgba(46, 16, 101, 0.10)", size: 180, blur: 80, x: "45%", y: "70%", anim: "orb-float-3", duration: "20s" },
    ],
    gridOpacity: 1,
  },
};

export default function HeroVisual({ variant = "home", className = "" }: HeroVisualProps) {
  const config = variants[variant];

  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border ${className}`}
      aria-hidden="true"
    >
      {/* Layer 1: Dot Grid */}
      <div
        className="absolute inset-0 hero-dot-grid"
        style={{ opacity: config.gridOpacity }}
      />

      {/* Layer 2: Gradient Orbs */}
      {config.orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: `blur(${orb.blur}px)`,
            animation: `${orb.anim} ${orb.duration} ease-in-out infinite`,
            willChange: "transform",
          }}
        />
      ))}

      {/* Layer 3: Accent elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-2xl border border-primary-light/10" />

        {/* Corner accent - top right */}
        <div
          className="absolute top-0 right-0 w-24 h-24"
          style={{
            background: "radial-gradient(circle at 100% 0%, rgba(163, 230, 53, 0.08) 0%, transparent 70%)",
          }}
        />

        {/* Corner accent - bottom left */}
        <div
          className="absolute bottom-0 left-0 w-20 h-20"
          style={{
            background: "radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.06) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Center icon mark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="w-16 h-16 rounded-2xl border border-primary-light/15 bg-primary-light/5 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="w-3 h-3 rounded-full bg-secondary/60 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}
