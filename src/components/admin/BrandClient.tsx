'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Tab tipleri ─────────────────────────────────────────────────────────────
type Tab = 'logo' | 'colors' | 'typography' | 'social' | 'guidelines'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'logo', label: 'Logo', icon: '◈' },
  { id: 'colors', label: 'Renkler', icon: '◉' },
  { id: 'typography', label: 'Tipografi', icon: 'Aa' },
  { id: 'social', label: 'Sosyal Medya', icon: '⊡' },
  { id: 'guidelines', label: 'Platform Kılavuzları', icon: '≡' },
]

// ─── Logo promptları (logo-concept-brief.md'den) ──────────────────────────────
const LOGO_OPTIONS = [
  {
    id: 'A',
    title: 'V-Flow Geometrik',
    desc: 'İki diyagonal çizginin oluşturduğu V formu. Verimlilik = akış, ileri hareket.',
    prompt: 'Minimalist logo design for "Verimio" brand, geometric V-shaped icon made of two intersecting diagonal lines forming an upward arrow shape, left diagonal line in deep indigo #2E1065, right diagonal line in vivid lime #A3E635, square format icon, clean wordmark text "Verimio" to the right of icon, "Veri" portion in deep indigo, "mio" portion in vivid lime, modern tech consulting aesthetic, white background, vector style, high contrast, no gradients, Inter Bold sans-serif typography, professional B2B brand identity, minimal, no decorative elements',
    promptAlt: 'Minimalist logo mark for AI consulting brand, square icon design, two parallel diagonal lines creating angular V shape, upper-left to lower-right orientation, left stripe deep indigo #2E1065, right stripe vivid lime green #A3E635, white negative space between stripes, clean geometric, SVG quality, professional, no text in icon',
    tag: 'Akış & Hareket',
  },
  {
    id: 'B',
    title: 'Hexagon Circuit',
    desc: 'Hexagon: doğanın en verimli geometrisi. İçindeki akış çizgisi "analiz → sonuç → aksiyon" metaforu.',
    prompt: 'Minimalist tech logo, hexagonal icon outline in deep indigo #2E1065, 2px stroke only no fill, thin diagonal line inside hexagon in vivid lime #A3E635 representing data flow from bottom-left to top-right, small filled circle node at start point bottom-left, small arrowhead at end point top-right, "VERIMIO" wordmark in all caps to the right, Inter Bold font style, letter-spacing wide 0.15em, clean white background, SVG vector quality, AI consulting brand, no shadows, no outer glow, professional minimal B2B aesthetic',
    promptAlt: 'Minimalist hexagon logo icon, thin outline hexagon shape, deep indigo color #2E1065, single diagonal line inside from lower-left vertex to upper-right vertex, line color vivid lime #A3E635, small dot at line start, small arrow at line end, white background, vector icon, 1:1 square ratio, SVG quality, technology brand, clean geometric',
    tag: 'Önerilen ★',
    recommended: true,
  },
  {
    id: 'C',
    title: 'Tipografik Modified',
    desc: '"V" harfi özelleştirilmiş, "IO" Lime renk. En esnek format: her boyutta okunabilir.',
    prompt: 'Custom typographic wordmark logo for brand "VERIMIO", all capital letters, bold sans-serif typeface similar to Inter Bold or Helvetica, letter "V" is slightly larger than other letters and has a small vivid lime #A3E635 square pixel accent at its bottom vertex point, letters "IO" at the end rendered in vivid lime #A3E635, remaining letters "VERIM" in deep indigo #2E1065, white background, no icon separate from text, clean minimal design, vector quality, tech consulting brand identity, no decorative elements',
    promptAlt: 'Bold wordmark logo "VERIMIO", capital letters, V larger with lime accent dot, IO letters lime colored, rest deep indigo, minimal sans-serif',
    tag: 'Saf Tipografi',
  },
]

// ─── Renk paleti ──────────────────────────────────────────────────────────────
const COLORS = [
  {
    name: 'Deep Indigo',
    hex: '#2E1065',
    cmyk: 'C:78 M:100 Y:0 K:60',
    usage: 'Ana arka plan, primary buton, başlıklar',
    roles: ['Ana zemin', 'Primary buton', 'Navbar', 'Logo'],
  },
  {
    name: 'Vivid Lime',
    hex: '#A3E635',
    cmyk: 'C:30 M:0 Y:80 K:0',
    usage: 'Vurgu, CTA buton, highlight, aksan',
    roles: ['CTA buton', 'Vurgu metni', '"mio" wordmark', 'Aksan çizgi'],
  },
  {
    name: 'Gradient Purple',
    hex: '#8B5CF6',
    cmyk: '—',
    usage: 'Web gradient başlangıcı (Indigo → Lime geçiş)',
    roles: ['Web gradients', 'Hover efekti', 'Badge'],
  },
  {
    name: 'Beyaz',
    hex: '#FFFFFF',
    cmyk: 'C:0 M:0 Y:0 K:0',
    usage: 'Metin (koyu zemin), kart arka planı',
    roles: ['Koyu zemin metni', 'Kart BG', 'Logo (koyu zemin)'],
  },
  {
    name: 'Açık Gri',
    hex: '#F5F5F5',
    cmyk: '—',
    usage: 'Bölüm arka planı, email gövde',
    roles: ['Bölüm BG', 'Email gövde', 'Kart hover'],
  },
  {
    name: 'Koyu Siyah',
    hex: '#0A0A0A',
    cmyk: 'C:0 M:0 Y:0 K:98',
    usage: 'Gövde metni (açık zemin)',
    roles: ['Gövde metni', 'CTA buton metin'],
  },
]

