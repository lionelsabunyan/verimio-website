export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/admin/Header'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: lead, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !lead) notFound()

  const fields = [
    { label: 'Email', value: lead.email },
    { label: 'Telefon', value: lead.phone || '—' },
    { label: 'Şirket Adı', value: lead.company_name || '—' },
    { label: 'Şirket Websitesi', value: lead.company_website || '—' },
    { label: 'Sektör', value: lead.sector || '—' },
    { label: 'Ekip Büyüklüğü', value: lead.team_size || '—' },
    { label: 'Öncelikli Alan', value: lead.priority_area || '—' },
    { label: 'Beklenti', value: lead.expectation || '—' },
    { label: 'Zaman Planı', value: lead.timeline || '—' },
    { label: 'Toplantı İstiyor', value: lead.wants_call ? 'Evet' : 'Hayır' },
    { label: 'Durum', value: lead.status },
    { label: 'Kayıt Tarihi', value: new Date(lead.created_at).toLocaleString('tr-TR') },
    { label: 'UTM Kaynak', value: lead.utm_source || '—' },
    { label: 'UTM Kampanya', value: lead.utm_campaign || '—' },
  ]

  return (
    <>
      <Header title={lead.email} subtitle="Lead Detayı" />
      <main className="p-6 space-y-6">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/admin/crm" className="text-[#4C4462] hover:text-white transition-colors">
            ← CRM
          </Link>
          <span className="text-[#1A1030]">/</span>
          <span className="text-[#78716C]">{lead.email}</span>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Temel Bilgiler */}
          <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-6">
            <h2 className="text-white font-medium mb-4">Temel Bilgiler</h2>
            <div className="space-y-3">
              {fields.map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4">
                  <span className="text-[#4C4462] text-sm whitespace-nowrap">{label}</span>
                  <span className="text-white text-sm text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Eylemler */}
          <div className="space-y-4">
            {lead.pdf_url && (
              <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-6">
                <h2 className="text-white font-medium mb-3">Rapor</h2>
                <a
                  href={lead.pdf_url}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-2 bg-[#2E1065] hover:bg-[#3D1580] text-white px-4 py-3 rounded-lg transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  PDF Raporu Aç
                </a>
              </div>
            )}

            {lead.biggest_pain && (
              <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-6">
                <h2 className="text-white font-medium mb-3">En Büyük Problem</h2>
                <p className="text-[#78716C] text-sm leading-relaxed">{lead.biggest_pain}</p>
              </div>
            )}

            {lead.notes && (
              <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-6">
                <h2 className="text-white font-medium mb-3">Notlar</h2>
                <p className="text-[#78716C] text-sm leading-relaxed">{lead.notes}</p>
              </div>
            )}

            {lead.analysis_json && (
              <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-6">
                <h2 className="text-white font-medium mb-3">Claude Analizi</h2>
                <pre className="text-[#78716C] text-xs overflow-auto max-h-48 leading-relaxed">
                  {JSON.stringify(lead.analysis_json, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
