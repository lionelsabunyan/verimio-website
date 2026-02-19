'use client'
import { useState } from 'react'

// ─── Yeni bileşenler ──────────────────────────────────────────────────────────
import ProcessAnalysisIcon from '@/components/brand/icons/services/ProcessAnalysisIcon'
import WorkflowAutomationIcon from '@/components/brand/icons/services/WorkflowAutomationIcon'
import CustomerExperienceIcon from '@/components/brand/icons/services/CustomerExperienceIcon'
import DataReportingIcon from '@/components/brand/icons/services/DataReportingIcon'
import AIStrategyIcon from '@/components/brand/icons/services/AIStrategyIcon'
import DiscoveryIcon from '@/components/brand/icons/process/DiscoveryIcon'
import AnalysisIcon from '@/components/brand/icons/process/AnalysisIcon'
import ExecutionIcon from '@/components/brand/icons/process/ExecutionIcon'
import TimeIcon from '@/components/brand/icons/ui/TimeIcon'
import ROIIcon from '@/components/brand/icons/ui/ROIIcon'
import CheckUpIcon from '@/components/brand/icons/ui/CheckUpIcon'
import RoadmapIcon from '@/components/brand/icons/ui/RoadmapIcon'
import ShieldIcon from '@/components/brand/icons/ui/ShieldIcon'
import HakkimizdaHeroIllustration from '@/components/brand/illustrations/HakkimizdaHeroIllustration'
import TestimonialAvatar from '@/components/brand/TestimonialAvatar'
import BlogCardImage from '@/components/brand/BlogCardImage'
import ArticlePostTemplate from '@/components/brand/social/ArticlePostTemplate'
import TipCardTemplate from '@/components/brand/social/TipCardTemplate'
import type { SocialAspect } from '@/components/brand/social/ArticlePostTemplate'

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
  { id: 'dark-full', label: 'Dark — Full Wordmark', bg: '#2E1065', verim: '#FFFFFF', io: '#A3E635', size: 52 },
  { id: 'light-full', label: 'Light — Full Wordmark', bg: '#F5F5F4', verim: '#2E1065', io: '#4D7C0F', size: 52 },
  { id: 'dark-mono', label: 'Dark — Monochrome', bg: '#2E1065', verim: '#FFFFFF', io: '#FFFFFF', size: 52 },
  { id: 'light-mono', label: 'Light — Monochrome', bg: '#F5F5F4', verim: '#1C1917', io: '#1C1917', size: 52 },
  { id: 'dark-reverse', label: 'Dark — Lime Heavy', bg: '#1E0A46', verim: '#A3E635', io: '#FFFFFF', size: 52 },
  { id: 'black-full', label: 'Black — Full', bg: '#000000', verim: '#FFFFFF', io: '#A3E635', size: 52 },
]

const MONOGRAM_VARIANTS = [
  { id: 'v-dark', label: 'Dark', bg: '#2E1065', v: '#FFFFFF', dot: '#A3E635' },
  { id: 'v-light', label: 'Light', bg: '#F5F5F4', v: '#2E1065', dot: '#4D7C0F' },
  { id: 'v-lime', label: 'Lime BG', bg: '#A3E635', v: '#2E1065', dot: '#1E0A46' },
  { id: 'v-black', label: 'Black', bg: '#000000', v: '#FFFFFF', dot: '#A3E635' },
]

const FONT_SAMPLES = [
  { label: 'H1 — 60px Bold', size: 60, weight: 700, text: 'Verimio' },
  { label: 'H2 — 36px Bold', size: 36, weight: 700, text: 'İş Süreçlerini AI ile Dönüştür' },
  { label: 'H3 — 24px SemiBold', size: 24, weight: 600, text: '3 dakikada hazırlık seviyeni öğren' },
  { label: 'Body — 18px Regular', size: 18, weight: 400, text: 'Verimio, şirketlerin operasyonel darboğazlarını tespit eder, yapay zeka ve otomasyon çözümleriyle kalıcı verimlilik kazanımları sağlar.' },
  { label: 'Small — 14px Regular', size: 14, weight: 400, text: 'AI danışmanlık · Süreç otomasyonu · Dijital dönüşüm · Veri raporlama' },
  { label: 'Mono — 14px', size: 14, weight: 400, text: '#2E1065  #A3E635  font-weight: 700', mono: true },
]

