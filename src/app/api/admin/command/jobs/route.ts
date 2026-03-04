import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)

  const project = searchParams.get('project')
  const status = searchParams.get('status')
  const limit = parseInt(searchParams.get('limit') || '20')

  let query = supabase
    .from('command_jobs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (project) query = query.eq('project', project)
  if (status) query = query.eq('status', status)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ jobs: data })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { project, skill, input, priority } = body

  if (!project || !skill) {
    return NextResponse.json(
      { error: 'project ve skill zorunlu' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('command_jobs')
    .insert({
      project,
      skill,
      input: input || {},
      priority: priority || 5,
      status: 'queued',
      created_by: 'panel',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ job: data })
}
