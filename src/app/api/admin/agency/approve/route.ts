import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

// PATCH — Tekil onayla / reddet
export async function PATCH(request: Request) {
  try {
    const { id, action, note, content_override } = await request.json()

    if (!id || !action) {
      return NextResponse.json({ error: 'id ve action gerekli' }, { status: 400 })
    }

    const supabase = createServiceClient()

    if (action === 'approve') {
      const updates: Record<string, unknown> = {
        status: 'approved',
        approved_at: new Date().toISOString(),
      }
      if (content_override) updates.content_text = content_override

      const { data, error } = await supabase
        .from('content_queue')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ success: true, item: data })
    }

    if (action === 'reject') {
      const { data, error } = await supabase
        .from('content_queue')
        .update({ status: 'rejected', rejection_note: note || '' })
        .eq('id', id)
        .select()
        .single()

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ success: true, item: data })
    }

    return NextResponse.json({ error: 'Geçersiz action (approve | reject)' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

// POST — Toplu onayla
export async function POST(request: Request) {
  try {
    const { ids } = await request.json()

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'ids array gerekli' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('content_queue')
      .update({ status: 'approved', approved_at: new Date().toISOString() })
      .in('id', ids)
      .select()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, count: data?.length || 0 })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
