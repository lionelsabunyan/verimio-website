export const dynamic = 'force-dynamic'
import Header from '@/components/admin/Header'
import ContentSuggestionsClient from '@/components/admin/ContentSuggestionsClient'
import { createServiceClient } from '@/lib/supabase/service'

export default async function ContentSuggestionsPage() {
  const supabase = createServiceClient()
  const { data: suggestions, error } = await supabase
    .from('content_suggestions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <>
      <Header
        title="İçerik Önerileri"
        subtitle="Claude'un önerdiği içerik fikirleri — onayla, reddet veya hemen üret"
      />
      <ContentSuggestionsClient initialSuggestions={suggestions || []} tableError={!!error} />
    </>
  )
}