// ─── Sosyal medya boyutları ────────────────────────────────────────────────────
const SOCIAL_PLATFORMS = [
  {
    platform: 'LinkedIn',
    color: '#0A66C2',
    items: [
      { type: 'Kapak Fotoğrafı', size: '1584×396', format: 'JPG', notes: 'Logo sol üst, slogan + badge' },
      { type: 'Post Görseli', size: '1200×628', format: 'JPG', notes: 'Üst kategori etiketi + alt CTA bar' },
      { type: 'Carousel Slayt', size: '1200×628', format: 'JPG', notes: 'Sol Lime dikey şerit sabit' },
      { type: 'Profil Fotoğrafı', size: '400×400', format: 'JPG', notes: 'Sadece ikon, Indigo zemin' },
    ],
  },
  {
    platform: 'Instagram',
    color: '#E1306C',
    items: [
      { type: 'Feed Post', size: '1080×1080', format: 'JPG', notes: '80px kenar boşluğu, 12 kolon grid' },
      { type: 'Story / Reels', size: '1080×1920', format: 'JPG/MP4', notes: 'Güvenli alan: 250–1570px dikey' },
      { type: 'Carousel', size: '1080×1080', format: 'JPG', notes: 'Sol 16px Lime şerit her slayta sabit' },
      { type: 'Profil', size: '320×320', format: 'JPG', notes: 'Daire kırpma — güvenli alan %80' },
    ],
  },
  {
    platform: 'Twitter / X',
    color: '#1DA1F2',
    items: [
      { type: 'Header', size: '1500×500', format: 'JPG', notes: 'Sol alt 200px boş bırak (profil foto)' },
      { type: 'Tweet Görseli', size: '1600×900', format: 'JPG', notes: '40px sol Lime dikey şerit' },
      { type: 'Profil', size: '400×400', format: 'JPG', notes: 'Daire — güvenli alan %85' },
    ],
  },
  {
    platform: 'YouTube',
    color: '#FF0000',
    items: [
      { type: 'Kanal Sanat Görseli', size: '2560×1440', format: 'JPG', notes: 'Güvenli alan: 1546×423px merkez' },
      { type: 'Thumbnail', size: '1280×720', format: 'JPG', notes: 'Sol alt Lime verimio badge zorunlu' },
      { type: 'Profil', size: '800×800', format: 'JPG', notes: 'Daire — güvenli alan %70' },
    ],
  },
]

// ─── Platform kılavuzları ─────────────────────────────────────────────────────
const PLATFORM_PROFILES = [
  {
    platform: 'LinkedIn',
    handle: 'Verimio',
    bio: 'AI Dönüşüm Danışmanlığı | Ücretsiz AI Hazırlık Testi | KOBİ\'ler için yapay zeka stratejisi',
    postFreq: '3–4×/hafta',
    contentMix: ['%40 Eğitim / AI trendi', '%30 Vaka analizi', '%20 Araç rehberi', '%10 Verimio içeriği'],
    bestTime: 'Salı–Perşembe, 08:00–10:00',
  },
  {
    platform: 'Instagram',
    handle: '@verimio',
    bio: '3 dk\'da AI hazırlık testi 🚀 | KOBİ\'ler için yapay zeka | Link bio\'da',
    postFreq: '5×/hafta',
    contentMix: ['%50 Infografik / Stat', '%30 Tips carousel', '%20 Story / poll'],
    bestTime: 'Salı–Cuma, 11:00–13:00',
  },
  {
    platform: 'Twitter / X',
    handle: '@verimio',
    bio: 'AI dönüşüm danışmanlığı. Düşünce, analiz ve pratik rehberler.',
    postFreq: '1–2×/gün',
    contentMix: ['%40 Kısa fikir / insight', '%30 Thread', '%20 Yorum / retweet', '%10 CTA'],
    bestTime: 'Sabah 08:00 veya akşam 19:00',
  },
  {
    platform: 'YouTube',
    handle: 'Verimio',
    bio: 'KOBİ\'ler için yapay zeka dönüşümü. Pratik rehberler, vaka analizleri.',
    postFreq: '2×/ay',
    contentMix: ['%50 How-to / rehber', '%30 Vaka analizi', '%20 AI araç incelemesi'],
    bestTime: 'Cuma veya Cumartesi yükleme',
  },
]

