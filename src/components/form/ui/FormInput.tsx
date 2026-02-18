"use client";

interface FormInputProps {
  label: string;
  type?: "text" | "email" | "tel";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
}

export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  optional = false,
}: FormInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground-secondary">
        {label}
        {optional && (
          <span className="ml-1.5 text-xs text-foreground-muted font-normal">(opsiyonel)</span>
        )}
        {required && <span className="ml-0.5 text-primary-light">*</span>}
      </label>
      <div
        className={`flex items-center rounded-xl border transition-all duration-200 ${
          error
            ? "border-red-400 ring-2 ring-red-400/10"
            : "border-border focus-within:border-primary-light focus-within:ring-2 focus-within:ring-primary-light/15"
        }`}
      >
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-surface text-sm text-foreground placeholder:text-foreground-muted outline-none rounded-xl"
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
