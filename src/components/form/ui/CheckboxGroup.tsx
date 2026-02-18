"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CheckboxGroupProps {
  label?: string;
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
  columns?: 1 | 2;
}

export default function CheckboxGroup({
  label,
  options,
  values,
  onChange,
  error,
  columns = 1,
}: CheckboxGroupProps) {
  const toggle = (option: string) => {
    const next = values.includes(option)
      ? values.filter((v) => v !== option)
      : [...values, option];
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {label && (
        <p className="text-sm font-medium text-foreground/80">{label}</p>
      )}
      <div
        className={
          columns === 2
            ? "grid grid-cols-2 gap-2"
            : "flex flex-col gap-2"
        }
      >
        {options.map((option) => {
          const checked = values.includes(option);
          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-colors duration-150 ${
                checked
                  ? "bg-secondary/10 border-secondary/50 text-foreground font-medium"
                  : "border-foreground/15 text-foreground/70 hover:border-secondary/30 hover:bg-secondary/5"
              }`}
            >
              <span
                className={`flex-shrink-0 w-4 h-4 rounded flex items-center justify-center transition-colors duration-150 ${
                  checked ? "bg-secondary border-secondary border" : "border-2 border-foreground/25"
                }`}
              >
                {checked && <Check className="w-2.5 h-2.5 text-primary" strokeWidth={3} />}
              </span>
              {option}
            </motion.button>
          );
        })}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
