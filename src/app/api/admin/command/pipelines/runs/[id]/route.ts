import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Pipeline run detayı + ilişkili job'lar
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { id } = await params

  // Run detayı
  const { data: run, error: runErr } = await supabase
    .from('pipeline_runs')
    .select('*')
    .eq('id', id)
    .single()

  if (runErr || !run) {
    return NextResponse.json({ error: 'Run bulunamadı' }, { status: 404 })
  }

  // İlişkili job'lar
  const { data: jobs } = await supabase
    .from('command_jobs')
    .select('id, skill, status, step_index, started_at, completed_at, error, output')
    .eq('pipeline_run_id', id)
    .order('step_index', { ascending: true })

  // İlişkili onaylar
  const { data: approvals } = await supabase
    .from('approvals')
    .select('id, status, title, description, data, decided_at, notes, created_at')
    .eq('pipeline_run_id', id)
    .order('created_at', { ascending: true })

  return NextResponse.json({ run, jobs: jobs || [], approvals: approvals || [] })
}

// Pipeline run iptal
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { id } = await params
  const body = await request.json()

  if (body.action !== 'cancel') {
    return NextResponse.json({ error: 'Desteklenen action: cancel' }, { status: 400 })
  }

  // Run'ı cancelled yap (sadece running veya paused ise)
  const { data: run, error: runErr } = await supabase
    .from('pipeline_runs')
    .update({
      status: 'cancelled',
      completed_at: new Date().toISOString(),
    })
    .eq('id', id)
    .in('status', ['running', 'paused'])
    .select()
    .single()

  if (runErr || !run) {
    return NextResponse.json(
      { error: 'Run bulunamadı veya zaten tamamlanmış' },
      { status: 404 }
    )
  }

  // Kuyrukta bekleyen job'ları da iptal et
  await supabase
    .from('command_jobs')
    .update({
      status: 'cancelled',
      completed_at: new Date().toISOString(),
    })
    .eq('pipeline_run_id', id)
    .eq('status', 'queued')

  // Bekleyen onayları da iptal et
  await supabase
    .from('approvals')
    .update({
      status: 'rejected',
      notes: 'Pipeline iptal edildi',
      decided_at: new Date().toISOString(),
      decided_via: 'system',
    })
    .eq('pipeline_run_id', id)
    .eq('status', 'pending')

  return NextResponse.json({ run })
}
