'use client'
import { useState } from 'react'

// ─── Renk Sistemi ────────────────────────────────────────────────────────────
const COLORS = {
  core: [
    { name: 'Deep Indigo', token: 'primary', hex: '#2E1065', use: 'Ana arka plan, navbar', dark: true },
    { name: 'Vivid Lime', token: 'secondary', hex: '#A3E635', use: 'CTA, vurgu, logo io', dark: false },
    { name: 'Dark Indigo', token: 'dark', hex: '#1E0A46', use: 'Card arka planı', dark: true },
    { name: 'Soft Purple', token: 'primary-light', hex: '#8B5CF6', use: 'Gradient, hover, link', dark: true },
  ],
  neutral: [
    { name: 'White', token: 'white', hex: '#FFFFFF', use: 'Logo verim, başlıklar (dark bg)', dark: false },
    { name: 'Cream', token: 'cream', hex: '#F5F5F4', use: 'Light mode arka plan', dark: false },
    { name: 'Stone', token: 'muted', hex: '#78716C', use: 'Gövde metni, alt yazı', dark: true },
    { name: 'Charcoal', token: 'foreground', hex: '#1C1917', use: 'Light mode metin', dark: false },
  ],
  semantic: [
    { name: 'Success', token: 'success', hex: '#22C55E', use: 'Başarı mesajı, onay', dark: true },
    { name: 'Warning', token: 'warning', hex: '#F59E0B', use: 'Uyarı, dikkat', dark: false },
    { name: 'Error', token: 'error', hex: '#EF4444', use: 'Hata, iptal', dark: true },
    { name: 'Info', token: 'info', hex: '#3B82F6', use: 'Bilgi mesajı, link', dark: true },
  ],
  extended: [
    { name: 'Lime 300', token: 'lime-300', hex: '#BEF264', use: 'Hover state, soft vurgu', dark: false },
    { name: 'Lime 700', token: 'lime-700', hex: '#4D7C0F', use: 'Dark mode lime text', dark: true },
    { name: 'Indigo 800', token: 'indigo-800', hex: '#1E1B4B', use: 'Section arka plan', dark: true },
    { name: 'Indigo 400', token: 'indigo-400', hex: '#818CF8', use: 'Border, divider', dark: true },
  ],
}

// ─── Logo Varyasyonları ───────────────────────────────────────────────────────
const LOGO_VARIANTS = [
  {
    id: 'dark-full',
    label: 'Dark — Full Wordmark',
    bg: '#2E1065',
    verim: '#FFFFFF',
    io: '#A3E635',
    size: 52,
  },
  {
    id: 'light-full',
    label: 'Light — Full Wordmark',
    bg: '#F5F5F4',
    verim: '#2E1065',
    io: '#4D7C0F',
    size: 52,
  },
  {
    id: 'dark-mono',
    label: 'Dark — Monochrome',
    bg: '#2E1065',
    verim: '#FFFFFF',
    io: '#FFFFFF',
    size: 52,
  },
  {
    id: 'light-mono',
    label: 'Light — Monochrome',
    bg: '#F5F5F4',
    verim: '#1C1917',
    io: '#1C1917',
    size: 52,
  },
  {
    id: 'dark-reverse',
    label: 'Dark — Lime Heavy',
    bg: '#1E0A46',
    verim: '#A3E635',
    io: '#FFFFFF',
    size: 52,
  },
  {
    id: 'black-full',
    label: 'Black — Full',
    bg: '#000000',
    verim: '#FFFFFF',
    io: '#A3E635',
    size: 52,
  },
]

// ─── V Monogram ───────────────────────────────────────────────────────────────
const MONOGRAM_VARIANTS = [
  { id: 'v-dark', label: 'Dark', bg: '#2E1065', v: '#FFFFFF', dot: '#A3E635' },
  { id: 'v-light', label: 'Light', bg: '#F5F5F4', v: '#2E1065', dot: '#4D7C0F' },
  { id: 'v-lime', label: 'Lime BG', bg: '#A3E635', v: '#2E1065', dot: '#1E0A46' },
  { id: 'v-black', label: 'Black', bg: '#000000', v: '#FFFFFF', dot: '#A3E635' },
]

