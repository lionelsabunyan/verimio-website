import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'system-ui',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle decorative glow */}
        <div style={{
          position: 'absolute',
          top: -80,
          right: -60,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Automation flow nodes — right side decorative */}
        <div style={{
          position: 'absolute',
          right: 80,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
          opacity: 0.20,
        }}>
          {/* Node 1 */}
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            border: '2px solid #0A0A0A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ width: 20, height: 20, borderRadius: 5, background: '#0A0A0A', opacity: 0.6 }} />
          </div>
          {/* Connector */}
          <div style={{ width: 2, height: 32, background: '#0A0A0A', opacity: 0.5 }} />
          {/* Node 2 */}
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            border: '2px solid #0A0A0A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid #0A0A0A', opacity: 0.6 }} />
          </div>
          {/* Connector */}
          <div style={{ width: 2, height: 32, background: '#0A0A0A', opacity: 0.5 }} />
          {/* Node 3 */}
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            border: '2px solid #0A0A0A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ width: 20, height: 4, background: '#0A0A0A', borderRadius: 2, opacity: 0.8 }} />
          </div>
        </div>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: '#0A0A0A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
              <path d="M8 12 L32 52 L56 12" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="32" cy="10" r="6" fill="#FFFFFF"/>
            </svg>
          </div>
          <span style={{ color: '#0A0A0A', fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' }}>verimio</span>
        </div>

        {/* Ana metin */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 820 }}>
          <div style={{
            color: '#0A0A0A',
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}>
            İş Süreçlerinizi AI ile Dönüştürün
          </div>
          <div style={{
            color: '#5C5C5C',
            fontSize: 26,
            fontWeight: 400,
            lineHeight: 1.4,
          }}>
            Şirketinizin operasyonel verimliliğini ve AI hazırlığını analiz ediyoruz.
          </div>
        </div>

        {/* Alt CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{
            background: '#0A0A0A',
            color: '#FFFFFF',
            padding: '14px 32px',
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 700,
            display: 'flex',
          }}>
            Ücretsiz Check-Up Başlatın
          </div>
          <span style={{ color: '#A3A3A3', fontSize: 18 }}>verimio.com.tr</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
