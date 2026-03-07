'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PLATFORMS = ['linkedin', 'instagram', 'twitter', 'youtube'] as const
type Platform = typeof PLATFORMS[number]

const PLATFORM_CONFIG: Record<Platform, { label: string; chipBg: string; icon: string; limit: number }> = {
  linkedin:  { label: 'LinkedIn',   chipBg: 'bg-blue-600',  icon: '💼', limit: 3000 },
  instagram: { label: 'Instagram',  chipBg: 'bg-pink-500',  icon: '📷', limit: 2200 },
  twitter:   { label: 'Twitter / X', chipBg: 'bg-sky-500',  icon: '🐦', limit: 280  },
  youtube:   { label: 'YouTube',    chipBg: 'bg-red-500',   icon: '🎬', limit: 5000 },
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string; dot: string }> = {
  draft:     { label: 'Taslak',    bg: 'bg-surface-elevated', text: 'text-foreground-secondary', border: 'border-border',        dot: 'bg-foreground-muted' },
  scheduled: { label: 'Planlandı', bg: 'bg-blue-500/10',      text: 'text-blue-400',             border: 'border-blue-500/30',   dot: 'bg-blue-400' },
  published: { label: 'Yayında',   bg: 'bg-green-500/10',     text: 'text-green-400',            border: 'border-green-500/30',  dot: 'bg-green-400' },
  failed:    { label: 'Hata',      bg: 'bg-red-500/10',       text: 'text-red-400',              border: 'border-red-500/30',    dot: 'bg-red-400' },
}

const CALENDAR_DAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']

interface Post {
  id: string
  platform: Platform
  content: string
  visual_url?: string
  scheduled_at?: string
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  created_at: string
}

function buildCalendarGrid(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1)
  const lastDay  = new Date(year, month + 1, 0)
  const startDow = (firstDay.getDay() + 6) % 7 // 0=Monday
  const days: (number | null)[] = []
  for (let i = 0; i < startDow; i++) days.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(d)
  while (days.length % 7 !== 0) days.push(null)
  return days
}

