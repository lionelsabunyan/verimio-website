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

const URLS = [
  'https://www.verimio.com.tr/gizlilik',
  'https://www.verimio.com.tr/kullanim-sartlari',
  'https://www.verimio.com.tr/blog/perakendede-yapay-zeka-stok-yonetiminden-musteri-deneyimine-',
  'https://www.verimio.com.tr/blog/2026-yapay-zeka-trendleri-turk-kobileri-nasil-hazirlanmali',
  'https://www.verimio.com.tr/blog/insan-kaynaklarinda-ai-devrimi-ise-alimdan-calisan-bagliligi',
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

  console.log('=== Tamamlandı ===')
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
