"use client";

import type { BlogCategory } from "@/components/brand/BlogCardImage";

export type SocialAspect = "linkedin" | "instagram" | "twitter" | "story";

interface ArticlePostTemplateProps {
  title: string;
  category?: BlogCategory;
  date?: string;
  url?: string;
  aspect?: SocialAspect;
  className?: string;
}

const CATEGORY_LABELS: Record<BlogCategory, string> = {
  "ai-tools": "AI Araçları",
  "automation": "Otomasyon",
  "data": "Veri & Raporlama",
  "strategy": "Strateji",
  "security": "Veri Güvenliği",
  "customer": "Müşteri Deneyimi",
  "roi": "ROI & Verimlilik",
  "tutorial": "Rehber",
};

const DIMENSIONS: Record<SocialAspect, { width: number; height: number }> = {
  linkedin: { width: 1200, height: 628 },
  instagram: { width: 1080, height: 1080 },
  twitter: { width: 1200, height: 675 },
  story: { width: 1080, height: 1920 },
};

/**
 * Article share post template for social media.
 * Renders as an SVG-based preview at screen size for export.
 */
export default function ArticlePostTemplate({
  title,
  category,
  date,
  url = "verimio.com.tr/blog",
  aspect = "instagram",
  className = "",
}: ArticlePostTemplateProps) {
  const dims = DIMENSIONS[aspect];
  const isStory = aspect === "story";
  const isWide = aspect === "linkedin" || aspect === "twitter";
  const catLabel = category ? CATEGORY_LABELS[category] : "Blog";

  // Scaled view for screen rendering (max 600px wide)
  const scale = 600 / dims.width;
  const viewWidth = dims.width;
  const viewHeight = dims.height;
  const screenWidth = 600;
  const screenHeight = Math.round(viewHeight * scale);

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border ${className}`}
      style={{ width: screenWidth, height: screenHeight }}
    >
      <svg
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        width={screenWidth}
        height={screenHeight}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          <radialGradient id="ap-glow1" cx="80%" cy="20%" r="50%">
            <stop offset="0%" stopColor="#A3E635" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ap-glow2" cx="10%" cy="90%" r="40%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width={viewWidth} height={viewHeight} fill="#2E1065" />
        <rect width={viewWidth} height={viewHeight} fill="url(#ap-glow1)" />
        <rect width={viewWidth} height={viewHeight} fill="url(#ap-glow2)" />

        {/* Decorative geometric shapes */}
        <circle cx={viewWidth - 80} cy={80} r={120}
          stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.15" fill="none" />
        <circle cx={viewWidth - 80} cy={80} r={80}
          stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.10" fill="none" />
        <circle cx={80} cy={viewHeight - 80} r={90}
          stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.10" fill="none" />

        {/* Padding config */}
        {(() => {
          const pad = isStory ? 80 : 72;
          const logoY = isStory ? 100 : 60;
          const titleY = isStory ? viewHeight / 2 - 120 : viewHeight / 2 - 80;
          const titleFontSize = isStory ? 72 : isWide ? 56 : 64;
          const metaY = viewHeight - (isStory ? 120 : 80);
          const maxTitleChars = isStory ? 50 : isWide ? 70 : 55;
          const displayTitle = title.length > maxTitleChars
            ? title.substring(0, maxTitleChars - 3) + "..."
            : title;

          return (
            <>
              {/* Logo */}
              <g transform={`translate(${pad}, ${logoY})`}>
                {/* V monogram box */}
                <rect width="52" height="52" rx="14" fill="#A3E635" />
                <path d="M 10 12 L 26 42 L 42 12"
                  stroke="#2E1065" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="26" cy="10" r="5" fill="#1E0A46" />
                {/* Wordmark */}
                <text x="68" y="35"
                  fontSize="32" fontFamily="system-ui" fontWeight="700" letterSpacing="-0.02em">
                  <tspan fill="white">verim</tspan>
                  <tspan fill="#A3E635">io</tspan>
                </text>
              </g>

              {/* Title */}
              <text
                x={pad}
                y={titleY}
                fontSize={titleFontSize}
                fontFamily="system-ui"
                fontWeight="700"
                fill="white"
                style={{ letterSpacing: "-0.025em" }}
              >
                {displayTitle.split(" ").length > 5 ? (
                  // Multi-line for long titles
                  <>
                    <tspan x={pad} dy="0">{displayTitle.split(" ").slice(0, Math.ceil(displayTitle.split(" ").length / 2)).join(" ")}</tspan>
                    <tspan x={pad} dy={titleFontSize * 1.2}>{displayTitle.split(" ").slice(Math.ceil(displayTitle.split(" ").length / 2)).join(" ")}</tspan>
                  </>
                ) : displayTitle}
              </text>

              {/* Category badge */}
              <g transform={`translate(${pad}, ${metaY - 24})`}>
                <rect width={catLabel.length * 14 + 32} height={44} rx={10}
                  fill="#A3E635" />
                <text x="16" y="29"
                  fontSize="20" fontFamily="system-ui" fontWeight="700" fill="#2E1065">
                  {catLabel}
                </text>
              </g>

              {/* Date + URL */}
              {date && (
                <text x={pad + catLabel.length * 14 + 32 + 20} y={metaY - 4}
                  fontSize="18" fontFamily="system-ui" fill="rgba(255,255,255,0.40)">
                  {date}
                </text>
              )}
              <text x={viewWidth - pad} y={metaY - 4} textAnchor="end"
                fontSize="18" fontFamily="system-ui" fill="#4C4462">
                {url}
              </text>
            </>
          );
        })()}
      </svg>
    </div>
  );
}
