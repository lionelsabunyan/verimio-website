'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface LogLine {
  id: string
  line_number: number
  content: string
  log_type: string
  created_at: string
}

export default function LogViewer({ jobId }: { jobId: string }) {
  const [lines, setLines] = useState<LogLine[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    // Mevcut logları çek
    supabase
      .from('command_job_logs')
      .select('*')
      .eq('job_id', jobId)
      .order('line_number', { ascending: true })
      .limit(500)
      .then(({ data }) => {
        if (data) setLines(data)
      })

    // Realtime subscription
    const channel = supabase
      .channel(`job-logs-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'command_job_logs',
          filter: `job_id=eq.${jobId}`,
        },
        (payload) => {
          setLines((prev) => [...prev, payload.new as LogLine])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [jobId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const getLineColor = (type: string) => {
    switch (type) {
      case 'stderr': return 'text-red-400'
      case 'system': return 'text-[#A3E635]'
      default: return 'text-[#E8E4D9]'
    }
  }

  return (
    <div className="bg-[#0A0616] border border-[#1A1030] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1A1030]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[#4C4462] text-xs ml-2">output</span>
        </div>
        <span className="text-[#4C4462] text-xs">{lines.length} satır</span>
      </div>
      <div className="p-4 max-h-[500px] overflow-y-auto font-mono text-sm space-y-0.5">
        {lines.length === 0 ? (
          <div className="text-[#4C4462] flex items-center gap-2">
            <span className="animate-pulse">Çıktı bekleniyor...</span>
          </div>
        ) : (
          lines.map((line) => (
            <div key={line.id} className={`${getLineColor(line.log_type)} leading-relaxed`}>
              <span className="text-[#4C4462] select-none mr-3 text-xs">
                {String(line.line_number).padStart(3, ' ')}
              </span>
              {line.content}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
