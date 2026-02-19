interface IconProps {
  className?: string;
  size?: number;
}

export default function AnalysisIcon({ className = "", size = 24 }: IconProps) {
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
      {/* Row 1: completed — lime dot */}
      <circle cx="5" cy="8" r="2.5" fill="#A3E635" fillOpacity="0.80" stroke="#A3E635" strokeWidth="1" />
      <line x1="9" y1="8" x2="20" y2="8" stroke="#A3E635" strokeWidth="1.2" strokeOpacity="0.60" />

      {/* Row 2: in-progress — half filled */}
      <circle cx="5" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      <path d="M 5 10.5 A 2.5 2.5 0 0 1 5 15.5" fill="currentColor" fillOpacity="0.25" />
      <line x1="9" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.40" />

      {/* Row 3: pending — empty dot */}
      <circle cx="5" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.30" />
      <line x1="9" y1="18" x2="19" y2="18" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.25" />

      {/* Top accent underline */}
      <line x1="3" y1="4.5" x2="21" y2="4.5" stroke="#A3E635" strokeWidth="1.5" strokeOpacity="0.35" />
    </svg>
  );
}
