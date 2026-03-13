'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BLOG_POSTS } from '@/lib/constants'

interface Post {
  id: string
  platform: string
  content: string
  status: string
  scheduled_at: string | null
  created_at: string
}

interface Stats {
  pending_approval: number
  approved: number
  scheduled: number
  published: number
}

interface SocialHubClientProps {
  posts: Post[]
  stats: Stats
}

const PLATFORM_CONFIG: Record<string, { icon: string; label: string; color: string }> = {
  linkedin:  { icon: '💼', label: 'LinkedIn',   color: 'text-blue-400' },
  instagram: { icon: '📸', label: 'Instagram',  color: 'text-pink-400' },
  twitter:   { icon: '🐦', label: 'Twitter / X', color: 'text-sky-400' },
}

const STATUS_CONFIG: Record<string, { label: string; dot: string; text: string }> = {
  pending_approval: { label: 'Onay Bekliyor', dot: 'bg-amber-400', text: 'text-amber-400' },
  approved:         { label: 'Onaylandı',     dot: 'bg-green-400',  text: 'text-green-400' },
  scheduled:        { label: 'Planlandı',     dot: 'bg-blue-400',   text: 'text-blue-400' },
  published:        { label: 'Yayında',       dot: 'bg-emerald-400',text: 'text-emerald-400' },
  rejected:         { label: 'Reddedildi',    dot: 'bg-red-400',    text: 'text-red-400' },
  draft:            { label: 'Taslak',        dot: 'bg-gray-400',   text: 'text-foreground-muted' },
}


