"use client";

import { useState } from "react";
import HeroBeams from "@/components/brand/hero-tests/HeroBeams";
import HeroMeshGradient from "@/components/brand/hero-tests/HeroMeshGradient";
import HeroParticles from "@/components/brand/hero-tests/HeroParticles";
import HeroCombo from "@/components/brand/hero-tests/HeroCombo";

const options = [
  { id: "beams", label: "A) Background Beams", desc: "SVG ışık kirişleri (Clerk tarzı)" },
  { id: "mesh", label: "B) Mesh Gradient", desc: "WebGL akan gradient (Stripe tarzı)" },
  { id: "particles", label: "C) Particle Field", desc: "Mouse-follow parçacıklar" },
  { id: "combo", label: "D) Mesh + Beams", desc: "Gradient + ışık kirişleri combo" },
] as const;

type HeroType = typeof options[number]["id"];

export default function HeroTestPage() {
  const [active, setActive] = useState<HeroType>("beams");

  return (
    <div className="min-h-screen bg-background p-6 pt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Hero Animasyon Test Alanı</h1>
        <p className="text-foreground-secondary mb-8">Aşağıdaki seçeneklerden birini seç, canlı önizle.</p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActive(opt.id)}
              className={`px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                active === opt.id
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-surface border-border text-foreground-secondary hover:border-border-accent"
              }`}
            >
              <div>{opt.label}</div>
              <div className="text-xs opacity-70 mt-0.5">{opt.desc}</div>
            </button>
          ))}
        </div>

        {/* Preview — simulates hero right column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — fake hero text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-accent bg-primary/5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-medium text-primary-light">Kurumsal AI Danışmanlığı</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Operasyonlarınıza{" "}
              <span className="gradient-text">net yön verin.</span>
            </h2>
            <p className="text-lg text-foreground-secondary max-w-lg leading-relaxed">
              İş süreçlerinizi analiz eder, otomasyon potansiyelinizi ortaya çıkarır
              ve size özel bir yol haritası sunarız.
            </p>
            <div className="flex gap-3">
              <span className="px-6 py-3 bg-secondary text-primary font-semibold rounded-full text-sm">
                Check-Up Başlatın
              </span>
              <span className="px-6 py-3 border border-border text-foreground font-medium rounded-full text-sm">
                Nasıl Çalışır?
              </span>
            </div>
          </div>

          {/* Right — animated visual */}
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border relative bg-dark">
            {active === "beams" && <HeroBeams />}
            {active === "mesh" && <HeroMeshGradient />}
            {active === "particles" && <HeroParticles />}
            {active === "combo" && <HeroCombo />}
          </div>
        </div>

        {/* Full-width preview */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">Tam genişlik önizleme (hero arka planı olarak)</h3>
          <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-border relative bg-dark">
            {active === "beams" && <HeroBeams />}
            {active === "mesh" && <HeroMeshGradient />}
            {active === "particles" && <HeroParticles />}
            {active === "combo" && <HeroCombo />}
            {/* Overlay text to see readability */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">
                Metin bu şekilde <span className="text-secondary">görünecek</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
