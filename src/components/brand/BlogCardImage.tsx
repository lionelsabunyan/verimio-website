"use client";

export type BlogCategory =
  | "ai-tools"
  | "automation"
  | "data"
  | "strategy"
  | "security"
  | "customer"
  | "roi"
  | "tutorial";

interface BlogCardImageProps {
  index: number;
  title?: string;
  category?: BlogCategory;
  className?: string;
}

/**
 * Branded SVG pattern for blog card featured images.
 * 8 pattern variants: 4 base patterns (index % 4) + 4 category overlays.
 * Category prop selects a semantic pattern that reflects the post topic.
 */
export default function BlogCardImage({
  index,
  title = "",
  category,
  className = "",
}: BlogCardImageProps) {
  // Category overrides the base pattern index when provided
  const categoryPatternMap: Record<BlogCategory, number> = {
    "ai-tools": 0,
    "automation": 1,
    "data": 2,
    "strategy": 3,
    "security": 4,
    "customer": 5,
    "roi": 6,
    "tutorial": 7,
  };

  const pattern = category !== undefined ? categoryPatternMap[category] : index % 4;
  const uid = `${index}-${category ?? "base"}`;

  // Background gradient configs per pattern
  const gradients: Record<number, [string, string]> = {
    0: ["#2E1065", "#1E0A46"],
    1: ["#1E0A46", "#0F0A1E"],
    2: ["#0F0A1E", "#2E1065"],
    3: ["#1E1B4B", "#1E0A46"],
    4: ["#0F0A1E", "#1E0A46"],
    5: ["#2E1065", "#0F0A1E"],
    6: ["#1E0A46", "#2E1065"],
    7: ["#1E1B4B", "#2E1065"],
  };
  const [gradFrom, gradTo] = gradients[pattern] ?? ["#2E1065", "#1E0A46"];

  return (
    <div
      className={`relative w-full aspect-[16/10] overflow-hidden rounded-xl ${className}`}
      aria-label={title}
    >
      <svg
        viewBox="0 0 400 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="400" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={gradFrom} />
            <stop offset="100%" stopColor={gradTo} />
          </linearGradient>
          <radialGradient id={`glow-${uid}`} cx="75%" cy="25%" r="60%">
            <stop offset="0%" stopColor="#A3E635" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="250" fill={`url(#bg-${uid})`} />
        <rect width="400" height="250" fill={`url(#glow-${uid})`} />

        {/* ── PATTERN 0: Circle clusters (ai-tools) ── */}
        {pattern === 0 && (
          <g opacity="0.3">
            <circle cx="300" cy="60" r="45" stroke="#8B5CF6" strokeWidth="1" fill="none" />
            <circle cx="300" cy="60" r="30" stroke="#8B5CF6" strokeWidth="1" fill="none" />
            <circle cx="300" cy="60" r="15" stroke="#A3E635" strokeWidth="1.5" fill="none" />
            <circle cx="120" cy="180" r="25" stroke="#8B5CF6" strokeWidth="0.5" fill="none" />
            <circle cx="120" cy="180" r="12" stroke="#A3E635" strokeWidth="1" fill="none" />
            <circle cx="350" cy="200" r="8" fill="#A3E635" fillOpacity="0.2" />
            <circle cx="80" cy="50" r="5" fill="#8B5CF6" fillOpacity="0.3" />
          </g>
        )}

        {/* ── PATTERN 1: Diagonal lines (automation) ── */}
        {pattern === 1 && (
          <g opacity="0.25">
            {Array.from({ length: 8 }, (_, i) => (
              <line
                key={i}
                x1={50 + i * 50}
                y1="0"
                x2={i * 50}
                y2="250"
                stroke={i % 3 === 0 ? "#A3E635" : "#8B5CF6"}
                strokeWidth={i % 3 === 0 ? "1.5" : "0.5"}
              />
            ))}
            <circle cx="320" cy="70" r="20" fill="#A3E635" fillOpacity="0.1" />
            <circle cx="100" cy="190" r="30" fill="#8B5CF6" fillOpacity="0.1" />
          </g>
        )}

        {/* ── PATTERN 2: Concentric arcs (data) ── */}
        {pattern === 2 && (
          <g opacity="0.3">
            {Array.from({ length: 5 }, (_, i) => (
              <path
                key={i}
                d={`M 350 250 A ${60 + i * 35} ${60 + i * 35} 0 0 0 ${350 - (60 + i * 35)} 250`}
                stroke={i % 2 === 0 ? "#8B5CF6" : "#A3E635"}
                strokeWidth={i === 0 ? "1.5" : "0.7"}
                fill="none"
              />
            ))}
            <circle cx="60" cy="40" r="10" fill="#A3E635" fillOpacity="0.15" />
            <circle cx="200" cy="80" r="4" fill="#8B5CF6" fillOpacity="0.3" />
          </g>
        )}

        {/* ── PATTERN 3: Dot grid (strategy) ── */}
        {pattern === 3 && (
          <g opacity="0.25">
            {Array.from({ length: 8 }, (_, row) =>
              Array.from({ length: 12 }, (_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={35 + col * 32}
                  cy={30 + row * 30}
                  r={(row + col) % 5 === 0 ? 3 : 1.5}
                  fill={(row + col) % 5 === 0 ? "#A3E635" : "#8B5CF6"}
                  fillOpacity={(row + col) % 5 === 0 ? 0.5 : 0.2}
                />
              ))
            )}
          </g>
        )}

        {/* ── PATTERN 4: Shield / lock (security) ── */}
        {pattern === 4 && (
          <g opacity="0.28">
            {/* Main shield */}
            <path d="M 280 30 L 340 50 L 340 120 Q 310 150 280 160 Q 250 150 250 120 L 250 50 Z"
              stroke="#8B5CF6" strokeWidth="1.5" fill="#8B5CF6" fillOpacity="0.05" />
            {/* Inner shield */}
            <path d="M 280 50 L 322 64 L 322 115 Q 301 136 280 144 Q 259 136 259 115 L 259 64 Z"
              stroke="#A3E635" strokeWidth="1" fill="none" />
            {/* Lock body */}
            <rect x="270" y="95" width="20" height="16" rx="3" stroke="#A3E635" strokeWidth="1.2" fill="none" />
            <path d="M 274 95 Q 274 85 280 85 Q 286 85 286 95" stroke="#A3E635" strokeWidth="1.2" fill="none" />
            {/* Secondary shapes */}
            <circle cx="80" cy="60" r="35" stroke="#8B5CF6" strokeWidth="0.8" fill="none" />
            <circle cx="80" cy="60" r="20" stroke="#8B5CF6" strokeWidth="0.5" fill="none" />
            <rect x="140" y="160" width="60" height="60" rx="6"
              stroke="#8B5CF6" strokeWidth="0.8" fill="none" transform="rotate(15 170 190)" />
          </g>
        )}

        {/* ── PATTERN 5: Network nodes (customer) ── */}
        {pattern === 5 && (
          <g opacity="0.30">
            {/* Central hub */}
            <circle cx="200" cy="125" r="20" stroke="#A3E635" strokeWidth="1.5" fill="#A3E635" fillOpacity="0.06" />
            {/* Satellite nodes */}
            {[
              [80, 60], [320, 60], [360, 180], [40, 180], [200, 30], [200, 220],
            ].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r={10 - (i % 3) * 2}
                  stroke="#8B5CF6" strokeWidth="1" fill="none" />
                <line x1={cx} y1={cy} x2={200} y2={125}
                  stroke="#8B5CF6" strokeWidth="0.7" strokeOpacity="0.5" strokeDasharray="3 4" />
              </g>
            ))}
            {/* Secondary connections */}
            <line x1="80" y1="60" x2="320" y2="60" stroke="#8B5CF6" strokeWidth="0.5" strokeOpacity="0.3" />
            <line x1="80" y1="60" x2="40" y2="180" stroke="#8B5CF6" strokeWidth="0.5" strokeOpacity="0.25" />
          </g>
        )}

        {/* ── PATTERN 6: Rising curve (roi) ── */}
        {pattern === 6 && (
          <g opacity="0.30">
            {/* Axis lines */}
            <line x1="50" y1="30" x2="50" y2="210" stroke="#8B5CF6" strokeWidth="1.5" />
            <line x1="50" y1="210" x2="380" y2="210" stroke="#8B5CF6" strokeWidth="1.5" />
            {/* Grid lines */}
            {[60, 110, 160].map((y, i) => (
              <line key={i} x1="50" y1={y} x2="380" y2={y}
                stroke="#8B5CF6" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4 6" />
            ))}
            {/* Rising bezier curve */}
            <path d="M 50 200 Q 150 195 200 160 Q 260 110 380 40"
              stroke="#A3E635" strokeWidth="2" fill="none" />
            {/* Area fill under curve */}
            <path d="M 50 200 Q 150 195 200 160 Q 260 110 380 40 L 380 210 L 50 210 Z"
              fill="#A3E635" fillOpacity="0.05" />
            {/* Data points */}
            {[[100, 195], [160, 175], [220, 148], [290, 95], [350, 55]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={i === 4 ? 4 : 3}
                fill={i === 4 ? "#A3E635" : "#8B5CF6"} fillOpacity={i === 4 ? 0.8 : 0.4} />
            ))}
          </g>
        )}

        {/* ── PATTERN 7: Step numbers (tutorial) ── */}
        {pattern === 7 && (
          <g opacity="0.28">
            {/* Step 1 */}
            <circle cx="90" cy="80" r="28" stroke="#8B5CF6" strokeWidth="1.5" fill="#8B5CF6" fillOpacity="0.05" />
            <text x="90" y="88" textAnchor="middle" fontSize="24" fontFamily="monospace"
              fill="#8B5CF6" fillOpacity="0.5">1</text>
            {/* Step 2 */}
            <circle cx="200" cy="125" r="28" stroke="#8B5CF6" strokeWidth="1.5" fill="#8B5CF6" fillOpacity="0.05" />
            <text x="200" y="133" textAnchor="middle" fontSize="24" fontFamily="monospace"
              fill="#8B5CF6" fillOpacity="0.5">2</text>
            {/* Step 3 — lime = final */}
            <circle cx="310" cy="80" r="28" stroke="#A3E635" strokeWidth="1.5" fill="#A3E635" fillOpacity="0.06" />
            <text x="310" y="88" textAnchor="middle" fontSize="24" fontFamily="monospace"
              fill="#A3E635" fillOpacity="0.6">3</text>
            {/* Connectors */}
            <line x1="118" y1="80" x2="172" y2="110" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
            <line x1="228" y1="110" x2="282" y2="80" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
            {/* Decorative sub-elements */}
            <rect x="60" y="160" width="60" height="50" rx="4" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.25" fill="none" />
            <rect x="170" y="185" width="60" height="35" rx="4" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.25" fill="none" />
            <rect x="280" y="160" width="60" height="55" rx="4" stroke="#A3E635" strokeWidth="0.8" strokeOpacity="0.35" fill="none" />
          </g>
        )}

        {/* Verimio monogram watermark */}
        <g opacity="0.08" transform="translate(170, 95)">
          <path
            d="M16 18L32 48L48 18"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="14" r="3.5" fill="#A3E635" />
        </g>
      </svg>
    </div>
  );
}
