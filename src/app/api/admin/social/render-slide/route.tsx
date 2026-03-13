/**
 * GET /api/admin/social/render-slide
 *
 * Params:
 *   headline  — main text (6-8 words)
 *   body      — supporting text (15-30 words)
 *   type      — hook | problem | point | proof | recap | cta | cover
 *   index     — slide number (1-based)
 *   total     — total slides
 *   bg_url    — background photo (fal.ai CDN)
 *   platform  — instagram | linkedin | twitter
 *
 * Dimensions:
 *   cover slides  → instagram 1080×1080 | linkedin 1200×628 | twitter 1200×675
 *   carousel      → instagram 1080×1080 | linkedin 1080×1350 | twitter 1080×1080
 */

import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

type SlideType = 'hook' | 'problem' | 'point' | 'proof' | 'recap' | 'cta' | 'cover'
type Platform  = 'instagram' | 'linkedin' | 'twitter'

// Carousel uses portrait for LinkedIn (4:5 optimal for document posts)
// Cover uses landscape for feed preview
const DIMS: Record<Platform, { carousel: [number, number]; cover: [number, number] }> = {
  instagram: { carousel: [1080, 1080], cover: [1080, 1080] },
  linkedin:  { carousel: [1080, 1350], cover: [1200, 628]  },
  twitter:   { carousel: [1080, 1080], cover: [1200, 675]  },
}

export async function GET(request: NextRequest) {
  const p = request.nextUrl.searchParams

  const headline = p.get('headline') ?? ''
  const body     = p.get('body')     ?? ''
  const type     = (p.get('type')     ?? 'point') as SlideType
  const index    = parseInt(p.get('index') ?? '1', 10)
  const total    = parseInt(p.get('total') ?? '8', 10)
  const bgUrl    = p.get('bg_url')  ?? null
  const platform = (p.get('platform') ?? 'instagram') as Platform

  const isCover = type === 'cover'
  const key     = isCover ? 'cover' : 'carousel'
  const [width, height] = (DIMS[platform] ?? DIMS.instagram)[key]

  return new ImageResponse(
    buildSlide({ headline, body, type, index, total, bgUrl, width, height }),
    { width, height }
  )
}

interface SlideProps {
  headline: string
  body:     string
  type:     SlideType
  index:    number
  total:    number
  bgUrl:    string | null
  width:    number
  height:   number
}

