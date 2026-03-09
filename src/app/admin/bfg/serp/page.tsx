export const dynamic = 'force-dynamic'

import Header from '@/components/admin/Header'
import SerpClient from './SerpClient'
import { createBFGClient } from '@/lib/supabase/bfg-server'

export default async function SerpPage() {
  let rows: Record<string, unknown>[] = []
  let error = false

  try {
    const supabase = createBFGClient()
    const { data, error: err } = await supabase
      .from('serp_snapshots')
      .select('*')
      .order('snapshot_date', { ascending: false })
      .limit(200)

    if (err) error = true
    else rows = (data ?? []) as Record<string, unknown>[]
  } catch {
    error = true
  }

  return (
    <>
      <Header
        title="SERP Pozisyonları"
        subtitle="beginnerfxguide.com — haftalık keyword sıralama snapshot'ları"
      />
      <SerpClient rows={rows} error={error} />
    </>
  )
}
