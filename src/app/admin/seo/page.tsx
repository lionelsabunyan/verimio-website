export const dynamic = 'force-dynamic'

import Header from '@/components/admin/Header'
import SEOClient from '@/components/admin/SEOClient'
import { getGscData } from '@/lib/gsc'

export default async function SEOPage() {
  const gscData = await getGscData()

  return (
    <>
      <Header
        title="SEO Dashboard"
        subtitle="Google Search Console trafik ve sıralama metrikleri — son 28 gün"
      />
      <SEOClient data={gscData} />
    </>
  )
}
