interface IconProps {
  className?: string;
  size?: number;
}

export default function RoadmapIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {/* Horizontal road line */}
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.30" strokeDasharray="3 3" />
      {/* Milestone 1 */}
      <circle cx="7" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
      <circle cx="7" cy="12" r="1.2" fill="currentColor" fillOpacity="0.35" />
      {/* Milestone 2 */}
      <circle cx="14" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
      <circle cx="14" cy="12" r="1.2" fill="currentColor" fillOpacity="0.35" />
      {/* Milestone 3 — lime = destination */}
      <circle cx="20" cy="12" r="3" stroke="#A3E635" strokeWidth="1.5" fill="#A3E635" fillOpacity="0.12" />
      <circle cx="20" cy="12" r="1.2" fill="#A3E635" fillOpacity="0.70" />
      {/* 90-day label hint */}
      <line x1="20" y1="8" x2="20" y2="5.5" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.40" />
    </svg>
  );
}
