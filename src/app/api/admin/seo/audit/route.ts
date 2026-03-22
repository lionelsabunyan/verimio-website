import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { BLOG_POSTS } from '@/lib/constants'

export const maxDuration = 60

const BASE_URL = 'https://www.verimio.com.tr'
const SITE_URL = process.env.GSC_SITE_URL || 'sc-domain:verimio.com.tr'

const STATIC_PAGES = [
  '/',
  '/hizmetler',
  '/hakkimizda',
  '/analiz',
  '/blog',
  '/sss',
  '/iletisim',
  '/gizlilik',
  '/kullanim-sartlari',
]

interface InspectionResult {
  url: string
  verdict: string
  coverageState: string
  lastCrawlTime: string
}

interface PageAnalytics {
  url: string
  clicks: number
  impressions: number
  position: number
  ctr: number
}

interface PositionDrop {
  url: string
  currentPos: number
  previousPos: number
  drop: number
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  })
}

async function createNotionTask(title: string, priority: string) {
  const token = process.env.NOTION_TOKEN
  const dbId = '31304c58-4ec9-81a1-b847-c1a28cd431e1'
  if (!token) return

  await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: dbId },
      properties: {
        'Görev': { title: [{ text: { content: title } }] },
        'Durum': { select: { name: 'Backlog' } },
        'Alan': { select: { name: '🌐 Ürün & Site' } },
        'Proje': { select: { name: 'SEO Altyapısı' } },
        'Öncelik': { select: { name: priority } },
      },
    }),
  })
}

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

