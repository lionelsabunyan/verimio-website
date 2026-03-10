import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status   = searchParams.get('status')
    const platform = searchParams.get('platform')

    const supabase = createServiceClient()
    let query = supabase
      .from('content_queue')
      .select('*')
      .eq('site', 'verimio')
      .order('scheduled_at', { ascending: true })

    if (status)   query = query.eq('status', status)
    if (platform) query = query.eq('platform', platform)

    const { data, error } = await query.limit(200)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ queue: data || [] })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
