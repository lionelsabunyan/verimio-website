export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/admin/Header'
import JobDetailClient from '@/components/admin/command/JobDetailClient'

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const [jobRes, logsRes] = await Promise.all([
    supabase.from('command_jobs').select('*').eq('id', id).single(),
    supabase
      .from('command_job_logs')
      .select('*')
      .eq('job_id', id)
      .order('line_number', { ascending: true })
      .limit(500),
  ])

  if (jobRes.error) {
    return (
      <>
        <Header title="İş Bulunamadı" />
        <div className="p-6 text-center text-[#4C4462]">
          Bu ID ile eşleşen bir iş bulunamadı.
        </div>
      </>
    )
  }

  return (
    <>
      <Header
        title={jobRes.data.skill}
        subtitle={`${jobRes.data.project} — ${jobRes.data.id.slice(0, 8)}`}
      />
      <JobDetailClient job={jobRes.data} initialLogs={logsRes.data || []} />
    </>
  )
}
