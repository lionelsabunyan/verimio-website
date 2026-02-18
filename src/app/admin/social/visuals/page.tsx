export const dynamic = 'force-dynamic'
import Header from '@/components/admin/Header'
import ImageGeneratorClient from '@/components/admin/ImageGeneratorClient'
import { createClient } from '@/lib/supabase/server'

export default async function VisualsPage() {
  const supabase = await createClient()

  const { data: assets } = await supabase
    .from('media_assets')
    .select('*')
    .eq('type', 'image')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <>
      <Header title="Görsel Üretim" subtitle="fal.ai — Recraft V4 + Flux.1" />
      <ImageGeneratorClient previousAssets={assets || []} />
    </>
  )
}
