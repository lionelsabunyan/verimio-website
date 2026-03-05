'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import StatusBadge from './StatusBadge'
import LogViewer from './LogViewer'

interface Job {
  id: string
  project: string
  skill: string
  status: string
  priority: number
  input: Record<string, unknown>
  output: string | null
  error: string | null
  created_at: string
  started_at: string | null
  completed_at: string | null
  created_by: string
  pipeline_run_id: string | null
  step_index: number | null
}

interface LogLine {
  id: string
  line_number: number
  content: string
  log_type: string
  created_at: string
}

export default function JobDetailClient({
  job: initialJob,
  initialLogs: _initialLogs,
}: {
  job: Job
  initialLogs: LogLine[]
}) {
  const router = useRouter()
  const [job, setJob] = useState(initialJob)
  const [cancelling, setCancelling] = useState(false)
  const supabase = createClient()

  // Job durumu Realtime takibi
  useEffect(() => {
    const channel = supabase
      .channel(`job-status-${job.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'command_jobs',
          filter: `id=eq.${job.id}`,
        },
        (payload) => {
          setJob((prev) => ({ ...prev, ...payload.new }))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [job.id])

  async function handleCancel() {
    setCancelling(true)
    await fetch(`/api/admin/command/jobs/${job.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'cancelled' }),
    })
    setCancelling(false)
    router.refresh()
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  function duration(start: string | null, end: string | null) {
    if (!start) return '—'
    const s = new Date(start).getTime()
    const e = end ? new Date(end).getTime() : Date.now()
    const secs = Math.floor((e - s) / 1000)
    if (secs < 60) return `${secs} saniye`
    const mins = Math.floor(secs / 60)
    if (mins < 60) return `${mins}dk ${secs % 60}sn`
    return `${Math.floor(mins / 60)}sa ${mins % 60}dk`
  }

  const isActive = ['queued', 'running', 'waiting_approval'].includes(job.status)

  return (
    <div className="p-6 space-y-6">
      {/* Üst bilgi kartı */}
      <div className="bg-[#1A1030] border border-[#2E1065]/30 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${job.project === 'verimio' ? 'bg-[#A3E635]' : 'bg-blue-400'}`} />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-white text-lg font-semibold">{job.skill}</h2>
                {job.pipeline_run_id && (
                  <Link
                    href={`/admin/command/pipelines/runs/${job.pipeline_run_id}`}
                    className="flex items-center gap-1 bg-[#8B5CF6]/20 text-[#8B5CF6] px-2 py-0.5 rounded text-xs hover:bg-[#8B5CF6]/30 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    {job.step_index !== null ? `Adım ${job.step_index + 1}` : 'Pipeline'}
                  </Link>
                )}
              </div>
              <p className="text-[#4C4462] text-sm">{job.project} — {job.id.slice(0, 8)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={job.status} />
            {isActive && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="px-3 py-1.5 text-xs text-red-400 bg-red-400/10 rounded-lg hover:bg-red-400/20 transition-colors disabled:opacity-50"
              >
                {cancelling ? 'İptal ediliyor...' : 'İptal Et'}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-[#4C4462] text-xs mb-1">Oluşturulma</p>
            <p className="text-white text-sm">{formatDate(job.created_at)}</p>
          </div>
          <div>
            <p className="text-[#4C4462] text-xs mb-1">Başlangıç</p>
            <p className="text-white text-sm">{formatDate(job.started_at)}</p>
          </div>
          <div>
            <p className="text-[#4C4462] text-xs mb-1">Bitiş</p>
            <p className="text-white text-sm">{formatDate(job.completed_at)}</p>
          </div>
          <div>
            <p className="text-[#4C4462] text-xs mb-1">Süre</p>
            <p className="text-white text-sm">{duration(job.started_at, job.completed_at)}</p>
          </div>
        </div>

        {/* Input */}
        {job.input && Object.keys(job.input).length > 0 && (
          <div className="mt-4 pt-4 border-t border-[#2E1065]/30">
            <p className="text-[#4C4462] text-xs mb-2">Input</p>
            <pre className="text-[#E8E4D9] text-sm bg-[#0A0616] rounded-lg p-3 overflow-x-auto">
              {JSON.stringify(job.input, null, 2)}
            </pre>
          </div>
        )}

        {/* Error */}
        {job.error && (
          <div className="mt-4 pt-4 border-t border-[#2E1065]/30">
            <p className="text-red-400 text-xs mb-2">Hata</p>
            <pre className="text-red-300 text-sm bg-red-400/5 border border-red-400/20 rounded-lg p-3 overflow-x-auto">
              {job.error}
            </pre>
          </div>
        )}
      </div>

      {/* Log Viewer */}
      <div>
        <h3 className="text-white text-sm font-medium mb-3">Çıktı</h3>
        <LogViewer jobId={job.id} />
      </div>
    </div>
  )
}
