'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import StatusBadge from './StatusBadge'

interface Approval {
  id: string
  job_id: string
  pipeline_run_id: string | null
  approval_type: string
  title: string
  description: string | null
  data: Record<string, unknown>
  status: string
  decided_at: string | null
  decided_via: string | null
  notes: string | null
  created_at: string
  command_jobs: {
    skill: string
    project: string
  } | null
}

export default function ApprovalsClient({
  pendingApprovals: initialPending,
  recentApprovals: initialRecent,
}: {
  pendingApprovals: Approval[]
  recentApprovals: Approval[]
}) {
  const router = useRouter()
  const [pending, setPending] = useState(initialPending)
  const [recent] = useState(initialRecent)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [processing, setProcessing] = useState<string | null>(null)
  const [notes, setNotes] = useState('')
  const supabase = createClient()

  // Realtime — yeni onay gelirse listeye ekle
  useEffect(() => {
    const channel = supabase
      .channel('approvals-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'approvals',
        },
        () => {
          router.refresh()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function handleDecision(id: string, status: 'approved' | 'rejected') {
    setProcessing(id)
    await fetch('/api/admin/command/approvals', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, notes: notes || undefined }),
    })
    setPending((prev) => prev.filter((a) => a.id !== id))
    setExpandedId(null)
    setNotes('')
    setProcessing(null)
    router.refresh()
  }

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'az önce'
    if (mins < 60) return `${mins}dk önce`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}sa önce`
    return `${Math.floor(hrs / 24)}g önce`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Bekleyen Onaylar */}
      <div>
        <h3 className="text-foreground text-sm font-medium mb-3 flex items-center gap-2">
          Bekleyen Onaylar
          {pending.length > 0 && (
            <span className="bg-orange-400/20 text-orange-400 text-xs px-2 py-0.5 rounded-full">
              {pending.length}
            </span>
          )}
        </h3>

        {pending.length === 0 ? (
          <div className="bg-surface-elevated border border-primary/30 rounded-xl p-8 text-center">
            <p className="text-foreground-muted text-sm">Bekleyen onay yok.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pending.map((approval) => (
              <div
                key={approval.id}
                className="bg-surface-elevated border border-orange-400/20 rounded-xl overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedId(expandedId === approval.id ? null : approval.id)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-primary/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-400" />
                    </span>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <p className="text-foreground text-sm font-medium">{approval.title}</p>
                        {approval.pipeline_run_id && (
                          <Link
                            href={`/admin/command/pipelines/runs/${approval.pipeline_run_id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 bg-primary-light/15 text-primary-light px-2 py-0.5 rounded text-xs hover:bg-primary-light/25 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            Pipeline
                          </Link>
                        )}
                      </div>
                      {approval.description && (
                        <p className="text-foreground-secondary text-xs mt-0.5">{approval.description}</p>
                      )}
                      <p className="text-foreground-muted text-xs">
                        {approval.command_jobs?.skill} — {approval.command_jobs?.project} — {timeAgo(approval.created_at)}
                      </p>
                    </div>
                  </div>
                  <svg
                    className={`w-4 h-4 text-foreground-muted transition-transform ${expandedId === approval.id ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded content */}
                {expandedId === approval.id && (
                  <div className="px-5 pb-5 space-y-4 border-t border-primary/20">
                    {/* Data preview */}
                    {approval.data && Object.keys(approval.data).length > 0 && (
                      <div className="mt-4">
                        <p className="text-foreground-muted text-xs mb-2">İçerik Önizleme</p>
                        <pre className="text-foreground text-xs bg-background rounded-lg p-3 max-h-60 overflow-y-auto">
                          {JSON.stringify(approval.data, null, 2)}
                        </pre>
                      </div>
                    )}

                    {/* Notes input */}
                    <div>
                      <label className="text-foreground-muted text-xs mb-1 block">Not (opsiyonel)</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Onay/red notu..."
                        rows={2}
                        className="w-full bg-background border border-primary text-foreground rounded-lg px-3 py-2 text-sm placeholder:text-foreground-muted focus:outline-none focus:border-primary-light resize-none"
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDecision(approval.id, 'approved')}
                        disabled={processing === approval.id}
                        className="flex-1 px-4 py-2.5 bg-secondary text-primary rounded-lg text-sm font-semibold hover:bg-secondary-hover transition-colors disabled:opacity-50"
                      >
                        {processing === approval.id ? 'İşleniyor...' : 'Onayla'}
                      </button>
                      <button
                        onClick={() => handleDecision(approval.id, 'rejected')}
                        disabled={processing === approval.id}
                        className="flex-1 px-4 py-2.5 bg-red-400/10 text-red-400 rounded-lg text-sm font-medium hover:bg-red-400/20 transition-colors disabled:opacity-50"
                      >
                        Reddet
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Geçmiş Onaylar */}
      <div>
        <h3 className="text-foreground text-sm font-medium mb-3">Geçmiş</h3>
        <div className="bg-surface-elevated border border-primary/30 rounded-xl overflow-hidden">
          {recent.length === 0 ? (
            <div className="p-8 text-center text-foreground-muted text-sm">
              Henüz onay geçmişi yok.
            </div>
          ) : (
            <div className="divide-y divide-primary/20">
              {recent.map((approval) => (
                <div
                  key={approval.id}
                  className="flex items-center justify-between px-5 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-foreground text-sm">{approval.title}</p>
                        {approval.pipeline_run_id && (
                          <Link
                            href={`/admin/command/pipelines/runs/${approval.pipeline_run_id}`}
                            className="inline-flex items-center gap-1 bg-primary-light/10 text-primary-light px-1.5 py-0.5 rounded text-xs hover:bg-primary-light/20 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            Pipeline
                          </Link>
                        )}
                      </div>
                      <p className="text-foreground-muted text-xs">
                        {approval.command_jobs?.skill} — {approval.decided_via || '—'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={approval.status} />
                    <span className="text-foreground-muted text-xs">{timeAgo(approval.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
