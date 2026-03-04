'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Agent {
  id: string
  project: string
  skill_name: string
  display_name: string
  description: string
  icon: string
  category: string
}

interface QuickRunModalProps {
  agents: Agent[]
  onClose: () => void
}

export default function QuickRunModal({ agents, onClose }: QuickRunModalProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [project, setProject] = useState<string>('')
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [input, setInput] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const filteredAgents = project
    ? agents.filter((a) => a.project === project)
    : agents

  async function handleRun() {
    if (!selectedAgent || !input.trim()) return
    setSubmitting(true)

    const res = await fetch('/api/admin/command/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project: selectedAgent.project,
        skill: selectedAgent.skill_name,
        input: { prompt: input },
      }),
    })

    const data = await res.json()
    setSubmitting(false)

    if (data.job?.id) {
      router.push(`/admin/command/jobs/${data.job.id}`)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0F0A1E] border border-[#1A1030] rounded-2xl w-full max-w-lg mx-4 max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1A1030]">
          <h2 className="text-white font-semibold">Skill Çalıştır</h2>
          <button onClick={onClose} className="text-[#4C4462] hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Step 1: Proje Seç */}
          <div>
            <label className="text-xs text-[#4C4462] font-medium mb-2 block">1. Proje</label>
            <div className="flex gap-2">
              {[
                { id: 'verimio', label: 'Verimio', color: 'bg-[#A3E635]' },
                { id: 'bfg', label: 'BeginnerFXGuide', color: 'bg-blue-400' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setProject(p.id); setSelectedAgent(null) }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all ${
                    project === p.id
                      ? 'bg-[#2E1065] text-white border border-[#8B5CF6]'
                      : 'bg-[#1A1030] text-[#78716C] hover:text-white border border-transparent'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Agent Seç */}
          {project && (
            <div>
              <label className="text-xs text-[#4C4462] font-medium mb-2 block">2. Agent</label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {filteredAgents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => { setSelectedAgent(agent); setStep(3) }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm transition-all ${
                      selectedAgent?.id === agent.id
                        ? 'bg-[#2E1065] text-white border border-[#8B5CF6]'
                        : 'bg-[#1A1030] text-[#78716C] hover:text-white border border-transparent'
                    }`}
                  >
                    <span className="text-lg">{agent.icon}</span>
                    <div className="min-w-0">
                      <div className="truncate font-medium text-xs">{agent.display_name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Input */}
          {selectedAgent && (
            <div>
              <label className="text-xs text-[#4C4462] font-medium mb-2 block">
                3. Input — {selectedAgent.display_name}
              </label>
              <p className="text-[#4C4462] text-xs mb-2">{selectedAgent.description}</p>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Konu, keyword veya talimat girin..."
                rows={3}
                className="w-full bg-[#1A1030] border border-[#2E1065] text-white rounded-lg px-4 py-3 text-sm placeholder:text-[#4C4462] focus:outline-none focus:border-[#8B5CF6] resize-none"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#1A1030] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-[#78716C] hover:text-white transition-colors"
          >
            İptal
          </button>
          <button
            onClick={handleRun}
            disabled={!selectedAgent || !input.trim() || submitting}
            className="px-5 py-2 bg-[#A3E635] text-[#2E1065] rounded-lg text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#BEF264] transition-colors"
          >
            {submitting ? 'Başlatılıyor...' : 'Çalıştır'}
          </button>
        </div>
      </div>
    </div>
  )
}
