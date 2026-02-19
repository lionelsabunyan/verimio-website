interface IconProps {
  className?: string;
  size?: number;
}

export default function TimeIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="12" y1="7" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="12" x2="15.5" y2="14.5" stroke="#A3E635" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.5" fill="#A3E635" fillOpacity="0.7" />
    </svg>
  );
}
