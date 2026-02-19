'use client'
import { useState, useCallback } from 'react'

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
import BlogSocialCard from '@/components/brand/BlogSocialCard'

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

// ─── Hakkımızda Hero Görselleri (v4 — 3 farklı model) ───────────────────────
const HAKKIMIZDA_HEROES = [
  {
    id: "hakkimizda-flux",
    label: "FLUX 1.1 Pro",
    desc: "Fotoğrafik kalite · hybrid-3 çizgisi · krem zemin · indigo halo · lime nokta aksanlar",
    url: "https://v3b.fal.media/files/b/0a8f1e05/pJaVCx0JzU_cAFTY7as5m_310a8163c1f14ab79b519cc75bfcb006.jpg",
  },
  {
    id: "hakkimizda-ultra",
    label: "FLUX 1.1 Pro Ultra",
    desc: "En yüksek detay · ultra premium kalite · aynı brief farklı render",
    url: "https://v3b.fal.media/files/b/0a8f1e06/fS-gz4D8q-ESFnjHxQuIk_5cd837778af44e84b13ce4933e743146.jpg",
  },
  {
    id: "hakkimizda-ideogram",
    label: "Ideogram v3",
    desc: "Grafik tasarım odaklı · geometrik kompozisyon gücü · brief uygunluğu yüksek",
    url: "https://v3b.fal.media/files/b/0a8f1e08/2tgNjMvxSdsx-4Hlcxj6G_image.png",
  },
  {
    id: "mor-varyant",
    label: "FLUX — Mor Varyant ✦",
    desc: "Koyu indigo→mor gradient · glowing halo · lime aksanlar · dark mode premium · siteyle uyumlu",
    url: "https://v3b.fal.media/files/b/0a8f1e22/Tm44LnbK5V3V5D8isVrLN_d8e0a6e84e084ae69a4fa4803a1ce9e1.jpg",
    highlight: true,
  },
  {
    id: "surec-anlati",
    label: "FLUX — Süreç Anlatı (deneme)",
    desc: "Analiz → Otomasyon → Sonuç akışı · krem zemin · süreç ikonları · lime=sonuç vurgusu",
    url: "https://v3b.fal.media/files/b/0a8f1e22/YEYSDOWltOA8nRzG_omEx_d2a7b9ac1d564e84b55e0c87ea7af35d.jpg",
  },
]

// ─── Hybrid Blog Görselleri (v3 — Blog A + C hybrid) ─────────────────────────
const FLUX_V3_HYBRID = [
  {
    id: "hybrid-1",
    label: "Hybrid 1 — Editorial Geometrik",
    desc: "HBR stili · krem zemin · indigo dikdörtgen · lime aksan köşe",
    size: "landscape_16_9",
    url: "https://v3b.fal.media/files/b/0a8f1da1/yht2u2fKwI416RhjTKkmv_70f95f2bec4840bba18c2ccdf3c9ae7b.jpg",
  },
  {
    id: "hybrid-2",
    label: "Hybrid 2 — Diagonal Stroke",
    desc: "McKinsey stili · krem→gri gradient · çapraz indigo fırça · lime çizgi",
    size: "landscape_16_9",
    url: "https://v3b.fal.media/files/b/0a8f1da1/1Bs67SqzRp9sgd5H4mZfV_8bb4be8520a1419f896990111d923927.jpg",
  },
  {
    id: "hybrid-3",
    label: "Hybrid 3 — Halo & Dots",
    desc: "Stripe stili · krem kağıt doku · indigo halo · nokta grid · lime aksanlar",
    size: "landscape_16_9",
    url: "https://v3b.fal.media/files/b/0a8f1da1/5Oq7anHFhpI-TGv0xxkoo_d41ae8d9e8a441d98329b5a4724f20c4.jpg",
  },
]

