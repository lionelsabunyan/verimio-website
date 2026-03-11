export const dynamic = 'force-dynamic'
import Header from '@/components/admin/Header'
import ContentPipelineClient from '@/components/admin/ContentPipelineClient'
import { createServiceClient } from '@/lib/supabase/service'

export default async function ContentPipelinePage() {
  const supabase = createServiceClient()

  const [{ data: suggestions, error: sError }, { data: drafts, error: dError }] = await Promise.all([
    supabase
      .from('content_suggestions')
      .select('id, title, topic, content_type, keywords, priority, status, scheduled_at, created_at')
      .not('status', 'eq', 'rejected')
      .order('created_at', { ascending: false })
      .limit(200),
    supabase
      .from('content_drafts')
      .select('id, title, type, status, scheduled_at, created_at')
      .order('created_at', { ascending: false })
      .limit(100),
  ])

  return (
    <>
      <Header
        title="İçerik Pipeline"
        subtitle="Öneriden yayına — içerik akışını takip et"
      />
      <ContentPipelineClient
        suggestions={suggestions || []}
        drafts={drafts || []}
        tableError={!!(sError || dError)}
      />
    </>
  )
}
