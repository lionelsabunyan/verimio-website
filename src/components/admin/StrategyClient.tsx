'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AgencySettings {
  tone: string | null
  post_frequency: number | null
  target_audience: string | null
  platforms: string[] | null
  competitors: string[] | null
}

const TONES = [
  {
    id: 'professional',
    label: 'Profesyonel',
    desc: 'Güvenilir, ciddi ve kurumsal bir dil',
    icon: '🏢',
  },
  {
    id: 'friendly',
    label: 'Samimi',
    desc: 'Sıcak, yakın ve anlaşılır bir ton',
    icon: '😊',
  },
  {
    id: 'expert',
    label: 'Uzman',
    desc: 'Teknik, otoriter ve bilgi odaklı',
    icon: '🎓',
  },
]

const PLATFORMS = [
  { id: 'linkedin',  label: 'LinkedIn',  icon: '💼', desc: 'B2B içerik ve network' },
  { id: 'instagram', label: 'Instagram', icon: '📸', desc: 'Görsel ve hikaye içerik' },
  { id: 'twitter',   label: 'Twitter/X', icon: '🐦', desc: 'Kısa metin ve thread' },
]

export default function StrategyClient({ initialSettings }: { initialSettings: AgencySettings }) {
  const [tone, setTone] = useState(initialSettings.tone || 'professional')
  const [frequency, setFrequency] = useState(initialSettings.post_frequency || 7)
  const [audience, setAudience] = useState(initialSettings.target_audience || '')
  const [platforms, setPlatforms] = useState<string[]>(initialSettings.platforms || ['linkedin', 'instagram', 'twitter'])
  const [competitors, setCompetitors] = useState<string[]>(initialSettings.competitors || [])
  const [newCompetitor, setNewCompetitor] = useState('')

  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  function togglePlatform(id: string) {
    setPlatforms(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  function addCompetitor() {
    const val = newCompetitor.trim()
    if (!val || competitors.includes(val)) return
    setCompetitors(prev => [...prev, val])
    setNewCompetitor('')
  }

  function removeCompetitor(val: string) {
    setCompetitors(prev => prev.filter(c => c !== val))
  }

  async function handleSave() {
    if (platforms.length === 0) {
      showToast('En az bir platform seçmelisin', 'error')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/admin/agency/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tone, post_frequency: frequency, target_audience: audience, platforms, competitors }),
      })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Kaydetme başarısız')
      }
      showToast('Ayarlar kaydedildi ✓')
    } catch (err) {
      showToast(String(err), 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex-1 p-6 max-w-2xl">

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${
              toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-gray-900 text-white'
            }`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Strateji & Ayarlar</h1>
        <p className="text-sm text-gray-500 mt-0.5">İçerik üretim stratejini ve ajans ayarlarını yapılandır</p>
      </div>

      <div className="space-y-8">

        {/* Ton */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>🎙️</span> Marka Tonu
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {TONES.map(t => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`text-left p-4 border rounded-xl transition-all ${
                  tone === t.id
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{t.icon}</span>
                <p className={`text-sm font-semibold mt-2 ${tone === t.id ? 'text-blue-700' : 'text-gray-700'}`}>
                  {t.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{t.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Platforms */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>📡</span> Aktif Platformlar
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {PLATFORMS.map(p => {
              const active = platforms.includes(p.id)
              return (
                <button
                  key={p.id}
                  onClick={() => togglePlatform(p.id)}
                  className={`text-left p-4 border rounded-xl transition-all ${
                    active
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 opacity-60'
                  }`}
                >
                  <span className="text-xl">{p.icon}</span>
                  <p className={`text-sm font-semibold mt-2 ${active ? 'text-blue-700' : 'text-gray-700'}`}>
                    {p.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{p.desc}</p>
                  <div className={`mt-2 w-4 h-4 rounded border-2 flex items-center justify-center ${
                    active ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                  }`}>
                    {active && <span className="text-white text-[10px]">✓</span>}
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Frequency */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>📆</span> Haftalık Gönderi Sayısı
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={3}
              max={14}
              value={frequency}
              onChange={e => setFrequency(Number(e.target.value))}
              className="flex-1 accent-blue-600"
            />
            <div className="w-16 text-center">
              <span className="text-2xl font-bold text-blue-600">{frequency}</span>
              <p className="text-[10px] text-gray-400">post/hafta</p>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>3 (min)</span>
            <span>14 (max)</span>
          </div>
        </section>

        {/* Target Audience */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>🎯</span> Hedef Kitle
          </h2>
          <textarea
            value={audience}
            onChange={e => setAudience(e.target.value)}
            placeholder="Örn: Türkiye'deki 10-100 kişilik KOBİ sahipleri ve yöneticileri, dijital dönüşüm sürecindeki şirketler..."
            rows={3}
            className="w-full text-sm text-gray-800 bg-white border border-gray-300 rounded-xl p-4 resize-none
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
          />
        </section>

        {/* Competitors */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
            <span>🔭</span> Takip Edilen Rakipler
          </h2>
          <p className="text-xs text-gray-400 mb-3">
            Rakip hesap adları veya URL'leri. İçerik üretiminde bunlardan farklılaşılır.
          </p>

          {/* Add competitor */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newCompetitor}
              onChange={e => setNewCompetitor(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCompetitor() } }}
              placeholder="@rakip_hesap veya şirket adı"
              className="flex-1 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg px-4 py-2
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
            />
            <button
              onClick={addCompetitor}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Ekle
            </button>
          </div>

          {competitors.length === 0 ? (
            <p className="text-xs text-gray-400 py-3 text-center border border-dashed border-gray-200 rounded-lg">
              Henüz rakip eklenmedi
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {competitors.map(c => (
                <span
                  key={c}
                  className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg"
                >
                  {c}
                  <button
                    onClick={() => removeCompetitor(c)}
                    className="text-gray-400 hover:text-red-500 transition-colors ml-0.5"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Save */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold
              hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            {saving ? 'Kaydediliyor...' : '💾 Ayarları Kaydet'}
          </button>
        </div>

      </div>
    </div>
  )
}
