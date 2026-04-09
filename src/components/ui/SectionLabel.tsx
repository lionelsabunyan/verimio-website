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
  const textColor = variant === "default" ? "text-foreground-muted" : "text-background/50";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`text-xs font-medium tracking-[0.15em] uppercase ${textColor}`}>
        {children}
      </span>
    </div>
  );
}
