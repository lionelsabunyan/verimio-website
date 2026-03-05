'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Pipeline {
  id: string
  project: string
  name: string
  description: string | null
  steps: Array<{
    skill: string
    label: string
    approval_before?: boolean
    approval_title?: string
  }>
}

interface Props {
  pipeline: Pipeline
  onClose: () => void
}

export default function PipelineRunModal({ pipeline, onClose }: Props) {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleStart() {
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/admin/command/pipelines/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pipeline_id: pipeline.id,
          input: input.trim() || null,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Pipeline baslatilamadi')
        setSubmitting(false)
        return
      }

      // Run detay sayfasina yonlendir
      router.push(`/admin/command/pipelines/runs/${data.run.id}`)
    } catch {
      setError('Baglanti hatasi')
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#0F0A1E] border border-[#2E1065]/50 rounded-2xl w-full max-w-lg flex flex-col max-h-[80vh] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2E1065]/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#8B5CF6]/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">{pipeline.name}</h2>
              <p className="text-[#4C4462] text-xs">{pipeline.project} | {pipeline.steps.length} adim</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#4C4462] hover:text-white transition-colors p-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Adim Onizleme */}
          <div>
            <p className="text-[#78716C] text-xs mb-3 uppercase tracking-wider">Adimlar</p>
            <div className="relative pl-6">
              {/* Dikey cizgi */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#2E1065]" />

              {pipeline.steps.map((step, i) => (
                <div key={i} className="relative flex items-start gap-3 pb-4 last:pb-0">
                  {/* Nokta */}
                  <div className="absolute left-[-17px] top-1.5 w-3 h-3 rounded-full border-2 border-[#8B5CF6] bg-[#0F0A1E]" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm">{step.label}</span>
                      {step.approval_before && (
                        <span className="bg-orange-400/20 text-orange-400 px-1.5 py-0.5 rounded text-[10px]">
                          onay
                        </span>
                      )}
                    </div>
                    <span className="text-[#4C4462] text-xs">{step.skill}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kullanici Girdisi */}
          <div>
            <label className="text-[#78716C] text-xs mb-2 block uppercase tracking-wider">
              Girdi
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pipeline'a gonderilecek girdi... (ornegin: konu, hedef anahtar kelime)"
              className="w-full bg-[#1A1030] border border-[#2E1065]/50 rounded-lg px-4 py-3 text-white text-sm placeholder-[#4C4462] focus:outline-none focus:border-[#8B5CF6] resize-none"
              rows={4}
            />
          </div>

          {/* Hata */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#2E1065]/30">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[#78716C] hover:text-white text-sm transition-colors"
          >
            Iptal
          </button>
          <button
            onClick={handleStart}
            disabled={!input.trim() || submitting}
            className="px-5 py-2 bg-[#A3E635] text-[#2E1065] rounded-lg text-sm font-semibold hover:bg-[#B8F247] transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {submitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Baslatiliyor...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
                Pipeline Baslat
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
