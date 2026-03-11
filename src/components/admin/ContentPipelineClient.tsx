'use client'

import { useState, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Suggestion {
  id: string
  title: string
  topic?: string
  content_type: string
  keywords?: string[]
  priority: string
  status: string
  scheduled_at: string | null
  created_at: string
}

interface Draft {
  id: string
  title: string | null
  type: string
  status: string
  scheduled_at: string | null
  created_at: string
}

interface PipelineCard {
  id: string
  title: string
  topic?: string
  contentType: string
  keywords?: string[]
  priority?: string
  date: string
  scheduledAt: string | null
  source: 'suggestion' | 'draft'
  href: string
}

const TYPE_ICONS: Record<string, string> = {
  blog: '📝',
  linkedin: '💼',
  script: '🎬',
  newsletter: '📧',
  caption: '📱',
}

const TYPE_LABELS: Record<string, string> = {
  blog: 'Blog',
  linkedin: 'LinkedIn',
  script: 'Script',
  newsletter: 'Newsletter',
  caption: 'Caption',
}

const PRIORITY_CONFIG: Record<string, { label: string; dot: string }> = {
  high:   { label: 'Yüksek', dot: 'bg-red-400' },
  medium: { label: 'Orta',   dot: 'bg-yellow-400' },
  low:    { label: 'Düşük',  dot: 'bg-foreground-muted' },
}

const STAGES = [
  {
    id: 'pending',
    label: 'Bekleyen',
    icon: '⏳',
    desc: 'İnceleme bekliyor',
    borderColor: 'border-yellow-500/40',
    headerBg: 'bg-yellow-500/10',
    headerText: 'text-yellow-400',
    countBg: 'bg-yellow-500/20 text-yellow-300',
  },
  {
    id: 'approved',
    label: 'Onaylı',
    icon: '✅',
    desc: 'Üretim için onaylı',
    borderColor: 'border-green-500/40',
    headerBg: 'bg-green-500/10',
    headerText: 'text-green-400',
    countBg: 'bg-green-500/20 text-green-300',
  },
  {
    id: 'in_progress',
    label: 'Üretimde',
    icon: '⚡',
    desc: 'Yazım sürecinde',
    borderColor: 'border-blue-500/40',
    headerBg: 'bg-blue-500/10',
    headerText: 'text-blue-400',
    countBg: 'bg-blue-500/20 text-blue-300',
  },
  {
    id: 'draft',
    label: 'Taslaklar',
    icon: '📄',
    desc: 'AI tarafından üretildi',
    borderColor: 'border-purple-500/40',
    headerBg: 'bg-purple-500/10',
    headerText: 'text-purple-400',
    countBg: 'bg-purple-500/20 text-purple-300',
  },
  {
    id: 'published',
    label: 'Yayında',
    icon: '🚀',
    desc: 'Yayınlandı',
    borderColor: 'border-secondary/40',
    headerBg: 'bg-secondary/10',
    headerText: 'text-secondary',
    countBg: 'bg-secondary/20 text-secondary',
  },
]

const DRAGGABLE_STAGES = new Set(['pending', 'approved', 'in_progress'])

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
}

function formatSchedule(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }) +
    ' ' + d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
}

