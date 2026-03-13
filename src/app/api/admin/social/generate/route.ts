/**
 * POST /api/admin/social/generate
 * Verilen konu veya blog slug'ından LinkedIn + Instagram + Twitter içerikleri üretir.
 * Tüm 3 platform aynı pair_id ile social_posts'a kaydedilir (status: pending_approval).
 * post_type: 'single' (default) | 'carousel' — carousel modda Instagram için 5 slide üretilir.
 */

import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { callLLM } from '@/lib/llm'
import { BLOG_POSTS } from '@/lib/constants'
import { randomUUID } from 'crypto'
const uuidv4 = () => randomUUID()

const FAL_KEY = process.env.FAL_KEY

export interface CarouselSlide {
  type: 'hook' | 'problem' | 'point' | 'proof' | 'recap' | 'cta'
  headline: string
  body: string
  bg_url?: string | null
}

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
  target.setDate(now.getDate() + offset + 1)

  const day = target.getDay()
  if (day === 0) target.setDate(target.getDate() + 1)
  if (day === 6) target.setDate(target.getDate() + 2)

  // Platform bazlı optimal saat (UTC, TR = UTC+3)
  const hours: Record<string, number> = {
    linkedin:  7,  // 10:00 TR
    instagram: 11, // 14:00 TR
    twitter:   8,  // 11:00 TR
  }
  target.setHours(hours[platform] || 8, 0, 0, 0)
  return target.toISOString()
}

// Platform bazlı doğru fal.ai görsel boyutları
const IMAGE_SIZE: Record<string, string> = {
  linkedin:  'landscape_16_9', // 1200×628
  instagram: 'square_hd',      // 1080×1080
  twitter:   'landscape_4_3',  // 1200×900
}

