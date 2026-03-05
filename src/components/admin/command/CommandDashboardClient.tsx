'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import StatusBadge from './StatusBadge'
import QuickRunModal from './QuickRunModal'

interface Job {
  id: string
  project: string
  skill: string
  status: string
  created_at: string
}

interface KPIs {
  activeJobs: number
  pendingApprovals: number
  totalAgents: number
  todayRuns: number
  activePipelines: number
}

interface Props {
  kpis: KPIs
  recentJobs: Job[]
}

export default function CommandDashboardClient({ kpis, recentJobs }: Props) {
  const [showRunModal, setShowRunModal] = useState(false)
  const [agents, setAgents] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/admin/command/agents')
      .then((r) => r.json())
      .then((d) => setAgents(d.agents || []))
  }, [])

  const kpiCards = [
    { label: 'Aktif İşler', value: kpis.activeJobs, color: 'text-blue-400', pulse: kpis.activeJobs > 0 },
    { label: 'Aktif Pipeline', value: kpis.activePipelines, color: 'text-[#8B5CF6]', pulse: kpis.activePipelines > 0 },
    { label: 'Bekleyen Onaylar', value: kpis.pendingApprovals, color: 'text-orange-400', pulse: kpis.pendingApprovals > 0 },
    { label: 'Bugünkü Çalışmalar', value: kpis.todayRuns, color: 'text-[#A3E635]' },
  ]

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'az önce'
    if (mins < 60) return `${mins}dk`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}sa`
    return `${Math.floor(hrs / 24)}g`
  }

  return (
    <div className="p-6 space-y-6">
      {/* KPI Kartları */}
      <div className="grid grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className="bg-[#1A1030] border border-[#2E1065]/30 rounded-xl p-5">
            <p className="text-[#4C4462] text-xs mb-1">{kpi.label}</p>
            <div className="flex items-center gap-2">
              <span className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</span>
              {kpi.pulse && (
                <span className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${kpi.color.replace('text-', 'bg-')}`} />
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${kpi.color.replace('text-', 'bg-')}`} />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Son İşler */}
        <div className="col-span-2 bg-[#1A1030] border border-[#2E1065]/30 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#2E1065]/30">
            <h3 className="text-white text-sm font-medium">Son İşler</h3>
            <Link href="/admin/command/jobs" className="text-[#8B5CF6] text-xs hover:text-[#A3E635] transition-colors">
              Tümünü Gör
            </Link>
          </div>
          <div className="divide-y divide-[#2E1065]/20">
            {recentJobs.length === 0 ? (
              <div className="p-8 text-center text-[#4C4462] text-sm">
                Henüz iş çalıştırılmadı. "Skill Çalıştır" ile başlayın.
              </div>
            ) : (
              recentJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/admin/command/jobs/${job.id}`}
                  className="flex items-center justify-between px-5 py-3 hover:bg-[#2E1065]/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${job.project === 'verimio' ? 'bg-[#A3E635]' : 'bg-blue-400'}`} />
                    <div>
                      <span className="text-white text-sm">{job.skill}</span>
                      <span className="text-[#4C4462] text-xs ml-2">{job.project}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={job.status} />
                    <span className="text-[#4C4462] text-xs">{timeAgo(job.created_at)}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Hızlı Eylemler */}
        <div className="space-y-4">
          <div className="bg-[#1A1030] border border-[#2E1065]/30 rounded-xl p-5">
            <h3 className="text-white text-sm font-medium mb-4">Hızlı Eylemler</h3>
            <div className="space-y-2">
              <button
                onClick={() => setShowRunModal(true)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-[#A3E635]/10 text-[#A3E635] rounded-lg hover:bg-[#A3E635]/20 transition-colors text-sm font-medium"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Skill Çalıştır
              </button>
              <Link
                href="/admin/command/pipelines"
                className="w-full flex items-center gap-3 px-4 py-3 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-lg hover:bg-[#8B5CF6]/20 transition-colors text-sm font-medium"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Pipeline Başlat
                {kpis.activePipelines > 0 && (
                  <span className="ml-auto bg-[#8B5CF6]/20 text-[#8B5CF6] text-xs px-2 py-0.5 rounded-full">
                    {kpis.activePipelines}
                  </span>
                )}
              </Link>
              <Link
                href="/admin/command/approvals"
                className="w-full flex items-center gap-3 px-4 py-3 bg-[#1A1030] text-[#78716C] rounded-lg hover:text-white hover:bg-[#2E1065]/50 transition-colors text-sm border border-[#2E1065]/30"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Onayları Gör
                {kpis.pendingApprovals > 0 && (
                  <span className="ml-auto bg-orange-400/20 text-orange-400 text-xs px-2 py-0.5 rounded-full">
                    {kpis.pendingApprovals}
                  </span>
                )}
              </Link>
              <Link
                href="/admin/command/agents"
                className="w-full flex items-center gap-3 px-4 py-3 bg-[#1A1030] text-[#78716C] rounded-lg hover:text-white hover:bg-[#2E1065]/50 transition-colors text-sm border border-[#2E1065]/30"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Agent Kadrosu
              </Link>
            </div>
          </div>

          {/* Proje Özeti */}
          <div className="bg-[#1A1030] border border-[#2E1065]/30 rounded-xl p-5">
            <h3 className="text-white text-sm font-medium mb-3">Projeler</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A3E635]" />
                  <span className="text-white text-sm">Verimio</span>
                </div>
                <span className="text-[#4C4462] text-xs">9 agent</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <span className="text-white text-sm">BeginnerFXGuide</span>
                </div>
                <span className="text-[#4C4462] text-xs">12 agent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showRunModal && (
        <QuickRunModal agents={agents} onClose={() => setShowRunModal(false)} />
      )}
    </div>
  )
}
