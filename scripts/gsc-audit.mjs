#!/usr/bin/env node
/**
 * GSC URL Inspection Audit
 * Sitemap'teki tüm URL'leri GSC URL Inspection API ile kontrol eder.
 */

import { google } from 'googleapis'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// .env.local'dan GSC_SERVICE_ACCOUNT_JSON oku
const envPath = resolve(__dirname, '..', '.env.local')
const envContent = readFileSync(envPath, 'utf-8')

function getEnvVar(name) {
  // Handle multi-line or single-line values
  const singleLine = envContent.match(new RegExp(`^${name}=(.+)$`, 'm'))
  if (singleLine) {
    let val = singleLine[1].trim()
    // Remove surrounding quotes
    if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
      val = val.slice(1, -1)
    }
    return val
  }
  return null
}

const SITE_URL = getEnvVar('GSC_SITE_URL') || 'sc-domain:verimio.com.tr'
const serviceAccountJson = getEnvVar('GSC_SERVICE_ACCOUNT_JSON')

if (!serviceAccountJson) {
  console.error('GSC_SERVICE_ACCOUNT_JSON bulunamadı .env.local dosyasında')
  process.exit(1)
}

const credentials = JSON.parse(serviceAccountJson)

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
})

const sc = google.searchconsole({ version: 'v1', auth })

// Sitemap URL'leri
const BASE = 'https://www.verimio.com.tr'
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

const BLOG_SLUGS = [
  'perakendede-yapay-zeka-stok-yonetiminden-musteri-deneyimine-',
  '2026-yapay-zeka-trendleri-turk-kobileri-nasil-hazirlanmali',
  'insan-kaynaklarinda-ai-devrimi-ise-alimdan-calisan-bagliligi',
  'sirketinizin-gizli-verileri-guvende-mi-kurumsal-chatgpt-kull',
  'rakipleriniz-ai-kullanirken-siz-eski-usul-devam-mi-edeceksin',
  'excelden-yapay-zekaya-raporlama-otomasyonu-ile-hata-payini-s',
  'ai-donusumu-bir-it-projesi-degil-bir-yonetim-vizyonudur',
  'verimio-bulten-bu-ay-isletmenizde-uygulayabileceginiz-3-prat',
  'ekibiniz-yapay-zekadan-korkmali-mi-yoksa-onu-kucaklamali-mi',
  'kobide-yapay-zeka-devrimi',
  'raporlama-otomasyonu-nedir',
  'musteri-hizmetlerinde-ai-donemi',
  'ai-icin-veri-kalitesi',
  'chatbot-voice-agent-secimi',
  'ai-roi-hesaplama',
  'make-vs-n8n-karsilastirma',
  'ai-danismanlik-neden-farklidir',
  'n8n-ile-basit-otomasyon',
  'otomasyon-yanlislari',
  'sirket-check-up-nedir',
]

const ALL_URLS = [
  ...STATIC_PAGES.map(p => `${BASE}${p}`),
  ...BLOG_SLUGS.map(s => `${BASE}/blog/${s}`),
]

