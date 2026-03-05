export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/admin/Header'
import CommandDashboardClient from '@/components/admin/command/CommandDashboardClient'

export default async function CommandCenterPage() {
  const supabase = await createClient()

  const [jobsRes, activeJobsRes, approvalsRes, agentsRes, recentJobsRes, activePipelinesRes] = await Promise.all([
    supabase.from('command_jobs').select('id', { count: 'exact', head: true }),
    supabase.from('command_jobs').select('id', { count: 'exact', head: true })
      .in('status', ['running', 'queued']),
    supabase.from('approvals').select('id', { count: 'exact', head: true })
      .eq('status', 'pending'),
    supabase.from('agent_profiles').select('id', { count: 'exact', head: true })
      .eq('is_active', true),
    supabase.from('command_jobs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10),
    supabase.from('pipeline_runs').select('id', { count: 'exact', head: true })
      .in('status', ['running', 'paused']),
  ])

  // Bugünkü çalışmalar
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const { count: todayRuns } = await supabase
    .from('command_jobs')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', today.toISOString())

  const kpis = {
    activeJobs: activeJobsRes.count || 0,
    pendingApprovals: approvalsRes.count || 0,
    totalAgents: agentsRes.count || 0,
    todayRuns: todayRuns || 0,
    activePipelines: activePipelinesRes.count || 0,
  }

  return (
    <>
      <Header title="Command Center" subtitle="Tüm projelerinizi tek panelden yönetin" />
      <CommandDashboardClient
        kpis={kpis}
        recentJobs={recentJobsRes.data || []}
      />
    </>
  )
}
