import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const GITHUB_OWNER = 'lionelsabunyan'
const GITHUB_REPO = 'verimio-website'
const GITHUB_BRANCH = 'main'

// Turkish date format
function formatTurkishDate(d: Date): string {
  const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

// Turkish slugify
function slugify(text: string): string {
  const map: Record<string, string> = {
    'ç': 'c', 'Ç': 'c', 'ş': 's', 'Ş': 's', 'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'İ': 'i', 'ö': 'o', 'Ö': 'o', 'ü': 'u', 'Ü': 'u',
  }
  return text
    .split('').map(c => map[c] || c).join('')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
}

// Category detection from title + keywords
function detectCategory(title: string, keywords: string): string {
  const text = (title + ' ' + keywords).toLowerCase()
  if (/otomasyon|automat|n8n|make|zapier/.test(text)) return 'automation'
  if (/strateji|strategy|rehber|guide|nasil|neden|nedir/.test(text)) return 'strategy'
  if (/tutorial|adim adim|kurulum|nasil yapilir/.test(text)) return 'tutorial'
  if (/chatbot|voice agent|musteri|crm/.test(text)) return 'customer'
  if (/roi|maliyet|hesapla|yatirim|kazanc/.test(text)) return 'roi'
  if (/veri|data|kalite/.test(text)) return 'data'
  if (/ai araclari|model|gpt|llm|claude/.test(text)) return 'ai-tools'
  return 'strategy'
}

// GitHub API helper — get file (returns sha + content)
async function githubGet(path: string, token: string) {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' } }
  )
  if (!res.ok) return null
  return res.json()
}

// GitHub API helper — put file
async function githubPut(path: string, content: string, message: string, sha: string | undefined, token: string) {
  const body: Record<string, string> = {
    message,
    content: Buffer.from(content).toString('base64'),
    branch: GITHUB_BRANCH,
  }
  if (sha) body.sha = sha

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GitHub PUT ${path} failed: ${err}`)
  }
  return res.json()
}

// GitHub API helper — put binary file (base64 content)
async function githubPutBinary(path: string, base64Content: string, message: string, sha: string | undefined, token: string) {
  const body: Record<string, string> = {
    message,
    content: base64Content,
    branch: GITHUB_BRANCH,
  }
  if (sha) body.sha = sha

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GitHub PUT binary ${path} failed: ${err}`)
  }
  return res.json()
}

