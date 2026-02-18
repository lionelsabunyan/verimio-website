"use client";

import { motion } from "framer-motion";

/* ─── Radial Glow ──────────────────────────────────── */
interface RadialGlowProps {
  color?: "lime" | "purple";
  size?: number;
  className?: string;
  opacity?: number;
}

export function RadialGlow({
  color = "lime",
  size = 400,
  className = "",
  opacity = 0.15,
}: RadialGlowProps) {
  const gradientColor =
    color === "lime"
      ? `rgba(163, 230, 53, ${opacity})`
      : `rgba(139, 92, 246, ${opacity})`;

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${gradientColor} 0%, transparent 70%)`,
        filter: "blur(40px)",
      }}
      aria-hidden="true"
    />
  );
}

/* ─── Gradient Line ────────────────────────────────── */
interface GradientLineProps {
  className?: string;
  direction?: "horizontal" | "vertical";
}

export function GradientLine({
  className = "",
  direction = "horizontal",
}: GradientLineProps) {
  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={`${className}`}
      style={{
        width: isHorizontal ? "100%" : "1px",
        height: isHorizontal ? "1px" : "100%",
        background: isHorizontal
          ? "linear-gradient(90deg, transparent, #8B5CF6, #A3E635, transparent)"
          : "linear-gradient(180deg, transparent, #8B5CF6, #A3E635, transparent)",
      }}
      aria-hidden="true"
    />
  );
}

/* ─── Floating Shapes ──────────────────────────────── */
interface FloatingShapesProps {
  className?: string;
  count?: number;
}

export function FloatingShapes({
  className = "",
  count = 3,
}: FloatingShapesProps) {
  const shapes = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 8,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    duration: 6 + Math.random() * 4,
    delay: Math.random() * 3,
    color: i % 2 === 0 ? "bg-secondary/20" : "bg-primary-light/20",
    shape: i % 3 === 0 ? "rounded-full" : i % 3 === 1 ? "rounded-sm rotate-45" : "rounded-lg",
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute ${shape.color} ${shape.shape}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: [0, -15, 0, 10, 0],
            x: [0, 8, 0, -8, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
