'use client'

import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { GscData } from '@/lib/gsc'

// ─── Setup wizard (fallback when GSC not connected) ────────────────────────

const SETUP_STEPS = [
  {
    step: '1',
    title: 'Google Cloud Proje Oluştur',
    desc: 'console.cloud.google.com → Yeni Proje → "Search Console API" etkinleştir',
    action: 'https://console.cloud.google.com',
    actionLabel: 'Google Cloud →',
  },
  {
    step: '2',
    title: 'Servis Hesabı Oluştur',
    desc: 'IAM & Admin → Servis Hesapları → Yeni → JSON anahtarı indir',
    action: null,
    actionLabel: null,
  },
  {
    step: '3',
    title: 'GSC\'ye Servis Hesabı Ekle',
    desc: 'Search Console → Ayarlar → Kullanıcılar → e-posta ekle (Kısıtlı erişim)',
    action: 'https://search.google.com/search-console',
    actionLabel: 'GSC →',
  },
  {
    step: '4',
    title: 'Vercel\'e Env Var Ekle',
    desc: 'GSC_SERVICE_ACCOUNT_JSON = {"type":"service_account",...} olarak ayarla',
    action: null,
    actionLabel: null,
  },
  {
    step: '5',
    title: 'Opsiyonel: GSC_SITE_URL',
    desc: 'Varsayılan: sc-domain:verimio.com.tr. URL prefix için https://verimio.com.tr/ gir',
    action: null,
    actionLabel: null,
  },
]

const KEYWORD_TARGETS = [
  { keyword: 'AI danışmanlık Türkiye',   difficulty: 'Orta',  volume: '~500/ay',  priority: 'Yüksek' },
  { keyword: 'şirket otomasyon',          difficulty: 'Düşük', volume: '~200/ay',  priority: 'Yüksek' },
  { keyword: 'iş süreç otomasyonu',      difficulty: 'Orta',  volume: '~1K/ay',   priority: 'Orta' },
  { keyword: 'ChatGPT iş kullanımı',     difficulty: 'Yüksek',volume: '~5K/ay',  priority: 'Orta' },
  { keyword: 'yapay zeka danışmanlık',   difficulty: 'Orta',  volume: '~800/ay',  priority: 'Yüksek' },
  { keyword: 'dijital dönüşüm şirket',   difficulty: 'Düşük', volume: '~300/ay',  priority: 'Yüksek' },
]

