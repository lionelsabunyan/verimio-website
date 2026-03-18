'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface QueueItem {
  id: string
  platform: string
  content_type: string
  content_text: string
  status: string
  scheduled_at: string | null
  created_at: string
}

interface Stats {
  ai_generated: number
  approved: number
  published: number
  rejected: number
}

const PLATFORM_CONFIG: Record<string, { icon: string; label: string; color: string; bg: string }> = {
  linkedin:  { icon: '💼', label: 'LinkedIn',  color: 'text-blue-700',  bg: 'bg-blue-50 border-blue-200' },
  instagram: { icon: '📸', label: 'Instagram', color: 'text-pink-600',  bg: 'bg-pink-50 border-pink-200' },
  twitter:   { icon: '🐦', label: 'Twitter',   color: 'text-sky-600',   bg: 'bg-sky-50 border-sky-200' },
  youtube:   { icon: '▶️', label: 'YouTube',   color: 'text-red-600',   bg: 'bg-red-50 border-red-200' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export default function AgencyDashboardClient({
  queue,
  stats,
}: {
  queue: QueueItem[]
  stats: Stats
}) {
  const [generating, setGenerating] = useState(false)
  const [genResult, setGenResult] = useState<{ success?: boolean; count?: number; error?: string } | null>(null)
  const [localStats, setLocalStats] = useState<Stats>(stats)
  const [localQueue, setLocalQueue] = useState<QueueItem[]>(queue)

  async function handleGenerate() {
    setGenerating(true)
    setGenResult(null)
    try {
      const res = await fetch('/api/admin/agency/plan', { method: 'POST' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Hata oluştu')
      setGenResult({ success: true, count: json.count })
      setLocalStats(prev => ({ ...prev, ai_generated: prev.ai_generated + (json.count || 0) }))
      // Refresh queue from server
      const qRes = await fetch('/api/admin/agency/queue?status=ai_generated')
      const qJson = await qRes.json()
      if (qRes.ok && qJson.queue) setLocalQueue(qJson.queue)
    } catch (err) {
      setGenResult({ error: String(err) })
    } finally {
      setGenerating(false)
    }
  }

  const published = localQueue.filter(q => q.status === 'published').slice(0, 5)
  const platformBreakdown = localQueue.reduce<Record<string, number>>((acc, item) => {
    acc[item.platform] = (acc[item.platform] || 0) + 1
    return acc
  }, {})

  const statCards = [
    { label: 'Onay Bekliyor', value: localStats.ai_generated, color: 'bg-amber-50 border-amber-200', text: 'text-amber-700', icon: '⏳' },
    { label: 'Onaylandı',     value: localStats.approved,     color: 'bg-green-50 border-green-200', text: 'text-green-700', icon: '✅' },
    { label: 'Yayınlandı',    value: localStats.published,    color: 'bg-blue-50 border-blue-200',   text: 'text-blue-700',  icon: '🚀' },
    { label: 'Reddedildi',    value: localStats.rejected,     color: 'bg-red-50 border-red-200',     text: 'text-red-600',   icon: '✖' },
  ]

  return (
    <div className="flex-1 p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Sosyal Medya Ajansı</h1>
          <p className="text-sm text-gray-500 mt-0.5">Yapay zeka destekli otonom içerik yönetimi</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium
            hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          {generating ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Üretiliyor...
            </>
          ) : (
            <>✨ Yeni Plan Üret</>
          )}
        </button>
      </div>

      {/* Gen result alert */}
      {genResult && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-4 border text-sm flex items-start gap-3 ${
            genResult.error
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-green-50 border-green-200 text-green-700'
          }`}
        >
          <span className="text-base mt-0.5">{genResult.error ? '❌' : '✅'}</span>
          <div>
            {genResult.error
              ? <p><strong>Hata:</strong> {genResult.error}</p>
              : <p><strong>{genResult.count} adet içerik</strong> oluşturuldu ve onay kuyruğuna eklendi.</p>
            }
          </div>
          <button onClick={() => setGenResult(null)} className="ml-auto text-current/50 hover:text-current">✕</button>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`border rounded-xl p-4 ${s.color}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-base">{s.icon}</span>
              <span className={`text-2xl font-bold ${s.text}`}>{s.value}</span>
            </div>
            <p className={`text-xs font-medium ${s.text}`}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Platform Breakdown */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Platform Dağılımı (Tüm Zamanlar)</h2>
        {Object.keys(platformBreakdown).length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">Henüz içerik üretilmedi</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {Object.entries(platformBreakdown).map(([platform, count]) => {
              const cfg = PLATFORM_CONFIG[platform] || { icon: '📱', label: platform, color: 'text-gray-600', bg: 'bg-gray-50 border-gray-200' }
              return (
                <div key={platform} className={`flex items-center gap-2 px-3 py-2 border rounded-lg ${cfg.bg}`}>
                  <span>{cfg.icon}</span>
                  <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
                  <span className={`text-xs font-bold ${cfg.color}`}>{count}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="/admin/social/approve"
          className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">✅</span>
            <h3 className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">Onay Kuyruğu</h3>
          </div>
          <p className="text-xs text-gray-500">
            {localStats.ai_generated > 0
              ? <span className="text-amber-600 font-medium">{localStats.ai_generated} içerik onay bekliyor</span>
              : 'Bekleyen içerik yok'}
          </p>
        </a>

        <a
          href="/admin/social/strategy"
          className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⚙️</span>
            <h3 className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">Strateji & Ayarlar</h3>
          </div>
          <p className="text-xs text-gray-500">Ton, platform, frekans ve rakip ayarları</p>
        </a>

        <a
          href="/admin/social"
          className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📅</span>
            <h3 className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">Takvim</h3>
          </div>
          <p className="text-xs text-gray-500">Yayın takvimini görüntüle</p>
        </a>
      </div>

      {/* Recently Published */}
      {published.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Son Yayınlananlar</h2>
          <div className="space-y-3">
            {published.map(item => {
              const cfg = PLATFORM_CONFIG[item.platform] || { icon: '📱', label: item.platform, color: 'text-gray-600', bg: 'bg-gray-50 border-gray-200' }
              return (
                <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-base mt-0.5">{cfg.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 line-clamp-2">{item.content_text}</p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {cfg.label} • {item.scheduled_at ? formatDate(item.scheduled_at) : formatDate(item.created_at)}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-[10px] text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">Yayında</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
