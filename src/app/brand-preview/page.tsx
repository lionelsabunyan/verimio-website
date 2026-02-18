export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import BrandPreviewClient from './BrandPreviewClient'

export default function BrandPreviewPage({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  if (searchParams.token !== 'verimio2025') {
    redirect('/')
  }
  return <BrandPreviewClient />
}
