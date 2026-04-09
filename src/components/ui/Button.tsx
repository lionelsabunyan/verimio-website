import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  external?: boolean;
}

const variants = {
  primary: "bg-foreground text-background font-medium hover:opacity-90",
  outline: "border border-foreground/30 text-foreground font-medium hover:border-foreground",
  ghost: "text-foreground-secondary font-medium hover:text-foreground",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
  icon = false,
  className = "",
  disabled = false,
  type = "button",
  external = false,
}: ButtonProps) {
  const baseClass = `
    inline-flex items-center justify-center
    transition-all duration-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant] || variants.primary}
    ${sizes[size]}
    ${className}
  `.trim();

  const content = (
    <>
      {children}
      {icon && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-2">
          <line x1="4" y1="12" x2="12" y2="4" />
          <polyline points="6,4 12,4 12,10" />
        </svg>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={baseClass}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
    >
      {content}
    </button>
  );
}
