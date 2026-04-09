/**
 * TEST CARD — Yeni illüstrasyon stilinde örnek kartlar
 *
 * Kullanım:
 *   /api/admin/social/test-card?type=statement
 *   /api/admin/social/test-card?type=stat
 *   /api/admin/social/test-card?type=grid4
 *   /api/admin/social/test-card?type=features
 *   /api/admin/social/test-card?type=quote
 *   /api/admin/social/test-card?type=dodont
 *   /api/admin/social/test-card?type=cta
 *   /api/admin/social/test-card?type=cover
 *   /api/admin/social/test-card?type=all  (tüm kartları yan yana)
 */

import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// ─── Brand Colors ───
const C = {
  midnight:  '#020617',
  slate900:  '#0F172A',
  slate800:  '#1E293B',
  amber:     '#F59E0B',
  amberLight:'#FBBF24',
  white:     '#F1F5F9',
  whiteMuted:'rgba(241,245,249,0.55)',
  whiteDim:  'rgba(241,245,249,0.25)',
  amberDim:  'rgba(245,158,11,0.35)',
  amberGhost:'rgba(245,158,11,0.08)',
  error:     '#EF4444',
  success:   '#22C55E',
}

// ─── Font Loading ───
async function loadFonts() {
  const [bold, black] = await Promise.all([
    fetch('https://www.verimio.com.tr/fonts/DMSans-Bold.ttf').then(r => r.arrayBuffer()),
    fetch('https://cdn.jsdelivr.net/fontsource/fonts/dm-sans@latest/latin-ext-800-normal.ttf').then(r => r.arrayBuffer()),
  ])
  return { bold, black }
}
const fontsPromise = loadFonts()

type CardType = 'statement' | 'stat' | 'grid4' | 'features' | 'quote' | 'dodont' | 'cta' | 'cover'

export async function GET(request: NextRequest) {
  const type = (request.nextUrl.searchParams.get('type') ?? 'statement') as CardType | 'all'
  const { bold, black } = await fontsPromise

  const W = 1080
  const H = 1080

  const fonts = [
    { name: 'DM Sans', data: bold, weight: 700 as const, style: 'normal' as const },
    { name: 'DM Sans', data: black, weight: 800 as const, style: 'normal' as const },
  ]

  if (type === 'all') {
    // Overview page — return HTML with all card types
    const types: CardType[] = ['cover', 'statement', 'stat', 'grid4', 'features', 'quote', 'dodont', 'cta']
    const baseUrl = request.nextUrl.origin + '/api/admin/social/test-card'
    const html = `<!DOCTYPE html>
<html><head><title>Verimio — Yeni Kart Stilleri</title>
<style>
  body { background: #020617; margin: 0; padding: 40px; font-family: system-ui; color: #F1F5F9; }
  h1 { font-size: 28px; margin-bottom: 8px; }
  h1 span { color: #F59E0B; }
  p { color: #94A3B8; margin-bottom: 32px; font-size: 16px; }
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
  .card { position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(241,245,249,0.06); }
  .card img { width: 100%; display: block; }
  .label { position: absolute; top: 12px; left: 12px; background: rgba(2,6,23,0.8); color: #F59E0B;
    padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; }
</style></head><body>
<h1>Verimio <span>Illustration Cards</span> — Proof of Concept</h1>
<p>8 kart tipi · Midnight + Amber + White · Line-art illüstrasyon · DM Sans 800</p>
<div class="grid">
  ${types.map(t => `<div class="card"><img src="${baseUrl}?type=${t}" loading="lazy"/><div class="label">${t.toUpperCase()}</div></div>`).join('\n  ')}
</div>
</body></html>`
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  }

  const card = renderCard(type, W, H)

  return new ImageResponse(card, { width: W, height: H, fonts })
}

// ─── Shared Components ───

function Logo({ size = 28 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <span style={{ color: C.white, fontSize: size, fontWeight: 800, letterSpacing: '-0.02em' }}>verim</span>
      <span style={{ color: C.amber, fontSize: size, fontWeight: 800, letterSpacing: '-0.02em' }}>io</span>
    </div>
  )
}

function AmberBar() {
  return <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 5, background: C.amber }} />
}

