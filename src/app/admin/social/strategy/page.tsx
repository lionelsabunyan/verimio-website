import { createServiceClient } from '@/lib/supabase/service'
import StrategyClient from '@/components/admin/StrategyClient'

export const dynamic = 'force-dynamic'

export default async function StrategyPage() {
  const supabase = createServiceClient()

  const { data: settings } = await supabase
    .from('agency_settings')
    .select('tone, post_frequency, target_audience, platforms, competitors')
    .eq('site', 'verimio')
    .single()

  const initialSettings = settings || {
    tone: 'professional',
    post_frequency: 7,
    target_audience: '',
    platforms: ['linkedin', 'instagram', 'twitter'],
    competitors: [],
  }

  return <StrategyClient initialSettings={initialSettings} />
}
