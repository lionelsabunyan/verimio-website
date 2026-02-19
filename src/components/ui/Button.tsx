"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  external?: boolean;
}

const variants = {
  primary:
    "bg-secondary text-primary font-semibold hover:bg-secondary/90 shadow-sm hover:shadow-secondary/30",
  secondary:
    "bg-primary text-white font-semibold hover:bg-primary/90 shadow-sm hover:shadow-primary/20",
  outline:
    "border border-foreground/30 text-foreground font-medium hover:border-foreground/60 hover:bg-foreground/5",
  ghost:
    "text-foreground-secondary font-medium hover:text-foreground hover:bg-foreground/5",
};

const sizes = {
  sm: "px-4 py-2 text-xs gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-8 py-4 text-base gap-2",
};

const iconSizes = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export default function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
  icon = true,
  className = "",
  disabled = false,
  type = "button",
  external = false,
}: ButtonProps) {
  const baseClass = `
    inline-flex items-center justify-center rounded-full
    transition-colors duration-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  const content = (
    <>
      {children}
      {icon && <ArrowUpRight className={iconSizes[size]} aria-hidden="true" />}
    </>
  );

  const motionProps = {
    whileTap: { scale: disabled ? 1 : 0.96 },
    whileHover: { scale: disabled ? 1 : 1.02 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link
          href={href}
          className={baseClass}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
    >
      {content}
    </motion.button>
  );
}
