'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const STATUS_OPTIONS = [
  { value: '', label: 'Tümü' },
  { value: 'new', label: 'Yeni' },
  { value: 'processing', label: 'İşleniyor' },
  { value: 'report_sent', label: 'Rapor Gönderildi' },
  { value: 'call_scheduled', label: 'Toplantı Planlandı' },
  { value: 'call_completed', label: 'Toplantı Tamamlandı' },
  { value: 'converted', label: 'Müşteri' },
  { value: 'lost', label: 'Kayıp' },
]

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  processing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  report_sent: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  call_scheduled: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  call_completed: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  converted: 'bg-green-500/20 text-green-400 border-green-500/30',
  lost: 'bg-red-500/20 text-red-400 border-red-500/30',
}

interface Lead {
  id: string
  email: string
  phone?: string
  sector?: string
  team_size?: string
  status: string
  wants_call?: boolean
  created_at: string
  pdf_url?: string
}

export default function CRMClient({ leads }: { leads: Lead[] }) {
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = leads.filter((lead) => {
    const matchesStatus = !statusFilter || lead.status === statusFilter
    const matchesSearch = !searchQuery ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.sector || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  async function updateStatus(id: string, status: string) {
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    window.location.reload()
  }

  return (
    <main className="flex-1 p-6">
      {/* Filtreler */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Email veya sektör ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-background-secondary border border-border rounded-lg px-4 py-2 text-foreground text-sm placeholder-foreground-muted focus:outline-none focus:border-primary-light w-64 transition-colors"
        />
        <div className="flex gap-2">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === opt.value
                  ? 'bg-secondary text-primary'
                  : 'bg-surface-elevated text-foreground-secondary hover:text-foreground'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="ml-auto text-foreground-muted text-sm">
          {filtered.length} lead
        </div>
      </motion.div>

      {/* Tablo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-background-secondary border border-border rounded-xl overflow-hidden"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {['Email', 'Sektör', 'Ekip', 'Durum', 'Toplantı', 'Rapor', 'Tarih', 'İşlem'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-foreground-muted text-xs font-medium uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-foreground-muted">
                  Sonuç bulunamadı
                </td>
              </tr>
            ) : (
              filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-surface-elevated/50 transition-colors group">
                  <td className="px-5 py-3">
                    <Link href={`/admin/crm/${lead.id}`} className="text-foreground hover:text-secondary text-sm transition-colors">
                      {lead.email}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-foreground-secondary text-sm">{lead.sector || '—'}</td>
                  <td className="px-5 py-3 text-foreground-secondary text-sm">{lead.team_size || '—'}</td>
                  <td className="px-5 py-3">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className={`text-xs rounded-full px-2 py-0.5 border cursor-pointer bg-transparent font-medium ${STATUS_COLORS[lead.status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}
                    >
                      {STATUS_OPTIONS.slice(1).map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-background-secondary text-foreground">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3">
                    {lead.wants_call ? (
                      <span className="text-secondary text-xs">✓</span>
                    ) : (
                      <span className="text-foreground-muted text-xs">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {lead.pdf_url ? (
                      <a href={lead.pdf_url} target="_blank" rel="noopener" className="text-primary-light text-xs hover:underline">
                        PDF ↗
                      </a>
                    ) : (
                      <span className="text-foreground-muted text-xs">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-foreground-secondary text-sm whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString('tr-TR', {
                      day: '2-digit', month: 'short', year: '2-digit',
                    })}
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/crm/${lead.id}`}
                      className="opacity-0 group-hover:opacity-100 text-foreground-muted hover:text-secondary transition-all text-sm"
                    >
                      Detay →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </main>
  )
}
