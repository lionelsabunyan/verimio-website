export const dynamic = 'force-dynamic'

import Header from '@/components/admin/Header'
import BrokersClient from './BrokersClient'
import { createBFGClient } from '@/lib/supabase/bfg-server'

export default async function BrokersPage() {
  let rows: Record<string, unknown>[] = []
  let error = false

  try {
    const supabase = createBFGClient()
    // Try common table names for broker data
    const { data, error: err } = await supabase
      .from('brokers')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (err) error = true
    else rows = (data ?? []) as Record<string, unknown>[]
  } catch {
    error = true
  }

  return (
    <>
      <Header
        title="Broker İncelemeleri"
        subtitle="beginnerfxguide.com — broker listesi ve inceleme durumları"
      />
      <BrokersClient rows={rows} error={error} />
    </>
  )
}
