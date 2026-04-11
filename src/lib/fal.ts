// AI görsel üretim model sabitleri ve boyut presetleri
// Birincil: Google AI Studio (Nano Banana 2) — monokrom line-art illüstrasyon
// Fallback: Nano Banana Pro veya fal.ai

// Google AI Studio — birincil görsel üretim
export const GOOGLE_AI = {
  NANO_BANANA_PRO: 'nano-banana-pro-preview',
  GEMINI_FLASH_IMAGE: 'gemini-3.1-flash-image-preview',
  ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models',
} as const

// fal.ai — fallback görsel üretim
export const FAL_MODELS = {
  NANO_BANANA_PRO: 'fal-ai/nano-banana-pro',
  NANO_BANANA_2: 'fal-ai/nano-banana-2',
  RECRAFT_V4: 'fal-ai/recraft/v3/text-to-image',
  RECRAFT_V4_SVG: 'fal-ai/recraft/v4/pro/text-to-vector',
  FLUX_SCHNELL: 'fal-ai/flux/schnell',
  FLUX_DEV: 'fal-ai/flux/dev',
  HAILUO: 'fal-ai/minimax/video-01',
  VIDU: 'fal-ai/vidu/vidu-q1',
} as const

export type FalModel = typeof FAL_MODELS[keyof typeof FAL_MODELS]

export const IMAGE_SIZES = {
  linkedin_post: { width: 1200, height: 628 },
  linkedin_cover: { width: 1584, height: 396 },
  instagram_square: { width: 1080, height: 1080 },
  instagram_story: { width: 1080, height: 1920 },
  twitter_post: { width: 1600, height: 900 },
  youtube_thumbnail: { width: 1280, height: 720 },
  logo_square: { width: 800, height: 800 },
} as const

export type ImageSize = keyof typeof IMAGE_SIZES