function Footer({ url = 'verimio.com.tr', slideInfo }: { url?: string; slideInfo?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <span style={{ color: C.whiteDim, fontSize: 18, letterSpacing: '0.02em' }}>{url}</span>
      {slideInfo && (
        <span style={{ color: C.amberDim, fontSize: 18 }}>{slideInfo}</span>
      )}
    </div>
  )
}

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width: i + 1 === current ? 22 : 7,
          height: 7,
          borderRadius: 4,
          background: i + 1 === current ? C.amber : 'rgba(241,245,249,0.15)',
        }} />
      ))}
    </div>
  )
}

// Highlight specific words in amber
function HighlightText({ text, accentWords, fontSize, lineHeight = 1.12 }: {
  text: string; accentWords: string[]; fontSize: number; lineHeight?: number
}) {
  const words = text.split(' ')
  const accentLower = accentWords.map(w => w.toLowerCase())
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.22em' }}>
      {words.map((word, i) => {
        const isAccent = accentLower.some(a => word.toLowerCase().includes(a))
        return (
          <span key={i} style={{
            color: isAccent ? C.amber : C.white,
            fontSize,
            fontWeight: 800,
            lineHeight,
            letterSpacing: '-0.025em',
          }}>
            {word}
          </span>
        )
      })}
    </div>
  )
}

// ─── Inline SVG Illustrations ───

function IllustrationPersonLaptop({ size = 280 }: { size?: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ opacity: 0.9 }}>
      {/* Desk */}
      <rect x="30" y="140" width="140" height="6" rx="3" fill={C.slate800} stroke={C.white} strokeWidth="1.5" />
      {/* Laptop base */}
      <rect x="55" y="105" width="90" height="35" rx="4" fill={C.slate900} stroke={C.white} strokeWidth="1.8" />
      {/* Laptop screen */}
      <rect x="60" y="60" width="80" height="48" rx="3" fill={C.midnight} stroke={C.white} strokeWidth="1.8" />
      {/* Screen glow */}
      <rect x="66" y="66" width="68" height="36" rx="2" fill={C.amber} opacity="0.15" />
      {/* Screen lines (dashboard) */}
      <rect x="70" y="72" width="24" height="3" rx="1.5" fill={C.amber} opacity="0.6" />
      <rect x="70" y="80" width="40" height="2" rx="1" fill={C.white} opacity="0.3" />
      <rect x="70" y="86" width="32" height="2" rx="1" fill={C.white} opacity="0.2" />
      <rect x="70" y="92" width="56" height="2" rx="1" fill={C.white} opacity="0.15" />
      {/* Chart bars on screen */}
      <rect x="112" y="82" width="5" height="14" rx="1" fill={C.amber} opacity="0.5" />
      <rect x="120" y="76" width="5" height="20" rx="1" fill={C.amber} opacity="0.7" />
      <rect x="128" y="70" width="5" height="26" rx="1" fill={C.amber} opacity="0.9" />
      {/* Person - head */}
      <circle cx="45" cy="85" r="14" fill="none" stroke={C.white} strokeWidth="1.8" />
      {/* Person - body */}
      <path d="M 45 99 L 45 130" stroke={C.white} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Person - arms reaching to laptop */}
      <path d="M 45 108 Q 48 112 55 113" stroke={C.white} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 45 108 Q 42 115 40 120" stroke={C.white} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Person - legs */}
      <path d="M 45 130 L 38 145" stroke={C.white} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 45 130 L 52 145" stroke={C.white} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Wifi/data signal */}
      <path d="M 155 55 Q 160 50 165 55" stroke={C.amber} strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M 152 49 Q 160 42 168 49" stroke={C.amber} strokeWidth="1.2" fill="none" opacity="0.35" />
      <circle cx="160" cy="58" r="2" fill={C.amber} opacity="0.6" />
    </svg>
  )
}

