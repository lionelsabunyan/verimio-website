"use client";

import { motion } from "framer-motion";
import FormStep from "../FormStep";
import type { FormData } from "@/lib/form-data";
import { HOURS_CATEGORIES, HOURS_OPTIONS } from "@/lib/form-data";

interface Props {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  updateField: (key: keyof FormData, value: string | string[]) => void;
}

export default function Step4Hours({ formData, errors, updateField }: Props) {
  return (
    <FormStep
      title="Haftalık zaman harcamanız"
      description="Haftada kaç saatinizi aşağıdaki işlere harcıyorsunuz? (Tahmini)"
    >
      <div className="space-y-4">
        {HOURS_CATEGORIES.map(({ key, label }) => {
          const value = formData[key] as string;
          const error = errors[key];
          return (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground/80">{label}</p>
                {error && <p className="text-xs text-red-500">{error}</p>}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {HOURS_OPTIONS.map((option) => {
                  const selected = value === option;
                  return (
                    <motion.button
                      key={option}
                      type="button"
                      onClick={() => updateField(key, option)}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`py-2.5 px-3 rounded-lg border text-xs font-medium text-center transition-colors duration-150 ${
                        selected
                          ? "bg-primary text-white border-primary"
                          : "border-foreground/15 text-foreground/60 hover:border-primary/30 hover:text-foreground"
                      }`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </FormStep>
  );
}
