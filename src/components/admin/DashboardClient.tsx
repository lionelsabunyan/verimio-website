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
  new: 'bg-blue-500/20 text-blue-400',
  processing: 'bg-yellow-500/20 text-yellow-400',
  report_sent: 'bg-purple-500/20 text-purple-400',
  call_scheduled: 'bg-orange-500/20 text-orange-400',
  call_completed: 'bg-teal-500/20 text-teal-400',
  converted: 'bg-green-500/20 text-green-400',
  lost: 'bg-red-500/20 text-red-400',
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
      color: 'from-primary to-[#4C1D95]',
      accent: '#8B5CF6',
    },
    {
      label: 'Bu Hafta',
      value: kpis.weeklyLeads,
      icon: '📈',
      color: 'from-[#1E3A5F] to-[#1E4D8C]',
      accent: '#60A5FA',
    },
    {
      label: 'Dönüşüm Oranı',
      value: `%${kpis.conversionRate}`,
      icon: '🎯',
      color: 'from-[#1A3A1A] to-[#14532D]',
      accent: '#A3E635',
    },
    {
      label: 'Bekleyen Toplantı',
      value: kpis.pendingMeetings,
      icon: '📅',
      color: 'from-[#3A1A00] to-[#7C2D12]',
      accent: '#FB923C',
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
            className={`bg-gradient-to-br ${card.color} rounded-xl p-5 border border-white/5`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{card.icon}</span>
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: card.accent }}
              />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
            <div className="text-sm text-white/50">{card.label}</div>
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
                  <stop offset="5%" stopColor="#A3E635" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#A3E635" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-foreground-muted)" tick={{ fontSize: 12 }} />
              <YAxis stroke="var(--color-foreground-muted)" tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-primary)', borderRadius: 8 }}
                labelStyle={{ color: 'var(--color-secondary)' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="#A3E635"
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
