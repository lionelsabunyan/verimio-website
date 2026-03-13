'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CarouselSlide {
  type: 'hook' | 'point' | 'cta'
  headline: string
  body: string
}

interface SocialPost {
  id: string
  platform: 'linkedin' | 'instagram' | 'twitter'
  content: string
  hashtags: string[] | null
  pair_id: string | null
  visual_url: string | null
  visual_prompt: string | null
  blog_slug: string | null
  source_type: string | null
  scheduled_at: string | null
  status: string
  created_at: string
  post_type?: 'single' | 'carousel' | null
  carousel_data?: CarouselSlide[] | null
}

// ── Carousel Preview ───────────────────────────────────────────────────────────
function CarouselPreview({ slides }: { slides: CarouselSlide[] }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const slide = slides[activeIdx]
  if (!slide) return null

  const bgColor: Record<string, string> = {
    hook:  'bg-indigo-950',
    point: 'bg-indigo-950',
    cta:   'bg-indigo-950',
  }

  return (
    <div className="border-t border-border">
      <div className="px-4 pt-3 pb-1">
        <p className="text-[10px] text-foreground-muted uppercase tracking-wider mb-2">
          🎠 Instagram Carousel — {slides.length} slide
        </p>

        {/* Slide preview card */}
        <div className={`relative rounded-lg overflow-hidden ${bgColor[slide.type]} p-4 aspect-square flex flex-col`}
          style={{ background: 'linear-gradient(135deg, #1E0A46 0%, #2E1065 100%)' }}
        >
          {/* Progress dots */}
          <div className="flex gap-1 mb-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className="rounded-full transition-all"
                style={{
                  width:      i === activeIdx ? 20 : 6,
                  height:     6,
                  background: i === activeIdx ? '#A3E635' : 'rgba(255,255,255,0.25)',
                }}
              />
            ))}
          </div>

          {/* Slide content */}
          <div className="flex-1 flex flex-col justify-center">
            {slide.type === 'hook' && (
              <div className="w-8 h-0.5 rounded mb-3" style={{ background: '#A3E635' }} />
            )}
            {slide.type === 'point' && (
              <p className="text-[28px] font-black leading-none mb-1"
                style={{ color: 'rgba(163,230,53,0.12)' }}>
                {String(activeIdx).padStart(2, '0')}
              </p>
            )}
            <p className={`font-bold leading-tight mb-2 ${slide.type === 'cta' ? 'text-[11px]' : 'text-xs'}`}
              style={{ color: slide.type === 'cta' ? '#A3E635' : '#fff' }}>
              {slide.headline}
            </p>
            {slide.body && (
              <p className="text-[9px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {slide.body}
              </p>
            )}
            {slide.type === 'cta' && (
              <div className="mt-2 inline-flex items-center gap-1 rounded px-2 py-1 text-[9px] font-bold"
                style={{ background: '#A3E635', color: '#1E0A46' }}>
                verimio.com.tr →
              </div>
            )}
          </div>

          {/* Slide indicator */}
          <p className="text-[9px] mt-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
            {activeIdx + 1} / {slides.length}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-2 mb-1">
          <button
            onClick={() => setActiveIdx(i => Math.max(0, i - 1))}
            disabled={activeIdx === 0}
            className="text-[10px] text-foreground-muted hover:text-foreground disabled:opacity-30 transition-colors"
          >
            ← Önceki
          </button>

          {/* Download links */}
          <div className="flex items-center gap-1.5">
            {slides.map((s, i) => (
              <a
                key={i}
                href={`/api/admin/social/render-slide?headline=${encodeURIComponent(s.headline)}&body=${encodeURIComponent(s.body)}&type=${s.type}&index=${i + 1}&total=${slides.length}`}
                target="_blank"
                rel="noreferrer"
                title={`Slide ${i + 1} indir`}
                className="w-5 h-5 rounded flex items-center justify-center text-[9px] transition-colors hover:opacity-80"
                style={{ background: i === activeIdx ? '#A3E635' : 'rgba(163,230,53,0.2)', color: '#1E0A46' }}
              >
                {i + 1}
              </a>
            ))}
            <span className="text-[9px] text-foreground-muted ml-0.5">PNG ↗</span>
          </div>

          <button
            onClick={() => setActiveIdx(i => Math.min(slides.length - 1, i + 1))}
            disabled={activeIdx === slides.length - 1}
            className="text-[10px] text-foreground-muted hover:text-foreground disabled:opacity-30 transition-colors"
          >
            Sonraki →
          </button>
        </div>
      </div>
    </div>
  )
}