// ── New Post Modal ──────────────────────────────────────────────────────────
function NewPostModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [post, setPost] = useState({ platform: 'linkedin' as Platform, content: '', scheduled_at: '' })
  const [saving, setSaving] = useState(false)

  const limit    = PLATFORM_CONFIG[post.platform].limit
  const charCount = post.content.length
  const overLimit = charCount > limit

  async function handleSave() {
    setSaving(true)
    const body: Record<string, string> = { platform: post.platform, content: post.content, status: 'draft' }
    if (post.scheduled_at) body.scheduled_at = new Date(post.scheduled_at).toISOString()
    await fetch('/api/admin/social', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    setSaving(false)
    onSave()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 8 }}
        onClick={e => e.stopPropagation()}
        className="bg-background-secondary border border-border rounded-2xl p-6 w-full max-w-lg shadow-2xl"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-foreground font-semibold">Yeni Post Taslağı</h3>
          <button onClick={onClose} className="text-foreground-muted hover:text-foreground transition-colors text-xl leading-none">×</button>
        </div>

        {/* Platform */}
        <div className="mb-4">
          <label className="block text-foreground-muted text-[10px] uppercase tracking-wider mb-2">Platform</label>
          <div className="grid grid-cols-2 gap-2">
            {PLATFORMS.map(p => (
              <button
                key={p}
                onClick={() => setPost(prev => ({ ...prev, platform: p }))}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all border ${
                  post.platform === p
                    ? 'bg-background border-secondary/50 text-foreground'
                    : 'bg-background border-border text-foreground-secondary hover:text-foreground'
                }`}
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${PLATFORM_CONFIG[p].chipBg}`} />
                {PLATFORM_CONFIG[p].icon} {PLATFORM_CONFIG[p].label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-foreground-muted text-[10px] uppercase tracking-wider">İçerik</label>
            <span className={`text-xs tabular-nums ${overLimit ? 'text-red-400 font-semibold' : 'text-foreground-muted'}`}>
              {charCount.toLocaleString()} / {limit.toLocaleString()}
            </span>
          </div>
          <textarea
            value={post.content}
            onChange={e => setPost(prev => ({ ...prev, content: e.target.value }))}
            placeholder={`${PLATFORM_CONFIG[post.platform].label} için post metni...`}
            rows={5}
            className={`w-full bg-background border rounded-lg px-4 py-3 text-foreground text-sm placeholder-foreground-muted focus:outline-none resize-none transition-colors ${
              overLimit ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-secondary/40'
            }`}
          />
        </div>

        {/* Scheduling */}
        <div className="mb-5">
          <label className="block text-foreground-muted text-[10px] uppercase tracking-wider mb-2">Zamanlama (isteğe bağlı)</label>
          <input
            type="datetime-local"
            value={post.scheduled_at}
            onChange={e => setPost(prev => ({ ...prev, scheduled_at: e.target.value }))}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-secondary/40 transition-colors"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-background border border-border text-foreground-secondary rounded-lg text-sm hover:text-foreground transition-colors"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !post.content.trim() || overLimit}
            className="flex-1 px-4 py-2 bg-secondary text-primary rounded-lg text-sm font-medium hover:bg-secondary-hover transition-colors disabled:opacity-40"
          >
            {saving ? 'Kaydediliyor…' : 'Taslak Kaydet'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Post Detail Panel ───────────────────────────────────────────────────────
function PostDetailPanel({
  post, onClose, onRefresh,
}: {
  post: Post
  onClose: () => void
  onRefresh: () => void
}) {
  const [updating, setUpdating] = useState(false)
  const cfg    = PLATFORM_CONFIG[post.platform]
  const status = STATUS_CONFIG[post.status]

  async function changeStatus(newStatus: string) {
    setUpdating(true)
    await fetch('/api/admin/social', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: post.id, status: newStatus }),
    })
    setUpdating(false)
    onRefresh()
  }

  async function deletePost() {
    if (!confirm('Bu postu silmek istediğinizden emin misiniz?')) return
    await fetch(`/api/admin/social?id=${post.id}`, { method: 'DELETE' })
    onClose()
    onRefresh()
  }

  return (
    <motion.div
      initial={{ x: 16, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 16, opacity: 0 }}
      className="w-72 flex-shrink-0 bg-background-secondary border border-border rounded-xl p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">{cfg.icon}</span>
          <span className="text-foreground text-sm font-medium">{cfg.label}</span>
        </div>
        <button onClick={onClose} className="text-foreground-muted hover:text-foreground transition-colors text-lg leading-none">×</button>
      </div>

      {/* Status badge */}
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border mb-4 ${status.bg} ${status.text} ${status.border}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
        {status.label}
      </div>

      {/* Content */}
      <div className="bg-background rounded-lg p-3 mb-4 max-h-40 overflow-y-auto">
        <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>

      {post.scheduled_at && (
        <p className="text-foreground-muted text-xs mb-4">
          🗓{' '}
          {new Date(post.scheduled_at).toLocaleString('tr-TR', {
            day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit',
          })}
        </p>
      )}

      {post.visual_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.visual_url} alt="" className="w-full h-28 object-cover rounded-lg mb-4" />
      )}

      {/* Actions */}
      <div className="space-y-2">
        {post.status === 'draft' && (
          <button
            onClick={() => changeStatus('scheduled')}
            disabled={updating}
            className="w-full py-2 rounded-lg text-sm bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 transition-colors disabled:opacity-50"
          >
            Planla →
          </button>
        )}
        {post.status === 'scheduled' && (
          <button
            onClick={() => changeStatus('published')}
            disabled={updating}
            className="w-full py-2 rounded-lg text-sm bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-colors disabled:opacity-50"
          >
            Yayında İşaretle ✓
          </button>
        )}
        {post.status === 'published' && (
          <button
            onClick={() => changeStatus('draft')}
            disabled={updating}
            className="w-full py-2 rounded-lg text-sm bg-surface-elevated text-foreground-secondary border border-border hover:text-foreground transition-colors disabled:opacity-50"
          >
            Taslağa Al
          </button>
        )}
        <button
          onClick={deletePost}
          className="w-full py-2 rounded-lg text-sm bg-red-500/5 text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-colors"
        >
          Sil
        </button>
      </div>
    </motion.div>
  )
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function SocialCalendarClient({ posts: initialPosts }: { posts: Post[] }) {
  const [posts]          = useState(initialPosts)
  const [view, setView]  = useState<'calendar' | 'list'>('calendar')
  const [activePlatform, setActivePlatform] = useState<Platform | 'all'>('all')
  const [showNewPost, setShowNewPost]        = useState(false)
  const [selectedPost, setSelectedPost]      = useState<Post | null>(null)

  const today = new Date()
  const [calYear,  setCalYear]  = useState(today.getFullYear())
  const [calMonth, setCalMonth] = useState(today.getMonth())

  const filtered = activePlatform === 'all'
    ? posts
    : posts.filter(p => p.platform === activePlatform)

  const calendarDays = useMemo(() => buildCalendarGrid(calYear, calMonth), [calYear, calMonth])

  const postsByDay = useMemo(() => {
    const map: Record<number, Post[]> = {}
    for (const post of filtered) {
      if (!post.scheduled_at) continue
      const d = new Date(post.scheduled_at)
      if (d.getFullYear() === calYear && d.getMonth() === calMonth) {
        const day = d.getDate()
        if (!map[day]) map[day] = []
        map[day].push(post)
      }
    }
    return map
  }, [filtered, calYear, calMonth])

  function prevMonth() {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11) }
    else setCalMonth(m => m - 1)
  }
  function nextMonth() {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0) }
    else setCalMonth(m => m + 1)
  }
  function goToday() {
    setCalYear(today.getFullYear())
    setCalMonth(today.getMonth())
  }

  function refresh() { window.location.reload() }

  const counts = {
    scheduled: posts.filter(p => p.status === 'scheduled').length,
    draft:     posts.filter(p => p.status === 'draft').length,
    published: posts.filter(p => p.status === 'published').length,
  }

  return (
    <main className="flex-1 p-6">
      {/* Top bar */}
      <div className="flex items-center gap-6 mb-5">
        <div className="flex items-center gap-4 text-sm flex-wrap">
          <span className="text-foreground-secondary">
            Toplam: <span className="text-foreground font-medium">{posts.length}</span>
          </span>
          <span className="text-blue-400">
            Planlandı: <span className="font-medium">{counts.scheduled}</span>
          </span>
          <span className="text-foreground-muted">
            Taslak: <span className="font-medium">{counts.draft}</span>
          </span>
          <span className="text-green-400">
            Yayında: <span className="font-medium">{counts.published}</span>
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* View toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden text-xs">
            <button
              onClick={() => setView('calendar')}
              className={`px-3 py-1.5 transition-colors ${view === 'calendar' ? 'bg-secondary text-primary font-medium' : 'bg-background text-foreground-muted hover:text-foreground'}`}
            >
              📅 Takvim
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 transition-colors ${view === 'list' ? 'bg-secondary text-primary font-medium' : 'bg-background text-foreground-muted hover:text-foreground'}`}
            >
              ☰ Liste
            </button>
          </div>

          <a
            href="/admin/social/visuals"
            className="px-3 py-1.5 rounded-lg text-xs bg-background border border-border text-foreground-secondary hover:text-foreground transition-colors"
          >
            🎨 Görsel Üret
          </a>

          <button
            onClick={() => setShowNewPost(true)}
            className="px-3 py-1.5 rounded-lg text-xs bg-secondary text-primary font-medium hover:bg-secondary-hover transition-colors"
          >
            + Yeni Post
          </button>
        </div>
      </div>

      {/* Platform filter */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <button
          onClick={() => setActivePlatform('all')}
          className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${
            activePlatform === 'all'
              ? 'bg-foreground text-background font-medium border-foreground'
              : 'bg-background-secondary border-border text-foreground-secondary hover:text-foreground'
          }`}
        >
          Tümü
        </button>
        {PLATFORMS.map(p => (
          <button
            key={p}
            onClick={() => setActivePlatform(p)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all border ${
              activePlatform === p
                ? 'bg-foreground text-background font-medium border-foreground'
                : 'bg-background-secondary border-border text-foreground-secondary hover:text-foreground'
            }`}
          >
            {PLATFORM_CONFIG[p].icon} {PLATFORM_CONFIG[p].label}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="flex gap-4">
        <div className="flex-1 min-w-0">
          {view === 'calendar' ? (
            /* ── Calendar ── */
            <div className="bg-background-secondary border border-border rounded-xl overflow-hidden">
              {/* Month navigation */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <button
                  onClick={prevMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-muted hover:text-foreground hover:bg-background transition-colors text-lg"
                >
                  ←
                </button>
                <div className="flex items-center gap-3">
                  <span className="text-foreground font-semibold">
                    {MONTHS[calMonth]} {calYear}
                  </span>
                  <button
                    onClick={goToday}
                    className="px-2 py-0.5 rounded text-[11px] border border-border text-foreground-muted hover:text-foreground transition-colors"
                  >
                    Bugün
                  </button>
                </div>
                <button
                  onClick={nextMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-muted hover:text-foreground hover:bg-background transition-colors text-lg"
                >
                  →
                </button>
              </div>

              {/* Day labels */}
              <div className="grid grid-cols-7 border-b border-border bg-background/50">
                {CALENDAR_DAYS.map(d => (
                  <div key={d} className="py-2 text-center text-foreground-muted text-[11px] font-medium">
                    {d}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-7">
                {calendarDays.map((day, i) => {
                  const isToday = day !== null
                    && day === today.getDate()
                    && calYear === today.getFullYear()
                    && calMonth === today.getMonth()

                  const dayPosts = day !== null ? (postsByDay[day] ?? []) : []
                  const extra = dayPosts.length - 3

                  return (
                    <div
                      key={i}
                      className={`min-h-[90px] p-1.5 border-b border-r border-border last-of-type:border-r-0 ${
                        day === null ? 'bg-background/20' : 'bg-background hover:bg-background-secondary transition-colors'
                      } ${i % 7 === 0 ? 'border-l-0' : ''}`}
                    >
                      {day !== null && (
                        <>
                          <div
                            className={`text-[11px] font-medium mb-1 w-5 h-5 flex items-center justify-center rounded-full ${
                              isToday ? 'bg-secondary text-primary' : 'text-foreground-muted'
                            }`}
                          >
                            {day}
                          </div>
                          <div className="space-y-0.5">
                            {dayPosts.slice(0, 3).map(post => (
                              <button
                                key={post.id}
                                onClick={() => setSelectedPost(post)}
                                className={`w-full text-left flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] truncate text-white hover:opacity-80 transition-opacity ${PLATFORM_CONFIG[post.platform].chipBg}`}
                              >
                                <span className="flex-shrink-0">{PLATFORM_CONFIG[post.platform].icon}</span>
                                <span className="truncate">{post.content.slice(0, 18)}</span>
                              </button>
                            ))}
                            {extra > 0 && (
                              <p className="text-[10px] text-foreground-muted px-1">+{extra} daha</p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            /* ── List ── */
            <div className="space-y-2">
              {filtered.length === 0 ? (
                <div className="bg-background-secondary border border-border rounded-xl p-12 text-center">
                  <div className="text-4xl mb-3">📅</div>
                  <p className="text-foreground-muted text-sm">Henüz post yok.</p>
                  <button
                    onClick={() => setShowNewPost(true)}
                    className="mt-4 px-4 py-2 bg-secondary text-primary rounded-lg text-sm font-medium"
                  >
                    + Yeni Post
                  </button>
                </div>
              ) : (
                filtered.map((post, i) => {
                  const cfg    = PLATFORM_CONFIG[post.platform]
                  const status = STATUS_CONFIG[post.status]
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="bg-background-secondary border border-border rounded-xl p-4 flex items-start gap-4 cursor-pointer hover:border-border-hover transition-colors"
                      onClick={() => setSelectedPost(post)}
                    >
                      <div className="text-2xl flex-shrink-0">{cfg.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-foreground-secondary text-xs">{cfg.label}</span>
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs border ${status.bg} ${status.text} ${status.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                            {status.label}
                          </span>
                          {post.scheduled_at && (
                            <span className="text-foreground-muted text-xs">
                              {new Date(post.scheduled_at).toLocaleString('tr-TR', {
                                day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
                              })}
                            </span>
                          )}
                        </div>
                        <p className="text-foreground text-sm leading-relaxed line-clamp-2">{post.content}</p>
                      </div>
                      {post.visual_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.visual_url} alt="" className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                      )}
                    </motion.div>
                  )
                })
              )}
            </div>
          )}
        </div>

        {/* Post detail panel */}
        <AnimatePresence>
          {selectedPost && (
            <PostDetailPanel
              key={selectedPost.id}
              post={selectedPost}
              onClose={() => setSelectedPost(null)}
              onRefresh={refresh}
            />
          )}
        </AnimatePresence>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPost && (
          <NewPostModal
            onClose={() => setShowNewPost(false)}
            onSave={refresh}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
