export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/admin/Header'
import CRMClient from '@/components/admin/CRMClient'

export default async function CRMPage() {
  const supabase = await createClient()

  const { data: leads, count } = await supabase
    .from('leads')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <>
      <Header title="CRM — Lead Yönetimi" subtitle={`Toplam ${count || 0} lead`} />
      <CRMClient leads={leads || []} />
    </>
  )
}
