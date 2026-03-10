'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QueueItem {
  id: string
  platform: string
  content_type: string | null
  content_text: string
  hashtags: string[] | null
  visual_prompt: string | null
  scheduled_at: string | null
  status: string
  ai_reasoning: string | null
  created_at: string
}

const PLATFORM_CONFIG: Record<string, { icon: string; label: string; badgeBg: string; badgeText: string }> = {
  linkedin:  { icon: '💼', label: 'LinkedIn',  badgeBg: 'bg-blue-100',   badgeText: 'text-blue-700' },
  instagram: { icon: '📸', label: 'Instagram', badgeBg: 'bg-pink-100',   badgeText: 'text-pink-700' },
  twitter:   { icon: '🐦', label: 'Twitter',   badgeBg: 'bg-sky-100',    badgeText: 'text-sky-700'  },
  youtube:   { icon: '▶️', label: 'YouTube',   badgeBg: 'bg-red-100',    badgeText: 'text-red-700'  },
}

const TYPE_LABELS: Record<string, string> = {
  post: 'Post', thread: 'Thread', carousel: 'Carousel', reel: 'Reel', story: 'Story',
}

function formatSchedule(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('tr-TR', {
    weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  })
}

function QueueCard({
  item,
  selected,
  onSelect,
  onApprove,
  onReject,
}: {
  item: QueueItem
  selected: boolean
  onSelect: (checked: boolean) => void
  onApprove: (id: string, contentOverride?: string) => void
  onReject: (id: string, note: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editedText, setEditedText] = useState(item.content_text)
  const [rejectMode, setRejectMode] = useState(false)
  const [rejectNote, setRejectNote] = useState('')

  const cfg = PLATFORM_CONFIG[item.platform] || { icon: '📱', label: item.platform, badgeBg: 'bg-gray-100', badgeText: 'text-gray-600' }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className={`bg-white border rounded-xl overflow-hidden transition-all ${
        selected ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Card header */}
      <div className="flex items-start gap-3 p-4">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={selected}
          onChange={e => onSelect(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
        />

        {/* Platform + type */}
        <div className="flex-shrink-0 mt-0.5">
          <span className="text-xl">{cfg.icon}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}>
              {cfg.label}
            </span>
            {item.content_type && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {TYPE_LABELS[item.content_type] || item.content_type}
              </span>
            )}
            {item.scheduled_at && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                🕒 {formatSchedule(item.scheduled_at)}
              </span>
            )}
          </div>

          {/* Content text */}
          {editing ? (
            <textarea
              value={editedText}
              onChange={e => setEditedText(e.target.value)}
              rows={6}
              className="w-full text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p
              className={`text-sm text-gray-700 leading-relaxed ${expanded ? '' : 'line-clamp-3'} cursor-pointer`}
              onClick={() => setExpanded(v => !v)}
            >
              {item.content_text}
            </p>
          )}

          {!editing && (
            <button
              onClick={() => setExpanded(v => !v)}
              className="text-xs text-blue-500 hover:text-blue-700 mt-1"
            >
              {expanded ? 'Daha az göster ↑' : 'Tümünü göster ↓'}
            </button>
          )}

          {/* Hashtags */}
          {item.hashtags && item.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {item.hashtags.map(tag => (
                <span key={tag} className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* AI Reasoning */}
          {item.ai_reasoning && (
            <div className="mt-3 p-2.5 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-2">
              <span className="text-xs mt-0.5">🤖</span>
              <p className="text-xs text-amber-700 italic">{item.ai_reasoning}</p>
            </div>
          )}

          {/* Visual prompt */}
          {item.visual_prompt && (
            <div className="mt-2 p-2.5 bg-purple-50 border border-purple-100 rounded-lg flex items-start gap-2">
              <span className="text-xs mt-0.5">🎨</span>
              <p className="text-xs text-purple-700">{item.visual_prompt}</p>
            </div>
          )}

          {/* Reject note input */}
          {rejectMode && (
            <div className="mt-3">
              <textarea
                value={rejectNote}
                onChange={e => setRejectNote(e.target.value)}
                placeholder="Red gerekçesi (opsiyonel)..."
                rows={2}
                className="w-full text-xs text-gray-700 bg-gray-50 border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>
          )}
        </div>
      </div>

      {/* Card actions */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-t border-gray-100">
        {/* Edit toggle */}
        {!rejectMode && (
          editing ? (
            <button
              onClick={() => setEditing(false)}
              className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 border border-gray-200 rounded-lg"
            >
              İptal
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 border border-gray-200 rounded-lg flex items-center gap-1"
            >
              ✏️ Düzenle
            </button>
          )
        )}

        <div className="flex-1" />

        {/* Reject flow */}
        {rejectMode ? (
          <>
            <button
              onClick={() => setRejectMode(false)}
              className="text-xs text-gray-500 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-100"
            >
              İptal
            </button>
            <button
              onClick={() => onReject(item.id, rejectNote)}
              className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 font-medium"
            >
              ✖ Reddet
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setRejectMode(true)}
              className="text-xs text-red-500 hover:text-red-700 px-3 py-1.5 border border-red-100 rounded-lg hover:bg-red-50"
            >
              ✖ Reddet
            </button>
            <button
              onClick={() => onApprove(item.id, editing ? editedText : undefined)}
              className="text-xs text-white bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded-lg font-medium flex items-center gap-1 shadow-sm"
            >
              ✓ Onayla
            </button>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default function ApprovalQueueClient({ initialQueue }: { initialQueue: QueueItem[] }) {
  const [queue, setQueue] = useState<QueueItem[]>(initialQueue)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [filterPlatform, setFilterPlatform] = useState<string>('all')
  const [batchLoading, setBatchLoading] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const filtered = useMemo(() => {
    if (filterPlatform === 'all') return queue
    return queue.filter(q => q.platform === filterPlatform)
  }, [queue, filterPlatform])

  const platforms = useMemo(() => {
    const seen = new Set(queue.map(q => q.platform))
    return Array.from(seen)
  }, [queue])

  async function handleApprove(id: string, contentOverride?: string) {
    const prev = [...queue]
    setQueue(q => q.filter(item => item.id !== id))
    setSelected(s => { const n = new Set(s); n.delete(id); return n })

    try {
      const res = await fetch('/api/admin/agency/approve', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'approve', ...(contentOverride ? { content_override: contentOverride } : {}) }),
      })
      if (!res.ok) throw new Error('Güncelleme başarısız')
      showToast('İçerik onaylandı ✓')
    } catch {
      setQueue(prev)
      showToast('Onaylama başarısız', 'error')
    }
  }

  async function handleReject(id: string, note: string) {
    const prev = [...queue]
    setQueue(q => q.filter(item => item.id !== id))
    setSelected(s => { const n = new Set(s); n.delete(id); return n })

    try {
      const res = await fetch('/api/admin/agency/approve', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'reject', note }),
      })
      if (!res.ok) throw new Error('Güncelleme başarısız')
      showToast('İçerik reddedildi')
    } catch {
      setQueue(prev)
      showToast('Reddetme başarısız', 'error')
    }
  }

  async function handleBatchApprove() {
    if (selected.size === 0) return
    setBatchLoading(true)
    const ids = Array.from(selected)
    const prev = [...queue]
    setQueue(q => q.filter(item => !selected.has(item.id)))
    setSelected(new Set())

    try {
      const res = await fetch('/api/admin/agency/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      })
      if (!res.ok) throw new Error('Toplu onay başarısız')
      const json = await res.json()
      showToast(`${json.count} içerik toplu onaylandı ✓`)
    } catch {
      setQueue(prev)
      showToast('Toplu onay başarısız', 'error')
    } finally {
      setBatchLoading(false)
    }
  }

  function toggleSelectAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map(q => q.id)))
    }
  }

  return (
    <div className="flex-1 p-6">

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

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Onay Kuyruğu</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {queue.length > 0
              ? `${queue.length} içerik onay bekliyor`
              : 'Onay bekleyen içerik yok'}
          </p>
        </div>

        {/* Batch controls */}
        {queue.length > 0 && (
          <div className="flex items-center gap-3">
            {selected.size > 0 && (
              <button
                onClick={handleBatchApprove}
                disabled={batchLoading}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium
                  hover:bg-green-700 disabled:opacity-60 transition-colors shadow-sm"
              >
                {batchLoading ? '...' : `✓ ${selected.size} İçeriği Toplu Onayla`}
              </button>
            )}
            <button
              onClick={toggleSelectAll}
              className="text-sm text-blue-600 hover:text-blue-800 px-3 py-2 border border-blue-200 rounded-lg hover:bg-blue-50"
            >
              {selected.size === filtered.length && filtered.length > 0 ? 'Seçimi Kaldır' : 'Tümünü Seç'}
            </button>
          </div>
        )}
      </div>

      {/* Platform filter */}
      {platforms.length > 1 && (
        <div className="flex gap-2 mb-5 flex-wrap">
          <button
            onClick={() => setFilterPlatform('all')}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              filterPlatform === 'all'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Tümü ({queue.length})
          </button>
          {platforms.map(p => {
            const cfg = PLATFORM_CONFIG[p] || { icon: '📱', label: p, badgeBg: '', badgeText: '' }
            const cnt = queue.filter(q => q.platform === p).length
            return (
              <button
                key={p}
                onClick={() => setFilterPlatform(p)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1.5 ${
                  filterPlatform === p
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{cfg.icon}</span>
                <span>{cfg.label}</span>
                <span className={`font-semibold ${filterPlatform === p ? '' : 'text-gray-400'}`}>({cnt})</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Empty state */}
      {queue.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🎉</div>
          <p className="text-gray-600 text-sm font-medium mb-2">Onay kuyruğu boş</p>
          <p className="text-gray-400 text-xs mb-6">Tüm içerikler onaylandı veya reddedildi</p>
          <a
            href="/admin/social/agency"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            ✨ Yeni İçerik Üret
          </a>
        </div>
      )}

      {/* Cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {filtered.map(item => (
            <QueueCard
              key={item.id}
              item={item}
              selected={selected.has(item.id)}
              onSelect={checked => {
                setSelected(s => {
                  const n = new Set(s)
                  if (checked) n.add(item.id)
                  else n.delete(item.id)
                  return n
                })
              }}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
