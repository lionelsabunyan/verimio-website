'use client'
/**
 * BlogSocialCard
 * ──────────────
 * Blog kapak görseli üzerine sosyal medya overlay'i.
 * - Altta şerit: kategori etiketi + logo
 * - Başlık: güçlü tipografi, indigo/beyaz
 * - Aspect ratio: linkedin (1.91:1) veya instagram (1:1) veya story (9:16)
 *
 * Kullanım:
 *   <BlogSocialCard
 *     imageUrl="https://..."
 *     title="ChatGPT'yi İş Süreçlerine Entegre Etmenin 5 Adımı"
 *     category="AI Araçları"
 *     aspect="linkedin"
 *   />
 */

import type { SocialAspect } from './social/ArticlePostTemplate'

interface BlogSocialCardProps {
  imageUrl: string
  title: string
  category?: string
  date?: string
  aspect?: SocialAspect
  /** Override genişlik (px). Varsayılan: 600 */
  width?: number
}

const ASPECT_RATIOS: Record<SocialAspect, number> = {
  linkedin: 1200 / 628,
  instagram: 1,
  twitter: 1200 / 675,
  story: 9 / 16,
}

const CATEGORY_COLORS: Record<string, string> = {
  'AI Araçları': '#8B5CF6',
  'Otomasyon': '#2E1065',
  'Veri & Raporlama': '#1E40AF',
  'Strateji': '#0F766E',
  'ROI & Verimlilik': '#4D7C0F',
  'Müşteri Deneyimi': '#BE185D',
  'Rehber': '#92400E',
  'Veri Güvenliği': '#1E0A46',
}

export default function BlogSocialCard({
  imageUrl,
  title,
  category = 'AI Araçları',
  date,
  aspect = 'linkedin',
  width = 600,
}: BlogSocialCardProps) {
  const ratio = ASPECT_RATIOS[aspect]
  const height = Math.round(width / ratio)
  const catColor = CATEGORY_COLORS[category] ?? '#2E1065'

  // Tipografi boyutları aspect'e göre ölçekle
  const scale = width / 600
  const titleSize = Math.round((aspect === 'story' ? 28 : 32) * scale)
  const titleLines = aspect === 'story' ? 4 : 3
  const stripH = Math.round(64 * scale)
  const logoSize = Math.round(22 * scale)
  const catSize = Math.round(11 * scale)
  const pad = Math.round(28 * scale)

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 12,
        fontFamily: 'var(--font-dm-sans, system-ui)',
        userSelect: 'none',
      }}
    >
      {/* Arka plan fotoğrafı */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Gradient overlay — alt yarı kararıyor, başlık okunur */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: aspect === 'story'
            ? 'linear-gradient(to bottom, transparent 0%, rgba(10,5,20,0.15) 40%, rgba(10,5,20,0.85) 100%)'
            : 'linear-gradient(to bottom, transparent 0%, rgba(10,5,20,0.08) 35%, rgba(10,5,20,0.82) 100%)',
        }}
      />

      {/* ── Başlık bloğu ── */}
      <div
        style={{
          position: 'absolute',
          left: pad,
          right: pad,
          bottom: stripH + Math.round(20 * scale),
        }}
      >
        {/* Kategori pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: '#A3E635',
            borderRadius: 6,
            padding: `${Math.round(4 * scale)}px ${Math.round(12 * scale)}px`,
            marginBottom: Math.round(12 * scale),
          }}
        >
          <div style={{ width: Math.round(6 * scale), height: Math.round(6 * scale), borderRadius: '50%', background: catColor }} />
          <span style={{ fontSize: catSize, fontWeight: 700, color: '#2E1065', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {category}
          </span>
        </div>

        {/* Başlık */}
        <div
          style={{
            fontSize: titleSize,
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            display: '-webkit-box',
            WebkitLineClamp: titleLines,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
          }}
        >
          {title}
        </div>

        {date && (
          <div style={{ fontSize: Math.round(12 * scale), color: 'rgba(255,255,255,0.55)', marginTop: Math.round(8 * scale), fontWeight: 500 }}>
            {date}
          </div>
        )}
      </div>

      {/* ── Alt şerit ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: stripH,
          background: '#2E1065',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `0 ${pad}px`,
          borderTop: '2px solid #A3E635',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: Math.round(8 * scale) }}>
          {/* V monogram */}
          <div
            style={{
              width: logoSize + 6,
              height: logoSize + 6,
              borderRadius: Math.round(6 * scale),
              background: '#A3E635',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width={logoSize - 2} height={logoSize - 2} viewBox="0 0 24 24" fill="none">
              <path d="M3 5 L12 19 L21 5" stroke="#2E1065" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="4" r="2" fill="#1E0A46"/>
            </svg>
          </div>
          <span style={{ fontSize: Math.round(16 * scale), fontWeight: 700, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            verim<span style={{ color: '#A3E635' }}>io</span>
          </span>
        </div>

        {/* Sağ — web adresi */}
        <span style={{ fontSize: Math.round(11 * scale), color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
          verimio.com.tr
        </span>
      </div>
    </div>
  )
}
