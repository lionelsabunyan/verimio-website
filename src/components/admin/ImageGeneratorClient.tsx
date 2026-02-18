'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MODELS = [
  { id: 'fal-ai/recraft/v3/text-to-image', label: 'Recraft V4', desc: 'Sosyal medya görselleri (önerilen)' },
  { id: 'fal-ai/flux/schnell', label: 'Flux Schnell', desc: 'Hızlı üretim, ucuz' },
  { id: 'fal-ai/flux/dev', label: 'Flux Dev', desc: 'Yüksek kalite, yavaş' },
]

const SIZE_PRESETS = [
  { id: 'instagram_square', label: 'Instagram Kare', size: '1080×1080' },
  { id: 'linkedin_post', label: 'LinkedIn Post', size: '1200×628' },
  { id: 'twitter_post', label: 'Twitter Post', size: '1600×900' },
  { id: 'youtube_thumbnail', label: 'YouTube Thumb', size: '1280×720' },
  { id: 'logo_square', label: 'Logo', size: '800×800' },
  { id: 'instagram_story', label: 'Story/Reels', size: '1080×1920' },
]

const PROMPT_TEMPLATES = [
  {
    label: 'Logo (Hexagon)',
    prompt: 'Minimalist tech logo, hexagonal icon outline in deep indigo #2E1065, thin diagonal line inside hexagon in vivid lime #A3E635 representing data flow, small circle at start, small arrow at end, "VERIMIO" wordmark in caps, Inter Bold font style, white background, SVG vector quality, no shadows, no gradients',
  },
  {
    label: 'LinkedIn İnfografik',
    prompt: 'Professional LinkedIn infographic, deep indigo #2E1065 background, vivid lime #A3E635 accent elements, data visualization with charts, Turkish AI consulting theme, clean modern layout, white typography, geometric shapes, no text except numbers',
  },
  {
    label: 'Instagram Post',
    prompt: 'Modern social media graphic, dark indigo background, lime green accents, minimalist data flow visualization, professional B2B tech aesthetic, square format, bold typography space, clean geometric design',
  },
  {
    label: 'YouTube Thumbnail',
    prompt: 'YouTube thumbnail background, split design, left dark indigo half with bold typography placeholder, right half with abstract AI data visualization in lime green, high contrast, thumbnail-optimized composition',
  },
]

interface Asset {
  id: string
  url: string
  prompt?: string
  model?: string
  created_at: string
}

export default function ImageGeneratorClient({ previousAssets }: { previousAssets: Asset[] }) {
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState('fal-ai/recraft/v3/text-to-image')
  const [size, setSize] = useState('instagram_square')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{ url: string }[]>([])
  const [error, setError] = useState('')

  async function generate() {
    if (!prompt.trim()) return
    setLoading(true)
    setError('')
    setResults([])

    try {
      const res = await fetch('/api/admin/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model, size }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResults(data.images || [])
      }
    } catch (e) {
      setError(String(e))
    }
    setLoading(false)
  }

  return (
    <main className="flex-1 p-6">
      <div className="grid grid-cols-5 gap-6">
        {/* Sol — Ayarlar */}
        <div className="col-span-2 space-y-4">
          {/* Prompt */}
          <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-5">
            <label className="block text-white text-sm font-medium mb-3">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Nasıl bir görsel istiyorsun? İngilizce yaz (daha iyi sonuç)..."
              rows={5}
              className="w-full bg-[#1A1030] border border-[#2E1065] rounded-lg px-4 py-3 text-white text-sm placeholder-[#4C4462] focus:outline-none focus:border-[#8B5CF6] resize-none"
            />
            <div className="mt-2">
              <p className="text-[#4C4462] text-xs mb-2">Hızlı şablonlar:</p>
              <div className="flex flex-wrap gap-2">
                {PROMPT_TEMPLATES.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => setPrompt(t.prompt)}
                    className="px-2 py-1 bg-[#1A1030] text-[#78716C] hover:text-[#A3E635] text-xs rounded transition-colors"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Model */}
          <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-5">
            <label className="block text-white text-sm font-medium mb-3">Model</label>
            <div className="space-y-2">
              {MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModel(m.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${model === m.id ? 'border-[#A3E635] bg-[#A3E635]/5' : 'border-[#1A1030] hover:border-[#2E1065]'}`}
                >
                  <div className={`text-sm font-medium ${model === m.id ? 'text-[#A3E635]' : 'text-white'}`}>{m.label}</div>
                  <div className="text-xs text-[#4C4462] mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Boyut */}
          <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-5">
            <label className="block text-white text-sm font-medium mb-3">Platform / Boyut</label>
            <div className="grid grid-cols-2 gap-2">
              {SIZE_PRESETS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  className={`text-left px-3 py-2 rounded-lg border transition-all ${size === s.id ? 'border-[#A3E635] bg-[#A3E635]/5' : 'border-[#1A1030] hover:border-[#2E1065]'}`}
                >
                  <div className={`text-xs font-medium ${size === s.id ? 'text-[#A3E635]' : 'text-white'}`}>{s.label}</div>
                  <div className="text-xs text-[#4C4462]">{s.size}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            className="w-full py-4 bg-[#A3E635] text-[#2E1065] font-bold rounded-xl hover:bg-[#b4f045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-[#2E1065] border-t-transparent rounded-full"
                />
                Üretiliyor...
              </span>
            ) : '🎨 Görsel Üret (4 Varyasyon)'}
          </button>
        </div>

        {/* Sağ — Sonuçlar */}
        <div className="col-span-3">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Yeni sonuçlar */}
          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <h3 className="text-white font-medium mb-3">Yeni Üretimler</h3>
                <div className="grid grid-cols-2 gap-3">
                  {results.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative group rounded-xl overflow-hidden bg-[#1A1030] aspect-square"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt={`Varyasyon ${i + 1}`} className="w-full h-full object-contain" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <a
                          href={img.url}
                          download
                          target="_blank"
                          rel="noopener"
                          className="px-3 py-2 bg-[#A3E635] text-[#2E1065] rounded-lg text-sm font-medium"
                        >
                          İndir
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Önceki görseller */}
          {previousAssets.length > 0 && (
            <div>
              <h3 className="text-[#78716C] text-sm font-medium mb-3">Önceki Görseller</h3>
              <div className="grid grid-cols-3 gap-3">
                {previousAssets.map((asset) => (
                  <div key={asset.id} className="relative group rounded-xl overflow-hidden bg-[#1A1030] aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset.url} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <a
                        href={asset.url}
                        target="_blank"
                        rel="noopener"
                        className="px-3 py-2 bg-[#A3E635] text-[#2E1065] rounded-lg text-xs font-medium"
                      >
                        Aç
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.length === 0 && previousAssets.length === 0 && !loading && (
            <div className="bg-[#0F0A1E] border border-[#1A1030] border-dashed rounded-xl p-12 text-center">
              <div className="text-5xl mb-4">🎨</div>
              <p className="text-[#4C4462] text-sm">Prompt yaz ve Görsel Üret'e tıkla</p>
              <p className="text-[#2E1065] text-xs mt-1">4 varyasyon üretilir, en iyi olanı seç</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
