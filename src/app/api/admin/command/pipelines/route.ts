import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Pipeline şablonlarını listele
export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const project = searchParams.get('project')

  let query = supabase
    .from('pipelines')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (project) query = query.eq('project', project)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ pipelines: data })
}

// Yeni pipeline şablonu oluştur
export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { project, name, description, steps } = body

  if (!project || !name || !steps || !Array.isArray(steps) || steps.length === 0) {
    return NextResponse.json(
      { error: 'project, name ve steps (dizi) zorunlu' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('pipelines')
    .insert({
      project,
      name,
      description: description || null,
      steps,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ pipeline: data })
}
