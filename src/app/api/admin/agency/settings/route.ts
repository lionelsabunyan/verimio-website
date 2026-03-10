import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

export async function GET() {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('agency_settings')
    .select('*')
    .eq('site', 'verimio')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ settings: data })
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { competitors, tone, post_frequency, target_audience, platforms } = body

    const supabase = createServiceClient()
    const updates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    }

    if (competitors  !== undefined) updates.competitors     = competitors
    if (tone)                       updates.tone            = tone
    if (post_frequency)             updates.post_frequency  = Number(post_frequency)
    if (target_audience)            updates.target_audience = target_audience
    if (platforms)                  updates.platforms       = platforms

    const { data, error } = await supabase
      .from('agency_settings')
      .update(updates)
      .eq('site', 'verimio')
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, settings: data })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
