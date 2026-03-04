export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/admin/Header'
import ApprovalsClient from '@/components/admin/command/ApprovalsClient'

export default async function ApprovalsPage() {
  const supabase = await createClient()

  const [pendingRes, recentRes] = await Promise.all([
    supabase
      .from('approvals')
      .select('*, command_jobs(skill, project)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false }),
    supabase
      .from('approvals')
      .select('*, command_jobs(skill, project)')
      .neq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(20),
  ])

  return (
    <>
      <Header title="Onaylar" subtitle="Pipeline onay kontrol noktaları" />
      <ApprovalsClient
        pendingApprovals={pendingRes.data || []}
        recentApprovals={recentRes.data || []}
      />
    </>
  )
}
