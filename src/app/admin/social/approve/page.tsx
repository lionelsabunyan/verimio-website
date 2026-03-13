export const dynamic = 'force-dynamic'
import { createServiceClient } from '@/lib/supabase/service'
import Header from '@/components/admin/Header'
import ApprovalBoardClient from '@/components/admin/social/ApprovalBoardClient'

export default async function ApprovePage() {
  const supabase = createServiceClient()

  // Onay bekleyen postlar
  const { data: pendingData } = await supabase
    .from('social_posts')
    .select('id, platform, content, hashtags, pair_id, visual_url, visual_prompt, blog_slug, source_type, scheduled_at, status, created_at')
    .eq('status', 'pending_approval')
    .order('created_at', { ascending: false })
    .limit(60)

  // Bu haftanın kuyruğu (onaylı + planlandı)
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1)
  weekStart.setHours(0, 0, 0, 0)

  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6)
  weekEnd.setHours(23, 59, 59, 999)

  const { data: weekData } = await supabase
    .from('social_posts')
    .select('id, platform, content, status, scheduled_at')
    .in('status', ['approved', 'scheduled', 'published'])
    .gte('scheduled_at', weekStart.toISOString())
    .lte('scheduled_at', weekEnd.toISOString())
    .order('scheduled_at', { ascending: true })

  return (
    <>
      <Header
        title="Onay Kuyruğu"
        subtitle={`${(pendingData || []).length} içerik onay bekliyor`}
      />
      <ApprovalBoardClient
        pendingPosts={pendingData || []}
        weekQueue={weekData || []}
      />
    </>
  )
}
