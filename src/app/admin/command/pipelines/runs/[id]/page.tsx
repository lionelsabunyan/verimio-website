import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import PipelineRunDetailClient from '@/components/admin/command/PipelineRunDetailClient'

export const dynamic = 'force-dynamic'

export default async function PipelineRunDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = await createClient()
  const { id } = await params

  // Run detayi
  const { data: run } = await supabase
    .from('pipeline_runs')
    .select('*')
    .eq('id', id)
    .single()

  if (!run) notFound()

  // Iliskili job'lar
  const { data: jobs } = await supabase
    .from('command_jobs')
    .select('*')
    .eq('pipeline_run_id', id)
    .order('step_index', { ascending: true })

  // Iliskili onaylar
  const { data: approvals } = await supabase
    .from('approvals')
    .select('*')
    .eq('pipeline_run_id', id)
    .order('created_at', { ascending: true })

  return (
    <div>
      <PipelineRunDetailClient
        initialRun={run}
        initialJobs={jobs || []}
        initialApprovals={approvals || []}
      />
    </div>
  )
}
