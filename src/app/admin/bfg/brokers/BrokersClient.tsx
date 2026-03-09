'use client'

import { motion } from 'framer-motion'

interface Props {
  rows: Record<string, unknown>[]
  error: boolean
}

const SKIP_COLS = ['id', 'created_at', 'updated_at']

function fmtValue(col: string, val: unknown): string {
  if (val === null || val === undefined) return '—'
  if (typeof val === 'boolean') return val ? '✓' : '✗'
  if (typeof val === 'number') {
    if (col.endsWith('_usd') || col.endsWith('_score') || col === 'rating') {
      return val.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
    }
    return val.toLocaleString('tr-TR')
  }
  if (typeof val === 'string' && (col === 'created_at' || col.endsWith('_date') || col.endsWith('_at'))) {
    return new Date(val).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })
  }
  const str = String(val)
  if (str.length > 60) return str.slice(0, 57) + '...'
  return str
}

function StatusBadge({ val }: { val: unknown }) {
  const str = String(val ?? '').toLowerCase()
  const colors: Record<string, string> = {
    published: 'bg-green-100 text-green-700 border-green-200',
    draft: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    review: 'bg-blue-100 text-blue-700 border-blue-200',
    pending: 'bg-orange-100 text-orange-700 border-orange-200',
    archived: 'bg-red-100 text-red-700 border-red-200',
  }
  const cls = colors[str] ?? 'bg-gray-100 text-gray-600 border-gray-200'
  return (
    <span className={`inline-block px-2 py-0.5 rounded border text-[11px] font-medium ${cls}`}>
      {String(val ?? '—')}
    </span>
  )
}

export default function BrokersClient({ rows, error }: Props) {
  if (error) {
    return (
      <main className="flex-1 p-6 space-y-4">
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🏗️</div>
            <div>
              <h3 className="text-orange-700 font-medium mb-1">Broker tablosu henüz kurulmadı</h3>
              <p className="text-orange-600 text-sm mb-3">
                BFG Supabase&apos;de <code className="bg-orange-100 px-1 rounded">brokers</code> tablosu bulunamadı.
                Ya BFG env var&apos;lar eksik ya da tablo henüz oluşturulmamış.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-foreground-muted font-medium">Gerekli Vercel env var&apos;lar:</p>
                <div className="font-mono text-xs space-y-1 bg-background-secondary rounded-lg p-3">
                  <div><span className="text-foreground-muted">BFG_SUPABASE_URL</span> <span className="text-orange-600">= https://xxxxx.supabase.co</span></div>
                  <div><span className="text-foreground-muted">BFG_SUPABASE_SERVICE_KEY</span> <span className="text-orange-600">= eyJhb...</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder coming soon */}
        <div className="bg-background-secondary border border-border rounded-xl p-12 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-foreground font-semibold text-lg mb-2">Broker İnceleme Yönetimi</h3>
          <p className="text-foreground-muted text-sm max-w-md mx-auto mb-6">
            Bu sayfa beginnerfxguide.com&apos;daki broker incelemelerini yönetmek için kullanılacak.
            Supabase bağlantısı kurulduktan sonra tüm özellikler aktif olacak.
          </p>
          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto text-left">
            {['📝 Yeni broker ekle', '⭐ Rating güncelle', '📊 Performans takibi'].map(item => (
              <div key={item} className="bg-background border border-border rounded-lg p-3 text-xs text-foreground-muted">{item}</div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (rows.length === 0) {
    return (
      <main className="flex-1 p-6">
        <div className="bg-background-secondary border border-border rounded-xl p-12 text-center">
          <div className="text-4xl mb-3">📋</div>
          <h3 className="text-foreground font-medium mb-1">Henüz broker verisi yok</h3>
          <p className="text-foreground-muted text-sm">Supabase&apos;deki <code className="bg-surface-elevated px-1 rounded">brokers</code> tablosu boş.</p>
        </div>
      </main>
    )
  }

  const allCols = Object.keys(rows[0]).filter(c => !SKIP_COLS.includes(c))
  const statusCol = allCols.find(c => c === 'status' || c === 'state' || c === 'review_status')
  const nameCol = allCols.find(c => c === 'name' || c === 'broker_name' || c === 'title')

  // Stats
  const total = rows.length
  const published = rows.filter(r => String(r[statusCol ?? ''] ?? '').toLowerCase() === 'published').length
  const draft = rows.filter(r => String(r[statusCol ?? ''] ?? '').toLowerCase() === 'draft').length

  return (
    <main className="flex-1 p-6 space-y-6">
      {/* KPI bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'toplam broker', value: total, valueCls: 'text-blue-600', dot: 'bg-blue-500' },
          { label: 'yayında', value: published, valueCls: 'text-emerald-600', dot: 'bg-emerald-500' },
          { label: 'taslak', value: draft, valueCls: 'text-amber-600', dot: 'bg-amber-500' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-gray-500 text-xs uppercase tracking-wider">{kpi.label}</span>
              <div className={`w-2 h-2 rounded-full ${kpi.dot}`} />
            </div>
            <div className={`text-2xl font-bold ${kpi.valueCls}`}>{kpi.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-background-secondary border border-border rounded-xl overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-foreground font-medium">Broker Listesi</h2>
          <span className="text-foreground-muted text-xs">{rows.length} broker</span>
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
                    <td key={col} className="px-4 py-2.5 whitespace-nowrap">
                      {(col === statusCol) ? (
                        <StatusBadge val={row[col]} />
                      ) : col === nameCol ? (
                        <span className="text-foreground font-medium">{String(row[col] ?? '—')}</span>
                      ) : (
                        <span className="text-foreground-muted">{fmtValue(col, row[col])}</span>
                      )}
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
