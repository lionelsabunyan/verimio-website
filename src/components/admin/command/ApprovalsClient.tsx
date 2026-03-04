'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import StatusBadge from './StatusBadge'

interface Approval {
  id: string
  job_id: string
  pipeline_id: string | null
  approval_type: string
  title: string
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
        <h3 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
          Bekleyen Onaylar
          {pending.length > 0 && (
            <span className="bg-orange-400/20 text-orange-400 text-xs px-2 py-0.5 rounded-full">
              {pending.length}
            </span>
          )}
        </h3>

        {pending.length === 0 ? (
          <div className="bg-[#1A1030] border border-[#2E1065]/30 rounded-xl p-8 text-center">
            <p className="text-[#4C4462] text-sm">Bekleyen onay yok.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pending.map((approval) => (
              <div
                key={approval.id}
                className="bg-[#1A1030] border border-orange-400/20 rounded-xl overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedId(expandedId === approval.id ? null : approval.id)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#2E1065]/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-400" />
                    </span>
                    <div className="text-left">
                      <p className="text-white text-sm font-medium">{approval.title}</p>
                      <p className="text-[#4C4462] text-xs">
                        {approval.command_jobs?.skill} — {approval.command_jobs?.project} — {timeAgo(approval.created_at)}
                      </p>
                    </div>
                  </div>
                  <svg
                    className={`w-4 h-4 text-[#4C4462] transition-transform ${expandedId === approval.id ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded content */}
                {expandedId === approval.id && (
                  <div className="px-5 pb-5 space-y-4 border-t border-[#2E1065]/20">
                    {/* Data preview */}
                    {approval.data && Object.keys(approval.data).length > 0 && (
                      <div className="mt-4">
                        <p className="text-[#4C4462] text-xs mb-2">İçerik Önizleme</p>
                        <pre className="text-[#E8E4D9] text-xs bg-[#0A0616] rounded-lg p-3 max-h-60 overflow-y-auto">
                          {JSON.stringify(approval.data, null, 2)}
                        </pre>
                      </div>
                    )}

                    {/* Notes input */}
                    <div>
                      <label className="text-[#4C4462] text-xs mb-1 block">Not (opsiyonel)</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Onay/red notu..."
                        rows={2}
                        className="w-full bg-[#0A0616] border border-[#2E1065] text-white rounded-lg px-3 py-2 text-sm placeholder:text-[#4C4462] focus:outline-none focus:border-[#8B5CF6] resize-none"
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDecision(approval.id, 'approved')}
                        disabled={processing === approval.id}
                        className="flex-1 px-4 py-2.5 bg-[#A3E635] text-[#2E1065] rounded-lg text-sm font-semibold hover:bg-[#BEF264] transition-colors disabled:opacity-50"
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
        <h3 className="text-white text-sm font-medium mb-3">Geçmiş</h3>
        <div className="bg-[#1A1030] border border-[#2E1065]/30 rounded-xl overflow-hidden">
          {recent.length === 0 ? (
            <div className="p-8 text-center text-[#4C4462] text-sm">
              Henüz onay geçmişi yok.
            </div>
          ) : (
            <div className="divide-y divide-[#2E1065]/20">
              {recent.map((approval) => (
                <div
                  key={approval.id}
                  className="flex items-center justify-between px-5 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-white text-sm">{approval.title}</p>
                      <p className="text-[#4C4462] text-xs">
                        {approval.command_jobs?.skill} — {approval.decided_via || '—'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={approval.status} />
                    <span className="text-[#4C4462] text-xs">{timeAgo(approval.created_at)}</span>
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
