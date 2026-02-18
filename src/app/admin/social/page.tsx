import { createClient } from '@/lib/supabase/server'
import Header from '@/components/admin/Header'
import SocialCalendarClient from '@/components/admin/SocialCalendarClient'

export default async function SocialPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('social_posts')
    .select('*')
    .order('scheduled_at', { ascending: true })

  return (
    <>
      <Header title="Sosyal Medya Merkezi" subtitle="4 platform editorial takvimi" />
      <SocialCalendarClient posts={posts || []} />
    </>
  )
}