// ─── Yeni FLUX Görselleri (v2 — Açık & temiz, FLUX only) ─────────────────────
const FLUX_V2 = [
  {
    id: "hero-abstract",
    label: "Hero A — Soyut Veri Akışı",
    desc: "Açık/krem zemin · ince indigo çizgiler · lime nokta aksanlar · danışmanlık firması estetiği",
    size: "landscape_4_3",
    url: "https://v3b.fal.media/files/b/0a8f1c76/66d4s6UQBzZUYmVynmu8q_cc5b5ed0871140d0970d0c33ede90bca.jpg",
  },
  {
    id: "hero-photo",
    label: "Hero B — Premium Ofis",
    desc: "Gerçek ofis fotoğrafı · doğal ışık · hafif indigo tint overlay · Skandinav minimal",
    size: "landscape_4_3",
    url: "https://v3b.fal.media/files/b/0a8f1c76/d1W5A2SCmc5056KbS5U2l_813fa104c66d45e3b9447e71d7fd0c70.jpg",
  },
  {
    id: "blog-editorial",
    label: "Blog A — Editorial",
    desc: "NYT/HBR stili · krem zemin · kalın geometrik indigo+lime aksanlar · entelektüel",
    size: "landscape_16_9",
    url: "https://v3b.fal.media/files/b/0a8f1c76/VK4aEp0fvAewg1yxPVcog_35bf335741cd4470a130c083bdea99d9.jpg",
  },
  {
    id: "blog-tech",
    label: "Blog B — Tech Editorial",
    desc: "Wired/Fast Company stili · indigo-mor gradient · lime glowing aksanlar · dinamik",
    size: "landscape_16_9",
    url: "https://v3b.fal.media/files/b/0a8f1c76/w8sETJypbjkcb40I1MHTb_812afabc2cd747648160a1d7012f1f42.jpg",
  },
  {
    id: "blog-minimal",
    label: "Blog C — Minimal Gradient",
    desc: "Sade indigo→mor gradient · merkezi lime geometrik ikon · temiz SaaS kart",
    size: "landscape_16_9",
    url: "https://v3b.fal.media/files/b/0a8f1c76/3nMHTGDkpLwOZ7XyjyhSF_ffd8fdf395a743c7a67bcbface973922.jpg",
  },
]

