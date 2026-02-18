"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type LogoSize = "sm" | "md" | "lg" | "xl";
type LogoVariant = "wordmark" | "monogram";

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  href?: string;
  animated?: boolean;
}

const sizeMap: Record<LogoSize, { wordmark: string; monogram: number }> = {
  sm: { wordmark: "text-lg", monogram: 24 },
  md: { wordmark: "text-xl md:text-2xl", monogram: 32 },
  lg: { wordmark: "text-2xl md:text-3xl", monogram: 48 },
  xl: { wordmark: "text-3xl md:text-4xl", monogram: 64 },
};

function Wordmark({
  size = "md",
  className = "",
}: {
  size: LogoSize;
  className?: string;
}) {
  return (
    <span
      className={`font-bold tracking-[-0.02em] select-none ${sizeMap[size].wordmark} ${className}`}
    >
      <span className="text-current">verim</span>
      <span className="text-secondary">io</span>
    </span>
  );
}

function Monogram({
  size = "md",
  className = "",
}: {
  size: LogoSize;
  className?: string;
}) {
  const px = sizeMap[size].monogram;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Verimio"
    >
      <rect width="64" height="64" rx="14" fill="currentColor" className="text-primary" />
      <path
        d="M16 18L32 48L48 18"
        stroke="white"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="16" r="4.5" fill="#A3E635" />
    </svg>
  );
}

export default function Logo({
  variant = "wordmark",
  size = "md",
  className = "",
  href = "/",
  animated = true,
}: LogoProps) {
  const content =
    variant === "wordmark" ? (
      <Wordmark size={size} className={className} />
    ) : (
      <Monogram size={size} className={className} />
    );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center gap-2 group">
        {animated ? (
          <motion.div
            className="inline-flex items-center"
            whileHover={{ x: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {content}
          </motion.div>
        ) : (
          content
        )}
      </Link>
    );
  }

  return content;
}

export { Wordmark, Monogram };
