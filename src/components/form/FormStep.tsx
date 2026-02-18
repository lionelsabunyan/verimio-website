import type { ReactNode } from "react";

interface FormStepProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function FormStep({ title, description, children }: FormStepProps) {
  return (
    <div className="bg-surface rounded-2xl border border-border shadow-sm p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {description && (
          <p className="text-sm text-foreground-secondary mt-1 leading-relaxed">{description}</p>
        )}
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}
