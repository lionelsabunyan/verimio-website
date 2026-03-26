import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

const BASE_URL = 'https://www.verimio.com.tr'
const GSC_SITE = 'sc-domain:verimio.com.tr'
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`

function getGscAuth(scopes: string[]) {
  const gscJson = process.env.GSC_SERVICE_ACCOUNT_JSON
  if (!gscJson) return null
  const credentials = JSON.parse(gscJson)
  return new google.auth.GoogleAuth({ credentials, scopes })
}

/**
 * POST /api/admin/seo/notify-gsc
 *
 * Yeni blog yazısı yayınlandığında GSC'ye tam bildirim gönderir.
 *
 * Body:
 *   { slug?: string, resubmitSitemap?: boolean }
 *
 * İşlem:
 *   1. Google Indexing API ile URL_UPDATED bildirimi (slug varsa)
 *   2. Sitemap resubmit (yeni yazı varsa veya resubmitSitemap: true)
 *   3. Ana sayfa + blog listesi için de URL_UPDATED (yeni yazı internal link'leri güncelliyor)
 */
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const expectedToken = process.env.ADMIN_API_TOKEN
  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const slug = body.slug as string | undefined
  const resubmitSitemap = body.resubmitSitemap as boolean | undefined
  const results: Record<string, unknown> = {}

  // 1. Google Indexing API — URL_UPDATED for the new blog post
  const indexingAuth = getGscAuth(['https://www.googleapis.com/auth/indexing'])
  if (slug && indexingAuth) {
    const blogUrl = `${BASE_URL}/blog/${slug}`
    const urlsToIndex = [
      blogUrl,
      `${BASE_URL}/blog`,  // Blog listing page (new post appears here)
      BASE_URL,             // Homepage (latest posts section)
    ]

    const indexResults: Array<{ url: string; success: boolean; error?: string }> = []
    const client = await indexingAuth.getClient()

    for (const url of urlsToIndex) {
      try {
        await (client as { request: (opts: { url: string; method: string; data: unknown }) => Promise<unknown> }).request({
          url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
          method: 'POST',
          data: { url, type: 'URL_UPDATED' },
        })
        indexResults.push({ url, success: true })
        console.log(`[GSC] URL_UPDATED: ${url}`)
      } catch (err) {
        indexResults.push({ url, success: false, error: String(err) })
        console.error(`[GSC] URL_UPDATED FAILED: ${url}`, err)
      }
    }
    results.indexing = indexResults
  } else if (slug && !indexingAuth) {
    results.indexing = { success: false, error: 'GSC_SERVICE_ACCOUNT_JSON eksik' }
  }

  // 2. Sitemap resubmit — force Google to re-read the updated sitemap
  if (slug || resubmitSitemap) {
    const wmAuth = getGscAuth(['https://www.googleapis.com/auth/webmasters'])
    if (wmAuth) {
      try {
        const webmasters = google.webmasters({ version: 'v3', auth: wmAuth })

        // Delete + resubmit forces a fresh read
        try {
          await webmasters.sitemaps.delete({ siteUrl: GSC_SITE, feedpath: SITEMAP_URL })
        } catch { /* may not exist */ }
        await webmasters.sitemaps.submit({ siteUrl: GSC_SITE, feedpath: SITEMAP_URL })

        results.sitemap = { success: true, action: 'resubmitted', url: SITEMAP_URL }
        console.log(`[GSC] Sitemap resubmitted: ${SITEMAP_URL}`)
      } catch (err) {
        results.sitemap = { success: false, error: String(err) }
        console.error('[GSC] Sitemap resubmit FAILED', err)
      }
    }
  }

  return NextResponse.json({
    message: 'GSC notification completed',
    results,
  })
}
