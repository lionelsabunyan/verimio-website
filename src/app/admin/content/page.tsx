export const dynamic = 'force-dynamic'
import Header from '@/components/admin/Header'
import ContentGeneratorClient from '@/components/admin/ContentGeneratorClient'
import { createClient } from '@/lib/supabase/server'

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const supabase = await createClient()

  const [params, { data: drafts }] = await Promise.all([
    searchParams,
    supabase
      .from('content_drafts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20),
  ])

  const initialTopic = params.topic || ''
  const initialType = params.type || ''

  return (
    <>
      <Header title="İçerik Üretimi" subtitle="Claude API ile blog, script ve caption" />
      <ContentGeneratorClient
        drafts={drafts || []}
        initialTopic={initialTopic}
        initialType={initialType}
      />
    </>
  )
}