function IllustrationChart({ size = 240 }: { size?: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ opacity: 0.9 }}>
      {/* Graph area */}
      <rect x="30" y="30" width="140" height="130" rx="6" fill={C.slate900} stroke={C.white} strokeWidth="1.2" opacity="0.5" />
      {/* Grid lines */}
      <line x1="30" y1="70" x2="170" y2="70" stroke={C.white} strokeWidth="0.5" opacity="0.1" />
      <line x1="30" y1="100" x2="170" y2="100" stroke={C.white} strokeWidth="0.5" opacity="0.1" />
      <line x1="30" y1="130" x2="170" y2="130" stroke={C.white} strokeWidth="0.5" opacity="0.1" />
      {/* Rising line chart */}
      <path d="M 45 145 L 70 120 L 95 130 L 120 90 L 145 60 L 160 45"
        stroke={C.amber} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Area fill under line */}
      <path d="M 45 145 L 70 120 L 95 130 L 120 90 L 145 60 L 160 45 L 160 160 L 45 160 Z"
        fill={C.amber} opacity="0.08" />
      {/* Data points */}
      <circle cx="70" cy="120" r="4" fill={C.midnight} stroke={C.amber} strokeWidth="2" />
      <circle cx="120" cy="90" r="4" fill={C.midnight} stroke={C.amber} strokeWidth="2" />
      <circle cx="160" cy="45" r="5" fill={C.amber} />
      {/* Arrow pointing up */}
      <path d="M 160 45 L 160 35 M 155 40 L 160 35 L 165 40" stroke={C.amber} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Y-axis labels */}
      <text x="22" y="134" fill={C.white} fontSize="8" opacity="0.3" textAnchor="end">0</text>
      <text x="22" y="104" fill={C.white} fontSize="8" opacity="0.3" textAnchor="end">50</text>
      <text x="22" y="74" fill={C.white} fontSize="8" opacity="0.3" textAnchor="end">100</text>
      {/* Bottom decorative dots */}
      <circle cx="70" cy="175" r="3" fill={C.amber} opacity="0.2" />
      <circle cx="100" cy="175" r="3" fill={C.amber} opacity="0.4" />
      <circle cx="130" cy="175" r="3" fill={C.amber} opacity="0.6" />
    </svg>
  )
}

function IllustrationShield({ size = 200 }: { size?: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ opacity: 0.9 }}>
      {/* Shield shape */}
      <path d="M 100 20 L 160 50 L 160 110 Q 160 160 100 185 Q 40 160 40 110 L 40 50 Z"
        fill="none" stroke={C.white} strokeWidth="2.5" />
      {/* Inner shield */}
      <path d="M 100 35 L 148 58 L 148 108 Q 148 148 100 170 Q 52 148 52 108 L 52 58 Z"
        fill={C.amber} opacity="0.08" />
      {/* Lock body */}
      <rect x="82" y="95" width="36" height="30" rx="4" fill="none" stroke={C.amber} strokeWidth="2" />
      {/* Lock shackle */}
      <path d="M 90 95 L 90 80 Q 90 68 100 68 Q 110 68 110 80 L 110 95"
        stroke={C.amber} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Keyhole */}
      <circle cx="100" cy="107" r="4" fill={C.amber} />
      <rect x="98" y="109" width="4" height="8" rx="1" fill={C.amber} />
      {/* Checkmark */}
      <path d="M 130 55 L 140 65 L 160 40" stroke={C.amber} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function IllustrationGear({ size = 80 }: { size?: number }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size}>
      <circle cx="30" cy="30" r="10" fill="none" stroke={C.white} strokeWidth="1.8" />
      <circle cx="30" cy="30" r="4" fill={C.amber} opacity="0.6" />
      {/* Gear teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 30 + 12 * Math.cos(rad)
        const y1 = 30 + 12 * Math.sin(rad)
        const x2 = 30 + 17 * Math.cos(rad)
        const y2 = 30 + 17 * Math.sin(rad)
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.white} strokeWidth="2.5" strokeLinecap="round" />
      })}
    </svg>
  )
}

function IllustrationBot({ size = 80 }: { size?: number }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size}>
      {/* Robot head */}
      <rect x="14" y="16" width="32" height="26" rx="5" fill="none" stroke={C.white} strokeWidth="1.8" />
      {/* Eyes */}
      <circle cx="24" cy="28" r="3.5" fill={C.amber} opacity="0.7" />
      <circle cx="36" cy="28" r="3.5" fill={C.amber} opacity="0.7" />
      {/* Mouth */}
      <rect x="22" y="35" width="16" height="2.5" rx="1" fill={C.white} opacity="0.4" />
      {/* Antenna */}
      <line x1="30" y1="16" x2="30" y2="8" stroke={C.white} strokeWidth="1.5" />
      <circle cx="30" cy="6" r="3" fill={C.amber} opacity="0.5" />
      {/* Body hint */}
      <rect x="20" y="44" width="20" height="10" rx="3" fill="none" stroke={C.white} strokeWidth="1.2" opacity="0.5" />
    </svg>
  )
}

