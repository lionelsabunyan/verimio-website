interface HakkimizdaHeroIllustrationProps {
  className?: string;
}

/**
 * "Structured Flow" illustration for Hakkımızda hero section.
 * Depicts: corporate structure → bottleneck analysis → clean output → metrics.
 * Colors: #8B5CF6 (purple) for structures, #A3E635 (lime) for outcomes only.
 */
export default function HakkimizdaHeroIllustration({
  className = "",
}: HakkimizdaHeroIllustrationProps) {
  return (
    <svg
      viewBox="0 0 480 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hh-glow" cx="60%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#A3E635" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#A3E635" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hh-glow2" cx="20%" cy="80%" r="45%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background glow */}
      <rect width="480" height="520" fill="url(#hh-glow)" />
      <rect width="480" height="520" fill="url(#hh-glow2)" />

      {/* ── SECTION 1: Corporate structure (top) ── */}

      {/* Main building outline */}
      <rect x="160" y="32" width="160" height="120" rx="6"
        stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.25" />

      {/* Internal floors / org lines */}
      <line x1="175" y1="70" x2="305" y2="70" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.15" />
      <line x1="175" y1="95" x2="305" y2="95" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.15" />
      <line x1="175" y1="120" x2="305" y2="120" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.12" />

      {/* Row content (process items in building) */}
      <rect x="185" y="57" width="40" height="6" rx="3" fill="#8B5CF6" fillOpacity="0.18" />
      <rect x="233" y="57" width="60" height="6" rx="3" fill="#8B5CF6" fillOpacity="0.12" />

      <rect x="185" y="82" width="55" height="6" rx="3" fill="#8B5CF6" fillOpacity="0.18" />
      <rect x="249" y="82" width="40" height="6" rx="3" fill="#8B5CF6" fillOpacity="0.10" />

      <rect x="185" y="107" width="30" height="6" rx="3" fill="#8B5CF6" fillOpacity="0.15" />
      <rect x="224" y="107" width="70" height="6" rx="3" fill="#8B5CF6" fillOpacity="0.10" />

      {/* "Verimio enters" — incoming dots toward building */}
      <circle cx="100" cy="76" r="3" fill="#A3E635" fillOpacity="0.5" />
      <circle cx="120" cy="76" r="2" fill="#A3E635" fillOpacity="0.35" />
      <circle cx="137" cy="76" r="1.5" fill="#A3E635" fillOpacity="0.20" />
      <line x1="100" y1="76" x2="160" y2="76" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.20" strokeDasharray="3 4" />

      {/* Small satellite boxes (departments) */}
      <rect x="48" y="48" width="60" height="36" rx="4"
        stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.18" />
      <line x1="63" y1="62" x2="98" y2="62" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.15" />
      <line x1="63" y1="72" x2="88" y2="72" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.12" />

      <rect x="372" y="52" width="56" height="32" rx="4"
        stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.15" />
      <line x1="385" y1="64" x2="418" y2="64" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.12" />
      <line x1="385" y1="73" x2="408" y2="73" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.10" />

      {/* Connector lines to main building */}
      <line x1="108" y1="66" x2="160" y2="66" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.12" />
      <line x1="328" y1="68" x2="372" y2="68" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.10" />

      {/* ── SECTION 2: Bottleneck → Filter → Clean Output ── */}

      {/* Incoming data — chaotic/broken lines */}
      <g strokeOpacity="0.20" stroke="#8B5CF6">
        <line x1="40" y1="210" x2="100" y2="215" strokeWidth="1.5" />
        <line x1="40" y1="225" x2="90" y2="220" strokeWidth="1" />
        <line x1="40" y1="240" x2="95" y2="245" strokeWidth="1.5" />
        <line x1="40" y1="255" x2="85" y2="248" strokeWidth="0.8" />
        <line x1="40" y1="268" x2="92" y2="262" strokeWidth="1" />
      </g>
      {/* Chaos breaks — small interrupts */}
      <circle cx="72" cy="215" r="2" fill="#8B5CF6" fillOpacity="0.25" />
      <circle cx="65" cy="242" r="1.5" fill="#8B5CF6" fillOpacity="0.20" />
      <circle cx="80" cy="258" r="2.5" fill="#8B5CF6" fillOpacity="0.18" />

      {/* Filter / lens shape */}
      <path d="M 100 195 L 180 215 L 180 265 L 100 285 Z"
        stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.30" fill="#8B5CF6" fillOpacity="0.04" />
      {/* Filter internal lines */}
      <line x1="112" y1="220" x2="168" y2="225" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.20" />
      <line x1="110" y1="235" x2="168" y2="237" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.18" />
      <line x1="113" y1="250" x2="167" y2="250" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.15" />
      <line x1="115" y1="264" x2="165" y2="262" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.12" />
      {/* Filter label dot */}
      <circle cx="140" cy="240" r="5" fill="#A3E635" fillOpacity="0.20" />
      <circle cx="140" cy="240" r="2" fill="#A3E635" fillOpacity="0.50" />

      {/* Clean output — parallel, ordered lines */}
      <g strokeLinecap="round">
        <line x1="180" y1="218" x2="440" y2="218" stroke="#A3E635" strokeWidth="1.5" strokeOpacity="0.25" />
        <line x1="180" y1="232" x2="440" y2="232" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.18" />
        <line x1="180" y1="248" x2="440" y2="248" stroke="#A3E635" strokeWidth="1.5" strokeOpacity="0.22" />
        <line x1="180" y1="262" x2="440" y2="262" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.15" />
      </g>

      {/* Flow direction markers */}
      <path d="M 320 210 L 330 218 L 320 226" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.30" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M 380 224 L 390 232 L 380 240" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Section label: "Verimio Analizi" */}
      <rect x="185" y="195" width="88" height="18" rx="4"
        fill="#8B5CF6" fillOpacity="0.10" />
      <rect x="192" y="200" width="30" height="5" rx="2.5" fill="#8B5CF6" fillOpacity="0.25" />
      <rect x="228" y="200" width="38" height="5" rx="2.5" fill="#8B5CF6" fillOpacity="0.18" />

      {/* ── SECTION 3: Output metrics (bottom) ── */}

      {/* Divider */}
      <line x1="40" y1="310" x2="440" y2="310" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.12" />

      {/* Three metric columns */}
      {/* Column 1: Time */}
      <g>
        {/* Bar 1 */}
        <rect x="80" y="388" width="28" height="80" rx="3" fill="#8B5CF6" fillOpacity="0.10" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.20" />
        {/* Bar 2 */}
        <rect x="80" y="360" width="28" height="108" rx="3" fill="#8B5CF6" fillOpacity="0.14" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.20" />
        {/* Bar 3 — lime highlight (result/final state) */}
        <rect x="80" y="338" width="28" height="130" rx="3" fill="#A3E635" fillOpacity="0.22" stroke="#A3E635" strokeWidth="1.5" strokeOpacity="0.45" />

        {/* Base line */}
        <line x1="68" y1="470" x2="130" y2="470" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.20" />
        {/* Label */}
        <rect x="72" y="478" width="48" height="5" rx="2.5" fill="#8B5CF6" fillOpacity="0.18" />
      </g>

      {/* Column 2: Cost */}
      <g>
        <rect x="216" y="400" width="28" height="68" rx="3" fill="#8B5CF6" fillOpacity="0.10" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.20" />
        <rect x="216" y="372" width="28" height="96" rx="3" fill="#8B5CF6" fillOpacity="0.14" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.20" />
        <rect x="216" y="344" width="28" height="124" rx="3" fill="#A3E635" fillOpacity="0.22" stroke="#A3E635" strokeWidth="1.5" strokeOpacity="0.45" />

        <line x1="204" y1="470" x2="266" y2="470" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.20" />
        <rect x="208" y="478" width="48" height="5" rx="2.5" fill="#8B5CF6" fillOpacity="0.18" />
      </g>

      {/* Column 3: ROI */}
      <g>
        <rect x="352" y="412" width="28" height="56" rx="3" fill="#8B5CF6" fillOpacity="0.10" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.20" />
        <rect x="352" y="380" width="28" height="88" rx="3" fill="#8B5CF6" fillOpacity="0.14" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.20" />
        <rect x="352" y="330" width="28" height="138" rx="3" fill="#A3E635" fillOpacity="0.28" stroke="#A3E635" strokeWidth="1.5" strokeOpacity="0.55" />

        <line x1="340" y1="470" x2="402" y2="470" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.20" />
        <rect x="344" y="478" width="48" height="5" rx="2.5" fill="#8B5CF6" fillOpacity="0.18" />
      </g>

      {/* Connecting vertical lines from section 2 output to metrics */}
      <line x1="94" y1="272" x2="94" y2="325" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="3 4" />
      <line x1="230" y1="265" x2="230" y2="325" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.12" strokeDasharray="3 4" />
      <line x1="366" y1="270" x2="366" y2="325" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.10" strokeDasharray="3 4" />

      {/* Metric dots at top of lime bars */}
      <circle cx="94" cy="338" r="4" fill="#A3E635" fillOpacity="0.60" />
      <circle cx="230" cy="344" r="4" fill="#A3E635" fillOpacity="0.60" />
      <circle cx="366" cy="330" r="4" fill="#A3E635" fillOpacity="0.75" />

      {/* Verimio monogram watermark — subtle */}
      <g opacity="0.05" transform="translate(418, 30)">
        <path d="M0 0 L12 24 L24 0" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="-2" r="2" fill="#A3E635" />
      </g>
    </svg>
  );
}
