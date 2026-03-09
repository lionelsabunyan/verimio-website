'use client'

import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Link from 'next/link'

interface KPIs {
  totalLeads: number
  weeklyLeads: number
  converted: number
  conversionRate: number
  pendingMeetings: number
}

interface Lead {
  id: string
  email: string
  sector?: string
  status: string
  created_at: string
  wants_call?: boolean
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  processing: 'bg-yellow-100 text-yellow-700',
  report_sent: 'bg-purple-100 text-purple-700',
  call_scheduled: 'bg-orange-100 text-orange-700',
  call_completed: 'bg-teal-100 text-teal-700',
  converted: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-700',
}

const STATUS_LABELS: Record<string, string> = {
  new: 'Yeni',
  processing: 'İşleniyor',
  report_sent: 'Rapor Gönderildi',
  call_scheduled: 'Toplantı Planlandı',
  call_completed: 'Toplantı Tamamlandı',
  converted: 'Müşteri',
  lost: 'Kayıp',
}

export default function DashboardClient({
  kpis,
  chartData,
  recentLeads,
}: {
  kpis: KPIs
  chartData: { name: string; leads: number }[]
  recentLeads: Lead[]
}) {
  const KPI_CARDS = [
    {
      label: 'Toplam Lead',
      value: kpis.totalLeads,
      icon: '👥',
      valueCls: 'text-blue-600',
      dot: 'bg-blue-500',
    },
    {
      label: 'Bu Hafta',
      value: kpis.weeklyLeads,
      icon: '📈',
      valueCls: 'text-sky-600',
      dot: 'bg-sky-500',
    },
    {
      label: 'Dönüşüm Oranı',
      value: `%${kpis.conversionRate}`,
      icon: '🎯',
      valueCls: 'text-emerald-600',
      dot: 'bg-emerald-500',
    },
    {
      label: 'Bekleyen Toplantı',
      value: kpis.pendingMeetings,
      icon: '📅',
      valueCls: 'text-amber-600',
      dot: 'bg-amber-500',
    },
  ]

  return (
    <main className="flex-1 p-6 space-y-6">
      {/* KPI Kartları */}
      <div className="grid grid-cols-4 gap-4">
        {KPI_CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{card.icon}</span>
              <div className={`w-2 h-2 rounded-full ${card.dot}`} />
            </div>
            <div className={`text-3xl font-bold ${card.valueCls} mb-1`}>{card.value}</div>
            <div className="text-sm text-gray-500">{card.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Grafik */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-2 bg-background-secondary border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-foreground font-medium">Son 7 Günlük Lead</h2>
            <span className="text-foreground-muted text-xs">Son 7 gün</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-foreground-muted)" tick={{ fontSize: 12 }} />
              <YAxis stroke="var(--color-foreground-muted)" tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ background: '#ffffff', border: '1px solid #E5E7EB', borderRadius: 8, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07)' }}
                labelStyle={{ color: '#374151' }}
                itemStyle={{ color: '#111827' }}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="#2563EB"
                strokeWidth={2}
                fill="url(#leadGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Hızlı Aksiyonlar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-background-secondary border border-border rounded-xl p-5"
        >
          <h2 className="text-foreground font-medium mb-4">Hızlı Aksiyonlar</h2>
          <div className="space-y-2">
            {[
              { label: 'Görsel Üret', href: '/admin/social/visuals', icon: '🎨', desc: 'fal.ai ile' },
              { label: 'İçerik Yaz', href: '/admin/content', icon: '✍️', desc: 'Claude ile' },
              { label: 'Video Üret', href: '/admin/video', icon: '🎬', desc: 'Hailuo ile' },
              { label: 'Post Planla', href: '/admin/social', icon: '📱', desc: '4 platform' },
              { label: 'SEO Kontrol', href: '/admin/seo', icon: '📊', desc: 'Analytics' },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-elevated transition-colors group"
              >
                <span className="text-xl">{action.icon}</span>
                <div className="flex-1">
                  <div className="text-foreground text-sm group-hover:text-secondary transition-colors">{action.label}</div>
                  <div className="text-foreground-muted text-xs">{action.desc}</div>
                </div>
                <svg className="w-4 h-4 text-foreground-muted group-hover:text-secondary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Son Leadler */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-background-secondary border border-border rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-foreground font-medium">Son Leadler</h2>
          <Link href="/admin/crm" className="text-secondary text-sm hover:underline">
            Tümünü Gör →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Email', 'Sektör', 'Durum', 'Tarih', 'Toplantı İstiyor'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-foreground-muted text-xs font-medium uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-foreground-muted text-sm">
                    Henüz lead yok
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface-elevated/50 transition-colors">
                    <td className="px-5 py-3">
                      <Link href={`/admin/crm/${lead.id}`} className="text-foreground hover:text-secondary text-sm transition-colors">
                        {lead.email}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-foreground-secondary text-sm">{lead.sector || '—'}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[lead.status] || 'bg-gray-500/20 text-gray-400'}`}>
                        {STATUS_LABELS[lead.status] || lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-foreground-secondary text-sm">
                      {new Date(lead.created_at).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })}
                    </td>
                    <td className="px-5 py-3">
                      {lead.wants_call ? (
                        <span className="text-secondary text-xs">✓ Evet</span>
                      ) : (
                        <span className="text-foreground-muted text-xs">Hayır</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </main>
  )
}
