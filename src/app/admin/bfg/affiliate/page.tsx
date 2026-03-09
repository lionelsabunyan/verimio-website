export const dynamic = 'force-dynamic'

import Header from '@/components/admin/Header'
import AffiliateClient from './AffiliateClient'
import { createBFGClient } from '@/lib/supabase/bfg-server'

export default async function AffiliatePage() {
  let rows: Record<string, unknown>[] = []
  let error = false

  try {
    const supabase = createBFGClient()
    const { data, error: err } = await supabase
      .from('affiliate_metrics')
      .select('*')
      .order('week_date', { ascending: false })
      .limit(50)

    if (err) error = true
    else rows = (data ?? []) as Record<string, unknown>[]
  } catch {
    error = true
  }

  return (
    <>
      <Header
        title="Affiliate Takibi"
        subtitle="beginnerfxguide.com — haftalık broker tıklama ve komisyon verileri"
      />
      <AffiliateClient rows={rows} error={error} />
    </>
  )
}
