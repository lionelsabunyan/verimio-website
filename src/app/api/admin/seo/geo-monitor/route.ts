import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 60

const TRACKED_QUERIES = [
  'Türkiye KOBİ AI danışmanlık firmaları',
  'Verimio ne iş yapar',
  'n8n Türkçe rehber',
  'kurumsal yapay zeka danışmanlığı İstanbul',
  'AI çağrı merkezi Türkiye',
  'KVKK uyumlu chatbot',
  'otomasyon danışmanlığı KOBİ',
]

const VERIMIO_DOMAIN = 'verimio.com.tr'

interface PerplexityCitation {
  url?: string
  title?: string
}

interface PerplexityResponse {
  id?: string
  choices?: Array<{
    message?: { content?: string }
  }>
  citations?: Array<string | PerplexityCitation>
}

async function queryPerplexity(query: string, apiKey: string): Promise<PerplexityResponse | null> {
  const res = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar',
      messages: [
        {
          role: 'system',
          content:
            'Türkçe cevap ver. Kaynak URL listesi döndür. Cevabın Türk kullanıcılarına yönelik olsun.',
        },
        { role: 'user', content: query },
      ],
      return_citations: true,
    }),
  })
  if (!res.ok) {
    console.error('[geo-monitor] Perplexity error:', res.status, await res.text().catch(() => ''))
    return null
  }
  return res.json()
}

function analyzeMention(response: PerplexityResponse): {
  mentioned: boolean
  rank: number | null
  citationUrl: string | null
  excerpt: string
} {
  const citations = response.citations ?? []
  let rank: number | null = null
  let citationUrl: string | null = null

  citations.forEach((c, i) => {
    const url = typeof c === 'string' ? c : c.url
    if (url?.includes(VERIMIO_DOMAIN) && rank === null) {
      rank = i + 1
      citationUrl = url
    }
  })

  const content = response.choices?.[0]?.message?.content ?? ''
  const mentionedInText = /verimio/i.test(content)
  const mentioned = rank !== null || mentionedInText

  return {
    mentioned,
    rank,
    citationUrl,
    excerpt: content.slice(0, 400),
  }
}

/**
 * GET /api/admin/seo/geo-monitor
 *
 * Perplexity'de takip edilen sorguları çalıştırır, Verimio bahsi varsa brand_mentions tablosuna kaydeder.
 * Cron: Haftada bir (Pazartesi 10:00 TR). Auth: Bearer CRON_SECRET.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const perplexityKey = process.env.PERPLEXITY_API_KEY
  if (!perplexityKey) {
    return NextResponse.json(
      { error: 'PERPLEXITY_API_KEY eksik — endpoint hazır ama key bekliyor' },
      { status: 503 }
    )
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )

  const results: Array<{
    query: string
    mentioned: boolean
    rank: number | null
    citationUrl: string | null
  }> = []

  for (const query of TRACKED_QUERIES) {
    const response = await queryPerplexity(query, perplexityKey)
    if (!response) {
      results.push({ query, mentioned: false, rank: null, citationUrl: null })
      continue
    }

    const analysis = analyzeMention(response)
    results.push({
      query,
      mentioned: analysis.mentioned,
      rank: analysis.rank,
      citationUrl: analysis.citationUrl,
    })

    await supabase.from('brand_mentions').insert({
      platform: 'perplexity',
      query,
      mentioned: analysis.mentioned,
      rank: analysis.rank,
      citation_url: analysis.citationUrl,
      response_excerpt: analysis.excerpt,
      raw_response: response as unknown as Record<string, unknown>,
    })

    // Rate limit koruma
    await new Promise((r) => setTimeout(r, 1500))
  }

  const mentionCount = results.filter((r) => r.mentioned).length

  // Telegram özet
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN
  const telegramChat = process.env.TELEGRAM_CHAT_ID
  if (telegramToken && telegramChat) {
    const lines = results.map((r) =>
      r.mentioned
        ? `✅ ${r.query}${r.rank ? ` (rank ${r.rank})` : ''}`
        : `❌ ${r.query}`
    )
    const text = `<b>🔍 Perplexity Brand Mention</b>\n\n${mentionCount}/${results.length} sorguda Verimio bahsi.\n\n${lines.join('\n')}`
    await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramChat,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })
  }

  return NextResponse.json({
    success: true,
    checkedAt: new Date().toISOString(),
    totalQueries: results.length,
    mentionCount,
    results,
  })
}
