export const dynamic = 'force-dynamic'
import Header from '@/components/admin/Header'
import ContentGeneratorClient from '@/components/admin/ContentGeneratorClient'
import { createClient } from '@/lib/supabase/server'

export default async function ContentPage() {
  const supabase = await createClient()

  const { data: drafts } = await supabase
    .from('content_drafts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <>
      <Header title="İçerik Üretimi" subtitle="Claude API ile blog, script ve caption" />
      <ContentGeneratorClient drafts={drafts || []} />
    </>
  )
}
