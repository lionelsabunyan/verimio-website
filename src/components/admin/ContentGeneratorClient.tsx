'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CONTENT_TYPES = [
  { id: 'blog', label: 'Blog Yazısı', icon: '📝', desc: 'SEO odaklı, 800-1200 kelime' },
  { id: 'script', label: 'Video Script', icon: '🎬', desc: 'YouTube / Reels için' },
  { id: 'caption', label: 'Sosyal Medya', icon: '📱', desc: '3 platform versiyonu' },
]

const TOPIC_SUGGESTIONS = [
  'KOBİ\'ler için ChatGPT kullanım rehberi',
  'Müşteri hizmetlerini AI ile otomatize etme',
  'Excel otomasyonu ile saatleri kurtarma',
  'AI araçlarıyla içerik üretimi nasıl yapılır',
  'Türkiye\'de dijital dönüşüm istatistikleri 2025',
  'Hangi süreçleri önce otomatize etmeli?',
]

interface Draft {
  id: string
  type: string
  title?: string
  body?: string
  status: string
  created_at: string
}

export default function ContentGeneratorClient({
  drafts,
  initialTopic,
  initialType,
}: {
  drafts: Draft[]
  initialTopic?: string
  initialType?: string
}) {
  const [contentType, setContentType] = useState(initialType || 'blog')
  const [topic, setTopic] = useState(initialTopic || '')
  const [keywords, setKeywords] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Record<string, string> | null>(null)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'generate' | 'drafts'>('generate')

  async function generate() {
    if (!topic.trim()) return
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/admin/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: contentType, topic, keywords }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResult(data.content)
      }
    } catch (e) {
      setError(String(e))
    }
    setLoading(false)
  }

  return (
    <main className="flex-1 p-6">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[{ id: 'generate', label: '✨ İçerik Üret' }, { id: 'drafts', label: `📄 Taslaklar (${drafts.length})` }].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'generate' | 'drafts')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === tab.id ? 'bg-secondary text-primary font-medium' : 'bg-surface-elevated text-foreground-secondary hover:text-foreground'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'generate' ? (
          <motion.div key="generate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-6">
            {/* Sol — Ayarlar */}
            <div className="space-y-4">
              {/* İçerik Tipi */}
              <div className="bg-background-secondary border border-border rounded-xl p-5">
                <label className="block text-foreground text-sm font-medium mb-3">İçerik Tipi</label>
                <div className="space-y-2">
                  {CONTENT_TYPES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setContentType(t.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${contentType === t.id ? 'border-secondary bg-secondary/5' : 'border-border hover:border-primary'}`}
                    >
                      <span className="text-xl">{t.icon}</span>
                      <div className="text-left">
                        <div className={`text-sm font-medium ${contentType === t.id ? 'text-secondary' : 'text-foreground'}`}>{t.label}</div>
                        <div className="text-xs text-foreground-muted">{t.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Konu */}
              <div className="bg-background-secondary border border-border rounded-xl p-5">
                <label className="block text-foreground text-sm font-medium mb-3">Konu</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Örn: KOBİ'ler için ChatGPT kullanımı"
                  className="w-full bg-surface-elevated border border-primary rounded-lg px-4 py-3 text-foreground text-sm placeholder-foreground-muted focus:outline-none focus:border-primary-light"
                />
                <div className="mt-3">
                  <p className="text-foreground-muted text-xs mb-2">Öneri konular:</p>
                  <div className="flex flex-wrap gap-2">
                    {TOPIC_SUGGESTIONS.slice(0, 4).map((t) => (
                      <button key={t} onClick={() => setTopic(t)} className="px-2 py-1 bg-surface-elevated text-foreground-secondary hover:text-secondary text-xs rounded transition-colors">
                        {t.slice(0, 30)}...
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Anahtar kelimeler */}
              <div className="bg-background-secondary border border-border rounded-xl p-5">
                <label className="block text-foreground text-sm font-medium mb-3">SEO Kelimeleri (isteğe bağlı)</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="AI otomasyon, KOBİ, verimlilik"
                  className="w-full bg-surface-elevated border border-primary rounded-lg px-4 py-3 text-foreground text-sm placeholder-foreground-muted focus:outline-none focus:border-primary-light"
                />
              </div>

              <button
                onClick={generate}
                disabled={loading || !topic.trim()}
                className="w-full py-4 bg-secondary text-primary font-bold rounded-xl hover:bg-secondary-hover transition-colors disabled:opacity-50"
              >
                {loading ? 'Claude yazıyor...' : '✨ İçerik Üret'}
              </button>
            </div>

            {/* Sağ — Sonuç */}
            <div>
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {loading && (
                <div className="bg-background-secondary border border-border rounded-xl p-12 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 border-2 border-primary border-t-secondary rounded-full mx-auto mb-4"
                  />
                  <p className="text-foreground-secondary text-sm">Claude içerik yazıyor...</p>
                </div>
              )}

              {result && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-background-secondary border border-border rounded-xl p-6 space-y-4"
                >
                  {result.title && (
                    <div>
                      <p className="text-secondary text-xs font-medium mb-1 uppercase tracking-wider">Başlık</p>
                      <h3 className="text-foreground font-semibold">{result.title}</h3>
                    </div>
                  )}
                  {result.meta_description && (
                    <div>
                      <p className="text-secondary text-xs font-medium mb-1 uppercase tracking-wider">Meta Açıklama</p>
                      <p className="text-foreground-secondary text-sm">{result.meta_description}</p>
                    </div>
                  )}
                  {result.body && (
                    <div>
                      <p className="text-secondary text-xs font-medium mb-2 uppercase tracking-wider">İçerik</p>
                      <div className="text-foreground-secondary text-sm leading-relaxed max-h-80 overflow-y-auto whitespace-pre-wrap bg-surface-elevated rounded-lg p-4">
                        {result.body}
                      </div>
                    </div>
                  )}
                  {result.linkedin && (
                    <div className="space-y-3">
                      {(['linkedin', 'instagram', 'twitter'] as const).filter(p => result[p]).map((p) => (
                        <div key={p}>
                          <p className="text-secondary text-xs font-medium mb-1 uppercase tracking-wider">{p}</p>
                          <div className="text-foreground-secondary text-sm leading-relaxed bg-surface-elevated rounded-lg p-3 whitespace-pre-wrap">
                            {result[p]}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-foreground-muted text-xs">✓ Taslak otomatik olarak kaydedildi</p>
                </motion.div>
              )}

              {!result && !loading && !error && (
                <div className="bg-background-secondary border border-border border-dashed rounded-xl p-12 text-center">
                  <div className="text-5xl mb-4">✍️</div>
                  <p className="text-foreground-muted text-sm">Konu gir ve Claude'u çalıştır</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div key="drafts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="space-y-3">
              {drafts.map((draft) => (
                <div key={draft.id} className="bg-background-secondary border border-border rounded-xl p-5 flex items-start gap-4">
                  <span className="text-2xl">{CONTENT_TYPES.find(t => t.id === draft.type)?.icon || '📄'}</span>
                  <div className="flex-1">
                    <h3 className="text-foreground text-sm font-medium">{draft.title || 'Başlıksız'}</h3>
                    <p className="text-foreground-muted text-xs mt-1">
                      {draft.type} · {new Date(draft.created_at).toLocaleDateString('tr-TR')} · {draft.status}
                    </p>
                    {draft.body && (
                      <p className="text-foreground-secondary text-sm mt-2 line-clamp-2">{draft.body.slice(0, 150)}...</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
