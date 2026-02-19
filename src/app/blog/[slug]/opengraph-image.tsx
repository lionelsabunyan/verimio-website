import { ImageResponse } from 'next/og'
import { BLOG_POSTS } from '@/lib/constants'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Category to pattern index mapping (mirrors BlogCardImage)
const categoryColors: Record<string, { accent: string; label: string }> = {
  'ai-tools':    { accent: '#8B5CF6', label: 'AI Araçları' },
  'automation':  { accent: '#A3E635', label: 'Otomasyon' },
  'data':        { accent: '#8B5CF6', label: 'Veri & Raporlama' },
  'strategy':    { accent: '#A3E635', label: 'Strateji' },
  'security':    { accent: '#8B5CF6', label: 'Veri Güvenliği' },
  'customer':    { accent: '#A3E635', label: 'Müşteri Deneyimi' },
  'roi':         { accent: '#A3E635', label: 'ROI & Verimlilik' },
  'tutorial':    { accent: '#8B5CF6', label: 'Rehber' },
}

export default function BlogOGImage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)

  const title = post?.title ?? 'Verimio Blog'
  const date = post?.date ?? ''
  const category = (post as { category?: string })?.category
  const catInfo = category ? categoryColors[category] : null
  const accentColor = catInfo?.accent ?? '#A3E635'
  const catLabel = catInfo?.label ?? 'Blog'

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#2E1065',
          display: 'flex',
          alignItems: 'stretch',
          fontFamily: 'system-ui',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: -100,
          right: 200,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor}18 0%, transparent 70%)`,
        }} />

        {/* Left: Content (2/3) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 60px',
          flex: 1,
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: '#A3E635',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="26" height="26" viewBox="0 0 64 64" fill="none">
                <path d="M8 12 L32 52 L56 12" stroke="#2E1065" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="32" cy="10" r="6" fill="#1E0A46"/>
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#FFFFFF', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>verim</span>
              <span style={{ color: '#A3E635', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>io</span>
            </div>
          </div>

          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              color: '#FFFFFF',
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
            }}>
              {title.length > 60 ? title.substring(0, 57) + '...' : title}
            </div>
          </div>

          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {catLabel && (
              <div style={{
                background: accentColor,
                color: '#2E1065',
                padding: '8px 20px',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 700,
                display: 'flex',
              }}>
                {catLabel}
              </div>
            )}
            {date && (
              <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: 16 }}>{date}</span>
            )}
            <span style={{ color: '#4C4462', fontSize: 16, marginLeft: 'auto' }}>verimio.com.tr/blog</span>
          </div>
        </div>

        {/* Right: Pattern (1/3) */}
        <div style={{
          width: 360,
          background: 'rgba(30,10,70,0.6)',
          borderLeft: '1px solid rgba(139,92,246,0.20)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative geometric pattern */}
          <div style={{ position: 'relative', display: 'flex' }}>
            <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
              {/* Concentric circles */}
              <circle cx="120" cy="120" r="90" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.25" />
              <circle cx="120" cy="120" r="65" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.20" />
              <circle cx="120" cy="120" r="40" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.40" />
              <circle cx="120" cy="120" r="18" fill={accentColor} fillOpacity="0.12" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.55" />
              {/* V monogram center */}
              <path d="M 110 110 L 120 132 L 130 110"
                stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.80" />
              <circle cx="120" cy="107" r="3" fill={accentColor} fillOpacity="0.90" />
              {/* Satellite dots */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                const rad = (deg * Math.PI) / 180
                const cx = 120 + 90 * Math.cos(rad)
                const cy = 120 + 90 * Math.sin(rad)
                return (
                  <circle key={i} cx={cx} cy={cy} r={i % 2 === 0 ? 4 : 3}
                    fill={i % 2 === 0 ? accentColor : '#8B5CF6'} fillOpacity="0.45" />
                )
              })}
            </svg>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
