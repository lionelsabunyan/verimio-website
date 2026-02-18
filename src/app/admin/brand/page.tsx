export const dynamic = 'force-dynamic'

import Header from '@/components/admin/Header'
import BrandClient from '@/components/admin/BrandClient'

export default function BrandPage() {
  return (
    <>
      <Header title="Marka Kimliği" subtitle="Logo, renk sistemi, sosyal medya şablonları ve platform kılavuzları" />
      <BrandClient />
    </>
  )
}