const SOCIAL_PROFILES = [
  { id: 'linkedin', label: 'LinkedIn Profil', size: '400×400', bg: '#2E1065', v: '#FFFFFF', dot: '#A3E635', border: '#A3E635' },
  { id: 'twitter', label: 'Twitter/X Profil', size: '400×400', bg: '#000000', v: '#FFFFFF', dot: '#A3E635', border: '#1A1A1A' },
  { id: 'instagram', label: 'Instagram Profil', size: '400×400', bg: '#1E0A46', v: '#FFFFFF', dot: '#A3E635', border: '#8B5CF6' },
  { id: 'whatsapp', label: 'WhatsApp / iMessage', size: '400×400', bg: '#A3E635', v: '#2E1065', dot: '#1E0A46', border: '#A3E635' },
]

// ─── İkon verileri ────────────────────────────────────────────────────────────
const SERVICE_ICONS = [
  { label: 'ProcessAnalysis', sub: 'Süreç Analizi', Icon: ProcessAnalysisIcon },
  { label: 'WorkflowAutomation', sub: 'İş Akışı Otomasyonu', Icon: WorkflowAutomationIcon },
  { label: 'CustomerExperience', sub: 'Müşteri Deneyimi', Icon: CustomerExperienceIcon },
  { label: 'DataReporting', sub: 'Veri & Raporlama', Icon: DataReportingIcon },
  { label: 'AIStrategy', sub: 'AI Strateji', Icon: AIStrategyIcon },
]

const PROCESS_ICONS = [
  { label: 'DiscoveryIcon', sub: 'Tanıyalım', Icon: DiscoveryIcon },
  { label: 'AnalysisIcon', sub: 'Analiz', Icon: AnalysisIcon },
  { label: 'ExecutionIcon', sub: 'Harekete Geç', Icon: ExecutionIcon },
]

const UI_ICONS = [
  { label: 'TimeIcon', sub: 'Süre / Hız', Icon: TimeIcon },
  { label: 'ROIIcon', sub: 'ROI / Büyüme', Icon: ROIIcon },
  { label: 'CheckUpIcon', sub: 'Check-Up', Icon: CheckUpIcon },
  { label: 'RoadmapIcon', sub: 'Yol Haritası', Icon: RoadmapIcon },
  { label: 'ShieldIcon', sub: 'Güvenlik', Icon: ShieldIcon },
]

// ─── Blog kategorileri ────────────────────────────────────────────────────────
const BLOG_CATEGORIES = [
  { category: 'ai-tools' as const, label: 'AI Araçları' },
  { category: 'automation' as const, label: 'Otomasyon' },
  { category: 'data' as const, label: 'Veri & Raporlama' },
  { category: 'strategy' as const, label: 'Strateji' },
  { category: 'security' as const, label: 'Veri Güvenliği' },
  { category: 'customer' as const, label: 'Müşteri Deneyimi' },
  { category: 'roi' as const, label: 'ROI & Verimlilik' },
  { category: 'tutorial' as const, label: 'Rehber' },
]

// ─── Tab Types ────────────────────────────────────────────────────────────────
type Section = 'logo' | 'colors' | 'typography' | 'social' | 'icons' | 'illustration' | 'blog' | 'templates'

const TABS: { id: Section; label: string }[] = [
  { id: 'logo', label: 'Logo' },
  { id: 'colors', label: 'Renkler' },
  { id: 'typography', label: 'Tipografi' },
  { id: 'icons', label: 'İkonlar' },
  { id: 'illustration', label: 'İllüstrasyon' },
  { id: 'blog', label: 'Blog Görselleri' },
  { id: 'templates', label: 'Sosyal Şablonlar' },
  { id: 'social', label: 'Sosyal Profil' },
]

// ─── Ortak yardımcılar ────────────────────────────────────────────────────────
const card = (style?: React.CSSProperties): React.CSSProperties => ({
  background: '#0F0A1E',
  border: '1px solid #1A1030',
  borderRadius: 16,
  overflow: 'hidden',
  ...style,
})

const label = (text: string, sub?: string) => (
  <div style={{ background: '#0F0A1E', borderTop: '1px solid #1A1030', padding: '10px 14px' }}>
    <div style={{ fontSize: 12, color: '#78716C', fontWeight: 500 }}>{text}</div>
    {sub && <div style={{ fontSize: 11, color: '#4C4462', marginTop: 2 }}>{sub}</div>}
  </div>
)

