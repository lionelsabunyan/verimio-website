import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const [jobRes, logsRes] = await Promise.all([
    supabase.from('command_jobs').select('*').eq('id', id).single(),
    supabase
      .from('command_job_logs')
      .select('*')
      .eq('job_id', id)
      .order('line_number', { ascending: true })
      .limit(500),
  ])

  if (jobRes.error) {
    return NextResponse.json({ error: jobRes.error.message }, { status: 404 })
  }

  return NextResponse.json({
    job: jobRes.data,
    logs: logsRes.data || [],
  })
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const body = await request.json()

  // Sadece iptal izni
  if (body.status === 'cancelled') {
    const { data, error } = await supabase
      .from('command_jobs')
      .update({ status: 'cancelled', completed_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ job: data })
  }

  return NextResponse.json({ error: 'Geçersiz işlem' }, { status: 400 })
}
