import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 120

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
const MODEL = 'perplexity/sonar'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

interface OpenRouterAnnotation {
  type?: string
  url_citation?: { url?: string; title?: string; content?: string }
}

interface OpenRouterResponse {
  id?: string
  model?: string
  choices?: Array<{
    message?: {
      content?: string
      annotations?: OpenRouterAnnotation[]
    }
  }>
  citations?: string[]
  usage?: { total_tokens?: number }
}

async function queryOpenRouter(
  query: string,
  apiKey: string
): Promise<OpenRouterResponse | null> {
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://www.verimio.com.tr',
      'X-Title': 'Verimio GEO Monitor',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content:
            'Türkçe yanıt ver. Türkiye pazarına yönelik firmaları ve kaynakları öne çıkar. Mümkün olduğunca spesifik şirket isimleri ve URL ver.',
        },
        { role: 'user', content: query },
      ],
    }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    console.error('[geo-monitor] OpenRouter error:', res.status, text.slice(0, 200))
    return null
  }
  return res.json()
}

interface MentionAnalysis {
  mentioned: boolean
  rank: number | null
  citationUrl: string | null
  excerpt: string
  allCitations: string[]
}

function analyzeMention(response: OpenRouterResponse): MentionAnalysis {
  const choice = response.choices?.[0]?.message
  const content = choice?.content ?? ''

  // OpenRouter Perplexity responses: citations ya choices[0].message.annotations
  // (url_citation tipinde) ya da top-level `citations` alanında dizi olarak gelir.
  const urlsFromAnnotations = (choice?.annotations ?? [])
    .map((a) => a.url_citation?.url)
    .filter((u): u is string => typeof u === 'string')

  const urlsFromTopLevel = Array.isArray(response.citations)
    ? response.citations
    : []

  const allCitations = Array.from(
    new Set([...urlsFromAnnotations, ...urlsFromTopLevel])
  )

  let rank: number | null = null
  let citationUrl: string | null = null
  allCitations.forEach((url, i) => {
    if (url.includes(VERIMIO_DOMAIN) && rank === null) {
      rank = i + 1
      citationUrl = url
    }
  })

  const mentionedInText = /verimio/i.test(content)
  return {
    mentioned: rank !== null || mentionedInText,
    rank,
    citationUrl,
    excerpt: content.replace(/\s+/g, ' ').trim().slice(0, 300),
    allCitations,
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * GET /api/admin/seo/geo-monitor
 *
 * OpenRouter üzerinden Perplexity sonar'a 7 takip sorgusu sorar, Verimio bahsi
 * var mı / citation listesinde var mı analiz eder, brand_mentions tablosuna kaydeder,
 * Telegram'a zengin özet gönderir.
 *
 * Cron: Pazartesi 07:00 UTC (10:00 TR). Auth: Bearer CRON_SECRET.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OPENROUTER_API_KEY eksik' },
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
    excerpt: string
  }> = []

  for (const query of TRACKED_QUERIES) {
    const response = await queryOpenRouter(query, apiKey)
    if (!response) {
      results.push({
        query,
        mentioned: false,
        rank: null,
        citationUrl: null,
        excerpt: 'API hatası',
      })
      continue
    }

    const analysis = analyzeMention(response)
    results.push({
      query,
      mentioned: analysis.mentioned,
      rank: analysis.rank,
      citationUrl: analysis.citationUrl,
      excerpt: analysis.excerpt,
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

    await new Promise((r) => setTimeout(r, 1500))
  }

  const mentionCount = results.filter((r) => r.mentioned).length
  const citedCount = results.filter((r) => r.citationUrl !== null).length

  // Önceki hafta karşılaştırma — inline
  let prev: { mentioned: number; total: number } | null = null
  {
    const prevEnd = new Date()
    prevEnd.setDate(prevEnd.getDate() - 2)
    const prevStart = new Date()
    prevStart.setDate(prevStart.getDate() - 9)

    const { data } = await supabase
      .from('brand_mentions')
      .select('mentioned')
      .eq('platform', 'perplexity')
      .gte('checked_at', prevStart.toISOString())
      .lte('checked_at', prevEnd.toISOString())

    if (data && data.length > 0) {
      prev = {
        mentioned: data.filter((r) => r.mentioned === true).length,
        total: data.length,
      }
    }
  }

  let trendLine = ''
  if (prev && prev.total > 0) {
    const diff = mentionCount - prev.mentioned
    const arrow = diff > 0 ? '↑' : diff < 0 ? '↓' : '→'
    trendLine = `\n📊 Geçen hafta: ${prev.mentioned}/${prev.total} ${arrow} bu hafta: ${mentionCount}/${results.length}`
  }

  // Telegram özeti
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN
  const telegramChat = process.env.TELEGRAM_CHAT_ID
  if (telegramToken && telegramChat) {
    const date = new Date().toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    const lines = results.map((r) => {
      const icon = r.mentioned ? '✅' : '⬜'
      const rankPart = r.rank !== null ? ` <b>[kaynak #${r.rank}]</b>` : ''
      const citationPart = r.citationUrl
        ? `\n    🔗 <code>${escapeHtml(r.citationUrl.replace('https://www.', '').replace('https://', ''))}</code>`
        : ''
      return `${icon} ${escapeHtml(r.query)}${rankPart}${citationPart}`
    })

    const text = [
      `<b>🔍 GEO Monitor — Perplexity</b>`,
      `<i>${date}</i>`,
      ``,
      `<b>${mentionCount}/${results.length}</b> sorguda Verimio bahsi`,
      citedCount > 0 ? `<b>${citedCount}/${results.length}</b> sorguda kaynak olarak alıntı` : '',
      trendLine,
      ``,
      lines.join('\n'),
      ``,
      mentionCount === 0
        ? `<i>Hiçbir sorguda görünmüyorsun. İçerik + backlink + llms-full.txt fırsatı.</i>`
        : mentionCount < results.length / 2
          ? `<i>Yarıdan az sorguda görünüyorsun. Hedef sorgular için pillar içerik düşün.</i>`
          : `<i>Güçlü GEO görünürlüğü — bu hafta kazanılan sorguları not al.</i>`,
    ]
      .filter(Boolean)
      .join('\n')

    await fetch(
      `https://api.telegram.org/bot${telegramToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChat,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      }
    )
  }

  return NextResponse.json({
    success: true,
    checkedAt: new Date().toISOString(),
    model: MODEL,
    totalQueries: results.length,
    mentionCount,
    citedCount,
    previousWeek: prev,
    results,
  })
}
