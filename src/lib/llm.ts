/**
 * Merkezi LLM Router — OpenRouter uzerinden
 * Gorev bazli model secimi ile maliyet optimizasyonu
 */

export type TaskType = 'content_generation' | 'content_suggestions' | 'seo_content'

interface ModelConfig {
  id: string
  maxTokens: number
}

// Gorev bazli model haritasi
const MODEL_MAP: Record<TaskType, ModelConfig> = {
  content_generation: {
    id: 'google/gemini-3-flash-preview',   // Turkce icerik — $0.50/$3 per 1M token
    maxTokens: 4096,
  },
  content_suggestions: {
    id: 'google/gemini-3-flash-preview',   // Turkce oneri — $0.50/$3 per 1M token
    maxTokens: 4096,
  },
  seo_content: {
    id: 'deepseek/deepseek-v3.2',          // Ingilizce SEO — $0.25/$0.40 per 1M token
    maxTokens: 4000,
  },
}

const FALLBACK_MODEL = 'deepseek/deepseek-v3.2'

interface CallLLMOptions {
  task: TaskType
  messages: { role: 'user' | 'assistant'; content: string }[]
  system?: string
  maxTokens?: number
  model?: string // override icin
}

export async function callLLM(options: CallLLMOptions): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY env var bulunamadi')
  }

  const config = MODEL_MAP[options.task]
  const model = options.model || config.id
  const maxTokens = options.maxTokens || config.maxTokens

  // OpenAI uyumlu mesaj formati
  const messages: { role: string; content: string }[] = []

  if (options.system) {
    messages.push({ role: 'system', content: options.system })
  }

  messages.push(...options.messages)

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://verimio.com.tr',
        'X-Title': 'Verimio Content Engine',
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        messages,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(`[LLM] ${model} hata (${response.status}):`, errorBody)

      // Fallback model dene
      if (model !== FALLBACK_MODEL) {
        console.log(`[LLM] Fallback modele geciliyor: ${FALLBACK_MODEL}`)
        return callLLM({ ...options, model: FALLBACK_MODEL })
      }

      throw new Error(`LLM API hatasi: ${response.status} — ${errorBody}`)
    }

    const result = await response.json()
    const text = result.choices?.[0]?.message?.content || ''

    if (!text) {
      throw new Error('LLM bos yanit dondu')
    }

    return text
  } catch (error) {
    // Fallback model dene (network hatalari icin)
    if (model !== FALLBACK_MODEL && !(error instanceof Error && error.message.startsWith('LLM API hatasi'))) {
      console.error(`[LLM] ${model} baglanti hatasi, fallback deneniyor:`, error)
      return callLLM({ ...options, model: FALLBACK_MODEL })
    }

    throw error
  }
}