function SetupGuide() {
  return (
    <main className="flex-1 p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5 flex items-start gap-4"
      >
        <span className="text-2xl">⚠️</span>
        <div>
          <h3 className="text-yellow-400 font-medium mb-1">Google Search Console henüz bağlı değil</h3>
          <p className="text-yellow-400/70 text-sm">
            <code className="bg-yellow-500/10 px-1 rounded">GSC_SERVICE_ACCOUNT_JSON</code> env var&apos;ı
            Vercel&apos;e eklendikten sonra gerçek veriler gösterilecek.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-background-secondary border border-border rounded-xl p-6"
        >
          <h2 className="text-foreground font-medium mb-5">Kurulum Adımları</h2>
          <div className="space-y-4">
            {SETUP_STEPS.map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-primary border border-foreground-muted flex items-center justify-center flex-shrink-0 text-xs text-foreground-secondary font-medium">
                  {s.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground text-sm font-medium">{s.title}</h3>
                  <p className="text-foreground-muted text-xs mt-0.5">{s.desc}</p>
                  {s.action && (
                    <a
                      href={s.action}
                      target="_blank"
                      rel="noopener"
                      className="inline-block mt-1.5 text-xs text-secondary hover:underline"
                    >
                      {s.actionLabel}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-background-secondary border border-border rounded-xl p-6"
        >
          <h2 className="text-foreground font-medium mb-5">Hedef Keyword&apos;ler</h2>
          <div className="space-y-2">
            {KEYWORD_TARGETS.map((kw) => (
              <div key={kw.keyword} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <div className="flex-1">
                  <span className="text-foreground text-sm">{kw.keyword}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  kw.difficulty === 'Düşük' ? 'bg-green-500/20 text-green-400' :
                  kw.difficulty === 'Orta'  ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {kw.difficulty}
                </span>
                <span className="text-foreground-muted text-xs w-20 text-right">{kw.volume}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  kw.priority === 'Yüksek'
                    ? 'bg-secondary/20 text-secondary'
                    : 'bg-surface-elevated text-foreground-muted'
                }`}>
                  {kw.priority}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Placeholder metric cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-background-secondary border border-border rounded-xl p-6"
      >
        <h2 className="text-foreground font-medium mb-4">Metrikler (GSC bağlandıktan sonra)</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Toplam Tıklama', icon: '🖱️' },
            { label: 'İmpression',     icon: '👁️' },
            { label: 'Ort. Pozisyon',  icon: '📍' },
            { label: 'CTR',            icon: '%' },
          ].map((m) => (
            <div key={m.label} className="bg-surface-elevated rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">{m.icon}</div>
              <div className="text-2xl font-bold text-foreground-muted mb-1">—</div>
              <div className="text-foreground-muted text-xs">{m.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  )
}

// ─── Full dashboard (when GSC is connected) ────────────────────────────────

function fmt(n: number, decimals = 0) {
  return n.toLocaleString('tr-TR', { maximumFractionDigits: decimals })
}

function fmtCtr(n: number) {
  return `%${(n * 100).toFixed(1)}`
}

function shortDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
}

function shortPage(url: string) {
  try {
    const u = new URL(url)
    return u.pathname === '/' ? '/' : u.pathname
  } catch {
    return url
  }
}

function GscDashboard({ data }: { data: GscData }) {
  const KPI_CARDS = [
    {
      label: 'Toplam Tıklama',
      value: fmt(data.summary.clicks),
      icon: '🖱️',
      color: 'from-[#1A3A1A] to-[#14532D]',
      accent: '#F59E0B',
    },
    {
      label: 'İmpression',
      value: fmt(data.summary.impressions),
      icon: '👁️',
      color: 'from-[#1E3A5F] to-[#1E4D8C]',
      accent: '#60A5FA',
    },
    {
      label: 'Ort. Pozisyon',
      value: fmt(data.summary.position, 1),
      icon: '📍',
      color: 'from-[#3A1A00] to-[#7C2D12]',
      accent: '#FB923C',
    },
    {
      label: 'CTR',
      value: fmtCtr(data.summary.ctr),
      icon: '%',
      color: 'from-primary to-[#4C1D95]',
      accent: '#F59E0B',
    },
  ]

  const trendChartData = data.trend.map(r => ({
    name: shortDate(r.date),
    clicks: r.clicks,
    impressions: r.impressions,
  }))

  return (
    <main className="flex-1 p-6 space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4">
        {KPI_CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className={`bg-gradient-to-br ${card.color} rounded-xl p-5 border border-white/5`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{card.icon}</span>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: card.accent }} />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
            <div className="text-sm text-white/50">{card.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Trend chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-background-secondary border border-border rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-foreground font-medium">Son 28 Günlük Trafik</h2>
          <span className="text-foreground-muted text-xs">Google Search Console</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={trendChartData}>
            <defs>
              <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#F59E0B" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="impGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#60A5FA" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="name"
              stroke="var(--color-foreground-muted)"
              tick={{ fontSize: 11 }}
              interval={3}
            />
            <YAxis
              yAxisId="left"
              stroke="var(--color-foreground-muted)"
              tick={{ fontSize: 11 }}
              allowDecimals={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="var(--color-foreground-muted)"
              tick={{ fontSize: 11 }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--color-surface-elevated)',
                border: '1px solid var(--color-primary)',
                borderRadius: 8,
              }}
              labelStyle={{ color: 'var(--color-secondary)' }}
              itemStyle={{ color: '#fff' }}
              formatter={(v, name) => [
                fmt((v as number) ?? 0),
                name === 'clicks' ? 'Tıklama' : 'İmpression',
              ]}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="clicks"
              stroke="#F59E0B"
              strokeWidth={2}
              fill="url(#clickGrad)"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="impressions"
              stroke="#60A5FA"
              strokeWidth={1.5}
              fill="url(#impGrad)"
              strokeDasharray="4 2"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-6 mt-3 text-xs text-foreground-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#F59E0B] inline-block rounded" />
            Tıklama (sol eksen)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#60A5FA] inline-block rounded" />
            İmpression (sağ eksen)
          </span>
        </div>
      </motion.div>

      {/* Top pages + Top queries */}
      <div className="grid grid-cols-2 gap-4">
        {/* Top pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-background-secondary border border-border rounded-xl overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-foreground font-medium">En Çok Tıklanan Sayfalar</h2>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                {['Sayfa', 'Tıklama', 'İmp.', 'Poz.'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-foreground-muted font-medium uppercase tracking-wider text-[10px]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.topPages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-foreground-muted">Veri yok</td>
                </tr>
              ) : (
                data.topPages.map((p, i) => (
                  <tr key={i} className="hover:bg-surface-elevated/50 transition-colors">
                    <td className="px-4 py-2.5 text-foreground font-mono" title={p.page}>
                      {shortPage(p.page)}
                    </td>
                    <td className="px-4 py-2.5 text-secondary font-medium">{fmt(p.clicks)}</td>
                    <td className="px-4 py-2.5 text-foreground-secondary">{fmt(p.impressions)}</td>
                    <td className="px-4 py-2.5 text-foreground-muted">{fmt(p.position, 1)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>

        {/* Top queries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-background-secondary border border-border rounded-xl overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-foreground font-medium">En Çok Arama Yapılan Sorgular</h2>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                {['Sorgu', 'Tıklama', 'CTR', 'Poz.'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-foreground-muted font-medium uppercase tracking-wider text-[10px]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.topQueries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-foreground-muted">Veri yok</td>
                </tr>
              ) : (
                data.topQueries.map((q, i) => (
                  <tr key={i} className="hover:bg-surface-elevated/50 transition-colors">
                    <td className="px-4 py-2.5 text-foreground max-w-[200px] truncate" title={q.query}>
                      {q.query}
                    </td>
                    <td className="px-4 py-2.5 text-secondary font-medium">{fmt(q.clicks)}</td>
                    <td className="px-4 py-2.5 text-foreground-secondary">{fmtCtr(q.ctr)}</td>
                    <td className="px-4 py-2.5 text-foreground-muted">{fmt(q.position, 1)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Connected badge */}
      <div className="flex justify-end">
        <span className="text-[11px] text-foreground-muted flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
          Google Search Console • Son 28 gün
        </span>
      </div>
    </main>
  )
}

// ─── Export ────────────────────────────────────────────────────────────────

export default function SEOClient({ data }: { data: GscData | null }) {
  if (!data) return <SetupGuide />
  return <GscDashboard data={data} />
}
