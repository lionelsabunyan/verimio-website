interface IconProps {
  className?: string;
  size?: number;
}

export default function ExecutionIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Left circle: old state (X) */}
      <circle cx="6" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.45" />
      <line x1="4.2" y1="10.2" x2="7.8" y2="13.8" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.40" />
      <line x1="7.8" y1="10.2" x2="4.2" y2="13.8" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.40" />

      {/* Arrow: motion */}
      <path d="M 11.5 12 L 12.5 12" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" />
      <path d="M 11.5 12 L 13.5 12" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.30" />
      <path d="M 11 12 L 14 12 L 12.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.40" fill="none" />
      <path d="M 14 12 L 12.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.40" />

      {/* Right circle: new state — lime */}
      <circle cx="18" cy="12" r="4.5" stroke="#A3E635" strokeWidth="1.5" fill="#A3E635" fillOpacity="0.10" />
      {/* Checkmark */}
      <path d="M 15.8 12.2 L 17.2 13.8 L 20.2 10.5" stroke="#A3E635" strokeWidth="1.5" />
    </svg>
  );
}
