#!/usr/bin/env node
/**
 * GSC Indexing API — URL_UPDATED notification gönder
 */

import { google } from 'googleapis'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '..', '.env.local')
const envContent = readFileSync(envPath, 'utf-8')

function getEnvVar(name) {
  const match = envContent.match(new RegExp(`^${name}=(.+)$`, 'm'))
  if (match) {
    let val = match[1].trim()
    if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
      val = val.slice(1, -1)
    }
    return val
  }
  return null
}

const serviceAccountJson = getEnvVar('GSC_SERVICE_ACCOUNT_JSON')
if (!serviceAccountJson) {
  console.error('GSC_SERVICE_ACCOUNT_JSON bulunamadı')
  process.exit(1)
}

const credentials = JSON.parse(serviceAccountJson)
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/indexing'],
})
const wmAuth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/webmasters'],
})

const GSC_SITE = 'sc-domain:verimio.com.tr'
const SITEMAP_URL = 'https://www.verimio.com.tr/sitemap.xml'

const URLS = [
  // 21 Nisan — Faz 3B spoke yazıları
  'https://www.verimio.com.tr/blog/kobi-ai-agent-ornekleri',
  'https://www.verimio.com.tr/blog/n8n-ai-agent-olusturma',
  'https://www.verimio.com.tr/blog/whatsapp-ai-musteri-yanit',
  // 20 Nisan
  'https://www.verimio.com.tr/blog/kobilerde-yz-tabanli-is-akislari-2026-rehberi',
  // 17 Nisan
  'https://www.verimio.com.tr/blog/ai-agent-vs-chatbot-isletmeniz-icin-hangisi-dogru',
  // 14 Nisan
  'https://www.verimio.com.tr/blog/turkiye-ai-etkinligi-kobiler-icin-yenilikci-uygulamalar',
  // 13 Nisan
  'https://www.verimio.com.tr/blog/kvkk-uyumlu-voice-ai-cagri-merkezinde-guvenlik',
  'https://www.verimio.com.tr/blog/emlak-sektorunde-yapay-zeka-gayrimenkul-danismanlari-icin-ai',
  // 11 Nisan
  'https://www.verimio.com.tr/blog/is-sureci-otomasyonu-nedir',
  'https://www.verimio.com.tr/blog/muhasebe-otomasyonu-kobi-rehberi',
  'https://www.verimio.com.tr/blog/n8n-chatgpt-entegrasyonu-rehberi',
  'https://www.verimio.com.tr/blog/n8n-vs-zapier-karsilastirma',
  // Listing + ana sayfa
  'https://www.verimio.com.tr/blog',
  'https://www.verimio.com.tr/',
]

async function main() {
  const client = await auth.getClient()
  console.log('=== GSC Indexing API — URL_UPDATED ===\n')

  for (const url of URLS) {
    try {
      const res = await client.request({
        url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
        method: 'POST',
        data: { url, type: 'URL_UPDATED' },
      })
      console.log(`✅ ${url}`)
      console.log(`   → ${JSON.stringify(res.data)}\n`)
    } catch (err) {
      console.log(`❌ ${url}`)
      console.log(`   → ${err.message}\n`)
    }
    // Rate limit
    await new Promise(r => setTimeout(r, 500))
  }

  // Sitemap resubmit (delete + resubmit for fresh read)
  console.log('\n=== Sitemap Resubmit ===\n')
  try {
    const webmasters = google.webmasters({ version: 'v3', auth: wmAuth })
    try {
      await webmasters.sitemaps.delete({ siteUrl: GSC_SITE, feedpath: SITEMAP_URL })
      console.log(`🗑️  Sitemap deleted: ${SITEMAP_URL}`)
    } catch { /* may not exist */ }
    await webmasters.sitemaps.submit({ siteUrl: GSC_SITE, feedpath: SITEMAP_URL })
    console.log(`✅ Sitemap resubmitted: ${SITEMAP_URL}`)
  } catch (err) {
    console.log(`❌ Sitemap resubmit failed: ${err.message}`)
  }

  console.log('\n=== Tamamlandı ===')
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
