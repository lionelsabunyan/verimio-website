import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)

  const platform = searchParams.get('platform')
  const status = searchParams.get('status')
  const from = searchParams.get('from') // tarih filtresi
  const to = searchParams.get('to')

  let query = supabase
    .from('social_posts')
    .select('*')
    .order('scheduled_at', { ascending: true })

  if (platform) query = query.eq('platform', platform)
  if (status) query = query.eq('status', status)
  if (from) query = query.gte('scheduled_at', from)
  if (to) query = query.lte('scheduled_at', to)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  // Field allowlist — sadece izin verilen alanları kabul et
  const { platform, status: postStatus, caption, hashtags, media_url, scheduled_at, post_type, blog_slug } = body
  const safeBody = {
    ...(platform && { platform }),
    ...(postStatus && { status: postStatus }),
    ...(caption && { caption }),
    ...(hashtags && { hashtags }),
    ...(media_url && { media_url }),
    ...(scheduled_at && { scheduled_at }),
    ...(post_type && { post_type }),
    ...(blog_slug && { blog_slug }),
  }

  const { data, error } = await supabase
    .from('social_posts')
    .insert(safeBody)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function PATCH(request: Request) {
  const supabase = await createClient()
  const { id, ...rawUpdates } = await request.json()

  // Field allowlist
  const ALLOWED_FIELDS = ['platform', 'status', 'caption', 'hashtags', 'media_url', 'scheduled_at', 'post_type', 'blog_slug']
  const updates: Record<string, unknown> = {}
  for (const key of ALLOWED_FIELDS) {
    if (key in rawUpdates) updates[key] = rawUpdates[key]
  }
  updates.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from('social_posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function DELETE(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const { error } = await supabase.from('social_posts').delete().eq('id', id!)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
