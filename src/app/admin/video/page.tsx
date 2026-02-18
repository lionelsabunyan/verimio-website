export const dynamic = 'force-dynamic'
import Header from '@/components/admin/Header'
import VideoGeneratorClient from '@/components/admin/VideoGeneratorClient'
import { createClient } from '@/lib/supabase/server'

export default async function VideoPage() {
  const supabase = await createClient()

  const { data: videos } = await supabase
    .from('media_assets')
    .select('*')
    .eq('type', 'video')
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <>
      <Header title="Video Merkezi" subtitle="AI video üretimi + script + thumbnail" />
      <VideoGeneratorClient previousVideos={videos || []} />
    </>
  )
}
