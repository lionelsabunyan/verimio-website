interface IconProps {
  className?: string;
  size?: number;
}

export default function DataReportingIcon({ className = "", size = 32 }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Baseline */}
      <line x1="4" y1="26" x2="28" y2="26" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" />

      {/* Bar 1 — short, raw data */}
      <rect x="6" y="20" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.35" />
      {/* Bar 2 — medium */}
      <rect x="13" y="15" width="4" height="11" rx="1" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.40" />
      {/* Bar 3 — tall */}
      <rect x="20" y="11" width="4" height="15" rx="1" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.45" />
      {/* Bar 4 — tallest, lime = final output */}
      <rect x="25" y="6" width="3" height="20" rx="1" stroke="#A3E635" strokeWidth="1.5" fill="#A3E635" fillOpacity="0.12" />

      {/* Data source indicator (top-left) */}
      <circle cx="6" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.35" />
      <line x1="8" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="1.5 2" />
      <line x1="8" y1="10" x2="13" y2="14" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.20" strokeDasharray="1.5 2" />

      {/* Trend arrow */}
      <path d="M 8 22 L 25 8" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="2 2" />
    </svg>
  );
}