// ─── Card Actions per stage ───
function CardActions({
  card,
  stageId,
  onStatusChange,
  onGenerate,
  onPublish,
  onSchedule,
  loadingAction,
}: {
  card: PipelineCard
  stageId: string
  onStatusChange: (id: string, status: string, source: 'suggestion' | 'draft') => void
  onGenerate: (card: PipelineCard) => void
  onPublish: (card: PipelineCard) => void
  onSchedule: (card: PipelineCard) => void
  loadingAction: string | null
}) {
  const isLoading = loadingAction === card.id

  if (stageId === 'pending' && card.source === 'suggestion') {
    return (
      <div className="flex gap-1 mt-2">
        <button
          disabled={isLoading}
          onClick={(e) => { e.stopPropagation(); onStatusChange(card.id, 'approved', card.source) }}
          className="text-[10px] px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded hover:bg-green-500/20 transition-colors disabled:opacity-50"
        >
          ✓ Onayla
        </button>
        <button
          disabled={isLoading}
          onClick={(e) => { e.stopPropagation(); onStatusChange(card.id, 'rejected', card.source) }}
          className="text-[10px] px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded hover:bg-red-500/20 transition-colors disabled:opacity-50"
        >
          ✕ Reddet
        </button>
        <button
          disabled={isLoading}
          onClick={(e) => { e.stopPropagation(); onSchedule(card) }}
          className="text-[10px] px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded hover:bg-blue-500/20 transition-colors disabled:opacity-50"
        >
          📅
        </button>
      </div>
    )
  }

  if (stageId === 'approved' && card.source === 'suggestion') {
    return (
      <div className="flex gap-1 mt-2">
        <button
          disabled={isLoading}
          onClick={(e) => { e.stopPropagation(); onGenerate(card) }}
          className="text-[10px] px-2 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded hover:bg-secondary/20 transition-colors disabled:opacity-50"
        >
          {isLoading ? '...' : '⚡ Üret'}
        </button>
        <button
          disabled={isLoading}
          onClick={(e) => { e.stopPropagation(); onSchedule(card) }}
          className="text-[10px] px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded hover:bg-blue-500/20 transition-colors disabled:opacity-50"
        >
          📅
        </button>
      </div>
    )
  }

  if (stageId === 'in_progress' && card.source === 'suggestion') {
    return (
      <div className="flex gap-1 mt-2">
        <button
          disabled={isLoading}
          onClick={(e) => { e.stopPropagation(); onSchedule(card) }}
          className="text-[10px] px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded hover:bg-blue-500/20 transition-colors disabled:opacity-50"
        >
          📅 Zamanla
        </button>
      </div>
    )
  }

  if (stageId === 'draft' && card.source === 'draft') {
    return (
      <div className="flex gap-1 mt-2">
        <button
          disabled={isLoading}
          onClick={(e) => { e.stopPropagation(); onPublish(card) }}
          className="text-[10px] px-2 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded hover:bg-secondary/20 transition-colors disabled:opacity-50"
        >
          {isLoading ? '...' : '🚀 Yayınla'}
        </button>
        <Link
          href="/admin/content"
          onClick={(e) => e.stopPropagation()}
          className="text-[10px] px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded hover:bg-purple-500/20 transition-colors"
        >
          👁 Önizle
        </Link>
      </div>
    )
  }

  return null
}

// ─── Card Component ───
function PipelineCardItem({
  card,
  index,
  stageId,
  draggable,
  isDragging,
  onDragStart,
  onDragEnd,
  onStatusChange,
  onGenerate,
  onPublish,
  onSchedule,
  loadingAction,
}: {
  card: PipelineCard
  index: number
  stageId: string
  draggable?: boolean
  isDragging?: boolean
  onDragStart?: () => void
  onDragEnd?: () => void
  onStatusChange: (id: string, status: string, source: 'suggestion' | 'draft') => void
  onGenerate: (card: PipelineCard) => void
  onPublish: (card: PipelineCard) => void
  onSchedule: (card: PipelineCard) => void
  loadingAction: string | null
}) {
  const typeIcon = TYPE_ICONS[card.contentType] || '📄'
  const typeLabel = TYPE_LABELS[card.contentType] || card.contentType
  const priority = card.priority ? PRIORITY_CONFIG[card.priority] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`bg-background-secondary border rounded-lg p-3 transition-all group select-none
        ${draggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}
        ${isDragging ? 'opacity-40 border-secondary/50 ring-1 ring-secondary/30' : 'border-border hover:border-primary/30'}
      `}
    >
      <div className="flex items-start gap-2">
        <span className="text-base mt-0.5 flex-shrink-0">{typeIcon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-foreground text-xs font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {card.title}
          </p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-foreground-muted text-[10px]">{typeLabel}</span>
            {priority && (
              <>
                <span className="text-border">·</span>
                <span className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
                  <span className="text-foreground-muted text-[10px]">{priority.label}</span>
                </span>
              </>
            )}
          </div>
          {card.scheduledAt && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-blue-400 text-[10px]">📅 {formatSchedule(card.scheduledAt)}</span>
            </div>
          )}
          <p className="text-foreground-muted text-[10px] mt-1">{formatDate(card.date)}</p>

          <CardActions
            card={card}
            stageId={stageId}
            onStatusChange={onStatusChange}
            onGenerate={onGenerate}
            onPublish={onPublish}
            onSchedule={onSchedule}
            loadingAction={loadingAction}
          />
        </div>
        {draggable && (
          <span className="text-foreground-muted/30 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">⠿</span>
        )}
      </div>
    </motion.div>
  )
}

