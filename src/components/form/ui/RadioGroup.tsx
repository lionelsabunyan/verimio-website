"use client";

import { motion } from "framer-motion";

interface RadioGroupProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  layout?: "vertical" | "grid";
  columns?: 2 | 3 | 4;
}

export default function RadioGroup({
  label,
  options,
  value,
  onChange,
  error,
  layout = "vertical",
  columns = 2,
}: RadioGroupProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <div className="space-y-2">
      {label && (
        <p className="text-sm font-medium text-foreground/80">{label}</p>
      )}
      <div
        className={
          layout === "grid"
            ? `grid ${gridCols[columns]} gap-2`
            : "flex flex-col gap-2"
        }
      >
        {options.map((option) => {
          const selected = value === option;
          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-colors duration-150 ${
                selected
                  ? "bg-primary/8 border-primary/40 text-primary font-medium"
                  : "border-foreground/15 text-foreground/70 hover:border-primary/20 hover:bg-primary/3"
              }`}
            >
              <span
                className={`flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors duration-150 ${
                  selected ? "border-primary" : "border-foreground/25"
                }`}
              >
                {selected && (
                  <span className="w-2 h-2 rounded-full bg-primary block" />
                )}
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
