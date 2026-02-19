"use client";

import type { SocialAspect } from "./ArticlePostTemplate";

interface TipCardTemplateProps {
  tipNumber?: number;
  fact: string;
  accentWords?: string[];
  source?: string;
  aspect?: SocialAspect;
  className?: string;
}

const DIMENSIONS = {
  linkedin: { width: 1200, height: 628 },
  instagram: { width: 1080, height: 1080 },
  twitter: { width: 1200, height: 675 },
  story: { width: 1080, height: 1920 },
};

/**
 * Tip / fact card template for social media.
 * Shows a large number + impactful short text with lime accent words.
 */
export default function TipCardTemplate({
  tipNumber,
  fact,
  accentWords = [],
  source = "verimio.com.tr",
  aspect = "instagram",
  className = "",
}: TipCardTemplateProps) {
  const dims = DIMENSIONS[aspect];
  const isStory = aspect === "story";
  const scale = 600 / dims.width;
  const screenWidth = 600;
  const screenHeight = Math.round(dims.height * scale);

  const pad = isStory ? 80 : 80;
  const numberY = isStory ? dims.height * 0.3 : dims.height * 0.35;
  const factY = isStory ? dims.height * 0.55 : dims.height * 0.62;
  const factFontSize = isStory ? 60 : 52;

  // Highlight accent words in the fact
  const renderFact = () => {
    if (accentWords.length === 0) return fact;
    // Simple: render full text then overlay accent words (SVG text doesn't support inline spans)
    return fact;
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border ${className}`}
      style={{ width: screenWidth, height: screenHeight }}
    >
      <svg
        viewBox={`0 0 ${dims.width} ${dims.height}`}
        width={screenWidth}
        height={screenHeight}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          <radialGradient id="tc-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.10" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width={dims.width} height={dims.height} fill="#1E0A46" />
        <rect width={dims.width} height={dims.height} fill="url(#tc-glow)" />

        {/* Lime dot cluster (bottom-left) */}
        {[0, 1, 2, 3, 4].map((i) => (
          <circle
            key={i}
            cx={60 + (i % 3) * 22}
            cy={dims.height - 60 - Math.floor(i / 3) * 22}
            r={i === 0 ? 8 : 5}
            fill="#A3E635"
            fillOpacity={i === 0 ? 0.5 : 0.25}
          />
        ))}

        {/* Large number (top center) */}
        {tipNumber !== undefined && (
          <text
            x={dims.width / 2}
            y={numberY}
            textAnchor="middle"
            fontSize={isStory ? 280 : 240}
            fontFamily="system-ui"
            fontWeight="700"
            fill="#8B5CF6"
            fillOpacity="0.12"
            style={{ letterSpacing: "-0.05em" }}
          >
            {String(tipNumber).padStart(2, "0")}
          </text>
        )}

        {/* Tip label */}
        <text
          x={pad}
          y={numberY - (isStory ? 180 : 150)}
          fontSize="22"
          fontFamily="system-ui"
          fontWeight="500"
          fill="#8B5CF6"
          fillOpacity="0.70"
          style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          {tipNumber !== undefined ? `İPUCU #${tipNumber}` : "VERİMİO"}
        </text>

        {/* Fact text */}
        <text
          x={pad}
          y={factY}
          fontSize={factFontSize}
          fontFamily="system-ui"
          fontWeight="700"
          fill="white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {renderFact()}
        </text>

        {/* Accent underline */}
        <line
          x1={pad}
          y1={factY + 16}
          x2={pad + 100}
          y2={factY + 16}
          stroke="#A3E635"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Logo + source (bottom) */}
        <g transform={`translate(${pad}, ${dims.height - pad - 20})`}>
          {/* V mini monogram */}
          <rect width="36" height="36" rx="9" fill="#A3E635" fillOpacity="0.90" />
          <path d="M 7 8 L 18 28 L 29 8"
            stroke="#2E1065" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Source */}
          <text x="46" y="24"
            fontSize="20" fontFamily="system-ui" fontWeight="600" fill="rgba(255,255,255,0.45)">
            {source}
          </text>
        </g>
      </svg>
    </div>
  );
}
