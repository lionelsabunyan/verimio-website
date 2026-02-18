import { createClient } from '@/lib/supabase/server'
import Header from '@/components/admin/Header'
import MeetingsClient from '@/components/admin/MeetingsClient'

export default async function MeetingsPage() {
  const supabase = await createClient()

  const { data: meetings } = await supabase
    .from('meetings')
    .select(`
      *,
      leads:lead_id (email, sector)
    `)
    .order('scheduled_at', { ascending: true })

  return (
    <>
      <Header title="Toplantı Takibi" subtitle="Calendly entegrasyonu" />
      <MeetingsClient meetings={meetings || []} />
    </>
  )
}
