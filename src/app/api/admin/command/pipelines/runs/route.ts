import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Pipeline run'larını listele
export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)

  const status = searchParams.get('status')
  const project = searchParams.get('project')
  const limit = parseInt(searchParams.get('limit') || '20')

  let query = supabase
    .from('pipeline_runs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (status) query = query.eq('status', status)
  if (project) query = query.eq('project', project)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ runs: data })
}
