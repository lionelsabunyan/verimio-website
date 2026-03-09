import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { callLLM } from '@/lib/llm'

// GET — Mevcut önerileri listele
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const type = searchParams.get('type')

  const supabase = createServiceClient()
  let query = supabase
    .from('content_suggestions')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) query = query.eq('status', status)
  if (type) query = query.eq('content_type', type)

  const { data, error } = await query.limit(100)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ suggestions: data })
}

// POST — Claude ile yeni öneriler üret
export async function POST() {
  const prompt = `Sen Verimio'nun içerik stratejisti olarak görev yapıyorsun. Verimio, Türk KOBİ'lere yapay zeka ve otomasyon danışmanlığı veren bir B2B şirketidir.

Hedef kitle: 10-200 çalışanlı Türk KOBİ'lerin sahip ve yöneticileri
Verimio'nun hizmetleri: AI dönüşüm danışmanlığı, süreç otomasyonu, ChatGPT entegrasyonu, müşteri hizmetleri AI'ı, raporlama otomasyonu

Şu anda güncel ve ilgi çekici olabilecek 8 adet içerik önerisi oluştur.
Her öneri farklı içerik tipi olsun: blog (3 adet), linkedin (2 adet), script (2 adet), newsletter (1 adet)

Her öneri için şunları belirt:
- title: Çarpıcı, tıklanabilir başlık (Türkçe)
- topic: Konunun detaylı açıklaması (2-3 cümle)
- content_type: blog | script | caption | linkedin | newsletter
- keywords: En az 4 anahtar kelime (dizi)
- priority: high | medium | low (SEO değeri ve güncel ilgiye göre)
- ai_reasoning: Bu konunun neden şu an önemli olduğunu açıkla (1-2 cümle)

JSON array olarak dön:
[
  {
    "title": "...",
    "topic": "...",
    "content_type": "...",
    "keywords": ["..."],
    "priority": "...",
    "ai_reasoning": "..."
  }
]`

  try {
    const text = await callLLM({
      task: 'content_suggestions',
      messages: [{ role: 'user', content: prompt }],
    })

    let suggestions: Array<{
      title: string
      topic: string
      content_type: string
      keywords: string[]
      priority: string
      ai_reasoning: string
    }> = []

    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) suggestions = JSON.parse(jsonMatch[0])
    } catch {
      return NextResponse.json({ error: 'Claude yanıtı parse edilemedi' }, { status: 500 })
    }

    // Supabase'e kaydet
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('content_suggestions')
      .insert(suggestions.map(s => ({
        title: s.title,
        topic: s.topic,
        content_type: s.content_type,
        keywords: s.keywords || [],
        priority: s.priority || 'medium',
        ai_reasoning: s.ai_reasoning,
        status: 'pending',
      })))
      .select()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ success: true, count: data?.length || 0, suggestions: data })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

// PATCH — Öneri durumu veya notlarını güncelle
export async function PATCH(request: Request) {
  const { id, status, notes } = await request.json()
  if (!id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 })

  const supabase = createServiceClient()
  const updates: Record<string, string> = {}
  if (status) updates.status = status
  if (notes !== undefined) updates.notes = notes

  const { data, error } = await supabase
    .from('content_suggestions')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, suggestion: data })
}
