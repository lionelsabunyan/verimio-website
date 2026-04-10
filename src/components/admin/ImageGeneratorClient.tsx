'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MODELS = [
  { id: 'fal-ai/nano-banana-pro', label: 'Nano Banana Pro', desc: 'Monokrom line-art (önerilen)' },
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
    label: 'Blog Kapak',
    prompt: 'Monochrome line art illustration on a very dark navy background (#020617). Professional business scene with desk and laptop. White line art outlines, single amber/gold (#F59E0B) accent on key element. Corporate minimalist style. No text, no words, no typography. 1200x630 composition.',
  },
  {
    label: 'LinkedIn Post',
    prompt: 'Monochrome line art illustration on a very dark navy background (#020617). Abstract data visualization with connected nodes and flowing lines. White line art outlines, single amber/gold (#F59E0B) accent. Professional corporate minimalist style. No text. 1200x628 composition.',
  },
  {
    label: 'Instagram Post',
    prompt: 'Monochrome line art illustration on a very dark navy background (#020617). AI and automation concept with circuit patterns and human silhouette. White line art outlines, single amber/gold (#F59E0B) accent. Minimalist corporate style. No text. Square 1080x1080.',
  },
  {
    label: 'YouTube Thumbnail',
    prompt: 'Monochrome line art illustration on a very dark navy background (#020617). Bold split composition, abstract AI brain visualization. White line art, single amber/gold (#F59E0B) accent. High contrast, thumbnail-optimized. No text. 1280x720.',
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
          <div className="bg-background-secondary border border-border rounded-xl p-5">
            <label className="block text-foreground text-sm font-medium mb-3">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Nasıl bir görsel istiyorsun? İngilizce yaz (daha iyi sonuç)..."
              rows={5}
              className="w-full bg-surface-elevated border border-primary rounded-lg px-4 py-3 text-foreground text-sm placeholder-foreground-muted focus:outline-none focus:border-primary-light resize-none"
            />
            <div className="mt-2">
              <p className="text-foreground-muted text-xs mb-2">Hızlı şablonlar:</p>
              <div className="flex flex-wrap gap-2">
                {PROMPT_TEMPLATES.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => setPrompt(t.prompt)}
                    className="px-2 py-1 bg-surface-elevated text-foreground-secondary hover:text-secondary text-xs rounded transition-colors"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Model */}
          <div className="bg-background-secondary border border-border rounded-xl p-5">
            <label className="block text-foreground text-sm font-medium mb-3">Model</label>
            <div className="space-y-2">
              {MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModel(m.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${model === m.id ? 'border-secondary bg-secondary/5' : 'border-border hover:border-primary'}`}
                >
                  <div className={`text-sm font-medium ${model === m.id ? 'text-secondary' : 'text-foreground'}`}>{m.label}</div>
                  <div className="text-xs text-foreground-muted mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Boyut */}
          <div className="bg-background-secondary border border-border rounded-xl p-5">
            <label className="block text-foreground text-sm font-medium mb-3">Platform / Boyut</label>
            <div className="grid grid-cols-2 gap-2">
              {SIZE_PRESETS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  className={`text-left px-3 py-2 rounded-lg border transition-all ${size === s.id ? 'border-secondary bg-secondary/5' : 'border-border hover:border-primary'}`}
                >
                  <div className={`text-xs font-medium ${size === s.id ? 'text-secondary' : 'text-foreground'}`}>{s.label}</div>
                  <div className="text-xs text-foreground-muted">{s.size}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            className="w-full py-4 bg-secondary text-primary font-bold rounded-xl hover:bg-secondary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
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
                <h3 className="text-foreground font-medium mb-3">Yeni Üretimler</h3>
                <div className="grid grid-cols-2 gap-3">
                  {results.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative group rounded-xl overflow-hidden bg-surface-elevated aspect-square"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt={`Varyasyon ${i + 1}`} className="w-full h-full object-contain" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <a
                          href={img.url}
                          download
                          target="_blank"
                          rel="noopener"
                          className="px-3 py-2 bg-secondary text-primary rounded-lg text-sm font-medium"
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
              <h3 className="text-foreground-secondary text-sm font-medium mb-3">Önceki Görseller</h3>
              <div className="grid grid-cols-3 gap-3">
                {previousAssets.map((asset) => (
                  <div key={asset.id} className="relative group rounded-xl overflow-hidden bg-surface-elevated aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset.url} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <a
                        href={asset.url}
                        target="_blank"
                        rel="noopener"
                        className="px-3 py-2 bg-secondary text-primary rounded-lg text-xs font-medium"
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
            <div className="bg-background-secondary border border-border border-dashed rounded-xl p-12 text-center">
              <div className="text-5xl mb-4">🎨</div>
              <p className="text-foreground-muted text-sm">Prompt yaz ve Görsel Üret'e tıkla</p>
              <p className="text-primary text-xs mt-1">4 varyasyon üretilir, en iyi olanı seç</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
