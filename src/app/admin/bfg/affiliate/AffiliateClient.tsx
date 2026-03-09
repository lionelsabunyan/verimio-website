'use client'

import { motion } from 'framer-motion'

interface Props {
  rows: Record<string, unknown>[]
  error: boolean
}

const NUM_COLS = ['clicks', 'conversions', 'cpa_count', 'revenue_usd', 'commission_usd', 'cost_usd']
const SKIP_COLS = ['id', 'created_at', 'updated_at']

function fmtValue(col: string, val: unknown): string {
  if (val === null || val === undefined) return '—'
  if (typeof val === 'number') {
    if (col.endsWith('_usd')) return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    return val.toLocaleString('tr-TR')
  }
  if (typeof val === 'string' && (col === 'week_date' || col === 'date')) {
    return new Date(val).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })
  }
  return String(val)
}

function isNumeric(col: string) {
  return NUM_COLS.includes(col) || col.endsWith('_usd') || col.endsWith('_count') || col === 'clicks' || col === 'conversions'
}

export default function AffiliateClient({ rows, error }: Props) {
  if (error) {
    return (
      <main className="flex-1 p-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
          <div className="text-2xl mb-2">⚠️</div>
          <h3 className="text-red-600 font-medium mb-1">BFG Supabase bağlantısı kurulamadı</h3>
          <p className="text-red-500 text-sm">
            <code className="bg-red-100 px-1 rounded">BFG_SUPABASE_URL</code> ve{' '}
            <code className="bg-red-100 px-1 rounded">BFG_SUPABASE_SERVICE_KEY</code> Vercel env var&apos;larını kontrol et.
          </p>
        </div>
      </main>
    )
  }

  if (rows.length === 0) {
    return (
      <main className="flex-1 p-6">
        <div className="bg-background-secondary border border-border rounded-xl p-12 text-center">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="text-foreground font-medium mb-1">Henüz veri yok</h3>
          <p className="text-foreground-muted text-sm">n8n Affiliate Komisyon Takibi workflow&apos;u çalışınca veriler burada görünecek.</p>
        </div>
      </main>
    )
  }

  // Dynamic columns from first row, excluding skipped ones
  const allCols = Object.keys(rows[0]).filter(c => !SKIP_COLS.includes(c))

  // Compute totals for numeric columns
  const totals: Record<string, number> = {}
  for (const col of allCols) {
    if (isNumeric(col)) {
      totals[col] = rows.reduce((s, r) => s + (typeof r[col] === 'number' ? (r[col] as number) : 0), 0)
    }
  }

  // Summary KPIs from first 4 meaningful numeric cols
  const kpiCols = allCols.filter(c => isNumeric(c)).slice(0, 4)

  return (
    <main className="flex-1 p-6 space-y-6">
      {/* KPI bar */}
      {kpiCols.length > 0 && (
        <div className={`grid grid-cols-${kpiCols.length} gap-4`}>
          {kpiCols.map((col, i) => {
            const lightStyles = [
              { valueCls: 'text-emerald-600', dot: 'bg-emerald-500' },
              { valueCls: 'text-blue-600',    dot: 'bg-blue-500' },
              { valueCls: 'text-amber-600',   dot: 'bg-amber-500' },
              { valueCls: 'text-purple-600',  dot: 'bg-purple-500' },
            ]
            const ls = lightStyles[i] ?? lightStyles[0]
            return (
              <motion.div
                key={col}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">{col.replace(/_/g, ' ')}</span>
                  <div className={`w-2 h-2 rounded-full ${ls.dot}`} />
                </div>
                <div className={`text-2xl font-bold ${ls.valueCls}`}>{fmtValue(col, totals[col])}</div>
                <div className="text-gray-400 text-xs mt-1">toplam {rows.length} hafta</div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-background-secondary border border-border rounded-xl overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-foreground font-medium">Affiliate Metrikleri</h2>
          <span className="text-foreground-muted text-xs">{rows.length} kayıt</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                {allCols.map(col => (
                  <th key={col} className="px-4 py-3 text-left text-foreground-muted font-medium uppercase tracking-wider text-[10px] whitespace-nowrap">
                    {col.replace(/_/g, ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-surface-elevated/40 transition-colors">
                  {allCols.map(col => (
                    <td key={col} className={`px-4 py-2.5 whitespace-nowrap ${
                      isNumeric(col) ? 'text-secondary font-medium font-mono' : 'text-foreground'
                    }`}>
                      {fmtValue(col, row[col])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </main>
  )
}
