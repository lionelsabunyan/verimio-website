import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status') || 'pending'

  const { data, error } = await supabase
    .from('approvals')
    .select('*, command_jobs(skill, project)')
    .eq('status', status)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ approvals: data })
}

export async function PATCH(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { id, status, notes } = body

  if (!id || !['approved', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'id ve status (approved/rejected) zorunlu' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('approvals')
    .update({
      status,
      notes: notes || null,
      decided_at: new Date().toISOString(),
      decided_via: 'panel',
    })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ approval: data })
}
