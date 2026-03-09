'use client'

import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'

interface Props {
  rows: Record<string, unknown>[]
  error: boolean
}

function positionColor(pos: number): string {
  if (pos <= 3) return 'text-green-400'
  if (pos <= 10) return 'text-yellow-400'
  if (pos <= 20) return 'text-orange-400'
  return 'text-red-400'
}

function positionBadge(pos: number): string {
  if (pos <= 3) return 'bg-green-400/15 text-green-400 border-green-400/30'
  if (pos <= 10) return 'bg-yellow-400/15 text-yellow-400 border-yellow-400/30'
  if (pos <= 20) return 'bg-orange-400/15 text-orange-400 border-orange-400/30'
  return 'bg-red-400/15 text-red-400 border-red-400/30'
}

function fmtDate(val: unknown): string {
  if (!val) return '—'
  return new Date(String(val)).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })
}

function ChangeIndicator({ change }: { change: number | null }) {
  if (change === null || change === 0) return <span className="text-foreground-muted text-xs">—</span>
  // Negative change = position improved (lower number = better rank)
  const improved = change < 0
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${improved ? 'text-green-400' : 'text-red-400'}`}>
      {improved ? '▲' : '▼'} {Math.abs(change)}
    </span>
  )
}

export default function SerpClient({ rows, error }: Props) {
  const [search, setSearch] = useState('')
  const [filterTier, setFilterTier] = useState<'all' | 'top3' | 'top10' | 'top20' | 'rest'>('all')

  if (error) {
    return (
      <main className="flex-1 p-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
          <div className="text-2xl mb-2">⚠️</div>
          <h3 className="text-red-400 font-medium mb-1">BFG Supabase bağlantısı kurulamadı</h3>
          <p className="text-red-400/60 text-sm">
            <code className="bg-red-500/10 px-1 rounded">BFG_SUPABASE_URL</code> ve{' '}
            <code className="bg-red-500/10 px-1 rounded">BFG_SUPABASE_SERVICE_KEY</code> Vercel env var&apos;larını kontrol et.
          </p>
        </div>
      </main>
    )
  }

  if (rows.length === 0) {
    return (
      <main className="flex-1 p-6">
        <div className="bg-background-secondary border border-border rounded-xl p-12 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-foreground font-medium mb-1">Henüz SERP verisi yok</h3>
          <p className="text-foreground-muted text-sm">n8n SERP Pozisyon Takibi workflow&apos;u çalışınca veriler burada görünecek.</p>
        </div>
      </main>
    )
  }

  // Get latest snapshot date
  const latestDate = rows[0]?.snapshot_date as string | undefined
  const latestRows = latestDate ? rows.filter(r => r.snapshot_date === latestDate) : rows

  // KPI summary from latest snapshot
  const positions = latestRows
    .map(r => typeof r.position === 'number' ? r.position : null)
    .filter((p): p is number => p !== null)

  const kpis = {
    total: latestRows.length,
    top3: positions.filter(p => p <= 3).length,
    top10: positions.filter(p => p <= 10).length,
    avgPos: positions.length > 0 ? (positions.reduce((a, b) => a + b, 0) / positions.length).toFixed(1) : '—',
  }

  // Filter rows
  const filtered = useMemo(() => {
    let result = latestRows
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(r =>
        String(r.keyword ?? '').toLowerCase().includes(q) ||
        String(r.url ?? '').toLowerCase().includes(q)
      )
    }
    if (filterTier !== 'all') {
      result = result.filter(r => {
        const pos = typeof r.position === 'number' ? r.position : 999
        if (filterTier === 'top3') return pos <= 3
        if (filterTier === 'top10') return pos <= 10
        if (filterTier === 'top20') return pos <= 20
        if (filterTier === 'rest') return pos > 20
        return true
      })
    }
    return result.sort((a, b) => {
      const pa = typeof a.position === 'number' ? a.position : 999
      const pb = typeof b.position === 'number' ? b.position : 999
      return pa - pb
    })
  }, [latestRows, search, filterTier])

  return (
    <main className="flex-1 p-6 space-y-6">
      {/* KPI bar */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'toplam keyword', value: kpis.total, color: 'from-[#1E3A5F] to-[#1E4D8C]', accent: '#60A5FA' },
          { label: 'top 3', value: kpis.top3, color: 'from-[#1A3A1A] to-[#14532D]', accent: '#A3E635' },
          { label: 'top 10', value: kpis.top10, color: 'from-[#3A2200] to-[#7C4012]', accent: '#FB923C' },
          { label: 'ort. pozisyon', value: kpis.avgPos, color: 'from-primary to-[#4C1D95]', accent: '#8B5CF6' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`bg-gradient-to-br ${kpi.color} rounded-xl p-5 border border-white/5`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-foreground-muted text-xs uppercase tracking-wider">{kpi.label}</span>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: kpi.accent }} />
            </div>
            <div className="text-2xl font-bold text-white">{kpi.value}</div>
            <div className="text-white/40 text-xs mt-1">{fmtDate(latestDate)}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex items-center gap-3 flex-wrap"
      >
        <input
          type="text"
          placeholder="Keyword veya URL ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-background-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-secondary w-64"
        />
        <div className="flex items-center gap-1 bg-background-secondary border border-border rounded-lg p-1">
          {(['all', 'top3', 'top10', 'top20', 'rest'] as const).map(tier => (
            <button
              key={tier}
              onClick={() => setFilterTier(tier)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                filterTier === tier
                  ? 'bg-secondary text-background'
                  : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              {tier === 'all' ? 'Tümü' : tier === 'rest' ? '20+' : tier.toUpperCase()}
            </button>
          ))}
        </div>
        <span className="text-foreground-muted text-xs">{filtered.length} keyword</span>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-background-secondary border border-border rounded-xl overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-foreground font-medium">Keyword Sıralamaları</h2>
          <span className="text-foreground-muted text-xs">Son snapshot: {fmtDate(latestDate)}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-foreground-muted font-medium uppercase tracking-wider text-[10px] w-12">#</th>
                <th className="px-4 py-3 text-left text-foreground-muted font-medium uppercase tracking-wider text-[10px]">Keyword</th>
                <th className="px-4 py-3 text-left text-foreground-muted font-medium uppercase tracking-wider text-[10px]">URL</th>
                <th className="px-4 py-3 text-center text-foreground-muted font-medium uppercase tracking-wider text-[10px]">Pozisyon</th>
                <th className="px-4 py-3 text-center text-foreground-muted font-medium uppercase tracking-wider text-[10px]">Değişim</th>
                <th className="px-4 py-3 text-right text-foreground-muted font-medium uppercase tracking-wider text-[10px]">Arama Hacmi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((row, i) => {
                const pos = typeof row.position === 'number' ? row.position : null
                const change = typeof row.position_change === 'number' ? row.position_change : null
                const volume = typeof row.search_volume === 'number' ? row.search_volume : null
                const url = String(row.url ?? row.landing_page ?? '—')
                const shortUrl = url.replace(/^https?:\/\/[^/]+/, '').replace(/\/$/, '') || '/'

                return (
                  <tr key={i} className="hover:bg-surface-elevated/40 transition-colors">
                    <td className="px-4 py-2.5 text-foreground-muted font-mono">{i + 1}</td>
                    <td className="px-4 py-2.5 text-foreground max-w-xs">
                      <span className="truncate block">{String(row.keyword ?? '—')}</span>
                    </td>
                    <td className="px-4 py-2.5 text-foreground-muted max-w-[200px]">
                      <span className="truncate block font-mono text-[11px]">{shortUrl}</span>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {pos !== null ? (
                        <span className={`inline-block px-2 py-0.5 rounded border text-[11px] font-bold ${positionBadge(pos)}`}>
                          {pos}
                        </span>
                      ) : (
                        <span className="text-foreground-muted">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <ChangeIndicator change={change} />
                    </td>
                    <td className="px-4 py-2.5 text-right text-foreground-muted font-mono">
                      {volume !== null ? volume.toLocaleString('tr-TR') : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </main>
  )
}
