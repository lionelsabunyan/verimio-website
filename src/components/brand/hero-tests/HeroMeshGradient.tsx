"use client";

import { MeshGradient } from "@mesh-gradient/react";

export default function HeroMeshGradient() {
  return (
    <div className="absolute inset-0">
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        options={{
          colors: ["#0A0514", "#1E0A46", "#8B5CF6", "#A3E635"],
          animationSpeed: 0.3,
        }}
      />
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0514]/60 via-transparent to-[#0A0514]/30" />
      {/* Dot grid */}
      <div className="absolute inset-0 hero-dot-grid opacity-[0.03]" />
    </div>
  );
}
