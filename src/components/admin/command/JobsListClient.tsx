'use client'

import { useState } from 'react'
import Link from 'next/link'
import StatusBadge from './StatusBadge'
import ProjectSwitcher from './ProjectSwitcher'

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
}

const STATUS_TABS = [
  { id: 'all', label: 'Tümü' },
  { id: 'queued', label: 'Kuyrukta' },
  { id: 'running', label: 'Çalışıyor' },
  { id: 'completed', label: 'Tamamlanan' },
  { id: 'failed', label: 'Hatalar' },
]

export default function JobsListClient({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs] = useState(initialJobs)
  const [project, setProject] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = jobs.filter((job) => {
    if (project !== 'all' && job.project !== project) return false
    if (statusFilter !== 'all' && job.status !== statusFilter) return false
    return true
  })

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'az önce'
    if (mins < 60) return `${mins}dk önce`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}sa önce`
    return `${Math.floor(hrs / 24)}g önce`
  }

  function duration(start: string | null, end: string | null) {
    if (!start) return '—'
    const s = new Date(start).getTime()
    const e = end ? new Date(end).getTime() : Date.now()
    const secs = Math.floor((e - s) / 1000)
    if (secs < 60) return `${secs}sn`
    const mins = Math.floor(secs / 60)
    if (mins < 60) return `${mins}dk ${secs % 60}sn`
    return `${Math.floor(mins / 60)}sa ${mins % 60}dk`
  }

  return (
    <div className="p-6 space-y-4">
      {/* Filtreler */}
      <div className="flex items-center justify-between">
        <ProjectSwitcher value={project} onChange={setProject} />
        <div className="flex items-center gap-1 bg-surface-elevated rounded-lg p-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                statusFilter === tab.id
                  ? 'bg-primary text-foreground'
                  : 'text-foreground-secondary hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tablo */}
      <div className="bg-surface-elevated border border-primary/30 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary/30">
              <th className="text-left px-5 py-3 text-foreground-secondary text-xs font-medium">Skill</th>
              <th className="text-left px-5 py-3 text-foreground-secondary text-xs font-medium">Proje</th>
              <th className="text-left px-5 py-3 text-foreground-secondary text-xs font-medium">Durum</th>
              <th className="text-left px-5 py-3 text-foreground-secondary text-xs font-medium">Süre</th>
              <th className="text-left px-5 py-3 text-foreground-secondary text-xs font-medium">Oluşturulma</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/20">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-foreground-secondary text-sm">
                  Bu filtrelere uygun iş bulunamadı.
                </td>
              </tr>
            ) : (
              filtered.map((job) => (
                <tr key={job.id} className="hover:bg-primary/10 transition-colors">
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/command/jobs/${job.id}`}
                      className="text-foreground text-sm hover:text-secondary transition-colors"
                    >
                      {job.skill}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${job.project === 'verimio' ? 'bg-secondary' : 'bg-blue-400'}`} />
                      <span className="text-foreground-secondary text-sm">{job.project}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-5 py-3 text-foreground-secondary text-sm">
                    {duration(job.started_at, job.completed_at)}
                  </td>
                  <td className="px-5 py-3 text-foreground-secondary text-xs">
                    {timeAgo(job.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
