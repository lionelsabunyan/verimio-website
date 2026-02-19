interface IconProps {
  className?: string;
  size?: number;
}

export default function ROIIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {/* Axis */}
      <line x1="4" y1="19" x2="4" y2="5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="4" y1="19" x2="21" y2="19" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      {/* Rising line */}
      <path d="M 4 18 Q 10 16 14 12 Q 17 9 20 6" stroke="#A3E635" strokeWidth="1.5" fill="none" />
      {/* End point */}
      <circle cx="20" cy="6" r="2" fill="#A3E635" fillOpacity="0.7" stroke="#A3E635" strokeWidth="1" />
      {/* Up arrow */}
      <path d="M 18 5 L 20 3 L 22 5" stroke="#A3E635" strokeWidth="1.2" />
    </svg>
  );
}