async function generateVisual(prompt: string, platform: 'linkedin' | 'instagram' | 'twitter'): Promise<string | null> {
  if (!FAL_KEY) return null
  try {
    // Realistic photo as slide background — brand overlay applied in render-slide renderer
    const bgPrompt = `Professional business photography, ${prompt}, modern corporate office environment, no text no signs no logos, clean composition, soft natural lighting, shallow depth of field, high quality`
    const res = await fetch('https://fal.run/fal-ai/recraft-v3', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: bgPrompt,
        image_size: IMAGE_SIZE[platform] ?? 'square_hd',
        style: 'realistic_image',
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
    const { topic, blog_slug, post_type = 'single' } = body as {
      topic?: string
      blog_slug?: string
      post_type?: 'single' | 'carousel'
    }

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

    const isCarousel = post_type === 'carousel'

    // ── LLM ile içerik üret ───────────────────────────────────────────────────
    const systemPrompt = `Sen Verimio'nun sosyal medya uzmanısın. Verimio, yapay zeka ve otomasyon dönüşümüne ihtiyaç duyan Türk şirketlerine B2B danışmanlık veriyor.

Hedef kitle: Şirket sahipleri, genel müdürler, operasyon direktörleri.
Marka tonu: Profesyonel ama erişilebilir. Teknik jargondan kaçın. Somut fayda vurgula.
Dil: Türkçe.`

    const carouselExtra = isCarousel ? `

───── CAROUSEL İÇERİĞİ ─────

Aşağıdaki 5 formattan konuya EN UYGUN olanı seç:

FORMAT A — LİSTELEME  : Hook → Problem → 4 Point (numaralı) → Proof → Özet → CTA  (toplam 8)
FORMAT B — ÖNCE/SONRA : Hook → Problem → 2 Point (önce/sonra/adımlar) → Proof → Özet → CTA  (toplam 7-8)
FORMAT C — ÇERÇEVE    : Hook → Problem → 4 Point (framework bileşenleri) → Recap → CTA  (toplam 8)
FORMAT D — MİT-GERÇEK : Hook → 4 Problem (mit + çürütme) → Proof → Recap → CTA  (toplam 8)
FORMAT E — REHBER     : Hook → Problem → 4 Point (adım adım) → Proof → CTA  (toplam 7-8)

SLIDE TİPLERİ VE KURALLARI:
• hook     — Slide 1. İstatistik/karşı-sezgisel/acı nokta sorusu. Merak bırak, cevap verme.
             headline: 6-8 kelime | body: 10-20 kelime, "→ devam için kaydır" ipucu içersin
• problem  — Hedefin yaşadığı gerçek sorunu tanımla. Acı noktayı somutlaştır.
             headline: 6-8 kelime | body: 15-25 kelime
• point    — Tek bir fikir/adım/bileşen. Numaralı: "01.", "02." vb.
             headline: "01. [6-7 kelime]" | body: 20-30 kelime, somut ve eyleme yönelik
• proof    — headline: Etkileyici bir İSTATİSTİK veya RAKAM (örn: "%40 daha az maliyet", "3 haftada ROI")
             body: Bağlamı açıkla, nereden geldiğini kısaca belirt (15-20 kelime)
• recap    — "3 şeyi hatırla:" başlığı. body: 3 madde, her satır ayrı satırda (\\n ile ayır)
             Örn: "Otomasyon strateji meselesidir\\nKüçük başla, hızlı ölç\\nİnsan faktörü her zaman önce gelir"
• cta      — headline: "Ücretsiz AI Analizi Al" veya "Check-Up İçin DM At"
             body: 1 kısa destekleyici cümle

MEŞRU HOOK TİPLERİ (birini seç):
① İstatistik: "Türk şirketlerin %X'i... Sadece %Y'si... Fark nerede?"
② Karşı-sezgi: "AI danışmanı tutmak, yazılım satın almaktan daha ucuzdur."
③ Acı nokta: "Ekibiniz haftada kaç saatini tekrar eden işlere harcıyor?"
④ Sonuç önce: "Müşterimiz 3 ayda 40 saatlik haftalık yükü sıfırladı. Nasıl →"

carousel_slides JSON alanı (MUTLAKA 7-8 slide):
[
  {"type":"hook","headline":"...","body":"..."},
  {"type":"problem","headline":"...","body":"..."},
  {"type":"point","headline":"01. ...","body":"..."},
  {"type":"point","headline":"02. ...","body":"..."},
  {"type":"point","headline":"03. ...","body":"..."},
  {"type":"point","headline":"04. ...","body":"..."},
  {"type":"proof","headline":"[rakam/istatistik]","body":"..."},
  {"type":"cta","headline":"Ücretsiz AI Analizi Al","body":"..."}
]` : ''

    const userPrompt = `Konu: ${contentTopic}

Bu konu için 3 farklı platform paylaşımı yaz:

1. LinkedIn (900-1300 karakter):
- İlk cümle: istatistik veya karşı-sezgisel iddia (kaydırma durdursun)
- 3-4 somut madde veya numaralı liste
- Kapanışta CTA: "Ücretsiz analiz için DM atın" veya "Ayrıntılar profilimde"
- 3 hashtag (küçük harf, Türkçe + İngilizce)

2. Instagram (120-160 karakter + hashtag):
- Tek güçlü cümle — net ve ezberlenebilir
- Emoji: 2-3 adet
- 6-8 hashtag

3. Twitter/X (maksimum 270 karakter):
- Keskin bir fikir veya provoke edici soru
- 2-3 hashtag

Görseller için kısa bir İngilizce fotoğraf tarifi yaz (subject + ortam, marka rengi belirtme).
${carouselExtra}

Sadece JSON dön:
{
  "linkedin": { "content": "...", "hashtags": ["...", "...", "..."] },
  "instagram": { "content": "...", "hashtags": ["...", "...", "...", "...", "..."] },
  "twitter": { "content": "...", "hashtags": ["...", "...", "..."] },
  "visual_prompt": "..."${isCarousel ? ',\n  "carousel_slides": [...]' : ''}
}`

    const raw = await callLLM({
      task: 'content_generation',
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
      maxTokens: isCarousel ? 5000 : 3000,
    })

    // JSON parse
    let parsed: {
      linkedin:  { content: string; hashtags: string[] }
      instagram: { content: string; hashtags: string[] }
      twitter:   { content: string; hashtags: string[] }
      visual_prompt: string
      carousel_slides?: CarouselSlide[]
    }

    try {
      const match = raw.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('JSON bulunamadı')
      parsed = JSON.parse(match[0])
    } catch {
      return NextResponse.json({ error: 'LLM yanıtı parse edilemedi', raw: raw.slice(0, 400) }, { status: 500 })
    }

    // ── Görseller (paralel, platform-doğru boyutlarda) ───────────────────────
    const [liVisual, igVisual, twVisual] = await Promise.all([
      generateVisual(parsed.visual_prompt || contentTopic, 'linkedin'),
      generateVisual(parsed.visual_prompt || contentTopic, 'instagram'),
      generateVisual(parsed.visual_prompt || contentTopic, 'twitter'),
    ])

    const visualByPlatform: Record<string, string | null> = {
      linkedin:  liVisual,
      instagram: igVisual,
      twitter:   twVisual,
    }

    // ── Supabase'e kaydet ─────────────────────────────────────────────────────
    const supabase = createServiceClient()
    const pairId = uuidv4()

    // Carousel: her slide için ayrı fotoğraf üret (square, paralel)
    let carouselSlides: CarouselSlide[] | null = null
    if (isCarousel && parsed.carousel_slides) {
      const slidePhotos = await Promise.all(
        parsed.carousel_slides.map(s =>
          generateVisual(`${s.headline} — ${s.body}`, 'instagram')
        )
      )
      carouselSlides = parsed.carousel_slides.map((s, i) => ({
        ...s,
        bg_url: slidePhotos[i] ?? null,
      }))
    }

    const platforms: PlatformContent[] = [
      { platform: 'linkedin',  content: parsed.linkedin.content,  hashtags: parsed.linkedin.hashtags,  scheduled_at: getScheduledAt('linkedin', 0) },
      { platform: 'instagram', content: parsed.instagram.content, hashtags: parsed.instagram.hashtags, scheduled_at: getScheduledAt('instagram', 1) },
      { platform: 'twitter',   content: parsed.twitter.content,   hashtags: parsed.twitter.hashtags,   scheduled_at: getScheduledAt('twitter', 2) },
    ]

    const { data, error } = await supabase
      .from('social_posts')
      .insert(
        platforms.map(p => ({
          platform:      p.platform,
          content:       p.content,
          hashtags:      p.hashtags,
          pair_id:       pairId,
          source_type:   sourceType,
          blog_slug:     sourceBlogSlug,
          visual_url:    visualByPlatform[p.platform],
          visual_prompt: parsed.visual_prompt,
          scheduled_at:  p.scheduled_at,
          status:        'pending_approval',
          post_type:     isCarousel ? 'carousel' : 'single',
          carousel_data: isCarousel && carouselSlides ? carouselSlides : null,
        }))
      )
      .select('id, platform, status, scheduled_at, post_type')

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({
      success: true,
      pair_id: pairId,
      posts:   data,
      carousel: isCarousel,
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
