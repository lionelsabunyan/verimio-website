/**
 * Verimio — AI Creative Prompt Library
 * ──────────────────────────────────────
 * Tüm AI görsel üretimleri için merkezi brief şablonları.
 * Onaylanan görseller `approved_url` alanına yazılır — tekrar üretilmez.
 *
 * Görsel Dil Kararı (Şubat 2026):
 *   - Stil: Hybrid-3 (HBR editorial + Stripe minimal)
 *   - Zemin: Krem/beyaz VEYA koyu indigo→mor (dark sections)
 *   - Aksanlar: Lime (#A3E635) orta düzey — belirgin ama dominant değil
 *   - Model: FLUX 1.1 Pro (fal-ai/flux-pro/v1.1) — standart
 *   - Model (dark): FLUX 1.1 Pro — aynı
 */

// ─── Temel stil token'ları ─────────────────────────────────────────────────
export const BRAND_STYLE = {
  /** Açık zemin — hakkımızda, blog, genel sayfalar */
  light: [
    "cream white warm background",
    "centered soft deep indigo radial gradient glow",
    "subtle geometric dot grid pattern in soft purple fading outward from center",
    "three small vivid lime green (#A3E635) circle accents asymmetrically placed",
    "breathable generous white space",
    "premium consulting brand aesthetic",
    "no text, no people, no faces",
  ].join(", "),

  /** Koyu zemin — dark section arka planları, hero overlay */
  dark: [
    "deep rich indigo to soft violet gradient background",
    "centered glowing halo light effect",
    "subtle geometric dot grid in lighter purple fading outward",
    "three small vivid lime green (#A3E635) accent marks",
    "luxury SaaS brand aesthetic, Stripe-meets-Linear design language",
    "no text, no people, no faces",
  ].join(", "),
} as const

// ─── Site Görselleri ───────────────────────────────────────────────────────
export const SITE_PROMPTS = {
  hakkimizda_hero: {
    prompt: `Premium about-us page hero background, ${BRAND_STYLE.light}, 4:3 landscape orientation`,
    model: "fal-ai/flux-pro/v1.1" as const,
    size: "landscape_4_3" as const,
    /** Onaylanan görsel — üretildi 19 Şubat 2026 */
    approved_url: "https://v3b.fal.media/files/b/0a8f1e05/pJaVCx0JzU_cAFTY7as5m_310a8163c1f14ab79b519cc75bfcb006.jpg",
  },

  howitworks_bg: {
    prompt: [
      `Minimal editorial process flow background, ${BRAND_STYLE.light}`,
      "three connected horizontal zones flowing left to right",
      "first zone magnifying glass shape (analysis), second zone interconnected gears (automation), third zone upward arrow (results)",
      "connected by thin deep indigo curved arrows",
      "vivid lime green highlight on third results zone only",
      "16:9 landscape",
    ].join(", "),
    model: "fal-ai/flux-pro/v1.1" as const,
    size: "landscape_16_9" as const,
    approved_url: null,
  },

  expertise_bg: {
    prompt: [
      `Premium services section background, ${BRAND_STYLE.light}`,
      "abstract connected node diagram, five service nodes radiating from center",
      "central node glowing in vivid lime green, outer nodes in soft indigo",
      "thin bezier connection lines in purple",
      "square format",
    ].join(", "),
    model: "fal-ai/flux-pro/v1.1" as const,
    size: "square_hd" as const,
    approved_url: null,
  },

  analiz_hero: {
    prompt: [
      `Premium diagnostic check-up page hero background, ${BRAND_STYLE.light}`,
      "abstract medical/analytical metaphor — circular scan rings in indigo, data points appearing",
      "one vivid lime green checkmark accent at completion point",
      "4:3 landscape",
    ].join(", "),
    model: "fal-ai/flux-pro/v1.1" as const,
    size: "landscape_4_3" as const,
    approved_url: null,
  },
} as const

// ─── Blog Kapak Görselleri ─────────────────────────────────────────────────
export type BlogCategory =
  | "ai-tools"
  | "automation"
  | "data"
  | "strategy"
  | "security"
  | "customer"
  | "roi"
  | "tutorial"

export const BLOG_PROMPTS: Record<
  BlogCategory,
  { prompt: string; approved_url: string | null }
