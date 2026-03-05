'use client'

import { useState } from 'react'
import Link from 'next/link'
import StatusBadge from './StatusBadge'
import PipelineRunModal from './PipelineRunModal'

interface Pipeline {
  id: string
  project: string
  name: string
  description: string | null
  steps: Array<{ skill: string; label: string; approval_before?: boolean }>
  created_at: string
}

interface PipelineRun {
  id: string
  pipeline_id: string
  name: string
  project: string
  status: string
  current_step: number
  total_steps: number
  input: string | null
  started_at: string
  completed_at: string | null
}

interface Props {
  pipelines: Pipeline[]
  activeRuns: PipelineRun[]
  recentRuns: PipelineRun[]
}

export default function PipelinesClient({ pipelines, activeRuns, recentRuns }: Props) {
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null)

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'az once'
    if (mins < 60) return `${mins}dk`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}sa`
    return `${Math.floor(hrs / 24)}g`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Aktif Pipeline'lar */}
      {activeRuns.length > 0 && (
        <div>
          <h2 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3E635] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A3E635]" />
            </span>
            Aktif Pipeline&apos;lar
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {activeRuns.map((run) => (
              <Link
                key={run.id}
                href={`/admin/command/pipelines/runs/${run.id}`}
                className="bg-[#1A1030] border border-[#A3E635]/20 rounded-xl p-5 hover:border-[#A3E635]/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium text-sm">{run.name}</h3>
                  <StatusBadge status={run.status} />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`w-2 h-2 rounded-full ${run.project === 'verimio' ? 'bg-[#A3E635]' : 'bg-blue-400'}`} />
                  <span className="text-[#4C4462] text-xs">{run.project}</span>
                  <span className="text-[#4C4462] text-xs">|</span>
                  <span className="text-[#4C4462] text-xs">{timeAgo(run.started_at)}</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-[#2E1065]/30 rounded-full h-1.5">
                  <div
                    className="bg-[#A3E635] h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(5, (run.current_step / run.total_steps) * 100)}%` }}
                  />
                </div>
                <p className="text-[#4C4462] text-xs mt-1.5">
                  Adim {run.current_step + 1} / {run.total_steps}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Pipeline Sablonlari */}
      <div>
        <h2 className="text-white text-sm font-medium mb-3">Pipeline Sablonlari</h2>
        <div className="grid grid-cols-2 gap-4">
          {pipelines.map((pipeline) => (
            <div
              key={pipeline.id}
              className="bg-[#1A1030] border border-[#2E1065]/30 rounded-xl p-5 hover:border-[#8B5CF6]/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-medium text-sm">{pipeline.name}</h3>
                  {pipeline.description && (
                    <p className="text-[#4C4462] text-xs mt-1">{pipeline.description}</p>
                  )}
                </div>
                <span className={`w-2.5 h-2.5 rounded-full mt-1 ${pipeline.project === 'verimio' ? 'bg-[#A3E635]' : 'bg-blue-400'}`} />
              </div>

              {/* Adim listesi */}
              <div className="space-y-1.5 mb-4">
                {pipeline.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="text-[#4C4462] w-4 text-right">{i + 1}.</span>
                    <span className="text-[#78716C]">{step.label}</span>
                    {step.approval_before && (
                      <span className="bg-orange-400/20 text-orange-400 px-1.5 py-0.5 rounded text-[10px]">
                        onay
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedPipeline(pipeline)}
                className="w-full px-4 py-2.5 bg-[#A3E635]/10 text-[#A3E635] rounded-lg hover:bg-[#A3E635]/20 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
                Calistir
              </button>
            </div>
          ))}

          {pipelines.length === 0 && (
            <div className="col-span-2 bg-[#1A1030] border border-[#2E1065]/30 rounded-xl p-8 text-center">
              <p className="text-[#4C4462] text-sm">Henuz pipeline sablonu yok.</p>
            </div>
          )}
        </div>
      </div>

      {/* Son Tamamlanan Run'lar */}
      {recentRuns.length > 0 && (
        <div className="bg-[#1A1030] border border-[#2E1065]/30 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#2E1065]/30">
            <h3 className="text-white text-sm font-medium">Gecmis</h3>
          </div>
          <div className="divide-y divide-[#2E1065]/20">
            {recentRuns.map((run) => (
              <Link
                key={run.id}
                href={`/admin/command/pipelines/runs/${run.id}`}
                className="flex items-center justify-between px-5 py-3 hover:bg-[#2E1065]/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span className="text-white text-sm">{run.name}</span>
                  <span className="text-[#4C4462] text-xs">{run.project}</span>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={run.status} />
                  <span className="text-[#4C4462] text-xs">
                    {run.completed_at ? timeAgo(run.completed_at) : timeAgo(run.started_at)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Run Modal */}
      {selectedPipeline && (
        <PipelineRunModal
          pipeline={selectedPipeline}
          onClose={() => setSelectedPipeline(null)}
        />
      )}
    </div>
  )
}
