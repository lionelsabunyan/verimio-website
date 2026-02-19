interface IconProps {
  className?: string;
  size?: number;
}

export default function WorkflowAutomationIcon({ className = "", size = 32 }: IconProps) {
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
      {/* Node 1 (top-left) */}
      <circle cx="6" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Node 2 (top-right) */}
      <circle cx="26" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Node 3 (bottom-left) */}
      <circle cx="6" cy="24" r="3.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Node 4 (bottom-right) — lime = completed */}
      <circle cx="26" cy="24" r="3.5" stroke="#A3E635" strokeWidth="1.5" fill="#A3E635" fillOpacity="0.15" />

      {/* Bezier connections */}
      <path d="M 9.5 8 Q 16 8 22.5 8" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" />
      <path d="M 6 11.5 Q 6 16 6 20.5" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" />
      <path d="M 9.5 24 Q 16 24 22.5 24" stroke="#A3E635" strokeWidth="1.2" strokeOpacity="0.6" />
      <path d="M 26 11.5 Q 26 16 26 20.5" stroke="#A3E635" strokeWidth="1.2" strokeOpacity="0.6" />
      {/* Diagonal cross-connection */}
      <path d="M 9 10.5 Q 16 16 23 21.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="2 2" />

      {/* Checkmark in final node */}
      <path d="M 23.5 24 L 25.5 26 L 28.5 22" stroke="#A3E635" strokeWidth="1.5" />
    </svg>
  );
}
