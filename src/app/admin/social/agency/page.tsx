import { createServiceClient } from '@/lib/supabase/service'
import AgencyDashboardClient from '@/components/admin/AgencyDashboardClient'

export const dynamic = 'force-dynamic'

export default async function AgencyPage() {
  const supabase = createServiceClient()

  // Fetch queue (all statuses for stats + recent published)
  const { data: queueData } = await supabase
    .from('content_queue')
    .select('id, platform, content_type, content_text, status, scheduled_at, created_at')
    .eq('site', 'verimio')
    .order('created_at', { ascending: false })
    .limit(100)

  const queue = queueData || []

  const stats = {
    ai_generated: queue.filter(q => q.status === 'ai_generated').length,
    approved:     queue.filter(q => q.status === 'approved').length,
    published:    queue.filter(q => q.status === 'published').length,
    rejected:     queue.filter(q => q.status === 'rejected').length,
  }

  return <AgencyDashboardClient queue={queue} stats={stats} />
}