function IllustrationData({ size = 80 }: { size?: number }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size}>
      {/* Bar chart */}
      <rect x="10" y="35" width="8" height="18" rx="2" fill={C.white} opacity="0.25" />
      <rect x="22" y="25" width="8" height="28" rx="2" fill={C.amber} opacity="0.5" />
      <rect x="34" y="15" width="8" height="38" rx="2" fill={C.white} opacity="0.25" />
      <rect x="46" y="8" width="8" height="45" rx="2" fill={C.amber} opacity="0.7" />
      {/* Base line */}
      <line x1="6" y1="55" x2="58" y2="55" stroke={C.white} strokeWidth="1.2" opacity="0.3" />
    </svg>
  )
}

function IllustrationLock({ size = 80 }: { size?: number }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size}>
      {/* Lock body */}
      <rect x="15" y="28" width="30" height="24" rx="4" fill="none" stroke={C.white} strokeWidth="1.8" />
      {/* Shackle */}
      <path d="M 22 28 L 22 18 Q 22 8 30 8 Q 38 8 38 18 L 38 28" stroke={C.white} strokeWidth="1.8" fill="none" />
      {/* Keyhole */}
      <circle cx="30" cy="38" r="3.5" fill={C.amber} opacity="0.7" />
      <rect x="28.5" y="40" width="3" height="6" rx="1" fill={C.amber} opacity="0.7" />
    </svg>
  )
}

// ─── Card Renderers ───

function renderCard(type: CardType, W: number, H: number) {
  switch (type) {
    case 'statement': return StatementCard(W, H)
    case 'stat':      return StatCard(W, H)
    case 'grid4':     return Grid4Card(W, H)
    case 'features':  return FeaturesCard(W, H)
    case 'quote':     return QuoteCard(W, H)
    case 'dodont':    return DoDontCard(W, H)
    case 'cta':       return CtaCard(W, H)
    case 'cover':     return CoverCard(W, H)
    default:          return StatementCard(W, H)
  }
}

