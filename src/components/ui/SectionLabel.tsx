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
  const barColor = variant === "default" ? "bg-primary-light" : "bg-secondary";
  const textColor = variant === "default" ? "text-foreground-muted" : "text-white/50";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`flex items-center gap-3 ${className}`}
    >
      <span className={`w-6 h-0.5 rounded-full ${barColor}`} />
      <span className={`text-xs font-medium tracking-widest uppercase ${textColor}`}>
        {children}
      </span>
    </motion.div>
  );
}