export default function SocialHubClient({ posts, stats }: SocialHubClientProps) {
  const [generating, setGenerating] = useState<string | null>(null) // blog_slug veya 'manual'
  const [manualTopic, setManualTopic] = useState('')
  const [showManualInput, setShowManualInput] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  async function generateFromBlog(slug: string) {
    setGenerating(slug)
    try {
      const res = await fetch('/api/admin/social/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blog_slug: slug }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Üretim başarısız')
      showToast(`3 platform içeriği oluşturuldu → Onay kuyruğuna eklendi ✓`)
      setTimeout(() => window.location.reload(), 1500)
    } catch (err) {
      showToast(String(err), 'error')
    } finally {
      setGenerating(null)
    }
  }

  async function generateFromTopic() {
    if (!manualTopic.trim()) return
    setGenerating('manual')
    try {
      const res = await fetch('/api/admin/social/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: manualTopic }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Üretim başarısız')
      showToast(`3 platform içeriği oluşturuldu → Onay kuyruğuna eklendi ✓`)
      setManualTopic('')
      setShowManualInput(false)
      setTimeout(() => window.location.reload(), 1500)
    } catch (err) {
      showToast(String(err), 'error')
    } finally {
      setGenerating(null)
    }
  }

  const recentPosts = posts.slice(0, 8)
  const statCards = [
    { label: 'Onay Bekliyor', value: stats.pending_approval, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20', href: '/admin/social/approve' },
    { label: 'Onaylandı',     value: stats.approved,         color: 'text-green-400', bg: 'bg-green-400/10',  border: 'border-green-400/20',  href: '/admin/social/approve' },
    { label: 'Planlandı',     value: stats.scheduled,        color: 'text-blue-400',  bg: 'bg-blue-400/10',   border: 'border-blue-400/20',   href: null },
    { label: 'Yayınlandı',    value: stats.published,        color: 'text-emerald-400',bg: 'bg-emerald-400/10',border: 'border-emerald-400/20',href: null },
  ]

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

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((s, i) => {
          const inner = (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`border rounded-xl p-4 transition-colors ${s.bg} ${s.border} ${s.href ? 'cursor-pointer hover:opacity-80' : ''}`}
            >
              <div className={`text-2xl font-bold mb-1 ${s.color}`}>{s.value}</div>
              <div className={`text-xs ${s.color} opacity-80`}>{s.label}</div>
            </motion.div>
          )
          return s.href ? (
            <a key={s.label} href={s.href}>{inner}</a>
          ) : (
            <div key={s.label}>{inner}</div>
          )
        })}
      </div>

      {/* İçerik Üret */}
      <div className="bg-background-secondary border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-foreground font-semibold text-sm">İçerik Üret</h2>
            <p className="text-foreground-muted text-xs mt-0.5">LinkedIn + Instagram + Twitter için aynı anda 3 içerik</p>
          </div>
          <button
            onClick={() => setShowManualInput(v => !v)}
            className="px-3 py-1.5 rounded-lg text-xs bg-secondary text-primary font-medium hover:bg-secondary-hover transition-colors"
          >
            + Manuel Konu
          </button>
        </div>

        <AnimatePresence>
          {showManualInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualTopic}
                  onChange={e => setManualTopic(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && generateFromTopic()}
                  placeholder="Örn: KOBİ'lerde yapay zeka dönüşümü adımları"
                  className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm placeholder-foreground-muted focus:outline-none focus:border-secondary/50 transition-colors"
                />
                <button
                  onClick={generateFromTopic}
                  disabled={generating === 'manual' || !manualTopic.trim()}
                  className="px-4 py-2.5 rounded-lg text-sm bg-secondary text-primary font-medium hover:bg-secondary-hover transition-colors disabled:opacity-40 flex items-center gap-2 whitespace-nowrap"
                >
                  {generating === 'manual' ? (
                    <><span className="inline-block w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /> Üretiliyor</>
                  ) : '✨ Üret'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blog Listesi */}
        <div>
          <p className="text-foreground-muted text-[11px] uppercase tracking-wider mb-3">Blog Yazılarından İçerik Üret</p>
          <div className="space-y-1.5">
            {BLOG_POSTS.slice(0, 8).map((post) => (
              <div
                key={post.slug}
                className="flex items-center gap-3 px-3 py-2.5 bg-background border border-border rounded-lg hover:border-border-hover transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-xs font-medium truncate">{post.title}</p>
                  <p className="text-foreground-muted text-[10px] mt-0.5">{post.date} · {post.category}</p>
                </div>
                <button
                  onClick={() => generateFromBlog(post.slug)}
                  disabled={generating !== null}
                  className="flex-shrink-0 px-3 py-1 rounded-lg text-[11px] bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 transition-colors disabled:opacity-40 flex items-center gap-1.5"
                >
                  {generating === post.slug ? (
                    <><span className="inline-block w-3 h-3 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" /> Üretiliyor</>
                  ) : '✨ Üret'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Son Postlar */}
      <div className="bg-background-secondary border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-foreground font-semibold text-sm">Son Postlar</h2>
          <a
            href="/admin/social/approve"
            className="text-xs text-foreground-muted hover:text-foreground transition-colors"
          >
            Onay kuyruğu →
          </a>
        </div>

        {recentPosts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-foreground-muted text-sm">Henüz post yok.</p>
            <p className="text-foreground-muted text-xs mt-1">Yukarıdan bir blog yazısı seç veya manuel konu gir.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentPosts.map((post, i) => {
              const plt = PLATFORM_CONFIG[post.platform] ?? { icon: '📱', label: post.platform, color: 'text-foreground-secondary' }
              const sts = STATUS_CONFIG[post.status] ?? { label: post.status, dot: 'bg-gray-400', text: 'text-foreground-muted' }
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-3 px-3 py-2.5 bg-background border border-border rounded-lg"
                >
                  <span className="text-base">{plt.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-xs truncate">{post.content.slice(0, 80)}…</p>
                    <p className="text-foreground-muted text-[10px] mt-0.5">{plt.label}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className={`w-1.5 h-1.5 rounded-full ${sts.dot}`} />
                    <span className={`text-[10px] ${sts.text}`}>{sts.label}</span>
                  </div>
                  {post.scheduled_at && (
                    <span className="text-[10px] text-foreground-muted flex-shrink-0">
                      {new Date(post.scheduled_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                    </span>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