export async function POST(request: Request) {
  const githubToken = process.env.GITHUB_TOKEN
  if (!githubToken) {
    return NextResponse.json({ error: 'GITHUB_TOKEN env var eksik. Vercel Dashboard → Settings → Environment Variables\'a ekle.' }, { status: 500 })
  }

  const { draft_id } = await request.json()
  if (!draft_id) {
    return NextResponse.json({ error: 'draft_id gerekli' }, { status: 400 })
  }

  const supabase = await createClient()

  // 1. Fetch draft
  const { data: draft, error: draftError } = await supabase
    .from('content_drafts')
    .select('*')
    .eq('id', draft_id)
    .single()

  if (draftError || !draft) {
    return NextResponse.json({ error: 'Taslak bulunamadı' }, { status: 404 })
  }

  if (draft.status === 'published') {
    return NextResponse.json({ error: 'Bu taslak zaten yayınlandı' }, { status: 400 })
  }

  try {
    // 2. Prepare metadata
    const title = draft.title || 'Başlıksız'
    const excerpt = draft.meta_description || draft.body?.slice(0, 160) || ''
    const slug = slugify(title)
    const category = detectCategory(title, draft.keywords || '')
    const readingTime = Math.ceil((draft.body || '').split(' ').length / 200)
    const dateStr = formatTurkishDate(new Date())

    // 3. Build MDX
    const mdxContent = `---
title: "${title.replace(/"/g, '\\"')}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
date: "${dateStr}"
category: "${category}"
readingTime: "${readingTime} dk"
author: "Verimio Ekibi"
---

${draft.body || ''}
`

    // 4. Generate cover image via fal.ai Recraft V3
    let coverBase64: string | null = null
    const falKey = process.env.FAL_KEY
    if (falKey) {
      const imagePrompt = `Abstract geometric digital illustration, no text no words no letters no typography no labels no writing anywhere, dark deep indigo background #1E0A46 to #2E1065 gradient, purple geometric elements #8B5CF6 at low opacity 0.15-0.25, vivid lime accent #A3E635 only on 2-3 focal points, professional minimal, topic: ${title.slice(0, 60)}`

      const falRes = await fetch('https://fal.run/fal-ai/recraft/v3/text-to-image', {
        method: 'POST',
        headers: {
          Authorization: `Key ${falKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: imagePrompt,
          image_size: { width: 1200, height: 628 },
          num_images: 1,
          style: 'digital_illustration',
        }),
      })

      if (falRes.ok) {
        const falData = await falRes.json()
        const imageUrl = falData.images?.[0]?.url
        if (imageUrl) {
          const imgRes = await fetch(imageUrl)
          if (imgRes.ok) {
            const arrayBuf = await imgRes.arrayBuffer()
            coverBase64 = Buffer.from(arrayBuf).toString('base64')
          }
        }
      }
    }

    // 5. Upload MDX to GitHub
    const mdxPath = `src/content/blog/${slug}.mdx`
    const existingMdx = await githubGet(mdxPath, githubToken)
    await githubPut(
      mdxPath,
      mdxContent,
      `blog: ${title.slice(0, 60)}`,
      existingMdx?.sha,
      githubToken
    )

    // 6. Upload cover image to GitHub (if generated)
    if (coverBase64) {
      const imgPath = `public/images/blog/${slug}.webp`
      const existingImg = await githubGet(imgPath, githubToken)
      await githubPutBinary(
        imgPath,
        coverBase64,
        `blog cover: ${slug}`,
        existingImg?.sha,
        githubToken
      )
    }

    // 7. Update constants.ts — prepend to BLOG_POSTS
    const constantsPath = 'src/lib/constants.ts'
    const constantsFile = await githubGet(constantsPath, githubToken)
    if (!constantsFile) throw new Error('constants.ts GitHub\'da bulunamadı')

    const currentConstants = Buffer.from(constantsFile.content, 'base64').toString('utf-8')

    const newEntry = `  {
    title: "${title.replace(/"/g, '\\"')}",
    excerpt: "${excerpt.replace(/"/g, '\\"')}",
    date: "${dateStr}",
    slug: "${slug}",
    category: "${category}" as const,
  },`

    const updatedConstants = currentConstants.replace(
      'export const BLOG_POSTS = [',
      `export const BLOG_POSTS = [\n${newEntry}`
    )

    await githubPut(
      constantsPath,
      updatedConstants,
      `blog: constants.ts güncellemesi — ${slug}`,
      constantsFile.sha,
      githubToken
    )

    // 8. Mark as published in Supabase
    await supabase
      .from('content_drafts')
      .update({ status: 'published' })
      .eq('id', draft_id)

    // 9. GSC URL submit (optional)
    const publishedUrl = `https://www.verimio.com.tr/blog/${slug}`
    const gscJson = process.env.GSC_SERVICE_ACCOUNT_JSON
    if (gscJson) {
      try {
        const { google } = await import('googleapis')
        const credentials = JSON.parse(gscJson)
        const auth = new google.auth.GoogleAuth({
          credentials,
          scopes: ['https://www.googleapis.com/auth/indexing'],
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const client: any = await auth.getClient()
        await client.request({
          url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
          method: 'POST',
          data: { url: publishedUrl, type: 'URL_UPDATED' },
        })
      } catch {
        // GSC opsiyonel — hata olsa da yayınlama başarılı sayılır
      }
    }

    return NextResponse.json({
      success: true,
      slug,
      url: publishedUrl,
      hasCover: !!coverBase64,
    })
  } catch (err) {
    console.error('publish-draft error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
