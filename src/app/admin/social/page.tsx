export const dynamic = 'force-dynamic'
import { createServiceClient } from '@/lib/supabase/service'
import Header from '@/components/admin/Header'
import SocialHubClient from '@/components/admin/social/SocialHubClient'

export default async function SocialPage() {
  const supabase = createServiceClient()

  const [postsRes, statsRes] = await Promise.all([
    supabase
      .from('social_posts')
      .select('id, platform, content, status, scheduled_at, created_at')
      .order('created_at', { ascending: false })
      .limit(20),
    supabase
      .from('social_posts')
      .select('status'),
  ])

  const posts = postsRes.data || []
  const allPosts = statsRes.data || []

  const stats = {
    pending_approval: allPosts.filter(p => p.status === 'pending_approval').length,
    approved:         allPosts.filter(p => p.status === 'approved').length,
    scheduled:        allPosts.filter(p => p.status === 'scheduled').length,
    published:        allPosts.filter(p => p.status === 'published').length,
  }

  return (
    <>
      <Header title="Sosyal Medya" subtitle="LinkedIn · Instagram · Twitter/X içerik pipeline'ı" />
      <SocialHubClient posts={posts} stats={stats} />
    </>
  )
}
