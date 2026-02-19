"use client";

import { motion } from "framer-motion";

interface SectionLabelProps {
  children: string;
  variant?: "default" | "light";
  className?: string;
}

export default function SectionLabel({
  children,
  variant = "default",
  className = "",
}: SectionLabelProps) {
  const dotColor =
    variant === "default" ? "bg-primary" : "bg-secondary";
  const textColor =
    variant === "default"
      ? "text-foreground-secondary"
      : "text-white/60";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`flex items-center gap-2 ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} opacity-60`} />
      <span
        className={`text-xs font-semibold tracking-widest uppercase ${textColor}`}
      >
        {children}
      </span>
    </motion.div>
  );
}
