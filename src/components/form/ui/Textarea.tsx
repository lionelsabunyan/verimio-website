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
      <label className="block text-sm font-medium text-foreground-secondary">
        {label}
        {required && <span className="ml-0.5 text-primary-light">*</span>}
      </label>
      <div
        className={`rounded-xl border transition-all duration-200 ${
          error
            ? "border-red-400 ring-2 ring-red-400/10"
            : "border-border dark:border-white/10 focus-within:border-primary-light focus-within:ring-2 focus-within:ring-primary-light/15"
        }`}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          className="w-full px-4 py-3 bg-surface text-sm text-foreground placeholder:text-foreground-muted outline-none resize-none rounded-xl"
        />
      </div>
      <div className="flex items-center justify-between">
        {error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : (
          <span />
        )}
        <span className={`text-xs tabular-nums ${nearLimit ? "text-red-400" : "text-foreground-muted"}`}>
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
