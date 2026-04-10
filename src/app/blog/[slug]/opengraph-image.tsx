import { ImageResponse } from 'next/og'
import { BLOG_POSTS } from '@/lib/constants'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const categoryLabels: Record<string, string> = {
  'ai-tools':    'AI Araçları',
  'automation':  'Otomasyon',
  'data':        'Veri & Raporlama',
  'strategy':    'Strateji',
  'security':    'Veri Güvenliği',
  'customer':    'Müşteri Deneyimi',
  'roi':         'ROI & Verimlilik',
  'tutorial':    'Rehber',
}

export default function BlogOGImage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)

  const title = post?.title ?? 'Verimio Blog'
  const date = post?.date ?? ''
  const category = (post as { category?: string })?.category
  const catLabel = category ? categoryLabels[category] ?? 'Blog' : 'Blog'

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'stretch',
          fontFamily: 'system-ui',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Subtle background glow */}
        <div style={{
          position: 'absolute',
          top: -100,
          right: 200,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
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
              background: '#0A0A0A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="26" height="26" viewBox="0 0 64 64" fill="none">
                <path d="M8 12 L32 52 L56 12" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="32" cy="10" r="6" fill="#FFFFFF"/>
              </svg>
            </div>
            <span style={{ color: '#0A0A0A', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>verimio</span>
          </div>

          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              color: '#0A0A0A',
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
                background: '#0A0A0A',
                color: '#FFFFFF',
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
              <span style={{ color: '#A3A3A3', fontSize: 16 }}>{date}</span>
            )}
            <span style={{ color: '#A3A3A3', fontSize: 16, marginLeft: 'auto' }}>verimio.com.tr/blog</span>
          </div>
        </div>

        {/* Right: Pattern (1/3) */}
        <div style={{
          width: 360,
          background: '#F5F5F5',
          borderLeft: '1px solid #E5E5E5',
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
              <circle cx="120" cy="120" r="90" stroke="#0A0A0A" strokeWidth="1" strokeOpacity="0.12" />
              <circle cx="120" cy="120" r="65" stroke="#0A0A0A" strokeWidth="1" strokeOpacity="0.10" />
              <circle cx="120" cy="120" r="40" stroke="#0A0A0A" strokeWidth="1.5" strokeOpacity="0.18" />
              <circle cx="120" cy="120" r="18" fill="#0A0A0A" fillOpacity="0.06" stroke="#0A0A0A" strokeWidth="1.5" strokeOpacity="0.22" />
              {/* V monogram center */}
              <path d="M 110 110 L 120 132 L 130 110"
                stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.50" />
              <circle cx="120" cy="107" r="3" fill="#0A0A0A" fillOpacity="0.55" />
              {/* Satellite dots */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                const rad = (deg * Math.PI) / 180
                const cx = 120 + 90 * Math.cos(rad)
                const cy = 120 + 90 * Math.sin(rad)
                return (
                  <circle key={i} cx={cx} cy={cy} r={i % 2 === 0 ? 4 : 3}
                    fill="#0A0A0A" fillOpacity="0.20" />
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
