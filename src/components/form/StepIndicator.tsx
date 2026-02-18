"use client";

import { motion } from "framer-motion";

const STEP_LABELS = ["Sektör", "Süreçler", "İletişim"];

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps = 3,
}: StepIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="relative h-1 bg-foreground/10 rounded-full overflow-hidden">
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
                    ? "bg-primary ring-2 ring-primary/25 ring-offset-1"
                    : "bg-foreground/20"
                }`}
                animate={{ scale: active ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
              <span
                className={`hidden md:block text-xs transition-colors duration-200 ${
                  active
                    ? "text-primary font-semibold"
                    : done
                    ? "text-secondary font-medium"
                    : "text-muted"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile label */}
      <p className="md:hidden text-xs text-muted text-center">
        Adım{" "}
        <span className="font-semibold text-primary">{currentStep}</span> /{" "}
        {totalSteps} —{" "}
        <span className="text-foreground">{STEP_LABELS[currentStep - 1]}</span>
      </p>
    </div>
  );
}