// ─── Bileşen ─────────────────────────────────────────────────────────────────
export default function BrandClient() {
  const [activeTab, setActiveTab] = useState<Tab>('logo')
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null)
  const [generatingLogo, setGeneratingLogo] = useState<string | null>(null)
  const [logoResults, setLogoResults] = useState<Record<string, string[]>>({})
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null)

  async function generateLogo(optionId: string, prompt: string) {
    setGeneratingLogo(optionId)
    try {
      const res = await fetch('/api/admin/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model: 'fal-ai/recraft/v3/text-to-image', size: 'logo_square' }),
      })
      const data = await res.json()
      if (data.images) {
        setLogoResults((prev) => ({
          ...prev,
          [optionId]: data.images.map((img: { url: string }) => img.url),
        }))
      }
    } catch (e) {
      console.error(e)
    }
    setGeneratingLogo(null)
  }

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text)
    setCopyFeedback(label)
    setTimeout(() => setCopyFeedback(null), 1500)
  }

  return (
    <main className="flex-1 p-6">
      {/* Tab bar */}
      <div className="flex gap-1 mb-6 bg-background-secondary border border-border rounded-xl p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-secondary'
                : 'text-foreground-muted hover:text-foreground hover:bg-surface-elevated'
            }`}
          >
            <span className="text-base leading-none">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Copy feedback toast */}
      <AnimatePresence>
        {copyFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 bg-secondary text-primary px-4 py-2 rounded-lg text-sm font-medium z-50"
          >
            {copyFeedback} kopyalandı
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* ── LOGO TAB ── */}
        {activeTab === 'logo' && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {/* ── Tipografik Logo Font Varyasyonları ── */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-foreground font-semibold">Tipografik Logo — Font Varyasyonları</h3>
                {selectedLogo && (
                  <div className="flex items-center gap-2 bg-secondary/10 border border-secondary/30 px-4 py-2 rounded-lg">
                    <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-secondary text-xs font-medium">Varyasyon {selectedLogo} seçildi</span>
                  </div>
                )}
              </div>
              <p className="text-foreground-muted text-xs mb-5">Her sütun farklı bir font karakteri. &quot;verim&quot; ve &quot;io&quot; renk bölümlemesi sabit. Tıkla → seç.</p>

              {/* 3 sütun — A, B, C font varyasyonu */}
              <div className="grid grid-cols-3 gap-4">

                {/* ── A — Güçlü & Bold (Inter Black, wide tracking) ── */}
                <div
                  onClick={() => setSelectedLogo('A')}
                  className={`cursor-pointer rounded-xl border-2 overflow-hidden transition-all ${selectedLogo === 'A' ? 'border-secondary' : 'border-border hover:border-primary'}`}
                >
                  <div className="bg-background-secondary px-4 py-2.5 border-b border-border flex items-center justify-between">
                    <span className="text-foreground text-xs font-semibold">A — Bold Geniş</span>
                    <span className="text-foreground-muted text-xs">Güçlü · Baskın</span>
                  </div>
                  {/* Koyu */}
                  <div className="bg-primary px-5 py-6 flex items-center justify-center min-h-[88px]">
                    <div className="flex items-baseline gap-0" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 900, fontSize: '28px', letterSpacing: '0.12em', lineHeight: 1 }}>
                      <span style={{ color: '#FFFFFF' }}>verim</span><span style={{ color: '#A3E635' }}>io</span>
                    </div>
                  </div>
                  {/* Açık */}
                  <div className="bg-white px-5 py-4 flex items-center justify-center min-h-[72px] border-t border-[#F0F0F0]">
                    <div className="flex items-baseline gap-0" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 900, fontSize: '24px', letterSpacing: '0.12em' }}>
                      <span style={{ color: '#2E1065' }}>verim</span><span style={{ color: '#A3E635' }}>io</span>
                    </div>
                  </div>
                  {/* Lime zemin */}
                  <div className="bg-secondary px-5 py-4 flex items-center justify-center min-h-[72px] border-t border-[#8FCC25]">
                    <div className="flex items-baseline gap-0" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 900, fontSize: '24px', letterSpacing: '0.12em' }}>
                      <span style={{ color: '#2E1065' }}>verim</span><span style={{ color: '#1A0A3E' }}>io</span>
                    </div>
                  </div>
                  {/* Küçük ölçek */}
                  <div className="bg-background-secondary px-4 py-2.5 flex items-center gap-3 border-t border-border">
                    <span className="text-foreground-muted text-xs">Küçük:</span>
                    <div className="flex items-baseline gap-0" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 900, fontSize: '13px', letterSpacing: '0.1em' }}>
                      <span style={{ color: '#FFFFFF' }}>verim</span><span style={{ color: '#A3E635' }}>io</span>
                    </div>
                    <div className="flex items-baseline gap-0 ml-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 900, fontSize: '10px', letterSpacing: '0.08em' }}>
                      <span style={{ color: '#FFFFFF' }}>verim</span><span style={{ color: '#A3E635' }}>io</span>
                    </div>
                  </div>
                </div>

                {/* ── B — Minimal & Elegant (Light weight, tight tracking) ── */}
                <div
                  onClick={() => setSelectedLogo('B')}
                  className={`cursor-pointer rounded-xl border-2 overflow-hidden transition-all ${selectedLogo === 'B' ? 'border-secondary' : 'border-border hover:border-primary'}`}
                >
                  <div className="bg-background-secondary px-4 py-2.5 border-b border-border flex items-center justify-between">
                    <span className="text-foreground text-xs font-semibold">B — İnce Şık</span>
                    <span className="text-foreground-muted text-xs">Minimal · Zarif</span>
                  </div>
                  {/* Koyu */}
                  <div className="bg-primary px-5 py-6 flex items-center justify-center min-h-[88px]">
                    <div className="flex items-baseline gap-0" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 300, fontSize: '30px', letterSpacing: '0.18em', lineHeight: 1 }}>
                      <span style={{ color: '#FFFFFF' }}>verim</span><span style={{ color: '#A3E635' }}>io</span>
                    </div>
                  </div>
                  {/* Açık */}
                  <div className="bg-white px-5 py-4 flex items-center justify-center min-h-[72px] border-t border-[#F0F0F0]">
                    <div className="flex items-baseline gap-0" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 300, fontSize: '26px', letterSpacing: '0.18em' }}>
                      <span style={{ color: '#2E1065' }}>verim</span><span style={{ color: '#A3E635' }}>io</span>
                    </div>
                  </div>
                  {/* Lime zemin */}
                  <div className="bg-secondary px-5 py-4 flex items-center justify-center min-h-[72px] border-t border-[#8FCC25]">
                    <div className="flex items-baseline gap-0" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 300, fontSize: '26px', letterSpacing: '0.18em' }}>
                      <span style={{ color: '#2E1065' }}>verim</span><span style={{ color: '#1A0A3E' }}>io</span>
                    </div>
                  </div>
                  {/* Küçük ölçek */}
                  <div className="bg-background-secondary px-4 py-2.5 flex items-center gap-3 border-t border-border">
                    <span className="text-foreground-muted text-xs">Küçük:</span>
                    <div className="flex items-baseline gap-0" style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '13px', letterSpacing: '0.14em' }}>
                      <span style={{ color: '#FFFFFF' }}>verim</span><span style={{ color: '#A3E635' }}>io</span>
                    </div>
                    <div className="flex items-baseline gap-0 ml-2" style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '10px', letterSpacing: '0.1em' }}>
                      <span style={{ color: '#FFFFFF' }}>verim</span><span style={{ color: '#A3E635' }}>io</span>
                    </div>
                  </div>
                </div>

                {/* ── C — Modern Geometric (Medium weight, mixed case, tight) ── */}
                <div
                  onClick={() => setSelectedLogo('C')}
                  className={`cursor-pointer rounded-xl border-2 overflow-hidden transition-all ${selectedLogo === 'C' ? 'border-secondary' : 'border-border hover:border-primary'}`}
                >
                  <div className="bg-background-secondary px-4 py-2.5 border-b border-border flex items-center justify-between">
                    <span className="text-foreground text-xs font-semibold">C — Modern Sıkışık</span>
                    <span className="text-foreground-muted text-xs">Seksi · Dengeli</span>
                  </div>
                  {/* Koyu */}
                  <div className="bg-primary px-5 py-6 flex items-center justify-center min-h-[88px]">
                    <div className="flex items-baseline gap-0" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 600, fontSize: '29px', letterSpacing: '-0.02em', lineHeight: 1 }}>
                      <span style={{ color: '#FFFFFF' }}>verim</span><span style={{ color: '#A3E635', fontWeight: 800 }}>io</span>
                    </div>
                  </div>
                  {/* Açık */}
                  <div className="bg-white px-5 py-4 flex items-center justify-center min-h-[72px] border-t border-[#F0F0F0]">
                    <div className="flex items-baseline gap-0" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 600, fontSize: '25px', letterSpacing: '-0.02em' }}>
                      <span style={{ color: '#2E1065' }}>verim</span><span style={{ color: '#A3E635', fontWeight: 800 }}>io</span>
                    </div>
                  </div>
                  {/* Lime zemin */}
                  <div className="bg-secondary px-5 py-4 flex items-center justify-center min-h-[72px] border-t border-[#8FCC25]">
                    <div className="flex items-baseline gap-0" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 600, fontSize: '25px', letterSpacing: '-0.02em' }}>
                      <span style={{ color: '#2E1065' }}>verim</span><span style={{ color: '#0A0A0A', fontWeight: 800 }}>io</span>
                    </div>
                  </div>
                  {/* Küçük ölçek */}
                  <div className="bg-background-secondary px-4 py-2.5 flex items-center gap-3 border-t border-border">
                    <span className="text-foreground-muted text-xs">Küçük:</span>
                    <div className="flex items-baseline gap-0" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 600, fontSize: '13px', letterSpacing: '-0.01em' }}>
                      <span style={{ color: '#FFFFFF' }}>verim</span><span style={{ color: '#A3E635', fontWeight: 800 }}>io</span>
                    </div>
                    <div className="flex items-baseline gap-0 ml-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 600, fontSize: '10px', letterSpacing: '-0.01em' }}>
                      <span style={{ color: '#FFFFFF' }}>verim</span><span style={{ color: '#A3E635', fontWeight: 800 }}>io</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Karakter notu */}
              <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                <div className={`rounded-lg p-3 border transition-all ${selectedLogo === 'A' ? 'border-secondary bg-secondary/5' : 'border-border bg-background-secondary'}`}>
                  <p className="text-foreground-secondary">Büyük harfle de çalışır. Güçlü, otoriter his. Plakatlarda, slide başlıklarında etkili.</p>
                </div>
                <div className={`rounded-lg p-3 border transition-all ${selectedLogo === 'B' ? 'border-secondary bg-secondary/5' : 'border-border bg-background-secondary'}`}>
                  <p className="text-foreground-secondary">Serif + ince = lüks danışmanlık hissi. E-postada, kartvizitte çok iyi durur. Dijitalde daha nadir görülür.</p>
                </div>
                <div className={`rounded-lg p-3 border transition-all ${selectedLogo === 'C' ? 'border-secondary bg-secondary/5' : 'border-border bg-background-secondary'}`}>
                  <p className="text-foreground-secondary">Sıkışık tracking modern tech startuplarının tonu. &quot;io&quot; ağırlıklı = suffix vurgusu, domain çağrışımı.</p>
                </div>
              </div>
            </div>

            {/* Logo seçenekleri — fal.ai */}
            <h3 className="text-foreground font-semibold mb-3">fal.ai ile Görsel Varyasyon Üret</h3>
            <p className="text-foreground-muted text-xs mb-5">Font seçiminden bağımsız olarak AI ile farklı logo yorumları da üretebilirsin.</p>

            <div className="space-y-4">
              {LOGO_OPTIONS.map((opt) => (
                <div
                  key={opt.id}
                  className={`bg-background-secondary border rounded-xl overflow-hidden transition-all ${
                    selectedLogo === opt.id
                      ? 'border-secondary'
                      : opt.recommended
                      ? 'border-primary'
                      : 'border-border'
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-foreground font-bold">Opsiyon {opt.id} — {opt.title}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            opt.recommended
                              ? 'bg-secondary/20 text-secondary'
                              : 'bg-surface-elevated text-foreground-muted'
                          }`}>{opt.tag}</span>
                        </div>
                        <p className="text-foreground-secondary text-sm">{opt.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => copyToClipboard(opt.prompt, `Opsiyon ${opt.id} prompt`)}
                          className="text-xs px-3 py-1.5 border border-border text-foreground-muted hover:text-foreground hover:border-primary rounded-lg transition-all"
                        >
                          Promptu Kopyala
                        </button>
                        <button
                          onClick={() => generateLogo(opt.id, opt.prompt)}
                          disabled={generatingLogo === opt.id}
                          className="text-xs px-4 py-1.5 bg-secondary/10 text-secondary hover:bg-secondary/20 border border-secondary/30 rounded-lg transition-all disabled:opacity-50 font-medium"
                        >
                          {generatingLogo === opt.id ? (
                            <span className="flex items-center gap-1.5">
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="inline-block w-3 h-3 border border-secondary border-t-transparent rounded-full"
                              />
                              Üretiliyor...
                            </span>
                          ) : logoResults[opt.id] ? 'Yeniden Üret' : 'fal.ai ile Üret'}
                        </button>
                      </div>
                    </div>

                    {/* Üretilen logolar */}
                    {logoResults[opt.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4"
                      >
                        <p className="text-foreground-muted text-xs mb-3">Üretilen varyasyonlar — birini seç:</p>
                        <div className="grid grid-cols-4 gap-3">
                          {logoResults[opt.id].map((url, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedLogo(opt.id)}
                              className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                                selectedLogo === opt.id
                                  ? 'border-secondary'
                                  : 'border-border hover:border-primary'
                              }`}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={url} alt={`${opt.title} varyasyon ${i + 1}`} className="w-full h-full object-contain bg-white" />
                              {selectedLogo === opt.id && i === 0 && (
                                <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                                  <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                              <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-1 text-center text-xs text-white opacity-0 hover:opacity-100 transition-opacity">
                                <a href={url} target="_blank" rel="noopener" className="text-secondary">İndir</a>
                              </div>
                            </button>
                          ))}
                        </div>

                        {selectedLogo === opt.id && (
                          <div className="mt-3 p-3 bg-secondary/5 border border-secondary/30 rounded-lg flex items-center gap-2">
                            <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="text-secondary text-xs font-medium">Opsiyon {opt.id} seçildi. Websiteye entegre etmek için geliştirici moduna geç.</p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Üretilmemiş state */}
                    {!logoResults[opt.id] && generatingLogo !== opt.id && (
                      <div className="mt-4 bg-surface-elevated/50 rounded-xl h-28 flex items-center justify-center border border-dashed border-primary">
                        <p className="text-primary text-xs">Üret butonuna tıkla → 4 varyasyon görüntülenecek</p>
                      </div>
                    )}

                    {/* Loading state */}
                    {generatingLogo === opt.id && (
                      <div className="mt-4 bg-surface-elevated/50 rounded-xl h-28 flex items-center justify-center">
                        <div className="text-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full mx-auto mb-2"
                          />
                          <p className="text-foreground-muted text-xs">fal.ai üretiyor...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Kullanım kuralları özeti */}
            <div className="mt-6 bg-background-secondary border border-border rounded-xl p-5">
              <h4 className="text-foreground font-medium mb-3 text-sm">Logo Kullanım Kuralları</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-secondary text-xs font-medium mb-2">✓ Onaylı Zemin Kombinasyonları</p>
                  <div className="space-y-1.5">
                    {[
                      { bg: '#2E1065', icon: 'Lime + Beyaz', word: 'Beyaz ("mio" Lime)' },
                      { bg: '#FFFFFF', icon: 'Indigo + Lime', word: 'Indigo ("mio" Lime)' },
                      { bg: '#A3E635', icon: 'Indigo', word: 'Indigo' },
                      { bg: '#0A0A0A', icon: 'Beyaz + Lime', word: 'Beyaz ("mio" Lime)' },
                    ].map((combo, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-foreground-secondary">
                        <div className="w-4 h-4 rounded" style={{ background: combo.bg, border: combo.bg === '#FFFFFF' ? '1px solid #E5E7EB' : 'none' }} />
                        <span>İkon: {combo.icon} / Wordmark: {combo.word}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-red-400 text-xs font-medium mb-2">✗ Yasaklı Kullanımlar</p>
                  <ul className="space-y-1 text-foreground-secondary text-xs">
                    <li>• Logo döndürme (hiçbir açıda)</li>
                    <li>• Logo rengi değiştirme</li>
                    <li>• Uzatma / deformasyon</li>
                    <li>• Gradient zemin üzerine logo</li>
                    <li>• Indigo zemin üzerine Indigo logo</li>
                    <li>• Min boyut altı kullanım (&lt;80px)</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── RENKLER TAB ── */}
        {activeTab === 'colors' && (
          <motion.div key="colors" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {COLORS.map((color) => (
                <div key={color.hex} className="bg-background-secondary border border-border rounded-xl overflow-hidden">
                  {/* Renk önizleme */}
                  <div
                    className="h-24 w-full cursor-pointer relative group"
                    style={{ background: color.hex, border: color.hex === '#FFFFFF' ? '1px solid #E5E7EB' : 'none' }}
                    onClick={() => copyToClipboard(color.hex, color.name)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">Kopyala</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-foreground font-medium text-sm">{color.name}</span>
                      <button
                        onClick={() => copyToClipboard(color.hex, color.name)}
                        className="font-mono text-secondary text-xs hover:underline"
                      >
                        {color.hex}
                      </button>
                    </div>
                    {color.cmyk !== '—' && (
                      <p className="text-foreground-muted text-xs mb-2 font-mono">{color.cmyk}</p>
                    )}
                    <p className="text-foreground-secondary text-xs mb-3">{color.usage}</p>
                    <div className="flex flex-wrap gap-1">
                      {color.roles.map((role) => (
                        <span key={role} className="text-xs px-2 py-0.5 bg-surface-elevated text-foreground-muted rounded-full">{role}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Renk uyumları */}
            <div className="bg-background-secondary border border-border rounded-xl p-5 mb-4">
              <h4 className="text-foreground font-medium mb-4 text-sm">Zemin × Metin Uyumları</h4>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { bg: '#2E1065', text: '#FFFFFF', accent: '#A3E635', label: 'Koyu bölüm' },
                  { bg: '#FFFFFF', text: '#0A0A0A', accent: '#2E1065', label: 'Açık bölüm' },
                  { bg: '#A3E635', text: '#2E1065', accent: '#0A0A0A', label: 'Vurgu bölüm' },
                  { bg: '#0A0A0A', text: '#FFFFFF', accent: '#A3E635', label: 'Tam koyu' },
                ].map((combo) => (
                  <div
                    key={combo.label}
                    className="rounded-xl p-4 text-center"
                    style={{ background: combo.bg }}
                  >
                    <p style={{ color: combo.text }} className="text-xs font-bold mb-1">{combo.label}</p>
                    <p style={{ color: combo.text }} className="text-xs opacity-70 mb-2">Gövde metin</p>
                    <div
                      className="text-xs font-bold px-2 py-1 rounded-lg inline-block"
                      style={{ background: combo.accent, color: combo.bg === '#A3E635' ? '#FFFFFF' : combo.bg }}
                    >
                      CTA Buton
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CMYK tablosu */}
            <div className="bg-background-secondary border border-border rounded-xl p-5">
              <h4 className="text-foreground font-medium mb-3 text-sm">CMYK Baskı Değerleri</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-foreground-muted text-xs">
                    <th className="text-left pb-2">Renk</th>
                    <th className="text-left pb-2">HEX</th>
                    <th className="text-left pb-2">CMYK</th>
                    <th className="text-left pb-2">Kullanım</th>
                  </tr>
                </thead>
                <tbody className="text-foreground-secondary">
                  {COLORS.filter(c => c.cmyk !== '—').map((c) => (
                    <tr key={c.hex} className="border-t border-border">
                      <td className="py-2 text-foreground">{c.name}</td>
                      <td className="py-2 font-mono text-secondary text-xs">{c.hex}</td>
                      <td className="py-2 font-mono text-xs">{c.cmyk}</td>
                      <td className="py-2 text-xs">{c.usage.split(',')[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* ── TİPOGRAFİ TAB ── */}
        {activeTab === 'typography' && (
          <motion.div key="typography" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Font ailesi */}
              <div className="bg-background-secondary border border-border rounded-xl p-6">
                <h4 className="text-foreground-muted text-xs font-medium uppercase tracking-widest mb-4">Font Ailesi</h4>
                <div className="space-y-4">
                  <div className="border-b border-border pb-4">
                    <p className="text-secondary text-xs mb-1">Başlıklar & Gövde</p>
                    <p className="text-foreground text-2xl font-bold" style={{ fontFamily: 'var(--font-dm-sans)' }}>DM Sans</p>
                    <p className="text-foreground-muted text-xs mt-1">300 · 400 · 500 · 600 · 700 — tek aile, tüm kullanım</p>
                  </div>
                  <div className="border-b border-border pb-4">
                    <p className="text-secondary text-xs mb-1">Ağırlıklar</p>
                    <div className="flex gap-3 flex-wrap mt-1">
                      {[['Light', '300'], ['Regular', '400'], ['Medium', '500'], ['SemiBold', '600'], ['Bold', '700']].map(([name, w]) => (
                        <span key={w} className="text-foreground text-sm" style={{ fontWeight: Number(w) }}>{name}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-secondary text-xs mb-1">Teknik / Kod</p>
                    <p className="text-foreground text-lg font-mono">DM Mono</p>
                    <p className="text-foreground-muted text-xs mt-1">Kod blokları, hex renk değerleri</p>
                  </div>
                </div>
              </div>

              {/* Boyut hiyerarşisi */}
              <div className="bg-background-secondary border border-border rounded-xl p-6">
                <h4 className="text-foreground-muted text-xs font-medium uppercase tracking-widest mb-4">Boyut Hiyerarşisi</h4>
                <div className="space-y-3">
                  {[
                    { level: 'H1', size: '48–64px', weight: 'Bold', use: 'Ana sayfa hero başlığı' },
                    { level: 'H2', size: '36–48px', weight: 'Bold', use: 'Bölüm başlıkları' },
                    { level: 'H3', size: '24–32px', weight: 'SemiBold', use: 'Alt bölüm başlıkları' },
                    { level: 'Body', size: '16–18px', weight: 'Regular', use: 'Paragraf metni' },
                    { level: 'Small', size: '14px', weight: 'Regular', use: 'Etiket, caption, meta' },
                  ].map((item) => (
                    <div key={item.level} className="flex items-center gap-3">
                      <span className="w-12 text-secondary text-xs font-mono font-bold">{item.level}</span>
                      <span className="w-20 text-foreground-secondary text-xs font-mono">{item.size}</span>
                      <span className="w-20 text-foreground-muted text-xs">{item.weight}</span>
                      <span className="text-foreground-muted text-xs">{item.use}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Canlı önizleme */}
            <div className="bg-background-secondary border border-border rounded-xl p-6 mb-4">
              <h4 className="text-foreground-muted text-xs font-medium uppercase tracking-widest mb-4">Canlı Tipografi Önizlemesi</h4>
              <div className="space-y-4">
                <h1 className="text-foreground font-bold" style={{ fontSize: '48px', lineHeight: 1.15 }}>
                  KOBİ&apos;nin AI&apos;a Geçiş Rehberi
                </h1>
                <h2 className="text-foreground font-bold" style={{ fontSize: '32px' }}>
                  3 dakikada AI hazırlık seviyeni öğren
                </h2>
                <p className="text-foreground-secondary" style={{ fontSize: '18px', lineHeight: 1.6 }}>
                  Çoğu KOBİ AI&apos;ı doğru sıradan başlatmıyor. Ücretsiz hazırlık testimiz şirketinin
                  nerede durduğunu, hangi araçların işine yarayacağını ve nasıl başlayacağını gösterir.
                </p>
                <div className="flex items-center gap-3">
                  <span className="bg-secondary text-primary px-6 py-3 rounded-xl font-bold text-sm">Ücretsiz Test Başlat</span>
                  <span className="text-secondary text-sm font-medium">→ 3 dakika, anlık sonuç</span>
                </div>
              </div>
            </div>

            {/* Ses tonu */}
            <div className="bg-background-secondary border border-border rounded-xl p-6">
              <h4 className="text-foreground-muted text-xs font-medium uppercase tracking-widest mb-4">Ses Tonu & Yazı Dili</h4>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-secondary text-xs font-medium mb-3">✓ Bunu Söyle</p>
                  <ul className="space-y-2 text-sm text-foreground-secondary">
                    {[
                      '"3 dakikada şirketinin AI hazırlık seviyesini öğren."',
                      '"Çoğu KOBİ AI\'ı doğru sıradan başlatmıyor."',
                      '"sen" hitabı — modern B2B Türkçesi',
                      'Kısa cümleler (max 20 kelime)',
                      'Gerçek istatistikler + kaynak',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2"><span className="text-secondary flex-shrink-0">•</span>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-red-400 text-xs font-medium mb-3">✗ Bunu Söyleme</p>
                  <ul className="space-y-2 text-sm text-foreground-secondary">
                    {[
                      '"Sizi zengin yapacağız"',
                      '"AI gelmezse bitersiniz"',
                      'Jargon dolu cümleler',
                      'Rakip ismi geçirmek',
                      'Abartılı emojiler',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2"><span className="text-red-400 flex-shrink-0">•</span>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── SOSYAL MEDYA TAB ── */}
        {activeTab === 'social' && (
          <motion.div key="social" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="space-y-4">
              {SOCIAL_PLATFORMS.map((platform) => (
                <div key={platform.platform} className="bg-background-secondary border border-border rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                    <div className="w-2 h-2 rounded-full" style={{ background: platform.color }} />
                    <h4 className="text-foreground font-semibold">{platform.platform}</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-foreground-muted text-xs border-b border-border">
                          <th className="text-left px-5 py-3">İçerik Türü</th>
                          <th className="text-left px-5 py-3">Boyut (px)</th>
                          <th className="text-left px-5 py-3">Format</th>
                          <th className="text-left px-5 py-3">Notlar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {platform.items.map((item, i) => (
                          <tr key={i} className="border-b border-border last:border-0 hover:bg-surface-elevated/30 transition-colors">
                            <td className="px-5 py-3 text-foreground text-xs font-medium">{item.type}</td>
                            <td className="px-5 py-3 font-mono text-secondary text-xs">{item.size}</td>
                            <td className="px-5 py-3">
                              <span className="text-xs px-2 py-0.5 bg-surface-elevated text-foreground-secondary rounded font-mono">{item.format}</span>
                            </td>
                            <td className="px-5 py-3 text-foreground-muted text-xs">{item.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            {/* Görsel üretim workflow */}
            <div className="mt-6 bg-background-secondary border border-border rounded-xl p-5">
              <h4 className="text-foreground font-medium mb-4 text-sm">Görsel Üretim Workflow</h4>
              <div className="flex gap-3 items-start flex-wrap">
                {[
                  { step: '1', label: 'Görsel Üretim', desc: 'Admin → Görsel Üretim → Prompt gir → 4 varyasyon' },
                  { step: '2', label: 'Seç & Kaydet', desc: 'En iyi varyasyonu seç, indir' },
                  { step: '3', label: 'Metin Ekle', desc: 'Canva\'ya aktar → Metin tipset' },
                  { step: '4', label: 'Mobil Kontrol', desc: '375px önizlemede kontrol' },
                  { step: '5', label: 'Export & İsimlendirme', desc: 'verimio_[platform]_[tür]_[tarih].jpg' },
                ].map((step) => (
                  <div key={step.step} className="flex gap-3 items-start min-w-0">
                    <div className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold text-xs">{step.step}</span>
                    </div>
                    <div>
                      <p className="text-foreground text-xs font-medium">{step.label}</p>
                      <p className="text-foreground-muted text-xs mt-0.5">{step.desc}</p>
                    </div>
                    {parseInt(step.step) < 5 && (
                      <span className="text-primary text-lg mt-0.5 flex-shrink-0">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── PLATFORM KILAVUZLARI TAB ── */}
        {activeTab === 'guidelines' && (
          <motion.div key="guidelines" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-2 gap-4">
              {PLATFORM_PROFILES.map((p) => (
                <div key={p.platform} className="bg-background-secondary border border-border rounded-xl p-5">
                  <h4 className="text-foreground font-semibold mb-3">{p.platform}</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-foreground-muted text-xs mb-1">Handle</p>
                      <p className="text-secondary text-sm font-mono">{p.handle}</p>
                    </div>
                    <div>
                      <p className="text-foreground-muted text-xs mb-1">Bio</p>
                      <p className="text-foreground-secondary text-xs leading-relaxed bg-surface-elevated rounded-lg p-2.5">{p.bio}</p>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-foreground-muted text-xs mb-1">Frekans</p>
                        <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">{p.postFreq}</span>
                      </div>
                      <div>
                        <p className="text-foreground-muted text-xs mb-1">En İyi Saat</p>
                        <span className="text-xs text-foreground-secondary">{p.bestTime}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-foreground-muted text-xs mb-2">İçerik Karması</p>
                      <div className="space-y-1">
                        {p.contentMix.map((item, i) => {
                          const pct = parseInt(item.replace('%', ''))
                          return (
                            <div key={i} className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                                <div className="h-full bg-secondary rounded-full" style={{ width: `${pct}%` }} />
                              </div>
                              <p className="text-foreground-muted text-xs w-56 flex-shrink-0">{item}</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Görsel kalite kontrol listesi */}
            <div className="mt-6 bg-background-secondary border border-border rounded-xl p-5">
              <h4 className="text-foreground font-medium mb-4 text-sm">Yayın Öncesi Kalite Kontrol</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {[
                  'Boyut doğru mu? (platform boyut tablosuna bak)',
                  'Marka renkleri: #2E1065 + #A3E635',
                  'Türkçe metin imla kontrolü yapıldı mı?',
                  'Mobilde okunabilir mi? (küçük metin sorunu?)',
                  'Verimio logo veya adı var mı?',
                  'CTA mevcut mu? (verimio.com.tr veya "Link bio\'da")',
                  'Görsel 375px genişlik ekranda test edildi mi?',
                  'Dosya boyutu platform limitinin altında mı?',
                ].map((item, i) => (
                  <label key={i} className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="w-4 h-4 rounded border border-primary group-hover:border-secondary flex-shrink-0 transition-colors" />
                    <span className="text-foreground-secondary text-xs group-hover:text-foreground transition-colors">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
