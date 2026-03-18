"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const HeroShader = dynamic(() => import("@/components/brand/hero-tests/HeroBeams"), { ssr: false });
const HeroAurora = dynamic(() => import("@/components/brand/hero-tests/HeroMeshGradient"), { ssr: false });
const HeroSmooth = dynamic(() => import("@/components/brand/hero-tests/HeroParticles"), { ssr: false });
const HeroSplit = dynamic(() => import("@/components/brand/hero-tests/HeroCombo"), { ssr: false });

const options = [
  { id: "shader", label: "1) Shader + Wireframe", desc: "Paper Shaders MeshGradient, wireframe overlay, PulsingBorder" },
  { id: "aurora", label: "2) Aurora", desc: "Aceternity aurora efekti, CSS-only, centered layout" },
  { id: "smooth", label: "3) Smooth Gradient", desc: "Paper Shaders tam ekran akan gradient" },
  { id: "split", label: "4) Split + Clip Reveal", desc: "Sol metin + sağ MeshGradient, clip-path giriş animasyonu" },
] as const;

type HeroType = typeof options[number]["id"];

export default function HeroTestPage() {
  const [active, setActive] = useState<HeroType>("shader");

  return (
    <div className="min-h-screen bg-[#0A0514]">
      {/* Floating selector */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-1 bg-[#0A0514]/90 backdrop-blur-xl border border-white/10 rounded-full px-1.5 py-1">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setActive(opt.id)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-medium transition-all ${
              active === opt.id
                ? "bg-secondary text-primary"
                : "text-white/50 hover:text-white"
            }`}
            title={opt.desc}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Full-bleed hero preview */}
      {active === "shader" && <HeroShader />}
      {active === "aurora" && <HeroAurora />}
      {active === "smooth" && <HeroSmooth />}
      {active === "split" && <HeroSplit />}
    </div>
  );
}