// ─── Font Örnekleri ───────────────────────────────────────────────────────────
const FONT_SAMPLES = [
  { label: 'H1 — 60px Bold', size: 60, weight: 700, text: 'Verimio' },
  { label: 'H2 — 36px Bold', size: 36, weight: 700, text: 'İş Süreçlerini AI ile Dönüştür' },
  { label: 'H3 — 24px SemiBold', size: 24, weight: 600, text: '3 dakikada hazırlık seviyeni öğren' },
  { label: 'Body — 18px Regular', size: 18, weight: 400, text: 'Çoğu KOBİ yapay zekayı doğru sıradan başlatmıyor. Ücretsiz testimiz şirketinin nerede durduğunu gösterir.' },
  { label: 'Small — 14px Regular', size: 14, weight: 400, text: 'AI danışmanlık · KOBİ · Dijital dönüşüm · Otomasyon' },
  { label: 'Mono — 14px', size: 14, weight: 400, text: '#2E1065  #A3E635  font-weight: 700', mono: true },
]

// ─── Sosyal Medya Profil Şablonları ──────────────────────────────────────────
const SOCIAL_PROFILES = [
  { id: 'linkedin', label: 'LinkedIn Profil', size: '400×400', bg: '#2E1065', v: '#FFFFFF', dot: '#A3E635', border: '#A3E635' },
  { id: 'twitter', label: 'Twitter/X Profil', size: '400×400', bg: '#000000', v: '#FFFFFF', dot: '#A3E635', border: '#1A1A1A' },
  { id: 'instagram', label: 'Instagram Profil', size: '400×400', bg: '#1E0A46', v: '#FFFFFF', dot: '#A3E635', border: '#8B5CF6' },
  { id: 'whatsapp', label: 'WhatsApp / iMessage', size: '400×400', bg: '#A3E635', v: '#2E1065', dot: '#1E0A46', border: '#A3E635' },
]

