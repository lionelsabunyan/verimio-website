import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { callLLM } from '@/lib/llm'

export async function POST() {
  const supabase = createServiceClient()

  // Ajans ayarlarını oku
  const { data: settings, error: settingsError } = await supabase
    .from('agency_settings')
    .select('*')
    .eq('site', 'verimio')
    .single()

  if (settingsError || !settings) {
    return NextResponse.json({ error: 'Ajans ayarları bulunamadı' }, { status: 500 })
  }

  const { tone, post_frequency, target_audience, platforms, competitors } = settings
  const count = Math.max(3, Math.min(post_frequency || 7, 14))
  const platformList = (platforms as string[])?.join(', ') || 'linkedin, instagram, twitter'
  const toneLabel =
    tone === 'friendly' ? 'Samimi ve yakın' :
    tone === 'expert'   ? 'Uzman ve otoriter' :
    'Profesyonel ve güvenilir'

  const competitorText =
    (competitors as string[])?.length > 0
      ? `Takip edilen rakipler (bunların yaptıklarından farklılaş): ${(competitors as string[]).join(', ')}`
      : ''

  // Bu haftanın Pazartesi tarihini hesapla
  const now = new Date()
  const monday = new Date(now)
  monday.setDate(now.getDate() - now.getDay() + 1)
  monday.setHours(0, 0, 0, 0)
  const weekStart = monday.toISOString().slice(0, 10)

  const prompt = `Sen Verimio'nun sosyal medya ajansısın. Verimio, Türk KOBİ'lere yapay zeka ve otomasyon danışmanlığı veren B2B bir şirkettir.

Hedef kitle: ${target_audience || 'KOBİ sahipleri ve yöneticiler'}
Marka tonu: ${toneLabel}
Aktif platformlar: ${platformList}
${competitorText}

Bu hafta (${weekStart} ile başlayan hafta) için ${count} adet sosyal medya gönderisi planla.
Gönderileri platformlara dengeli dağıt.

Her gönderi için şunları belirt:
- platform: linkedin | instagram | twitter
- content_type: post | thread | carousel | reel
- content_text: Gönderinin tam Türkçe metni (LinkedIn için 200-400 kelime, Instagram/Twitter için daha kısa)
- hashtags: 3-5 ilgili hashtag (dizi, # işareti YOK)
- visual_prompt: Görsel için DALL-E İngilizce prompt (1 cümle, professional business style)
- scheduled_at: Bu haftaki ideal yayın zamanı ISO 8601 formatında (+03:00 timezone), Pazartesi-Pazar 09:00-18:00 arası dağıt
- ai_reasoning: Bu içeriği neden önerdiğini 1 cümle Türkçe açıkla

Sadece JSON array dön, başka açıklama ekleme:
[
  {
    "platform": "linkedin",
    "content_type": "post",
    "content_text": "...",
    "hashtags": ["ai", "otomasyon", "kobi"],
    "visual_prompt": "Professional business team using AI technology in modern office",
    "scheduled_at": "2026-03-09T09:00:00+03:00",
    "ai_reasoning": "KOBİ'lerin AI'a ilgisi yüksek, pratik rehber içerikler en çok etkileşim alıyor."
  }
]`

  try {
    const text = await callLLM({
      task: 'content_suggestions',
      messages: [{ role: 'user', content: prompt }],
      maxTokens: 6000,
    })

    let posts: Array<{
      platform: string
      content_type: string
      content_text: string
      hashtags: string[]
      visual_prompt: string
      scheduled_at: string
      ai_reasoning: string
    }> = []

    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) posts = JSON.parse(jsonMatch[0])
    } catch {
      return NextResponse.json({ error: 'LLM yanıtı parse edilemedi', raw: text.slice(0, 200) }, { status: 500 })
    }

    if (!posts.length) {
      return NextResponse.json({ error: 'İçerik üretilemedi' }, { status: 500 })
    }

    const { data, error } = await supabase
      .from('content_queue')
      .insert(
        posts.map((p) => ({
          site: 'verimio',
          platform: p.platform,
          content_type: p.content_type,
          content_text: p.content_text,
          hashtags: p.hashtags || [],
          visual_prompt: p.visual_prompt,
          scheduled_at: p.scheduled_at,
          ai_reasoning: p.ai_reasoning,
          status: 'ai_generated',
        }))
      )
      .select()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ success: true, count: data?.length || 0 })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
