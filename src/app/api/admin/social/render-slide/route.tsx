/**
 * GET /api/admin/social/render-slide
 * Renders a branded slide PNG for social media posts.
 *
 * Params:
 *   headline  — main text
 *   body      — secondary text
 *   type      — hook | point | cta | cover
 *   index     — slide number (1-based)
 *   total     — total slides in carousel
 *   bg_url    — background photo URL (fal.ai CDN, optional)
 *   platform  — instagram (1080×1080) | linkedin (1200×628) | twitter (1200×675)
 */

import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

type SlideType = 'hook' | 'point' | 'cta' | 'cover'
type Platform  = 'instagram' | 'linkedin' | 'twitter'

const DIMS: Record<Platform, [number, number]> = {
  instagram: [1080, 1080],
  linkedin:  [1200, 628],
  twitter:   [1200, 675],
}

export async function GET(request: NextRequest) {
  const p = request.nextUrl.searchParams

  const headline = p.get('headline') ?? ''
  const body     = p.get('body') ?? ''
  const type     = (p.get('type') ?? 'point') as SlideType
  const index    = parseInt(p.get('index') ?? '1', 10)
  const total    = parseInt(p.get('total') ?? '5', 10)
  const bgUrl    = p.get('bg_url') ?? null
  const platform = (p.get('platform') ?? 'instagram') as Platform

  const [width, height] = DIMS[platform] ?? DIMS.instagram

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
  const isHook  = type === 'hook'
  const isCta   = type === 'cta'
  const isPoint = type === 'point'
  const isCover = type === 'cover'

  // Landscape platforms use compact layout
  const compact = height < 900

  const pad    = compact ? { x: 80, y: 44 } : { x: 80, y: 72 }
  const logoSz = compact ? 24 : 30
  const topGap = compact ? 32 : 64
  const hlSz   = (isCover || isHook) ? (compact ? 50 : 72)
               : isPoint             ? (compact ? 40 : 54)
                                     : (compact ? 42 : 64)
  const bodySz = compact ? 22 : 28
  const numSz  = compact ? 96 : 160

  const pointNumber = isPoint ? String(index - 1).padStart(2, '0') : null

  const dots = !isCover
    ? Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width:        i + 1 === index ? (compact ? 20 : 28) : (compact ? 6 : 8),
          height:       compact ? 6 : 8,
          borderRadius: 4,
          background:   i + 1 === index ? '#A3E635' : 'rgba(255,255,255,0.2)',
        }} />
      ))
    : null

  return (
    <div style={{
      width,
      height,
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
        <img
          src={bgUrl}
          alt=""
          style={{
            position:   'absolute',
            top: 0, left: 0,
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
          }}
        />
      )}

      {/* Dark overlay */}
      {bgUrl && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: isCover
            ? 'linear-gradient(180deg, rgba(10,4,22,0.50) 0%, rgba(10,4,22,0.75) 55%, rgba(10,4,22,0.92) 100%)'
            : 'rgba(10, 4, 22, 0.65)',
        }} />
      )}

      {/* Brand tint */}
      {bgUrl && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, rgba(30,10,70,0.30) 0%, rgba(46,16,101,0.20) 100%)',
        }} />
      )}

      {/* Decorative glows (no-photo fallback) */}
      {!bgUrl && (
        <>
          <div style={{
            position: 'absolute', top: -120, right: -120,
            width: 480, height: 480, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: -100, left: -80,
            width: 380, height: 380, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          }} />
        </>
      )}

      {/* Lime top accent line (cover) */}
      {isCover && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 4, background: '#A3E635',
        }} />
      )}

      {/* ── Content layer ── */}
      <div style={{
        position:      'relative',
        width:         '100%',
        height:        '100%',
        display:       'flex',
        flexDirection: 'column',
        padding:       `${pad.y}px ${pad.x}px`,
      }}>

        {/* Top bar: dots + logo (carousel slides) */}
        {!isCover && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: topGap }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {dots}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: '#FFFFFF', fontSize: logoSz, fontWeight: 700, letterSpacing: '-0.02em' }}>verim</span>
              <span style={{ color: '#A3E635', fontSize: logoSz, fontWeight: 700, letterSpacing: '-0.02em' }}>io</span>
            </div>
          </div>
        )}

        {/* Cover: logo top-left */}
        {isCover && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: '#FFFFFF', fontSize: logoSz, fontWeight: 700, letterSpacing: '-0.02em' }}>verim</span>
            <span style={{ color: '#A3E635', fontSize: logoSz, fontWeight: 700, letterSpacing: '-0.02em' }}>io</span>
          </div>
        )}

        {/* Spacer (cover: push content to bottom) */}
        {isCover && (
          <div style={{ flex: 1 }} />
        )}

        {/* ── Main content ── */}
        <div style={{
          flex:           isCover ? undefined : 1,
          display:        'flex',
          flexDirection:  'column',
          justifyContent: isCover ? 'flex-end' : (isHook ? 'center' : 'flex-start'),
        }}>

          {/* Large background number (point) */}
          {isPoint && (
            <div style={{
              fontSize:     numSz,
              fontWeight:   900,
              color:        'rgba(163,230,53,0.07)',
              lineHeight:   1,
              marginBottom: -20,
              letterSpacing: '-0.04em',
            }}>
              {pointNumber}
            </div>
          )}

          {/* Lime accent line (hook + cover) */}
          {(isHook || isCover) && (
            <div style={{
              width:        56,
              height:       4,
              background:   '#A3E635',
              borderRadius: 2,
              marginBottom: compact ? 20 : 30,
            }} />
          )}

          {/* Headline */}
          <div style={{
            color:         isCta ? '#A3E635' : '#FFFFFF',
            fontSize:      hlSz,
            fontWeight:    800,
            lineHeight:    1.15,
            letterSpacing: '-0.025em',
            marginBottom:  compact ? 14 : (isCover ? 0 : (isHook ? 28 : 20)),
          }}>
            {headline}
          </div>

          {/* Body text (not on cover) */}
          {body && !isCover && (
            <div style={{
              color:      'rgba(255,255,255,0.65)',
              fontSize:   bodySz,
              lineHeight: 1.65,
              fontWeight: 400,
            }}>
              {body}
            </div>
          )}

          {/* CTA button */}
          {isCta && (
            <div style={{ marginTop: compact ? 28 : 44, display: 'flex' }}>
              <div style={{
                background:   '#A3E635',
                padding:      compact ? '12px 32px' : '18px 40px',
                borderRadius: 16,
                display:      'flex',
                alignItems:   'center',
                gap:          12,
              }}>
                <span style={{ color: '#1E0A46', fontWeight: 700, fontSize: compact ? 22 : 28 }}>verimio.com.tr</span>
                <span style={{ color: '#1E0A46', fontSize: compact ? 22 : 28, fontWeight: 700 }}>→</span>
              </div>
            </div>
          )}

          {/* Hook: swipe hint */}
          {isHook && (
            <div style={{
              display:    'flex',
              alignItems: 'center',
              gap:        10,
              marginTop:  compact ? 24 : 44,
              color:      'rgba(255,255,255,0.35)',
              fontSize:   compact ? 18 : 24,
            }}>
              <span>Devamı için kaydır</span>
              <span>→</span>
            </div>
          )}
        </div>

        {/* Footer URL (non-CTA, non-cover carousel slides) */}
        {!isCta && !isCover && (
          <div style={{
            color:         'rgba(255,255,255,0.2)',
            fontSize:      compact ? 18 : 22,
            marginTop:     compact ? 20 : 32,
            letterSpacing: '0.01em',
          }}>
            verimio.com.tr
          </div>
        )}

        {/* Cover: bottom bar */}
        {isCover && (
          <div style={{
            display:    'flex',
            alignItems: 'center',
            gap:        12,
            marginTop:  compact ? 20 : 28,
          }}>
            <div style={{ width: 32, height: 3, background: '#A3E635', borderRadius: 2 }} />
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: compact ? 18 : 22, letterSpacing: '0.02em' }}>
              verimio.com.tr
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