// ─── İkon kutusu ─────────────────────────────────────────────────────────────
function IconBox({ Icon, name, sub, size = 24, bg = '#1A1030' }: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any; name: string; sub: string; size?: number; bg?: string
}) {
  return (
    <div style={card()}>
      <div style={{ background: bg, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        {/* 4 boyut showcase */}
        {[16, 24, 32, 48].map((s) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 20, fontSize: 10, color: '#4C4462', textAlign: 'right', fontFamily: 'monospace' }}>{s}</div>
            <div style={{ color: '#8B5CF6' }}>
              <Icon size={s} className="" />
            </div>
          </div>
        ))}
      </div>
      {label(name, sub)}
    </div>
  )
}

// ─── Ana bileşen ──────────────────────────────────────────────────────────────
export default function BrandPreviewClient() {
  const [section, setSection] = useState<Section>('logo')
  const [copied, setCopied] = useState<string | null>(null)
  const [socialAspect, setSocialAspect] = useState<SocialAspect>('instagram')

  const copy = (hex: string) => {
    navigator.clipboard.writeText(hex)
    setCopied(hex)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0514', fontFamily: 'var(--font-dm-sans, system-ui)', color: '#FFFFFF' }}>
      <style>{`nav, footer, header { display: none !important; }`}</style>

      {/* Header */}
      <div style={{ borderBottom: '1px solid #1A1030', padding: '16px 32px', display: 'flex', flexDirection: 'column', gap: 12, position: 'sticky', top: 0, background: '#0A0514', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#A3E635', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#2E1065', fontWeight: 900, fontSize: 16 }}>V</span>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Verimio Brand Preview</div>
            <div style={{ fontSize: 11, color: '#4C4462' }}>Kurumsal Kimlik Sistemi — v4 · 2026</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSection(t.id)}
              style={{
                padding: '7px 16px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                background: section === t.id ? '#A3E635' : '#1A1030',
                color: section === t.id ? '#2E1065' : '#78716C',
                transition: 'all 0.15s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '40px' }}>

        {/* ══ LOGO ══ */}
        {section === 'logo' && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Wordmark Varyasyonları</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 32 }}>Dark, light, monochrome — tüm kullanım senaryoları</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
              {LOGO_VARIANTS.map((v) => (
                <div key={v.id} style={card()}>
                  <div style={{ background: v.bg, padding: '40px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
                    <span style={{ fontWeight: 700, fontSize: v.size, letterSpacing: '-0.02em', lineHeight: 1 }}>
                      <span style={{ color: v.verim }}>verim</span>
                      <span style={{ color: v.io }}>io</span>
                    </span>
                  </div>
                  {label(v.label, `verim: ${v.verim} · io: ${v.io}`)}
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>V Monogram</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 24 }}>Favicon, profil fotoğrafı, app icon</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 48 }}>
              {MONOGRAM_VARIANTS.map((m) => (
                <div key={m.id} style={card()}>
                  <div style={{ background: m.bg, padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                      <path d="M8 12 L32 52 L56 12" stroke={m.v} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      <circle cx="32" cy="10" r="5" fill={m.dot}/>
                    </svg>
                  </div>
                  {label(m.label)}
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Boyut Skalası</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 24 }}>Dark bg üzerinde — favicon'dan billboard'a</p>
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

            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Sosyal Medya Profil Fotoğrafları</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 24 }}>Platform bazında profil icon görünümleri</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {SOCIAL_PROFILES.map((p) => (
                <div key={p.id} style={card()}>
                  <div style={{ background: '#0F0A1E', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 96, height: 96, borderRadius: '50%', background: p.bg, border: `3px solid ${p.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
                        <path d="M8 12 L32 52 L56 12" stroke={p.v} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <circle cx="32" cy="10" r="6" fill={p.dot}/>
                      </svg>
                    </div>
                    <div style={{ width: 80, height: 80, borderRadius: 18, background: p.bg, border: `2px solid ${p.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
                        <path d="M8 12 L32 52 L56 12" stroke={p.v} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <circle cx="32" cy="10" r="6" fill={p.dot}/>
                      </svg>
                    </div>
                  </div>
                  {label(p.label, p.size)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ RENKLER ══ */}
        {section === 'colors' && (
          <div>
            {Object.entries(COLORS).map(([group, colors]) => (
              <div key={group} style={{ marginBottom: 40 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#4C4462', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
                  {group === 'core' ? 'Ana Renkler' : group === 'neutral' ? 'Nötr Renkler' : group === 'semantic' ? 'Semantik Renkler' : 'Genişletilmiş Palet'}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  {colors.map((c) => (
                    <div key={c.token} onClick={() => copy(c.hex)} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #1A1030', cursor: 'pointer' }}>
                      <div style={{ background: c.hex, height: 80 }} />
                      <div style={{ background: '#0F0A1E', padding: '12px 14px' }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF', marginBottom: 2 }}>{c.name}</div>
                        <div style={{ fontSize: 12, color: '#A3E635', fontFamily: 'monospace' }}>{copied === c.hex ? '✓ Kopyalandı' : c.hex}</div>
                        <div style={{ fontSize: 11, color: '#4C4462', marginTop: 4 }}>{c.use}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
        )}

        {/* ══ TİPOGRAFİ ══ */}
        {section === 'typography' && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>DM Sans — Font Sistemi</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 32 }}>Tüm ağırlıklar ve boyutlar canlı önizleme</p>
            <div style={{ background: '#0F0A1E', borderRadius: 16, padding: 32, border: '1px solid #1A1030', marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: '#4C4462', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>DM Sans Ağırlıkları</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[[300, 'Light — İnce, zarif body metni'], [400, 'Regular — Standart gövde ve UI metni'], [500, 'Medium — Etiket, badge, navigasyon'], [600, 'SemiBold — Alt başlık, kart başlığı'], [700, 'Bold — H1, H2, CTA, logo']].map(([w, lbl]) => (
                  <div key={w} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                    <span style={{ width: 36, fontSize: 11, color: '#4C4462', fontFamily: 'monospace' }}>{w}</span>
                    <span style={{ fontSize: 22, fontWeight: Number(w), color: '#FFFFFF' }}>{lbl as string}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#0F0A1E', borderRadius: 16, padding: 32, border: '1px solid #1A1030', marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: '#4C4462', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Tipografi Skalası</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {FONT_SAMPLES.map((s) => (
                  <div key={s.label} style={{ borderBottom: '1px solid #1A1030', paddingBottom: 16 }}>
                    <div style={{ fontSize: 11, color: '#A3E635', marginBottom: 6, fontFamily: 'monospace' }}>{s.label}</div>
                    <div style={{ fontSize: s.size, fontWeight: s.weight, color: '#FFFFFF', fontFamily: s.mono ? 'var(--font-dm-mono, monospace)' : 'var(--font-dm-sans, system-ui)', lineHeight: s.size > 30 ? 1.2 : 1.6 }}>{s.text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#2E1065', borderRadius: 16, padding: 32, border: '1px solid #1A1030' }}>
                <div style={{ fontSize: 11, color: '#A3E635', marginBottom: 16, letterSpacing: '0.1em' }}>DARK MODE</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: '#FFFFFF', marginBottom: 8, lineHeight: 1.2 }}>İş Süreçlerini<br />AI ile Dönüştür</div>
                <div style={{ fontSize: 16, color: '#78716C', marginBottom: 20, lineHeight: 1.6 }}>3 dakikada şirketinin AI hazırlık seviyesini öğren.</div>
                <button style={{ background: '#A3E635', color: '#2E1065', border: 'none', padding: '12px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Check-Up Başlatın</button>
              </div>
              <div style={{ background: '#F5F5F4', borderRadius: 16, padding: 32, border: '1px solid #E5E5E3' }}>
                <div style={{ fontSize: 11, color: '#4D7C0F', marginBottom: 16, letterSpacing: '0.1em' }}>LIGHT MODE</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: '#2E1065', marginBottom: 8, lineHeight: 1.2 }}>İş Süreçlerini<br />AI ile Dönüştür</div>
                <div style={{ fontSize: 16, color: '#78716C', marginBottom: 20, lineHeight: 1.6 }}>3 dakikada şirketinin AI hazırlık seviyesini öğren.</div>
                <button style={{ background: '#2E1065', color: '#FFFFFF', border: 'none', padding: '12px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Check-Up Başlatın</button>
              </div>
            </div>
          </div>
        )}

        {/* ══ İKONLAR ══ */}
        {section === 'icons' && (
          <div>
            {/* Servis İkonları */}
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Servis İkonları</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 24 }}>32×32 viewBox · strokeWidth=1.5 · currentColor + lime aksan · Expertise & Hizmetler sayfası</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 48 }}>
              {SERVICE_ICONS.map(({ label: lbl, sub, Icon }) => (
                <IconBox key={lbl} Icon={Icon} name={lbl} sub={sub} bg="#1A1030" />
              ))}
            </div>

            {/* Süreç İkonları */}
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Süreç İkonları</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 24 }}>24×24 viewBox · HowItWorks bölümü · adım bazlı anlatı</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
              {PROCESS_ICONS.map(({ label: lbl, sub, Icon }) => (
                <IconBox key={lbl} Icon={Icon} name={lbl} sub={sub} bg="#1A1030" />
              ))}
            </div>

            {/* UI İkonları */}
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>UI İkonları</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 24 }}>Hero kartları, Contact, CTA, Analiz sayfası — küçük boyutlarda kullanılır</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 48 }}>
              {UI_ICONS.map(({ label: lbl, sub, Icon }) => (
                <IconBox key={lbl} Icon={Icon} name={lbl} sub={sub} bg="#1A1030" />
              ))}
            </div>

            {/* Gerçek kullanım: Hero kartları */}
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Gerçek Kullanım — Hero Kartları</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 24 }}>Site'deki ana sayfa hero sağ kolon görünümü</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
              {[
                { Icon: TimeIcon, title: 'Hızlı Uygulama', desc: 'İlk otomasyon çözümü 2–3 haftada canlıya alınır.' },
                { Icon: ROIIcon, title: 'Ölçülebilir Getiri', desc: 'Her proje, net ROI hedefiyle başlar ve takip edilir.' },
                { Icon: RoadmapIcon, title: 'Kurumsal Yol Haritası', desc: 'Tek seferlik proje değil; büyüyen bir dönüşüm programı.' },
              ].map(({ Icon, title, desc }) => (
                <div key={title} style={{ borderRadius: 16, padding: '20px 24px', border: '1px solid #1A1030', background: '#0F0A1E', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(139,92,246,0.12)', color: '#8B5CF6', flexShrink: 0 }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#FFFFFF', marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 13, color: '#78716C', lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ İLLÜSTRASYON ══ */}
        {section === 'illustration' && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Hakkımızda Hero İllüstrasyonu</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 32 }}>480×520 SVG · Structured Flow dili · /hakkimizda sayfası sağ kolon</p>

            {/* Dark bg üzerinde */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
              <div>
                <div style={{ fontSize: 12, color: '#4C4462', marginBottom: 12, fontFamily: 'monospace', letterSpacing: '0.08em' }}>DARK BG (#2E1065)</div>
                <div style={{ background: '#2E1065', borderRadius: 20, padding: 40, border: '1px solid #1A1030', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HakkimizdaHeroIllustration className="max-w-sm" />
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#4C4462', marginBottom: 12, fontFamily: 'monospace', letterSpacing: '0.08em' }}>DARK INDIGO (#1E0A46)</div>
                <div style={{ background: '#1E0A46', borderRadius: 20, padding: 40, border: '1px solid #1A1030', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HakkimizdaHeroIllustration className="max-w-sm" />
                </div>
              </div>
            </div>

            {/* Sayfa önizleme */}
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Sayfa Önizlemesi</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 24 }}>lg:grid-cols-2 layout simülasyonu — gerçek /hakkimizda görünümü</p>
            <div style={{ background: '#2E1065', borderRadius: 20, padding: '40px 48px', border: '1px solid #1A1030', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', marginBottom: 48 }}>
              <div>
                <div style={{ fontSize: 11, color: '#A3E635', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 16 }}>VERİMİO HAKKINDA</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2, marginBottom: 16 }}>Operasyonel<br /><span style={{ color: '#A3E635' }}>mükemmelliği</span><br />birlikte inşa edelim.</div>
                <div style={{ fontSize: 14, color: '#78716C', lineHeight: 1.7 }}>Şirketlerin yapay zeka ve otomasyon teknolojilerini gerçek iş sonuçlarına dönüştürmesine yardımcı oluyoruz.</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <HakkimizdaHeroIllustration className="max-w-xs opacity-90" />
              </div>
            </div>

            {/* TestimonialAvatar */}
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Testimonial Avatar</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 24 }}>44×44 SVG · 3 renk kombinasyonu · index ile döngüsel</p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 48 }}>
              {['Ahmet Yılmaz', 'Beyza Kaya', 'Cengiz Öz', 'Dilara Şen', 'Emre Akar', 'Fatma Demir'].map((name, i) => (
                <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <TestimonialAvatar name={name} index={i} size={56} />
                  <div style={{ fontSize: 11, color: '#4C4462', textAlign: 'center' }}>{name.split(' ')[0]}<br />index: {i}</div>
                </div>
              ))}
            </div>

            {/* Avatar gerçek bağlam */}
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Testimonial Bağlamı</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 24 }}>Gerçek kart görünümü simülasyonu</p>
            <div style={{ maxWidth: 600 }}>
              <div style={{ background: '#0F0A1E', borderRadius: 20, padding: 32, border: '1px solid #1A1030' }}>
                <div style={{ marginBottom: 16 }}>
                  {'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: '#A3E635', fontSize: 18 }}>{s}</span>)}
                </div>
                <div style={{ fontSize: 16, color: '#FFFFFF', lineHeight: 1.7, marginBottom: 24, fontStyle: 'italic' }}>
                  &ldquo;Verimio ile çalışmaya başladıktan sonra müşteri onboarding süremizi %60 kısalttık. Ekibimiz artık rutin işler yerine gerçek değer yaratan projelere odaklanıyor.&rdquo;
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <TestimonialAvatar name="Selin Çelik" index={0} size={44} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Selin Çelik</div>
                    <div style={{ fontSize: 12, color: '#4C4462' }}>Operasyon Direktörü · TechCo A.Ş.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ BLOG GÖRSELLERİ ══ */}
        {section === 'blog' && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Blog Kapak Görselleri — 8 Kategori</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 32 }}>SVG prosedürel pattern · her kategori unique görsel dil · BlogCardImage bileşeni</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 48 }}>
              {BLOG_CATEGORIES.map(({ category, label: lbl }, index) => (
                <div key={category} style={card()}>
                  <BlogCardImage index={index} category={category} />
                  <div style={{ background: '#0F0A1E', padding: '10px 14px' }}>
                    <div style={{ fontSize: 12, color: '#78716C', fontWeight: 500 }}>{lbl}</div>
                    <div style={{ fontSize: 11, color: '#4C4462', marginTop: 2, fontFamily: 'monospace' }}>{category}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gerçek kart simülasyonu */}
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Blog Kartı Önizlemesi</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 24 }}>Gerçek blog listesi görünümü simülasyonu</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {[
                { category: 'ai-tools' as const, title: 'ChatGPT\'yi İş Süreçlerine Entegre Etmenin 5 Adımı', date: '12 Şubat 2026', excerpt: 'Kurumsal AI entegrasyonunda en sık yapılan hatalar ve doğru yaklaşımlar.' },
                { category: 'automation' as const, title: 'Muhasebe Süreçlerini Otomatikleştirmenin Tam Rehberi', date: '8 Şubat 2026', excerpt: 'Manuel veri girişinden kurtulun, hata oranını sıfıra indirin.' },
                { category: 'roi' as const, title: 'AI Yatırımınızın Geri Dönüşünü Nasıl Ölçersiniz?', date: '1 Şubat 2026', excerpt: 'Net ROI hesaplama çerçevesi ve örnek vaka analizleri.' },
              ].map((post, i) => (
                <div key={post.title} style={{ background: '#0F0A1E', borderRadius: 20, border: '1px solid #1A1030', overflow: 'hidden' }}>
                  <div style={{ padding: '16px 16px 0' }}>
                    <div style={{ borderRadius: 12, overflow: 'hidden' }}>
                      <BlogCardImage index={i} category={post.category} />
                    </div>
                  </div>
                  <div style={{ padding: '20px 20px 24px' }}>
                    <div style={{ fontSize: 12, color: '#4C4462', marginBottom: 8 }}>{post.date}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.4, marginBottom: 10 }}>{post.title}</div>
                    <div style={{ fontSize: 13, color: '#78716C', lineHeight: 1.6, marginBottom: 16 }}>{post.excerpt}</div>
                    <div style={{ fontSize: 13, color: '#A3E635', fontWeight: 600 }}>Devamını oku →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ SOSYAL ŞABLONLAR ══ */}
        {section === 'templates' && (
          <div>
            {/* Aspect ratio seçici */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 2 }}>Sosyal Medya Şablonları</h2>
                <p style={{ color: '#4C4462', fontSize: 14 }}>SVG tabanlı · 4 platform · export-ready</p>
              </div>
              <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
                {(['linkedin', 'instagram', 'twitter', 'story'] as SocialAspect[]).map((a) => (
                  <button
                    key={a}
                    onClick={() => setSocialAspect(a)}
                    style={{
                      padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                      fontSize: 12, fontWeight: 600,
                      background: socialAspect === a ? '#8B5CF6' : '#1A1030',
                      color: socialAspect === a ? '#FFFFFF' : '#78716C',
                    }}
                  >
                    {a === 'linkedin' ? 'LinkedIn' : a === 'instagram' ? 'Instagram' : a === 'twitter' ? 'Twitter' : 'Story'}
                  </button>
                ))}
              </div>
            </div>

            {/* Boyut bilgisi */}
            <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center', background: '#1A1030', borderRadius: 8, padding: '6px 14px', marginBottom: 32 }}>
              <span style={{ fontSize: 11, color: '#4C4462', fontFamily: 'monospace' }}>
                {socialAspect === 'linkedin' ? '1200 × 628px' : socialAspect === 'instagram' ? '1080 × 1080px' : socialAspect === 'twitter' ? '1200 × 675px' : '1080 × 1920px'}
              </span>
              <span style={{ color: '#1A1030' }}>·</span>
              <span style={{ fontSize: 11, color: '#78716C' }}>600px genişlikte önizleme</span>
            </div>

            {/* Şablon 1 — Article Post */}
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Şablon 1 — Blog Yazısı Paylaşımı</h3>
            <p style={{ color: '#4C4462', fontSize: 13, marginBottom: 20 }}>ArticlePostTemplate · başlık + kategori + tarih + wordmark</p>
            <div style={{ display: 'grid', gridTemplateColumns: socialAspect === 'story' ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)', gap: 20, marginBottom: 48 }}>
              <div style={card()}>
                <div style={{ padding: 16 }}>
                  <ArticlePostTemplate
                    title="ChatGPT'yi İş Süreçlerine Entegre Etmenin 5 Adımı"
                    category="ai-tools"
                    date="12 Şubat 2026"
                    aspect={socialAspect}
                  />
                </div>
                {label('AI Araçları kategorisi', `aspect: ${socialAspect}`)}
              </div>
              <div style={card()}>
                <div style={{ padding: 16 }}>
                  <ArticlePostTemplate
                    title="Muhasebe Süreçlerini Otomatikleştirmenin Tam Rehberi"
                    category="automation"
                    date="8 Şubat 2026"
                    aspect={socialAspect}
                  />
                </div>
                {label('Otomasyon kategorisi', `aspect: ${socialAspect}`)}
              </div>
            </div>

            {/* Şablon 2 — Tip Kartı */}
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Şablon 2 — İpucu / Veri Kartı</h3>
            <p style={{ color: '#4C4462', fontSize: 13, marginBottom: 20 }}>TipCardTemplate · büyük numara + kısa impactful metin</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 48 }}>
              <div style={card()}>
                <div style={{ padding: 16 }}>
                  <TipCardTemplate
                    tipNumber={1}
                    fact="AI kullanan şirketler %40 daha az manuel hata yapıyor."
                    aspect={socialAspect}
                  />
                </div>
                {label('İpucu #1', `aspect: ${socialAspect}`)}
              </div>
              <div style={card()}>
                <div style={{ padding: 16 }}>
                  <TipCardTemplate
                    tipNumber={2}
                    fact="Otomasyon için doğru süreç seçimi ROI'yi 3x artırır."
                    aspect={socialAspect}
                  />
                </div>
                {label('İpucu #2', `aspect: ${socialAspect}`)}
              </div>
            </div>

            {/* Tüm platformlar — karşılaştırma */}
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Tüm Platformlar Karşılaştırması</h3>
            <p style={{ color: '#4C4462', fontSize: 13, marginBottom: 20 }}>Aynı içerik 4 platformda nasıl görünür?</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {(['linkedin', 'instagram', 'twitter', 'story'] as SocialAspect[]).map((a) => (
                <div key={a} style={card()}>
                  <div style={{ padding: 12 }}>
                    <ArticlePostTemplate
                      title="AI Yatırımınızın Geri Dönüşünü Nasıl Ölçersiniz?"
                      category="roi"
                      date="1 Şubat 2026"
                      aspect={a}
                    />
                  </div>
                  {label(a === 'linkedin' ? 'LinkedIn 1200×628' : a === 'instagram' ? 'Instagram 1080×1080' : a === 'twitter' ? 'Twitter 1200×675' : 'Story 1080×1920')}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ SOSYAL PROFİL ══ */}
        {section === 'social' && (
          <div>
            {/* LinkedIn Banner */}
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>LinkedIn Banner</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 24 }}>1584 × 396px</p>
            <div style={{ marginBottom: 48, borderRadius: 16, overflow: 'hidden', border: '1px solid #1A1030' }}>
              <div style={{ background: '#2E1065', width: '100%', aspectRatio: '1584/396', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6%', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-5%', top: '-40%', width: '45%', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(163,230,53,0.12) 0%, transparent 70%)' }} />
                <div style={{ position: 'absolute', left: '20%', bottom: '-60%', width: '30%', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3%' }}>
                  <div style={{ color: '#78716C', fontSize: 'clamp(8px, 1.2vw, 14px)', textAlign: 'right' }}>Operasyonel mükemmelliği birlikte inşa edelim</div>
                  <div style={{ background: '#A3E635', color: '#2E1065', padding: '6px 16px', borderRadius: 8, fontSize: 'clamp(8px, 1.2vw, 14px)', fontWeight: 700 }}>Check-Up Başlatın →</div>
                  <div style={{ color: '#4C4462', fontSize: 'clamp(7px, 1vw, 12px)' }}>verimio.com.tr</div>
                </div>
              </div>
              <div style={{ background: '#0F0A1E', padding: '10px 16px', fontSize: 12, color: '#4C4462' }}>LinkedIn Banner — 1584×396</div>
            </div>

            {/* Twitter/X Header */}
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Twitter / X Header</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 24 }}>1500 × 500px</p>
            <div style={{ marginBottom: 48, borderRadius: 16, overflow: 'hidden', border: '1px solid #1A1030' }}>
              <div style={{ background: '#000000', width: '100%', aspectRatio: '1500/500', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '60%', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(163,230,53,0.08) 0%, transparent 70%)' }} />
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  <div style={{ color: '#fff', fontSize: 'clamp(18px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 8 }}>
                    <span>verim</span><span style={{ color: '#A3E635' }}>io</span>
                  </div>
                  <div style={{ color: '#78716C', fontSize: 'clamp(10px, 1.5vw, 18px)' }}>İş süreçlerini AI ile dönüştür · verimio.com.tr</div>
                </div>
              </div>
              <div style={{ background: '#0F0A1E', padding: '10px 16px', fontSize: 12, color: '#4C4462' }}>Twitter/X Header — 1500×500</div>
            </div>

            {/* OG / Link Preview */}
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>OG / Link Önizleme</h2>
            <p style={{ color: '#4C4462', fontSize: 14, marginBottom: 24 }}>1200 × 630px — WhatsApp, Slack, Twitter link paylaşımı</p>
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #1A1030' }}>
              <div style={{ background: '#2E1065', width: '100%', aspectRatio: '1200/630', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', padding: '6%', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '40%', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(163,230,53,0.15) 0%, transparent 70%)' }} />
                <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '25%', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)' }} />
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
                <div>
                  <div style={{ color: '#fff', fontSize: 'clamp(16px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '2%' }}>
                    İş Süreçlerinizi<br /><span style={{ color: '#A3E635' }}>AI ile</span> Dönüştürün
                  </div>
                  <div style={{ color: '#78716C', fontSize: 'clamp(9px, 1.5vw, 20px)' }}>Operasyonel mükemmelliği birlikte inşa edelim.</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2%' }}>
                  <div style={{ background: '#A3E635', color: '#2E1065', padding: '8px 20px', borderRadius: 10, fontSize: 'clamp(9px, 1.3vw, 16px)', fontWeight: 700 }}>Check-Up Başlatın</div>
                  <span style={{ color: '#4C4462', fontSize: 'clamp(8px, 1vw, 14px)' }}>verimio.com.tr</span>
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
