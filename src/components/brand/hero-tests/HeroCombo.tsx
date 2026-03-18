"use client";

import { MeshGradient } from "@mesh-gradient/react";

const BEAM_PATHS = [
  "M0 200 Q200 100 400 180 Q600 260 800 150 Q1000 40 1200 200",
  "M0 350 Q150 250 350 300 Q550 350 750 250 Q950 150 1200 280",
  "M0 100 Q300 200 500 80 Q700 -40 900 120 Q1100 280 1200 100",
  "M0 450 Q200 380 400 420 Q600 460 800 350 Q1000 240 1200 380",
];

function Beam({ path, delay, duration, color }: { path: string; delay: number; duration: number; color: string }) {
  return (
    <g>
      <path d={path} fill="none" stroke={color} strokeWidth="0.5" opacity="0.08" />
      <circle r="2.5" fill={color}>
        <animateMotion dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" path={path} />
      </circle>
      <circle r="8" fill={color} opacity="0.15">
        <animateMotion dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" path={path} />
      </circle>
    </g>
  );
}

export default function HeroCombo() {
  return (
    <div className="absolute inset-0">
      {/* Layer 1: Mesh gradient background */}
      <div className="absolute inset-0 opacity-80">
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          options={{
            colors: ["#0A0514", "#1E0A46", "#8B5CF6", "#A3E635"],
            animationSpeed: 0.2,
          }}
        />
      </div>

      {/* Layer 2: Dark overlay for contrast */}
      <div className="absolute inset-0 bg-[#0A0514]/40" />

      {/* Layer 3: Light beams */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <Beam path={BEAM_PATHS[0]} delay={0} duration={9} color="#8B5CF6" />
        <Beam path={BEAM_PATHS[1]} delay={2} duration={11} color="#A3E635" />
        <Beam path={BEAM_PATHS[2]} delay={1} duration={8} color="#8B5CF6" />
        <Beam path={BEAM_PATHS[3]} delay={3} duration={10} color="#A3E635" />
      </svg>

      {/* Layer 4: Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
