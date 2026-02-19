"use client";

import { motion } from "framer-motion";
import FormStep from "../FormStep";
import FormInput from "../ui/FormInput";
import type { FormData, Sector } from "@/lib/form-data";
import { SECTORS, TEAM_SIZE_OPTIONS } from "@/lib/form-data";

interface Props {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  updateField: (key: keyof FormData, value: string | string[]) => void;
  onSectorChange: (sector: Sector) => void;
}

export default function Step1Sector({
  formData,
  errors,
  onSectorChange,
  updateField,
}: Props) {
  return (
    <FormStep
      title="Şirketinizi tanıyalım"
      description="Sektör ve şirket bilgilerinizi seçin — buna göre size özel sorular gelecek."
    >
      {/* Sector grid */}
      <div>
        <p className="text-sm font-medium text-foreground-secondary mb-2">
          Sektörünüz
        </p>
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
                    ? "border-primary bg-primary/10 text-primary dark:border-primary-light dark:bg-primary-light/10 dark:text-primary-light"
                    : "border-border dark:border-white/10 text-foreground-secondary hover:border-border-accent dark:hover:border-white/20 hover:text-foreground hover:bg-foreground/5"
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

      {/* Company name */}
      <FormInput
        label="Şirket adı"
        value={formData.companyName}
        onChange={(v) => updateField("companyName", v)}
        error={errors.companyName}
        placeholder="Örn: ABC Teknoloji A.Ş."
        required
      />

      {/* Company website */}
      <FormInput
        label="Şirket websitesi"
        value={formData.companyWebsite}
        onChange={(v) => updateField("companyWebsite", v)}
        placeholder="Örn: www.firma.com"
        optional
      />

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
                    ? "bg-primary text-white border-primary dark:bg-primary-light dark:border-primary-light"
                    : "border-border dark:border-white/10 text-foreground-secondary hover:border-border-accent dark:hover:border-white/20 hover:text-foreground"
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
