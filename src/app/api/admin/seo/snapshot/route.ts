import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { createClient } from '@supabase/supabase-js'
import { BLOG_POSTS } from '@/lib/constants'

export const maxDuration = 60

const BASE_URL = 'https://www.verimio.com.tr'
const SITE = process.env.GSC_SITE_URL || 'sc-domain:verimio.com.tr'

const STATIC_PAGES = [
  '/', '/hizmetler', '/ai-koclugu', '/hakkimizda', '/analiz',
  '/blog', '/sss', '/iletisim', '/gizlilik', '/kullanim-sartlari',
]

/**
 * GET /api/admin/seo/snapshot
 *
 * Günlük SEO snapshot — GSC analytics (son 28 gün özet + top pages/queries)
 * → Supabase.daily_analytics tablosuna UPSERT.
 *
 * Cron: Pazartesi 09:00 TR (06:00 UTC) — vercel.json içinde tanımlanır.
 * Auth: Bearer CRON_SECRET.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const gscJson = process.env.GSC_SERVICE_ACCOUNT_JSON
  if (!gscJson) {
    return NextResponse.json({ error: 'GSC_SERVICE_ACCOUNT_JSON eksik' }, { status: 500 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Supabase credentials eksik' }, { status: 500 })
  }

  try {
    const credentials = JSON.parse(gscJson)
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    })
    const sc = google.searchconsole({ version: 'v1', auth })

    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - 28)
    const fmt = (d: Date) => d.toISOString().split('T')[0]
    const base = { startDate: fmt(startDate), endDate: fmt(endDate) }

    const [summaryRes, pagesRes, queriesRes, sitemapsRes] = await Promise.all([
      sc.searchanalytics.query({ siteUrl: SITE, requestBody: { ...base } }),
      sc.searchanalytics.query({
        siteUrl: SITE,
        requestBody: { ...base, dimensions: ['page'], rowLimit: 20 },
      }),
      sc.searchanalytics.query({
        siteUrl: SITE,
        requestBody: { ...base, dimensions: ['query'], rowLimit: 20 },
      }),
      sc.sitemaps.list({ siteUrl: SITE }).catch(() => ({ data: { sitemap: [] } })),
    ])

    const sm = summaryRes.data.rows?.[0]
    const gsc = {
      clicks: Math.round(sm?.clicks ?? 0),
      impressions: Math.round(sm?.impressions ?? 0),
      ctr: Number(((sm?.ctr ?? 0) as number).toFixed(4)),
      position: Number(((sm?.position ?? 0) as number).toFixed(2)),
    }

    const topPages = (pagesRes.data.rows ?? []).map((r) => ({
      url: r.keys?.[0]?.replace(BASE_URL, '') ?? '',
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      position: Number((r.position ?? 0).toFixed(1)),
      ctr: Number((r.ctr ?? 0).toFixed(4)),
    }))

    const topQueries = (queriesRes.data.rows ?? []).map((r) => ({
      query: r.keys?.[0] ?? '',
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      position: Number((r.position ?? 0).toFixed(1)),
    }))

    const mainSitemap = sitemapsRes.data.sitemap?.find((s) =>
      s.path?.endsWith('/sitemap.xml')
    )
    const submittedTotal =
      mainSitemap?.contents?.reduce(
        (acc, c) => acc + (parseInt(c.submitted ?? '0', 10) || 0),
        0
      ) ?? STATIC_PAGES.length + BLOG_POSTS.length

    const indexedEstimate = topPages.filter((p) => p.impressions > 0).length
    const today = fmt(new Date())

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    })

    const { error } = await supabase.from('daily_analytics').upsert(
      {
        date: today,
        gsc_clicks: gsc.clicks,
        gsc_impressions: gsc.impressions,
        gsc_ctr: gsc.ctr,
        gsc_avg_position: gsc.position,
        total_submitted: submittedTotal,
        indexed_urls: indexedEstimate,
        top_pages: topPages,
        top_queries: topQueries,
        raw_payload: {
          fetched_at: new Date().toISOString(),
          site: SITE,
          range: base,
        },
      },
      { onConflict: 'date' }
    )

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      date: today,
      gsc,
      topPagesCount: topPages.length,
      topQueriesCount: topQueries.length,
      submittedTotal,
      indexedEstimate,
    })
  } catch (err) {
    console.error('[SEO snapshot] error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
