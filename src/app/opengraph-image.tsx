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
          background: '#2E1065',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: '#A3E635',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
              <path d="M8 12 L32 52 L56 12" stroke="#2E1065" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="32" cy="10" r="6" fill="#1E0A46"/>
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' }}>verim</span>
            <span style={{ color: '#A3E635', fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' }}>io</span>
          </div>
        </div>

        {/* Ana metin */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            color: '#FFFFFF',
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}>
            İş Süreçlerinizi AI ile Dönüştürün
          </div>
          <div style={{
            color: '#78716C',
            fontSize: 26,
            fontWeight: 400,
          }}>
            3 dakikada şirketinizin AI hazırlık seviyesini öğrenin.
          </div>
        </div>

        {/* Alt CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{
            background: '#A3E635',
            color: '#2E1065',
            padding: '14px 32px',
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 700,
            display: 'flex',
          }}>
            Ücretsiz Başla
          </div>
          <span style={{ color: '#4C4462', fontSize: 18 }}>verimio.com</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
