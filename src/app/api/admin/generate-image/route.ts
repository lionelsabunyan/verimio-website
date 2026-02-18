import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const { prompt, model = 'fal-ai/recraft/v3/text-to-image', size = 'instagram_square', platform } = await request.json()

  const SIZE_MAP: Record<string, { image_size: { width: number; height: number } }> = {
    linkedin_post: { image_size: { width: 1200, height: 628 } },
    instagram_square: { image_size: { width: 1080, height: 1080 } },
    instagram_story: { image_size: { width: 1080, height: 1920 } },
    twitter_post: { image_size: { width: 1600, height: 900 } },
    youtube_thumbnail: { image_size: { width: 1280, height: 720 } },
    logo_square: { image_size: { width: 800, height: 800 } },
  }

  const imageSize = SIZE_MAP[size] || SIZE_MAP.instagram_square

  try {
    // fal.ai API'ye direkt fetch (SSR uyumlu)
    const response = await fetch(`https://fal.run/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        ...imageSize,
        num_images: 4,
        style: 'digital_illustration',
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return NextResponse.json({ error: err }, { status: response.status })
    }

    const result = await response.json()
    const images = result.images || []

    // İlk görseli Supabase'e kaydet
    if (images.length > 0) {
      const supabase = await createClient()
      await supabase.from('media_assets').insert({
        type: 'image',
        prompt,
        model,
        url: images[0].url,
        platform: platform || null,
        width: imageSize.image_size.width,
        height: imageSize.image_size.height,
      })
    }

    return NextResponse.json({ images, success: true })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