export default function BrandPreviewClient() {
  const [section, setSection] = useState<'logo' | 'colors' | 'typography' | 'social'>('logo')
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (hex: string) => {
    navigator.clipboard.writeText(hex)
    setCopied(hex)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0514', fontFamily: 'var(--font-dm-sans, system-ui)', color: '#FFFFFF' }}>
      <style>{`nav, footer, header { display: none !important; }`}</style>

      {/* Header */}
      <div style={{ borderBottom: '1px solid #1A1030', padding: '16px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#A3E635', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#2E1065', fontWeight: 900, fontSize: 16 }}>V</span>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Verimio Brand Preview</div>
            <div style={{ fontSize: 11, color: '#4C4462' }}>Kurumsal Kimlik Sistemi — 2025</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['logo', 'colors', 'typography', 'social'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              style={{
                padding: '8px 24px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                background: section === s ? '#A3E635' : '#1A1030',
                color: section === s ? '#2E1065' : '#78716C',
                transition: 'all 0.15s',
              }}
            >
              {s === 'logo' ? 'Logo' : 'Sosyal Medya'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '40px' }}>

        {/* ── LOGO ── */}
        {section === 'logo' && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Wordmark Varyasyonları</h2>
              <p style={{ color: '#4C4462', fontSize: 14 }}>Dark, light, monochrome — tüm kullanım senaryoları</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
              {LOGO_VARIANTS.map((v) => (
                <div key={v.id} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #1A1030' }}>
                  <div style={{
                    background: v.bg,
                    padding: '40px 32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 120,
                  }}>
                    <span style={{ fontWeight: 700, fontSize: v.size, letterSpacing: '-0.02em', lineHeight: 1 }}>
                      <span style={{ color: v.verim }}>verim</span>
                      <span style={{ color: v.io }}>io</span>
                    </span>
                  </div>
                  <div style={{ background: '#0F0A1E', padding: '12px 16px' }}>
                    <div style={{ fontSize: 12, color: '#78716C' }}>{v.label}</div>
                    <div style={{ fontSize: 11, color: '#4C4462', marginTop: 2 }}>
                      verim: <span style={{ color: v.verim === '#FFFFFF' ? '#999' : v.verim }}>{v.verim}</span>
                      {' · '}io: <span style={{ color: v.io }}>{v.io}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>V Monogram</h2>
              <p style={{ color: '#4C4462', fontSize: 14 }}>Favicon, profil fotoğrafı, app icon</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 48 }}>
              {MONOGRAM_VARIANTS.map((m) => (
                <div key={m.id} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #1A1030' }}>
                  <div style={{ background: m.bg, padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* V monogram SVG */}
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                      <path d="M8 12 L32 52 L56 12" stroke={m.v} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      <circle cx="32" cy="10" r="5" fill={m.dot}/>
                    </svg>
                  </div>
                  <div style={{ background: '#0F0A1E', padding: '12px 16px' }}>
                    <div style={{ fontSize: 12, color: '#78716C' }}>{m.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Boyut skalası */}
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Boyut Skalası</h2>
              <p style={{ color: '#4C4462', fontSize: 14 }}>Dark bg üzerinde — favicon'dan billboard'a</p>
            </div>
            <div style={{ background: '#2E1065', borderRadius: 16, padding: '40px 48px', border: '1px solid #1A1030', display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap', marginBottom: 48 }}>
              {[16, 24, 32, 48, 72, 96].map((size) => (
                <div key={size} style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: size, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    <span style={{ color: '#FFFFFF' }}>verim</span>
                    <span style={{ color: '#A3E635' }}>io</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#4C4462', marginTop: 8 }}>{size}px</div>
                </div>
              ))}
            </div>

            {/* Sosyal Medya Profil Şablonları */}
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Sosyal Medya Profil Fotoğrafları</h2>
              <p style={{ color: '#4C4462', fontSize: 14 }}>Platform bazında profil icon görünümleri</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {SOCIAL_PROFILES.map((p) => (
                <div key={p.id} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #1A1030' }}>
                  <div style={{ background: '#0F0A1E', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                    {/* Circular profile preview */}
                    <div style={{
                      width: 96,
                      height: 96,
                      borderRadius: '50%',
                      background: p.bg,
                      border: `3px solid ${p.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
                        <path d="M8 12 L32 52 L56 12" stroke={p.v} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <circle cx="32" cy="10" r="6" fill={p.dot}/>
                      </svg>
                    </div>
                    {/* Square preview */}
                    <div style={{
                      width: 80,
                      height: 80,
                      borderRadius: 18,
                      background: p.bg,
                      border: `2px solid ${p.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
                        <path d="M8 12 L32 52 L56 12" stroke={p.v} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <circle cx="32" cy="10" r="6" fill={p.dot}/>
                      </svg>
                    </div>
                  </div>
                  <div style={{ background: '#0F0A1E', borderTop: '1px solid #1A1030', padding: '12px 16px' }}>
                    <div style={{ fontSize: 12, color: '#78716C', fontWeight: 500 }}>{p.label}</div>
                    <div style={{ fontSize: 11, color: '#4C4462', marginTop: 2 }}>{p.size}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RENKLER ── */}
        {section === 'colors' && (
          <div>
            {Object.entries(COLORS).map(([group, colors]) => (
              <div key={group} style={{ marginBottom: 40 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#4C4462', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
                  {group === 'core' ? 'Ana Renkler' : group === 'neutral' ? 'Nötr Renkler' : group === 'semantic' ? 'Semantik Renkler' : 'Genişletilmiş Palet'}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  {colors.map((c) => (
                    <div
                      key={c.token}
                      onClick={() => copy(c.hex)}
                      style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #1A1030', cursor: 'pointer', transition: 'transform 0.1s' }}
                    >
                      <div style={{ background: c.hex, height: 80 }} />
                      <div style={{ background: '#0F0A1E', padding: '12px 14px' }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF', marginBottom: 2 }}>{c.name}</div>
                        <div style={{ fontSize: 12, color: '#A3E635', fontFamily: 'var(--font-dm-mono, monospace)' }}>
                          {copied === c.hex ? '✓ Kopyalandı' : c.hex}
                        </div>
                        <div style={{ fontSize: 11, color: '#4C4462', marginTop: 4 }}>{c.use}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Gradient örnekleri */}
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: '#4C4462', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Gradient Kombinasyonları</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  { label: 'Indigo → Lime', bg: 'linear-gradient(135deg, #2E1065 0%, #A3E635 100%)' },
                  { label: 'Purple → Lime', bg: 'linear-gradient(135deg, #8B5CF6 0%, #A3E635 100%)' },
                  { label: 'Dark → Indigo', bg: 'linear-gradient(135deg, #000000 0%, #2E1065 100%)' },
                ].map((g) => (
                  <div key={g.label} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #1A1030' }}>
                    <div style={{ background: g.bg, height: 80 }} />
                    <div style={{ background: '#0F0A1E', padding: '10px 14px', fontSize: 12, color: '#78716C' }}>{g.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TİPOGRAFİ ── */}
        {section === 'typography' && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>DM Sans — Font Sistemi</h2>
              <p style={{ color: '#4C4462', fontSize: 14 }}>Tüm ağırlıklar ve boyutlar canlı önizleme</p>
            </div>

            {/* Ağırlık showcase */}
            <div style={{ background: '#0F0A1E', borderRadius: 16, padding: 32, border: '1px solid #1A1030', marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: '#4C4462', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>DM Sans Ağırlıkları</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  [300, 'Light — İnce, zarif body metni'],
                  [400, 'Regular — Standart gövde ve UI metni'],
                  [500, 'Medium — Etiket, badge, navigasyon'],
                  [600, 'SemiBold — Alt başlık, kart başlığı'],
                  [700, 'Bold — H1, H2, CTA, logo'],
                ].map(([w, label]) => (
                  <div key={w} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                    <span style={{ width: 36, fontSize: 11, color: '#4C4462', fontFamily: 'monospace' }}>{w}</span>
                    <span style={{ fontSize: 22, fontWeight: Number(w), color: '#FFFFFF' }}>{label as string}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Boyut skalası */}
            <div style={{ background: '#0F0A1E', borderRadius: 16, padding: 32, border: '1px solid #1A1030', marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: '#4C4462', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Tipografi Skalası</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {FONT_SAMPLES.map((s) => (
                  <div key={s.label} style={{ borderBottom: '1px solid #1A1030', paddingBottom: 16 }}>
                    <div style={{ fontSize: 11, color: '#A3E635', marginBottom: 6, fontFamily: 'monospace' }}>{s.label}</div>
                    <div style={{
                      fontSize: s.size,
                      fontWeight: s.weight,
                      color: '#FFFFFF',
                      fontFamily: s.mono ? 'var(--font-dm-mono, monospace)' : 'var(--font-dm-sans, system-ui)',
                      lineHeight: s.size > 30 ? 1.2 : 1.6,
                    }}>
                      {s.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dark / Light karşılaştırma */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#2E1065', borderRadius: 16, padding: 32, border: '1px solid #1A1030' }}>
                <div style={{ fontSize: 11, color: '#A3E635', marginBottom: 16, letterSpacing: '0.1em' }}>DARK MODE</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: '#FFFFFF', marginBottom: 8, lineHeight: 1.2 }}>
                  İş Süreçlerini<br />AI ile Dönüştür
                </div>
                <div style={{ fontSize: 16, color: '#78716C', marginBottom: 20, lineHeight: 1.6 }}>
                  3 dakikada şirketinin AI hazırlık seviyesini öğren.
                </div>
                <button style={{ background: '#A3E635', color: '#2E1065', border: 'none', padding: '12px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                  Ücretsiz Başla
                </button>
              </div>
              <div style={{ background: '#F5F5F4', borderRadius: 16, padding: 32, border: '1px solid #E5E5E3' }}>
                <div style={{ fontSize: 11, color: '#4D7C0F', marginBottom: 16, letterSpacing: '0.1em' }}>LIGHT MODE</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: '#2E1065', marginBottom: 8, lineHeight: 1.2 }}>
                  İş Süreçlerini<br />AI ile Dönüştür
                </div>
                <div style={{ fontSize: 16, color: '#78716C', marginBottom: 20, lineHeight: 1.6 }}>
                  3 dakikada şirketinin AI hazırlık seviyesini öğren.
                </div>
                <button style={{ background: '#2E1065', color: '#FFFFFF', border: 'none', padding: '12px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                  Ücretsiz Başla
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── SOSYAL MEDYA ── */}
        {section === 'social' && (
          <div>

            {/* LinkedIn Banner 1584×396 */}
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>LinkedIn Banner</h2>
              <p style={{ color: '#4C4462', fontSize: 14 }}>1584 × 396px</p>
            </div>
            <div style={{ marginBottom: 48, borderRadius: 16, overflow: 'hidden', border: '1px solid #1A1030' }}>
              <div style={{
                background: '#2E1065',
                width: '100%',
                aspectRatio: '1584/396',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 6%',
                overflow: 'hidden',
              }}>
                {/* BG aksan */}
                <div style={{ position: 'absolute', right: '-5%', top: '-40%', width: '45%', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(163,230,53,0.12) 0%, transparent 70%)' }} />
                <div style={{ position: 'absolute', left: '20%', bottom: '-60%', width: '30%', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />
                {/* Sol: logo + slogan */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2%' }}>
                    <div style={{ width: '5%', aspectRatio: '1', minWidth: 32, background: '#A3E635', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 64 64" fill="none" style={{ width: '60%', height: '60%' }}>
                        <path d="M8 12 L32 52 L56 12" stroke="#2E1065" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="32" cy="10" r="6" fill="#1E0A46"/>
                      </svg>
                    </div>
                    <span style={{ color: '#fff', fontSize: 'clamp(14px, 2.5vw, 28px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                      <span>verim</span><span style={{ color: '#A3E635' }}>io</span>
                    </span>
                  </div>
                  <div style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.8vw, 20px)', fontWeight: 700, lineHeight: 1.2 }}>
                    İş Süreçlerini<br /><span style={{ color: '#A3E635' }}>AI ile</span> Dönüştürün
                  </div>
                </div>
                {/* Sağ: CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3%' }}>
                  <div style={{ color: '#78716C', fontSize: 'clamp(8px, 1.2vw, 14px)', textAlign: 'right' }}>
                    3 dakikada AI hazırlık seviyenizi öğrenin
                  </div>
                  <div style={{ background: '#A3E635', color: '#2E1065', padding: '6px 16px', borderRadius: 8, fontSize: 'clamp(8px, 1.2vw, 14px)', fontWeight: 700 }}>
                    Ücretsiz Başla →
                  </div>
                  <div style={{ color: '#4C4462', fontSize: 'clamp(7px, 1vw, 12px)' }}>verimio.com</div>
                </div>
              </div>
              <div style={{ background: '#0F0A1E', padding: '10px 16px', fontSize: 12, color: '#4C4462' }}>LinkedIn Banner — 1584×396</div>
            </div>

            {/* Twitter/X Header 1500×500 */}
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Twitter / X Header</h2>
              <p style={{ color: '#4C4462', fontSize: 14 }}>1500 × 500px</p>
            </div>
            <div style={{ marginBottom: 48, borderRadius: 16, overflow: 'hidden', border: '1px solid #1A1030' }}>
              <div style={{
                background: '#000000',
                width: '100%',
                aspectRatio: '1500/500',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '60%', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(163,230,53,0.08) 0%, transparent 70%)' }} />
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  <div style={{ color: '#fff', fontSize: 'clamp(18px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 8 }}>
                    <span>verim</span><span style={{ color: '#A3E635' }}>io</span>
                  </div>
                  <div style={{ color: '#78716C', fontSize: 'clamp(10px, 1.5vw, 18px)' }}>
                    İş süreçlerini AI ile dönüştür · verimio.com
                  </div>
                </div>
              </div>
              <div style={{ background: '#0F0A1E', padding: '10px 16px', fontSize: 12, color: '#4C4462' }}>Twitter/X Header — 1500×500</div>
            </div>

            {/* Instagram Post 1080×1080 */}
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Instagram Post</h2>
              <p style={{ color: '#4C4462', fontSize: 14 }}>1080 × 1080px — kare format</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
              {/* Tip 1: Dark full */}
              <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #1A1030' }}>
                <div style={{ background: '#2E1065', aspectRatio: '1', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12%', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', bottom: '-20%', right: '-20%', width: '60%', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(163,230,53,0.2) 0%, transparent 70%)' }} />
                  <svg viewBox="0 0 64 64" fill="none" style={{ width: '30%', marginBottom: '8%' }}>
                    <path d="M8 12 L32 52 L56 12" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="32" cy="10" r="6" fill="#A3E635"/>
                  </svg>
                  <div style={{ color: '#fff', fontSize: 'clamp(14px, 3.5vw, 24px)', fontWeight: 700, textAlign: 'center', letterSpacing: '-0.02em' }}>
                    <span>verim</span><span style={{ color: '#A3E635' }}>io</span>
                  </div>
                  <div style={{ color: '#78716C', fontSize: 'clamp(8px, 1.5vw, 11px)', textAlign: 'center', marginTop: '4%' }}>İş Süreçlerini AI ile Dönüştür</div>
                </div>
                <div style={{ background: '#0F0A1E', padding: '10px 14px', fontSize: 11, color: '#4C4462' }}>Dark — Monogram</div>
              </div>
              {/* Tip 2: Lime accent */}
              <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #1A1030' }}>
                <div style={{ background: '#1E0A46', aspectRatio: '1', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', padding: '12%', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#A3E635' }} />
                  <div style={{ color: '#A3E635', fontSize: 'clamp(8px, 1.5vw, 11px)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '4%' }}>AI DANIŞMANLIK</div>
                  <div style={{ color: '#fff', fontSize: 'clamp(12px, 3vw, 20px)', fontWeight: 700, lineHeight: 1.2, marginBottom: '6%' }}>3 dakikada<br />AI hazırlık<br />seviyeni öğren</div>
                  <div style={{ background: '#A3E635', color: '#2E1065', padding: '6px 14px', borderRadius: 8, fontSize: 'clamp(8px, 1.2vw, 11px)', fontWeight: 700 }}>Ücretsiz →</div>
                </div>
                <div style={{ background: '#0F0A1E', padding: '10px 14px', fontSize: 11, color: '#4C4462' }}>Dark — İçerik Post</div>
              </div>
              {/* Tip 3: Light */}
              <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #1A1030' }}>
                <div style={{ background: '#F5F5F4', aspectRatio: '1', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12%', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '8%', right: '8%', width: '20%', aspectRatio: '1', borderRadius: '50%', background: 'rgba(163,230,53,0.3)' }} />
                  <svg viewBox="0 0 64 64" fill="none" style={{ width: '28%', marginBottom: '8%' }}>
                    <path d="M8 12 L32 52 L56 12" stroke="#2E1065" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="32" cy="10" r="6" fill="#4D7C0F"/>
                  </svg>
                  <div style={{ color: '#2E1065', fontSize: 'clamp(14px, 3.5vw, 24px)', fontWeight: 700, textAlign: 'center', letterSpacing: '-0.02em' }}>
                    <span>verim</span><span style={{ color: '#4D7C0F' }}>io</span>
                  </div>
                  <div style={{ color: '#78716C', fontSize: 'clamp(8px, 1.5vw, 11px)', textAlign: 'center', marginTop: '4%' }}>verimio.com</div>
                </div>
                <div style={{ background: '#0F0A1E', padding: '10px 14px', fontSize: 11, color: '#4C4462' }}>Light — Monogram</div>
              </div>
            </div>

            {/* OG / Link Preview */}
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>OG / Link Önizleme</h2>
              <p style={{ color: '#4C4462', fontSize: 14 }}>1200 × 630px — WhatsApp, Slack, Twitter link paylaşımı</p>
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #1A1030' }}>
              <div style={{
                background: '#2E1065',
                width: '100%',
                aspectRatio: '1200/630',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '6%',
                overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '40%', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(163,230,53,0.15) 0%, transparent 70%)' }} />
                <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '25%', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)' }} />
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5%' }}>
                  <div style={{ width: '5%', minWidth: 28, aspectRatio: '1', background: '#A3E635', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 64 64" fill="none" style={{ width: '60%', height: '60%' }}>
                      <path d="M8 12 L32 52 L56 12" stroke="#2E1065" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="32" cy="10" r="6" fill="#1E0A46"/>
                    </svg>
                  </div>
                  <span style={{ color: '#fff', fontSize: 'clamp(12px, 2vw, 26px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                    <span>verim</span><span style={{ color: '#A3E635' }}>io</span>
                  </span>
                </div>
                {/* Orta metin */}
                <div>
                  <div style={{ color: '#fff', fontSize: 'clamp(16px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '2%' }}>
                    İş Süreçlerinizi<br /><span style={{ color: '#A3E635' }}>AI ile</span> Dönüştürün
                  </div>
                  <div style={{ color: '#78716C', fontSize: 'clamp(9px, 1.5vw, 20px)' }}>
                    3 dakikada şirketinizin AI hazırlık seviyesini öğrenin.
                  </div>
                </div>
                {/* Alt CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2%' }}>
                  <div style={{ background: '#A3E635', color: '#2E1065', padding: '8px 20px', borderRadius: 10, fontSize: 'clamp(9px, 1.3vw, 16px)', fontWeight: 700 }}>Ücretsiz Başla</div>
                  <span style={{ color: '#4C4462', fontSize: 'clamp(8px, 1vw, 14px)' }}>verimio.com</span>
                </div>
              </div>
              <div style={{ background: '#0F0A1E', padding: '10px 16px', fontSize: 12, color: '#4C4462' }}>OG Image — 1200×630 (otomatik oluşturuluyor)</div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
