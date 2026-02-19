/**
 * Hero section illustration — "Structured Flow" dili.
 * Karmaşık süreç → Verimio filtresi → temiz output + metrik.
 * Hakkımızda versiyonundan daha kompakt: 440×380 viewBox.
 */
export default function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 440 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hero-glow1" cx="65%" cy="25%" r="55%">
          <stop offset="0%" stopColor="#A3E635" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#A3E635" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hero-glow2" cx="15%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="440" height="380" fill="url(#hero-glow1)" />
      <rect width="440" height="380" fill="url(#hero-glow2)" />

      {/* ── Üst: Şirket yapısı (org chart benzeri) ── */}
      {/* Ana kutu */}
      <rect x="150" y="20" width="140" height="90" rx="6"
        stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.22" fill="#8B5CF6" fillOpacity="0.025" />

      {/* İç satırlar */}
      <rect x="168" y="36" width="50" height="5" rx="2.5" fill="#8B5CF6" fillOpacity="0.20" />
      <rect x="226" y="36" width="44" height="5" rx="2.5" fill="#8B5CF6" fillOpacity="0.12" />
      <rect x="168" y="50" width="68" height="5" rx="2.5" fill="#8B5CF6" fillOpacity="0.15" />
      <rect x="168" y="64" width="38" height="5" rx="2.5" fill="#8B5CF6" fillOpacity="0.18" />
      <rect x="214" y="64" width="54" height="5" rx="2.5" fill="#8B5CF6" fillOpacity="0.10" />
      <rect x="168" y="79" width="80" height="5" rx="2.5" fill="#8B5CF6" fillOpacity="0.12" />

      {/* Yan departman kutuları */}
      <rect x="36" y="32" width="72" height="40" rx="4"
        stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.16" />
      <rect x="49" y="44" width="38" height="4" rx="2" fill="#8B5CF6" fillOpacity="0.14" />
      <rect x="49" y="55" width="26" height="4" rx="2" fill="#8B5CF6" fillOpacity="0.10" />

      <rect x="332" y="34" width="68" height="38" rx="4"
        stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.14" />
      <rect x="344" y="45" width="42" height="4" rx="2" fill="#8B5CF6" fillOpacity="0.12" />
      <rect x="344" y="56" width="28" height="4" rx="2" fill="#8B5CF6" fillOpacity="0.09" />

      {/* Bağlantı çizgileri */}
      <line x1="108" y1="52" x2="150" y2="52" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.14" />
      <line x1="290" y1="53" x2="332" y2="53" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.12" />

      {/* Giriş akışı — kaotik */}
      <g strokeOpacity="0.18" stroke="#8B5CF6">
        <line x1="20" y1="160" x2="82" y2="164" strokeWidth="1.5" />
        <line x1="20" y1="175" x2="76" y2="170" strokeWidth="1" />
        <line x1="20" y1="190" x2="80" y2="194" strokeWidth="1.5" />
        <line x1="20" y1="205" x2="72" y2="200" strokeWidth="0.8" />
        <line x1="20" y1="218" x2="78" y2="213" strokeWidth="1" />
      </g>
      {/* Chaos break dots */}
      <circle cx="55" cy="164" r="2" fill="#8B5CF6" fillOpacity="0.22" />
      <circle cx="48" cy="192" r="1.5" fill="#8B5CF6" fillOpacity="0.18" />
      <circle cx="62" cy="207" r="2" fill="#8B5CF6" fillOpacity="0.16" />

      {/* Filtre lens */}
      <path d="M 82 148 L 158 165 L 158 215 L 82 232 Z"
        stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.28"
        fill="#8B5CF6" fillOpacity="0.035" />
      <line x1="95" y1="172" x2="145" y2="176" stroke="#8B5CF6" strokeWidth="0.7" strokeOpacity="0.18" />
      <line x1="93" y1="186" x2="145" y2="188" stroke="#8B5CF6" strokeWidth="0.7" strokeOpacity="0.15" />
      <line x1="95" y1="200" x2="143" y2="200" stroke="#8B5CF6" strokeWidth="0.7" strokeOpacity="0.13" />
      <line x1="97" y1="213" x2="141" y2="211" stroke="#8B5CF6" strokeWidth="0.7" strokeOpacity="0.10" />

      {/* Filtre merkez noktası */}
      <circle cx="120" cy="190" r="6" fill="#A3E635" fillOpacity="0.18" />
      <circle cx="120" cy="190" r="2.5" fill="#A3E635" fillOpacity="0.55" />

      {/* Verimio monogram — filtre içinde */}
      <g opacity="0.12" transform="translate(108, 178)">
        <path d="M0 0 L12 24 L24 0" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="-2" r="2" fill="#A3E635" />
      </g>

      {/* Temiz çıktı — paralel lime çizgiler */}
      <g strokeLinecap="round">
        <line x1="158" y1="168" x2="420" y2="168" stroke="#A3E635" strokeWidth="1.5" strokeOpacity="0.22" />
        <line x1="158" y1="181" x2="420" y2="181" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.16" />
        <line x1="158" y1="196" x2="420" y2="196" stroke="#A3E635" strokeWidth="1.5" strokeOpacity="0.20" />
        <line x1="158" y1="209" x2="420" y2="209" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.13" />
      </g>
      {/* Akış yön işaretçileri */}
      <path d="M 280 160 L 290 168 L 280 176" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.28" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M 350 173 L 360 181 L 350 189" stroke="#A3E635" strokeWidth="1" strokeOpacity="0.22" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* ── Alt: Metrik kolonları ── */}
      <line x1="20" y1="255" x2="420" y2="255" stroke="#8B5CF6" strokeWidth="0.7" strokeOpacity="0.12" />

      {/* Kolon 1 — Zaman */}
      <rect x="60" y="310" width="24" height="60" rx="3" fill="#8B5CF6" fillOpacity="0.09" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.16" />
      <rect x="60" y="285" width="24" height="85" rx="3" fill="#8B5CF6" fillOpacity="0.13" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.18" />
      <rect x="60" y="268" width="24" height="102" rx="3" fill="#A3E635" fillOpacity="0.20" stroke="#A3E635" strokeWidth="1.5" strokeOpacity="0.42" />
      <line x1="48" y1="372" x2="98" y2="372" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.16" />
      <rect x="52" y="377" width="44" height="4" rx="2" fill="#8B5CF6" fillOpacity="0.16" />
      <circle cx="72" cy="268" r="3.5" fill="#A3E635" fillOpacity="0.60" />

      {/* Kolon 2 — Maliyet */}
      <rect x="200" y="318" width="24" height="52" rx="3" fill="#8B5CF6" fillOpacity="0.09" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.16" />
      <rect x="200" y="292" width="24" height="78" rx="3" fill="#8B5CF6" fillOpacity="0.13" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.18" />
      <rect x="200" y="274" width="24" height="96" rx="3" fill="#A3E635" fillOpacity="0.20" stroke="#A3E635" strokeWidth="1.5" strokeOpacity="0.42" />
      <line x1="188" y1="372" x2="238" y2="372" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.16" />
      <rect x="192" y="377" width="44" height="4" rx="2" fill="#8B5CF6" fillOpacity="0.16" />
      <circle cx="212" cy="274" r="3.5" fill="#A3E635" fillOpacity="0.60" />

      {/* Kolon 3 — ROI */}
      <rect x="340" y="324" width="24" height="46" rx="3" fill="#8B5CF6" fillOpacity="0.09" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.16" />
      <rect x="340" y="296" width="24" height="74" rx="3" fill="#8B5CF6" fillOpacity="0.13" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.18" />
      <rect x="340" y="262" width="24" height="108" rx="3" fill="#A3E635" fillOpacity="0.26" stroke="#A3E635" strokeWidth="1.5" strokeOpacity="0.52" />
      <line x1="328" y1="372" x2="378" y2="372" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.16" />
      <rect x="332" y="377" width="44" height="4" rx="2" fill="#8B5CF6" fillOpacity="0.16" />
      <circle cx="352" cy="262" r="3.5" fill="#A3E635" fillOpacity="0.72" />

      {/* Metrik-çıktı bağlantı çizgileri */}
      <line x1="72" y1="218" x2="72" y2="255" stroke="#A3E635" strokeWidth="0.8" strokeOpacity="0.14" strokeDasharray="3 4" />
      <line x1="212" y1="213" x2="212" y2="255" stroke="#A3E635" strokeWidth="0.8" strokeOpacity="0.12" strokeDasharray="3 4" />
      <line x1="352" y1="218" x2="352" y2="255" stroke="#A3E635" strokeWidth="0.8" strokeOpacity="0.10" strokeDasharray="3 4" />
    </svg>
  );
}
