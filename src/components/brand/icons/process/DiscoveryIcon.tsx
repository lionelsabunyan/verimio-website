interface IconProps {
  className?: string;
  size?: number;
}

export default function DiscoveryIcon({ className = "", size = 24 }: IconProps) {
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
      {/* Building silhouette */}
      <rect x="7" y="6" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      {/* Internal org lines */}
      <line x1="9.5" y1="10" x2="14.5" y2="10" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="9.5" y1="13" x2="14.5" y2="13" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />

      {/* 4-direction inspection arrows */}
      {/* Top arrow */}
      <path d="M 12 5.5 L 12 3.5" stroke="#A3E635" strokeWidth="1.5" />
      <path d="M 11 4.5 L 12 3.5 L 13 4.5" stroke="#A3E635" strokeWidth="1.2" />
      {/* Bottom arrow */}
      <path d="M 12 19.5 L 12 21" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.45" />
      <path d="M 11 20 L 12 21 L 13 20" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.45" />
      {/* Left arrow */}
      <path d="M 6.5 12 L 4.5 12" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.45" />
      <path d="M 5.5 11 L 4.5 12 L 5.5 13" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.45" />
      {/* Right arrow */}
      <path d="M 17.5 12 L 19.5 12" stroke="#A3E635" strokeWidth="1.5" />
      <path d="M 18.5 11 L 19.5 12 L 18.5 13" stroke="#A3E635" strokeWidth="1.2" />
    </svg>
  );
}
