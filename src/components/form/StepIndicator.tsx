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
      <div className="relative h-1 bg-border rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-secondary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      </div>

      {/* Step dots + labels */}
      <div className="flex items-center justify-between">
        {STEP_LABELS.map((label, i) => {
          const stepNum = i + 1;
          const done = stepNum < currentStep;
          const active = stepNum === currentStep;
          return (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <motion.div
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  done
                    ? "bg-secondary"
                    : active
                    ? "bg-primary ring-2 ring-primary/25 ring-offset-1 ring-offset-background"
                    : "bg-foreground-muted"
                }`}
                animate={{ scale: active ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                aria-hidden="true"
              />
              <span className="sr-only">
                {done ? `${label} — tamamlandı` : active ? `${label} — geçerli adım` : label}
              </span>
              <span
                className={`hidden md:block text-xs transition-colors duration-200 ${
                  active
                    ? "text-primary dark:text-primary-light font-semibold"
                    : done
                    ? "text-secondary font-medium"
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
      <p className="md:hidden text-xs text-foreground-muted text-center">
        Adım{" "}
        <span className="font-semibold text-primary dark:text-primary-light">{currentStep}</span> /{" "}
        {totalSteps} —{" "}
        <span className="text-foreground">{STEP_LABELS[currentStep - 1]}</span>
      </p>
    </div>
  );
}
