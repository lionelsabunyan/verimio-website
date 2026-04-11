"use client";

import { motion } from "framer-motion";

const STEP_LABELS = ["Şirket", "Süreçler", "Hedefler", "İletişim"];

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps = 4,
}: StepIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="relative h-px bg-border overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-foreground"
          style={{ height: 2 }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      </div>

      {/* Step labels */}
      <div className="flex items-center justify-between">
        {STEP_LABELS.map((label, i) => {
          const stepNum = i + 1;
          const done = stepNum < currentStep;
          const active = stepNum === currentStep;
          return (
            <div key={label} className="flex items-center gap-2">
              <span
                className={`text-xs tabular-nums transition-colors duration-200 ${
                  active
                    ? "text-foreground font-medium"
                    : done
                    ? "text-foreground-secondary"
                    : "text-foreground-muted"
                }`}
                aria-hidden="true"
              >
                {stepNum}
              </span>
              <span className="sr-only">
                {done ? `${label} — tamamlandı` : active ? `${label} — geçerli adım` : label}
              </span>
              <span
                className={`hidden md:block text-xs transition-colors duration-200 ${
                  active
                    ? "text-foreground font-medium"
                    : done
                    ? "text-foreground-secondary"
                    : "text-foreground-muted"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile label */}
      <p className="md:hidden text-xs text-foreground-muted">
        Adım{" "}
        <span className="font-medium text-foreground">{currentStep}</span> /{" "}
        {totalSteps} —{" "}
        <span className="text-foreground">{STEP_LABELS[currentStep - 1]}</span>
      </p>
    </div>
  );
}
