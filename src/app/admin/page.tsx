import { createClient } from '@/lib/supabase/server'
import Header from '@/components/admin/Header'
import DashboardClient from '@/components/admin/DashboardClient'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // KPI verileri paralel çek
  const [leadsResult, weeklyResult, conversionResult, meetingsResult, recentResult] = await Promise.all([
    supabase.from('leads').select('id', { count: 'exact', head: true }),
    supabase.from('leads').select('id', { count: 'exact', head: true })
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
    supabase.from('leads').select('id', { count: 'exact', head: true })
      .eq('status', 'converted'),
    supabase.from('meetings').select('id', { count: 'exact', head: true })
      .gte('scheduled_at', new Date().toISOString())
      .is('outcome', null),
    supabase.from('leads')
      .select('id, email, sector, status, created_at, wants_call')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  // Son 7 gün grafik verisi
  const { data: chartData } = await supabase
    .from('leads')
    .select('created_at')
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .order('created_at', { ascending: true })

  // Günlük grupla
  const dailyCounts: Record<string, number> = {}
  const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    const key = d.toISOString().split('T')[0]
    dailyCounts[key] = 0
  }
  chartData?.forEach((lead) => {
    const key = lead.created_at.split('T')[0]
    if (key in dailyCounts) dailyCounts[key]++
  })

  const chartEntries = Object.entries(dailyCounts).map(([date, count], idx) => ({
    name: days[new Date(date).getDay()],
    leads: count,
  }))

  const kpis = {
    totalLeads: leadsResult.count || 0,
    weeklyLeads: weeklyResult.count || 0,
    converted: conversionResult.count || 0,
    conversionRate: leadsResult.count
      ? Math.round(((conversionResult.count || 0) / leadsResult.count) * 100)
      : 0,
    pendingMeetings: meetingsResult.count || 0,
  }

  return (
    <>
      <Header title="Dashboard" subtitle="Verimio operasyon merkezi" />
      <DashboardClient
        kpis={kpis}
        chartData={chartEntries}
        recentLeads={recentResult.data || []}
      />
    </>
  )
}
