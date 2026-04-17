"use client";

import { motion } from "framer-motion";
const Check = ({ className, strokeWidth }: { className?: string; strokeWidth?: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 2} className={className}><polyline points="20,6 9,17 4,12"/></svg>
);

interface CheckboxGroupProps {
  label?: string;
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
  columns?: 1 | 2;
  maxSelections?: number;
  hint?: string;
}

export default function CheckboxGroup({
  label,
  options,
  values,
  onChange,
  error,
  columns = 1,
  maxSelections,
  hint,
}: CheckboxGroupProps) {
  const toggle = (option: string) => {
    const isSelected = values.includes(option);
    if (!isSelected && maxSelections && values.length >= maxSelections) {
      return; // sınır aşılmasın, sessizce engelle
    }
    const next = isSelected
      ? values.filter((v) => v !== option)
      : [...values, option];
    onChange(next);
  };

  const atLimit = maxSelections !== undefined && values.length >= maxSelections;

  return (
    <div className="space-y-2">
      {label && (
        <p className="text-sm font-medium text-foreground-secondary">{label}</p>
      )}
      {hint && (
        <p className="text-xs text-foreground-muted">{hint}</p>
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
          const disabled = !checked && atLimit;
          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              disabled={disabled}
              whileTap={disabled ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`flex items-center gap-3 px-4 py-3 border text-sm text-left transition-colors duration-150 ${
                checked
                  ? "border-foreground text-foreground font-medium"
                  : disabled
                    ? "border-border/50 text-foreground-muted cursor-not-allowed opacity-50"
                    : "border-border text-foreground-secondary hover:border-foreground/40"
              }`}
            >
              <span
                className={`flex-shrink-0 w-4 h-4 rounded flex items-center justify-center transition-colors duration-150 ${
                  checked ? "bg-foreground border-foreground border" : "border-2 border-foreground-muted"
                }`}
              >
                {checked && <Check className="w-2.5 h-2.5 text-background" strokeWidth={3} />}
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
