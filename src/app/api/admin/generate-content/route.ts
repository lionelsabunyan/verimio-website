import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const { type, topic, keywords, tone = 'professional' } = await request.json()

  const SYSTEM_PROMPTS: Record<string, string> = {
    blog: `Sen Verimio için çalışan bir SEO odaklı içerik editörüsün. Türk KOBİ'lere AI dönüşümü hakkında bilgilendirici, pratik ve SEO uyumlu blog yazıları yazıyorsun. Ton: profesyonel ama erişilebilir. Türkçe yaz.`,
    script: `Sen Verimio için YouTube ve sosyal medya video scriptleri yazan bir içerik üreticisisin. Kısa, dikkat çekici, eğitici videolar için script oluşturuyorsun. Türkçe yaz.`,
    caption: `Sen Verimio'nun sosyal medya yöneticisisin. LinkedIn, Instagram ve Twitter için ilgi çekici, hashtag'li, CTA'lı Türkçe paylaşım metinleri yazıyorsun.`,
  }

  const USER_PROMPTS: Record<string, string> = {
    blog: `Konu: "${topic}"
Hedef kelimeler: ${keywords || 'AI otomasyon, KOBİ, verimlilik'}
Ton: ${tone}

Şu formatı takip et:
1. SEO başlığı (60 karakter max)
2. Meta açıklama (155 karakter max)
3. Ana başlıklar (H2, H3)
4. Blog yazısı (800-1200 kelime)
5. Sonuç + CTA

JSON formatında dön: { "title": "...", "meta_description": "...", "keywords": ["..."], "body": "..." }`,

    script: `Video konusu: "${topic}"
Platform: YouTube Short (60 sn) veya uzun video (8-12 dk)
Ton: ${tone}

Şu formatı takip et:
- Hook (ilk 3 saniye)
- Problem tanımı
- Çözüm sunumu
- Somut örnek
- CTA

JSON formatında dön: { "title": "...", "hook": "...", "body": "...", "cta": "..." }`,

    caption: `Konu: "${topic}"
Platform: LinkedIn, Instagram, Twitter için ayrı versiyonlar
Ton: ${tone}
Hashtag'ler ekle (5-10 tane)

JSON formatında dön: { "linkedin": "...", "instagram": "...", "twitter": "..." }`,
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 4096,
        system: SYSTEM_PROMPTS[type] || SYSTEM_PROMPTS.blog,
        messages: [{ role: 'user', content: USER_PROMPTS[type] || USER_PROMPTS.blog }],
      }),
    })

    const result = await response.json()
    const text = result.content?.[0]?.text || ''

    // JSON parse et
    let parsed: Record<string, unknown> = {}
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) parsed = JSON.parse(jsonMatch[0])
    } catch {
      parsed = { body: text }
    }

    // Supabase'e kaydet
    const supabase = await createClient()
    const { data } = await supabase.from('content_drafts').insert({
      type,
      title: (parsed.title as string) || topic,
      body: (parsed.body as string) || text,
      meta_description: parsed.meta_description as string,
      keywords: (parsed.keywords as string[]) || (keywords ? keywords.split(',') : []),
      status: 'draft',
    }).select().single()

    return NextResponse.json({ success: true, content: parsed, draft_id: data?.id })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