// ─── AI Prompt Setleri ───────────────────────────────────────────────────────
const AI_PROMPTS = {
  illustration: [
    {
      id: "hakkimizda",
      label: "Hakkımızda Hero",
      desc: "Kurumsal yapı → dönüşüm → sonuç metaforu",
      prompt: "Abstract geometric corporate technology illustration, dark deep indigo background (#1E0A46), interconnected nodes and data flow lines in soft purple, a structured bottleneck filter transforming chaotic inputs into clean parallel outputs, three rising bar chart columns at bottom with the rightmost bar in vivid lime green (#A3E635), minimal flat vector art style, no text, no people, technical precision",
      model: "recraft" as const,
      style: "vector_illustration/bold_stroke",
      size: "landscape_4_3",
    },
    {
      id: "howitworks",
      label: "HowItWorks Arka Plan",
      desc: "3 adımlı süreç akışı illüstrasyonu",
      prompt: "Three connected process nodes flowing left to right, dark indigo background, first node represents discovery with magnifying glass shape, second node analysis with data grid, third node execution with checkmark in lime green, bezier curves connecting nodes, geometric flat illustration, minimal corporate style, no text",
      model: "recraft" as const,
      style: "vector_illustration/bold_stroke",
      size: "landscape_16_9",
    },
    {
      id: "expertise",
      label: "Expertise Section",
      desc: "AI & otomasyon servis görseli",
      prompt: "Abstract AI brain circuit illustration, central hexagonal node radiating four connection arms to service boxes, dark purple indigo background, circuit board traces in soft purple glow, terminal node glowing in vivid lime green, flat geometric corporate illustration style, no text, clean minimal",
      model: "recraft" as const,
      style: "digital_illustration/2d_art_poster",
      size: "square_hd",
    },
  ],
  blog: [
    {
      id: "ai-tools",
      label: "AI Araçları Kapağı",
      desc: "Blog kapak — AI tools kategorisi",
      prompt: "Professional tech blog cover image, AI productivity tools concept, dark indigo background with subtle grid, glowing interface windows floating in 3D space, lime green accent highlights on UI elements, minimalist modern design, cinematic lighting, 16:9 format",
      model: "flux" as const,
      style: null,
      size: "landscape_16_9",
    },
    {
      id: "automation",
      label: "Otomasyon Kapağı",
      desc: "Blog kapak — automation kategorisi",
      prompt: "Business process automation concept, dark navy background, flowing workflow arrows connecting process blocks, robotic arm silhouette in blueprint style, lime green data streams, professional corporate illustration, clean modern aesthetic, 16:9",
      model: "flux" as const,
      style: null,
      size: "landscape_16_9",
    },
    {
      id: "roi",
      label: "ROI & Verimlilik Kapağı",
      desc: "Blog kapak — ROI kategorisi",
      prompt: "ROI and business growth visualization, upward trending chart curve on dark indigo background, data points glowing in lime green, financial growth concept, abstract geometric elements, corporate professional aesthetic, clean minimal design, 16:9",
      model: "flux" as const,
      style: null,
      size: "landscape_16_9",
    },
  ],
  social: [
    {
      id: "linkedin-post",
      label: "LinkedIn Post Görseli",
      desc: "1200×628 — LinkedIn paylaşım görseli",
      prompt: "LinkedIn corporate post visual background, dark indigo gradient, abstract geometric shapes with subtle purple glow, professional business technology aesthetic, lime green accent line at left edge, minimal design with space for text overlay, 1.91:1 horizontal ratio",
      model: "recraft" as const,
      style: "digital_illustration/2d_art_poster",
      size: "landscape_16_9",
    },
    {
      id: "instagram-post",
      label: "Instagram Post Görseli",
      desc: "1080×1080 — Instagram kare görseli",
      prompt: "Instagram square post background, deep purple indigo radial gradient, geometric dot cluster bottom left in lime green, concentric ring accent top right in soft purple, minimal corporate design, strong visual hierarchy, space for centered text overlay",
      model: "recraft" as const,
      style: "digital_illustration/2d_art_poster",
      size: "square_hd",
    },
    {
      id: "story-bg",
      label: "Instagram Story Arka Planı",
      desc: "1080×1920 — Dikey story formatı",
      prompt: "Instagram story vertical background, dark indigo bottom to deep purple top gradient, scattered geometric elements, lime green glowing node center composition, abstract data flow lines, corporate tech brand aesthetic, portrait 9:16 format, minimal",
      model: "recraft" as const,
      style: "digital_illustration/2d_art_poster",
      size: "portrait_16_9",
    },
  ],
}

type AICategory = keyof typeof AI_PROMPTS
type AIImageState = Record<string, { url?: string; loading?: boolean; error?: string }>

// ─── Tab Types ────────────────────────────────────────────────────────────────
type Section = 'logo' | 'colors' | 'typography' | 'social' | 'icons' | 'illustration' | 'blog' | 'templates' | 'social-blog' | 'hakkimizda-heroes' | 'ai'