// ─── Schedule Modal ───
function ScheduleModal({
  card,
  onClose,
  onSave,
}: {
  card: PipelineCard
  onClose: () => void
  onSave: (id: string, date: string, source: 'suggestion' | 'draft') => void
}) {
  const [dateVal, setDateVal] = useState(() => {
    if (card.scheduledAt) {
      const d = new Date(card.scheduledAt)
      return d.toISOString().slice(0, 16)
    }
    const now = new Date()
    now.setDate(now.getDate() + 1)
    now.setHours(10, 0, 0, 0)
    return now.toISOString().slice(0, 16)
  })
  const modalRef = useRef<HTMLDivElement>(null)

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-background-secondary border border-border rounded-xl p-5 w-full max-w-sm space-y-4"
      >
        <h3 className="text-foreground text-sm font-semibold">Yayın Zamanla</h3>
        <p className="text-foreground-muted text-xs line-clamp-2">{card.title}</p>

        <div>
          <label className="text-foreground-secondary text-xs block mb-1.5">Tarih ve Saat</label>
          <input
            type="datetime-local"
            value={dateVal}
            onChange={(e) => setDateVal(e.target.value)}
            className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="flex gap-2 justify-end">
          {card.scheduledAt && (
            <button
              onClick={() => onSave(card.id, '', card.source)}
              className="text-xs px-3 py-1.5 text-red-400 hover:text-red-300 transition-colors"
            >
              Zamanlamayı Kaldır
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-3 py-1.5 text-foreground-secondary hover:text-foreground transition-colors"
          >
            İptal
          </button>
          <button
            onClick={() => onSave(card.id, dateVal, card.source)}
            className="text-xs px-4 py-1.5 bg-secondary text-primary font-medium rounded-lg hover:bg-secondary-hover transition-colors"
          >
            Zamanla
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───
export default function ContentPipelineClient({
  suggestions,
  drafts,
  tableError,
}: {
  suggestions: Suggestion[]
  drafts: Draft[]
  tableError?: boolean
}) {
  const [localSuggestions, setLocalSuggestions] = useState<Suggestion[]>(suggestions)
  const [localDrafts, setLocalDrafts] = useState<Draft[]>(drafts)
  const [dragInfo, setDragInfo] = useState<{ cardId: string; fromStage: string } | null>(null)
  const [dragOverStage, setDragOverStage] = useState<string | null>(null)
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [scheduleCard, setScheduleCard] = useState<PipelineCard | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const stageMap = useMemo<Record<string, PipelineCard[]>>(() => {
    const map: Record<string, PipelineCard[]> = {
      pending: [],
      approved: [],
      in_progress: [],
      draft: [],
      published: [],
    }

    for (const s of localSuggestions) {
      if (!map[s.status]) continue
      map[s.status].push({
        id: s.id,
        title: s.title,
        topic: s.topic,
        contentType: s.content_type,
        keywords: s.keywords,
        priority: s.priority,
        date: s.created_at,
        scheduledAt: s.scheduled_at,
        source: 'suggestion',
        href: '/admin/content/suggestions',
      })
    }

    for (const d of localDrafts) {
      map.draft.push({
        id: d.id,
        title: d.title || 'Başlıksız',
        contentType: d.type,
        date: d.created_at,
        scheduledAt: d.scheduled_at,
        source: 'draft',
        href: '/admin/content',
      })
    }

    return map
  }, [localSuggestions, localDrafts])

  const totalItems = useMemo(
    () => Object.values(stageMap).reduce((acc, arr) => acc + arr.length, 0),
    [stageMap]
  )

  // ─── Drag & Drop ───
  function handleDragStart(cardId: string, fromStage: string) {
    setDragInfo({ cardId, fromStage })
  }

  function handleDragEnd() {
    setDragInfo(null)
    setDragOverStage(null)
  }

  function handleDragOver(e: React.DragEvent, stageId: string) {
    if (!DRAGGABLE_STAGES.has(stageId)) return
    e.preventDefault()
    setDragOverStage(stageId)
  }

  function handleDragLeave() {
    setDragOverStage(null)
  }

  async function handleDrop(toStage: string) {
    setDragOverStage(null)
    if (!dragInfo) return
    if (dragInfo.fromStage === toStage) { setDragInfo(null); return }
    if (!DRAGGABLE_STAGES.has(toStage)) { setDragInfo(null); return }

    const { cardId, fromStage } = dragInfo
    setDragInfo(null)

    const prev = localSuggestions
    setLocalSuggestions(ls =>
      ls.map(s => s.id === cardId ? { ...s, status: toStage } : s)
    )

    try {
      const res = await fetch('/api/admin/content-suggestions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cardId, status: toStage }),
      })
      if (!res.ok) throw new Error('PATCH failed')
    } catch {
      console.error(`Pipeline DnD: ${fromStage} → ${toStage} başarısız`)
      setLocalSuggestions(prev)
    }
  }

  // ─── Status Change ───
  async function handleStatusChange(id: string, status: string, source: 'suggestion' | 'draft') {
    if (source !== 'suggestion') return
    const prev = localSuggestions
    setLocalSuggestions(ls => ls.map(s => s.id === id ? { ...s, status } : s))

    try {
      const res = await fetch('/api/admin/content-suggestions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (!res.ok) throw new Error()
      showToast(status === 'approved' ? 'Onaylandı' : status === 'rejected' ? 'Reddedildi' : 'Güncellendi')
    } catch {
      setLocalSuggestions(prev)
      showToast('Hata oluştu')
    }
  }

  // ─── Generate Content ───
  async function handleGenerate(card: PipelineCard) {
    setLoadingAction(card.id)

    // Move to in_progress first
    setLocalSuggestions(ls => ls.map(s => s.id === card.id ? { ...s, status: 'in_progress' } : s))

    try {
      // Update status
      await fetch('/api/admin/content-suggestions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: card.id, status: 'in_progress' }),
      })

      // Generate content
      const res = await fetch('/api/admin/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: card.contentType,
          topic: card.topic || card.title,
          keywords: card.keywords?.join(', ') || '',
          tone: 'professional',
        }),
      })

      if (!res.ok) throw new Error('Content generation failed')

      const data = await res.json()
      if (data.draft) {
        setLocalDrafts(prev => [data.draft, ...prev])
        showToast('İçerik üretildi, Taslaklar sütununa eklendi')
      }
    } catch {
      showToast('İçerik üretimi başarısız')
    }

    setLoadingAction(null)
  }

  // ─── Publish Draft ───
  async function handlePublish(card: PipelineCard) {
    if (card.source !== 'draft') return
    setLoadingAction(card.id)

    try {
      const res = await fetch('/api/admin/publish-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draft_id: card.id }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Publish failed')
      }

      // Remove from drafts, it's now published
      setLocalDrafts(prev => prev.filter(d => d.id !== card.id))
      showToast('Yazı yayınlandı!')
    } catch (e) {
      showToast(`Yayınlama hatası: ${e instanceof Error ? e.message : 'Bilinmeyen hata'}`)
    }

    setLoadingAction(null)
  }

  // ─── Schedule ───
  async function handleScheduleSave(id: string, dateStr: string, source: 'suggestion' | 'draft') {
    setScheduleCard(null)
    const scheduledAt = dateStr ? new Date(dateStr).toISOString() : null

    if (source === 'suggestion') {
      setLocalSuggestions(ls => ls.map(s => s.id === id ? { ...s, scheduled_at: scheduledAt } : s))

      try {
        const res = await fetch('/api/admin/content-suggestions', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, scheduled_at: scheduledAt }),
        })
        if (!res.ok) throw new Error()
        showToast(scheduledAt ? 'Zamanlandı' : 'Zamanlama kaldırıldı')
      } catch {
        showToast('Zamanlama hatası')
      }
    }
  }

  return (
    <main className="flex-1 p-6 overflow-x-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-background-secondary border border-border rounded-lg px-4 py-2.5 text-foreground text-sm shadow-lg animate-in fade-in slide-in-from-top-2">
          {toast}
        </div>
      )}

      {/* Schedule Modal */}
      {scheduleCard && (
        <ScheduleModal
          card={scheduleCard}
          onClose={() => setScheduleCard(null)}
          onSave={handleScheduleSave}
        />
      )}

      {/* Tablo hatası */}
      {tableError && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 mb-5">
          <span className="text-amber-500 text-xl mt-0.5">⚠️</span>
          <div>
            <p className="text-amber-800 text-sm font-medium">Veritabanı tabloları bulunamadı</p>
            <p className="text-amber-700 text-xs mt-1">
              Supabase&apos;de <code className="bg-amber-100 px-1 rounded">content_suggestions</code> ve{' '}
              <code className="bg-amber-100 px-1 rounded">content_drafts</code> tablolarını oluştur.
            </p>
          </div>
        </div>
      )}

      {/* Stats bar */}
      <div className="flex items-center gap-6 mb-6 text-sm">
        <div>
          <span className="text-foreground-secondary">Toplam içerik: </span>
          <span className="text-foreground font-semibold">{totalItems}</span>
        </div>
        <div className="flex items-center gap-4">
          {STAGES.map((stage) => (
            <div key={stage.id} className="flex items-center gap-1.5">
              <span className="text-xs">{stage.icon}</span>
              <span className="text-foreground-muted text-xs">{stage.label}</span>
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${stage.countBg}`}>
                {stageMap[stage.id].length}
              </span>
            </div>
          ))}
        </div>
        <Link
          href="/admin/content/suggestions"
          className="ml-auto px-3 py-1.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-lg text-xs font-medium hover:bg-secondary/20 transition-colors"
        >
          Önerilere Git →
        </Link>
      </div>

      {/* Sürükleme ipucu */}
      {!tableError && totalItems > 0 && (
        <p className="text-foreground-muted text-xs mb-3 flex items-center gap-1.5">
          <span>⠿</span>
          <span>Kartları sürükle veya butonlarla durumunu değiştir</span>
        </p>
      )}

      {/* Kanban board */}
      <div className="flex gap-4 min-w-max pb-4">
        {STAGES.map((stage) => {
          const cards = stageMap[stage.id]
          const isDropTarget = dragOverStage === stage.id
          const canDrop = DRAGGABLE_STAGES.has(stage.id)

          return (
            <div
              key={stage.id}
              onDragOver={canDrop ? (e) => handleDragOver(e, stage.id) : undefined}
              onDragLeave={canDrop ? handleDragLeave : undefined}
              onDrop={canDrop ? () => handleDrop(stage.id) : undefined}
              className={`w-64 flex-shrink-0 border rounded-xl overflow-hidden transition-all
                ${isDropTarget
                  ? 'border-secondary ring-2 ring-secondary/30'
                  : stage.borderColor
                }
              `}
            >
              {/* Column header */}
              <div className={`${stage.headerBg} px-4 py-3 border-b ${isDropTarget ? 'border-secondary/40' : stage.borderColor}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{stage.icon}</span>
                    <span className={`text-sm font-semibold ${stage.headerText}`}>
                      {stage.label}
                    </span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stage.countBg}`}>
                    {cards.length}
                  </span>
                </div>
                <p className="text-foreground-muted text-[11px] mt-0.5">{stage.desc}</p>
              </div>

              {/* Cards */}
              <div className={`p-3 space-y-2 min-h-[120px] max-h-[calc(100vh-300px)] overflow-y-auto transition-colors
                ${isDropTarget ? 'bg-secondary/5' : 'bg-background'}
              `}>
                {isDropTarget && dragInfo && dragInfo.fromStage !== stage.id && (
                  <div className="border-2 border-dashed border-secondary/40 rounded-lg p-4 text-center">
                    <p className="text-secondary/70 text-xs">Buraya bırak</p>
                  </div>
                )}
                {cards.length === 0 && !isDropTarget ? (
                  <p className="text-foreground-muted text-xs text-center py-6 opacity-60">
                    Boş
                  </p>
                ) : (
                  cards.map((card, i) => {
                    const isDraggable = DRAGGABLE_STAGES.has(stage.id) && card.source === 'suggestion'
                    const isCurrentlyDragging = dragInfo?.cardId === card.id
                    return (
                      <PipelineCardItem
                        key={card.id}
                        card={card}
                        index={i}
                        stageId={stage.id}
                        draggable={isDraggable}
                        isDragging={isCurrentlyDragging}
                        onDragStart={isDraggable ? () => handleDragStart(card.id, stage.id) : undefined}
                        onDragEnd={isDraggable ? handleDragEnd : undefined}
                        onStatusChange={handleStatusChange}
                        onGenerate={handleGenerate}
                        onPublish={handlePublish}
                        onSchedule={(c) => setScheduleCard(c)}
                        loadingAction={loadingAction}
                      />
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>

      {totalItems === 0 && !tableError && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-foreground-secondary text-sm mb-2">Pipeline boş</p>
          <p className="text-foreground-muted text-xs">
            İçerik önerisi oluşturmak için{' '}
            <Link href="/admin/content/suggestions" className="text-secondary hover:underline">
              İçerik Önerileri
            </Link>{' '}
            sayfasına git.
          </p>
        </div>
      )}
    </main>
  )
}
