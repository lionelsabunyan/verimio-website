interface IconProps {
  className?: string;
  size?: number;
}

export default function CheckUpIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {/* Clipboard */}
      <rect x="5" y="4" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Clip top */}
      <path d="M 9 4 Q 9 2.5 12 2.5 Q 15 2.5 15 4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
      {/* Check lines */}
      <path d="M 8 11 L 10.5 13.5 L 16 8" stroke="#A3E635" strokeWidth="1.5" />
      {/* Line rows */}
      <line x1="8" y1="16.5" x2="16" y2="16.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.30" />
      <line x1="8" y1="19" x2="13" y2="19" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
    </svg>
  );
}