async function inspectUrl(url) {
  try {
    const res = await sc.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl: url,
        siteUrl: SITE_URL,
      },
    })
    const result = res.data.inspectionResult
    return {
      url: url.replace(BASE, ''),
      verdict: result?.indexStatusResult?.verdict || 'UNKNOWN',
      coverageState: result?.indexStatusResult?.coverageState || '-',
      robotsTxtState: result?.indexStatusResult?.robotsTxtState || '-',
      indexingState: result?.indexStatusResult?.indexingState || '-',
      pageFetchState: result?.indexStatusResult?.pageFetchState || '-',
      lastCrawlTime: result?.indexStatusResult?.lastCrawlTime || '-',
      crawledAs: result?.indexStatusResult?.crawledAs || '-',
      referringUrls: result?.indexStatusResult?.referringUrls || [],
    }
  } catch (err) {
    return {
      url: url.replace(BASE, ''),
      verdict: 'ERROR',
      coverageState: err.message?.slice(0, 60) || 'API error',
      robotsTxtState: '-',
      indexingState: '-',
      pageFetchState: '-',
      lastCrawlTime: '-',
      crawledAs: '-',
      referringUrls: [],
    }
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function main() {
  console.log(`\n=== GSC URL Inspection Audit ===`)
  console.log(`Site: ${SITE_URL}`)
  console.log(`Toplam URL: ${ALL_URLS.length}`)
  console.log(`Tarih: ${new Date().toISOString().split('T')[0]}\n`)

  const results = []
  const errors = []

  for (let i = 0; i < ALL_URLS.length; i++) {
    const url = ALL_URLS[i]
    const shortUrl = url.replace(BASE, '')
    process.stdout.write(`[${i + 1}/${ALL_URLS.length}] ${shortUrl} ... `)

    const result = await inspectUrl(url)
    results.push(result)

    const icon = result.verdict === 'PASS' ? '✅' :
                 result.verdict === 'NEUTRAL' ? '⚠️' :
                 result.verdict === 'FAIL' ? '❌' : '❓'
    console.log(`${icon} ${result.verdict} | ${result.coverageState}`)

    if (result.verdict !== 'PASS') {
      errors.push(result)
    }

    // Rate limit
    if (i < ALL_URLS.length - 1) await sleep(1200)
  }

  // Summary
  console.log('\n' + '='.repeat(80))
  console.log('ÖZET')
  console.log('='.repeat(80))

  const passed = results.filter(r => r.verdict === 'PASS').length
  const neutral = results.filter(r => r.verdict === 'NEUTRAL').length
  const failed = results.filter(r => r.verdict === 'FAIL').length
  const unknown = results.filter(r => !['PASS', 'NEUTRAL', 'FAIL'].includes(r.verdict)).length

  console.log(`✅ Indexed (PASS): ${passed}`)
  console.log(`⚠️  Neutral: ${neutral}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`❓ Unknown/Error: ${unknown}`)
  console.log(`   Toplam: ${results.length}`)

  if (errors.length > 0) {
    console.log('\n' + '='.repeat(80))
    console.log('SORUNLU SAYFALAR — DETAY')
    console.log('='.repeat(80))
    for (const e of errors) {
      console.log(`\n  URL: ${e.url}`)
      console.log(`  Verdict: ${e.verdict}`)
      console.log(`  Coverage: ${e.coverageState}`)
      console.log(`  Robots.txt: ${e.robotsTxtState}`)
      console.log(`  Indexing: ${e.indexingState}`)
      console.log(`  Page Fetch: ${e.pageFetchState}`)
      console.log(`  Last Crawl: ${e.lastCrawlTime}`)
      console.log(`  Crawled As: ${e.crawledAs}`)
      if (e.referringUrls?.length > 0) {
        console.log(`  Referring URLs: ${e.referringUrls.join(', ')}`)
      }
    }
  }

  // Also get search analytics for context
  console.log('\n' + '='.repeat(80))
  console.log('SON 28 GÜN — SEARCH ANALYTICS')
  console.log('='.repeat(80))

  try {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - 28)
    const fmt = d => d.toISOString().split('T')[0]

    const [summaryRes, pagesRes, queriesRes] = await Promise.all([
      sc.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: { startDate: fmt(startDate), endDate: fmt(endDate) },
      }),
      sc.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate: fmt(startDate),
          endDate: fmt(endDate),
          dimensions: ['page'],
          rowLimit: 25,
        },
      }),
      sc.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate: fmt(startDate),
          endDate: fmt(endDate),
          dimensions: ['query'],
          rowLimit: 20,
        },
      }),
    ])

    const s = summaryRes.data.rows?.[0]
    if (s) {
      console.log(`\n  Tıklama: ${s.clicks}`)
      console.log(`  Gösterim: ${s.impressions}`)
      console.log(`  CTR: ${(s.ctr * 100).toFixed(1)}%`)
      console.log(`  Ort. Pozisyon: ${s.position?.toFixed(1)}`)
    }

    console.log('\n  --- Top Sayfalar ---')
    for (const r of (pagesRes.data.rows || [])) {
      const page = r.keys[0].replace(BASE, '')
      console.log(`  ${page.padEnd(65)} | ${String(r.clicks).padStart(3)} tık | ${String(r.impressions).padStart(5)} gör | pos ${r.position?.toFixed(1)}`)
    }

    console.log('\n  --- Top Sorgular ---')
    for (const r of (queriesRes.data.rows || [])) {
      console.log(`  ${r.keys[0].padEnd(50)} | ${String(r.clicks).padStart(3)} tık | ${String(r.impressions).padStart(5)} gör | pos ${r.position?.toFixed(1)}`)
    }
  } catch (err) {
    console.error('Search Analytics hatası:', err.message)
  }

  console.log('\n=== Audit tamamlandı ===\n')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
