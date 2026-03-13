/**
 * POST /api/admin/social/generate
 * Verilen konu veya blog slug'ından LinkedIn + Instagram + Twitter içerikleri üretir.
 * Tüm 3 platform aynı pair_id ile social_posts'a kaydedilir (status: pending_approval).
 */

import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { callLLM } from '@/lib/llm'
import { BLOG_POSTS } from '@/lib/constants'
import { randomUUID } from 'crypto'
const uuidv4 = () => randomUUID()

const FAL_KEY = process.env.FAL_KEY

interface PlatformContent {
  platform: 'linkedin' | 'instagram' | 'twitter'
  content: string
  hashtags: string[]
  scheduled_at: string
}

// Hafta içi optimal paylaşım saatleri (Türkiye saati, UTC+3)
function getScheduledAt(platform: 'linkedin' | 'instagram' | 'twitter', offset: number): string {
  const now = new Date()
  const target = new Date(now)
  target.setDate(now.getDate() + offset + 1) // ertesi günden başla

  // Hafta sonu ise Pazartesi'ye kaydır
  const day = target.getDay()
  if (day === 0) target.setDate(target.getDate() + 1)
  if (day === 6) target.setDate(target.getDate() + 2)

  // Platform bazlı optimal saat (UTC, TR = UTC+3)
  const hours: Record<string, number> = {
    linkedin: 7,   // 10:00 TR
    instagram: 11, // 14:00 TR
    twitter: 8,    // 11:00 TR
  }
  target.setHours(hours[platform] || 8, 0, 0, 0)
  return target.toISOString()
}

async function generateVisual(prompt: string): Promise<string | null> {
  if (!FAL_KEY) return null
  try {
    const brandPrompt = `Abstract geometric digital illustration, no text no words no letters no typography, dark deep indigo background #1E0A46 to #2E1065 gradient, purple geometric elements #8B5CF6 at low opacity, vivid lime accent #A3E635 on 2-3 focal points, professional minimal. Context: ${prompt}`
    const res = await fetch('https://fal.run/fal-ai/recraft-v3', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: brandPrompt,
        image_size: 'landscape_16_9',
        style: 'digital_illustration',
        num_images: 1,
      }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.images?.[0]?.url ?? null
  } catch {
    return null
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { topic, blog_slug } = body as { topic?: string; blog_slug?: string }

    // Konu kaynağını belirle
    let contentTopic = topic || ''
    let sourceBlogSlug = blog_slug || null
    let sourceType: 'manual' | 'blog' = 'manual'

    if (blog_slug) {
      const post = BLOG_POSTS.find(p => p.slug === blog_slug)
      if (!post) {
        return NextResponse.json({ error: 'Blog yazısı bulunamadı' }, { status: 404 })
      }
      contentTopic = `${post.title} — Kategori: ${post.category}`
      sourceType = 'blog'
    }

    if (!contentTopic.trim()) {
      return NextResponse.json({ error: 'topic veya blog_slug gerekli' }, { status: 400 })
    }

    // LLM ile 3 platform içeriği üret
    const systemPrompt = `Sen Verimio'nun sosyal medya uzmanısın. Verimio, yapay zeka ve otomasyon dönüşümüne ihtiyaç duyan Türk şirketlerine B2B danışmanlık veriyor.

Hedef kitle: Şirket sahipleri, genel müdürler, operasyon direktörleri.
Marka tonu: Profesyonel ama erişilebilir. Teknik jargondan kaçın. Somut fayda vurgula.
Dil: Türkçe.`

    const userPrompt = `Konu: ${contentTopic}

Bu konu için 3 farklı platform paylaşımı yaz:

1. LinkedIn (1000-1500 karakter):
- Açıcı bir soru veya çarpıcı istatistikle başla
- 3-4 somut nokta veya liste
- Kapanışta CTA: "DM'den ulaşın" veya "Linkte detaylar"
- 3 hashtag (küçük harf, Türkçe ve İngilizce karışık)

2. Instagram (100-150 karakter + hashtag):
- Tek güçlü cümle veya kısa hook
- Emoji kullan (maksimum 2-3)
- 5-7 hashtag

3. Twitter/X (maksimum 270 karakter):
- Tek keskin fikir veya provoke edici soru
- Thread'e çekilebilecek format
- 2-3 hashtag

Görseller için de kısa bir İngilizce prompt yaz (1 cümle, görsel içerik tarif eder, marka renkleri: deep indigo + lime #A3E635).

Sadece JSON dön:
{
  "linkedin": { "content": "...", "hashtags": ["...", "...", "..."] },
  "instagram": { "content": "...", "hashtags": ["...", "...", "...", "...", "..."] },
  "twitter": { "content": "...", "hashtags": ["...", "...", "..."] },
  "visual_prompt": "..."
}`

    const raw = await callLLM({
      task: 'content_generation',
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
      maxTokens: 3000,
    })

    // JSON parse
    let parsed: {
      linkedin: { content: string; hashtags: string[] }
      instagram: { content: string; hashtags: string[] }
      twitter: { content: string; hashtags: string[] }
      visual_prompt: string
    }

    try {
      const match = raw.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('JSON bulunamadı')
      parsed = JSON.parse(match[0])
    } catch {
      return NextResponse.json({ error: 'LLM yanıtı parse edilemedi', raw: raw.slice(0, 400) }, { status: 500 })
    }

    // Görsel üret (paralel, hata durumunda null döner)
    const visualUrl = await generateVisual(parsed.visual_prompt || contentTopic)

    // Supabase'e kaydet
    const supabase = createServiceClient()
    const pairId = uuidv4()

    const platforms: PlatformContent[] = [
      { platform: 'linkedin',  content: parsed.linkedin.content,  hashtags: parsed.linkedin.hashtags,  scheduled_at: getScheduledAt('linkedin', 0) },
      { platform: 'instagram', content: parsed.instagram.content, hashtags: parsed.instagram.hashtags, scheduled_at: getScheduledAt('instagram', 1) },
      { platform: 'twitter',   content: parsed.twitter.content,   hashtags: parsed.twitter.hashtags,   scheduled_at: getScheduledAt('twitter', 2) },
    ]

    const { data, error } = await supabase
      .from('social_posts')
      .insert(
        platforms.map(p => ({
          platform: p.platform,
          content: p.content,
          hashtags: p.hashtags,
          pair_id: pairId,
          source_type: sourceType,
          blog_slug: sourceBlogSlug,
          visual_url: visualUrl,
          visual_prompt: parsed.visual_prompt,
          scheduled_at: p.scheduled_at,
          status: 'pending_approval',
        }))
      )
      .select('id, platform, status, scheduled_at')

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({
      success: true,
      pair_id: pairId,
      posts: data,
      visual_url: visualUrl,
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
