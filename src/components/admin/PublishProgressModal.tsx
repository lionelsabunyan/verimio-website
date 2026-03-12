'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import LogViewer from './command/LogViewer'

interface Props {
  isOpen: boolean
  onClose: () => void
  jobId: string | null
  suggestionTitle: string
  onComplete?: (success: boolean) => void
}

type JobStatus = 'queued' | 'running' | 'completed' | 'failed'

const STATUS_CONFIG: Record<JobStatus, { label: string; icon: string; color: string }> = {
  queued:    { label: 'Sırada',     icon: '⏳', color: 'text-yellow-400' },
  running:   { label: 'Çalışıyor',  icon: '⚡', color: 'text-blue-400' },
  completed: { label: 'Tamamlandı', icon: '✅', color: 'text-green-400' },
  failed:    { label: 'Hata',       icon: '❌', color: 'text-red-400' },
}

export default function PublishProgressModal({ isOpen, onClose, jobId, suggestionTitle, onComplete }: Props) {
  const [status, setStatus] = useState<JobStatus>('queued')
  const [slug, setSlug] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (!jobId || !isOpen) return

    // İlk durum kontrolü
    supabase
      .from('command_jobs')
      .select('status, output')
      .eq('id', jobId)
      .single()
      .then(({ data }) => {
        if (data) {
          setStatus(data.status as JobStatus)
          if (data.output?.slug) setSlug(data.output.slug)
        }
      })

    // Realtime subscription — status değişimlerini dinle
    const channel = supabase
      .channel(`job-status-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'command_jobs',
          filter: `id=eq.${jobId}`,
        },
        (payload) => {
          const newStatus = payload.new.status as JobStatus
          setStatus(newStatus)
          if (payload.new.output?.slug) setSlug(payload.new.output.slug)
          if (newStatus === 'completed' || newStatus === 'failed') {
            onComplete?.(newStatus === 'completed')
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [jobId, isOpen])

  if (!isOpen || !jobId) return null

  const conf = STATUS_CONFIG[status] || STATUS_CONFIG.queued
  const isDone = status === 'completed' || status === 'failed'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={(e) => { if (isDone && e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-3xl bg-background-secondary border border-border rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{conf.icon}</span>
              <div>
                <h3 className="text-foreground text-sm font-medium">Blog Yayınlama</h3>
                <p className="text-foreground-muted text-xs mt-0.5 max-w-md truncate">{suggestionTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-3 py-1 rounded-full border ${conf.color} bg-surface-elevated border-border`}>
                {conf.label}
              </span>
              {isDone && (
                <button
                  onClick={onClose}
                  className="text-foreground-muted hover:text-foreground text-sm transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* LogViewer */}
          <div className="p-4">
            <LogViewer jobId={jobId} />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border">
            {status === 'completed' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <span>✅</span>
                  <span>Blog başarıyla yayınlandı!</span>
                  {slug && (
                    <a
                      href={`https://www.verimio.com.tr/blog/${slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline ml-2"
                    >
                      Yazıyı Gör →
                    </a>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-secondary text-primary text-sm font-medium rounded-lg hover:bg-secondary-hover transition-colors"
                >
                  Kapat
                </button>
              </div>
            )}

            {status === 'failed' && (
              <div className="flex items-center justify-between">
                <span className="text-red-400 text-sm">❌ Yayınlama sırasında hata oluştu</span>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-surface-elevated text-foreground text-sm rounded-lg border border-border hover:bg-primary transition-colors"
                >
                  Kapat
                </button>
              </div>
            )}

            {!isDone && (
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full"
                />
                <span className="text-foreground-secondary text-sm">
                  {status === 'queued' ? 'Daemon işe almasını bekliyor...' : 'İçerik üretiliyor, görsel oluşturuluyor...'}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
