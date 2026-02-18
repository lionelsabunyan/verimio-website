'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VIDEO_MODELS = [
  { id: 'fal-ai/minimax/video-01', label: 'Hailuo (MiniMax)', desc: '6 sn, yüksek kalite, ~$0.60' },
  { id: 'fal-ai/vidu/vidu-q1', label: 'Vidu Q1', desc: '4 sn, hızlı üretim, ~$0.30' },
]

const SCRIPT_TOPICS = [
  'KOBİ\'ler neden AI\'ya geçmeli? (60 sn)',
  'Haftada 10 saat nasıl kazanılır? (60 sn)',
  'Müşteri hizmetini AI ile otomatize etme (90 sn)',
  'Excel automasyonu ile nasıl zaman kazanırsın? (60 sn)',
]

interface Video {
  id: string
  url: string
  prompt?: string
  model?: string
  created_at: string
}

export default function VideoGeneratorClient({ previousVideos }: { previousVideos: Video[] }) {
  const [activeTab, setActiveTab] = useState<'ai-video' | 'script'>('ai-video')
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState('fal-ai/minimax/video-01')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ request_id?: string; message?: string } | null>(null)
  const [error, setError] = useState('')

  // Script üretici
  const [scriptTopic, setScriptTopic] = useState('')
  const [script, setScript] = useState('')
  const [scriptLoading, setScriptLoading] = useState(false)

  async function generateVideo() {
    if (!prompt.trim()) return
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/admin/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch (e) {
      setError(String(e))
    }
    setLoading(false)
  }

  async function generateScript() {
    if (!scriptTopic.trim()) return
    setScriptLoading(true)

    const res = await fetch('/api/admin/generate-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'script', topic: scriptTopic }),
    })
    const data = await res.json()
    setScript(data.content?.body || data.content?.hook + '\n\n' + data.content?.body || '')
    setScriptLoading(false)
  }

  return (
    <main className="flex-1 p-6">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'ai-video', label: '🎬 AI Video Üret' },
          { id: 'script', label: '📝 Script + Thumbnail' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'ai-video' | 'script')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === tab.id ? 'bg-[#A3E635] text-[#2E1065] font-medium' : 'bg-[#1A1030] text-[#78716C] hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'ai-video' ? (
          <motion.div key="ai-video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Prompt */}
              <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-5">
                <label className="block text-white text-sm font-medium mb-3">Video Promptu</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Örn: A professional in a modern office using AI tools on multiple screens, cinematic lighting, smooth camera movement..."
                  rows={5}
                  className="w-full bg-[#1A1030] border border-[#2E1065] rounded-lg px-4 py-3 text-white text-sm placeholder-[#4C4462] focus:outline-none focus:border-[#8B5CF6] resize-none"
                />
                <p className="text-[#4C4462] text-xs mt-2">💡 İngilizce promptlar daha iyi sonuç verir</p>
              </div>

              {/* Model */}
              <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-5">
                <label className="block text-white text-sm font-medium mb-3">Model</label>
                <div className="space-y-2">
                  {VIDEO_MODELS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setModel(m.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${model === m.id ? 'border-[#A3E635] bg-[#A3E635]/5' : 'border-[#1A1030] hover:border-[#2E1065]'}`}
                    >
                      <div className="text-left">
                        <div className={`text-sm font-medium ${model === m.id ? 'text-[#A3E635]' : 'text-white'}`}>{m.label}</div>
                        <div className="text-xs text-[#4C4462]">{m.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateVideo}
                disabled={loading || !prompt.trim()}
                className="w-full py-4 bg-[#A3E635] text-[#2E1065] font-bold rounded-xl hover:bg-[#b4f045] transition-colors disabled:opacity-50"
              >
                {loading ? 'Üretim Başlatılıyor...' : '🎬 Video Üret'}
              </button>

              <div className="bg-[#1A1030] rounded-xl p-4 text-sm text-[#4C4462]">
                <p className="font-medium text-[#78716C] mb-1">ℹ️ Nasıl çalışır?</p>
                <p>Video üretimi 2-5 dakika sürer. Başlatınca bir request ID alırsın, video hazır olunca Supabase'e otomatik kaydedilir.</p>
              </div>
            </div>

            <div>
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-4"
                >
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="text-green-400 font-medium mb-2">Video üretimi başladı!</h3>
                  <p className="text-green-400/70 text-sm mb-3">{result.message}</p>
                  {result.request_id && (
                    <p className="text-[#4C4462] text-xs font-mono">ID: {result.request_id}</p>
                  )}
                </motion.div>
              )}

              {/* Önceki videolar */}
              {previousVideos.length > 0 && (
                <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-5">
                  <h3 className="text-white font-medium mb-3">Önceki Videolar</h3>
                  <div className="space-y-3">
                    {previousVideos.map((video) => (
                      <div key={video.id} className="flex items-center gap-3 p-3 bg-[#1A1030] rounded-lg">
                        <span className="text-2xl">🎬</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm truncate">{video.prompt?.slice(0, 50) || 'Video'}...</p>
                          <p className="text-[#4C4462] text-xs">{new Date(video.created_at).toLocaleDateString('tr-TR')}</p>
                        </div>
                        {!video.url.startsWith('pending:') && (
                          <a href={video.url} target="_blank" rel="noopener" className="text-[#A3E635] text-xs hover:underline">
                            İzle
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div key="script" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-5">
                <label className="block text-white text-sm font-medium mb-3">Video Konusu</label>
                <input
                  type="text"
                  value={scriptTopic}
                  onChange={(e) => setScriptTopic(e.target.value)}
                  placeholder="Örn: KOBİ'ler için ChatGPT rehberi (60 sn)"
                  className="w-full bg-[#1A1030] border border-[#2E1065] rounded-lg px-4 py-3 text-white text-sm placeholder-[#4C4462] focus:outline-none focus:border-[#8B5CF6]"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {SCRIPT_TOPICS.map((t) => (
                    <button key={t} onClick={() => setScriptTopic(t)} className="px-2 py-1 bg-[#1A1030] text-[#78716C] hover:text-[#A3E635] text-xs rounded transition-colors">
                      {t.slice(0, 35)}...
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateScript}
                disabled={scriptLoading || !scriptTopic.trim()}
                className="w-full py-4 bg-[#A3E635] text-[#2E1065] font-bold rounded-xl hover:bg-[#b4f045] transition-colors disabled:opacity-50"
              >
                {scriptLoading ? 'Script yazılıyor...' : '📝 Script + Thumbnail Üret'}
              </button>

              <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-5">
                <p className="text-[#A3E635] text-xs font-medium mb-2 uppercase tracking-wider">Ne üretilecek?</p>
                <ul className="space-y-2 text-sm text-[#78716C]">
                  <li>✓ Hook (ilk 3 saniye dikkat çekici)</li>
                  <li>✓ Ana script (zaman kodlarıyla)</li>
                  <li>✓ CTA (son 5 saniye)</li>
                  <li>✓ YouTube thumbnail prompt (ayrıca üret)</li>
                </ul>
              </div>
            </div>

            <div>
              {script && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-6"
                >
                  <h3 className="text-white font-medium mb-3">Script</h3>
                  <div className="text-[#78716C] text-sm leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto bg-[#1A1030] rounded-lg p-4">
                    {script}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <a
                      href="/admin/social/visuals"
                      className="flex-1 px-4 py-2 bg-[#2E1065] text-[#A3E635] rounded-lg text-sm text-center hover:bg-[#3D1580] transition-colors"
                    >
                      🎨 Thumbnail Üret
                    </a>
                  </div>
                </motion.div>
              )}

              {!script && !scriptLoading && (
                <div className="bg-[#0F0A1E] border border-[#1A1030] border-dashed rounded-xl p-12 text-center">
                  <div className="text-5xl mb-4">🎬</div>
                  <p className="text-[#4C4462] text-sm">Konu gir, script hazır olsun</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
