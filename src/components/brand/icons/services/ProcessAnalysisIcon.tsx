interface IconProps {
  className?: string;
  size?: number;
}

export default function ProcessAnalysisIcon({ className = "", size = 32 }: IconProps) {
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
      {/* Left: disordered block (problem state) */}
      <rect x="2" y="8" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="5" y1="13" x2="9" y2="13" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="5" y1="17" x2="10" y2="15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
      <line x1="5" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />

      {/* Arrow — transformation */}
      <path d="M 14 16 L 18 16" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      <path d="M 16 13 L 19 16 L 16 19" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Right: ordered block (result state) — lime accent */}
      <rect x="20" y="8" width="10" height="16" rx="2" stroke="#A3E635" strokeWidth="1.5" />
      <line x1="23" y1="13" x2="27" y2="13" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.7" />
      <line x1="23" y1="17" x2="27" y2="17" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.7" />
      <line x1="23" y1="21" x2="27" y2="21" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.7" />
    </svg>
  );
}
