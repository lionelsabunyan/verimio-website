import { createServiceClient } from '@/lib/supabase/service'
import ApprovalQueueClient from '@/components/admin/ApprovalQueueClient'

export const dynamic = 'force-dynamic'

export default async function ApprovePage() {
  const supabase = createServiceClient()

  const { data } = await supabase
    .from('content_queue')
    .select('*')
    .eq('site', 'verimio')
    .eq('status', 'ai_generated')
    .order('scheduled_at', { ascending: true })
    .limit(100)

  return <ApprovalQueueClient initialQueue={data || []} />
}