function buildSlide({ headline, body, type, index, total, bgUrl, width, height }: SlideProps) {
  const isHook    = type === 'hook'
  const isProblem = type === 'problem'
  const isPoint   = type === 'point'
  const isProof   = type === 'proof'
  const isRecap   = type === 'recap'
  const isCta     = type === 'cta'
  const isCover   = type === 'cover'

  // compact = landscape covers (height < 900)
  const compact = height < 900

  // Layout scale
  const pad    = compact ? { x: 80, y: 44 } : { x: 80, y: 72 }
  const logoSz = compact ? 24 : 28
  const topGap = compact ? 32 : 56

  // Headline sizes
  const hlSz = isCover || isHook
    ? (compact ? 48 : 68)
    : isProof
    ? (compact ? 54 : 80)
    : isPoint
    ? (compact ? 38 : 50)
    : isRecap
    ? (compact ? 18 : 22)
    : isCta
    ? (compact ? 40 : 58)
    : (compact ? 38 : 52)  // problem

  const bodySz   = compact ? 20 : 26
  const numSz    = compact ? 90 : 140
  const pointNum = isPoint ? String(index - 1).padStart(2, '0') : null

  // Bullet lines for recap
  const recapLines = isRecap ? body.split('\n').filter(Boolean) : []

  // Progress dots
  const dots = !isCover
    ? Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width:        i + 1 === index ? (compact ? 20 : 24) : (compact ? 6 : 7),
          height:       compact ? 5 : 7,
          borderRadius: 4,
          background:   i + 1 === index ? '#A3E635' : 'rgba(255,255,255,0.18)',
        }} />
      ))
    : null

  return (
    <div style={{
      width, height,
      display:       'flex',
      flexDirection: 'column',
      fontFamily:    'system-ui, sans-serif',
      position:      'relative',
      overflow:      'hidden',
      background:    bgUrl ? undefined : 'linear-gradient(135deg, #1E0A46 0%, #2E1065 100%)',
    }}>

      {/* ── Background photo ── */}
      {bgUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={bgUrl} alt="" style={{ position: 'absolute', top: 0, left: 0, width, height, objectFit: 'cover' }} />
      )}
      {bgUrl && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width, height,
          background: isCover
            ? 'linear-gradient(180deg, rgba(8,3,18,0.45) 0%, rgba(8,3,18,0.72) 50%, rgba(8,3,18,0.92) 100%)'
            : 'rgba(8, 3, 18, 0.62)',
        }} />
      )}
      {bgUrl && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width, height,
          background: 'linear-gradient(135deg, rgba(30,10,70,0.28) 0%, rgba(46,16,101,0.18) 100%)',
        }} />
      )}

      {/* Decorative glows (no-photo mode) */}
      {!bgUrl && (
        <>
          <div style={{
            position: 'absolute', top: -100, left: width - 320,
            width: 440, height: 440, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(163,230,53,0.06) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', top: height - 260, left: -60,
            width: 360, height: 360, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
          }} />
        </>
      )}

      {/* Cover: lime top bar */}
      {isCover && (
        <div style={{ position: 'absolute', top: 0, left: 0, width, height: 4, background: '#A3E635' }} />
      )}

      {/* Recap: lime left border */}
      {isRecap && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: 5, height, background: '#A3E635' }} />
      )}

      {/* Problem: bottom accent bar */}
      {isProblem && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, width, height: 3, background: 'rgba(163,230,53,0.3)' }} />
      )}

      {/* ── Content layer ── */}
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        padding: `${pad.y}px ${pad.x}px`,
      }}>

        {/* Top bar: dots + logo */}
        {!isCover && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: topGap }}>
            <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
              {dots}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ color: '#FFFFFF', fontSize: logoSz, fontWeight: 700, letterSpacing: '-0.02em' }}>verim</span>
              <span style={{ color: '#A3E635', fontSize: logoSz, fontWeight: 700, letterSpacing: '-0.02em' }}>io</span>
            </div>
          </div>
        )}

        {/* Cover: logo top-left */}
        {isCover && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ color: '#FFFFFF', fontSize: logoSz, fontWeight: 700, letterSpacing: '-0.02em' }}>verim</span>
            <span style={{ color: '#A3E635', fontSize: logoSz, fontWeight: 700, letterSpacing: '-0.02em' }}>io</span>
          </div>
        )}

        {/* Cover/Recap: spacer to push content down */}
        {(isCover || isRecap) && (
          <div style={{ flex: 1 }} />
        )}

        {/* ── Main content ── */}
        <div style={{
          flex:           (isCover || isRecap) ? undefined : 1,
          display:        'flex',
          flexDirection:  'column',
          justifyContent: (isCover || isRecap) ? 'flex-end' : (isHook || isProblem || isProof ? 'center' : 'flex-start'),
        }}>

          {/* Ghost number (point) */}
          {isPoint && (
            <div style={{
              fontSize: numSz, fontWeight: 900, lineHeight: 1,
              color: 'rgba(163,230,53,0.07)',
              marginBottom: -16, letterSpacing: '-0.04em',
            }}>
              {pointNum}
            </div>
          )}

          {/* Proof: huge stat in lime */}
          {isProof && (
            <div style={{
              fontSize: compact ? 90 : 120, fontWeight: 900, lineHeight: 1,
              color: '#A3E635',
              marginBottom: compact ? 12 : 16, letterSpacing: '-0.04em',
            }}>
              {headline}
            </div>
          )}

          {/* Hook/Cover: lime accent line */}
          {(isHook || isCover) && (
            <div style={{
              width: 48, height: 4, background: '#A3E635', borderRadius: 2,
              marginBottom: compact ? 18 : 26,
            }} />
          )}

          {/* Problem: label tag */}
          {isProblem && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginBottom: compact ? 18 : 24,
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.08)',
                padding: '5px 12px', borderRadius: 6,
              }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: compact ? 14 : 18, fontWeight: 600, letterSpacing: '0.08em' }}>
                  SORUN
                </span>
              </div>
            </div>
          )}

          {/* Recap: "ÖZET" label */}
          {isRecap && (
            <div style={{ marginBottom: compact ? 16 : 22 }}>
              <span style={{ color: '#A3E635', fontSize: compact ? 14 : 18, fontWeight: 700, letterSpacing: '0.12em' }}>
                📌  ÖZET
              </span>
            </div>
          )}

          {/* Headline (not for proof — it's the stat above) */}
          {!isProof && (
            <div style={{
              color:         (isCta || isRecap) ? '#A3E635' : '#FFFFFF',
              fontSize:      hlSz,
              fontWeight:    isRecap ? 700 : 800,
              lineHeight:    isRecap ? 1.4 : 1.15,
              letterSpacing: '-0.022em',
              marginBottom:  compact ? 12 : (isCover ? 0 : 18),
            }}>
              {headline}
            </div>
          )}

          {/* Body text */}
          {body && !isCover && !isRecap && (
            <div style={{
              color: isProof ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.65)',
              fontSize: isProof ? (compact ? 18 : 22) : bodySz,
              lineHeight: 1.65, fontWeight: 400,
            }}>
              {body}
            </div>
          )}

          {/* Recap: bullet lines */}
          {isRecap && recapLines.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 10 : 14 }}>
              {recapLines.map((line, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: '#A3E635', flexShrink: 0, marginTop: 7,
                  }} />
                  <span style={{ color: 'rgba(255,255,255,0.80)', fontSize: compact ? 18 : 24, lineHeight: 1.5, fontWeight: 400 }}>
                    {line.replace(/^[\d\-\.\•\*]+\s*/, '')}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* CTA button */}
          {isCta && (
            <div style={{ marginTop: compact ? 24 : 36, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{
                background: '#A3E635', padding: compact ? '12px 28px' : '16px 36px',
                borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10,
                alignSelf: 'flex-start',
              }}>
                <span style={{ color: '#1E0A46', fontWeight: 700, fontSize: compact ? 20 : 26 }}>
                  Ücretsiz analiz al
                </span>
                <span style={{ color: '#1E0A46', fontSize: compact ? 20 : 26, fontWeight: 700 }}>→</span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: compact ? 15 : 19 }}>
                verimio.com.tr · DM ile ulaşın
              </span>
            </div>
          )}

          {/* Hook swipe prompt */}
          {isHook && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginTop: compact ? 20 : 36,
              color: 'rgba(255,255,255,0.30)', fontSize: compact ? 16 : 21,
            }}>
              <span>Devamı için kaydır</span>
              <span style={{ color: 'rgba(163,230,53,0.5)' }}>→</span>
            </div>
          )}

          {/* Recap save hint */}
          {isRecap && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginTop: compact ? 18 : 28,
              color: 'rgba(163,230,53,0.5)', fontSize: compact ? 14 : 18,
            }}>
              <span>🔖</span>
              <span>Bu carousel'i kaydet</span>
            </div>
          )}
        </div>

        {/* ── Footer bar: URL left + slide counter right ── */}
        {!isCta && !isCover && (
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: compact ? 16 : 28,
          }}>
            <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: compact ? 16 : 20, letterSpacing: '0.01em' }}>
              verimio.com.tr
            </span>
            {index < total && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(163,230,53,0.35)', fontSize: compact ? 15 : 19 }}>
                <span>{index}/{total}</span>
                <span>→</span>
              </div>
            )}
          </div>
        )}

        {/* Cover bottom bar */}
        {isCover && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            marginTop: compact ? 16 : 24,
          }}>
            <div style={{ width: 28, height: 3, background: '#A3E635', borderRadius: 2 }} />
            <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: compact ? 17 : 21, letterSpacing: '0.02em' }}>
              verimio.com.tr
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
