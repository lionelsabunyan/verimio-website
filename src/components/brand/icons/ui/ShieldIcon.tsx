interface IconProps {
  className?: string;
  size?: number;
}

export default function ShieldIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {/* Shield path */}
      <path d="M 12 2.5 L 20 6 L 20 13 Q 20 18 12 21.5 Q 4 18 4 13 L 4 6 Z"
        stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
      {/* Inner shield accent */}
      <path d="M 12 5 L 17.5 7.5 L 17.5 13 Q 17.5 16.5 12 19 Q 6.5 16.5 6.5 13 L 6.5 7.5 Z"
        stroke="#A3E635" strokeWidth="1" strokeOpacity="0.35" fill="none" />
      {/* Check in center */}
      <path d="M 9 12.5 L 11 14.5 L 15 10" stroke="#A3E635" strokeWidth="1.5" />
    </svg>
  );
}
