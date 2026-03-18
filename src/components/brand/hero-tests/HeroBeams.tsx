"use client";

import { useEffect, useId, useRef } from "react";
import { motion } from "framer-motion";

const BEAM_PATHS = [
  "M0 200 Q200 100 400 180 Q600 260 800 150 Q1000 40 1200 200",
  "M0 350 Q150 250 350 300 Q550 350 750 250 Q950 150 1200 280",
  "M0 100 Q300 200 500 80 Q700 -40 900 120 Q1100 280 1200 100",
  "M0 450 Q200 380 400 420 Q600 460 800 350 Q1000 240 1200 380",
  "M0 50 Q250 150 500 50 Q750 -50 1000 100 Q1150 200 1200 50",
  "M0 500 Q300 420 600 480 Q900 540 1200 420",
];

function Beam({ path, delay, duration, color }: { path: string; delay: number; duration: number; color: string }) {
  const id = useId();
  return (
    <g>
      {/* Faint trail */}
      <path d={path} fill="none" stroke={color} strokeWidth="0.5" opacity="0.1" />
      {/* Animated beam */}
      <motion.circle r="3" fill={color} filter={`url(#${id})`}>
        <animateMotion dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" path={path} />
      </motion.circle>
      {/* Glow filter */}
      <defs>
        <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
        </filter>
      </defs>
    </g>
  );
}

export default function HeroBeams() {
  return (
    <div className="absolute inset-0">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0514] via-[#1E0A46] to-[#0A0514]" />

      {/* Radial glow center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* SVG Beams */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Beam path={BEAM_PATHS[0]} delay={0} duration={8} color="#8B5CF6" />
        <Beam path={BEAM_PATHS[1]} delay={1.5} duration={10} color="#A3E635" />
        <Beam path={BEAM_PATHS[2]} delay={0.8} duration={7} color="#8B5CF6" />
        <Beam path={BEAM_PATHS[3]} delay={2} duration={12} color="#A3E635" />
        <Beam path={BEAM_PATHS[4]} delay={3} duration={9} color="#8B5CF6" />
        <Beam path={BEAM_PATHS[5]} delay={1} duration={11} color="#A3E635" />
      </svg>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 hero-dot-grid opacity-[0.04]" />
    </div>
  );
}
