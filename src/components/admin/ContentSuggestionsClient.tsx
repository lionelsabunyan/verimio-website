'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Suggestion {
  id: string
  title: string
  topic: string
  content_type: string
  keywords: string[]
  priority: string
  status: string
  ai_reasoning: string | null
  notes: string | null
  created_at: string
}

const TYPE_CONFIG: Record<string, { label: string; icon: string; color: string }> = {
  blog:       { label: 'Blog',       icon: '📝', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  linkedin:   { label: 'LinkedIn',   icon: '💼', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
  script:     { label: 'Script',     icon: '🎬', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  newsletter: { label: 'Newsletter', icon: '📧', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  caption:    { label: 'Caption',    icon: '📱', color: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
}

const PRIORITY_CONFIG: Record<string, { label: string; color: string }> = {
  high:   { label: 'Yüksek', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
  medium: { label: 'Orta',   color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  low:    { label: 'Düşük',  color: 'bg-surface-elevated text-foreground-muted border-border' },
}

const STATUS_TABS = [
  { id: 'all',         label: 'Tümü' },
  { id: 'pending',     label: 'Bekleyen' },
  { id: 'approved',    label: 'Onaylı' },
  { id: 'in_progress', label: 'Üretimde' },
  { id: 'published',   label: 'Yayında' },
  { id: 'rejected',    label: 'Reddedildi' },
]

const STATUS_ACTIONS: Record<string, Array<{ label: string; nextStatus: string; style: string }>> = {
  pending: [
    { label: '✓ Onayla',   nextStatus: 'approved',    style: 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20' },
    { label: '✕ Reddet',   nextStatus: 'rejected',    style: 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20' },
  ],
  approved: [
    { label: '▶ Başlat',   nextStatus: 'in_progress', style: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20' },
    { label: '✕ Reddet',   nextStatus: 'rejected',    style: 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20' },
  ],
  in_progress: [
    { label: '🚀 Yayına Al', nextStatus: 'published',  style: 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20' },
    { label: '↩ Geri Al',    nextStatus: 'approved',   style: 'bg-surface-elevated text-foreground-secondary border-border hover:text-foreground' },
  ],
  published: [],
  rejected: [
    { label: '↩ Geri Al',  nextStatus: 'pending',     style: 'bg-surface-elevated text-foreground-secondary border-border hover:text-foreground' },
  ],
}

export default function ContentSuggestionsClient({ initialSuggestions }: { initialSuggestions: Suggestion[] }) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(initialSuggestions)
  const [activeTab, setActiveTab] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [generating, setGenerating] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({})

  const filtered = useMemo(() => {
    return suggestions.filter(s => {
      if (activeTab !== 'all' && s.status !== activeTab) return false
      if (typeFilter !== 'all' && s.content_type !== typeFilter) return false
      return true
    })
  }, [suggestions, activeTab, typeFilter])

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: suggestions.length }
    for (const s of suggestions) c[s.status] = (c[s.status] || 0) + 1
    return c
  }, [suggestions])

  async function generateNew() {
    setGenerating(true)
    try {
      const res = await fetch('/api/admin/content-suggestions', { method: 'POST' })
      const data = await res.json()
      if (data.suggestions) {
        setSuggestions(prev => [...data.suggestions, ...prev])
      }
    } catch (e) {
      console.error(e)
    }
    setGenerating(false)
  }

  async function updateStatus(id: string, status: string) {
    const res = await fetch('/api/admin/content-suggestions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    const data = await res.json()
    if (data.suggestion) {
      setSuggestions(prev => prev.map(s => s.id === id ? data.suggestion : s))
    }
  }

  async function saveNotes(id: string) {
    const notes = editingNotes[id] ?? ''
    const res = await fetch('/api/admin/content-suggestions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, notes }),
    })
    const data = await res.json()
    if (data.suggestion) {
      setSuggestions(prev => prev.map(s => s.id === id ? data.suggestion : s))
      setEditingNotes(prev => { const n = { ...prev }; delete n[id]; return n })
    }
  }

  return (
    <main className="flex-1 p-6 space-y-5">
      {/* Üst bar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {[
            { label: 'Bekleyen', value: counts['pending'] || 0, color: 'text-yellow-400' },
            { label: 'Onaylı',   value: counts['approved'] || 0, color: 'text-secondary' },
            { label: 'Üretimde', value: counts['in_progress'] || 0, color: 'text-blue-400' },
            { label: 'Yayında',  value: counts['published'] || 0, color: 'text-green-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-background-secondary border border-border rounded-lg px-4 py-2 text-center">
              <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-foreground-muted text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
        <button
          onClick={generateNew}
          disabled={generating}
          className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-primary font-medium rounded-xl hover:bg-secondary-hover transition-colors disabled:opacity-60 text-sm"
        >
          {generating ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
              Claude düşünüyor...
            </>
          ) : (
            <><span>✨</span> Yeni Öneri Üret</>
          )}
        </button>
      </div>

      {/* Filtreler */}
      <div className="flex items-center justify-between gap-4">
        {/* Durum tabları */}
        <div className="flex gap-1 bg-background-secondary border border-border rounded-xl p-1">
          {STATUS_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-primary text-foreground font-medium'
                  : 'text-foreground-secondary hover:text-foreground'
              }`}
            >
              {tab.label}
              {counts[tab.id] > 0 && (
                <span className={`text-xs ${activeTab === tab.id ? 'text-foreground/60' : 'text-foreground-muted'}`}>
                  {counts[tab.id]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tip filtresi */}
        <div className="flex gap-1">
          {['all', ...Object.keys(TYPE_CONFIG)].map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                typeFilter === type
                  ? 'border-secondary bg-secondary/10 text-secondary'
                  : 'border-border text-foreground-secondary hover:text-foreground'
              }`}
            >
              {type === 'all' ? 'Tümü' : `${TYPE_CONFIG[type].icon} ${TYPE_CONFIG[type].label}`}
            </button>
          ))}
        </div>
      </div>

      {/* Liste */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-background-secondary border border-dashed border-border rounded-xl p-16 text-center"
          >
            <div className="text-5xl mb-4">💡</div>
            <p className="text-foreground-secondary text-sm mb-1">Henüz içerik önerisi yok</p>
            <p className="text-foreground-muted text-xs">
              {activeTab !== 'all' ? 'Bu filtrede öneri bulunmuyor.' : '"Yeni Öneri Üret" ile Claude\'dan fikirler al'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filtered.map(s => {
              const typeConf = TYPE_CONFIG[s.content_type] || { label: s.content_type, icon: '📄', color: 'bg-surface-elevated text-foreground-muted border-border' }
              const priConf = PRIORITY_CONFIG[s.priority] || PRIORITY_CONFIG.medium
              const actions = STATUS_ACTIONS[s.status] || []
              const isExpanded = expandedId === s.id
              const hasNoteEdit = s.id in editingNotes

              return (
                <motion.div
                  key={s.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-background-secondary border border-border rounded-xl overflow-hidden"
                >
                  {/* Ana satır */}
                  <div
                    className="p-4 flex items-start gap-4 cursor-pointer hover:bg-surface-elevated/30 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : s.id)}
                  >
                    <span className="text-2xl mt-0.5 select-none">{typeConf.icon}</span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded border ${typeConf.color}`}>{typeConf.label}</span>
                        <span className={`text-xs px-2 py-0.5 rounded border ${priConf.color}`}>{priConf.label}</span>
                        {s.status === 'published' && <span className="text-xs px-2 py-0.5 rounded border bg-green-500/10 text-green-400 border-green-500/20">Yayında</span>}
                        {s.status === 'in_progress' && <span className="text-xs px-2 py-0.5 rounded border bg-blue-500/10 text-blue-400 border-blue-500/20">Üretimde</span>}
                        {s.status === 'rejected' && <span className="text-xs px-2 py-0.5 rounded border bg-red-500/10 text-red-400 border-red-500/20">Reddedildi</span>}
                      </div>
                      <h3 className="text-foreground text-sm font-medium leading-snug">{s.title}</h3>
                      <p className="text-foreground-secondary text-xs mt-1 line-clamp-2">{s.topic}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {actions.map(action => (
                        <button
                          key={action.nextStatus}
                          onClick={(e) => { e.stopPropagation(); updateStatus(s.id, action.nextStatus) }}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${action.style}`}
                        >
                          {action.label}
                        </button>
                      ))}
                      <span className="text-foreground-muted text-xs ml-2">{isExpanded ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {/* Detay paneli */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-border"
                      >
                        <div className="p-4 space-y-4">
                          {/* Anahtar kelimeler */}
                          {s.keywords?.length > 0 && (
                            <div>
                              <p className="text-foreground-muted text-xs mb-2 uppercase tracking-wider">Anahtar Kelimeler</p>
                              <div className="flex flex-wrap gap-1.5">
                                {s.keywords.map(kw => (
                                  <span key={kw} className="text-xs px-2.5 py-1 bg-surface-elevated text-foreground-secondary rounded-full border border-border">
                                    {kw}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* AI Gerekçe */}
                          {s.ai_reasoning && (
                            <div>
                              <p className="text-foreground-muted text-xs mb-1 uppercase tracking-wider">Claude Gerekçesi</p>
                              <p className="text-foreground-secondary text-sm italic bg-surface-elevated rounded-lg p-3 border border-border">
                                &ldquo;{s.ai_reasoning}&rdquo;
                              </p>
                            </div>
                          )}

                          {/* Notlar */}
                          <div>
                            <p className="text-foreground-muted text-xs mb-2 uppercase tracking-wider">Notlar</p>
                            {hasNoteEdit ? (
                              <div className="space-y-2">
                                <textarea
                                  value={editingNotes[s.id]}
                                  onChange={(e) => setEditingNotes(prev => ({ ...prev, [s.id]: e.target.value }))}
                                  rows={3}
                                  className="w-full bg-surface-elevated border border-primary rounded-lg px-3 py-2 text-foreground text-sm resize-none focus:outline-none focus:border-secondary"
                                  placeholder="Not ekle..."
                                />
                                <div className="flex gap-2">
                                  <button onClick={() => saveNotes(s.id)} className="text-xs px-3 py-1.5 bg-secondary text-primary rounded-lg hover:bg-secondary-hover transition-colors">
                                    Kaydet
                                  </button>
                                  <button onClick={() => setEditingNotes(prev => { const n = { ...prev }; delete n[s.id]; return n })} className="text-xs px-3 py-1.5 text-foreground-secondary hover:text-foreground transition-colors">
                                    İptal
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div
                                onClick={() => setEditingNotes(prev => ({ ...prev, [s.id]: s.notes || '' }))}
                                className="min-h-[40px] text-sm text-foreground-secondary bg-surface-elevated rounded-lg p-3 border border-border cursor-text hover:border-primary transition-colors"
                              >
                                {s.notes || <span className="text-foreground-muted italic">Not eklemek için tıkla...</span>}
                              </div>
                            )}
                          </div>

                          <p className="text-foreground-muted text-xs">
                            Oluşturuldu: {new Date(s.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}
