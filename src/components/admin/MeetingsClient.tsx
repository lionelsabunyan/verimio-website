'use client'

import { motion } from 'framer-motion'

const OUTCOME_COLORS: Record<string, string> = {
  completed: 'bg-green-500/20 text-green-400',
  no_show: 'bg-red-500/20 text-red-400',
  rescheduled: 'bg-yellow-500/20 text-yellow-400',
  cancelled: 'bg-gray-500/20 text-gray-400',
}

interface Meeting {
  id: string
  scheduled_at: string
  duration_minutes: number
  outcome?: string
  notes?: string
  leads?: { email: string; sector?: string }
}

export default function MeetingsClient({ meetings }: { meetings: Meeting[] }) {
  const now = new Date()
  const upcoming = meetings.filter(m => new Date(m.scheduled_at) >= now && !m.outcome)
  const past = meetings.filter(m => new Date(m.scheduled_at) < now || m.outcome)

  return (
    <main className="flex-1 p-6 space-y-6">
      {/* Calendly bağlantı notu */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 flex items-start gap-4"
      >
        <span className="text-2xl">📅</span>
        <div>
          <h3 className="text-blue-400 font-medium mb-1">Calendly Webhook Entegrasyonu</h3>
          <p className="text-blue-400/70 text-sm">
            Calendly'den webhook URL'i bu endpoint'e bağla:
            <code className="ml-2 bg-blue-500/20 px-2 py-0.5 rounded text-xs font-mono">POST /api/admin/meetings/calendly</code>
          </p>
          <a href="https://calendly.com/integrations/webhooks" target="_blank" rel="noopener" className="text-blue-400 text-xs hover:underline mt-1 inline-block">
            Calendly Webhook Ayarları ↗
          </a>
        </div>
      </motion.div>

      {/* Yaklaşan toplantılar */}
      <div>
        <h2 className="text-white font-medium mb-3">Yaklaşan Toplantılar ({upcoming.length})</h2>
        {upcoming.length === 0 ? (
          <div className="bg-[#0F0A1E] border border-[#1A1030] border-dashed rounded-xl p-8 text-center">
            <p className="text-[#4C4462] text-sm">Yaklaşan toplantı yok</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map((meeting, i) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#0F0A1E] border border-[#2E1065] rounded-xl p-5 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-[#2E1065] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-[#A3E635] font-bold text-lg">
                    {new Date(meeting.scheduled_at).getDate()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">{meeting.leads?.email || 'Misafir'}</div>
                  <div className="text-[#4C4462] text-xs mt-0.5">
                    {new Date(meeting.scheduled_at).toLocaleString('tr-TR', {
                      day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit',
                    })} · {meeting.duration_minutes} dakika
                  </div>
                </div>
                {meeting.leads?.sector && (
                  <span className="text-xs text-[#78716C] bg-[#1A1030] px-2 py-1 rounded-lg">{meeting.leads.sector}</span>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Geçmiş toplantılar */}
      {past.length > 0 && (
        <div>
          <h2 className="text-[#78716C] font-medium mb-3">Geçmiş ({past.length})</h2>
          <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1A1030]">
                  {['Lead', 'Tarih', 'Süre', 'Sonuç'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[#4C4462] text-xs font-medium uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1030]">
                {past.map((meeting) => (
                  <tr key={meeting.id} className="hover:bg-[#1A1030]/50 transition-colors">
                    <td className="px-5 py-3 text-white text-sm">{meeting.leads?.email || '—'}</td>
                    <td className="px-5 py-3 text-[#78716C] text-sm">
                      {new Date(meeting.scheduled_at).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-5 py-3 text-[#78716C] text-sm">{meeting.duration_minutes} dk</td>
                    <td className="px-5 py-3">
                      {meeting.outcome ? (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${OUTCOME_COLORS[meeting.outcome] || 'bg-gray-500/20 text-gray-400'}`}>
                          {meeting.outcome === 'completed' ? 'Tamamlandı' :
                           meeting.outcome === 'no_show' ? 'Gelmedi' :
                           meeting.outcome === 'rescheduled' ? 'Ertelendi' : 'İptal'}
                        </span>
                      ) : (
                        <span className="text-[#4C4462] text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  )
}
