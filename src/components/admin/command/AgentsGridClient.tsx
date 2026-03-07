'use client'

import { useState } from 'react'
import ProjectSwitcher from './ProjectSwitcher'
import QuickRunModal from './QuickRunModal'

interface Agent {
  id: string
  project: string
  skill_name: string
  display_name: string
  description: string
  icon: string
  category: string
  total_runs: number
  avg_duration_seconds: number | null
  last_used_at: string | null
}

const CATEGORY_LABELS: Record<string, string> = {
  seo: 'SEO',
  content: 'İçerik',
  creative: 'Yaratıcı',
  marketing: 'Pazarlama',
  pipeline: 'Pipeline',
  research: 'Araştırma',
  advertising: 'Reklam',
  technical: 'Teknik',
  general: 'Genel',
}

export default function AgentsGridClient({ agents }: { agents: Agent[] }) {
  const [project, setProject] = useState('all')
  const [runAgent, setRunAgent] = useState<Agent | null>(null)

  const filtered = project === 'all'
    ? agents
    : agents.filter((a) => a.project === project)

  // Kategoriye göre grupla
  const grouped = filtered.reduce<Record<string, Agent[]>>((acc, agent) => {
    const cat = agent.category || 'general'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(agent)
    return acc
  }, {})

  function timeAgo(dateStr: string | null) {
    if (!dateStr) return 'Hiç'
    const diff = Date.now() - new Date(dateStr).getTime()
    const days = Math.floor(diff / 86400000)
    if (days < 1) return 'Bugün'
    if (days === 1) return 'Dün'
    if (days < 7) return `${days}g önce`
    return `${Math.floor(days / 7)}h önce`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Filtreler */}
      <div className="flex items-center justify-between">
        <ProjectSwitcher value={project} onChange={setProject} />
        <span className="text-foreground-muted text-sm">
          {filtered.length} agent aktif
        </span>
      </div>

      {/* Kategoriye göre gruplar */}
      {Object.entries(grouped).map(([category, categoryAgents]) => (
        <div key={category}>
          <h3 className="text-foreground-muted text-xs font-medium uppercase tracking-wider mb-3">
            {CATEGORY_LABELS[category] || category}
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {categoryAgents.map((agent) => (
              <div
                key={agent.id}
                className="bg-surface-elevated border border-primary/30 rounded-xl p-4 hover:border-primary-light/40 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{agent.icon}</span>
                    <div>
                      <h4 className="text-foreground text-sm font-medium">{agent.display_name}</h4>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${agent.project === 'verimio' ? 'bg-secondary' : 'bg-blue-400'}`} />
                        <span className="text-foreground-muted text-xs">{agent.project}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-foreground-secondary text-xs mb-3 line-clamp-2">{agent.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="text-foreground text-xs font-medium">{agent.total_runs}</p>
                      <p className="text-foreground-muted text-[10px]">çalışma</p>
                    </div>
                    <div className="text-center">
                      <p className="text-foreground text-xs font-medium">{timeAgo(agent.last_used_at)}</p>
                      <p className="text-foreground-muted text-[10px]">son kullanım</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setRunAgent(agent)}
                    className="opacity-0 group-hover:opacity-100 px-3 py-1.5 text-xs bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-all"
                  >
                    Çalıştır
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-12 text-foreground-muted text-sm">
          Bu projede aktif agent bulunamadı.
        </div>
      )}

      {/* Direkt agent ile QuickRunModal */}
      {runAgent && (
        <QuickRunModal
          agents={agents}
          onClose={() => setRunAgent(null)}
        />
      )}
    </div>
  )
}
