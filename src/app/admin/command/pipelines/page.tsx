import { createClient } from '@/lib/supabase/server'
import PipelinesClient from '@/components/admin/command/PipelinesClient'

export const dynamic = 'force-dynamic'

export default async function PipelinesPage() {
  const supabase = await createClient()

  // Pipeline şablonları
  const { data: pipelines } = await supabase
    .from('pipelines')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  // Aktif run'lar
  const { data: activeRuns } = await supabase
    .from('pipeline_runs')
    .select('*')
    .in('status', ['running', 'paused'])
    .order('created_at', { ascending: false })

  // Son tamamlanan run'lar
  const { data: recentRuns } = await supabase
    .from('pipeline_runs')
    .select('*')
    .in('status', ['completed', 'failed', 'cancelled'])
    .order('completed_at', { ascending: false })
    .limit(10)

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#1A1030]">
        <div>
          <h1 className="text-white text-xl font-bold">Pipeline&apos;lar</h1>
          <p className="text-[#4C4462] text-sm mt-1">Skill zincirlerini tek tuşla çalıştır</p>
        </div>
      </div>
      <PipelinesClient
        pipelines={pipelines || []}
        activeRuns={activeRuns || []}
        recentRuns={recentRuns || []}
      />
    </div>
  )
}
