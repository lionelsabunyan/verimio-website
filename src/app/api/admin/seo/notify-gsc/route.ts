import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

const BASE_URL = 'https://www.verimio.com.tr'

/**
 * POST /api/admin/seo/notify-gsc
 *
 * Yeni blog yazısı yayınlandığında veya sitemap güncellendiğinde GSC'ye bildirim gönderir.
 *
 * Body:
 *   { slug?: string }  — Belirli bir blog yazısı için URL_UPDATED bildirimi
 *                         slug verilmezse sadece sitemap ping gönderilir
 *
 * İşlem:
 *   1. Google Indexing API ile URL_UPDATED bildirimi (slug varsa)
 *   2. Google sitemap ping (her zaman)
 */
export async function POST(req: NextRequest) {
  // Admin auth check
  const authHeader = req.headers.get('authorization')
  const expectedToken = process.env.ADMIN_API_TOKEN
  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const slug = body.slug as string | undefined
  const results: Record<string, unknown> = {}

  // 1. Google Indexing API — URL_UPDATED notification
  const gscJson = process.env.GSC_SERVICE_ACCOUNT_JSON
  if (slug && gscJson) {
    const url = `${BASE_URL}/blog/${slug}`
    try {
      const credentials = JSON.parse(gscJson)
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/indexing'],
      })
      const client = await auth.getClient()
      await (client as { request: (opts: { url: string; method: string; data: unknown }) => Promise<unknown> }).request({
        url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
        method: 'POST',
        data: { url, type: 'URL_UPDATED' },
      })
      results.indexing = { success: true, url }
      console.log(`[GSC] Index isteği gönderildi: ${url}`)
    } catch (err) {
      results.indexing = { success: false, error: String(err) }
      console.error(`[GSC] Index isteği BAŞARISIZ: ${url}`, err)
    }
  } else if (slug && !gscJson) {
    results.indexing = { success: false, error: 'GSC_SERVICE_ACCOUNT_JSON eksik' }
  }

  return NextResponse.json({
    message: 'GSC notification completed',
    results,
  })
}