interface WeekPost {
  id: string
  platform: string
  content: string
  status: string
  scheduled_at: string | null
}

interface ApprovalBoardClientProps {
  pendingPosts: SocialPost[]
  weekQueue: WeekPost[]
}

const PLATFORM_CONFIG: Record<string, {
  icon: string
  label: string
  limit: number
  chipBg: string
  chipText: string
  headerBg: string
  borderColor: string
}> = {
  linkedin:  {
    icon: '💼', label: 'LinkedIn',   limit: 3000,
    chipBg: 'bg-blue-500/20', chipText: 'text-blue-300',
    headerBg: 'bg-blue-500/10', borderColor: 'border-blue-500/30',
  },
  instagram: {
    icon: '📸', label: 'Instagram',  limit: 2200,
    chipBg: 'bg-pink-500/20', chipText: 'text-pink-300',
    headerBg: 'bg-pink-500/10', borderColor: 'border-pink-500/30',
  },
  twitter:   {
    icon: '🐦', label: 'Twitter / X', limit: 280,
    chipBg: 'bg-sky-500/20', chipText: 'text-sky-300',
    headerBg: 'bg-sky-500/10', borderColor: 'border-sky-500/30',
  },
}

const WEEK_STATUS: Record<string, { label: string; dot: string; text: string }> = {
  approved:  { label: 'Onaylandı', dot: 'bg-green-400',   text: 'text-green-400' },
  scheduled: { label: 'Planlandı', dot: 'bg-blue-400',    text: 'text-blue-400' },
  published: { label: 'Yayında',   dot: 'bg-emerald-400', text: 'text-emerald-400' },
}

// ── Platform Card ─────────────────────────────────────────────────────────────

