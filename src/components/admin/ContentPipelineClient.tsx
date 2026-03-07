'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Suggestion {
  id: string
  title: string
  content_type: string
  priority: string
  status: string
  created_at: string
}

interface Draft {
  id: string
  title: string | null
  type: string
  status: string
  created_at: string
}

interface PipelineCard {
  id: string
  title: string
  contentType: string
  priority?: string
  date: string
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
    desc: 'Claude tarafından üretildi',
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
}

function PipelineCardItem({ card, index }: { card: PipelineCard; index: number }) {
  const typeIcon = TYPE_ICONS[card.contentType] || '📄'
  const typeLabel = TYPE_LABELS[card.contentType] || card.contentType
  const priority = card.priority ? PRIORITY_CONFIG[card.priority] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-background-secondary border border-border rounded-lg p-3 hover:border-primary/30 transition-colors cursor-pointer group"
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
          <p className="text-foreground-muted text-[10px] mt-1">{formatDate(card.date)}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ContentPipelineClient({
  suggestions,
  drafts,
}: {
  suggestions: Suggestion[]
  drafts: Draft[]
}) {
  const stageMap = useMemo<Record<string, PipelineCard[]>>(() => {
    const map: Record<string, PipelineCard[]> = {
      pending: [],
      approved: [],
      in_progress: [],
      draft: [],
      published: [],
    }

    // Suggestions → pending / approved / in_progress / published
    for (const s of suggestions) {
      if (!map[s.status]) continue
      map[s.status].push({
        id: s.id,
        title: s.title,
        contentType: s.content_type,
        priority: s.priority,
        date: s.created_at,
        source: 'suggestion',
        href: '/admin/content/suggestions',
      })
    }

    // Drafts → always in "draft" column
    for (const d of drafts) {
      map.draft.push({
        id: d.id,
        title: d.title || 'Başlıksız',
        contentType: d.type,
        date: d.created_at,
        source: 'draft',
        href: '/admin/content',
      })
    }

    return map
  }, [suggestions, drafts])

  const totalItems = useMemo(
    () => Object.values(stageMap).reduce((acc, arr) => acc + arr.length, 0),
    [stageMap]
  )

  return (
    <main className="flex-1 p-6 overflow-x-auto">
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

      {/* Kanban board */}
      <div className="flex gap-4 min-w-max pb-4">
        {STAGES.map((stage) => {
          const cards = stageMap[stage.id]
          return (
            <div
              key={stage.id}
              className={`w-64 flex-shrink-0 border ${stage.borderColor} rounded-xl overflow-hidden`}
            >
              {/* Column header */}
              <div className={`${stage.headerBg} px-4 py-3 border-b ${stage.borderColor}`}>
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
              <div className="p-3 space-y-2 min-h-[120px] bg-background max-h-[calc(100vh-280px)] overflow-y-auto">
                {cards.length === 0 ? (
                  <p className="text-foreground-muted text-xs text-center py-6 opacity-60">
                    Boş
                  </p>
                ) : (
                  cards.map((card, i) => (
                    <PipelineCardItem key={card.id} card={card} index={i} />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      {totalItems === 0 && (
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