// ── COVER ──
function CoverCard(W: number, H: number) {
  return (
    <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', fontFamily: '"DM Sans"', background: C.midnight, position: 'relative', overflow: 'hidden' }}>
      <AmberBar />

      {/* Decorative glow */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${C.amberGhost} 0%, transparent 70%)` }} />

      <div style={{ display: 'flex', flexDirection: 'column', padding: '72px 80px', height: '100%' }}>
        <Logo size={32} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 40 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Category badge */}
            <div style={{ display: 'flex', marginBottom: 24 }}>
              <div style={{ background: C.amber, paddingTop: 6, paddingBottom: 6, paddingLeft: 16, paddingRight: 16, borderRadius: 20 }}>
                <span style={{ color: C.midnight, fontSize: 16, fontWeight: 800, letterSpacing: '0.06em' }}>STRATEJİ</span>
              </div>
            </div>

            <HighlightText
              text="Şirketinizde AI Dönüşümü Başlatmanın 5 Adımı"
              accentWords={['AI', 'Dönüşümü']}
              fontSize={56}
            />
          </div>

          <div style={{ display: 'flex', flexShrink: 0 }}>
            <IllustrationPersonLaptop size={300} />
          </div>
        </div>

        <Footer url="verimio.com.tr" />
      </div>
    </div>
  )
}

// ── STATEMENT ──
function StatementCard(W: number, H: number) {
  return (
    <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', fontFamily: '"DM Sans"', background: `linear-gradient(160deg, ${C.midnight} 0%, ${C.slate900} 100%)`, position: 'relative', overflow: 'hidden' }}>

      <div style={{ display: 'flex', flexDirection: 'column', padding: '72px 80px', height: '100%' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
          <ProgressDots current={2} total={8} />
          <Logo />
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <HighlightText
            text="Şirketiniz Hâlâ Excel ile mi Çalışıyor?"
            accentWords={['Excel']}
            fontSize={62}
          />

          <div style={{ marginTop: 28, display: 'flex' }}>
            <span style={{ color: C.whiteMuted, fontSize: 26, lineHeight: 1.55, fontWeight: 700 }}>
              Rakipleriniz çoktan AI ile karar alırken, manuel süreçlere bağlı kalmak sizi geride bırakıyor.
            </span>
          </div>
        </div>

        {/* Illustration bottom-right */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -60 }}>
          <IllustrationPersonLaptop size={220} />
        </div>

        <Footer url="verimio.com.tr" slideInfo="2/8  →" />
      </div>
    </div>
  )
}

// ── STAT ──
function StatCard(W: number, H: number) {
  return (
    <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', fontFamily: '"DM Sans"', background: C.midnight, position: 'relative', overflow: 'hidden' }}>

      {/* Ghost percentage in background */}
      <div style={{ position: 'absolute', top: 80, right: 40, fontSize: 320, fontWeight: 800, color: C.amberGhost, lineHeight: 1, letterSpacing: '-0.04em' }}>
        %
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', padding: '72px 80px', height: '100%' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
          <ProgressDots current={3} total={8} />
          <Logo />
        </div>

        {/* Giant stat number */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 160, fontWeight: 800, color: C.amber, lineHeight: 1, letterSpacing: '-0.04em' }}>73</span>
            <span style={{ fontSize: 64, fontWeight: 800, color: C.amber, lineHeight: 1 }}>%</span>
          </div>

          <div style={{ marginTop: 24, maxWidth: 650, display: 'flex' }}>
            <span style={{ color: C.whiteMuted, fontSize: 28, lineHeight: 1.55, fontWeight: 700 }}>
              Türk KOBİ&apos;lerinin AI&apos;dan haberi var ama sadece %12&apos;si aktif olarak kullanıyor.
            </span>
          </div>

          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 3, background: C.amber, borderRadius: 2 }} />
            <span style={{ color: C.amberDim, fontSize: 18 }}>McKinsey Türkiye Araştırması, 2025</span>
          </div>
        </div>

        {/* Chart illustration */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -40 }}>
          <IllustrationChart size={200} />
        </div>

        <Footer url="verimio.com.tr" slideInfo="3/8  →" />
      </div>
    </div>
  )
}

// ── GRID 4 ──
function Grid4Card(W: number, H: number) {
  const items = [
    { num: '1', icon: 'gear', label: 'Süreç\nAnalizi', desc: 'Mevcut iş akışını haritalandırma' },
    { num: '2', icon: 'data', label: 'Veri\nEntegrasyonu', desc: 'Sistemleri tek çatıda birleştirme' },
    { num: '3', icon: 'bot', label: 'AI\nAsistan', desc: 'Akıllı otomasyon kurulumu' },
    { num: '4', icon: 'lock', label: 'Güvenlik\nKontrolü', desc: 'Veri koruma ve uyumluluk' },
  ]

  const iconMap: Record<string, React.ReactElement> = {
    gear: <IllustrationGear size={56} />,
    data: <IllustrationData size={56} />,
    bot:  <IllustrationBot size={56} />,
    lock: <IllustrationLock size={56} />,
  }

  return (
    <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', fontFamily: '"DM Sans"', background: C.midnight, position: 'relative', overflow: 'hidden' }}>
      <AmberBar />

      <div style={{ display: 'flex', flexDirection: 'column', padding: '60px 70px', height: '100%' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <ProgressDots current={4} total={8} />
          <Logo />
        </div>

        {/* Title */}
        <HighlightText text="AI ile İş Süreçleri" accentWords={['AI']} fontSize={44} />

        {/* 2x2 Grid */}
        <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 36 }}>
          {items.map((item) => (
            <div key={item.num} style={{
              width: 450,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              background: C.slate900, borderRadius: 16, padding: '28px 20px',
              border: `1px solid rgba(241,245,249,0.06)`,
            }}>
              {/* Number circle */}
              <div style={{
                width: 36, height: 36, borderRadius: '50%', background: C.amber,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
              }}>
                <span style={{ color: C.midnight, fontSize: 18, fontWeight: 800 }}>{item.num}</span>
              </div>

              {/* Icon */}
              <div style={{ display: 'flex', marginBottom: 12 }}>
                {iconMap[item.icon]}
              </div>

              {/* Label */}
              <span style={{ color: C.white, fontSize: 22, fontWeight: 800, textAlign: 'center', lineHeight: 1.25 }}>
                {item.label}
              </span>

              {/* Desc */}
              <span style={{ color: C.whiteMuted, fontSize: 15, textAlign: 'center', marginTop: 6, fontWeight: 700 }}>
                {item.desc}
              </span>
            </div>
          ))}
        </div>

        <Footer url="verimio.com.tr" slideInfo="4/8  →" />
      </div>
    </div>
  )
}

// ── FEATURES ──
function FeaturesCard(W: number, H: number) {
  const features = [
    { icon: '💰', label: 'MALİYET', value: '%40 tasarruf' },
    { icon: '⚡', label: 'HIZ', value: '3x daha hızlı süreçler' },
    { icon: '📊', label: 'VERİ', value: 'Gerçek zamanlı analiz' },
    { icon: '🎯', label: 'DOĞRULUK', value: '%95 hassasiyet oranı' },
    { icon: '🔒', label: 'GÜVENLİK', value: 'ISO 27001 uyumlu' },
  ]

  return (
    <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', fontFamily: '"DM Sans"', background: `linear-gradient(170deg, ${C.midnight} 0%, ${C.slate900} 100%)`, position: 'relative', overflow: 'hidden' }}>

      {/* Left amber accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 5, height: '100%', background: C.amber }} />

      <div style={{ display: 'flex', flexDirection: 'column', padding: '60px 70px 60px 85px', height: '100%' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <ProgressDots current={5} total={8} />
          <Logo />
        </div>

        {/* Title */}
        <HighlightText text="AI Otomasyonun 5 Faydası" accentWords={['5', 'Faydası']} fontSize={46} />

        {/* Feature list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 36, flex: 1 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 20,
              background: C.slate900, borderRadius: 14, padding: '18px 24px',
              border: `1px solid rgba(241,245,249,0.05)`,
            }}>
              {/* Icon circle */}
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: C.amberGhost, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: 26 }}>{f.icon}</span>
              </div>

              {/* Text */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ color: C.amber, fontSize: 16, fontWeight: 800, letterSpacing: '0.08em' }}>{f.label}</span>
                <span style={{ color: C.white, fontSize: 22, fontWeight: 700 }}>{f.value}</span>
              </div>
            </div>
          ))}
        </div>

        <Footer url="verimio.com.tr" slideInfo="5/8  →" />
      </div>
    </div>
  )
}

// ── QUOTE ──
function QuoteCard(W: number, H: number) {
  return (
    <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', fontFamily: '"DM Sans"', background: C.midnight, position: 'relative', overflow: 'hidden' }}>

      <div style={{ display: 'flex', flexDirection: 'column', padding: '72px 80px', height: '100%' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
          <ProgressDots current={7} total={8} />
          <Logo />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Quote marks */}
          <span style={{ fontSize: 120, color: C.amber, lineHeight: 0.6, marginBottom: 8, fontWeight: 800 }}>"</span>

          {/* Quote text */}
          <div style={{ display: 'flex', maxWidth: 800 }}>
            <span style={{ color: C.white, fontSize: 42, fontWeight: 800, lineHeight: 1.3, letterSpacing: '-0.02em' }}>
              Veriyi kullanan şirketler, kullanmayanlara göre %23 daha kârlı çalışıyor.
            </span>
          </div>

          {/* Attribution */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 32 }}>
            <div style={{ width: 40, height: 3, background: C.amber, borderRadius: 2 }} />
            <span style={{ color: C.amber, fontSize: 22, fontWeight: 800 }}>McKinsey Global Institute</span>
          </div>
          <span style={{ color: C.whiteDim, fontSize: 18, marginTop: 8, marginLeft: 52, fontWeight: 700 }}>
            Data-Driven Organizations Report, 2025
          </span>
        </div>

        <Footer url="verimio.com.tr" slideInfo="7/8  →" />
      </div>
    </div>
  )
}

// ── DO / DON'T ──
function DoDontCard(W: number, H: number) {
  return (
    <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', fontFamily: '"DM Sans"', background: C.midnight, position: 'relative', overflow: 'hidden' }}>

      <div style={{ display: 'flex', flexDirection: 'column', padding: '60px 70px', height: '100%' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <ProgressDots current={6} total={8} />
          <Logo />
        </div>

        {/* Title */}
        <HighlightText text="Doğru Yaklaşım vs Yanlış" accentWords={['Doğru', 'Yanlış']} fontSize={44} />

        {/* Two columns */}
        <div style={{ flex: 1, display: 'flex', gap: 24, marginTop: 36 }}>

          {/* WRONG */}
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            background: C.slate900, borderRadius: 20, padding: '32px 28px',
            border: `2px solid rgba(239,68,68,0.2)`,
          }}>
            {/* X badge */}
            <div style={{
              width: 48, height: 48, borderRadius: '50%', background: 'rgba(239,68,68,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
            }}>
              <span style={{ color: C.error, fontSize: 28, fontWeight: 800 }}>✗</span>
            </div>

            <span style={{ color: C.error, fontSize: 18, fontWeight: 800, letterSpacing: '0.1em', marginBottom: 20 }}>YANLIŞ</span>

            {/* Icon */}
            <div style={{ display: 'flex', marginBottom: 20, opacity: 0.6 }}>
              <IllustrationData size={80} />
            </div>

            <span style={{ color: C.white, fontSize: 24, fontWeight: 800, textAlign: 'center', marginBottom: 8 }}>
              Manuel Excel
            </span>
            <span style={{ color: C.whiteMuted, fontSize: 17, textAlign: 'center', lineHeight: 1.5, fontWeight: 700 }}>
              Haftalık rapor hazırlamak için saatlerce veri toplamak
            </span>
          </div>

          {/* RIGHT */}
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            background: C.slate900, borderRadius: 20, padding: '32px 28px',
            border: `2px solid rgba(34,197,94,0.2)`,
          }}>
            {/* Check badge */}
            <div style={{
              width: 48, height: 48, borderRadius: '50%', background: 'rgba(34,197,94,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
            }}>
              <span style={{ color: C.success, fontSize: 28, fontWeight: 800 }}>✓</span>
            </div>

            <span style={{ color: C.success, fontSize: 18, fontWeight: 800, letterSpacing: '0.1em', marginBottom: 20 }}>DOĞRU</span>

            {/* Icon */}
            <div style={{ display: 'flex', marginBottom: 20 }}>
              <IllustrationBot size={80} />
            </div>

            <span style={{ color: C.white, fontSize: 24, fontWeight: 800, textAlign: 'center', marginBottom: 8 }}>
              AI Otomasyon
            </span>
            <span style={{ color: C.whiteMuted, fontSize: 17, textAlign: 'center', lineHeight: 1.5, fontWeight: 700 }}>
              Otomatik analiz ve raporlama ile anlık içgörüler
            </span>
          </div>
        </div>

        <div style={{ marginTop: 24, display: 'flex' }}>
          <Footer url="verimio.com.tr" slideInfo="6/8  →" />
        </div>
      </div>
    </div>
  )
}

// ── CTA ──
function CtaCard(W: number, H: number) {
  return (
    <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', fontFamily: '"DM Sans"', background: C.midnight, position: 'relative', overflow: 'hidden' }}>
      <AmberBar />

      {/* Large glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${C.amberGhost} 0%, transparent 70%)`, transform: 'translateX(-50%)' }} />

      <div style={{ display: 'flex', flexDirection: 'column', padding: '72px 80px', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Logo size={36} />

        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ color: C.amber, fontSize: 22, fontWeight: 800, letterSpacing: '0.1em', marginBottom: 16 }}>ÜCRETSİZ</span>

          <span style={{ color: C.white, fontSize: 64, fontWeight: 800, textAlign: 'center', lineHeight: 1.15, letterSpacing: '-0.025em' }}>
            AI Check-Up
          </span>

          <span style={{ color: C.whiteMuted, fontSize: 24, textAlign: 'center', marginTop: 20, maxWidth: 600, lineHeight: 1.5, fontWeight: 700 }}>
            İş süreçlerinizi analiz edelim, size özel AI dönüşüm yol haritası çıkaralım.
          </span>
        </div>

        {/* CTA Button */}
        <div style={{
          marginTop: 40, background: C.amber,
          paddingTop: 18, paddingBottom: 18, paddingLeft: 48, paddingRight: 48,
          borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ color: C.midnight, fontSize: 26, fontWeight: 800 }}>Hemen Başla</span>
          <span style={{ color: C.midnight, fontSize: 26, fontWeight: 800 }}>→</span>
        </div>

        <span style={{ color: C.whiteDim, fontSize: 18, marginTop: 16, fontWeight: 700 }}>verimio.com.tr</span>

        <div style={{ display: 'flex', gap: 6, marginTop: 40 }}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: C.amber, opacity: 0.15 + i * 0.12 }} />
          ))}
        </div>
      </div>
    </div>
  )
}
