"use client";

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  required?: boolean;
}

export default function Textarea({
  label,
  value,
  onChange,
  error,
  placeholder,
  maxLength = 300,
  rows = 4,
  required = false,
}: TextareaProps) {
  const nearLimit = value.length >= maxLength - 20;

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground/80">
        {label}
        {required && <span className="ml-0.5 text-primary-light">*</span>}
      </label>
      <div
        className={`rounded-xl border transition-all duration-200 ${
          error
            ? "border-red-400 ring-2 ring-red-400/10"
            : "border-foreground/20 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10"
        }`}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          className="w-full px-4 py-3 bg-transparent text-sm text-foreground placeholder:text-muted/50 outline-none resize-none rounded-xl"
        />
      </div>
      <div className="flex items-center justify-between">
        {error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : (
          <span />
        )}
        <span className={`text-xs tabular-nums ${nearLimit ? "text-red-400" : "text-muted/50"}`}>
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
