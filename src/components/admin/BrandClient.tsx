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
      <div className="flex gap-1 mb-6 bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-[#2E1065] text-[#A3E635]'
                : 'text-[#4C4462] hover:text-white hover:bg-[#1A1030]'
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
            className="fixed bottom-6 right-6 bg-[#A3E635] text-[#2E1065] px-4 py-2 rounded-lg text-sm font-medium z-50"
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
            {/* Mevcut logo önizlemesi */}
            <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-6 mb-6">
              <h3 className="text-white font-semibold mb-1">Mevcut Logo (Text Tabanlı)</h3>
              <p className="text-[#4C4462] text-xs mb-5">Ikon logo seçilene kadar aktif olan versiyon</p>
              <div className="flex flex-wrap gap-6 items-center">
                {/* Koyu zemin */}
                <div className="bg-[#2E1065] px-8 py-5 rounded-xl flex items-center gap-2">
                  <div className="w-9 h-9 bg-[#A3E635] rounded-lg flex items-center justify-center">
                    <span className="text-[#2E1065] font-black text-xl">V</span>
                  </div>
                  <div>
                    <span className="text-white font-black text-2xl tracking-widest">VERI</span>
                    <span className="text-[#A3E635] font-black text-2xl tracking-widest">MIO</span>
                  </div>
                </div>
                {/* Açık zemin */}
                <div className="bg-white px-8 py-5 rounded-xl flex items-center gap-2 border border-[#E5E7EB]">
                  <div className="w-9 h-9 bg-[#2E1065] rounded-lg flex items-center justify-center">
                    <span className="text-[#A3E635] font-black text-xl">V</span>
                  </div>
                  <div>
                    <span className="text-[#2E1065] font-black text-2xl tracking-widest">VERI</span>
                    <span className="text-[#A3E635] font-black text-2xl tracking-widest">MIO</span>
                  </div>
                </div>
                {/* Lime zemin */}
                <div className="bg-[#A3E635] px-8 py-5 rounded-xl flex items-center gap-2">
                  <div className="w-9 h-9 bg-[#2E1065] rounded-lg flex items-center justify-center">
                    <span className="text-[#A3E635] font-black text-xl">V</span>
                  </div>
                  <div>
                    <span className="text-[#2E1065] font-black text-2xl tracking-widest">VERIMIO</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo seçenekleri */}
            <h3 className="text-white font-semibold mb-3">Logo Opsiyonları — fal.ai ile Üret</h3>
            <p className="text-[#4C4462] text-xs mb-5">Her opsiyonu üret, yan yana karşılaştır, birini seç. Seçim sonrası websiteye entegre edilecek.</p>

            <div className="space-y-4">
              {LOGO_OPTIONS.map((opt) => (
                <div
                  key={opt.id}
                  className={`bg-[#0F0A1E] border rounded-xl overflow-hidden transition-all ${
                    selectedLogo === opt.id
                      ? 'border-[#A3E635]'
                      : opt.recommended
                      ? 'border-[#2E1065]'
                      : 'border-[#1A1030]'
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-white font-bold">Opsiyon {opt.id} — {opt.title}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            opt.recommended
                              ? 'bg-[#A3E635]/20 text-[#A3E635]'
                              : 'bg-[#1A1030] text-[#4C4462]'
                          }`}>{opt.tag}</span>
                        </div>
                        <p className="text-[#78716C] text-sm">{opt.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => copyToClipboard(opt.prompt, `Opsiyon ${opt.id} prompt`)}
                          className="text-xs px-3 py-1.5 border border-[#1A1030] text-[#4C4462] hover:text-white hover:border-[#2E1065] rounded-lg transition-all"
                        >
                          Promptu Kopyala
                        </button>
                        <button
                          onClick={() => generateLogo(opt.id, opt.prompt)}
                          disabled={generatingLogo === opt.id}
                          className="text-xs px-4 py-1.5 bg-[#A3E635]/10 text-[#A3E635] hover:bg-[#A3E635]/20 border border-[#A3E635]/30 rounded-lg transition-all disabled:opacity-50 font-medium"
                        >
                          {generatingLogo === opt.id ? (
                            <span className="flex items-center gap-1.5">
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="inline-block w-3 h-3 border border-[#A3E635] border-t-transparent rounded-full"
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
                        <p className="text-[#4C4462] text-xs mb-3">Üretilen varyasyonlar — birini seç:</p>
                        <div className="grid grid-cols-4 gap-3">
                          {logoResults[opt.id].map((url, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedLogo(opt.id)}
                              className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                                selectedLogo === opt.id
                                  ? 'border-[#A3E635]'
                                  : 'border-[#1A1030] hover:border-[#2E1065]'
                              }`}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={url} alt={`${opt.title} varyasyon ${i + 1}`} className="w-full h-full object-contain bg-white" />
                              {selectedLogo === opt.id && i === 0 && (
                                <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#A3E635] rounded-full flex items-center justify-center">
                                  <svg className="w-3 h-3 text-[#2E1065]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                              <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-1 text-center text-xs text-white opacity-0 hover:opacity-100 transition-opacity">
                                <a href={url} target="_blank" rel="noopener" className="text-[#A3E635]">İndir</a>
                              </div>
                            </button>
                          ))}
                        </div>

                        {selectedLogo === opt.id && (
                          <div className="mt-3 p-3 bg-[#A3E635]/5 border border-[#A3E635]/30 rounded-lg flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#A3E635] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="text-[#A3E635] text-xs font-medium">Opsiyon {opt.id} seçildi. Websiteye entegre etmek için geliştirici moduna geç.</p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Üretilmemiş state */}
                    {!logoResults[opt.id] && generatingLogo !== opt.id && (
                      <div className="mt-4 bg-[#1A1030]/50 rounded-xl h-28 flex items-center justify-center border border-dashed border-[#2E1065]">
                        <p className="text-[#2E1065] text-xs">Üret butonuna tıkla → 4 varyasyon görüntülenecek</p>
                      </div>
                    )}

                    {/* Loading state */}
                    {generatingLogo === opt.id && (
                      <div className="mt-4 bg-[#1A1030]/50 rounded-xl h-28 flex items-center justify-center">
                        <div className="text-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            className="w-8 h-8 border-2 border-[#A3E635] border-t-transparent rounded-full mx-auto mb-2"
                          />
                          <p className="text-[#4C4462] text-xs">fal.ai üretiyor...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Kullanım kuralları özeti */}
            <div className="mt-6 bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-5">
              <h4 className="text-white font-medium mb-3 text-sm">Logo Kullanım Kuralları</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#A3E635] text-xs font-medium mb-2">✓ Onaylı Zemin Kombinasyonları</p>
                  <div className="space-y-1.5">
                    {[
                      { bg: '#2E1065', icon: 'Lime + Beyaz', word: 'Beyaz ("mio" Lime)' },
                      { bg: '#FFFFFF', icon: 'Indigo + Lime', word: 'Indigo ("mio" Lime)' },
                      { bg: '#A3E635', icon: 'Indigo', word: 'Indigo' },
                      { bg: '#0A0A0A', icon: 'Beyaz + Lime', word: 'Beyaz ("mio" Lime)' },
                    ].map((combo, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#78716C]">
                        <div className="w-4 h-4 rounded" style={{ background: combo.bg, border: combo.bg === '#FFFFFF' ? '1px solid #E5E7EB' : 'none' }} />
                        <span>İkon: {combo.icon} / Wordmark: {combo.word}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-red-400 text-xs font-medium mb-2">✗ Yasaklı Kullanımlar</p>
                  <ul className="space-y-1 text-[#78716C] text-xs">
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
                <div key={color.hex} className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl overflow-hidden">
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
                      <span className="text-white font-medium text-sm">{color.name}</span>
                      <button
                        onClick={() => copyToClipboard(color.hex, color.name)}
                        className="font-mono text-[#A3E635] text-xs hover:underline"
                      >
                        {color.hex}
                      </button>
                    </div>
                    {color.cmyk !== '—' && (
                      <p className="text-[#4C4462] text-xs mb-2 font-mono">{color.cmyk}</p>
                    )}
                    <p className="text-[#78716C] text-xs mb-3">{color.usage}</p>
                    <div className="flex flex-wrap gap-1">
                      {color.roles.map((role) => (
                        <span key={role} className="text-xs px-2 py-0.5 bg-[#1A1030] text-[#4C4462] rounded-full">{role}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Renk uyumları */}
            <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-5 mb-4">
              <h4 className="text-white font-medium mb-4 text-sm">Zemin × Metin Uyumları</h4>
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
            <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-5">
              <h4 className="text-white font-medium mb-3 text-sm">CMYK Baskı Değerleri</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[#4C4462] text-xs">
                    <th className="text-left pb-2">Renk</th>
                    <th className="text-left pb-2">HEX</th>
                    <th className="text-left pb-2">CMYK</th>
                    <th className="text-left pb-2">Kullanım</th>
                  </tr>
                </thead>
                <tbody className="text-[#78716C]">
                  {COLORS.filter(c => c.cmyk !== '—').map((c) => (
                    <tr key={c.hex} className="border-t border-[#1A1030]">
                      <td className="py-2 text-white">{c.name}</td>
                      <td className="py-2 font-mono text-[#A3E635] text-xs">{c.hex}</td>
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
              <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-6">
                <h4 className="text-[#4C4462] text-xs font-medium uppercase tracking-widest mb-4">Font Ailesi</h4>
                <div className="space-y-4">
                  <div className="border-b border-[#1A1030] pb-4">
                    <p className="text-[#A3E635] text-xs mb-1">Başlıklar</p>
                    <p className="text-white text-2xl font-bold">Inter Bold</p>
                    <p className="text-[#4C4462] text-xs mt-1">Geist (Next.js default) veya Inter Bold</p>
                  </div>
                  <div className="border-b border-[#1A1030] pb-4">
                    <p className="text-[#A3E635] text-xs mb-1">Gövde Metni</p>
                    <p className="text-white text-lg">Inter Regular / Medium</p>
                    <p className="text-[#4C4462] text-xs mt-1">16–18px, 1.6 satır aralığı</p>
                  </div>
                  <div>
                    <p className="text-[#A3E635] text-xs mb-1">Teknik / Kod</p>
                    <p className="text-white text-lg font-mono">Geist Mono</p>
                    <p className="text-[#4C4462] text-xs mt-1">Kod blokları, hex renk değerleri</p>
                  </div>
                </div>
              </div>

              {/* Boyut hiyerarşisi */}
              <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-6">
                <h4 className="text-[#4C4462] text-xs font-medium uppercase tracking-widest mb-4">Boyut Hiyerarşisi</h4>
                <div className="space-y-3">
                  {[
                    { level: 'H1', size: '48–64px', weight: 'Bold', use: 'Ana sayfa hero başlığı' },
                    { level: 'H2', size: '36–48px', weight: 'Bold', use: 'Bölüm başlıkları' },
                    { level: 'H3', size: '24–32px', weight: 'SemiBold', use: 'Alt bölüm başlıkları' },
                    { level: 'Body', size: '16–18px', weight: 'Regular', use: 'Paragraf metni' },
                    { level: 'Small', size: '14px', weight: 'Regular', use: 'Etiket, caption, meta' },
                  ].map((item) => (
                    <div key={item.level} className="flex items-center gap-3">
                      <span className="w-12 text-[#A3E635] text-xs font-mono font-bold">{item.level}</span>
                      <span className="w-20 text-[#78716C] text-xs font-mono">{item.size}</span>
                      <span className="w-20 text-[#4C4462] text-xs">{item.weight}</span>
                      <span className="text-[#4C4462] text-xs">{item.use}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Canlı önizleme */}
            <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-6 mb-4">
              <h4 className="text-[#4C4462] text-xs font-medium uppercase tracking-widest mb-4">Canlı Tipografi Önizlemesi</h4>
              <div className="space-y-4">
                <h1 className="text-white font-bold" style={{ fontSize: '48px', lineHeight: 1.15 }}>
                  KOBİ&apos;nin AI&apos;a Geçiş Rehberi
                </h1>
                <h2 className="text-white font-bold" style={{ fontSize: '32px' }}>
                  3 dakikada AI hazırlık seviyeni öğren
                </h2>
                <p className="text-[#78716C]" style={{ fontSize: '18px', lineHeight: 1.6 }}>
                  Çoğu KOBİ AI&apos;ı doğru sıradan başlatmıyor. Ücretsiz hazırlık testimiz şirketinin
                  nerede durduğunu, hangi araçların işine yarayacağını ve nasıl başlayacağını gösterir.
                </p>
                <div className="flex items-center gap-3">
                  <span className="bg-[#A3E635] text-[#2E1065] px-6 py-3 rounded-xl font-bold text-sm">Ücretsiz Test Başlat</span>
                  <span className="text-[#A3E635] text-sm font-medium">→ 3 dakika, anlık sonuç</span>
                </div>
              </div>
            </div>

            {/* Ses tonu */}
            <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-6">
              <h4 className="text-[#4C4462] text-xs font-medium uppercase tracking-widest mb-4">Ses Tonu & Yazı Dili</h4>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[#A3E635] text-xs font-medium mb-3">✓ Bunu Söyle</p>
                  <ul className="space-y-2 text-sm text-[#78716C]">
                    {[
                      '"3 dakikada şirketinin AI hazırlık seviyesini öğren."',
                      '"Çoğu KOBİ AI\'ı doğru sıradan başlatmıyor."',
                      '"sen" hitabı — modern B2B Türkçesi',
                      'Kısa cümleler (max 20 kelime)',
                      'Gerçek istatistikler + kaynak',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2"><span className="text-[#A3E635] flex-shrink-0">•</span>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-red-400 text-xs font-medium mb-3">✗ Bunu Söyleme</p>
                  <ul className="space-y-2 text-sm text-[#78716C]">
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
                <div key={platform.platform} className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1A1030]">
                    <div className="w-2 h-2 rounded-full" style={{ background: platform.color }} />
                    <h4 className="text-white font-semibold">{platform.platform}</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-[#4C4462] text-xs border-b border-[#1A1030]">
                          <th className="text-left px-5 py-3">İçerik Türü</th>
                          <th className="text-left px-5 py-3">Boyut (px)</th>
                          <th className="text-left px-5 py-3">Format</th>
                          <th className="text-left px-5 py-3">Notlar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {platform.items.map((item, i) => (
                          <tr key={i} className="border-b border-[#0A0616] last:border-0 hover:bg-[#1A1030]/30 transition-colors">
                            <td className="px-5 py-3 text-white text-xs font-medium">{item.type}</td>
                            <td className="px-5 py-3 font-mono text-[#A3E635] text-xs">{item.size}</td>
                            <td className="px-5 py-3">
                              <span className="text-xs px-2 py-0.5 bg-[#1A1030] text-[#78716C] rounded font-mono">{item.format}</span>
                            </td>
                            <td className="px-5 py-3 text-[#4C4462] text-xs">{item.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            {/* Görsel üretim workflow */}
            <div className="mt-6 bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-5">
              <h4 className="text-white font-medium mb-4 text-sm">Görsel Üretim Workflow</h4>
              <div className="flex gap-3 items-start flex-wrap">
                {[
                  { step: '1', label: 'Görsel Üretim', desc: 'Admin → Görsel Üretim → Prompt gir → 4 varyasyon' },
                  { step: '2', label: 'Seç & Kaydet', desc: 'En iyi varyasyonu seç, indir' },
                  { step: '3', label: 'Metin Ekle', desc: 'Canva\'ya aktar → Metin tipset' },
                  { step: '4', label: 'Mobil Kontrol', desc: '375px önizlemede kontrol' },
                  { step: '5', label: 'Export & İsimlendirme', desc: 'verimio_[platform]_[tür]_[tarih].jpg' },
                ].map((step) => (
                  <div key={step.step} className="flex gap-3 items-start min-w-0">
                    <div className="w-7 h-7 bg-[#A3E635] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#2E1065] font-bold text-xs">{step.step}</span>
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">{step.label}</p>
                      <p className="text-[#4C4462] text-xs mt-0.5">{step.desc}</p>
                    </div>
                    {parseInt(step.step) < 5 && (
                      <span className="text-[#2E1065] text-lg mt-0.5 flex-shrink-0">→</span>
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
                <div key={p.platform} className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-5">
                  <h4 className="text-white font-semibold mb-3">{p.platform}</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[#4C4462] text-xs mb-1">Handle</p>
                      <p className="text-[#A3E635] text-sm font-mono">{p.handle}</p>
                    </div>
                    <div>
                      <p className="text-[#4C4462] text-xs mb-1">Bio</p>
                      <p className="text-[#78716C] text-xs leading-relaxed bg-[#1A1030] rounded-lg p-2.5">{p.bio}</p>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-[#4C4462] text-xs mb-1">Frekans</p>
                        <span className="text-xs px-2 py-0.5 bg-[#A3E635]/10 text-[#A3E635] rounded-full">{p.postFreq}</span>
                      </div>
                      <div>
                        <p className="text-[#4C4462] text-xs mb-1">En İyi Saat</p>
                        <span className="text-xs text-[#78716C]">{p.bestTime}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#4C4462] text-xs mb-2">İçerik Karması</p>
                      <div className="space-y-1">
                        {p.contentMix.map((item, i) => {
                          const pct = parseInt(item.replace('%', ''))
                          return (
                            <div key={i} className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-[#1A1030] rounded-full overflow-hidden">
                                <div className="h-full bg-[#A3E635] rounded-full" style={{ width: `${pct}%` }} />
                              </div>
                              <p className="text-[#4C4462] text-xs w-56 flex-shrink-0">{item}</p>
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
            <div className="mt-6 bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-5">
              <h4 className="text-white font-medium mb-4 text-sm">Yayın Öncesi Kalite Kontrol</h4>
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
                    <div className="w-4 h-4 rounded border border-[#2E1065] group-hover:border-[#A3E635] flex-shrink-0 transition-colors" />
                    <span className="text-[#78716C] text-xs group-hover:text-white transition-colors">{item}</span>
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
