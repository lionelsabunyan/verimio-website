export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/admin/Header'
import AgentsGridClient from '@/components/admin/command/AgentsGridClient'

export default async function AgentsPage() {
  const supabase = await createClient()

  const { data: agents } = await supabase
    .from('agent_profiles')
    .select('*')
    .eq('is_active', true)
    .order('category', { ascending: true })
    .order('display_name', { ascending: true })

  return (
    <>
      <Header title="Agent Kadrosu" subtitle="Tüm AI agent'ları ve skill'leri" />
      <AgentsGridClient agents={agents || []} />
    </>
  )
}