function PlatformCard({
  post,
  onApprove,
  onReject,
  loading,
}: {
  post: SocialPost
  onApprove: (id: string, content: string) => void
  onReject: (id: string) => void
  loading: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [editContent, setEditContent] = useState(post.content)
  const [expanded, setExpanded] = useState(false)

  const cfg = PLATFORM_CONFIG[post.platform] ?? {
    icon: '📱', label: post.platform, limit: 9999,
    chipBg: 'bg-gray-500/20', chipText: 'text-gray-300',
    headerBg: 'bg-gray-500/10', borderColor: 'border-gray-500/30',
  }

  const charCount = editContent.length
  const overLimit = charCount > cfg.limit

  return (
    <div className={`flex flex-col border rounded-xl overflow-hidden ${cfg.borderColor} bg-background-secondary`}>
      {/* Header */}
      <div className={`flex items-center gap-2 px-4 py-3 ${cfg.headerBg} border-b ${cfg.borderColor}`}>
        <span className="text-lg">{cfg.icon}</span>
        <span className={`text-xs font-semibold ${cfg.chipText}`}>{cfg.label}</span>
        {post.source_type === 'blog' && (
          <span className="ml-auto text-[10px] text-foreground-muted bg-background px-2 py-0.5 rounded border border-border">Blog</span>
        )}
      </div>

      {/* Visual */}
      {post.visual_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.visual_url}
          alt="Post görseli"
          className="w-full h-32 object-cover"
        />
      )}

      {/* Carousel preview (Instagram only) */}
      {post.post_type === 'carousel' && post.carousel_data && post.carousel_data.length > 0 && (
        <CarouselPreview slides={post.carousel_data} />
      )}

      {/* Content */}
      <div className="flex-1 p-4">
        {editing ? (
          <textarea
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
            rows={6}
            className={`w-full bg-background border rounded-lg px-3 py-2.5 text-foreground text-xs leading-relaxed resize-none focus:outline-none transition-colors ${
              overLimit ? 'border-red-500/50' : 'border-border focus:border-secondary/40'
            }`}
          />
        ) : (
          <p
            className={`text-foreground text-xs leading-relaxed cursor-pointer ${expanded ? '' : 'line-clamp-5'}`}
            onClick={() => setExpanded(v => !v)}
          >
            {editContent}
          </p>
        )}

        {/* Char counter */}
        <div className="flex items-center justify-between mt-2">
          <span className={`text-[10px] tabular-nums ${overLimit ? 'text-red-400 font-semibold' : 'text-foreground-muted'}`}>
            {charCount.toLocaleString()} / {cfg.limit.toLocaleString()}
          </span>
          {!editing && (
            <button
              onClick={() => setExpanded(v => !v)}
              className="text-[10px] text-foreground-muted hover:text-foreground transition-colors"
            >
              {expanded ? '↑ Kıs' : '↓ Tümü'}
            </button>
          )}
        </div>

        {/* Hashtags */}
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5">
            {post.hashtags.map(tag => (
              <span
                key={tag}
                className={`text-[10px] px-1.5 py-0.5 rounded ${cfg.chipBg} ${cfg.chipText}`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Scheduled */}
        {post.scheduled_at && (
          <p className="text-[10px] text-foreground-muted mt-2.5">
            🕐 {new Date(post.scheduled_at).toLocaleDateString('tr-TR', {
              weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
            })}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-border flex items-center gap-2">
        {editing ? (
          <>
            <button
              onClick={() => { setEditing(false); setEditContent(post.content) }}
              className="text-xs text-foreground-muted hover:text-foreground px-2.5 py-1.5 border border-border rounded-lg transition-colors"
            >
              İptal
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-xs text-foreground px-2.5 py-1.5 border border-border rounded-lg hover:border-secondary/40 transition-colors"
            >
              ✓ Kaydet
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-xs text-foreground-muted hover:text-foreground px-2.5 py-1.5 border border-border rounded-lg transition-colors"
          >
            ✏️ Düzenle
          </button>
        )}

        <div className="flex-1" />

        <button
          onClick={() => onReject(post.id)}
          disabled={loading}
          className="text-xs text-red-400 hover:text-red-300 px-2.5 py-1.5 border border-red-500/20 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-40"
        >
          ✕ Reddet
        </button>
        <button
          onClick={() => onApprove(post.id, editContent)}
          disabled={loading || overLimit}
          className="text-xs text-primary bg-secondary hover:bg-secondary-hover px-3 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-40 flex items-center gap-1.5"
        >
          {loading ? (
            <span className="inline-block w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          ) : '✓'} Onayla
        </button>
      </div>
    </div>
  )
}

// ── Post Group (bir pair_id'nin 3 platformu) ──────────────────────────────────

function PostGroup({
  posts,
  onApprove,
  onReject,
  loadingIds,
}: {
  posts: SocialPost[]
  onApprove: (id: string, content: string) => void
  onReject: (id: string) => void
  loadingIds: Set<string>
}) {
  const order: Record<string, number> = { linkedin: 0, instagram: 1, twitter: 2 }
  const sorted = [...posts].sort((a, b) => (order[a.platform] ?? 9) - (order[b.platform] ?? 9))

  const blogPost = posts.find(p => p.blog_slug)
  const sourceLabel = blogPost?.blog_slug
    ? `Blog: ${blogPost.blog_slug.slice(0, 40)}…`
    : 'Manuel konu'

  return (
    <div className="bg-background border border-border rounded-xl overflow-hidden">
      {/* Group header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-background-secondary">
        <div className="flex items-center gap-1.5">
          {sorted.map(p => (
            <span key={p.id} className="text-base">{PLATFORM_CONFIG[p.platform]?.icon ?? '📱'}</span>
          ))}
        </div>
        <span className="text-foreground text-xs font-medium">
          {sorted.map(p => PLATFORM_CONFIG[p.platform]?.label ?? p.platform).join(' · ')}
        </span>
        <span className="ml-auto text-[10px] text-foreground-muted truncate max-w-xs">{sourceLabel}</span>
      </div>

      {/* Platform cards */}
      <div className={`p-4 grid gap-4 ${sorted.length === 3 ? 'grid-cols-1 md:grid-cols-3' : sorted.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-sm'}`}>
        {sorted.map(post => (
          <PlatformCard
            key={post.id}
            post={post}
            onApprove={onApprove}
            onReject={onReject}
            loading={loadingIds.has(post.id)}
          />
        ))}
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ApprovalBoardClient({ pendingPosts, weekQueue }: ApprovalBoardClientProps) {
  const [posts, setPosts] = useState<SocialPost[]>(pendingPosts)
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set())
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  // pair_id'ye göre grupla
  const groups = useMemo(() => {
    const map = new Map<string, SocialPost[]>()
    for (const post of posts) {
      const key = post.pair_id ?? post.id
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(post)
    }
    return Array.from(map.entries()).map(([key, items]) => ({ key, items }))
  }, [posts])

  async function handleApprove(id: string, content: string) {
    setLoadingIds(s => new Set(s).add(id))
    const prev = [...posts]
    setPosts(p => p.filter(x => x.id !== id))

    try {
      const res = await fetch('/api/admin/social', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, content, status: 'approved' }),
      })
      if (!res.ok) throw new Error('Onaylama başarısız')
      showToast('Post onaylandı ✓')
    } catch (err) {
      setPosts(prev)
      showToast(String(err), 'error')
    } finally {
      setLoadingIds(s => { const n = new Set(s); n.delete(id); return n })
    }
  }

  async function handleReject(id: string) {
    setLoadingIds(s => new Set(s).add(id))
    const prev = [...posts]
    setPosts(p => p.filter(x => x.id !== id))

    try {
      const res = await fetch('/api/admin/social', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'rejected' }),
      })
      if (!res.ok) throw new Error('Red işlemi başarısız')
      showToast('Post reddedildi')
    } catch (err) {
      setPosts(prev)
      showToast(String(err), 'error')
    } finally {
      setLoadingIds(s => { const n = new Set(s); n.delete(id); return n })
    }
  }

  async function handleApproveAll() {
    const allIds = posts.map(p => p.id)
    if (allIds.length === 0) return
    setLoadingIds(new Set(allIds))
    const prev = [...posts]
    setPosts([])

    try {
      await Promise.all(
        allIds.map(id =>
          fetch('/api/admin/social', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: 'approved' }),
          })
        )
      )
      showToast(`${allIds.length} post onaylandı ✓`)
    } catch {
      setPosts(prev)
      showToast('Toplu onay başarısız', 'error')
    } finally {
      setLoadingIds(new Set())
    }
  }

  const WEEK_PLATFORM = PLATFORM_CONFIG as Record<string, { icon: string; label: string }>

  return (
    <main className="flex-1 p-6 space-y-6">

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium border ${
              toast.type === 'error'
                ? 'bg-red-500/20 border-red-500/40 text-red-300'
                : 'bg-green-500/20 border-green-500/40 text-green-300'
            }`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-foreground-muted text-sm">
            {posts.length > 0
              ? `${posts.length} post onay bekliyor`
              : 'Onay bekleyen post yok'}
          </p>
        </div>
        {posts.length > 0 && (
          <div className="flex items-center gap-3">
            <a
              href="/admin/social"
              className="px-3 py-2 rounded-lg text-xs bg-background border border-border text-foreground-secondary hover:text-foreground transition-colors"
            >
              ← Hub
            </a>
            <button
              onClick={handleApproveAll}
              disabled={loadingIds.size > 0}
              className="px-4 py-2 rounded-lg text-sm bg-secondary text-primary font-medium hover:bg-secondary-hover transition-colors disabled:opacity-40 flex items-center gap-2"
            >
              ✓ Tümünü Onayla ({posts.length})
            </button>
          </div>
        )}
      </div>

      {/* Empty state */}
      {groups.length === 0 && (
        <div className="bg-background-secondary border border-border rounded-xl p-16 text-center">
          <div className="text-4xl mb-3">🎉</div>
          <p className="text-foreground text-sm font-medium mb-1">Onay kuyruğu boş</p>
          <p className="text-foreground-muted text-xs mb-5">Tüm içerikler işlendi</p>
          <a
            href="/admin/social"
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-primary rounded-lg text-sm font-medium hover:bg-secondary-hover transition-colors"
          >
            ✨ Yeni İçerik Üret
          </a>
        </div>
      )}

      {/* Post groups */}
      <div className="space-y-5">
        <AnimatePresence mode="popLayout">
          {groups.map(({ key, items }) => (
            <motion.div
              key={key}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <PostGroup
                posts={items}
                onApprove={handleApprove}
                onReject={handleReject}
                loadingIds={loadingIds}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bu Haftanın Kuyruğu */}
      {weekQueue.length > 0 && (
        <div className="bg-background-secondary border border-border rounded-xl p-5">
          <h2 className="text-foreground text-sm font-semibold mb-4">Bu Hafta Planlandı</h2>
          <div className="space-y-2">
            {weekQueue.map((post, i) => {
              const plt = WEEK_PLATFORM[post.platform] ?? { icon: '📱', label: post.platform }
              const sts = WEEK_STATUS[post.status] ?? { label: post.status, dot: 'bg-gray-400', text: 'text-foreground-muted' }
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 px-3 py-2.5 bg-background border border-border rounded-lg"
                >
                  <span className="text-base">{plt.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-xs truncate">{post.content.slice(0, 70)}…</p>
                    <p className="text-foreground-muted text-[10px] mt-0.5">{plt.label}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className={`w-1.5 h-1.5 rounded-full ${sts.dot}`} />
                    <span className={`text-[10px] ${sts.text}`}>{sts.label}</span>
                  </div>
                  {post.scheduled_at && (
                    <span className="text-[10px] text-foreground-muted flex-shrink-0">
                      {new Date(post.scheduled_at).toLocaleDateString('tr-TR', {
                        weekday: 'short', day: 'numeric', month: 'short',
                      })}
                    </span>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      )}
    </main>
  )
}
