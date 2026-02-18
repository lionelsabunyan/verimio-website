"use client";

interface BlogCardImageProps {
  index: number;
  title?: string;
  className?: string;
}

/**
 * Branded SVG pattern for blog card featured images.
 * 4 pattern variants cycle based on index.
 */
export default function BlogCardImage({
  index,
  title = "",
  className = "",
}: BlogCardImageProps) {
  const pattern = index % 4;

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
        {/* Base gradient */}
        <defs>
          <linearGradient id={`bg-${index}`} x1="0" y1="0" x2="400" y2="250" gradientUnits="userSpaceOnUse">
            {pattern === 0 && (
              <>
                <stop offset="0%" stopColor="#2E1065" />
                <stop offset="100%" stopColor="#1E0A46" />
              </>
            )}
            {pattern === 1 && (
              <>
                <stop offset="0%" stopColor="#1E0A46" />
                <stop offset="100%" stopColor="#0F0A1E" />
              </>
            )}
            {pattern === 2 && (
              <>
                <stop offset="0%" stopColor="#0F0A1E" />
                <stop offset="100%" stopColor="#2E1065" />
              </>
            )}
            {pattern === 3 && (
              <>
                <stop offset="0%" stopColor="#1E1B4B" />
                <stop offset="100%" stopColor="#1E0A46" />
              </>
            )}
          </linearGradient>
          <radialGradient id={`glow-${index}`} cx="75%" cy="25%" r="60%">
            <stop offset="0%" stopColor="#A3E635" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="250" fill={`url(#bg-${index})`} />
        <rect width="400" height="250" fill={`url(#glow-${index})`} />

        {/* Pattern 0: Circle clusters */}
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

        {/* Pattern 1: Diagonal lines */}
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

        {/* Pattern 2: Concentric arcs */}
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

        {/* Pattern 3: Dot grid */}
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
