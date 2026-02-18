'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PLATFORMS = ['linkedin', 'instagram', 'twitter', 'youtube'] as const
type Platform = typeof PLATFORMS[number]

const PLATFORM_CONFIG: Record<Platform, { label: string; color: string; icon: string }> = {
  linkedin: { label: 'LinkedIn', color: '#0A66C2', icon: '💼' },
  instagram: { label: 'Instagram', color: '#E1306C', icon: '📷' },
  twitter: { label: 'Twitter / X', color: '#1DA1F2', icon: '🐦' },
  youtube: { label: 'YouTube', color: '#FF0000', icon: '🎬' },
}

const STATUS_COLORS = {
  draft: 'bg-[#1A1030] text-[#78716C] border-[#2E1065]',
  scheduled: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  published: 'bg-green-500/10 text-green-400 border-green-500/30',
  failed: 'bg-red-500/10 text-red-400 border-red-500/30',
}

interface Post {
  id: string
  platform: Platform
  content: string
  visual_url?: string
  scheduled_at?: string
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  created_at: string
}

export default function SocialCalendarClient({ posts }: { posts: Post[] }) {
  const [activePlatform, setActivePlatform] = useState<Platform | 'all'>('all')
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPost, setNewPost] = useState({ platform: 'linkedin' as Platform, content: '', scheduled_at: '' })
  const [saving, setSaving] = useState(false)

  const filtered = activePlatform === 'all'
    ? posts
    : posts.filter(p => p.platform === activePlatform)

  async function savePost() {
    setSaving(true)
    await fetch('/api/admin/social', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newPost, status: 'draft' }),
    })
    setSaving(false)
    setShowNewPost(false)
    window.location.reload()
  }

  return (
    <main className="flex-1 p-6">
      {/* Platform Filtre */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setActivePlatform('all')}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${activePlatform === 'all' ? 'bg-[#A3E635] text-[#2E1065] font-medium' : 'bg-[#1A1030] text-[#78716C] hover:text-white'}`}
        >
          Tümü
        </button>
        {PLATFORMS.map((p) => (
          <button
            key={p}
            onClick={() => setActivePlatform(p)}
            className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${activePlatform === p ? 'bg-[#A3E635] text-[#2E1065] font-medium' : 'bg-[#1A1030] text-[#78716C] hover:text-white'}`}
          >
            <span>{PLATFORM_CONFIG[p].icon}</span>
            {PLATFORM_CONFIG[p].label}
          </button>
        ))}

        <div className="ml-auto flex gap-2">
          <a href="/admin/social/visuals" className="px-4 py-2 rounded-lg text-sm bg-[#2E1065] text-[#A3E635] hover:bg-[#3D1580] transition-colors flex items-center gap-2">
            🎨 Görsel Üret
          </a>
          <button
            onClick={() => setShowNewPost(true)}
            className="px-4 py-2 rounded-lg text-sm bg-[#A3E635] text-[#2E1065] font-medium hover:bg-[#b4f045] transition-colors"
          >
            + Yeni Post
          </button>
        </div>
      </div>

      {/* Yeni Post Modal */}
      <AnimatePresence>
        {showNewPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewPost(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#0F0A1E] border border-[#2E1065] rounded-2xl p-6 w-full max-w-lg"
            >
              <h3 className="text-white font-semibold mb-4">Yeni Post Taslağı</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#4C4462] text-sm mb-2">Platform</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PLATFORMS.map((p) => (
                      <button
                        key={p}
                        onClick={() => setNewPost(prev => ({ ...prev, platform: p }))}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${newPost.platform === p ? 'bg-[#2E1065] text-[#A3E635] border border-[#A3E635]/30' : 'bg-[#1A1030] text-[#78716C] hover:text-white'}`}
                      >
                        {PLATFORM_CONFIG[p].icon} {PLATFORM_CONFIG[p].label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[#4C4462] text-sm mb-2">İçerik</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Post metni..."
                    rows={5}
                    className="w-full bg-[#1A1030] border border-[#2E1065] rounded-lg px-4 py-3 text-white text-sm placeholder-[#4C4462] focus:outline-none focus:border-[#8B5CF6] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[#4C4462] text-sm mb-2">Zamanlama (isteğe bağlı)</label>
                  <input
                    type="datetime-local"
                    value={newPost.scheduled_at}
                    onChange={(e) => setNewPost(prev => ({ ...prev, scheduled_at: e.target.value }))}
                    className="w-full bg-[#1A1030] border border-[#2E1065] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowNewPost(false)} className="flex-1 px-4 py-2 bg-[#1A1030] text-[#78716C] rounded-lg text-sm hover:text-white transition-colors">
                    İptal
                  </button>
                  <button onClick={savePost} disabled={saving || !newPost.content} className="flex-1 px-4 py-2 bg-[#A3E635] text-[#2E1065] rounded-lg text-sm font-medium hover:bg-[#b4f045] transition-colors disabled:opacity-50">
                    {saving ? 'Kaydediliyor...' : 'Taslak Kaydet'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post Listesi */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-12 text-center">
            <div className="text-4xl mb-3">📅</div>
            <p className="text-[#4C4462] text-sm">Henüz post yok. İlk postunu oluştur!</p>
            <button onClick={() => setShowNewPost(true)} className="mt-4 px-4 py-2 bg-[#A3E635] text-[#2E1065] rounded-lg text-sm font-medium">
              + Yeni Post
            </button>
          </div>
        ) : (
          filtered.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-5 flex items-start gap-4"
            >
              <div className="text-2xl flex-shrink-0">{PLATFORM_CONFIG[post.platform]?.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#78716C] text-xs">{PLATFORM_CONFIG[post.platform]?.label}</span>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs border ${STATUS_COLORS[post.status]}`}>
                    {post.status === 'draft' ? 'Taslak' : post.status === 'scheduled' ? 'Planlandı' : post.status === 'published' ? 'Yayında' : 'Hata'}
                  </span>
                  {post.scheduled_at && (
                    <span className="text-[#4C4462] text-xs">
                      {new Date(post.scheduled_at).toLocaleString('tr-TR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
                <p className="text-white text-sm leading-relaxed line-clamp-3">{post.content}</p>
              </div>
              {post.visual_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.visual_url} alt="" className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
              )}
            </motion.div>
          ))
        )}
      </div>
    </main>
  )
}
