import { google } from 'googleapis'

const SITE_URL = process.env.GSC_SITE_URL || 'sc-domain:verimio.com.tr'

export interface GscMetric {
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export interface GscDayRow extends GscMetric {
  date: string
}

export interface GscPageRow extends GscMetric {
  page: string
}

export interface GscQueryRow extends GscMetric {
  query: string
}

export interface GscData {
  summary: GscMetric
  trend: GscDayRow[]
  topPages: GscPageRow[]
  topQueries: GscQueryRow[]
}

export async function getGscData(): Promise<GscData | null> {
  const serviceAccountJson = process.env.GSC_SERVICE_ACCOUNT_JSON
  if (!serviceAccountJson) return null

  try {
    const credentials = JSON.parse(serviceAccountJson)
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

    const [summaryRes, trendRes, pagesRes, queriesRes] = await Promise.all([
      sc.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: { ...base },
      }),
      sc.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: { ...base, dimensions: ['date'], rowLimit: 28 },
      }),
      sc.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: { ...base, dimensions: ['page'], rowLimit: 10 },
      }),
      sc.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: { ...base, dimensions: ['query'], rowLimit: 10 },
      }),
    ])

    const r0 = summaryRes.data.rows?.[0]
    const summary: GscMetric = {
      clicks:      r0?.clicks      ?? 0,
      impressions: r0?.impressions ?? 0,
      ctr:         r0?.ctr         ?? 0,
      position:    r0?.position    ?? 0,
    }

    const trend: GscDayRow[] = (trendRes.data.rows ?? []).map(r => ({
      date:        r.keys?.[0] ?? '',
      clicks:      r.clicks      ?? 0,
      impressions: r.impressions ?? 0,
      ctr:         r.ctr         ?? 0,
      position:    r.position    ?? 0,
    }))

    const topPages: GscPageRow[] = (pagesRes.data.rows ?? []).map(r => ({
      page:        r.keys?.[0] ?? '',
      clicks:      r.clicks      ?? 0,
      impressions: r.impressions ?? 0,
      ctr:         r.ctr         ?? 0,
      position:    r.position    ?? 0,
    }))

    const topQueries: GscQueryRow[] = (queriesRes.data.rows ?? []).map(r => ({
      query:       r.keys?.[0] ?? '',
      clicks:      r.clicks      ?? 0,
      impressions: r.impressions ?? 0,
      ctr:         r.ctr         ?? 0,
      position:    r.position    ?? 0,
    }))

    return { summary, trend, topPages, topQueries }
  } catch (err) {
    console.error('[GSC] API error:', err)
    return null
  }
}
