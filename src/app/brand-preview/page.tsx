export const dynamic = 'force-dynamic'
import BrandPreviewClient from './BrandPreviewClient'

export default async function BrandPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams
  if (params.token !== 'verimio2025') {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0514', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui', color: '#FFFFFF' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Erişim Kısıtlı</div>
          <div style={{ fontSize: 14, color: '#4C4462' }}>URL&apos;e ?token=... ekleyin</div>
        </div>
      </div>
    )
  }
  return <BrandPreviewClient />
}
