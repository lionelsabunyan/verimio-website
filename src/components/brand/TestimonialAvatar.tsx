interface TestimonialAvatarProps {
  name: string;
  index?: number;
  size?: number;
  className?: string;
}

// Brand color combinations for avatar backgrounds
const COLOR_COMBOS = [
  { bg: "rgba(139,92,246,0.15)", stroke: "#8B5CF6", text: "#8B5CF6" },
  { bg: "rgba(163,230,53,0.12)", stroke: "#A3E635", text: "#4D7C0F" },
  { bg: "rgba(46,16,101,0.12)", stroke: "#2E1065", text: "#2E1065" },
] as const;

/**
 * Branded avatar for testimonials.
 * Renders a geometric SVG circle with the first letter of the name.
 */
export default function TestimonialAvatar({
  name,
  index = 0,
  size = 44,
  className = "",
}: TestimonialAvatarProps) {
  const combo = COLOR_COMBOS[index % COLOR_COMBOS.length];
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <svg
      viewBox="0 0 44 44"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label={name}
    >
      {/* Background fill */}
      <circle cx="22" cy="22" r="21" fill={combo.bg} />
      {/* Outer ring */}
      <circle cx="22" cy="22" r="20.5" stroke={combo.stroke} strokeWidth="1" strokeOpacity="0.40" />
      {/* Inner accent ring */}
      <circle cx="22" cy="22" r="16" stroke={combo.stroke} strokeWidth="0.5" strokeOpacity="0.20" />

      {/* Corner accent — geometric detail */}
      <path
        d="M 6 6 Q 6 2 10 2"
        stroke={combo.stroke}
        strokeWidth="1"
        strokeOpacity="0.25"
        strokeLinecap="round"
      />
      <path
        d="M 38 38 Q 38 42 34 42"
        stroke={combo.stroke}
        strokeWidth="1"
        strokeOpacity="0.20"
        strokeLinecap="round"
      />

      {/* Initial letter */}
      <text
        x="22"
        y="27"
        textAnchor="middle"
        fontSize="17"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="600"
        fill={combo.text}
        fillOpacity="0.85"
      >
        {initial}
      </text>

      {/* Lime accent dot */}
      <circle cx="34" cy="10" r="3" fill="#A3E635" fillOpacity="0.55" />
    </svg>
  );
}
