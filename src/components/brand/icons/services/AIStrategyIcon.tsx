interface IconProps {
  className?: string;
  size?: number;
}

export default function AIStrategyIcon({ className = "", size = 32 }: IconProps) {
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
      {/* Central circuit/brain node */}
      <rect x="11" y="11" width="10" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Center lime dot */}
      <circle cx="16" cy="16" r="2.5" fill="#A3E635" fillOpacity="0.70" />

      {/* North arm */}
      <line x1="16" y1="11" x2="16" y2="5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="16" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.35" />

      {/* South arm — longer */}
      <line x1="16" y1="21" x2="16" y2="28" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="16" cy="29" r="1.5" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.35" />

      {/* East arm */}
      <line x1="21" y1="16" x2="27" y2="16" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="28.5" cy="16" r="1.5" stroke="#A3E635" strokeWidth="1.2" strokeOpacity="0.60" />

      {/* West arm — short */}
      <line x1="11" y1="16" x2="5" y2="16" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" />
      <circle cx="3.5" cy="16" r="1.5" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.30" />

      {/* Inner circuit detail */}
      <line x1="13" y1="14" x2="19" y2="14" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.25" />
      <line x1="13" y1="18" x2="19" y2="18" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.25" />
    </svg>
  );
}