const TABS: { id: Section; label: string }[] = [
  { id: 'logo', label: 'Logo' },
  { id: 'colors', label: 'Renkler' },
  { id: 'typography', label: 'Tipografi' },
  { id: 'icons', label: 'İkonlar' },
  { id: 'illustration', label: 'İllüstrasyon' },
  { id: 'blog', label: 'Blog Görselleri' },
  { id: 'templates', label: 'Sosyal Şablonlar' },
  { id: 'social-blog', label: '✦ Blog Sosyal' },
  { id: 'hakkimizda-heroes', label: '✦ Hakkımızda Hero' },
  { id: 'social', label: 'Sosyal Profil' },
  { id: 'ai', label: 'AI Lab' },
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
  const [aiImages, setAiImages] = useState<AIImageState>({
    // Önceden üretilmiş görseller — sayfa açılır açılmaz görünür
    "hakkimizda":   { url: "https://v3b.fal.media/files/b/0a8f1bfd/OL9kTSIaKeTmp9b6hN9NP_image.svg" },
    "howitworks":   { url: "https://v3b.fal.media/files/b/0a8f1bfd/bW_8gdjWv4Ca2XaeY--OG_image.svg" },
    "expertise":    { url: "https://v3b.fal.media/files/b/0a8f1bfc/DPXzehplMGORHQXu7XvSJ_image.webp" },
    "ai-tools":     { url: "https://v3b.fal.media/files/b/0a8f1bfd/zz3KTrDjovSXHxwvR278J_311b48fe969a45ccad3a5f697dff3b18.jpg" },
    "automation":   { url: "https://v3b.fal.media/files/b/0a8f1bfd/P5Wz3mg-JHcF9X-mF-zcb_78eada9fd6da40839570c7cfbc651116.jpg" },
    "roi":          { url: "https://v3b.fal.media/files/b/0a8f1bfd/VTYd-WGimPU4UdclI2zND_45c2aa0685584d1faff8cac8c6cbc651.jpg" },
    "linkedin-post":  { url: "https://v3b.fal.media/files/b/0a8f1bfc/MKqh4xJAALfVvIs5x3daN_image.webp" },
    "instagram-post": { url: "https://v3b.fal.media/files/b/0a8f1bfd/eLww8VX9t-ULGXC1KYDQo_image.webp" },
    "story-bg":     { url: "https://v3b.fal.media/files/b/0a8f1bfd/3RqXDIBmlXqB1c8gIHwQx_image.webp" },
  })
  const [aiCategory, setAiCategory] = useState<AICategory>('illustration')

  const generate = useCallback(async (id: string, prompt: string, model: 'recraft' | 'flux', style: string | null, size: string) => {
    setAiImages((prev) => ({ ...prev, [id]: { loading: true } }))
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model, style, imageSize: size }),
      })
      const data = await res.json()
      if (data.url) {
        setAiImages((prev) => ({ ...prev, [id]: { url: data.url } }))
      } else {
        setAiImages((prev) => ({ ...prev, [id]: { error: data.error ?? 'Bilinmeyen hata' } }))
      }
    } catch (e) {
      setAiImages((prev) => ({ ...prev, [id]: { error: String(e) } }))
    }
  }, [])

  const generateAll = useCallback((category: AICategory) => {
    for (const item of AI_PROMPTS[category]) {
      generate(item.id, item.prompt, item.model, item.style, item.size)
    }
  }, [generate])

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

        {/* ══ HAKKIMIZDAHEROʼLARI ══ */}
        {section === 'hakkimizda-heroes' && (
          <div>
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Hakkımızda Hero — Görsel Yön Araştırması</h2>
              <p style={{ color: '#4C4462', fontSize: 14, maxWidth: 660 }}>
                Hybrid-3 çizgisi · 3 model karşılaştırması + 2 yeni yön denemesi (mor varyant & süreç anlatı).
                Her birinin altında gerçek 2 kolon sayfa simülasyonu.
              </p>
            </div>

            {/* 5 görsel — ilk 3 üst sıra, son 2 alt sıra vurgulu */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 20 }}>
              {HAKKIMIZDA_HEROES.slice(0, 3).map((item) => (
                <div key={item.id} style={card()}>
                  <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(10,5,20,0.75)', backdropFilter: 'blur(4px)', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: '#A3E635' }}>
                      {item.label}
                    </div>
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: '#4C4462', lineHeight: 1.5, marginBottom: 10 }}>{item.desc}</div>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: '#A3E635', textDecoration: 'none', fontWeight: 600 }}>↗ Tam boyut</a>
                  </div>
                </div>
              ))}
            </div>

            {/* Alt sıra — 2 yeni yön vurgulu */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 48 }}>
              {HAKKIMIZDA_HEROES.slice(3).map((item) => (
                <div key={item.id} style={{ ...card(), border: '1px solid #A3E635' }}>
                  <div style={{ background: '#A3E635', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#2E1065' }}>YENİ YÖN DENEMESİ</span>
                  </div>
                  <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: '#4C4462', lineHeight: 1.5, marginBottom: 10 }}>{item.desc}</div>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: '#A3E635', textDecoration: 'none', fontWeight: 600 }}>↗ Tam boyut</a>
                  </div>
                </div>
              ))}
            </div>

            {/* Gerçek sayfa simülasyonu — sağda görsel, solda metin */}
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Sayfa Simülasyonu — 2 Kolon Layout</h3>
            <p style={{ color: '#4C4462', fontSize: 13, marginBottom: 24 }}>
              /hakkimizda sayfasındaki gerçek görünüm (metin sol · görsel sağ)
            </p>
            {HAKKIMIZDA_HEROES.map((item, i) => (
              <div key={item.id} style={{
                background: '#2E1065',
                borderRadius: 20,
                padding: '48px 56px',
                border: '1px solid #1A1030',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 48,
                alignItems: 'center',
                marginBottom: 24,
              }}>
                {/* Sol — metin */}
                <div>
                  <div style={{ fontSize: 11, color: '#A3E635', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 16 }}>
                    VERİMİO HAKKINDA
                  </div>
                  <div style={{ fontSize: 34, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2, marginBottom: 16 }}>
                    Operasyonel<br /><span style={{ color: '#A3E635' }}>mükemmelliği</span><br />birlikte inşa edelim.
                  </div>
                  <div style={{ fontSize: 15, color: '#78716C', lineHeight: 1.7, marginBottom: 24 }}>
                    Şirketlerin yapay zeka ve otomasyon teknolojilerini gerçek iş sonuçlarına dönüştürmesine yardımcı oluyoruz.
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ background: '#A3E635', color: '#2E1065', padding: '10px 22px', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
                      Check-Up Başlatın
                    </div>
                    <div style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF', padding: '10px 22px', borderRadius: 10, fontSize: 13 }}>
                      Daha fazla bilgi
                    </div>
                  </div>
                </div>
                {/* Sağ — görsel */}
                <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt={item.label}
                    style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
                </div>
                {/* Label */}
                <div style={{ gridColumn: '1/-1', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12,
                  fontSize: 11, color: '#4C4462', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ background: '#1A1030', padding: '2px 8px', borderRadius: 4, color: '#8B5CF6', fontFamily: 'monospace' }}>
                    {item.label}
                  </span>
                  <span>Varyant {i + 1} / 3</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══ BLOG SOSYAL ══ */}
        {section === 'social-blog' && (
          <div>
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Blog → Sosyal Medya Kartı</h2>
              <p style={{ color: '#4C4462', fontSize: 14, maxWidth: 600 }}>
                Blog kapak görseli üzerine gradient overlay + kategori pill + başlık + indigo şerit + logo.
                3 hybrid görsel (v3) × 4 platform = 12 kombinasyon.
              </p>
            </div>

            {/* Hybrid Blog Görselleri — v3 */}
            {(() => {
              const HYBRID_IMAGES = [
                {
                  id: 'hybrid-1',
                  url: 'https://v3b.fal.media/files/b/0a8f1da1/yht2u2fKwI416RhjTKkmv_70f95f2bec4840bba18c2ccdf3c9ae7b.jpg',
                  label: 'Hybrid 1 — Editorial Geometrik',
                },
                {
                  id: 'hybrid-2',
                  url: 'https://v3b.fal.media/files/b/0a8f1da1/1Bs67SqzRp9sgd5H4mZfV_8bb4be8520a1419f896990111d923927.jpg',
                  label: 'Hybrid 2 — Diagonal Stroke',
                },
                {
                  id: 'hybrid-3',
                  url: 'https://v3b.fal.media/files/b/0a8f1da1/5Oq7anHFhpI-TGv0xxkoo_d41ae8d9e8a441d98329b5a4724f20c4.jpg',
                  label: 'Hybrid 3 — Halo & Dots',
                },
              ]
              const SAMPLE_POSTS = [
                { title: 'ChatGPT\'yi İş Süreçlerine Entegre Etmenin 5 Adımı', category: 'AI Araçları', date: '19 Şubat 2026' },
                { title: 'Muhasebe Süreçlerini Otomatikleştirmenin Tam Rehberi', category: 'Otomasyon', date: '12 Şubat 2026' },
                { title: 'AI Yatırımınızın Geri Dönüşünü Nasıl Ölçersiniz?', category: 'ROI & Verimlilik', date: '5 Şubat 2026' },
              ]

              return (
                <div>
                  {/* Platform seçici */}
                  {(['linkedin', 'instagram', 'twitter', 'story'] as SocialAspect[]).map((asp, aspIdx) => (
                    <div key={asp} style={{ marginBottom: 56 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>
                          {asp === 'linkedin' ? 'LinkedIn — 1200×628' : asp === 'instagram' ? 'Instagram — 1080×1080' : asp === 'twitter' ? 'Twitter — 1200×675' : 'Story — 1080×1920'}
                        </div>
                        <div style={{ height: 1, flex: 1, background: '#1A1030' }} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: asp === 'story' ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)', gap: 24 }}>
                        {HYBRID_IMAGES.map((img, imgIdx) => (
                          <div key={img.id} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ fontSize: 11, color: '#4C4462', fontFamily: 'monospace' }}>{img.label}</div>
                            <div style={card({ padding: 12 })}>
                              <BlogSocialCard
                                imageUrl={img.url}
                                title={SAMPLE_POSTS[imgIdx % 3].title}
                                category={SAMPLE_POSTS[imgIdx % 3].category}
                                date={asp === 'linkedin' || asp === 'story' ? SAMPLE_POSTS[imgIdx % 3].date : undefined}
                                aspect={asp}
                                width={asp === 'story' ? 220 : 340}
                              />
                            </div>
                            {aspIdx === 0 && (
                              <a href={img.url} target="_blank" rel="noopener noreferrer"
                                style={{ fontSize: 11, color: '#A3E635', textDecoration: 'none', textAlign: 'center' }}>
                                ↗ Ham görsel
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )
            })()}
          </div>
        )}

        {/* ══ AI GÖRSELLER ══ */}
        {section === 'ai' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>AI Görsel Üretim Laboratuvarı</h2>
                <p style={{ color: '#4C4462', fontSize: 14, maxWidth: 520 }}>
                  Recraft V3 (illüstrasyon) + FLUX 1.1 Pro (fotoğrafik/blog) modelleri. Her kategori için 3 farklı örnek üretilebilir.
                  FAL_KEY gerekli — <span style={{ color: '#A3E635', fontFamily: 'monospace' }}>.env.local</span>'de olmalı.
                </p>
              </div>
            </div>

            {/* ── v3: Hybrid Blog Görselleri ───────────────────────────────── */}
            <div style={{ marginBottom: 56 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>v3 — Hybrid Blog Görselleri</h3>
                <span style={{ background: '#A3E635', color: '#2E1065', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 6 }}>FLUX only</span>
                <span style={{ background: '#1A1030', color: '#78716C', fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 6 }}>Blog A + C hybrid · açık zemin</span>
              </div>
              <p style={{ color: '#4C4462', fontSize: 13, marginBottom: 24 }}>
                HBR editorial + Stripe minimal karışımı — sosyal karta hazır altyapı
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 8 }}>
                {FLUX_V3_HYBRID.map((item) => (
                  <div key={item.id} style={card()}>
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.url} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(163,230,53,0.9)', color: '#2E1065', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>FLUX 1.1 Pro</div>
                    </div>
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF', marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: '#4C4462', lineHeight: 1.5, marginBottom: 12 }}>{item.desc}</div>
                      <a href={item.url} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 12, color: '#A3E635', textDecoration: 'none', fontWeight: 600 }}>
                        ↗ Tam boyut
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: '#4C4462', marginBottom: 8 }}>
                → Sosyal kart önizlemesi için <strong style={{ color: '#A3E635' }}>✦ Blog Sosyal</strong> sekmesine bak
              </div>
            </div>

            {/* ── v2: Yeni Yön — FLUX only, açık & temiz ─────────────────────── */}
            <div style={{ marginBottom: 56 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>v2 — Yeni Görsel Yön</h3>
                <span style={{ background: '#A3E635', color: '#2E1065', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 6 }}>FLUX only</span>
                <span style={{ background: '#1A1030', color: '#78716C', fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 6 }}>Açık & Temiz · Foto+Overlay · Lime orta</span>
              </div>
              <p style={{ color: '#4C4462', fontSize: 13, marginBottom: 24 }}>
                2 hero varyantı + 3 blog stili — Wired/HBR/luxury SaaS estetik referansı
              </p>

              {/* Hero varyantları */}
              <div style={{ fontSize: 12, color: '#4C4462', fontFamily: 'monospace', letterSpacing: '0.08em', marginBottom: 12 }}>
                HERO GÖRSELLERİ — 4:3 ratio
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
                {FLUX_V2.filter(x => x.id.startsWith('hero')).map((item) => (
                  <div key={item.id} style={card()}>
                    <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.url} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(163,230,53,0.9)', color: '#2E1065', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>
                        FLUX 1.1 Pro
                      </div>
                    </div>
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF', marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: '#4C4462', lineHeight: 1.5, marginBottom: 12 }}>{item.desc}</div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => generate(item.id, '', 'flux', null, item.size)}
                          style={{ flex: 1, padding: '7px 0', borderRadius: 8, border: '1px solid #1A1030', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: 'transparent', color: '#78716C' }}
                        >
                          Yeniden Üret
                        </button>
                        <a href={item.url} target="_blank" rel="noopener noreferrer"
                          style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #1A1030', fontSize: 11, fontWeight: 600, color: '#A3E635', textDecoration: 'none', background: 'transparent' }}>
                          ↗ Tam boyut
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Blog varyantları */}
              <div style={{ fontSize: 12, color: '#4C4462', fontFamily: 'monospace', letterSpacing: '0.08em', marginBottom: 12 }}>
                BLOG KAPAKLARI — 16:9 ratio
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {FLUX_V2.filter(x => x.id.startsWith('blog')).map((item) => (
                  <div key={item.id} style={card()}>
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.url} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(163,230,53,0.9)', color: '#2E1065', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>
                        FLUX 1.1 Pro
                      </div>
                    </div>
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF', marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: '#4C4462', lineHeight: 1.5, marginBottom: 12 }}>{item.desc}</div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => generate(item.id, '', 'flux', null, item.size)}
                          style={{ flex: 1, padding: '7px 0', borderRadius: 8, border: '1px solid #1A1030', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: 'transparent', color: '#78716C' }}
                        >
                          Yeniden Üret
                        </button>
                        <a href={item.url} target="_blank" rel="noopener noreferrer"
                          style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #1A1030', fontSize: 11, fontWeight: 600, color: '#A3E635', textDecoration: 'none', background: 'transparent' }}>
                          ↗ Tam boyut
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #1A1030', paddingTop: 40, marginBottom: 32 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: '#78716C' }}>v1 — İlk Tur (Arşiv)</h3>
              <p style={{ color: '#2A2040', fontSize: 13, marginBottom: 24 }}>Recraft V3 + FLUX — önceki üretimler</p>
            </div>

            {/* Kategori seçici */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
              {(Object.keys(AI_PROMPTS) as AICategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setAiCategory(cat)}
                  style={{
                    padding: '8px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 600,
                    background: aiCategory === cat ? '#A3E635' : '#1A1030',
                    color: aiCategory === cat ? '#2E1065' : '#78716C',
                  }}
                >
                  {cat === 'illustration' ? '🎨 İllüstrasyon' : cat === 'blog' ? '📝 Blog Kapağı' : '📱 Sosyal Medya'}
                </button>
              ))}
              <button
                onClick={() => generateAll(aiCategory)}
                style={{
                  marginLeft: 'auto', padding: '8px 24px', borderRadius: 10, border: '1px solid #A3E635',
                  cursor: 'pointer', fontSize: 13, fontWeight: 700,
                  background: 'transparent', color: '#A3E635',
                }}
              >
                Tümünü Üret →
              </button>
            </div>

            {/* Model bilgisi */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
              <div style={{ background: '#1A1030', borderRadius: 8, padding: '8px 16px', display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8B5CF6' }} />
                <span style={{ fontSize: 12, color: '#78716C' }}>
                  <strong style={{ color: '#FFFFFF' }}>Recraft V3</strong> — vector_illustration · brand-safe · $0.04/görsel
                </span>
              </div>
              <div style={{ background: '#1A1030', borderRadius: 8, padding: '8px 16px', display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#A3E635' }} />
                <span style={{ fontSize: 12, color: '#78716C' }}>
                  <strong style={{ color: '#FFFFFF' }}>FLUX 1.1 Pro</strong> — fotoğrafik kalite · blog cover · $0.05/görsel
                </span>
              </div>
            </div>

            {/* Görsel kartları */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {AI_PROMPTS[aiCategory].map((item) => {
                const state = aiImages[item.id]
                return (
                  <div key={item.id} style={card()}>
                    {/* Görsel alanı */}
                    <div style={{
                      aspectRatio: item.size === 'square_hd' ? '1' : item.size === 'portrait_16_9' ? '9/16' : '16/9',
                      background: '#0A0514',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}>
                      {state?.loading && (
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ width: 40, height: 40, border: '3px solid #1A1030', borderTopColor: '#A3E635', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
                          <div style={{ fontSize: 12, color: '#4C4462' }}>Üretiliyor…</div>
                          <div style={{ fontSize: 11, color: '#2A2040', marginTop: 4 }}>~30–60 saniye</div>
                        </div>
                      )}
                      {state?.url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={state.url} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      )}
                      {state?.error && (
                        <div style={{ textAlign: 'center', padding: 20 }}>
                          <div style={{ fontSize: 24, marginBottom: 8 }}>⚠</div>
                          <div style={{ fontSize: 12, color: '#EF4444', marginBottom: 4 }}>Hata</div>
                          <div style={{ fontSize: 11, color: '#4C4462', fontFamily: 'monospace', wordBreak: 'break-all' }}>{state.error}</div>
                        </div>
                      )}
                      {!state && (
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.3 }}>✦</div>
                          <div style={{ fontSize: 13, color: '#4C4462' }}>Henüz üretilmedi</div>
                        </div>
                      )}

                      {/* Model badge */}
                      <div style={{
                        position: 'absolute', top: 10, right: 10,
                        background: item.model === 'recraft' ? 'rgba(139,92,246,0.85)' : 'rgba(163,230,53,0.85)',
                        color: item.model === 'recraft' ? '#FFFFFF' : '#2E1065',
                        fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
                      }}>
                        {item.model === 'recraft' ? 'Recraft V3' : 'FLUX 1.1 Pro'}
                      </div>
                    </div>

                    {/* Alt bilgi + buton */}
                    <div style={{ padding: '14px 16px', borderTop: '1px solid #1A1030' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: '#4C4462', marginBottom: 12, lineHeight: 1.5 }}>{item.desc}</div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => generate(item.id, item.prompt, item.model, item.style, item.size)}
                          disabled={state?.loading}
                          style={{
                            flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', cursor: state?.loading ? 'wait' : 'pointer',
                            fontSize: 12, fontWeight: 600,
                            background: state?.loading ? '#1A1030' : '#A3E635',
                            color: state?.loading ? '#4C4462' : '#2E1065',
                          }}
                        >
                          {state?.loading ? 'Üretiliyor…' : state?.url ? 'Yeniden Üret' : 'Üret'}
                        </button>
                        {state?.url && (
                          <a
                            href={state.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '8px 12px', borderRadius: 8, border: '1px solid #1A1030',
                              fontSize: 12, fontWeight: 600, color: '#78716C', textDecoration: 'none',
                              background: 'transparent', display: 'flex', alignItems: 'center',
                            }}
                          >
                            ↗
                          </a>
                        )}
                      </div>
                      {/* Prompt önizleme */}
                      <div
                        style={{
                          marginTop: 10, fontSize: 10, color: '#2A2040', fontFamily: 'monospace',
                          lineHeight: 1.4, maxHeight: 40, overflow: 'hidden',
                          cursor: 'pointer',
                        }}
                        title={item.prompt}
                      >
                        {item.prompt.slice(0, 80)}…
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Spinning animation */}
            <style>{`
              @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
          </div>
        )}

      </div>
    </div>
  )
}
