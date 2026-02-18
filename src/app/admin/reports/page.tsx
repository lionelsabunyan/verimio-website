export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/admin/Header'
import Link from 'next/link'

export default async function ReportsPage() {
  const supabase = await createClient()

  const { data: leads } = await supabase
    .from('leads')
    .select('id, email, sector, status, pdf_url, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  const withReport = leads?.filter(l => l.pdf_url) || []
  const withoutReport = leads?.filter(l => !l.pdf_url) || []

  return (
    <>
      <Header title="PDF Raporlar" subtitle={`${withReport.length} rapor gönderildi, ${withoutReport.length} bekliyor`} />
      <main className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Toplam Lead', value: leads?.length || 0, color: 'text-white' },
            { label: 'Rapor Gönderildi', value: withReport.length, color: 'text-green-400' },
            { label: 'Rapor Bekliyor', value: withoutReport.length, color: 'text-yellow-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl p-5">
              <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-[#4C4462] text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Raporu olanlar */}
        <div className="bg-[#0F0A1E] border border-[#1A1030] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1A1030]">
            <h2 className="text-white font-medium">Raporlar</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1A1030]">
                {['Email', 'Sektör', 'Durum', 'Tarih', 'Rapor'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[#4C4462] text-xs font-medium uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1030]">
              {leads?.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#1A1030]/50 transition-colors">
                  <td className="px-5 py-3">
                    <Link href={`/admin/crm/${lead.id}`} className="text-white hover:text-[#A3E635] text-sm transition-colors">
                      {lead.email}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-[#78716C] text-sm">{lead.sector || '—'}</td>
                  <td className="px-5 py-3 text-[#78716C] text-sm">{lead.status}</td>
                  <td className="px-5 py-3 text-[#78716C] text-sm">
                    {new Date(lead.created_at).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-5 py-3">
                    {lead.pdf_url ? (
                      <a href={lead.pdf_url} target="_blank" rel="noopener" className="text-[#A3E635] text-xs hover:underline">
                        PDF ↗
                      </a>
                    ) : (
                      <span className="text-red-400 text-xs">Bekliyor</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
