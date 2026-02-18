import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const { prompt, model = 'fal-ai/minimax/video-01', platform } = await request.json()

  try {
    // fal.ai video üretimi (async — queue tabanlı)
    const submitResponse = await fetch(`https://queue.fal.run/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    })

    if (!submitResponse.ok) {
      const err = await submitResponse.text()
      return NextResponse.json({ error: err }, { status: submitResponse.status })
    }

    const { request_id } = await submitResponse.json()

    // Supabase'e pending kayıt
    const supabase = await createClient()
    await supabase.from('media_assets').insert({
      type: 'video',
      prompt,
      model,
      url: `pending:${request_id}`,
      platform: platform || null,
    })

    return NextResponse.json({
      success: true,
      request_id,
      status_url: `https://queue.fal.run/${model}/requests/${request_id}`,
      message: 'Video üretimi başlatıldı. Birkaç dakika içinde hazır olacak.',
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

// Video durumu sorgula
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const requestId = searchParams.get('request_id')
  const model = searchParams.get('model') || 'fal-ai/minimax/video-01'

  if (!requestId) {
    return NextResponse.json({ error: 'request_id gerekli' }, { status: 400 })
  }

  const response = await fetch(`https://queue.fal.run/${model}/requests/${requestId}`, {
    headers: { 'Authorization': `Key ${process.env.FAL_KEY}` },
  })

  const result = await response.json()
  return NextResponse.json(result)
}
