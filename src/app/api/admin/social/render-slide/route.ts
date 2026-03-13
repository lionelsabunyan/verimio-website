/**
 * GET /api/admin/social/render-slide
 * Verilen slide verisinden 1080×1080 PNG üretir (Instagram carousel için).
 * Params: headline, body, type (hook|point|cta), index, total
 */

import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const headline = searchParams.get('headline') ?? ''
  const body     = searchParams.get('body') ?? ''
  const type     = (searchParams.get('type') ?? 'point') as 'hook' | 'point' | 'cta'
  const index    = parseInt(searchParams.get('index') ?? '1', 10)
  const total    = parseInt(searchParams.get('total') ?? '5', 10)

  return new ImageResponse(
    buildSlide(headline, body, type, index, total),
    { width: 1080, height: 1080 }
  )
}

function buildSlide(
  headline: string,
  body: string,
  type: 'hook' | 'point' | 'cta',
  index: number,
  total: number,
) {
  const isHook = type === 'hook'
  const isCta  = type === 'cta'
  const isPoint = type === 'point'
  const pointNumber = isPoint ? String(index - 1).padStart(2, '0') : null

  // Progress dots
  const dots = Array.from({ length: total }, (_, i) => {
    const active = i + 1 === index
    return (
      <div
        key={i}
        style={{
          width:        active ? 28 : 8,
          height:       8,
          borderRadius: 4,
          background:   active ? '#A3E635' : 'rgba(255,255,255,0.2)',
        }}
      />
    )
  })

  return (
    <div
      style={{
        width:       1080,
        height:      1080,
        background:  'linear-gradient(135deg, #1E0A46 0%, #2E1065 100%)',
        display:     'flex',
        flexDirection: 'column',
        padding:     '72px 80px',
        fontFamily:  'system-ui, sans-serif',
        position:    'relative',
        overflow:    'hidden',
      }}
    >
      {/* Lime glow — top right */}
      <div style={{
        position:     'absolute',
        top:          -120,
        right:        -120,
        width:        480,
        height:       480,
        borderRadius: '50%',
        background:   'radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 70%)',
      }} />
      {/* Purple glow — bottom left */}
      <div style={{
        position:     'absolute',
        bottom:       -100,
        left:         -80,
        width:        380,
        height:       380,
        borderRadius: '50%',
        background:   'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
      }} />

      {/* ── TOP BAR ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 64 }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {dots}
        </div>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: '#FFFFFF', fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em' }}>verim</span>
          <span style={{ color: '#A3E635', fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em' }}>io</span>
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <div style={{
        flex:          1,
        display:       'flex',
        flexDirection: 'column',
        justifyContent: isHook ? 'center' : 'flex-start',
      }}>
        {/* Point: big background number */}
        {isPoint && (
          <div style={{
            fontSize:    160,
            fontWeight:  900,
            color:       'rgba(163,230,53,0.07)',
            lineHeight:  1,
            marginBottom: -30,
            letterSpacing: '-0.04em',
          }}>
            {pointNumber}
          </div>
        )}

        {/* Hook: top accent line */}
        {isHook && (
          <div style={{
            width:        64,
            height:       4,
            background:   '#A3E635',
            borderRadius: 2,
            marginBottom: 36,
          }} />
        )}

        {/* Headline */}
        <div style={{
          color:         isCta ? '#A3E635' : '#FFFFFF',
          fontSize:      isHook ? 76 : isCta ? 64 : 54,
          fontWeight:    800,
          lineHeight:    1.15,
          letterSpacing: '-0.025em',
          marginBottom:  isHook ? 36 : 24,
        }}>
          {headline}
        </div>

        {/* Body */}
        {body && (
          <div style={{
            color:      'rgba(255,255,255,0.65)',
            fontSize:   isHook ? 30 : 28,
            lineHeight: 1.65,
            fontWeight: 400,
          }}>
            {body}
          </div>
        )}

        {/* CTA: button + URL */}
        {isCta && (
          <div style={{
            marginTop:     48,
            display:       'flex',
            flexDirection: 'column',
            gap:           16,
            alignItems:    'flex-start',
          }}>
            <div style={{
              background:   '#A3E635',
              padding:      '18px 40px',
              borderRadius: 16,
              display:      'flex',
              alignItems:   'center',
              gap:          12,
            }}>
              <span style={{ color: '#1E0A46', fontWeight: 700, fontSize: 28 }}>verimio.com.tr</span>
              <span style={{ color: '#1E0A46', fontSize: 28, fontWeight: 700 }}>→</span>
            </div>
          </div>
        )}

        {/* Hook: swipe hint */}
        {isHook && (
          <div style={{
            display:    'flex',
            alignItems: 'center',
            gap:        10,
            marginTop:  48,
            color:      'rgba(255,255,255,0.35)',
            fontSize:   24,
          }}>
            <span>Devamı için kaydır</span>
            <span>→</span>
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      {!isCta && (
        <div style={{
          color:    'rgba(255,255,255,0.2)',
          fontSize: 22,
          marginTop: 32,
          letterSpacing: '0.01em',
        }}>
          verimio.com.tr
        </div>
      )}
    </div>
  )
}
