interface IconProps {
  className?: string;
  size?: number;
}

export default function CustomerExperienceIcon({ className = "", size = 32 }: IconProps) {
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
      {/* Customer circle (left) */}
      <circle cx="7" cy="16" r="5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Simple person silhouette inside */}
      <circle cx="7" cy="14" r="1.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M 4.5 19 Q 7 17 9.5 19" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />

      {/* Wave connection lines (communication) */}
      <path d="M 12 13 Q 15 11 18 13" stroke="#A3E635" strokeWidth="1.2" strokeOpacity="0.55" fill="none" />
      <path d="M 12 16 Q 15 15 18 16" stroke="#A3E635" strokeWidth="1.2" strokeOpacity="0.45" fill="none" />
      <path d="M 12 19 Q 15 21 18 19" stroke="#A3E635" strokeWidth="1.2" strokeOpacity="0.35" fill="none" />

      {/* Interface screen (right) */}
      <rect x="19" y="9" width="11" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Screen messages list */}
      <line x1="21.5" y1="13" x2="27.5" y2="13" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.60" />
      <line x1="21.5" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
      <line x1="21.5" y1="19" x2="27.5" y2="19" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.50" />
    </svg>
  );
}