export async function GET(request: Request) {
  // Cron secret kontrolü
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const gscJson = process.env.GSC_SERVICE_ACCOUNT_JSON
  if (!gscJson) {
    return NextResponse.json({ error: 'GSC_SERVICE_ACCOUNT_JSON eksik' }, { status: 500 })
  }

  try {
    const credentials = JSON.parse(gscJson)
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    })
    const sc = google.searchconsole({ version: 'v1', auth })

    // === 1. URL Inspection — İndeks Durumu ===
    const allUrls = [
      ...STATIC_PAGES.map(p => `${BASE_URL}${p}`),
      ...BLOG_POSTS.map(post => `${BASE_URL}/blog/${post.slug}`),
    ]

    const inspectionResults: InspectionResult[] = []
    const indexErrors: InspectionResult[] = []

    for (let i = 0; i < allUrls.length; i++) {
      const url = allUrls[i]
      try {
        const res = await sc.urlInspection.index.inspect({
          requestBody: { inspectionUrl: url, siteUrl: SITE_URL },
        })
        const r = res.data.inspectionResult
        const result: InspectionResult = {
          url: url.replace(BASE_URL, ''),
          verdict: r?.indexStatusResult?.verdict || 'UNKNOWN',
          coverageState: r?.indexStatusResult?.coverageState || '-',
          lastCrawlTime: r?.indexStatusResult?.lastCrawlTime || '-',
        }
        inspectionResults.push(result)
        if (result.verdict !== 'PASS') indexErrors.push(result)
      } catch (err) {
        const result: InspectionResult = {
          url: url.replace(BASE_URL, ''),
          verdict: 'API_ERROR',
          coverageState: String(err).slice(0, 80),
          lastCrawlTime: '-',
        }
        inspectionResults.push(result)
        indexErrors.push(result)
      }

      if (i < allUrls.length - 1) await sleep(1200)
    }

    // === 2. Search Analytics — Bu hafta vs geçen hafta ===
    const now = new Date()
    const fmt = (d: Date) => d.toISOString().split('T')[0]

    // Bu hafta: son 7 gün
    const thisEnd = new Date(now)
    thisEnd.setDate(thisEnd.getDate() - 1)
    const thisStart = new Date(thisEnd)
    thisStart.setDate(thisStart.getDate() - 6)

    // Geçen hafta: 8-14 gün önce
    const prevEnd = new Date(now)
    prevEnd.setDate(prevEnd.getDate() - 8)
    const prevStart = new Date(prevEnd)
    prevStart.setDate(prevStart.getDate() - 6)

    let thisWeekPages: PageAnalytics[] = []
    let prevWeekPages: PageAnalytics[] = []
    let weeklyClicks = 0
    let weeklyImpressions = 0
    let avgPosition = 0

    try {
      const [thisRes, prevRes, summaryRes] = await Promise.all([
        sc.searchanalytics.query({
          siteUrl: SITE_URL,
          requestBody: {
            startDate: fmt(thisStart), endDate: fmt(thisEnd),
            dimensions: ['page'], rowLimit: 25,
          },
        }),
        sc.searchanalytics.query({
          siteUrl: SITE_URL,
          requestBody: {
            startDate: fmt(prevStart), endDate: fmt(prevEnd),
            dimensions: ['page'], rowLimit: 25,
          },
        }),
        sc.searchanalytics.query({
          siteUrl: SITE_URL,
          requestBody: { startDate: fmt(thisStart), endDate: fmt(thisEnd) },
        }),
      ])

      thisWeekPages = (thisRes.data.rows || []).map(r => ({
        url: r.keys?.[0]?.replace(BASE_URL, '') || '',
        clicks: r.clicks ?? 0,
        impressions: r.impressions ?? 0,
        position: r.position ?? 0,
        ctr: r.ctr ?? 0,
      }))

      prevWeekPages = (prevRes.data.rows || []).map(r => ({
        url: r.keys?.[0]?.replace(BASE_URL, '') || '',
        clicks: r.clicks ?? 0,
        impressions: r.impressions ?? 0,
        position: r.position ?? 0,
        ctr: r.ctr ?? 0,
      }))

      const s = summaryRes.data.rows?.[0]
      if (s) {
        weeklyClicks = s.clicks ?? 0
        weeklyImpressions = s.impressions ?? 0
        avgPosition = s.position ?? 0
      }
    } catch {
      // Analytics opsiyonel
    }

    // === 3. Pozisyon Karşılaştırması ===
    const prevMap = new Map(prevWeekPages.map(p => [p.url, p]))
    const positionDrops: PositionDrop[] = []

    for (const page of thisWeekPages) {
      const prev = prevMap.get(page.url)
      if (prev && prev.position > 0 && page.position > 0) {
        const drop = page.position - prev.position
        if (drop > 5) {
          positionDrops.push({
            url: page.url,
            currentPos: page.position,
            previousPos: prev.position,
            drop,
          })
        }
      }
    }

    // === 4. Telegram Bildirimi ===
    const passed = inspectionResults.filter(r => r.verdict === 'PASS').length
    const total = inspectionResults.length
    const date = now.toLocaleDateString('tr-TR', {
      day: 'numeric', month: 'long', year: 'numeric',
    })

    let message = `<b>📊 Haftalık SEO Audit — ${date}</b>\n\n`

    // İndeks durumu
    message += `<b>İndeks Durumu:</b>\n`
    message += `✅ Indexed: ${passed}/${total}\n`
    if (indexErrors.length > 0) {
      message += `⚠️ Sorunlu: ${indexErrors.length}\n`
      for (const e of indexErrors) {
        message += `  • <code>${e.url}</code> → ${e.coverageState}\n`
      }
    } else {
      message += `✨ Tüm sayfalar indekslenmiş!\n`
    }

    // Haftalık performans
    message += `\n<b>Son 7 Gün:</b>\n`
    message += `👆 Tıklama: ${weeklyClicks}\n`
    message += `👁 Gösterim: ${weeklyImpressions}\n`
    message += `📍 Ort. Pozisyon: ${avgPosition.toFixed(1)}\n`

    // Top sayfalar
    if (thisWeekPages.length > 0) {
      message += `\n<b>Top 5 Sayfa:</b>\n`
      for (const p of thisWeekPages.slice(0, 5)) {
        const prev = prevMap.get(p.url)
        let posChange = ''
        if (prev && prev.position > 0) {
          const diff = p.position - prev.position
          if (diff > 2) posChange = ` ↓${diff.toFixed(0)}`
          else if (diff < -2) posChange = ` ↑${Math.abs(diff).toFixed(0)}`
        }
        message += `  • <code>${p.url}</code>\n    ${p.clicks} tık | ${p.impressions} gör | #${p.position.toFixed(1)}${posChange}\n`
      }
    }

    // Pozisyon düşüşleri
    if (positionDrops.length > 0) {
      message += `\n🚨 <b>Pozisyon Düşüşleri (5+ basamak):</b>\n`
      for (const d of positionDrops) {
        message += `  • <code>${d.url}</code>\n    #${d.previousPos.toFixed(1)} → #${d.currentPos.toFixed(1)} (↓${d.drop.toFixed(0)})\n`
      }
    }

    await sendTelegram(message)

    // === 5. Notion Görev Oluştur (sorun varsa) ===
    // İndeks hataları için
    if (indexErrors.length > 0) {
      await createNotionTask(
        `SEO: ${indexErrors.length} sayfa indeks dışı (${date})`,
        'Yüksek'
      )
    }

    // Pozisyon düşüşleri için ayrı görevler
    for (const drop of positionDrops) {
      await createNotionTask(
        `SEO İnceleme: ${drop.url} (↓${drop.drop.toFixed(0)} basamak)`,
        'Yüksek'
      )
    }

    return NextResponse.json({
      success: true,
      date: fmt(now),
      total,
      indexed: passed,
      indexErrors: indexErrors.length,
      indexErrorPages: indexErrors,
      positionDrops,
      analytics: { weeklyClicks, weeklyImpressions, avgPosition },
      topPages: thisWeekPages.slice(0, 10),
    })
  } catch (err) {
    console.error('[SEO Audit] Fatal error:', err)
    await sendTelegram(`❌ <b>SEO Audit HATA</b>\n${String(err).slice(0, 200)}`)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
