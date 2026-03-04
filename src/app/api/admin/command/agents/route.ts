import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const project = searchParams.get('project')

  let query = supabase
    .from('agent_profiles')
    .select('*')
    .eq('is_active', true)
    .order('category', { ascending: true })

  if (project) query = query.eq('project', project)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ agents: data })
}
