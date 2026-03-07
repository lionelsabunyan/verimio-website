'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import StatusBadge from './StatusBadge'
import LogViewer from './LogViewer'

interface Step {
  skill: string
  label: string
  approval_before?: boolean
  approval_title?: string
}

interface PipelineRun {
  id: string
  pipeline_id: string
  project: string
  name: string
  status: string
  current_step: number
  total_steps: number
  steps_snapshot: Step[]
  context: Record<string, string>
  input: string | null
  error: string | null
  started_at: string
  completed_at: string | null
}

interface Job {
  id: string
  skill: string
  status: string
  step_index: number
  started_at: string | null
  completed_at: string | null
  error: string | null
  output: string | null
}

interface Approval {
  id: string
  status: string
  title: string
  description: string | null
  data: Record<string, unknown> | null
  decided_at: string | null
  notes: string | null
  created_at: string
}

interface Props {
  initialRun: PipelineRun
  initialJobs: Job[]
  initialApprovals: Approval[]
}

export default function PipelineRunDetailClient({ initialRun, initialJobs, initialApprovals }: Props) {
  const router = useRouter()
  const [run, setRun] = useState(initialRun)
  const [jobs, setJobs] = useState(initialJobs)
  const [approvals, setApprovals] = useState(initialApprovals)
  const [cancelling, setCancelling] = useState(false)

  const steps = run.steps_snapshot
  const activeJobId = jobs.find((j) => j.status === 'running')?.id

  // Realtime subscriptions
  useEffect(() => {
    const supabase = createClient()

    // Pipeline run status updates
    const runChannel = supabase
      .channel(`pipeline-run-${run.id}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'pipeline_runs',
        filter: `id=eq.${run.id}`,
      }, (payload) => {
        setRun((prev) => ({ ...prev, ...payload.new as Partial<PipelineRun> }))
      })
      .subscribe()

    // Job updates
    const jobChannel = supabase
      .channel(`pipeline-jobs-${run.id}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'command_jobs',
        filter: `pipeline_run_id=eq.${run.id}`,
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setJobs((prev) => [...prev, payload.new as Job])
        } else if (payload.eventType === 'UPDATE') {
          setJobs((prev) => prev.map((j) =>
            j.id === (payload.new as Job).id ? { ...j, ...payload.new as Partial<Job> } : j
          ))
        }
      })
      .subscribe()

    // Approval updates
    const approvalChannel = supabase
      .channel(`pipeline-approvals-${run.id}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'approvals',
        filter: `pipeline_run_id=eq.${run.id}`,
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setApprovals((prev) => [...prev, payload.new as Approval])
        } else if (payload.eventType === 'UPDATE') {
          setApprovals((prev) => prev.map((a) =>
            a.id === (payload.new as Approval).id ? { ...a, ...payload.new as Partial<Approval> } : a
          ))
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(runChannel)
      supabase.removeChannel(jobChannel)
      supabase.removeChannel(approvalChannel)
    }
  }, [run.id])

  async function handleCancel() {
    setCancelling(true)
    try {
      await fetch(`/api/admin/command/pipelines/runs/${run.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel' }),
      })
    } catch {
      // ignore
    }
    setCancelling(false)
  }

  function getStepStatus(stepIndex: number) {
    const job = jobs.find((j) => j.step_index === stepIndex)
    if (!job) {
      if (stepIndex < run.current_step) return 'completed'
      if (stepIndex === run.current_step && run.status === 'paused') return 'paused'
      return 'pending'
    }
    return job.status
  }

  function getStepApproval(stepIndex: number) {
    return approvals.find((a) =>
      a.data && (a.data as Record<string, unknown>).step_index === stepIndex
    )
  }

  function formatDuration(start: string | null, end: string | null) {
    if (!start) return '-'
    const s = new Date(start).getTime()
    const e = end ? new Date(end).getTime() : Date.now()
    const secs = Math.floor((e - s) / 1000)
    if (secs < 60) return `${secs}sn`
    const mins = Math.floor(secs / 60)
    if (mins < 60) return `${mins}dk ${secs % 60}sn`
    return `${Math.floor(mins / 60)}sa ${mins % 60}dk`
  }

  const progressPercent = run.status === 'completed'
    ? 100
    : Math.max(3, (run.current_step / run.total_steps) * 100)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/command/pipelines')}
            className="text-foreground-muted hover:text-foreground transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-foreground text-xl font-bold">{run.name}</h1>
              <StatusBadge status={run.status} />
            </div>
            <p className="text-foreground-muted text-sm mt-0.5">
              {run.project} | {formatDuration(run.started_at, run.completed_at)}
            </p>
          </div>
        </div>

        {(run.status === 'running' || run.status === 'paused') && (
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg text-sm hover:bg-red-500/20 transition-colors disabled:opacity-50"
          >
            {cancelling ? 'Iptal ediliyor...' : 'Pipeline Iptal Et'}
          </button>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-foreground-secondary text-xs">Ilerleme</span>
            <span className="text-foreground-secondary text-xs">
              {run.status === 'completed' ? run.total_steps : run.current_step} / {run.total_steps} adim
            </span>
          </div>
          <div className="w-full bg-primary/30 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                run.status === 'completed' ? 'bg-secondary' :
                run.status === 'failed' ? 'bg-red-500' :
                run.status === 'cancelled' ? 'bg-foreground-muted' :
                'bg-primary-light'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Hata Mesaji */}
        {run.error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
            <p className="text-red-400 text-sm">{run.error}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          {/* Sol: Adim Timeline'i */}
          <div className="col-span-1">
            <h3 className="text-foreground text-sm font-medium mb-4">Adimlar</h3>
            <div className="relative pl-6 space-y-0">
              {/* Dikey cizgi */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-primary" />

              {steps.map((step, i) => {
                const status = getStepStatus(i)
                const job = jobs.find((j) => j.step_index === i)
                const approval = getStepApproval(i)
                const isActive = status === 'running'

                return (
                  <div key={i} className="relative pb-6 last:pb-0">
                    {/* Durum Noktasi */}
                    <div className={`absolute left-[-17px] top-1 w-3.5 h-3.5 rounded-full border-2 ${
                      status === 'completed' ? 'bg-secondary border-secondary' :
                      status === 'running' ? 'bg-primary-light border-primary-light animate-pulse' :
                      status === 'failed' ? 'bg-red-500 border-red-500' :
                      status === 'paused' ? 'bg-orange-400 border-orange-400' :
                      'bg-background-secondary border-foreground-muted'
                    }`} />

                    <div className="ml-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${
                          status === 'completed' ? 'text-secondary' :
                          isActive ? 'text-foreground' :
                          status === 'failed' ? 'text-red-400' :
                          'text-foreground-secondary'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                      <span className="text-foreground-muted text-xs">{step.skill}</span>

                      {/* Tamamlandi bilgisi */}
                      {status === 'completed' && job && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-foreground-muted text-xs">
                            {formatDuration(job.started_at, job.completed_at)}
                          </span>
                          <Link
                            href={`/admin/command/jobs/${job.id}`}
                            className="text-primary-light text-xs hover:text-secondary transition-colors"
                          >
                            detay
                          </Link>
                        </div>
                      )}

                      {/* Hata bilgisi */}
                      {status === 'failed' && job?.error && (
                        <p className="text-red-400/70 text-xs mt-1">{job.error}</p>
                      )}

                      {/* Onay bekliyor */}
                      {status === 'paused' && (
                        <div className="mt-2">
                          <span className="bg-orange-400/20 text-orange-400 px-2 py-1 rounded text-xs">
                            Onay Bekliyor
                          </span>
                          {approval && approval.status === 'pending' && (
                            <Link
                              href="/admin/command/approvals"
                              className="text-primary-light text-xs ml-2 hover:text-secondary transition-colors"
                            >
                              onayla
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sag: Aktif Job LogViewer */}
          <div className="col-span-2">
            <h3 className="text-foreground text-sm font-medium mb-4">
              {activeJobId ? 'Canli Log' : 'Log'}
            </h3>
            {activeJobId ? (
              <LogViewer jobId={activeJobId} />
            ) : (
              <div className="bg-surface-elevated border border-primary/30 rounded-xl p-6">
                {run.status === 'completed' && (
                  <div className="text-center space-y-2">
                    <div className="text-3xl">&#x2705;</div>
                    <p className="text-secondary text-sm font-medium">Pipeline basariyla tamamlandi</p>
                    <p className="text-foreground-muted text-xs">{formatDuration(run.started_at, run.completed_at)}</p>
                  </div>
                )}
                {run.status === 'paused' && (
                  <div className="text-center space-y-2">
                    <div className="text-3xl">&#x23F8;&#xFE0F;</div>
                    <p className="text-orange-400 text-sm font-medium">Pipeline onay bekliyor</p>
                    <Link
                      href="/admin/command/approvals"
                      className="text-primary-light text-sm hover:text-secondary transition-colors inline-block mt-1"
                    >
                      Onaylar sayfasina git &rarr;
                    </Link>
                  </div>
                )}
                {run.status === 'failed' && (
                  <div className="text-center space-y-2">
                    <div className="text-3xl">&#x274C;</div>
                    <p className="text-red-400 text-sm font-medium">Pipeline basarisiz</p>
                    {run.error && <p className="text-foreground-muted text-xs">{run.error}</p>}
                  </div>
                )}
                {run.status === 'cancelled' && (
                  <div className="text-center space-y-2">
                    <div className="text-3xl">&#x26A0;&#xFE0F;</div>
                    <p className="text-foreground-secondary text-sm font-medium">Pipeline iptal edildi</p>
                  </div>
                )}
                {run.status === 'running' && !activeJobId && (
                  <div className="text-center space-y-2">
                    <div className="text-3xl animate-pulse">&#x23F3;</div>
                    <p className="text-foreground-secondary text-sm">Sonraki adim hazirlaniyor...</p>
                  </div>
                )}
                {/* Son tamamlanan job'un log'unu goster */}
                {!activeJobId && jobs.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-primary/20">
                    <p className="text-foreground-muted text-xs mb-2">Son calistirilan adim:</p>
                    {(() => {
                      const lastCompletedJob = [...jobs]
                        .filter((j) => j.status === 'completed' || j.status === 'failed')
                        .pop()
                      if (lastCompletedJob) {
                        return <LogViewer jobId={lastCompletedJob.id} />
                      }
                      return null
                    })()}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Girdi */}
        {run.input && (
          <div className="bg-surface-elevated border border-primary/30 rounded-xl p-5">
            <h3 className="text-foreground-secondary text-xs mb-2 uppercase tracking-wider">Girdi</h3>
            <pre className="text-foreground text-sm whitespace-pre-wrap font-mono">{run.input}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