> = {
  "ai-tools": {
    prompt: [
      `Tech editorial blog cover background, ${BRAND_STYLE.light}`,
      "abstract AI brain circuit node in center, soft glowing connections",
      "one vivid lime green node as the active AI core",
      "16:9 landscape",
    ].join(", "),
    approved_url: null,
  },
  automation: {
    prompt: [
      `Editorial blog cover background, ${BRAND_STYLE.light}`,
      "abstract workflow arrows flowing left to right, process blocks connected",
      "final output block in vivid lime green signaling completion",
      "16:9 landscape",
    ].join(", "),
    approved_url: null,
  },
  data: {
    prompt: [
      `Premium data visualization blog cover, ${BRAND_STYLE.light}`,
      "abstract bar chart and line chart combination, bars in indigo shades",
      "peak data point glowing in vivid lime green",
      "16:9 landscape",
    ].join(", "),
    approved_url: null,
  },
  strategy: {
    prompt: [
      `Strategic consulting editorial cover, ${BRAND_STYLE.light}`,
      "abstract chess-piece-like geometric shapes arranged in strategic formation",
      "central key piece highlighted in vivid lime green",
      "16:9 landscape",
    ].join(", "),
    approved_url: null,
  },
  security: {
    prompt: [
      `Cybersecurity editorial blog cover, ${BRAND_STYLE.light}`,
      "abstract shield geometric form in deep indigo, concentric protection rings",
      "shield center lock point glowing vivid lime green",
      "16:9 landscape",
    ].join(", "),
    approved_url: null,
  },
  customer: {
    prompt: [
      `Customer experience editorial blog cover, ${BRAND_STYLE.light}`,
      "abstract network of connected dots representing customer touchpoints",
      "central hub node in vivid lime green, satellite nodes in indigo",
      "16:9 landscape",
    ].join(", "),
    approved_url: null,
  },
  roi: {
    prompt: [
      `ROI and growth editorial blog cover, ${BRAND_STYLE.light}`,
      "abstract upward trending curve on cream background",
      "data points in indigo, peak achievement point glowing vivid lime green",
      "16:9 landscape",
    ].join(", "),
    approved_url: null,
  },
  tutorial: {
    prompt: [
      `Step-by-step guide editorial blog cover, ${BRAND_STYLE.light}`,
      "abstract numbered step progression 1-2-3-4 as geometric circles connected by lines",
      "final completed step circle filled vivid lime green",
      "16:9 landscape",
    ].join(", "),
    approved_url: null,
  },
}

// ─── Sosyal Medya Arka Planları ────────────────────────────────────────────
export type SocialPlatform = "linkedin" | "instagram" | "twitter" | "story"

const SOCIAL_SIZE: Record<SocialPlatform, string> = {
  linkedin: "landscape_16_9",
  instagram: "square_hd",
  twitter: "landscape_16_9",
  story: "portrait_16_9",
}

export const SOCIAL_PROMPTS: Record<
  SocialPlatform,
  { prompt: string; size: string; approved_url: string | null }
> = {
  linkedin: {
    prompt: [
      `Professional LinkedIn post background, ${BRAND_STYLE.light}`,
      "wide 1.91:1 horizontal composition, dominant empty space for text overlay",
      "indigo geometric accent anchored left edge",
    ].join(", "),
    size: SOCIAL_SIZE.linkedin,
    approved_url: null,
  },
  instagram: {
    prompt: [
      `Instagram square post background, ${BRAND_STYLE.light}`,
      "balanced square 1:1 composition, centered geometric composition",
      "strong visual hierarchy with center space for text",
    ].join(", "),
    size: SOCIAL_SIZE.instagram,
    approved_url: null,
  },
  twitter: {
    prompt: [
      `Twitter/X post background, ${BRAND_STYLE.light}`,
      "wide horizontal composition, dynamic asymmetric layout",
      "indigo shapes left-weighted, lime accent right side",
    ].join(", "),
    size: SOCIAL_SIZE.twitter,
    approved_url: null,
  },
  story: {
    prompt: [
      `Instagram Story vertical background, ${BRAND_STYLE.dark}`,
      "9:16 vertical portrait composition",
      "strong top and bottom zones for text, open center",
      "lime green glowing node center",
    ].join(", "),
    size: SOCIAL_SIZE.story,
    approved_url: null,
  },
}

// ─── Yardımcı: API route için payload builder ──────────────────────────────
export function buildFalPayload(
  prompt: string,
  size: string,
  model = "fal-ai/flux-pro/v1.1"
) {
  return {
    model,
    prompt,
    image_size: size,
    output_format: "jpeg",
  }
}
