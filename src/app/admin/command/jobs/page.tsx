export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/admin/Header'
import JobsListClient from '@/components/admin/command/JobsListClient'

export default async function JobsPage() {
  const supabase = await createClient()

  const { data: jobs } = await supabase
    .from('command_jobs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <>
      <Header title="Jobs" subtitle="Tüm iş geçmişi ve kuyruk" />
      <JobsListClient initialJobs={jobs || []} />
    </>
  )
}
