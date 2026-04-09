import type { ReactNode } from "react";

/*
 * Stripped-down motion wrappers — no animation, just passthrough divs.
 * Framer Motion removed from public-facing pages per redesign brief.
 * These exist so existing imports don't break.
 */

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  once?: boolean;
}

export function FadeIn({ children, className = "" }: FadeInProps) {
  return <div className={className}>{children}</div>;
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ children, className = "" }: StaggerContainerProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function ScaleIn({
  children,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
