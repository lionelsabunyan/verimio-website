"use client";

import { motion } from "framer-motion";
import FormStep from "../FormStep";
import type { FormData, Sector } from "@/lib/form-data";
import { TEAM_SIZE_OPTIONS } from "@/lib/form-data";

interface Props {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  updateField: (key: keyof FormData, value: string | string[]) => void;
  onSectorChange: (sector: Sector) => void;
}

const SECTORS: { value: Sector; emoji: string; label: string; sub: string }[] =
  [
    {
      value: "E-ticaret / Perakende",
      emoji: "🛒",
      label: "E-ticaret",
      sub: "Online satış, perakende",
    },
    {
      value: "Ajans (Reklam / Dijital / Kreatif)",
      emoji: "🎨",
      label: "Ajans",
      sub: "Reklam, dijital, kreatif",
    },
    {
      value: "B2B Hizmet (Danışmanlık / Muhasebe / Hukuk)",
      emoji: "💼",
      label: "B2B Hizmet",
      sub: "Danışmanlık, muhasebe, hukuk",
    },
    {
      value: "Üretim / Lojistik",
      emoji: "🏭",
      label: "Üretim / Lojistik",
      sub: "İmalat, depo, sevkiyat",
    },
    {
      value: "Teknoloji / Yazılım",
      emoji: "💻",
      label: "Teknoloji",
      sub: "Yazılım, SaaS, IT",
    },
    {
      value: "Diğer",
      emoji: "🏢",
      label: "Diğer",
      sub: "Başka sektör",
    },
  ];

export default function Step1Sector({
  formData,
  errors,
  onSectorChange,
  updateField,
}: Props) {
  return (
    <FormStep
      title="Sektörünüzü seçin"
      description="Firmanızın faaliyet alanını seçin — buna göre size özel sorular gelecek."
    >
      {/* Sector grid */}
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SECTORS.map((s) => {
            const selected = formData.sector === s.value;
            return (
              <motion.button
                key={s.value}
                type="button"
                onClick={() => onSectorChange(s.value)}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className={`flex flex-col items-center text-center gap-2 p-4 rounded-xl border transition-all duration-150 ${
                  selected
                    ? "border-primary bg-primary/6 text-primary dark:text-primary-light"
                    : "border-border text-foreground-secondary hover:border-border-accent hover:text-foreground hover:bg-foreground/2"
                }`}
              >
                <span className="text-2xl leading-none">{s.emoji}</span>
                <div>
                  <p className={`text-sm font-semibold leading-tight ${selected ? "text-primary dark:text-primary-light" : "text-foreground"}`}>
                    {s.label}
                  </p>
                  <p className="text-xs text-foreground-muted mt-0.5 leading-tight">{s.sub}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
        {errors.sector && (
          <p className="text-xs text-red-500 mt-2">{errors.sector}</p>
        )}
      </div>

      {/* Team size */}
      <div>
        <p className="text-sm font-medium text-foreground-secondary mb-2">
          Ekip büyüklüğünüz?
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TEAM_SIZE_OPTIONS.map((opt) => {
            const selected = formData.teamSize === opt;
            return (
              <motion.button
                key={opt}
                type="button"
                onClick={() => updateField("teamSize", opt)}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className={`py-2.5 px-3 rounded-lg border text-xs font-medium text-center transition-colors duration-150 ${
                  selected
                    ? "bg-primary text-white border-primary"
                    : "border-border text-foreground-secondary hover:border-border-accent hover:text-foreground"
                }`}
              >
                {opt}
              </motion.button>
            );
          })}
        </div>
        {errors.teamSize && (
          <p className="text-xs text-red-500 mt-2">{errors.teamSize}</p>
        )}
      </div>
    </FormStep>
  );
}
